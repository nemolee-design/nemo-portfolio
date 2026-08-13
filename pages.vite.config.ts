import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/nemo-portfolio/",
  build: { outDir: "pages-dist", emptyOutDir: true },
});
