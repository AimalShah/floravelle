import { c as createComponent, $ as $$Image } from './_astro_assets_LkAj6goC.mjs';
import { m as maybeRenderHead, r as renderComponent, b as renderTemplate, c as addAttribute } from './entrypoint_Ch4Zg9sJ.mjs';
import { r as renderScript, $ as $$Layout } from './Layout_CehrbqJg.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { w as woo, m as mapProduct } from './woocommerce_CRAhTaKf.mjs';
import { b as bannerImg } from './banner_0MOuLiVO.mjs';
import { b as bannerImg$1 } from './banner-4_DqR_qgZ1.mjs';

const heroBg = new Proxy({"src":"/_astro/hero-4.BIK0dDtR.jpeg","width":4950,"height":2100,"format":"jpg","orientation":1}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/aimal-shah/code/floravelle/src/assets/hero-4.jpeg";
							}
							
							return target[name];
						}
					});

const heroMobileBg = new Proxy({"src":"/_astro/hero-6.3xCdkrr1.jpeg","width":736,"height":1312,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/aimal-shah/code/floravelle/src/assets/hero-6.jpeg";
							}
							
							return target[name];
						}
					});

const $$Hero = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section id="hero" class="h-[100dvh] relative overflow-hidden bg-[#F0EBE5]"> ${renderComponent($$result, "Image", $$Image, { "src": heroBg, "alt": "Floravelle Hero Desktop", "class": "absolute inset-0 w-full h-full object-cover md:object-[right_top] object-center z-0 hidden md:block", "loading": "eager", "fetchpriority": "high" })} ${renderComponent($$result, "Image", $$Image, { "src": heroMobileBg, "alt": "Floravelle Hero Mobile", "class": "absolute inset-0 w-full h-full object-cover object-center z-0 block md:hidden", "loading": "eager", "fetchpriority": "high" })} <div class="absolute inset-0 bg-black/20 z-0 block md:hidden"></div> <div class="container h-full md:px-0 px-10 mx-auto text-white flex flex-col justify-center md:gap-12 font-heading pt-32 z-10 relative"> <div class="flex flex-1 md:flex-row flex-col justify-between w-full "> <div class="h-fit overflow-hidden flex items-center"> <h1 class="md:text-[14rem] text-6xl translate-y-90 heading font-heading">Timeless</h1> </div> <div class="flex flex-col gap-2 justify-center text-xs md:text-lg font-roboto translate-y-60 opacity-0 paragraph"> <p class="text-right md:text-left">Elegance isn't occasional — it is woven into the quiet rhythm<br class="md:block hidden"> of everyday moments, shaping the way you move through the<br class="md:block hidden"> world and defining a presence that lingers long after you leave.</p> <a href="/collection" class="text-right underline cursor-pointer">EXPLORE THE COLLECTION</a> </div> </div> <div class="flex flex-1 justify-end items-center "> <div class="overflow-hidden h-fit"> <h1 class="md:text-[14rem] text-6xl text-right translate-y-96 heading leading-[0.8] py-4">Fragrance</h1> </div> </div> </div> </section> ${renderScript($$result, "/home/aimal-shah/code/floravelle/src/components/hero.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/aimal-shah/code/floravelle/src/components/hero.astro", void 0);

function Marquee() {
  const marqueeRef = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".marquee-track", {
        xPercent: -50,
        duration: 15,
        ease: "none",
        repeat: -1
      });
    }, marqueeRef);
    return () => ctx.revert();
  }, []);
  return /* @__PURE__ */ jsx("div", { ref: marqueeRef, className: "py-4 border-y bg-[#E8E4DE] overflow-hidden text-nowrap", children: /* @__PURE__ */ jsxs(
    "div",
    {
      className: "marquee-track flex whitespace-nowrap w-max",
      children: [
        /* @__PURE__ */ jsx("span", { className: "text-xl md:text-3xl font-primary font-thin text-nowrap mx-4 md:mx-8", children: "DAILY ELEGANCE ✦ SIGNATURE SCENTS ✦ PURE AROMAS ✦" }),
        /* @__PURE__ */ jsx("span", { className: "text-xl md:text-3xl font-primary font-thin text-nowrap", children: "DAILY ELEGANCE ✦ SIGNATURE SCENTS ✦ PURE AROMAS ✦" }),
        /* @__PURE__ */ jsx("span", { className: "text-xl md:text-3xl font-primary font-thin text-nowrap", children: "DAILY ELEGANCE ✦ SIGNATURE SCENTS ✦ PURE AROMAS ✦" }),
        /* @__PURE__ */ jsx("span", { className: "text-xl md:text-3xl font-primary font-thin text-nowrap", children: "DAILY ELEGANCE ✦ SIGNATURE SCENTS ✦ PURE AROMAS ✦" })
      ]
    }
  ) });
}

