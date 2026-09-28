# Sidebar

A composable, themeable and customizable sidebar component — the app shell's navigation, collapsible on desktop and a Sheet on mobile. From shadcn/ui (new-york-v4), exported as `PereiraUI.Sidebar`.

## How it responds
- Desktop (≥768px): a fixed 16rem column. `collapsible="offcanvas"` slides it away, `"icon"` shrinks it to a 3rem icon rail, `"none"` keeps it.
- Mobile (<768px, `useIsMobile`): the same content renders inside a Sheet (18rem) opened by `SidebarTrigger` or `toggleSidebar()`. You write one sidebar; it adapts.
- ⌘/Ctrl+B toggles it. State persists in the `sidebar_state` cookie.

## Parts
`SidebarProvider` (wraps the layout) › `Sidebar side variant collapsible` › `SidebarHeader`, `SidebarContent` › `SidebarGroup` (`SidebarGroupLabel`, `SidebarGroupAction`, `SidebarGroupContent` › `SidebarMenu` › `SidebarMenuItem` › `SidebarMenuButton isActive tooltip`, `SidebarMenuAction`, `SidebarMenuBadge`, `SidebarMenuSub`…), `SidebarFooter`, `SidebarRail`; beside it `SidebarInset` holds the page. `useSidebar()` gives `open`, `openMobile`, `isMobile`, `toggleSidebar`.

## Consumer provides
Nav data, icons (lucide, 16px), `isActive` on the current item, `tooltip` labels for icon mode, and the page header with a `SidebarTrigger` (see the SidebarMobile page and SiteHeader).

## Rules
Colours come from the `sidebar-*` tokens (with an accent on, `sidebar-primary` follows it). `variant`: `sidebar` (flush), `floating` (card), `inset` (page sits in a rounded inset). Group items under short labels; keep secondary links (Support, Feedback) in `SidebarFooter` or a bottom group.
