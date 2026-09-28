# NavigationMenu

A collection of links for navigating websites. From shadcn/ui (new-york-v4), exported as `PUI.NavigationMenu`.

## Parts
`NavigationMenu viewport` › `NavigationMenuList` › `NavigationMenuItem` › `NavigationMenuTrigger` + `NavigationMenuContent` (rich dropdown panels), or `NavigationMenuLink asChild` with `navigationMenuTriggerStyle()` for plain links.

## Rules
Desktop only; hide it below `md`/`lg` and use SiteHeader's Menu or a Sheet on phones. Content panels on `popover` with `shadow`, links with title + one-line `muted-foreground` description.
