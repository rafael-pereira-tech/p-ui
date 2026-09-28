// Builds the Pereira UI design-system artifact's files from this repository.
//
//   pnpm ds            → design-system/out/project/**
//
// The output mirrors the artifact's `project/` folder: tokens.json, README.md, the
// component guidelines and live previews, the IIFE bundle (window.PereiraUI), its
// stylesheet, types, fonts, the React 19 runtime and the cover. It does NOT write
// project/design-system.json — that index belongs to the artifact and is updated by
// whoever publishes (see docs/design-system-sync.md).
//
// Sources: packages/react (components, tokens, styles), apps/playground/src/examples
// (one example per card, plus cards.json), docs/ (brand book + guidelines),
// design-system/static (the cover).

import { execFileSync } from "node:child_process"
import fs from "node:fs"
import path from "node:path"
import { createRequire } from "node:module"
import { fileURLToPath } from "node:url"
import * as esbuild from "esbuild"

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const PKG = path.join(ROOT, "packages/react")
const PG = path.join(ROOT, "apps/playground")
const EX = path.join(PG, "src/examples")
const OUT = path.join(ROOT, "design-system/out/project")
const SHIMS = path.join(ROOT, "scripts/ds-shims")
const NAMESPACE = "PereiraUI"
const shim = (f) => path.join(SHIMS, f)
const pgRequire = createRequire(path.join(PG, "package.json"))

const sha = (() => {
  try {
    return execFileSync("git", ["rev-parse", "--short", "HEAD"], { cwd: ROOT, stdio: ["ignore", "pipe", "ignore"] }).toString().trim()
  } catch {
    return "working-tree"
  }
})()
const repo = "rafael-pereira-tech/pereira-ui"

fs.rmSync(OUT, { recursive: true, force: true })
fs.mkdirSync(path.join(OUT, "components/lib"), { recursive: true })
const write = (rel, data) => {
  const p = path.join(OUT, rel)
  fs.mkdirSync(path.dirname(p), { recursive: true })
  fs.writeFileSync(p, data)
}
const safeScript = (js) => js.replace(/<\/script/gi, "<\\/script").replace(/<!--/g, "<\\!--")

const cards = JSON.parse(fs.readFileSync(path.join(EX, "cards.json"), "utf8"))
const componentNames = fs
  .readdirSync(path.join(ROOT, "docs/components"))
  .filter((f) => f.endsWith(".md"))
  .map((f) => f.slice(0, -3))
  .sort()

// ── tokens.json, with provenance pointing at this repository ─────────────────────────────
const tokens = JSON.parse(fs.readFileSync(path.join(PKG, "tokens.json"), "utf8"))
tokens.meta = {
  source: "github",
  repo,
  ref: `main@${sha}`,
  package: "packages/react",
  paths: {
    tokens: ["packages/react/tokens.json"],
    fonts: ["packages/react/fonts"],
    assets: [],
    docs: ["docs/README.md", "docs/components", "apps/playground/src/examples"],
  },
  components: Object.fromEntries(
    componentNames.map((n) => [n, `packages/react/src/components/${n.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase().replace("toaster", "sonner")}.tsx`])
  ),
  upstream: "shadcn-ui/ui apps/v4 (new-york-v4)",
  synced: new Date().toISOString().slice(0, 10),
}
write("tokens.json", JSON.stringify(tokens, null, 2) + "\n")

// ── docs ────────────────────────────────────────────────────────────────────────────────
write("README.md", fs.readFileSync(path.join(ROOT, "docs/README.md")))
for (const n of componentNames) write(`components/${n}/README.md`, fs.readFileSync(path.join(ROOT, "docs/components", n + ".md")))

// ── fonts, cover, types ─────────────────────────────────────────────────────────────────
for (const f of fs.readdirSync(path.join(PKG, "fonts"))) write(`fonts/${f}`, fs.readFileSync(path.join(PKG, "fonts", f)))
write("components/Cover/preview.html", fs.readFileSync(path.join(ROOT, "design-system/static/Cover/preview.html")))
write("components/index.d.ts", fs.readFileSync(path.join(PKG, "dist/index.d.ts")))

// ── React 19 runtime as classic scripts (window.React, window.ReactDOM) ─────────────────
const globalsPlugin = {
  name: "globals",
  setup(b) {
    b.onResolve({ filter: /^react$/ }, () => ({ path: shim("react.js") }))
    b.onResolve({ filter: /^react-dom(\/client)?$/ }, () => ({ path: shim("react-dom.js") }))
    b.onResolve({ filter: /^react\/jsx(-dev)?-runtime$/ }, () => ({ path: shim("jsx-runtime.js") }))
  },
}
const define = { "process.env.NODE_ENV": '"production"' }
const reactVersion = pgRequire("react/package.json").version
{
  const r = await esbuild.build({ entryPoints: [shim("react19-react.js")], bundle: true, minify: true, format: "iife", define, write: false, legalComments: "none", nodePaths: [path.join(PG, "node_modules")] })
  write("components/lib/react.production.min.js", r.outputFiles[0].text)
  const d = await esbuild.build({
    entryPoints: [shim("react19-dom.js")], bundle: true, minify: true, format: "iife", define, write: false, legalComments: "none", nodePaths: [path.join(PG, "node_modules")],
    plugins: [{ name: "r", setup(b) { b.onResolve({ filter: /^react$/ }, () => ({ path: shim("react.js") })) } }],
  })
  write("components/lib/react-dom.production.min.js", d.outputFiles[0].text)
}

