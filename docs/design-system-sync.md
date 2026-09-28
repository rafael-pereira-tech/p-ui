# Keeping the design-system artifact in sync

The Pereira UI design system (a Claude "Design System" artifact) is generated from this repository. The repo is the source of truth; the artifact is its published, browsable form.

## What maps where

| Artifact file (`project/…`) | Source in this repo |
|---|---|
| `tokens.json` | `packages/react/tokens.json` (+ a `meta` block naming this repo and commit) |
| `README.md` | `docs/README.md` |
| `components/<Name>/README.md` | `docs/components/<Name>.md` |
| `components/<Name>/preview.html` | `apps/playground/src/examples/<Name>.tsx`, compiled with the card settings in `cards.json` |
| `components/bundle.js` | `packages/react/src/index.ts` as one IIFE assigning `window.PereiraUI` |
| `components/bundle.css` | `packages/react/styles/{theme,accents}.css` + the utilities used by the bundle and previews |
| `components/index.d.ts` | `packages/react/dist/index.d.ts` |
| `components/lib/react*.js` | React / React DOM 19 as classic scripts |
| `components/Cover/preview.html` | `design-system/static/Cover/preview.html` |
| `fonts/*` | `packages/react/fonts/*` |
| `design-system.json` (the index) | **not generated** — owned by the artifact; only its `lastChange` (and `libraries`, from `design-system/out/libraries.json`) change on a sync |

## Syncing

1. Merge to `main`; CI builds the files and uploads them as the `design-system` workflow artifact.
2. Locally: `pnpm ds` writes the same files to `design-system/out/project/`.
3. Publish: in Claude, open the design system and press **Sync from GitHub** (or ask "re-sync Pereira UI from rafael-pereira-tech/pereira-ui"). Claude runs `pnpm ds` on the current `main`, publishes only the changed files, and sets `lastChange.via` to `GitHub · rafael-pereira-tech/pereira-ui@<sha>`.

Edits made directly in the artifact (a token tweak in its page, a comment) are not written back here automatically: port them to the files above, or ask Claude to diff the artifact against `pnpm ds` output before syncing.
