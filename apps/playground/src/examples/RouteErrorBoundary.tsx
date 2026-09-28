import * as React from "react"
import { Button, RouteErrorBoundary } from "@p-ui/react"

function Widget({ broken }: { broken: boolean }) {
  if (broken) throw new Error("Widget failed to render: cannot read properties of undefined (reading 'plate')")
  return <p className="text-sm text-muted-foreground">This widget renders fine until you break it.</p>
}

export default function RouteErrorBoundaryExample() {
  const [broken, setBroken] = React.useState(false)
  return (
    <div className="flex w-full flex-col items-start gap-4">
      <Button variant="outline" onClick={() => setBroken(true)} disabled={broken}>
        Break this widget
      </Button>
      <RouteErrorBoundary
        scope="playground.widget"
        onError={(error, _info, scope) => console.warn(`[${scope}]`, error.message)}
        onReset={() => setBroken(false)}
      >
        <Widget broken={broken} />
      </RouteErrorBoundary>
    </div>
  )
}
