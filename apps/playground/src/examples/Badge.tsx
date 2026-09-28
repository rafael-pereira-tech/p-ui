import { Badge } from "@pereira-ui/react"

export default function BadgeExample() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>Badge</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <span data-accent="blue"><Badge>Blue</Badge></span>
      <span data-accent="orange"><Badge>Orange</Badge></span>
    </div>
  )
}
