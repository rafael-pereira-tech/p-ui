import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  // Keep class strings readable: Tailwind v4 consumers scan dist/ with @source.
  minify: false,
  target: "es2022",
  external: ["react", "react-dom", "react/jsx-runtime"],
  banner: { js: '"use client";' },
})
