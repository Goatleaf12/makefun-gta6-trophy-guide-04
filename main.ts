// Leonida Ledger v4 — a gta6-trophy-guide-01 entry (Node 22, standard library only).
//
// What this program is: the hand-in step for a static, offline trophy guide that
// lives in this directory's app/ folder. A browser opens app/index.html directly;
// there is no build step, no bundler and no network access — the guide's data is
// app/data/trophies.json (the 55 trophies, their guides and citations) plus
// app/data/ledger.json (the adjudication layer: disputes, risks, the 100%
// ledger, source claim counts and the coverage matrix).
//
// What it does: copies app/ and screenshots/ into the output directory and
// writes dossier.json there with the vendored make.fun library in vendor/.
// That library file is the kit's own and stays untouched — the scorer expects
// dossier.json to be exactly what its copy of the library produces.
//
// Run it the way the grader does, or locally with an output override:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// Serve the app locally with `node serve.ts` (http://localhost:8080).

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

// The public title of this entry:
const ENTRY_TITLE = 'Leonida Ledger v4 — GTA VI trophy guide & tracker: tracker-first platinum dashboard, 55 trophies, every step cited, 34 disputes adjudicated';
void ENTRY_TITLE;

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(out, { recursive: true });
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });

// The scorer's caps, mirrored from the kit's gate so this program refuses
// anything the scorer would refuse: at most 4 screenshots of at most 256 KiB
// each, at most 993 files and directories in app/, at most 48 MiB of app
// files, and text files shaped to at most 163840 bytes in the dossier.
writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, { text_max_bytes: 163840, screenshots: { max: 4, max_bytes: 262144 }, app_max_files: 993, app_max_bytes: 50331648 }),
);
