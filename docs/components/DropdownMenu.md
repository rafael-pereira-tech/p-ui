# DropdownMenu

Displays a menu to the user — such as a set of actions or functions — triggered by a button. From shadcn/ui (base-nova), exported as `PUI.DropdownMenu`.

## Parts
`DropdownMenu` › `DropdownMenuTrigger render={…}` › `DropdownMenuContent align` › `DropdownMenuLabel`, `DropdownMenuGroup`, `DropdownMenuItem variant`, `DropdownMenuCheckboxItem`, `DropdownMenuRadioGroup`/`RadioItem`, `DropdownMenuSeparator`, `DropdownMenuShortcut`, `DropdownMenuSub` (`SubTrigger`, `SubContent`).

## Consumer provides
Items with `onSelect`; `variant="destructive"` on dangerous items; shortcuts as `DropdownMenuShortcut` text.

## Rules
`popover` surface, `shadow-md`, `radius-md`; hover/focus `accent`. Group related actions, separate destructive ones at the bottom.
