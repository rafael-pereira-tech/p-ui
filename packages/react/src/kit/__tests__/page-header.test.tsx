import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { PageHeader } from "../page-header"

describe("PageHeader", () => {
  it("renders eyebrow, title, meta, description, actions and children", () => {
    render(
      <PageHeader eyebrow="Fleet" title="Trucks" meta="12 active" description="Every truck in the fleet." actions={<button>New truck</button>}>
        <div>kpis</div>
      </PageHeader>
    )
    expect(screen.getByRole("heading", { level: 1, name: "Trucks" })).toBeInTheDocument()
    expect(screen.getByText("Fleet")).toBeInTheDocument()
    expect(screen.getByText("12 active")).toBeInTheDocument()
    expect(screen.getByText("Every truck in the fleet.")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "New truck" })).toBeInTheDocument()
    expect(screen.getByText("kpis")).toBeInTheDocument()
  })

  it("renders nothing optional when only a title is given", () => {
    const { container } = render(<PageHeader title="Trucks" />)
    expect(container.querySelector("[data-slot=page-header-eyebrow]")).toBeNull()
    expect(container.querySelector("[data-slot=page-header-meta]")).toBeNull()
    expect(container.querySelector("[data-slot=page-header-actions]")).toBeNull()
  })
})
