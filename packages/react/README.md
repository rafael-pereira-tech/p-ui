# @pereira-ui/react

Pereira UI's React 19 components — shadcn/ui (new-york-v4) with six base themes and two accent overlays, plus a responsive `SiteHeader`.

## Install

```bash
pnpm add @pereira-ui/react
```

Peer dependencies: `react@^19` and `react-dom@^19` (the components take `ref` as a prop, React 19 style).

## Styles

| Import | What |
|---|---|
| `@pereira-ui/react/styles.css` | tokens + accents + Tailwind v4 theme layer. Import after `tailwindcss` and add `@source` for `node_modules/@pereira-ui/react/dist`. |
| `@pereira-ui/react/compiled.css` | Everything precompiled, for apps without Tailwind. |
| `@pereira-ui/react/fonts.css` | Geist + Geist Mono `@font-face` (variable, latin). |
| `@pereira-ui/react/tokens.css` / `accents.css` / `theme.css` | The parts of `styles.css`, if you need them separately. |
| `@pereira-ui/react/tokens.json` | The tokens as data (the design system's source of truth). |

## Themes

```html
<html data-theme="zinc-dark" data-accent="blue">
```

Dark themes end in `-dark`; the components' `dark:` styles follow that suffix (a `.dark` class works too). Accents re-point `primary`, `primary-foreground`, `chart-1…5` and `sidebar-primary(-foreground)`, and can be scoped to any subtree.

## Exports

- **Actions:** Button, ButtonGroup, Toggle, ToggleGroup
- **Forms:** Field, Label, Input, InputGroup, Textarea, Select, Checkbox, RadioGroup, Switch, Slider
- **Navigation & layout:** Sidebar (+ `SidebarProvider`, `SidebarInset`, `SidebarTrigger`, `useSidebar`…), SiteHeader, NavigationMenu, Breadcrumb, Tabs, Pagination, Command
- **Overlays:** Dialog, AlertDialog, Sheet, Drawer, Popover, HoverCard, DropdownMenu, Tooltip
- **Display:** Card, Table, Item, Accordion, Collapsible, Avatar, Badge, Kbd, Separator, ScrollArea
- **Feedback:** Alert, Toaster + `toast`, Progress, Spinner, Skeleton, Empty
- **Hooks & helpers:** `useIsMobile()` (< 768px), `useMediaQuery(query)`, `cn()`, and every `*Variants` from class-variance-authority

Wrap the app once in `<TooltipProvider>` and mount one `<Toaster />`.

## Responsive defaults

- Below 768px `useIsMobile()` is true and `Sidebar` renders as a `Sheet`; switch `Dialog` → `Drawer` with `useMediaQuery("(min-width: 768px)")`.
- `SiteHeader` shows links and actions from 1024px (`lg`) and a full-screen Menu below.
