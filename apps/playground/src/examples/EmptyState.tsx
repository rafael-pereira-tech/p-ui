import { Button, EmptyState } from "@p-ui/react"
import { InboxIcon, PlusIcon } from "lucide-react"

export default function EmptyStateExample() {
  return (
    <EmptyState
      className="w-full"
      icon={<InboxIcon />}
      title="No freights yet"
      description="Freights you record show up here with their route, cargo and payment."
      actions={
        <>
          <Button>
            <PlusIcon /> New freight
          </Button>
          <Button variant="outline">Import a spreadsheet</Button>
        </>
      }
    />
  )
}
