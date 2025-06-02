import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    coverage: {
      include: ["src/test/**/*"],
      exclude: ["!src/test/**/*"],
      reporter: ["text", "html"],
    },
  },
});
