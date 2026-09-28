import { Label, Textarea } from "@p-ui/react"

export default function TextareaExample() {
  return (
    <div className="grid max-w-sm gap-2">
      <Label htmlFor="textarea-message">Your message</Label>
      <Textarea id="textarea-message" placeholder="Type your message here." />
    </div>
  )
}
