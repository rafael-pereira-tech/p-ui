import * as React from "react"

import { Skeleton } from "../components/skeleton"
import { Table, TableBody, TableCell, TableRow } from "../components/table"

type TableSkeletonProps = React.ComponentProps<typeof Table> & {
  columns: number
  rows?: number
  /** Announced to assistive tech while the table loads. */
  label?: string
}

const WIDTHS = ["55%", "70%", "60%", "50%", "65%"]

/** Placeholder rows with the final table's shape, so the page does not jump when data lands. */
function TableSkeleton({ columns, rows = 5, label = "Loading…", ...props }: TableSkeletonProps) {
  return (
    <Table aria-busy="true" aria-label={label} data-slot="table-skeleton" {...props}>
      <TableBody>
        {Array.from({ length: rows }, (_, r) => (
          <TableRow key={r}>
            {Array.from({ length: columns }, (_, c) => (
              <TableCell key={c}>
                <Skeleton className="h-4" style={{ width: WIDTHS[(r + c) % WIDTHS.length] }} />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export { TableSkeleton, type TableSkeletonProps }
