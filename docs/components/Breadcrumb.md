# Breadcrumb

Displays the path to the current resource using a hierarchy of links. From shadcn/ui (base-nova), exported as `PUI.Breadcrumb`.

## Parts
`Breadcrumb` › `BreadcrumbList` › `BreadcrumbItem` (`BreadcrumbLink href|render`, or `BreadcrumbPage` for the current one), `BreadcrumbSeparator`, `BreadcrumbEllipsis` (collapse middle levels, often into a DropdownMenu).

## Rules
`muted-foreground` links, `foreground` current page. In app headers hide it below `sm` (`className="hidden sm:block"`).
