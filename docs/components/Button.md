# Button

Displays a button or a component that looks like a button. From shadcn/ui (new-york-v4), exported as `PUI.Button`.

## When to use
- `default` for the one primary action in a view; `secondary` beside it; `outline` for neutral actions on busy surfaces; `ghost` in toolbars and menus; `link` for inline navigation; `destructive` only for irreversible actions (delete, revoke).
- One `default` Button per region. Pair it with `outline` or `ghost` for Cancel.

## Consumer provides
- `children` (label, optionally a leading/trailing lucide icon — icons auto-size to 16px).
- `variant`: `default | secondary | outline | ghost | link | destructive`; `size`: `default (h-9) | xs | sm | lg | icon | icon-xs | icon-sm | icon-lg`.
- `asChild` to render your own element (e.g. an `<a>`) with Button styling.
- Native button props (`type`, `disabled`, `onClick`). Icon-only Buttons need `aria-label`.

## Theming
- Fill is `primary`; put `data-accent="blue"` or `"orange"` on an ancestor to recolour it. `link` uses `primary` as text — avoid accent `link` Buttons in dark themes (contrast < 3:1).
