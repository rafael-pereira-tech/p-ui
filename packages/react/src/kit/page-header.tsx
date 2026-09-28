import * as React from "react"
import { cn } from "cn"

type PageHeaderProps = Omit<React.ComponentProps<"header">, "title"> & {
  /** Section or product area the page belongs to ("Fleet", "Accounts"). */
  eyebrow?: React.ReactNode
  title: React.ReactNode
  /** A short count or status beside the title ("12 active", "loading…"). */
  meta?: React.ReactNode
  description?: React.ReactNode
  /** Page-level actions: one default Button, `outline` or `ghost` for the rest. */
  actions?: React.ReactNode
}

/** The block every page starts with: eyebrow, title, meta, description, actions, and anything that belongs under them (KPIs, tabs, filters) as children. */
function PageHeader({ eyebrow, title, meta, description, actions, className, children, ...props }: PageHeaderProps) {
  return (
    <header data-slot="page-header" className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
        <div className="flex min-w-0 flex-col gap-2">
          {eyebrow ? (
            <p data-slot="page-header-eyebrow" className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
              {eyebrow}
            </p>
          ) : null}
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h1 data-slot="page-header-title" className="text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
              {title}
            </h1>
            {meta ? (
              <span data-slot="page-header-meta" className="text-sm text-muted-foreground tabular-nums">
                {meta}
              </span>
            ) : null}
          </div>
          {description ? (
            <p data-slot="page-header-description" className="max-w-2xl text-base text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>
        {actions ? (
          <div data-slot="page-header-actions" className="flex flex-wrap items-center gap-2">
            {actions}
          </div>
        ) : null}
      </div>
      {children}
    </header>
  )
}

export { PageHeader, type PageHeaderProps }
