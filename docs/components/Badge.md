# Badge

Displays a badge or a component that looks like a badge. From shadcn/ui (base-nova), exported as `PUI.Badge`.

## When to use
Short status or metadata labels (1–2 words) next to titles, in tables and cards. Not clickable by default; use `render={<a href="…" />}` for a link badge.

## Consumer provides
- `children` text (optionally an icon, auto 12px); `variant`: `default | secondary | destructive | outline`.

## Rules
- Full pill (`rounded-full`), `caption` text style. Don't put a status meaning on colour alone — the word carries it.
