import path from "path"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    fs: {
      // Allow serving files from the project root
      allow: ["../../"],
    },
  },
  resolve: {
    alias: {
      "@cy-support": path.join(__dirname, "../cypress/support"),
    },
  },
})
