import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { ErrorState } from "../error-state"

describe("ErrorState", () => {
  it("renders the default title, the message and an alert role", () => {
    render(<ErrorState message="Could not load trucks." />)
    expect(screen.getByRole("alert")).toBeInTheDocument()
    expect(screen.getByText("Something went wrong")).toBeInTheDocument()
    expect(screen.getByText("Could not load trucks.")).toBeInTheDocument()
  })

  it("shows a retry button only with onRetry, and calls it", async () => {
    const onRetry = vi.fn()
    const { rerender } = render(<ErrorState message="x" />)
    expect(screen.queryByRole("button")).not.toBeInTheDocument()
    rerender(<ErrorState message="x" onRetry={onRetry} retryLabel="Tentar de novo" />)
    await userEvent.click(screen.getByRole("button", { name: "Tentar de novo" }))
    expect(onRetry).toHaveBeenCalledOnce()
  })
})
