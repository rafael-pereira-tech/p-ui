// tokens.json (the design system's source of truth) → styles/tokens.css
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const t = JSON.parse(fs.readFileSync(path.join(root, "tokens.json"), "utf8"))
const themes = t.color.themes.map((x) => x.id)
const first = themes[0]
const colorVal = (tok, th) => {
  const v = typeof tok.value === "string" ? tok.value : tok.value[th] ?? tok.value[first]
  return v.replace(/^\{(.+)\}$/, "var(--$1)")
}
let css = `/* Generated from tokens.json by scripts/build-tokens.mjs — do not edit by hand. */\n\n`
themes.forEach((th, i) => {
  const name = t.color.themes[i].name
  css += `/* ${name} */\n${i === 0 ? `:root,\n` : ""}[data-theme="${th}"] {\n`
  if (th.endsWith("-dark")) css += `  color-scheme: dark;\n`
  for (const tok of t.color.tokens) css += `  --${tok.name}: ${colorVal(tok, th)};\n`
  css += `}\n\n`
})
// Accent overlays: re-point the base roles at the accent's tokens (styles/accents.css).
let acc = `/* Generated from tokens.json by scripts/build-tokens.mjs — do not edit by hand.\n   Put data-accent="blue" | "orange" on <html> or any container. */\n\n`
const accents = [...new Set(t.color.tokens.map((x) => x.name.match(/^(blue|orange)-/)?.[1]).filter(Boolean))]
for (const a of accents) {
  acc += `[data-accent="${a}"] {\n`
  for (const tok of t.color.tokens.filter((x) => x.name.startsWith(a + "-"))) {
    acc += `  --${tok.name.slice(a.length + 1)}: var(--${tok.name});\n`
  }
  acc += `}\n\n`
}
const lens = [...(t.radius?.tokens ?? []), ...(t.spacing?.tokens ?? [])].filter((x) => x.name === "radius")
css += `:root {\n`
for (const x of lens) css += `  --${x.name}: ${x.value};\n`
for (const [k, v] of Object.entries(t.type.families)) css += `  --font-${k}: ${v};\n`
css += `}\n`
fs.writeFileSync(path.join(root, "styles/tokens.css"), css)
fs.writeFileSync(path.join(root, "styles/accents.css"), acc.trimEnd() + "\n")
console.log(`tokens.css: ${themes.length} themes, ${accents.length} accents, ${t.color.tokens.length} colours`)
