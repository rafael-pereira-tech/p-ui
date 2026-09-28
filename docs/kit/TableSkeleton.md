# TableSkeleton

Placeholder rows while a table loads. p-ui app kit, exported as `PUI.TableSkeleton`; registry `@p-ui/table-skeleton`.

## Parts
`Table` marked `aria-busy` with `label` › `rows` × `columns` cells, each a `Skeleton` bar of varying width.

## Rules
Match the final table: same `columns`, and `rows` close to the usual page size so the page does not jump. Render it in the same place the table will occupy. Pair with `EmptyState` and `ErrorState` so every list has its three states.
