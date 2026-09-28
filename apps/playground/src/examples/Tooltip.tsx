import { Button, Tooltip, TooltipContent, TooltipTrigger } from "@p-ui/react"

export default function TooltipExample({ defaultOpen = false }: { defaultOpen?: boolean }) {
  return (
    <div className="pt-10">
      <Tooltip defaultOpen={defaultOpen}>
        <TooltipTrigger render={<Button variant="outline" />}>Hover</TooltipTrigger>
        <TooltipContent><p>Add to library</p></TooltipContent>
      </Tooltip>
    </div>
  )
}
