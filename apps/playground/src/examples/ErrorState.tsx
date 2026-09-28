import { ErrorState, toast } from "@p-ui/react"

export default function ErrorStateExample() {
  return (
    <ErrorState
      className="w-full"
      title="Could not load the trucks"
      message="The request timed out. Check the connection and try again."
      onRetry={() => toast("Retrying…")}
    />
  )
}
