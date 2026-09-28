import * as React from "react"
import { AlertCircleIcon } from "lucide-react"

import { Alert, AlertAction, AlertDescription, AlertTitle } from "../components/alert"
import { Button } from "../components/button"

type ErrorStateProps = Omit<React.ComponentProps<typeof Alert>, "title" | "variant"> & {
  title?: React.ReactNode
  /** What went wrong, in the user's words; the technical detail belongs in the error report. */
  message: React.ReactNode
  /** Shows a retry Button; refetch or reset here. */
  onRetry?: () => void
  retryLabel?: React.ReactNode
}

/** A load or action that failed: what went wrong and a way to try again. */
function ErrorState({ title = "Something went wrong", message, onRetry, retryLabel = "Try again", ...props }: ErrorStateProps) {
  return (
    <Alert role="alert" variant="destructive" data-slot="error-state" {...props}>
      <AlertCircleIcon />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
      {onRetry ? (
        <AlertAction>
          <Button type="button" size="sm" variant="outline" onClick={onRetry}>
            {retryLabel}
          </Button>
        </AlertAction>
      ) : null}
    </Alert>
  )
}

export { ErrorState, type ErrorStateProps }
