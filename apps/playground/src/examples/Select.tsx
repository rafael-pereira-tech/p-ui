import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@p-ui/react"

export default function SelectExample({ defaultOpen = false }: { defaultOpen?: boolean }) {
  return (
    <Select defaultOpen={defaultOpen} defaultValue="banana">
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent position="popper">
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          {["Apple", "Banana", "Blueberry", "Grapes", "Pineapple"].map((f) => (
            <SelectItem key={f} value={f.toLowerCase()}>{f}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
