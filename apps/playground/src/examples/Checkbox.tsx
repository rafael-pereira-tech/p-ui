import { Checkbox, Label } from "@pereira-ui/react"

export default function CheckboxExample() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Checkbox id="cb-terms" />
        <Label htmlFor="cb-terms">Accept terms and conditions</Label>
      </div>
      <div className="flex items-center gap-3">
        <Checkbox id="cb-notify" defaultChecked />
        <Label htmlFor="cb-notify">Enable notifications</Label>
      </div>
      <div data-accent="orange" className="flex items-center gap-3">
        <Checkbox id="cb-orange" defaultChecked />
        <Label htmlFor="cb-orange">Orange accent</Label>
      </div>
    </div>
  )
}
