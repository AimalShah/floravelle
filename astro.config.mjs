import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite"
import react from "@astrojs/react";
import lenis from "astro-lenis";

export default defineConfig({
  image : {
    domains : ["images.unsplash.com", "floravelleperfumes.com", "api.floravelleperfumes.com"], 
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      rollupOptions: {
        output: {
          manualChunks: undefined
        }
      }
    }
  },
  integrations: [react(), lenis()],
});
