import { Button, Card, CardDescription, CardHeader, CardTitle, PageHeader } from "@p-ui/react"
import { DownloadIcon, PlusIcon } from "lucide-react"

const KPIS = [
  { label: "Active", value: "12" },
  { label: "In maintenance", value: "2" },
  { label: "Km this month", value: "48.210" },
]

export default function PageHeaderExample() {
  return (
    <PageHeader
      className="w-full"
      eyebrow="Fleet"
      title="Trucks"
      meta="14 trucks"
      description="Every truck in the fleet, with its driver, documents and the last odometer reading."
      actions={
        <>
          <Button variant="outline">
            <DownloadIcon /> Export
          </Button>
          <Button>
            <PlusIcon /> New truck
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-3">
        {KPIS.map((k) => (
          <Card key={k.label} size="sm">
            <CardHeader>
              <CardDescription>{k.label}</CardDescription>
              <CardTitle className="text-2xl tabular-nums">{k.value}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
    </PageHeader>
  )
}
