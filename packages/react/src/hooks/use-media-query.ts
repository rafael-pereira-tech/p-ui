import * as React from "react"

// Same contract as shadcn/ui's useMediaQuery (apps/v4/hooks/use-media-query.tsx),
// written with useSyncExternalStore so it never sets state inside an effect.
// Returns false during server rendering.
export function useMediaQuery(query: string) {
  const subscribe = React.useCallback(
    (onChange: () => void) => {
      const result = window.matchMedia(query)
      result.addEventListener("change", onChange)
      return () => result.removeEventListener("change", onChange)
    },
    [query]
  )
  return React.useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false
  )
}
