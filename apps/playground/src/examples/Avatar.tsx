import { Avatar, AvatarFallback } from "@p-ui/react"

export default function AvatarExample() {
  return (
    <div className="flex items-center gap-4">
      <Avatar size="sm"><AvatarFallback>ER</AvatarFallback></Avatar>
      <Avatar><AvatarFallback>CN</AvatarFallback></Avatar>
      <Avatar size="lg"><AvatarFallback>RP</AvatarFallback></Avatar>
    </div>
  )
}
