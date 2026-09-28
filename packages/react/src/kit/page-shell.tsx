import * as React from "react"
import { cn } from "cn"

const WIDTHS = {
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
  "7xl": "max-w-7xl",
  full: "max-w-none",
} as const

type PageShellProps = React.ComponentProps<"main"> & {
  /** Reading width of the page; `full` for dashboards and wide tables. */
  width?: keyof typeof WIDTHS
}

/** The padded, centred frame every page sits in. Start it with a PageHeader. */
function PageShell({ width = "5xl", className, children, ...props }: PageShellProps) {
  return (
    <main
      data-slot="page-shell"
      data-width={width}
      className={cn("min-h-svh w-full px-4 py-8 sm:px-6 lg:px-8", className)}
      {...props}
    >
      <div data-slot="page-shell-content" className={cn("mx-auto flex w-full flex-col gap-8", WIDTHS[width])}>
        {children}
      </div>
    </main>
  )
}

export { PageShell, type PageShellProps }
