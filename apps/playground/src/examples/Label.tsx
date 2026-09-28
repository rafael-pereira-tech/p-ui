import { Checkbox, Label } from "@p-ui/react"

export default function LabelExample() {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="label-terms" />
      <Label htmlFor="label-terms">Accept terms and conditions</Label>
    </div>
  )
}
