// From shadcn/ui: apps/v4/registry/new-york-v4/examples/hover-card-demo.tsx

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@pereira-ui/react"
import { Button } from "@pereira-ui/react"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@pereira-ui/react"

export default function HoverCardDemo() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">@nextjs</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/vercel.png" />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@nextjs</h4>
            <p className="text-sm">
              The React Framework – created and maintained by @vercel.
            </p>
            <div className="text-xs text-muted-foreground">
              Joined December 2021
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
