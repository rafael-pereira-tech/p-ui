import * as React from "react"
import { cn } from "cn"

import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "../components/empty"

type EmptyStateProps = Omit<React.ComponentProps<typeof Empty>, "title"> & {
  /** `no-data`: nothing exists yet, offer the create action. `no-results`: a search or filter matched nothing, offer to clear it. */
  variant?: "no-data" | "no-results"
  icon?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  /** The next step: one default Button, an `outline` one beside it at most. */
  actions?: React.ReactNode
}

/** A table, list or page with nothing to show: what is missing and the next step. */
function EmptyState({ variant = "no-data", icon, title, description, actions, className, children, ...props }: EmptyStateProps) {
  return (
    <Empty role="status" data-slot="empty-state" data-variant={variant} className={cn("border", className)} {...props}>
      <EmptyHeader>
        {icon ? <EmptyMedia variant="icon">{icon}</EmptyMedia> : null}
        <EmptyTitle>{title}</EmptyTitle>
        {description ? <EmptyDescription>{description}</EmptyDescription> : null}
      </EmptyHeader>
      {actions || children ? (
        <EmptyContent>
          {actions}
          {children}
        </EmptyContent>
      ) : null}
    </Empty>
  )
}

export { EmptyState, type EmptyStateProps }
