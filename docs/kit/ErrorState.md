# ErrorState

A load or action that failed. p-ui app kit, exported as `PUI.ErrorState`; registry `@p-ui/error-state`.

## Parts
Destructive `Alert` › `title` (default "Something went wrong") › `message` › retry Button when `onRetry` is given (`retryLabel` to localise).

## Rules
`message` is for the user: what failed and what they can do. Technical detail goes to the error report, not the screen. Always offer retry when a refetch is possible; the Button calls `onRetry`, the page refetches. Use it in place of the content that failed, not as a toast.
