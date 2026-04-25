import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite"
import react from "@astrojs/react";
import lenis from "astro-lenis";
import vercel from "@astrojs/vercel";

export default defineConfig({
  output: 'server',
  image : {
    domains : ["images.unsplash.com", "floravelleperfumes.com", "api.floravelleperfumes.com"], 
  },
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ['swiper', 'gsap']
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: undefined
        }
      }
    }
  },
  integrations: [react(), lenis()],
  adapter: vercel(),
});
