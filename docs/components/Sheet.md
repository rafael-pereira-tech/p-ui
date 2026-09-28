# Sheet

Extends the Dialog component to display content that complements the main content of the screen — a side panel. From shadcn/ui (base-nova), exported as `PUI.Sheet`.

## When to use
Side panels: filters, details of a selected row, edit forms that keep the page visible, and the mobile navigation menu. For a short confirmation use AlertDialog; for a phone-first bottom panel use Drawer.

## Parts
`Sheet` › `SheetTrigger render={…}` › `SheetContent side` (`SheetHeader` › `SheetTitle`, `SheetDescription`; body; `SheetFooter` with `SheetClose`).

## Consumer provides
`open`/`onOpenChange` or `defaultOpen`; `side`: `right` (default) | `left` | `top` | `bottom`; `showCloseButton={false}` to hide the ×; always a `SheetTitle`.

## Rules
`background` panel, `shadow-lg`, border on the inner edge, overlay `black/50`. Left/right sheets are 3/4 of the screen up to `sm:max-w-sm`; widen with `className="sm:max-w-lg"`. Put the primary action at the bottom in `SheetFooter`.
