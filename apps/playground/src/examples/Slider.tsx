// From shadcn/ui: apps/v4/registry/new-york-v4/examples/slider-demo.tsx
import { cn } from "@p-ui/react"

import { Slider } from "@p-ui/react"

type SliderProps = React.ComponentProps<typeof Slider>

export default function SliderDemo({ className, ...props }: SliderProps) {
  return (
    <Slider
      defaultValue={[50]}
      max={100}
      step={1}
      className={cn("w-[60%]", className)}
      {...props}
    />
  )
}
