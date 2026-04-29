import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite"
import react from "@astrojs/react";
import lenis from "astro-lenis";
import vercel from "@astrojs/vercel";
import { fileURLToPath } from "node:url";

export default defineConfig({
  output: 'server',
  image : {
    domains : ["images.unsplash.com", "floravelleperfumes.com", "api.floravelleperfumes.com"], 
  },
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "react-dom/client": fileURLToPath(
          new URL("./src/shims/react-dom-client.ts", import.meta.url)
        )
      }
    },
    optimizeDeps: {
      force: true
    },
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
