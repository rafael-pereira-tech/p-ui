# Table

A responsive table component. From shadcn/ui (new-york-v4), exported as `PUI.Table`.

## Parts
`Table` (wraps in a horizontal-scroll container) › `TableCaption`, `TableHeader` › `TableRow` › `TableHead`; `TableBody` › `TableRow` › `TableCell`; `TableFooter`.

## Rules
Hairline `border` rows, hover `muted/50`, `data-state="selected"` for selected rows. Right-align numbers (`className="text-right"`). For sorting/filtering pair with TanStack Table (shadcn's data-table pattern).
