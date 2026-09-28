import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { EmptyState } from "../empty-state"

describe("EmptyState", () => {
  it("renders title and description", () => {
    render(<EmptyState title="No freights" description="Create the first one" />)
    expect(screen.getByText("No freights")).toBeInTheDocument()
    expect(screen.getByText("Create the first one")).toBeInTheDocument()
  })

  it("renders the action and calls it", async () => {
    const onClick = vi.fn()
    render(<EmptyState title="No freights" actions={<button onClick={onClick}>New trip</button>} />)
    await userEvent.click(screen.getByRole("button", { name: /new trip/i }))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it("renders no content block without actions or children", () => {
    const { container } = render(<EmptyState variant="no-results" title="Nothing" />)
    expect(screen.queryByRole("button")).not.toBeInTheDocument()
    expect(container.querySelector("[data-slot=empty-content]")).toBeNull()
  })

  it("exposes the variant and a status role", () => {
    const { container } = render(<EmptyState variant="no-results" title="x" />)
    expect(container.querySelector("[data-variant=no-results]")).toBeInTheDocument()
    expect(screen.getByRole("status")).toBeInTheDocument()
  })
})
