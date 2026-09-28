import { render } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { TableSkeleton } from "../table-skeleton"

describe("TableSkeleton", () => {
  it("renders rows × columns placeholder cells and marks the table busy", () => {
    const { container } = render(<TableSkeleton columns={3} rows={4} label="Loading trucks" />)
    const table = container.querySelector("table")
    expect(table).toHaveAttribute("aria-busy", "true")
    expect(table).toHaveAttribute("aria-label", "Loading trucks")
    expect(container.querySelectorAll("tr")).toHaveLength(4)
    expect(container.querySelectorAll("[data-slot=skeleton]")).toHaveLength(12)
  })

  it("defaults to five rows", () => {
    const { container } = render(<TableSkeleton columns={2} />)
    expect(container.querySelectorAll("tr")).toHaveLength(5)
  })
})
