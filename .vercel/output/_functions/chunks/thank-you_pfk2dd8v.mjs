import { c as createComponent } from './_astro_assets_mz1BU4CT.mjs';
import { r as renderComponent, b as renderTemplate, m as maybeRenderHead } from './entrypoint_D0Sz372f.mjs';
import { $ as $$Layout } from './Layout_DJLcEx16.mjs';
import { w as woo } from './woocommerce_BsVyecag.mjs';

const $$ThankYou = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$ThankYou;
  const orderId = Astro2.url.searchParams.get("orderId");
  let order = null;
  if (orderId) {
    try {
      const orders = await woo.getOrders();
      order = orders.find((o) => o.id.toString() === orderId.toString());
    } catch (e) {
      console.error("Failed to fetch order:", e);
    }
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Thank You | FloraVelle", "description": "Thank you for your order" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="min-h-screen bg-[#F0EBE5] flex items-center justify-center"> <div class="container mx-auto px-4 text-center py-32"> <div class="max-w-2xl mx-auto space-y-8"> <div class="w-24 h-24 bg-[#7A5633] rounded-full flex items-center justify-center mx-auto"> <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path> </svg> </div> <h1 class="text-4xl md:text-6xl font-heading text-[#3B2D20] uppercase tracking-widest">Thank You</h1> <p class="text-xl text-gray-600">
Your order has been placed successfully. We will contact you shortly to confirm the details.
</p> ${order && renderTemplate`<div class="bg-white p-6 rounded-sm shadow-lg text-left"> <p class="text-sm text-[#A39579] uppercase tracking-wider mb-4">Order Details</p> <div class="space-y-2 text-[#3B2D20]"> <p><span class="font-medium">Order ID:</span> #${order.id}</p> <p><span class="font-medium">Status:</span> ${order.status}</p> <p><span class="font-medium">Total:</span> Rs. ${parseFloat(order.total).toLocaleString()}</p> </div> </div>`} <a href="/" class="inline-block px-8 py-3 bg-[#3B2D20] text-white hover:bg-[#7A5633] transition-all duration-500 uppercase tracking-widest text-sm font-medium">
Return to Homepage
</a> </div> </div> </main> ` })}`;
}, "/home/aimal-shah/code/floravelle/src/pages/thank-you.astro", void 0);

const $$file = "/home/aimal-shah/code/floravelle/src/pages/thank-you.astro";
const $$url = "/thank-you";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$ThankYou,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
