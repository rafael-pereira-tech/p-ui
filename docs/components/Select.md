# Select

Displays a list of options for the user to pick from—triggered by a button. From shadcn/ui (new-york-v4), exported as `PereiraUI.Select`.

## Parts
`Select` › `SelectTrigger` (`SelectValue placeholder`) › `SelectContent` › `SelectGroup` (`SelectLabel`, `SelectItem value`, `SelectSeparator`).

## Consumer provides
`value`/`defaultValue`, `onValueChange`, items with unique `value` strings, a trigger width via `className`. `SelectContent position="popper"` aligns it under the trigger (default `item-aligned` overlays the trigger).

## Rules
Trigger matches Input (h-9, `radius-md`, `input` border). Content on `popover`, `shadow-md`; hovered item uses `accent`. Use for 5+ options; fewer → radio-style Buttons or Tabs.
