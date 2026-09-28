import * as React from "react"
import {
  Badge,
  Button,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SiteHeader,
  ToggleGroup,
  ToggleGroupItem,
  TooltipProvider,
} from "@p-ui/react"
import { ArrowLeftIcon, PaletteIcon } from "lucide-react"

import cards from "./examples/cards.json"
import { TokensPage } from "./TokensPage"
import { ACCENTS, THEMES, useHashRoute, useThemeState, type Accent, type ThemeId } from "./theme"

type Card = { group: string; height: number; width?: number; page?: boolean; subtitle?: string }
const CARDS = cards as Record<string, Card>

const modules = import.meta.glob<{ default: React.ComponentType }>("./examples/*.tsx", { eager: true })
const EXAMPLES: Record<string, React.ComponentType> = Object.fromEntries(
  Object.entries(modules).map(([path, mod]) => [path.replace("./examples/", "").replace(".tsx", ""), mod.default])
)

// Full-page layouts render on their own route instead of inside a card.
const LAYOUTS = ["Sidebar", "SiteHeader"] as const
const GROUP_ORDER = ["Actions", "Forms", "Navigation", "Overlays", "Display", "Feedback"]

function ThemeControls({ stacked = false }: { stacked?: boolean }) {
  const { theme, setTheme, accent, setAccent } = React.useContext(ThemeCtx)
  return (
    <div className={stacked ? "grid gap-4" : "flex items-center gap-2"}>
      <div className={stacked ? "grid gap-2" : "contents"}>
        {stacked && <Label>Theme</Label>}
        <Select value={theme} onValueChange={(v) => setTheme(v as ThemeId)}>
          <SelectTrigger size="sm" className={stacked ? "w-full" : "w-36"} aria-label="Theme">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {THEMES.map((t) => (
              <SelectItem key={t.id} value={t.id}>
                {t.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className={stacked ? "grid gap-2" : "contents"}>
        {stacked && <Label>Accent</Label>}
        <ToggleGroup
          type="single"
          size="sm"
          variant="outline"
          value={accent}
          onValueChange={(v) => v && setAccent(v as Accent)}
          aria-label="Accent"
        >
          {ACCENTS.map((a) => (
            <ToggleGroupItem key={a} value={a} className="px-2.5 capitalize">
              {a}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
    </div>
  )
}

const ThemeCtx = React.createContext<ReturnType<typeof useThemeState>>(null as never)

function ComponentsPage() {
  // cmdk scrolls its selected item into view on mount, which drags the whole page down; undo that once.
  React.useEffect(() => {
    const id = requestAnimationFrame(() => requestAnimationFrame(() => window.scrollTo(0, 0)))
    return () => cancelAnimationFrame(id)
  }, [])
  const groups = GROUP_ORDER.map((g) => ({
    group: g,
    names: Object.keys(CARDS).filter((n) => CARDS[n].group === g && !CARDS[n].page && EXAMPLES[n]),
  }))
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-balance">Components</h1>
        <p className="text-xl text-muted-foreground">
          All {Object.keys(EXAMPLES).length - 2} p-ui components, live. Switch theme and accent in the header.
        </p>
      </div>
      {groups.map(({ group, names }) => (
        <section key={group} className="flex flex-col gap-4">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">{group}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {names.map((n) => {
              const Example = EXAMPLES[n]
              const wide = (CARDS[n].width ?? 0) > 700 || ["Field", "Table", "Button", "InputGroup"].includes(n)
              return (
                <div key={n} id={n} className={`flex min-w-0 flex-col rounded-xl border ${wide ? "md:col-span-2" : ""}`}>
                  <div className="flex items-center justify-between gap-2 border-b px-4 py-2">
                    <span className="text-sm font-medium">{n}</span>
                    {CARDS[n].subtitle && <span className="truncate text-xs text-muted-foreground">{CARDS[n].subtitle}</span>}
                  </div>
                  <div className="flex min-h-32 flex-1 items-center justify-center overflow-x-auto p-6">
                    <Example />
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      ))}
    </main>
  )
}

function LayoutsPage() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-extrabold tracking-tight">Layouts</h1>
        <p className="text-xl text-muted-foreground">
          Full-page patterns. Open one and resize the window: below 768px the sidebar becomes a Sheet, below 1024px the site header collapses into a Menu.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {LAYOUTS.map((n) => (
          <a key={n} href={`#/layout/${n}`} className="flex flex-col gap-2 rounded-xl border p-6 transition-colors hover:bg-accent">
            <span className="font-semibold">{n === "Sidebar" ? "App shell — Sidebar + sticky header" : "Site header — top navigation"}</span>
            <span className="text-sm text-muted-foreground">{CARDS[n].subtitle}</span>
          </a>
        ))}
      </div>
    </main>
  )
}

function LayoutRoute({ name }: { name: string }) {
  const Example = EXAMPLES[name]
  if (!Example) return <NotFound />
  return (
    <>
      <Example />
      <Button asChild size="sm" variant="secondary" className="fixed right-4 bottom-4 z-[60] shadow-md">
        <a href="#/layouts">
          <ArrowLeftIcon /> Back to playground
        </a>
      </Button>
    </>
  )
}

function NotFound() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <p className="text-muted-foreground">Page not found.</p>
    </main>
  )
}

export function App() {
  const themeState = useThemeState()
  const route = useHashRoute()

  if (route.startsWith("layout/")) {
    return (
      <ThemeCtx.Provider value={themeState}>
        <TooltipProvider>
          <LayoutRoute name={route.slice("layout/".length)} />
        </TooltipProvider>
      </ThemeCtx.Provider>
    )
  }

  const items = [
    { label: "Components", href: "#/components", active: route === "components" },
    { label: "Layouts", href: "#/layouts", active: route === "layouts" },
    { label: "Tokens", href: "#/tokens", active: route === "tokens" },
  ]

  return (
    <ThemeCtx.Provider value={themeState}>
      <TooltipProvider>
        <SiteHeader
          className="border-b"
          brand={
            <a href="#/components" className="flex items-center gap-2">
              <span className="flex size-6 items-center justify-center rounded-md bg-primary text-xs font-bold text-primary-foreground">P</span>
              p-ui
              <Badge variant="secondary" className="font-mono">0.1</Badge>
            </a>
          }
          items={items}
          actions={<ThemeControls />}
          mobileActions={
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Theme settings">
                  <PaletteIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-64">
                <ThemeControls stacked />
              </PopoverContent>
            </Popover>
          }
        />
        {route === "components" ? <ComponentsPage /> : route === "layouts" ? <LayoutsPage /> : route === "tokens" ? <TokensPage /> : <NotFound />}
      </TooltipProvider>
    </ThemeCtx.Provider>
  )
}
