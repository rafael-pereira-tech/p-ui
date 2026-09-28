"use client"

import * as React from "react"
import { ErrorBoundary, type FallbackProps } from "react-error-boundary"

import { Button } from "../components/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/card"

type RouteErrorBoundaryLabels = {
  title: React.ReactNode
  description: React.ReactNode
  retry: React.ReactNode
  reload: React.ReactNode
}

const DEFAULT_LABELS: RouteErrorBoundaryLabels = {
  title: "Something went wrong",
  description: "This part of the page failed to render. You can try again or reload the page.",
  retry: "Try again",
  reload: "Reload page",
}

type RouteErrorBoundaryProps = {
  children: React.ReactNode
  /** Names the surface in error reports ("app-shell", "invoices"), so one handler serves every boundary. */
  scope: string
  /** Report the error: Sentry, PostHog, console. Called again on every failed retry. */
  onError?: (error: Error, info: React.ErrorInfo, scope: string) => void
  /** Runs when the user retries; reset the state that caused the error here (invalidate queries, clear a draft). */
  onReset?: () => void
  labels?: Partial<RouteErrorBoundaryLabels>
}

function Fallback({ error, resetErrorBoundary, labels }: FallbackProps & { labels: RouteErrorBoundaryLabels }) {
  const message = error instanceof Error ? error.message : String(error)
  return (
    <section data-slot="route-error-boundary" className="mx-auto w-full max-w-2xl px-4 py-12 sm:px-6">
      <Card>
        <CardHeader>
          <CardTitle>{labels.title}</CardTitle>
          <CardDescription>{labels.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <pre data-slot="route-error-boundary-message" className="overflow-x-auto rounded-md bg-muted px-3 py-2 font-mono text-xs text-muted-foreground">
            {message}
          </pre>
        </CardContent>
        <CardFooter className="gap-2">
          <Button type="button" onClick={resetErrorBoundary}>
            {labels.retry}
          </Button>
          <Button type="button" variant="outline" onClick={() => window.location.reload()}>
            {labels.reload}
          </Button>
        </CardFooter>
      </Card>
    </section>
  )
}

/** Catches render errors in one part of a page (a route's outlet, a widget) without taking the shell down. */
function RouteErrorBoundary({ children, scope, onError, onReset, labels }: RouteErrorBoundaryProps) {
  const merged = { ...DEFAULT_LABELS, ...labels }
  return (
    <ErrorBoundary
      fallbackRender={(props) => <Fallback {...props} labels={merged} />}
      onError={(error, info) => onError?.(error as Error, info, scope)}
      onReset={onReset}
    >
      {children}
    </ErrorBoundary>
  )
}

export { RouteErrorBoundary, type RouteErrorBoundaryProps, type RouteErrorBoundaryLabels }
