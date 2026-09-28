import { Alert, AlertDescription, AlertTitle } from "@p-ui/react"
import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react"

export default function AlertExample() {
  return (
    <div className="grid max-w-xl gap-4">
      <Alert>
        <CheckCircle2Icon />
        <AlertTitle>Success! Your changes have been saved</AlertTitle>
        <AlertDescription>This is an alert with an icon, title and description.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>Unable to process your payment.</AlertTitle>
        <AlertDescription>Please verify your billing information and try again.</AlertDescription>
      </Alert>
    </div>
  )
}
