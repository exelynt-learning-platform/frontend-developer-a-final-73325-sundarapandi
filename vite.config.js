import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

const setupFile = fileURLToPath(
  new URL("./src/tests/setup.js", import.meta.url)
);

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: setupFile,
    globals: true,
    css: true,
  },
});