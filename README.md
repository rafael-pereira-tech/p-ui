# p-ui

A design system built on [shadcn/ui](https://ui.shadcn.com) (v4, new-york style), organised around **theme variation**: three base palettes — Neutral, Zinc, Stone — each in light and dark, plus two accent overlays — Blue and Orange — that sit on top of any of them.

| | |
|---|---|
| `packages/react` | **`@p-ui/react`** — 45 React 19 components, hooks, tokens and styles (Tailwind CSS v4) |
| `apps/playground` | Vite app with every component live, the app-shell and site-header layouts, and a token browser; deployed to GitHub Pages |
| `docs/` | The brand book (`README.md`) and one guideline file per component — also the design system's text |
| `scripts/build-ds.mjs` | Rebuilds the p-ui design-system artifact's files from this repo (`pnpm ds`) |

## Quick start

```bash
pnpm install
pnpm dev          # builds the package, then runs the playground on http://localhost:5173
pnpm check        # lint → build → typecheck → design-system build (what CI runs)
```

Requires Node 22 (`.nvmrc`) and pnpm 10.

## Using the package

```bash
pnpm add @p-ui/react
```

**With Tailwind CSS v4** (recommended — you can use the same utilities in your own code):

```css
/* app.css */
@import "tailwindcss";
@import "@p-ui/react/styles.css";   /* tokens, accents, Tailwind theme mapping */
@import "@p-ui/react/fonts.css";    /* optional: self-hosted Geist + Geist Mono */
@source "../node_modules/@p-ui/react/dist";
```

**Without Tailwind:** `import "@p-ui/react/compiled.css"` (preflight, every class the components use, tokens and fonts).

```tsx
import { Button, SiteHeader, Toaster, TooltipProvider } from "@p-ui/react"

<html data-theme="stone-dark" data-accent="orange">
```

- `data-theme`: `neutral-light` (default) · `neutral-dark` · `zinc-light` · `zinc-dark` · `stone-light` · `stone-dark`
- `data-accent` (optional, on `<html>` or any container): `blue` · `orange`

See [`packages/react/README.md`](packages/react/README.md) for the full API surface and [`docs/README.md`](docs/README.md) for the usage rules.

## Changing the design

- **Colours, radius, fonts:** edit `packages/react/tokens.json`, then `pnpm tokens` regenerates `styles/tokens.css` and `styles/accents.css`.
- **Components:** `packages/react/src/components/*.tsx` — shadcn/ui source, owned here. Add one by copying from shadcn (`apps/v4/registry/new-york-v4/ui/`), exporting it from `src/index.ts`, adding an example in `apps/playground/src/examples/<Name>.tsx` + an entry in `cards.json`, and a guideline in `docs/components/<Name>.md`.
- **Keep the design-system artifact in sync:** see [`docs/design-system-sync.md`](docs/design-system-sync.md).

## Credits

Components and themes derive from shadcn/ui (MIT). Fonts are Geist and Geist Mono (SIL OFL 1.1). Icons are Lucide (ISC). See [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md).
