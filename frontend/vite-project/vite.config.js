import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import AutoImport from "unplugin-auto-import/vite";


export default defineConfig({
  plugins: [
    react(),
    AutoImport({
      imports: ["react", "react-router-dom"], // Auto-import React and React Router functions
      dts: "./src/auto-imports.d.ts", // Generate type definitions
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Alias @ to ./src
    },
  },
});
