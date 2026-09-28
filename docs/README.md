p-ui is shadcn/ui's semantic token set and component styling, organised around theme variation: three base palettes (Neutral, Zinc, Stone), each in light and dark, plus two accent overlays (Blue, Orange) that can sit on any of them. Interfaces built with it are quiet, grey-first and hairline-bordered; colour is spent on the one primary action.

## Theming model

- **Pick a base theme** with `data-theme` on `<html>`: `neutral-light` (default), `neutral-dark`, `zinc-light`, `zinc-dark`, `stone-light`, `stone-dark`. Neutral is pure grey, Zinc is cool (blue-grey), Stone is warm (brown-grey). Every theme defines the same 31 semantic colours, so components never change — only the values do.
- **Optionally add an accent** with `data-accent="blue"` or `data-accent="orange"` on `<html>` or any container. It re-points `primary`, `primary-foreground`, `chart-1…5`, `sidebar-primary` and `sidebar-primary-foreground` to `blue-*` / `orange-*`, which carry their own light and dark values. Everything else stays on the base. Accents can be scoped: one section of a page may be orange while the rest is neutral.
- Dark mode is a theme id ending in `-dark`. The components' `dark:` styles key off that suffix (and also a `.dark` class, for code pasted from shadcn).
- Change the corner shape of the whole system with the single `radius` token (0.625rem). `radius-sm` … `radius-4xl` are fixed multiples of it.
- Never hard-code a colour. Always use the semantic token (`bg-primary`, `text-muted-foreground`, `border-border` in Tailwind; `var(--primary)` in CSS).

## Colour rules

- Page on `background` with `foreground` text. Raised surfaces: `card` (Cards, Alerts) and `popover` (Select menus, Dialog-like floating panels), each with its `-foreground`.
- `primary` fills the single most important action in a region (default Button, checked Checkbox, on Switch, default Badge). Put `primary-foreground` on it — never white literal.
- `secondary` for the second action; `muted` for quiet fills (tab tracks, avatar fallback, skeletons); `accent` only for hover/focus highlights (ghost/outline Buttons, menu items). In shadcn, `accent` is a hover grey, not a brand colour — the brand colour is `primary`.
- `muted-foreground` for descriptions, placeholders and helper text on `background` or `card`.
- `destructive` marks danger: fill for destructive Buttons, text for destructive Alerts and invalid fields. Pair it with words or an icon.
- `border` for every hairline; `input` for field borders; `ring` for focus (3px at 50% opacity).
- Charts use `chart-1` (lightest) → `chart-5` (darkest). With an accent on, the chart scale follows the accent hue.
- Known contrast limits, kept exactly as shadcn ships them: `muted-foreground` on `muted` is ~4.4:1 in light themes; `ring` is ~2.6:1 on `background`; `blue-primary` / `orange-primary` as text in dark themes is < 3:1 — use accents as fills there, not as link text.

## Typography

- Set everything in Geist (`--font-sans`), code in Geist Mono (`--font-mono`). Headings use `--font-heading`, which is Geist too; swap it alone for an editorial serif if a product needs one.
- UI copy is `body` (14px / 20px). Labels and Button text are `label` (14px medium, leading 1). Badges and Tooltips are `caption` (12px).
- Page structure: `h1` (36px extrabold, tracking −0.025em, once per page) › `h2` (30px semibold, with a `border` rule under it) › `h3` (24px) › `h4` (20px). Intro text under a title: `lead` in `muted-foreground`. Long-form reading: `p` (16px, leading 28px, paragraphs 24px apart).
- Sentence case everywhere: "Save changes", "Login to your account". No trailing periods on buttons or titles; descriptions are full sentences with periods.

## Spacing, radius, elevation

- Spacing is the Tailwind scale on `spacing` (4px). Cards pad and gap `space-6`; Buttons pad `space-4` horizontally at h-9; label-to-field is `space-2`; rows of controls gap `space-2`–`space-3`.
- Radii: `radius-md` for controls (Buttons, fields, Select, Tooltip), `radius-lg` for Dialog, Alert and the tab track, `radius-xl` for Cards, full pill for Badges, circles for Avatars.
- Elevation is subtle and separated by borders first: `shadow-xs` on fields and outline Buttons, `shadow-sm` on Cards and the active tab, `shadow-md` on menus, `shadow-lg` on Dialogs. Don't stack more shadow onto a bordered surface.

## Layout and responsive behaviour

