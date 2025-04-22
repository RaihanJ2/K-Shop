import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // Ensure this matches Vercel's Output Directory
  },
  base: "/", // Ensure base is set correctly (try './' if issues persist)
});
