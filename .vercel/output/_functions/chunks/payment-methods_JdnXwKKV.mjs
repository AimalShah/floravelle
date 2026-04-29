import { w as woo } from './woocommerce_z6w-GuTX.mjs';

const prerender = false;
async function GET() {
  try {
    const gateways = await woo.getPaymentGateways();
    const methods = gateways.map((gateway) => ({
      id: gateway.id,
      title: gateway.title,
      description: gateway.description || ""
    }));
    return new Response(JSON.stringify({ methods }), {
      headers: { "Content-Type": "application/json" },
      status: 200
    });
  } catch (error) {
    console.error("Payment Methods API Error:", error);
    const fallbackMethods = [
      { id: "cod", title: "Cash on Delivery", description: "Pay when you receive your order" }
    ];
    return new Response(JSON.stringify({ methods: fallbackMethods }), {
      headers: { "Content-Type": "application/json" },
      status: 200
    });
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
