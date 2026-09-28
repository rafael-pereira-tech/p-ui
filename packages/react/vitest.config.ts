import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    environment: "jsdom",
    // globals lets Testing Library register its afterEach cleanup; tests still import from "vitest".
    globals: true,
    setupFiles: ["src/test/setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
  },
})
