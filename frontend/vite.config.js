import react from "@vitejs/plugin-react";
// import { createRequire } from "module";
import { defineConfig } from "vite";
// const require = createRequire(import.meta.url);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": new URL("./src", import.meta.url).pathname,
    },
  },
});
