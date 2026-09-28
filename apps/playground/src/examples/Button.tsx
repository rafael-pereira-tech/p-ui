import { Button } from "@pereira-ui/react"

function Row({ label, accent }: { label: string; accent?: "blue" | "orange" }) {
  return (
    <div data-accent={accent} className="flex flex-wrap items-center gap-2">
      <span className="w-16 text-xs text-muted-foreground">{label}</span>
      <Button>Save changes</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Delete</Button>
      <Button variant="link">Link</Button>
      <Button size="sm" disabled>Disabled</Button>
    </div>
  )
}

export default function ButtonExample() {
  return (
    <div className="flex flex-col gap-3">
      <Row label="Base" />
      <Row label="Blue" accent="blue" />
      <Row label="Orange" accent="orange" />
    </div>
  )
}
