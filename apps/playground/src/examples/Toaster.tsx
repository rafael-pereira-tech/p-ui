import * as React from "react"
import { Button, toast, Toaster } from "@pereira-ui/react"

// shadcn's sonner-demo plus the <Toaster /> an app mounts once.
// `autoShow` fires one toast on load (used by the design-system preview).
export default function ToasterExample({ autoShow = false }: { autoShow?: boolean }) {
  const show = React.useCallback(
    () =>
      toast("Event has been created", {
        description: "Sunday, December 03, 2023 at 9:00 AM",
        action: { label: "Undo", onClick: () => console.log("Undo") },
      }),
    []
  )
  React.useEffect(() => {
    if (!autoShow) return
    const t = setTimeout(show, 100)
    return () => clearTimeout(t)
  }, [autoShow, show])
  const dark = (document.documentElement.getAttribute("data-theme") ?? "").endsWith("-dark")
  return (
    <>
      <Button variant="outline" onClick={show}>Show Toast</Button>
      <Toaster theme={dark ? "dark" : "light"} position="bottom-right" expand />
    </>
  )
}
