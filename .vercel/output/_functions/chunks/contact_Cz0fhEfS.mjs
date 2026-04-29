import { c as createComponent, $ as $$Image } from './_astro_assets_mz1BU4CT.mjs';
import { r as renderComponent, b as renderTemplate, m as maybeRenderHead } from './entrypoint_D0Sz372f.mjs';
import { $ as $$Layout } from './Layout_DJLcEx16.mjs';
import { b as bannerImg } from './banner_0MOuLiVO.mjs';

const $$Contact = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Contact Us | FloraVelle", "description": "Get in touch with our concierge team for inquiries about our collections, private consultations, or assistance in finding your perfect fragrance." }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="min-h-screen flex flex-col md:flex-row bg-[#E8E4DE]">  <div class="relative w-full md:w-1/2 h-[50vh] md:h-screen overflow-hidden group"> ${renderComponent($$result2, "Image", $$Image, { "src": bannerImg, "alt": "Floravelle Atmosphere", "class": "w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105", "inferSize": true })} <!-- Dramatic typography overlaying the image --> <div class="absolute inset-0 flex items-center justify-center bg-black/10"> <h1 class="font-heading text-6xl md:text-9xl text-white tracking-widest uppercase  md:rotate-0 origin-center whitespace-nowrap">
Reach<br class="hidden md:block">Out
</h1> </div> </div>  <div class="w-full md:w-1/2 h-auto md:h-screen flex flex-col justify-center px-6 sm:px-8 md:px-24 py-16 md:py-0 font-primary"> <div class="reveal-section max-w-xl"> <p class="text-[#A39579] tracking-[0.3em] font-medium uppercase text-sm md:text-base mb-6 md:mb-12">
Concierge Services
</p> <h2 class="text-4xl md:text-6xl text-[#3B2D20] font-heading leading-tight mb-8">
Your scent, <br> <span class="italic font-light">your signature.</span> </h2> <p class="text-lg md:text-xl text-gray-700 leading-relaxed mb-16 md:mb-24">
For inquiries about our collections, private consultations, or assistance in finding your perfect fragrance, our concierge team is at your complete disposal.
</p> <div class="space-y-12 md:space-y-16">  <div class="group cursor-pointer"> <p class="text-[#A39579] tracking-[0.2em] font-medium uppercase text-xs md:text-sm mb-2 transition-colors group-hover:text-[#8A5633]">
Direct Inquiries
</p> <div class="relative inline-block max-w-full"> <a href="mailto:floravelle.contact@gmail.com" class="text-2xl sm:text-3xl md:text-5xl font-heading text-[#3B2D20] transition-opacity hover:opacity-70 inline-block break-all sm:break-normal">
floravelle.contact@gmail.com
</a> <span class="absolute bottom-0 left-0 w-full h-[2px] bg-[#3B2D20] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"></span> </div> </div> <div class="flex flex-col md:flex-row gap-12 md:gap-24">  <div> <p class="text-[#A39579] tracking-[0.2em] font-medium uppercase text-xs md:text-sm mb-2">
Boutique
</p> <p class="text-xl md:text-2xl text-[#3B2D20] font-roboto tracking-wide">
+92 (0) 333 1619295
</p> </div>  <div> <p class="text-[#A39579] tracking-[0.2em] font-medium uppercase text-xs md:text-sm mb-2">
Atelier
</p> <p class="text-xl md:text-2xl text-[#3B2D20] font-roboto tracking-wide">
Peshawar, Pakistan
</p> </div> </div> </div> </div> </div> </section> ` })}`;
}, "/home/aimal-shah/code/floravelle/src/pages/contact.astro", void 0);

const $$file = "/home/aimal-shah/code/floravelle/src/pages/contact.astro";
const $$url = "/contact";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Contact,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
