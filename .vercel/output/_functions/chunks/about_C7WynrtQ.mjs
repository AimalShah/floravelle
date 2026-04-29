import { c as createComponent, $ as $$Image } from './_astro_assets_mz1BU4CT.mjs';
import { r as renderComponent, b as renderTemplate, m as maybeRenderHead } from './entrypoint_D0Sz372f.mjs';
import { $ as $$Layout, r as renderScript } from './Layout_DJLcEx16.mjs';

const bannerImg = new Proxy({"src":"/_astro/banner2.C-1nakBw.png","width":1195,"height":896,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/aimal-shah/code/floravelle/src/assets/banner2.png";
							}
							
							return target[name];
						}
					});

const $$About = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "About Us | FloraVelle", "description": "Discover the story of FLORAVELLE, a modern fragrance house based in Pakistan. Learn about our craft and philosophy of signature presence." }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="h-[60vh] md:h-[70vh] relative flex items-center justify-center overflow-hidden"> <div class="absolute inset-0 z-0"> ${renderComponent($$result2, "Image", $$Image, { "src": bannerImg, "alt": "Atmospheric concept", "class": "w-full h-full object-cover opacity-90 scale-105 parallax-bg", "inferSize": true })} <!-- Soft gradient overlay --> <div class="absolute inset-0 bg-gradient-to-t from-[#F0EBE5] via-transparent to-black/50"></div> </div> <div class="z-10 text-center font-primary space-y-4 pt-32 px-4 reveal-section"> <h1 class="text-4xl md:text-8xl font-heading text-white tracking-widest uppercase mix-blend-overlay drop-shadow-sm">About <br class="md:hidden"> <span class="italic font-light">FLORAVELLE</span> </h1> <p class="text-sm md:text-lg font-roboto font-medium text-white/90 tracking-[0.3em] uppercase max-w-lg mx-auto leading-loose">
Elegance in Every Drop
</p> </div> </section>  <section class="container mx-auto px-6 md:px-12 py-24 md:py-40 font-primary">  <div class="reveal-section flex flex-col md:flex-row gap-12 md:gap-24 items-start mb-32 md:mb-48"> <div class="w-full md:w-1/3"> <h2 class="text-[#A39579] tracking-[0.2em] text-sm md:text-base uppercase mb-4">The Origin</h2> <div class="w-12 h-[1px] bg-[#A39579]"></div> </div> <div class="w-full md:w-2/3"> <p class="text-2xl md:text-5xl text-[#3B2D20] leading-[1.3] md:leading-[1.4] max-w-3xl font-heading"> <span class="font-semibold italic">FLORAVELLE</span> is a modern fragrance house based in Pakistan, created for those who appreciate quiet elegance, quiet confidence, and lasting impressions.
</p> </div> </div>  <div class="reveal-section flex flex-col md:flex-row gap-12 md:gap-24 items-start mb-32 md:mb-48 md:pl-24"> <div class="w-full md:w-1/3 md:order-2"> <h2 class="text-[#A39579] tracking-[0.2em] text-sm md:text-base uppercase mb-4">The Craft</h2> <div class="w-12 h-[1px] bg-[#A39579]"></div> </div> <div class="w-full md:w-2/3 md:order-1 text-left md:text-right"> <p class="text-xl md:text-4xl text-gray-700 leading-relaxed md:leading-relaxed max-w-2xl ml-auto">
Our fragrances are formulated with meticulously selected notes to deliver a luxurious, evolving scent experience that feels sophisticated from the first spray to the final, lingering dry-down.
</p> </div> </div>  <div class="reveal-section flex justify-center mb-32 md:mb-48"> <div class="bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(196,176,124,1)_40%,rgba(208,192,150,1)_72%,rgba(255,255,255,0)_100%)] h-[1px] w-full max-w-3xl opacity-50"></div> </div>  <div class="reveal-section text-center max-w-4xl mx-auto space-y-12"> <p class="text-3xl md:text-6xl text-[#3B2D20] font-heading leading-tight italic">
"We believe a fragrance should become an indelible part of your identity — subtle, memorable, and entirely timeless."
</p> <p class="text-[#A39579] font-medium tracking-[0.3em] uppercase text-sm md:text-base">
FLORAVELLE — The Signature of Presence
</p> </div> </section> ` })} ${renderScript($$result, "/home/aimal-shah/code/floravelle/src/pages/about.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/aimal-shah/code/floravelle/src/pages/about.astro", void 0);

const $$file = "/home/aimal-shah/code/floravelle/src/pages/about.astro";
const $$url = "/about";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$About,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