// ── the component bundle ────────────────────────────────────────────────────────────────
{
  const r = await esbuild.build({
    entryPoints: [path.join(PKG, "src/index.ts")], bundle: true, format: "iife", globalName: NAMESPACE, minify: true, jsx: "automatic",
    target: "es2019", legalComments: "none", define, plugins: [globalsPlugin], write: false, logLevel: "error",
    nodePaths: [path.join(PKG, "node_modules")],
  })
  const header = `/* @ds-bundle: ${JSON.stringify({ format: 4, namespace: NAMESPACE, components: componentNames.map((name) => ({ name })) })} */\n`
  const code = r.outputFiles[0].text.replace(new RegExp(`^var ${NAMESPACE}=`), `window.${NAMESPACE}=`)
  write("components/bundle.js", header + safeScript(code))
}

// ── previews: one per cards.json entry, compiled from the playground examples ────────────
const previewPlugin = {
  name: "preview",
  setup(b) {
    globalsPlugin.setup(b)
    b.onResolve({ filter: /^@pereira-ui\/react$/ }, () => ({ path: shim("pereira.js") }))
  },
}
try {
  for (const [name, c] of Object.entries(cards)) {
    let src = path.join(EX, name + ".tsx")
    if (c.patch) {
      let s = fs.readFileSync(src, "utf8")
      for (const [a, z] of c.patch) {
        if (!s.includes(a)) throw new Error(`${name}: patch target not found: ${a}`)
        s = s.replace(a, z)
      }
      src = path.join(EX, `__ds_${name}.tsx`)
      fs.writeFileSync(src, s)
    }
    const entry = `import * as React from "react"
import { createRoot } from "react-dom/client"
import Example from ${JSON.stringify(src)}
const { TooltipProvider } = window.${NAMESPACE}
function Boot() {
  React.useEffect(() => {
    const sel = ${JSON.stringify(c.click ?? null)}
    if (!sel) return
    const t = setTimeout(() => { const el = document.querySelector(sel); if (el) el.click() }, 120)
    return () => clearTimeout(t)
  }, [])
  return <TooltipProvider><Example {...${JSON.stringify(c.props ?? {})}} /></TooltipProvider>
}
createRoot(document.getElementById("root")).render(<Boot />)
`
    try {
      const r = await esbuild.build({
        stdin: { contents: entry, loader: "tsx", resolveDir: EX, sourcefile: `${name}.preview.tsx` },
        bundle: true, format: "iife", minify: true, jsx: "automatic", target: "es2019", write: false, legalComments: "none",
        define, plugins: [previewPlugin], nodePaths: [path.join(PG, "node_modules")], logLevel: "error",
      })
      const attrs = [`group="${c.group}"`, `height=${c.height}`]
      if (c.width) attrs.push(`width=${c.width}`)
      if (c.subtitle) attrs.push(`subtitle="${c.subtitle}"`)
      if (c.page) attrs.push("page")
      const html = `<!-- @dsCard ${attrs.join(" ")} -->
<!doctype html>
<html>
<head><meta charset="utf-8"><title>${name} — preview</title></head>
<body>
<!-- Compiled from ${repo}@${sha}: apps/playground/src/examples/${name}.tsx. UI parts come from window.${NAMESPACE}. -->
<div id="root"${c.pad === false ? "" : ' class="p-6"'}></div>
<script>
${safeScript(r.outputFiles[0].text)}</script>
</body>
</html>
`
      write(`components/${name}/preview.html`, html)
    } finally {
      if (c.patch) fs.unlinkSync(src)
    }
  }
} finally {
  // patched copies are removed per card above
}

// ── bundle.css: theme layer + accent overlays + every utility the bundle and previews use ─
{
  // Written inside packages/react so "tailwindcss" and "tw-animate-css" resolve from its node_modules.
  const input = path.join(PKG, ".ds-bundle-input.css")
  const rel = (p) => { const r = path.relative(path.dirname(input), p).split(path.sep).join("/"); return r.startsWith(".") ? r : "./" + r }
  fs.writeFileSync(
    input,
    `@import "tailwindcss" source(none);
@import "${rel(path.join(PKG, "styles/accents.css"))}";
@import "${rel(path.join(PKG, "styles/theme.css"))}";
@source "${rel(path.join(PKG, "src"))}";
@source "${rel(path.join(OUT, "components"))}";
`
  )
  const cli = path.join(PKG, "node_modules/@tailwindcss/cli/dist/index.mjs")
  execFileSync(process.execPath, [cli, "-i", input, "-o", path.join(OUT, "components/bundle.css"), "--minify"], { cwd: PKG, stdio: "pipe" })
  fs.unlinkSync(input)
  let css = fs.readFileSync(path.join(OUT, "components/bundle.css"), "utf8")
  // @theme inline's self-referencing font variables would shadow the page's tokens.css.
  css = css.replace(/--font-(sans|mono|heading):var\(--font-\1\);?/g, "").replace(/<\/style/gi, "<\\/style")
  fs.writeFileSync(path.join(OUT, "components/bundle.css"), css)
}

const files = []
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).forEach((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : files.push(path.relative(OUT, path.join(d, e.name)))))
walk(OUT)
write("../libraries.json", JSON.stringify([
  { name: "react", version: reactVersion, global: "React", file: "components/lib/react.production.min.js" },
  { name: "react-dom", version: reactVersion, global: "ReactDOM", file: "components/lib/react-dom.production.min.js" },
], null, 2) + "\n")
console.log(`design-system/out/project: ${files.length} files from ${repo}@${sha} (${componentNames.length} components, ${Object.keys(cards).length} previews)`)