const icon = new Proxy({"src":"/_astro/icon.Xr-TzJey.png","width":100,"height":100,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/aimal-shah/code/floravelle/src/assets/icon.png";
							}
							
							return target[name];
						}
					});

const $$PerfumesSection = createComponent(async ($$result, $$props, $$slots) => {
  let products = [];
  try {
    const wooProducts = await woo.getAllProducts(1, 10);
    products = wooProducts.map((p) => {
      const mapped = mapProduct(p);
      const imgUrl = mapped.images?.[0];
      return {
        id: String(mapped.id),
        name: mapped.name,
        description: mapped.notes?.top || mapped.notes?.heart || "Signature Collection",
        src: imgUrl,
        regularPrice: mapped.regularPrice,
        salePrice: mapped.salePrice
      };
    });
  } catch (e) {
    console.error("Failed to fetch products for perfumesSection:", e);
    e.message;
  }
  return renderTemplate`${maybeRenderHead()}<section id="products" class="reveal-section font-primary mt-16 md:mt-28 overflow-hidden" data-astro-cid-exsg7jxe> <div class="container mx-auto flex flex-col md:flex-row px-4 md:px-0 gap-4 md:gap-0" data-astro-cid-exsg7jxe> <div class="reveal-element" data-astro-cid-exsg7jxe> <h1 class="text-3xl md:text-7xl mb-4 md:mb-8" data-astro-cid-exsg7jxe>Signature Scents</h1> <p class="text-base md:text-2xl text-gray-600 md:px-2" data-astro-cid-exsg7jxe>
Find the fragrance that feels uniquely yours and lingers
                beautifully wherever you go.
</p> </div> <div class="w-full md:flex hidden items-start md:items-end justify-start md:justify-end gap-2" data-astro-cid-exsg7jxe> <button id="prev" class="cursor-pointer" data-astro-cid-exsg7jxe> ${renderComponent($$result, "Image", $$Image, { "src": icon, "alt": "arrow-left", "class": "", "data-astro-cid-exsg7jxe": true })} </button> <button id="next" class="cursor-pointer" data-astro-cid-exsg7jxe> ${renderComponent($$result, "Image", $$Image, { "src": icon, "alt": "arrow-right", "class": "rotate-[180deg]", "data-astro-cid-exsg7jxe": true })} </button> </div> </div> <div class="mt-8 md:mt-12 container mx-auto px-4 md:px-0" data-astro-cid-exsg7jxe> <div class="swiper product-swiper" data-astro-cid-exsg7jxe> <div class="swiper-wrapper" data-astro-cid-exsg7jxe> ${products.map((product) => renderTemplate`<div class="swiper-slide w-full md:w-[28rem] h-auto group" data-astro-cid-exsg7jxe> <div class="w-full overflow-hidden h-[15rem] md:h-[25rem]" data-astro-cid-exsg7jxe> ${renderComponent($$result, "Image", $$Image, { "src": product.src, "alt": product.name, "class": "w-full h-full object-cover group-hover:scale-110 transition-all duration-120", "width": 500, "height": 400, "data-astro-cid-exsg7jxe": true })} </div> <div class="flex justify-between mt-4" data-astro-cid-exsg7jxe> <div class="space-y-1 md:space-y-4" data-astro-cid-exsg7jxe> <h3 class="text-base md:text-2xl font-semibold capitalize leading-tight" data-astro-cid-exsg7jxe> ${product.name} </h3> <p class="text-gray-600 text-xs md:text-xl line-clamp-1" data-astro-cid-exsg7jxe> ${product.description} </p> </div> <div class="flex items-center" data-astro-cid-exsg7jxe> <a${addAttribute(`/products/${product.id}`, "href")} class="text-xs md:text-xl font-semibold border border-[#7A5633] text-[#8A5633] cursor-pointer hover:bg-[#7A5633] hover:text-white rounded-full px-4 py-2 whitespace-nowrap" data-astro-cid-exsg7jxe>
View Details
</a> </div> </div> </div>`)} </div> </div> </div> <div class="h-20 md:h-32" data-astro-cid-exsg7jxe></div> <!-- Substantial padding for section separation --> </section>  ${renderScript($$result, "/home/aimal-shah/code/floravelle/src/components/perfumesSection.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/aimal-shah/code/floravelle/src/components/perfumesSection.astro", void 0);

const $$Moments = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="reveal-section mt-12 md:mt-20 bg-[#E8E4DE]"> <div class="container mx-auto py-10 md:py-18 gap-8 md:gap-18 flex flex-col-reverse md:flex-row px-4 md:px-0"> <div class="font-primary md:px-18 flex-1 space-y-6 md:space-y-8 flex flex-col justify-center items-start"> <h1 class="text-4xl md:text-6xl reveal-element">Aroma Moments</h1> <p class="text-lg md:text-xl w-full md:w-[80%] reveal-element">Experinece our exclusive collection of scents, crafted to enrich your daily elegence.</p> <button class="text-lg md:text-2xl font-semibold border-[#7A5633] text-[#8A5633] hover:bg-[#7A5633] hover:text-white rounded-full px-6 py-3 md:p-4 border cursor-pointer reveal-element">
Explore Now
</button> </div> <div class="flex-1 bg-red-200 shadow"> ${renderComponent($$result, "Image", $$Image, { "src": bannerImg, "alt": "banner", "class": "w-full h-full object-cover" })} </div> </div> </section>`;
}, "/home/aimal-shah/code/floravelle/src/components/moments.astro", void 0);

