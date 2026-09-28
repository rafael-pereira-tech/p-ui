import { TableSkeleton } from "@p-ui/react"

export default function TableSkeletonExample() {
  return <TableSkeleton className="w-full" columns={4} rows={4} label="Loading trucks" />
}