- Breakpoints are Tailwind's: `sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px. Design mobile-first; add columns and side-by-side layouts from `md` up.
- **768px is the phone/desktop line.** Below it `useIsMobile()` is true, the Sidebar becomes a Sheet, and a Dialog should become a bottom Drawer (`useMediaQuery("(min-width: 768px)")`). Keep touch targets at least h-9 and use full-width Buttons in stacked footers.
- **Two header patterns, pick by product type:**
  - Apps with navigation depth: `SidebarProvider` › `Sidebar` + `SidebarInset`, with a sticky 56px header inside holding a `SidebarTrigger` (or ghost icon Button calling `toggleSidebar`), a vertical `Separator`, a `Breadcrumb` hidden below `sm`, and search on the right (the Sidebar and SidebarMobile cards).
  - Sites, docs and marketing: `SiteHeader` — brand, 3–6 ghost links and actions on desktop; a full-screen Menu below `lg` (the SiteHeader and SiteHeaderMobile cards).
- Header height is `--header-height` (56px). Headers are sticky, `background`-filled, and separated from content by a `border` hairline, never a shadow.

## Overlays and panels: which one

- **Dialog**: a focused task in the middle of the screen (edit profile, create item). Desktop default.
- **Drawer**: the same task on phones, from the bottom, swipe to dismiss.
- **Sheet**: a side panel that keeps the page in view (filters, record details, settings, the mobile nav). `side="right"` for details, `side="left"` for navigation.
- **AlertDialog**: confirm a consequential action; cannot be dismissed by clicking outside.
- **Popover**: rich, small, anchored content (a date picker, a quick form). **HoverCard**: preview only. **Tooltip**: a short label.
- **DropdownMenu**: a list of actions from a button. **Command**: searchable actions, as a ⌘K dialog or inside a Popover.
- **Toaster** (`toast()`): confirmation after the fact, with Undo. Never for errors that need a decision.
- Every overlay gets a title (`DialogTitle`, `SheetTitle`, `DrawerTitle`, `AlertDialogTitle`), even if visually hidden.

## Components

- Load `components/bundle.css` after the tokens and use `window.PUI.*` (React 19). These are shadcn/ui's new-york-v4 components as-is, plus SiteHeader — 45 families:
  - Actions: Button, ButtonGroup, Toggle, ToggleGroup.
  - Forms: Field, Label, Input, InputGroup, Textarea, Select, Checkbox, RadioGroup, Switch, Slider.
  - Navigation and layout: Sidebar, SiteHeader, NavigationMenu, Breadcrumb, Tabs, Pagination, Command.
  - Overlays: Dialog, AlertDialog, Sheet, Drawer, Popover, HoverCard, DropdownMenu, Tooltip.
  - Display: Card, Table, Item, Accordion, Collapsible, Avatar, Badge, Kbd, Separator, ScrollArea.
  - Feedback: Alert, Toaster, Progress, Spinner, Skeleton, Empty.
  - Hooks and helpers: `useIsMobile`, `useMediaQuery`, `useSidebar`, `toast`, `cn`.
- `SiteHeader` is the one intentional addition: shadcn ships its responsive docs header only inside its website, not as a registry component, so it is rebuilt here from that code as a reusable component.
- In code, use the `@p-ui/react` package (repository `rafael-pereira-tech/p-ui`): `import { Button } from "@p-ui/react"`, and in the app stylesheet `@import "tailwindcss"; @import "@p-ui/react/styles.css";` plus `@source` for the package's `dist`. Without Tailwind, import `@p-ui/react/compiled.css`. Set `data-theme` / `data-accent` on `<html>`.
- The token names are shadcn/ui's, so components copied from shadcn keep working on these tokens unchanged.
- Wrap the app once in `TooltipProvider` and mount one `Toaster`. Build forms with `Field` (label, description, error). Every overlay gets its title.

## Iconography

- lucide-react, 16px inside Buttons, menus, tabs and Select items (auto-sized), 12px in Badges, `currentColor` stroke at the default 2px. Any SVG icon set works the same way (Tabler, Phosphor, Remix, Hugeicons); icon fonts do not get the auto-sizing. No emoji as UI.
- Icon-only Buttons (`size="icon"`) always carry `aria-label`.
- There is no logo yet: set "p-ui" in Geist semibold wherever a mark would go.

## Not synced

- From shadcn/ui: Calendar and Date Picker (react-day-picker), Chart (recharts), Carousel (embla), Combobox (Base UI), Input OTP, Resizable, Form (react-hook-form), Context Menu, Menubar, Aspect Ratio, Native Select, Direction, and the new chat set (Message, Bubble, Attachment, Marker, Message Scroller).
- The other base colours (Mauve, Olive, Mist, Taupe) and accents, the alternative styles (Nova, Maia, Lyra, Mira, Luma, Sera, Rhea), and the other font options.
- The accent themes' own `secondary` overrides were left out so an accent doesn't pull a Stone or Neutral base toward Zinc greys.
- `destructive-foreground` (defined only in the docs site, not the installable themes) and the docs site's `surface`, `code` and `selection` variables.
