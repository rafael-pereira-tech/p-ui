// From shadcn/ui: apps/v4/registry/new-york-v4/examples/progress-demo.tsx
import * as React from "react"

import { Progress } from "@pereira-ui/react"

export default function ProgressDemo() {
  const [progress, setProgress] = React.useState(13)

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return <Progress value={progress} className="w-[60%]" />
}
