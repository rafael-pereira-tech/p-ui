# PageShell

The padded, centred `<main>` every page sits in. p-ui app kit, exported as `PUI.PageShell`; registry `@p-ui/page-shell`.

## Parts
`PageShell width` › children, stacked with `gap-8`: a `PageHeader` first, then the page's sections.

## Rules
`width` is the reading width: `4xl`/`5xl` for forms and lists, `7xl` or `full` for dashboards and wide tables. One PageShell per route; it is the page's `<main>`, so do not nest it in another.
