import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";

export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],
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
