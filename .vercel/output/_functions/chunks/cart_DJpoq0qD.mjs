import { persistentAtom } from '@nanostores/persistent';
import { c as clearCart, a as addItem, r as removeItem, u as updateQuantity } from './cartStore_qkDqCX4c.mjs';

async function GET({ request }) {
  try {
    const cart = persistentAtom("cart", [], {
      encode: JSON.stringify,
      decode: JSON.parse
    });
    return new Response(JSON.stringify(cart.get()), {
      headers: { "Content-Type": "application/json" },
      status: 200
    });
  } catch (error) {
    console.error("Cart API Error:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch cart" }), {
      headers: { "Content-Type": "application/json" },
      status: 500
    });
  }
}
async function POST({ request }) {
  try {
    const { action, item } = await request.json();
    if (action === "add" && item) {
      addItem(item);
      return new Response(JSON.stringify({ success: true }), {
        headers: { "Content-Type": "application/json" },
        status: 200
      });
    }
    if (action === "remove" && item?.id) {
      removeItem(item.id);
      return new Response(JSON.stringify({ success: true }), {
        headers: { "Content-Type": "application/json" },
        status: 200
      });
    }
    if (action === "update" && item?.id && item?.quantity !== void 0) {
      updateQuantity(item.id, item.quantity);
      return new Response(JSON.stringify({ success: true }), {
        headers: { "Content-Type": "application/json" },
        status: 200
      });
    }
    return new Response(JSON.stringify({ error: "Invalid action or item" }), {
      headers: { "Content-Type": "application/json" },
      status: 400
    });
  } catch (error) {
    console.error("Cart API Error:", error);
    return new Response(JSON.stringify({ error: "Failed to update cart" }), {
      headers: { "Content-Type": "application/json" },
      status: 500
    });
  }
}
async function DELETE({ request }) {
  try {
    clearCart();
    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
      status: 200
    });
  } catch (error) {
    console.error("Cart API Error:", error);
    return new Response(JSON.stringify({ error: "Failed to clear cart" }), {
      headers: { "Content-Type": "application/json" },
      status: 500
    });
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  GET,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
