# Toaster

An opinionated toast component for React (Sonner): mount `Toaster` once, call `toast()` anywhere. From shadcn/ui (new-york-v4), exported as `PUI.Toaster`.

## Consumer provides
One `<Toaster />` near the app root (pass `theme="dark"` in `-dark` themes, `position`), then `toast("Title", { description, action: {label, onClick} })`, `toast.success`, `toast.error`, `toast.promise`. `toast` is exported as `PUI.toast`.

## Rules
Toasts sit on `popover` with a `border` and `radius`. Use for confirmations of completed background actions ("Event has been created" + Undo). Never for errors that need a decision — use AlertDialog or an inline Alert.
