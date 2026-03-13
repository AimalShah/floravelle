import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite"
import react from "@astrojs/react";
import lenis from "astro-lenis";
import node from "@astrojs/node";

export default defineConfig({
  output : "hybrid",
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react(), lenis()],

  adapter: node({
    mode: "standalone"
  })
});
