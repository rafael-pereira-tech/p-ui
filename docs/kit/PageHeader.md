# PageHeader

The block every page starts with. p-ui app kit, exported as `PUI.PageHeader`; registry `@p-ui/page-header`.

## Parts
`eyebrow` (the area the page belongs to) › `title` + `meta` (a short count or status: "12 active", "loading…") › `description` › `actions` › children (KPI cards, tabs, filters — whatever belongs under the title).

## Rules
One per page, first inside PageShell. `title` is the page's only `h1`. Actions: one default Button, `outline` or `ghost` for the rest, most important last. Keep `meta` to a number or a status word; longer context goes in `description`.
