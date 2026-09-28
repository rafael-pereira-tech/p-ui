import { Button, Tooltip, TooltipContent, TooltipTrigger } from "@pereira-ui/react"

export default function TooltipExample({ defaultOpen = false }: { defaultOpen?: boolean }) {
  return (
    <div className="pt-10">
      <Tooltip defaultOpen={defaultOpen}>
        <TooltipTrigger asChild><Button variant="outline">Hover</Button></TooltipTrigger>
        <TooltipContent><p>Add to library</p></TooltipContent>
      </Tooltip>
    </div>
  )
}
