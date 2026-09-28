# Tooltip

A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it. From shadcn/ui (new-york-v4), exported as `PUI.Tooltip`.

## Parts
`TooltipProvider` (once, near the app root) › `Tooltip` › `TooltipTrigger asChild` › `TooltipContent side sideOffset`.

## Consumer provides
A focusable trigger (usually a Button) and short text (a few words). Never put essential info or interactive content only in a tooltip.

## Rules
Inverted: `foreground` fill with `background` text, `caption` size, `radius-md`, arrow included.
