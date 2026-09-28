# SiteHeader

Responsive top navigation for sites and docs: brand, links and actions on desktop, a full-screen Menu below 1024px. p-ui addition, hand-written from shadcn/ui's own docs header (apps/v4/components/site-header.tsx, main-nav.tsx, mobile-nav.tsx).

## How it responds
- ≥1024px (`lg`): brand · ghost-button links (`aria-current` on the active one) · `actions` pushed right.
- <1024px: a two-bar "Menu" toggle that morphs into ×, the brand, and `mobileActions`. The menu is a full-width, full-height Popover with the links at 24px plus optional `sections`, over a blurred `background/90`.
- Sticky, 56px tall (`--header-height`), `background` fill; add `className="border-b"` for a hairline.

## Consumer provides
`brand` (logo node), `items: {label, href, active?}[]`, optional `sections: {title, items}[]` (mobile menu only), `actions` (desktop right side: search Button with `Kbd`, a `Separator`, one primary Button), `mobileActions` (usually one icon Button), `onNavigate(href)` for client-side routing.

## Rules
Use SiteHeader for marketing, docs and simple sites. For apps with a Sidebar, use the sidebar layout's own header instead: `SidebarTrigger` (or a ghost icon Button calling `toggleSidebar`), a vertical `Separator`, a `Breadcrumb` hidden below `sm`, and search on the right — see the Sidebar card. Keep 3–6 top-level links; more go into `sections`.
