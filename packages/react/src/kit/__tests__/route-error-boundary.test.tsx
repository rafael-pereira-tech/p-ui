import { fireEvent, render, screen } from "@testing-library/react"
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest"

import { RouteErrorBoundary } from "../route-error-boundary"

function Boom(): never {
  throw new Error("boom")
}

describe("RouteErrorBoundary", () => {
  const originalError = console.error
  beforeAll(() => {
    console.error = vi.fn()
  })
  afterAll(() => {
    console.error = originalError
  })

  it("catches the error, shows the fallback and reports it with the scope", () => {
    const onError = vi.fn()
    render(
      <RouteErrorBoundary scope="test.surface" onError={onError}>
        <Boom />
      </RouteErrorBoundary>
    )
    expect(screen.getByText("Something went wrong")).toBeInTheDocument()
    expect(screen.getByText("boom")).toBeInTheDocument()
    expect(onError).toHaveBeenCalledTimes(1)
    const [error, , scope] = onError.mock.calls[0] ?? []
    expect((error as Error).message).toBe("boom")
    expect(scope).toBe("test.surface")
  })

  it("retries on the retry button and reports again when it still fails", () => {
    const onError = vi.fn()
    const onReset = vi.fn()
    render(
      <RouteErrorBoundary scope="test.surface" onError={onError} onReset={onReset} labels={{ retry: "Tentar de novo" }}>
        <Boom />
      </RouteErrorBoundary>
    )
    onError.mockClear()
    fireEvent.click(screen.getByRole("button", { name: "Tentar de novo" }))
    expect(onReset).toHaveBeenCalledTimes(1)
    expect(onError).toHaveBeenCalled()
  })

  it("renders children when nothing throws", () => {
    render(
      <RouteErrorBoundary scope="test.surface">
        <p>fine</p>
      </RouteErrorBoundary>
    )
    expect(screen.getByText("fine")).toBeInTheDocument()
  })
})
