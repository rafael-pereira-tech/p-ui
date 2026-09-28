# EmptyState

A table, list or page with nothing to show. p-ui app kit, exported as `PUI.EmptyState`; registry `@p-ui/empty-state`.

## Parts
`EmptyState variant` › `icon` › `title` › `description` › `actions` (or children).

## Rules
`no-data` when nothing exists yet: say what will appear here and offer the create action. `no-results` when a search or filter matched nothing: say so and offer to clear it. One default Button, an `outline` one beside it at most. It carries `role="status"`, so it announces itself when it replaces a loading state.
