import * as React from "react"

// Stand-in for next/link in the shadcn examples: a plain anchor.
export function Link({ href, ...props }: Omit<React.ComponentProps<"a">, "href"> & { href: string | { pathname?: string } }) {
  return <a href={typeof href === "string" ? href : (href.pathname ?? "#")} {...props} />
}
