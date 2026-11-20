// shots.mjs — renders this entry's four screenshots with headless Chromium over CDP.
// No dependencies: Node's global WebSocket speaks the DevTools protocol directly.
// Prereq: `node serve.ts` running (serves app/ on :8080). Run: `node shots.mjs`.
// Each shot seeds localStorage with a believable mid-playthrough state, reloads,
// and captures the viewport at 1280x800 as JPEG (kept under the 256 KiB cap).
import { spawn } from 'node:child_process';
import { existsSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = fileURLToPath(new URL('.', import.meta.url));
const PORT = 9337;
const BASE = 'http://localhost:8080/';
const KEY = 'leonida-ledger-v4';
const QUALITY = Number(process.env.SHOT_QUALITY ?? 80);

function findChrome() {
  const cache = join(process.env.HOME, '.cache/ms-playwright');
  const fixed = join(cache, 'chromium-1254/chrome-linux64/chrome');
  if (existsSync(fixed)) return fixed;
  for (const dir of readdirSync(cache)) {
    const p = join(cache, dir, 'chrome-linux64/chrome');
    if (existsSync(p)) return p;
  }
  throw new Error('no playwright chromium found under ' + cache);
}

// Demo progress baked into the screenshots: 11 trophies pre-earned, the
// meditation counter at 6/18, spoilers hidden — a mid-playthrough dashboard.
const EARNED = [2, 3, 8, 16, 21, 35, 42, 44, 46, 53, 55];
const COUNTERS = { 28: 6, 15: 132, 17: 19, 31: 41, 16: 9, 35: 52, 42: 30, 53: 42000, 55: 4 };
const SHOTS = [
  { file: '1-hero.jpg', state: { earned: EARNED, counters: COUNTERS, spoiler: true, tab: 'checklist', selected: 28, revealed: [] } },
  { file: '2-roadmap.jpg', state: { earned: EARNED, counters: COUNTERS, spoiler: true, tab: 'roadmap', selected: 28, revealed: [] } },
  { file: '3-ledger.jpg', state: { earned: EARNED, counters: COUNTERS, spoiler: true, tab: 'ledger', selected: 28, revealed: [] } },
  { file: '4-sources.jpg', state: { earned: EARNED, counters: COUNTERS, spoiler: true, tab: 'sources', selected: 28, revealed: [] } },
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function waitForVersion() {
  for (let i = 0; i < 60; i += 1) {
    try {
      const res = await fetch(`http://localhost:${PORT}/json/version`);
      if (res.ok) return (await res.json()).webSocketDebuggerUrl;
    } catch { /* not up yet */ }
    await sleep(250);
  }
  throw new Error('chromium devtools endpoint never came up');
}

const chrome = spawn(findChrome(), [
  '--headless=new', `--remote-debugging-port=${PORT}`,
  '--user-data-dir=/tmp/leonida-v4-shots-profile', '--no-first-run', '--no-sandbox',
  '--hide-scrollbars', '--force-device-scale-factor=1', '--window-size=1280,800',
], { stdio: 'ignore' });

try {
  const wsUrl = await waitForVersion();
  const ws = new WebSocket(wsUrl);
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
  let seq = 0;
  const pending = new Map();
  ws.onmessage = (ev) => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); }
  };
  function send(method, params = {}, sessionId) {
    seq += 1;
    const id = seq;
    const payload = { id, method, params };
    if (sessionId) payload.sessionId = sessionId;
    return new Promise((res) => { pending.set(id, res); ws.send(JSON.stringify(payload)); });
  }

  const { result: { targetId } } = await send('Target.createTarget', { url: 'about:blank' });
  const { result: { sessionId } } = await send('Target.attachToTarget', { targetId, flatten: true });
  const S = (m, p) => send(m, p, sessionId);
  await S('Page.enable');
  await S('Runtime.enable');
  await S('Emulation.setDeviceMetricsOverride', { width: 1280, height: 800, deviceScaleFactor: 1, mobile: false });
  await S('Page.navigate', { url: BASE });
  await sleep(1500);

  for (const shot of SHOTS) {
    await S('Runtime.evaluate', {
      expression: `localStorage.setItem(${JSON.stringify(KEY)}, ${JSON.stringify(JSON.stringify(shot.state))}); location.reload();`,
    });
    await sleep(1700);
    const { result } = await S('Page.captureScreenshot', { format: 'jpeg', quality: QUALITY, fromSurface: true });
    const buf = Buffer.from(result.data, 'base64');
    writeFileSync(join(here, 'screenshots', shot.file), buf);
    console.log(`${shot.file}: ${buf.length} bytes`);
  }
  ws.close();
} finally {
  chrome.kill('SIGKILL');
}
