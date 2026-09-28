import { Input, Label } from "@p-ui/react"

export default function InputExample() {
  return (
    <div className="grid max-w-sm gap-3">
      <div className="grid gap-2">
        <Label htmlFor="input-email">Email</Label>
        <Input id="input-email" type="email" placeholder="Email" />
      </div>
      <Input placeholder="Invalid value" aria-invalid defaultValue="not-an-email" />
      <Input placeholder="Disabled" disabled />
    </div>
  )
}
