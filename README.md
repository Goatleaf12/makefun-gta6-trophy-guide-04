# Leonida Ledger v4 — GTA VI trophy guide & tracker (tracker-first)

[![make.fun · gta6-trophy-guide-01](https://make.fun/badge/gta6-trophy-guide-01.svg)](https://make.fun/bounty/gta6-trophy-guide-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)
[![rank](https://make.fun/badge/gta6-trophy-guide-01/Goatleaf12/makefun-gta6-trophy-guide-04/rank.svg)](https://make.fun/bounty/gta6-trophy-guide-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)
[![reward](https://make.fun/badge/gta6-trophy-guide-01/Goatleaf12/makefun-gta6-trophy-guide-04/reward.svg)](https://make.fun/bounty/gta6-trophy-guide-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)

**Leonida Ledger v4 — GTA VI trophy guide & tracker: a tracker-first platinum dashboard over a fully cited 55-trophy guide, with an adjudicated ledger — 34 source disputes with verdicts, a 16-trophy risk register, and a 1,777-item 100% ledger**

v4 inverts the layout of a normal trophy guide. The first screen is not a list —
it is your **platinum dashboard**: a progress ring, trophies earned by grade,
guide steps covered, estimated hours left on the 200-hour plan, a live count of
unearned at-risk trophies, and a "next up" panel that always points at the most
valuable thing to do next (the missable first, then the next story beat, then
the closest counter). Everything is driven by the progress you save in the
browser. Below the dashboard sits the complete guide, and beside it the Ledger:
the layer where this guide shows its working.

## The headline counts (all computed from the data files)

- **55 trophies**, **562 guide steps**, **every step cited** — **1,231 citations**
  in total, and **all 562 steps backed by 2+ sources**
- **22 sources** read in full or in key sections on 21 Nov 2026 — trophy lists,
  guide sites, the publisher's store page, completion-time data and community
  megathreads — each cited by number beside the steps that rest on it
- **34 disputes adjudicated**: every place the sources contradict each other
  (total hours, the meditation count, whether the balcony spot closes, the
  choices counter, the card and vehicle totals…) is printed two-sided with an
  explicit **"Our call"** verdict, and the tracker plans by the verdict
- **16 at-risk trophies** curated with the concrete risk and the safeguard for
  each; **5 open questions** stated honestly as unconfirmed
- **The 100% ledger: 1,777 tracked items** across 28 categories at their full
  targets, printed next to the smaller line each trophy actually requires;
  the category counts sum exactly to the grand total. Money ($250,000
  laundered, $100,000 spent) is kept on separate lines and never counted as items
- **Per-source claim counts and a coverage matrix** (22 sources × 8 trophy
  groups), computed from the data file itself — no listed source is unused,
  no group rests on a single voice

## What is inside

- **Tracker hero** — the dashboard described above; it updates the moment you
  tick a trophy or move a counter, and its at-risk count drains as you secure
  the risky trophies.
- **Checklist & guide** — all 55 trophies grouped by the seven roadmap stages,
  with grade chips, hidden / missable / watch / at-risk / unconfirmed badges,
  filters, search, a spoiler setting that masks unearned story and hidden
  trophies, and per-trophy counters for everything PlayStation tracks
  (meditations, stunts, range golds, races, choices, dollars and more). Every
  guide shows the official description, an "in short" summary, risk and
  disagreement boxes where they apply, and numbered steps that each cite their
  sources.
- **Roadmap & decisions** — the seven-stage route to the platinum and the 100%
  gold, per-stage progress, a "next up" panel, and the roadmap's **editorial
  decisions**: for every disputed headline number, the figure this guide plans
  by, with the dispute linked.
- **Ledger** — the 34 adjudicated disputes (each linked to its trophy's guide),
  the 16-entry risk register, the unconfirmed questions, and the full 100%
  ledger with its trophy-target vs 100%-target table and separate money lines.
- **Sources & coverage** — the numbered source table with per-source claim
  counts, and the coverage matrix.
- **Tracker state** — earned trophies, counters and the spoiler setting are
  saved in the browser (localStorage). Export downloads the state as JSON;
  Import reads it back on any machine.

## Run it

The app is plain static files with no build step and no network needs:

```
node serve.ts
```

then open the local address it prints (http://localhost:8080). Opening
`app/index.html` directly in a desktop browser works too — serve it over HTTP
if your browser refuses to fetch the local data files from `file://`.

## Build the submission dossier

```
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

This copies `app/` and `screenshots/` into `out/` and writes
`out/dossier.json` with the vendored make.fun library in `vendor/`, which is
kept byte-identical to the kit's copy.

## Notes on the data

Trophy names, descriptions and grades are the official list as published for
PlayStation 5. Guide text is original to this entry: it paraphrases the public
guides listed in the app's Sources tab and cites them by number beside every
step. Where sources disagree, the Ledger shows both versions and this guide's
call rather than picking a side in secret; where a trigger is not yet known,
the entry says "unconfirmed" on its face. No guide text, artwork or logos are
reproduced from any publisher.

## License

MIT — see `LICENSE`.
