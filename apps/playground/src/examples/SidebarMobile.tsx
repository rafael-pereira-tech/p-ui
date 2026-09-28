import * as React from "react"
import { AppSidebar } from "../blocks/sidebar-16/components/app-sidebar"
import { SiteHeader } from "../blocks/sidebar-16/components/site-header"
import { SidebarInset, SidebarProvider } from "@pereira-ui/react"

// sidebar-16 (apps/v4/registry/new-york-v4/blocks/sidebar-16/page.tsx) at phone width.
// Same markup; the three tiles sit in one row and the tall placeholder is min-h-64 instead of min-h-[100vh] so the card has a fixed height,
// and the header's sidebar button is pressed on load: below 768px the Sidebar opens as a Sheet.
export default function SidebarMobile() {
  React.useEffect(() => {
    const t = setTimeout(() => (document.querySelector("header button") as HTMLElement | null)?.click(), 150)
    return () => clearTimeout(t)
  }, [])
  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset>
            <div className="flex flex-1 flex-col gap-4 p-4">
              <div className="grid auto-rows-min grid-cols-3 gap-4">
                <div className="aspect-video rounded-xl bg-muted/50" />
                <div className="aspect-video rounded-xl bg-muted/50" />
                <div className="aspect-video rounded-xl bg-muted/50" />
              </div>
              <div className="min-h-64 flex-1 rounded-xl bg-muted/50 md:min-h-min" />
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}
