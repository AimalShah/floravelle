import { w as woo, l as loadEnv } from './woocommerce_jWXobqlU.mjs';

const prerender = false;
const env = loadEnv();
const WOO_API_URL = env.WOO_API_URL || "";
async function POST({ request }) {
  try {
    const orderData = await request.json();
    const requiredFields = ["line_items", "billing", "shipping"];
    for (const field of requiredFields) {
      if (!orderData[field]) {
        return new Response(JSON.stringify({ error: `${field} is required` }), {
          headers: { "Content-Type": "application/json" },
          status: 400
        });
      }
    }
    const wooOrderData = {
      line_items: orderData.line_items.map((item) => ({
        product_id: item.productId,
        quantity: item.quantity,
        price: item.price,
        name: item.name
      })),
      billing: {
        first_name: orderData.billing.firstName,
        last_name: orderData.billing.lastName,
        email: orderData.billing.email,
        phone: orderData.billing.phone,
        address_1: orderData.billing.address,
        city: orderData.billing.city,
        postcode: orderData.billing.postalCode,
        country: orderData.billing.country || "PK"
      },
      shipping: {
        first_name: orderData.shipping.firstName,
        last_name: orderData.shipping.lastName,
        address_1: orderData.shipping.address,
        city: orderData.shipping.city,
        postcode: orderData.shipping.postalCode,
        country: orderData.shipping.country || "PK"
      },
      payment_method: orderData.paymentMethod,
      payment_method_title: orderData.paymentMethod === "cod" ? "Cash on Delivery" : orderData.paymentMethod,
      customer_note: orderData.customerNote || ""
    };
    const order = await woo.createOrder(wooOrderData);
    const baseUrl = WOO_API_URL.replace("/wc/v3", "").replace("/wp-json", "");
    const checkoutUrl = `${baseUrl}/checkout/order-${order.id}/pay/`;
    return new Response(JSON.stringify({
      success: true,
      orderId: order.id,
      checkoutUrl,
      url: checkoutUrl,
      message: "Order created successfully"
    }), {
      headers: { "Content-Type": "application/json" },
      status: 201
    });
  } catch (error) {
    console.error("Checkout API Error:", error);
    return new Response(JSON.stringify({
      error: "Failed to create order",
      details: error.message
    }), {
      headers: { "Content-Type": "application/json" },
      status: 500
    });
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
