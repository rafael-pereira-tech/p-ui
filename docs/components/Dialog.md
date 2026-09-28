# Dialog

A window overlaid on either the primary window or another dialog window, rendering the content underneath inert. From shadcn/ui (new-york-v4), exported as `PUI.Dialog`.

## Parts
`Dialog` › `DialogTrigger asChild` › `DialogContent` (`DialogHeader` › `DialogTitle`, `DialogDescription`; body; `DialogFooter` with `DialogClose`).

## Consumer provides
`open`/`onOpenChange` or `defaultOpen`; a `DialogTitle` always (accessibility); `showCloseButton={false}` on `DialogContent` to hide the ×.

## Rules
Overlay `black/50`; content on `background`, `radius-lg`, `shadow-lg`, max-w-lg, p-6. Footer: primary action last (right), Cancel as `outline` inside `DialogClose`. Use for focused tasks; for confirmations of destructive actions keep copy short and the action `destructive`.
