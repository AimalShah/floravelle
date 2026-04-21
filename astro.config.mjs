import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite"
import react from "@astrojs/react";
import lenis from "astro-lenis";
import node from "@astrojs/node";

export default defineConfig({
  output: 'server',
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
  adapter: node({ mode: 'standalone' }),
});
