import { Label, Switch } from "@p-ui/react"

export default function SwitchExample() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Switch id="sw-airplane" defaultChecked />
        <Label htmlFor="sw-airplane">Airplane mode</Label>
      </div>
      <div data-accent="blue" className="flex items-center gap-2">
        <Switch id="sw-blue" defaultChecked />
        <Label htmlFor="sw-blue">Blue accent</Label>
      </div>
    </div>
  )
}
