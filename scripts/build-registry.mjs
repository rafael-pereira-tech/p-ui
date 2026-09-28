// Builds the p-ui shadcn registry from packages/react into apps/playground/public/r/.
//
// Consumers point components.json at the published files and pull items with the
// shadcn CLI, owning the code from then on:
//   "registries": { "@p-ui": "https://rafael-pereira-tech.github.io/p-ui/r/{name}.json" }
//   npx shadcn@latest add @p-ui/style @p-ui/button
//
// Items: every component in packages/react/src/components (registry:ui), the hooks
// (registry:hook) and `style` (registry:style): the p-ui tokens, themes, accents and the
// Tailwind layer (styles/*.css) converted to the registry `css` object, so a consumer's
// stylesheet gets the same CSS the package ships.
import fs from "node:fs"
import path from "node:path"
import postcss from "postcss"

const ROOT = path.resolve(import.meta.dirname, "..")
const PKG = path.join(ROOT, "packages/react")
const OUT = path.join(ROOT, "apps/playground/public/r")
const NAMESPACE = "@p-ui"
const HOMEPAGE = "https://rafael-pereira-tech.github.io/p-ui/"
const SCHEMA_ITEM = "https://ui.shadcn.com/schema/registry-item.json"
const SCHEMA_REGISTRY = "https://ui.shadcn.com/schema/registry.json"
const NPM_DEPS = ["@base-ui/react", "cmdk", "sonner", "next-themes", "lucide-react", "class-variance-authority", "cn"]
const DOC_NAME = { sonner: "Toaster" }

const pascal = (name) => DOC_NAME[name] ?? name.split("-").map((s) => s[0].toUpperCase() + s.slice(1)).join("")

function docMeta(name) {
  const file = path.join(ROOT, "docs/components", `${pascal(name)}.md`)
  if (!fs.existsSync(file)) return { title: pascal(name), description: "" }
  const lines = fs.readFileSync(file, "utf8").split("\n")
  const title = (lines[0] ?? "").replace(/^#\s*/, "").trim() || pascal(name)
  const first = lines.slice(1).find((l) => l.trim())?.trim() ?? ""
  const description = first.split(" From shadcn/ui")[0].trim()
  return { title, description }
}

function npmDeps(src) {
  return NPM_DEPS.filter((d) => new RegExp(`from "${d.replace("/", "\\/")}(\\/|")`).test(src))
}

// packages/react layout → registry layout (@/components/ui/*, @/hooks/*); the CLI rewrites
// those aliases to the consumer's components.json.
function componentSource(src) {
  return src
    .replace(/from "\.\/([a-z-]+)"/g, 'from "@/components/ui/$1"')
    .replace(/from "\.\.\/hooks\/([a-z-]+)"/g, 'from "@/hooks/$1"')
}
function hookSource(src) {
  return src.replace(/from "\.\/([a-z-]+)"/g, 'from "@/hooks/$1"')
}

function registryDeps(src) {
  const deps = new Set()
  for (const m of src.matchAll(/from "@\/(?:components\/ui|hooks)\/([a-z-]+)"/g)) deps.add(`${NAMESPACE}/${m[1]}`)
  return [...deps].sort()
}

// CSS → the registry `css` object (nested at-rules / selectors / declarations). Blocks with
// the same key (several `@theme inline`, `@layer base`) are merged.
function normalize(s) {
  return s.replace(/\s*\n\s*/g, " ").replace(/\s+/g, " ").trim()
}
function merge(target, key, value) {
  if (typeof value === "object" && typeof target[key] === "object") {
    for (const [k, v] of Object.entries(value)) merge(target[key], k, v)
  } else {
    target[key] = value
  }
}
function cssToObject(container) {
  const obj = {}
  for (const node of container.nodes ?? []) {
    if (node.type === "comment") continue
    if (node.type === "decl") merge(obj, node.prop, node.value + (node.important ? " !important" : ""))
    else if (node.type === "atrule") merge(obj, `@${node.name}${node.params ? " " + normalize(node.params) : ""}`, node.nodes ? cssToObject(node) : {})
    else if (node.type === "rule") merge(obj, normalize(node.selector), cssToObject(node))
  }
  return obj
}
function cssFile(name) {
  return cssToObject(postcss.parse(fs.readFileSync(path.join(PKG, "styles", name), "utf8")))
}

function buildStyle() {
  const css = {
    '@import "tw-animate-css"': {},
    '@import "@fontsource-variable/geist"': {},
    '@import "@fontsource-variable/geist-mono"': {},
  }
  for (const file of ["shadcn.css", "tokens.css", "accents.css", "theme.css"]) {
    for (const [k, v] of Object.entries(cssFile(file))) {
      if (k.startsWith("@import")) continue // tw-animate-css and ./shadcn.css are covered above
      merge(css, k, v)
    }
  }
  // The CLI writes `@theme` variables from cssVars.theme (declarations inside a generic at-rule
  // are not supported in `css`); nested @keyframes stay in css["@theme inline"].
  const theme = {}
  for (const [k, v] of Object.entries(css["@theme inline"] ?? {})) {
    if (typeof v === "string") {
      theme[k.replace(/^--/, "")] = v
      delete css["@theme inline"][k]
    }
  }
  return {
    $schema: SCHEMA_ITEM,
    name: "style",
    type: "registry:style",
    title: "p-ui style",
    description:
      "p-ui's tokens (Neutral, Zinc and Stone in light and dark, Blue and Orange accents), the Tailwind theme layer and the variants the components need. Add once per project, then set data-theme / data-accent on <html>.",
    extends: "none",
    style: "base-nova",
    iconLibrary: "lucide",
    baseColor: "neutral",
    dependencies: ["@base-ui/react", "cn", "class-variance-authority", "lucide-react", "tw-animate-css", "@fontsource-variable/geist", "@fontsource-variable/geist-mono"],
    registryDependencies: ["utils"],
    files: [],
    cssVars: { theme },
    css,
  }
}

function buildComponents() {
  const dir = path.join(PKG, "src/components")
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".tsx"))
    .sort()
    .map((file) => {
      const name = file.replace(/\.tsx$/, "")
      const content = componentSource(fs.readFileSync(path.join(dir, file), "utf8"))
      const { title, description } = docMeta(name)
      return {
        $schema: SCHEMA_ITEM,
        name,
        type: "registry:ui",
        title,
        description,
        dependencies: npmDeps(content),
        registryDependencies: registryDeps(content),
        files: [{ path: `registry/p-ui/ui/${file}`, type: "registry:ui", content }],
      }
    })
}

