import { Button, Kbd, Separator, SiteHeader } from "@p-ui/react"
import { SearchIcon } from "lucide-react"

const items = [
  { label: "Docs", href: "#docs", active: true },
  { label: "Components", href: "#components" },
  { label: "Blocks", href: "#blocks" },
  { label: "Charts", href: "#charts" },
  { label: "Themes", href: "#themes" },
]
const sections = [
  { title: "Getting started", items: [{ label: "Introduction", href: "#intro" }, { label: "Installation", href: "#install" }, { label: "Theming", href: "#theming" }] },
]

export default function SiteHeaderDemo({ menuOpen = false }: { menuOpen?: boolean }) {
  return (
    <div className="bg-muted/40 pb-6">
      <SiteHeader
        className="border-b"
        brand={<><span className="flex size-6 items-center justify-center rounded-md bg-primary text-xs font-bold text-primary-foreground">P</span>p-ui</>}
        items={items}
        sections={sections}
        onNavigate={() => {}}
        defaultMenuOpen={menuOpen}
        actions={
          <>
            <Button variant="outline" size="sm" className="w-56 justify-between font-normal text-muted-foreground">
              <span className="flex items-center gap-2"><SearchIcon />Search documentation…</span>
              <Kbd>⌘K</Kbd>
            </Button>
            <Separator orientation="vertical" />
            <Button size="sm">New project</Button>
          </>
        }
        mobileActions={
          <Button variant="ghost" size="icon" aria-label="Search"><SearchIcon /></Button>
        }
      />
      <main className="mx-auto flex max-w-3xl flex-col gap-4 p-6">
        <div className="h-8 w-2/3 rounded-md bg-muted" />
        <div className="h-4 w-full rounded-md bg-muted" />
        <div className="h-4 w-5/6 rounded-md bg-muted" />
        <div className="grid grid-cols-3 gap-4">
          <div className="aspect-video rounded-xl bg-muted" />
          <div className="aspect-video rounded-xl bg-muted" />
          <div className="aspect-video rounded-xl bg-muted" />
        </div>
      </main>
    </div>
  )
}
