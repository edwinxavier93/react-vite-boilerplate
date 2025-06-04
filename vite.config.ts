import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";

export default defineConfig({
  test: {
    ...configDefaults,
    globals: true,
    environment: "jsdom",
    setupFiles: "./test/setup.ts",
    coverage: {
      include: ["test/**/*"],
      exclude: ["!test/**/*"],
      reporter: ["text", "html"],
    },
  },
});
