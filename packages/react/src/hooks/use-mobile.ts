import { useMediaQuery } from "./use-media-query"

const MOBILE_BREAKPOINT = 768

// Same contract as shadcn/ui's useIsMobile (registry/new-york-v4/hooks/use-mobile.ts):
// true below 768px, false on the server.
export function useIsMobile() {
  return useMediaQuery(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
}