const $$Philosophy = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section id="philosophy" class="reveal-section mt-12 md:mt-18 space-y-8 md:space-y-18"> <div class="container mx-auto px-4 md:px-0 reveal-element"> <h1 class="font-primary text-4xl md:text-6xl text-center">Crafted with <span class="italic">Intention</span></h1> </div> <div class="container mx-auto flex flex-col md:flex-row gap-8 md:gap-28 h-auto py-8 md:py-12 px-4 md:px-0"> <div class="w-full h-[250px]  overflow-hidden md:h-[560px] bg-red-400 flex-1 mb-0 md:mb-8 reveal-element"> ${renderComponent($$result, "Image", $$Image, { "src": bannerImg$1, "alt": "banner", "inferSize": true, "class": "w-full h-full object-cover shadow" })} </div> <div class="font-primary flex-1 text-xl md:text-2xl text-left flex flex-col justify-center reveal-element"> <p class="text-[#A39579] mb-2 reveal-element">At FLORAVELLE, every fragrance begins with a purpose.</p> <p class="leading-relaxed md:leading-high text-md md:text-xl mt-4 reveal-element">We believe fragrance is more than a scent — it is an expression of personality and emotion. Each composition is carefully crafted with refined notes and quality ingredients to create a timeless, distinctive experience that leaves a lasting impression.</p> <div class="bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(196,176,124,1)_40%,rgba(208,192,150,1)_72%,rgba(255,255,255,0)_100%)] h-[2px] w-full mt-8 md:mt-12"></div> <p class="text-xl md:text-2xl mt-8 md:mt-16 text-center md:text-left reveal-element">
&quot; <span class="mt-2">A fragrance is the silent</span> <br class="hidden md:block"> signature of your presence &quot;
</p> </div> </div></section>`;
}, "/home/aimal-shah/code/floravelle/src/components/philosophy.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "FloraVelle | Elegance in Every Drop", "description": "Experience the essence of luxury with FLORAVELLE. Handcrafted perfumes from Pakistan, featuring our signature scents collection." }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Hero", $$Hero, {})} ${renderComponent($$result2, "Marquee", Marquee, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/aimal-shah/code/floravelle/src/components/marquee.tsx", "client:component-export": "default" })} ${renderComponent($$result2, "PerfumesSection", $$PerfumesSection, {})} ${renderComponent($$result2, "Moments", $$Moments, {})} ${renderComponent($$result2, "Philosophy", $$Philosophy, {})} ` })}`;
}, "/home/aimal-shah/code/floravelle/src/pages/index.astro", void 0);

const $$file = "/home/aimal-shah/code/floravelle/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
