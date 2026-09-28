# RouteErrorBoundary

Catches render errors in one part of a page without taking the shell down. p-ui app kit, exported as `PUI.RouteErrorBoundary`; registry `@p-ui/route-error-boundary` (depends on `react-error-boundary`).

## Parts
`RouteErrorBoundary scope onError onReset labels` › children. The fallback is a `Card` with the message, a retry Button (remounts the children) and a reload Button.

## Rules
One around each route outlet and around widgets that load independently. `scope` names the surface in reports ("app-shell", "invoices"); `onError` receives `(error, info, scope)`, so one handler serves every boundary. Reset the state that caused the error in `onReset` (invalidate queries, clear a draft). Every string is a prop (`labels`), English by default.
