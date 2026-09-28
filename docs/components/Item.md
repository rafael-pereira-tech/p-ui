# Item

A versatile component for displaying content with media, title, description, and actions. From shadcn/ui (new-york-v4), exported as `PUI.Item`.

## Parts
`ItemGroup` › `Item variant size asChild` › `ItemMedia variant` (icon/avatar/image), `ItemContent` (`ItemTitle`, `ItemDescription`), `ItemActions`; `ItemHeader`, `ItemFooter`, `ItemSeparator`.

## Consumer provides
`variant`: `default | outline | muted`; `size`: `default | sm`; `asChild` with an `<a>` for a clickable row.

## Rules
Use for list rows, settings rows, notifications and file lists instead of hand-built flex rows.
