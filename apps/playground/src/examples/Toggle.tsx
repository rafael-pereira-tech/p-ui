// From shadcn/ui: apps/v4/registry/new-york-v4/examples/toggle-demo.tsx
import { BookmarkIcon } from "lucide-react"

import { Toggle } from "@p-ui/react"

export default function ToggleDemo() {
  return (
    <Toggle
      aria-label="Toggle bookmark"
      size="sm"
      variant="outline"
      className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-blue-500 data-[state=on]:*:[svg]:stroke-blue-500"
    >
      <BookmarkIcon />
      Bookmark
    </Toggle>
  )
}
