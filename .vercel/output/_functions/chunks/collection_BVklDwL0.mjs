import { c as createComponent, $ as $$Image } from './_astro_assets_mz1BU4CT.mjs';
import { r as renderComponent, b as renderTemplate, m as maybeRenderHead, c as addAttribute, F as Fragment } from './entrypoint_D0Sz372f.mjs';
import { $ as $$Layout, r as renderScript } from './Layout_DJLcEx16.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import 'react';
import { a as addItem } from './cartStore_qkDqCX4c.mjs';
import { ShoppingBag } from 'lucide-react';
import { b as bannerImg } from './banner-4_DqR_qgZ1.mjs';
import { w as woo, m as mapProduct } from './woocommerce_BsVyecag.mjs';

const AddToCartButton = ({ product, className = "" }) => {
  return /* @__PURE__ */ jsxs(
    "button",
    {
      onClick: () => addItem(product),
      className: `inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#7A5633] text-white rounded-full hover:bg-[#3B2D20] transition-all duration-300 shadow-md uppercase tracking-widest text-sm font-semibold group ${className}`,
      children: [
        /* @__PURE__ */ jsx(ShoppingBag, { className: "w-4 h-4 transition-transform group-hover:-translate-y-1" }),
        "Add to Cart"
      ]
    }
  );
};