function buildHooks() {
  const dir = path.join(PKG, "src/hooks")
  const titles = { "use-mobile": "useIsMobile", "use-media-query": "useMediaQuery" }
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".ts"))
    .sort()
    .map((file) => {
      const name = file.replace(/\.ts$/, "")
      const content = hookSource(fs.readFileSync(path.join(dir, file), "utf8"))
      return {
        $schema: SCHEMA_ITEM,
        name,
        type: "registry:hook",
        title: titles[name] ?? name,
        description: name === "use-mobile" ? "true below 768px (the phone/desktop line), false on the server." : "Subscribe to a media query; false on the server.",
        dependencies: [],
        registryDependencies: registryDeps(content),
        files: [{ path: `registry/p-ui/hooks/${file}`, type: "registry:hook", content }],
      }
    })
}

const items = [buildStyle(), ...buildComponents(), ...buildHooks()]
fs.rmSync(OUT, { recursive: true, force: true })
fs.mkdirSync(OUT, { recursive: true })
for (const item of items) fs.writeFileSync(path.join(OUT, `${item.name}.json`), JSON.stringify(item, null, 2) + "\n")
const index = {
  $schema: SCHEMA_REGISTRY,
  name: "p-ui",
  homepage: HOMEPAGE,
  items: items.map((item) => {
    const entry = { ...item, files: item.files.map((f) => ({ path: f.path, type: f.type })) }
    delete entry.$schema
    delete entry.css // the index lists items; the full style css lives in style.json
    return entry
  }),
}
fs.writeFileSync(path.join(OUT, "registry.json"), JSON.stringify(index, null, 2) + "\n")
const cssKeys = Object.keys(items[0].css).length
console.log(`registry: ${items.length} items → ${path.relative(ROOT, OUT)} (style css: ${cssKeys} top-level rules)`)
