"use client"

// p-ui addition — hand-written from shadcn/ui's own docs header:
// apps/v4/components/site-header.tsx, main-nav.tsx and mobile-nav.tsx.
// Same structure and classes; the Next.js router, page tree and docs-only
// widgets are replaced by props.

import * as React from "react"
import { cn } from "cn"

import { Button } from "./button"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

type SiteHeaderLink = {
  label: string
  href: string
  active?: boolean
}

type SiteHeaderSection = {
  title: string
  items: SiteHeaderLink[]
}

type SiteHeaderProps = Omit<React.ComponentProps<"header">, "children"> & {
  /** Logo or product name; after the Menu toggle on mobile, first on desktop. */
  brand?: React.ReactNode
  /** Main links: ghost buttons on desktop, large links in the mobile menu. */
  items: SiteHeaderLink[]
  /** Extra groups shown only in the mobile menu (e.g. docs sections). */
  sections?: SiteHeaderSection[]
  /** Right-side controls (search, theme switch, primary CTA). */
  actions?: React.ReactNode
  /** Right-side controls that stay visible on mobile; defaults to none. */
  mobileActions?: React.ReactNode
  /** Called with the href when a link is chosen; default lets the <a> navigate. */
  onNavigate?: (href: string) => void
  /** Open the mobile menu initially (for previews and tests). */
  defaultMenuOpen?: boolean
}

function MainNav({
  items,
  onNavigate,
  className,
  ...props
}: React.ComponentProps<"nav"> & {
  items: SiteHeaderLink[]
  onNavigate?: (href: string) => void
}) {
  return (
    <nav
      data-slot="site-header-nav"
      className={cn("items-center gap-0", className)}
      {...props}
    >
      {items.map((item) => (
        <Button
          key={item.href}
          variant="ghost"
          asChild
          size="sm"
          className="px-2.5 text-muted-foreground data-[active=true]:text-foreground"
        >
          <a
            href={item.href}
            data-active={item.active ? "true" : undefined}
            aria-current={item.active ? "page" : undefined}
            onClick={
              onNavigate
                ? (e) => {
                    e.preventDefault()
                    onNavigate(item.href)
                  }
                : undefined
            }
            className="relative items-center"
          >
            {item.label}
          </a>
        </Button>
      ))}
    </nav>
  )
}

function MobileLink({
  item,
  onNavigate,
  onOpenChange,
  className,
}: {
  item: SiteHeaderLink
  onNavigate?: (href: string) => void
  onOpenChange: (open: boolean) => void
  className?: string
}) {
  return (
    <a
      href={item.href}
      aria-current={item.active ? "page" : undefined}
      onClick={(e) => {
        if (onNavigate) {
          e.preventDefault()
          onNavigate(item.href)
        }
        onOpenChange(false)
      }}
      className={cn(
        "flex items-center gap-2 text-2xl font-medium aria-[current=page]:text-primary",
        className
      )}
    >
      {item.label}
    </a>
  )
}

function MobileNav({
  items,
  sections,
  onNavigate,
  defaultOpen,
  className,
}: {
  items: SiteHeaderLink[]
  sections?: SiteHeaderSection[]
  onNavigate?: (href: string) => void
  defaultOpen?: boolean
  className?: string
}) {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    if (defaultOpen) {
      const t = setTimeout(() => setOpen(true), 50)
      return () => clearTimeout(t)
    }
  }, [defaultOpen])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          data-slot="site-header-menu-trigger"
          className={cn(
            "h-8 touch-manipulation items-center justify-start gap-2.5 p-0! hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 active:bg-transparent dark:hover:bg-transparent",
            className
          )}
        >
          <div className="relative flex h-8 w-4 items-center justify-center">
            <div className="relative size-4">
              <span
                className={cn(
                  "absolute left-0 block h-0.5 w-4 bg-foreground transition-all duration-100",
                  open ? "top-[0.4rem] -rotate-45" : "top-1"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 block h-0.5 w-4 bg-foreground transition-all duration-100",
                  open ? "top-[0.4rem] rotate-45" : "top-2.5"
                )}
              />
            </div>
            <span className="sr-only">Toggle Menu</span>
          </div>
          <span className="flex h-8 items-center text-lg leading-none font-medium">
            Menu
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        data-slot="site-header-menu"
        className="no-scrollbar h-(--radix-popper-available-height) w-(--radix-popper-available-width) overflow-y-auto rounded-none border-none bg-background/90 p-0 shadow-none backdrop-blur duration-100 data-[state=open]:animate-none!"
        align="start"
        side="bottom"
        alignOffset={-16}
        sideOffset={14}
      >
        <div className="flex flex-col gap-12 overflow-auto px-6 py-6">
          <div className="flex flex-col gap-4">
            <div className="text-sm font-medium text-muted-foreground">
              Menu
            </div>
            <div className="flex flex-col gap-3">
              {items.map((item) => (
                <MobileLink
                  key={item.href}
                  item={item}
                  onNavigate={onNavigate}
                  onOpenChange={setOpen}
                />
              ))}
            </div>
          </div>
          {sections?.map((section) => (
            <div key={section.title} className="flex flex-col gap-4">
              <div className="text-sm font-medium text-muted-foreground">
                {section.title}
              </div>
              <div className="flex flex-col gap-3">
                {section.items.map((item) => (
                  <MobileLink
                    key={item.href}
                    item={item}
                    onNavigate={onNavigate}
                    onOpenChange={setOpen}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

function SiteHeader({
  brand,
  items,
  sections,
  actions,
  mobileActions,
  onNavigate,
  defaultMenuOpen,
  className,
  ...props
}: SiteHeaderProps) {
  return (
    <header
      data-slot="site-header"
      className={cn(
        "sticky top-0 z-50 w-full bg-background [--header-height:calc(var(--spacing)*14)]",
        className
      )}
      {...props}
    >
      <div className="px-6">
        <div className="flex h-(--header-height) items-center gap-4 **:data-[slot=separator]:h-4!">
          <MobileNav
            items={items}
            sections={sections}
            onNavigate={onNavigate}
            defaultOpen={defaultMenuOpen}
            className="flex lg:hidden"
          />
          {brand ? (
            <div
              data-slot="site-header-brand"
              className="flex items-center gap-2 font-semibold"
            >
              {brand}
            </div>
          ) : null}
          <MainNav
            items={items}
            onNavigate={onNavigate}
            className="hidden lg:flex"
          />
          <div className="ml-auto flex items-center gap-2 md:flex-1 md:justify-end">
            {actions ? (
              <div className="hidden items-center gap-2 lg:flex">{actions}</div>
            ) : null}
            {mobileActions ? (
              <div className="flex items-center gap-2 lg:hidden">
                {mobileActions}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  )
}

export { SiteHeader, type SiteHeaderLink, type SiteHeaderSection }
