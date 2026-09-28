import * as React from "react"

export const THEMES = [
  { id: "neutral-light", label: "Neutral" },
  { id: "neutral-dark", label: "Neutral Dark" },
  { id: "zinc-light", label: "Zinc" },
  { id: "zinc-dark", label: "Zinc Dark" },
  { id: "stone-light", label: "Stone" },
  { id: "stone-dark", label: "Stone Dark" },
] as const
export const ACCENTS = ["none", "blue", "orange"] as const
export type ThemeId = (typeof THEMES)[number]["id"]
export type Accent = (typeof ACCENTS)[number]

function read<T extends string>(key: string, allowed: readonly T[], fallback: T): T {
  try {
    const v = localStorage.getItem(key) as T | null
    return v && allowed.includes(v) ? v : fallback
  } catch {
    return fallback
  }
}

/** Theme + accent live on <html> as data-theme / data-accent, exactly how an app would set them. */
export function useThemeState() {
  const [theme, setTheme] = React.useState<ThemeId>(() => read("pui-theme", THEMES.map((t) => t.id), "neutral-light"))
  const [accent, setAccent] = React.useState<Accent>(() => read("pui-accent", ACCENTS, "none"))
  React.useEffect(() => {
    const el = document.documentElement
    el.setAttribute("data-theme", theme)
    if (accent === "none") el.removeAttribute("data-accent")
    else el.setAttribute("data-accent", accent)
    try {
      localStorage.setItem("pui-theme", theme)
      localStorage.setItem("pui-accent", accent)
    } catch {
      /* storage unavailable */
    }
  }, [theme, accent])
  return { theme, setTheme, accent, setAccent }
}

export function useHashRoute() {
  const get = () => window.location.hash.replace(/^#\/?/, "") || "components"
  const [route, setRoute] = React.useState(get)
  React.useEffect(() => {
    const on = () => setRoute(get())
    window.addEventListener("hashchange", on)
    return () => window.removeEventListener("hashchange", on)
  }, [])
  return route
}