const $$Collection = createComponent(async ($$result, $$props, $$slots) => {
  let products = [];
  let error = null;
  try {
    const wooProducts = await woo.getAllProducts(1, 20);
    products = wooProducts.map((p) => mapProduct(p));
  } catch (e) {
    console.error("Failed to fetch WooCommerce products:", e);
    error = "Unable to load products. Please try again later.";
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "The Collection | FloraVelle", "description": "Explore our curated selection of signature scents. Each fragrance at FLORAVELLE is thoughtfully crafted to evoke deep emotion and leave a lasting impression." }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="h-[100dvh] relative flex items-center justify-center overflow-hidden"> <div class="absolute inset-0 z-0"> ${renderComponent($$result2, "Image", $$Image, { "src": bannerImg, "alt": "Collection Atmosphere", "class": "w-full h-full object-cover object-[center_30%]", "loading": "eager", "fetchpriority": "high" })} <div class="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div> </div> <div class="container mx-auto px-4 z-10 text-center space-y-8" id="collection-hero-text"> <h1 class="text-4xl md:text-[10rem] font-heading text-white tracking-widest uppercase leading-tight drop-shadow-2xl">The<br class="md:hidden"> Collection</h1> <div class="h-px w-24 md:w-32 bg-white/50 mx-auto"></div> <p class="text-base md:text-2xl text-white/90 max-w-2xl mx-auto font-roboto tracking-widest leading-relaxed uppercase">
Signature Essences crafted for the modern identity
</p> </div> <!-- Scroll Indicator --> <div class="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-4 text-white/50"> <span class="text-xs tracking-[0.3em] uppercase">Scroll to Explore</span> <div class="w-px h-12 bg-gradient-to-b from-white/50 to-transparent"></div> </div> </section>  ${error ? renderTemplate`<div class="container mx-auto px-4 py-16 md:py-32 text-center"> <p class="text-[#7A5633] text-xl">${error}</p> <button onclick="window.location.reload()" class="mt-4 px-8 py-3 border border-[#7A5633] text-[#7A5633] hover:bg-[#7A5633] hover:text-white transition-all duration-500 uppercase tracking-widest text-sm font-medium">
Try Again
</button> </div>` : renderTemplate`<div class="container mx-auto px-4 md:px-8 py-16 md:py-32 space-y-24 md:space-y-48"> ${products.map((product, index) => {
    const isEven = index % 2 !== 0;
    const productImages = product.images;
    return renderTemplate`<section class="reveal-section flex flex-col md:flex-row items-center gap-12 md:gap-24 group">  <div${addAttribute(`w-full md:w-1/2 overflow-hidden bg-[#E8E4DE] rounded-sm relative aspect-[4/5] ${isEven ? "md:order-2" : "md:order-1"} reveal-element`, "class")}> <div${addAttribute(`product-gallery-${product.id} w-full h-full swiper`, "class")}> <div class="swiper-wrapper"> ${product.images?.map((img, i) => renderTemplate`<div class="swiper-slide flex items-center justify-center p-4 md:p-8"> <img${addAttribute(img, "src")}${addAttribute(`${product.name} - ${i + 1}`, "alt")} class="w-full h-full object-contain" loading="lazy"> </div>`)} </div> </div>  ${product.images && product.images.length > 1 && renderTemplate`<div class="absolute  bottom-4 left-1/2 w-full -translate-x-1/2 z-40 flex flex-row justify-between items-center gap-4 z-10"> <button${addAttribute(`gallery-prev-${product.id} w-8 h-8 flex justify-center items-center text-xl text-[#7A5633] hover:bg-[#7A5633] hover:text-white rounded-full transition-colors z-40`, "class")}>
←
</button> <div class="swiper-pagination"></div> <button${addAttribute(`gallery-next-${product.id} w-8 h-8 flex justify-center items-center text-xl text-[#7A5633] hover:bg-[#7A5633] hover:text-white rounded-full transition-colors z-40`, "class")}>
→
</button> </div>`} </div>  <div${addAttribute(`w-full md:w-1/2 font-primary flex flex-col justify-center space-y-8 ${isEven ? "md:order-1" : "md:order-2"} reveal-element`, "class")}> <div> <p class="text-[#A39579] tracking-[0.2em] text-sm md:text-base uppercase mb-2 reveal-element">${product.notes?.top || "Signature Collection"}</p> <h2 class="text-4xl md:text-7xl font-heading text-[#3B2D20] capitalize reveal-element">${product.name}</h2> </div> <p class="text-base md:text-xl text-gray-700 leading-relaxed max-w-xl reveal-element"> ${product.description || "A crafted essence for the modern identity."} </p>  <div class="space-y-3 pt-6 border-t border-[#A39579]/30 max-w-md reveal-element"> <div class="flex justify-between text-sm md:text-base"> <span class="text-[#A39579] uppercase tracking-wider w-24">Top</span> <span class="text-gray-800 flex-1 text-right">${product.notes?.top || "N/A"}</span> </div> <div class="flex justify-between text-sm md:text-base"> <span class="text-[#A39579] uppercase tracking-wider w-24">Heart</span> <span class="text-gray-800 flex-1 text-right">${product.notes?.heart || "N/A"}</span> </div> <div class="flex justify-between text-sm md:text-base"> <span class="text-[#A39579] uppercase tracking-wider w-24">Base</span> <span class="text-gray-800 flex-1 text-right">${product.notes?.base || "N/A"}</span> </div> </div> <div class="pt-8 flex flex-wrap flex-col md:flex-row items-center gap-6 reveal-element"> <div class="flex items-center gap-2"> ${product.salePrice ? renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate` <span class="text-xl text-gray-400 line-through">Rs. ${parseInt(product.regularPrice) || 2500}</span> <span class="text-2xl md:text-3xl text-[#7A5633]">Rs. ${parseInt(product.salePrice) || 2500}</span> ` })}` : renderTemplate`<span class="text-2xl md:text-3xl text-[#3B2D20]">Rs. ${parseInt(product.regularPrice) || 2500}</span>`} </div> <div class="flex flex-col md:flex-row items-center gap-4"> ${renderComponent($$result2, "AddToCartButton", AddToCartButton, { "client:load": true, "product": {
      id: String(product.id),
      name: product.name,
      price: parseInt(product.salePrice || product.regularPrice) || 2500,
      image: productImages,
      subtitle: product.notes?.top || "Signature Collection"
    }, "client:component-hydration": "load", "client:component-path": "/home/aimal-shah/code/floravelle/src/components/AddToCartButton", "client:component-export": "default" })} <a${addAttribute(`/products/${product.id}`, "href")} class="inline-block text-sm font-semibold border border-[#7A5633] text-[#8A5633] hover:bg-[#7A5633] hover:text-white rounded-full px-8 py-3 transition-colors duration-300 shadow-sm uppercase tracking-widest">
Discover
</a> </div> </div> </div> </section>`;
  })} </div>`}` })} ${renderScript($$result, "/home/aimal-shah/code/floravelle/src/pages/collection.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/aimal-shah/code/floravelle/src/pages/collection.astro", void 0);

const $$file = "/home/aimal-shah/code/floravelle/src/pages/collection.astro";
const $$url = "/collection";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Collection,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
