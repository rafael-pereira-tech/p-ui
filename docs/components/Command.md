# Command

Command menu for search and quick actions (cmdk). From shadcn/ui (base-nova), exported as `PUI.Command`.

## Parts
`Command` › `CommandInput`, `CommandList` › `CommandEmpty`, `CommandGroup heading` › `CommandItem onSelect` (+ `CommandShortcut`), `CommandSeparator`. `CommandDialog open onOpenChange` wraps it in a Dialog for ⌘K palettes.

## Rules
Fuzzy search is built in. Put the ⌘K palette behind the header's search Button (see SiteHeader); inside a Popover it becomes a Combobox.
