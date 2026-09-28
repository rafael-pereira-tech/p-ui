// dist/p-ui.css — precompiled stylesheet for apps that don't run Tailwind:
// preflight + every utility the components use + tokens + theme + fonts.
import { execFileSync } from "node:child_process"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const input = path.join(root, "dist/_compiled-input.css")
fs.writeFileSync(
  input,
  `@import "tailwindcss" source(none);
@import "../styles/fonts.css";
@import "../styles/index.css";
@source "./index.js";
`
)
const cli = path.join(root, "node_modules/@tailwindcss/cli/dist/index.mjs")
execFileSync(process.execPath, [cli, "-i", input, "-o", path.join(root, "dist/p-ui.css"), "--minify"], { cwd: root, stdio: "inherit" })
fs.unlinkSync(input)
let css = fs.readFileSync(path.join(root, "dist/p-ui.css"), "utf8")
// Tailwind emits self-referencing font vars from @theme inline; drop them so tokens.css wins.
css = css.replace(/--font-(sans|mono|heading):var\(--font-\1\);?/g, "")
fs.writeFileSync(path.join(root, "dist/p-ui.css"), css)
console.log("dist/p-ui.css", Math.round(css.length / 1024) + "KB")
