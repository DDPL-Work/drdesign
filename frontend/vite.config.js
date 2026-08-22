import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],

  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
  },

  build: {
    // Target modern browsers — smaller, faster output
    target: "es2020",
    // Warn when any chunk exceeds 600KB
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Vite 8 (Rollup 4) requires manualChunks as a function
        manualChunks(id) {
          // Three.js is only used in CoreCapability (well below the fold).
          // Safe to split into a separate async chunk.
          if (id.includes("node_modules/three") || id.includes("@react-three")) {
            return "three-vendor";
          }
          // NOTE: framer-motion and lenis are NOT split — they are used in App.jsx's
          // loading screen (AnimatePresence, motion.div) and routes.jsx which are
          // critical-path. Async splitting causes the loading animation to break.
          if (id.includes("node_modules/react-dom") || id.includes("node_modules/react-router-dom")) {
            return "react-vendor";
          }
        },
      },
    },
  },
});