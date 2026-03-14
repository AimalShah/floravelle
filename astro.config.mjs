import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite"
import react from "@astrojs/react";
import lenis from "astro-lenis";

export default defineConfig({
  image : {
    domains : ["images.unsplash.com"], 
  },
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [react(), lenis()],
});
