# Drawer

A panel that slides in from an edge and can be dragged to dismiss (vaul); the bottom sheet of phone UIs. From shadcn/ui (new-york-v4), exported as `PereiraUI.Drawer`.

## When to use
On phones, instead of Dialog: forms, pickers and action lists that should be thumb-reachable and swipe-dismissable. On desktop, prefer Dialog or Sheet. The standard responsive pattern: `useMediaQuery("(min-width: 768px)")` → render Dialog on desktop, Drawer below 768px (the preview is this pattern at phone width).

## Parts
`Drawer direction` › `DrawerTrigger asChild` › `DrawerContent` (`DrawerHeader` › `DrawerTitle`, `DrawerDescription`; body; `DrawerFooter` with `DrawerClose`).

## Consumer provides
`open`/`onOpenChange`; `direction`: `bottom` (default) | `top` | `left` | `right`; a `DrawerTitle`.

## Rules
Bottom drawers get a `muted` grab handle, `radius-lg` top corners, max 80vh, centred header text. Stack footer buttons full-width, primary first.
