import { persistentAtom } from '@nanostores/persistent';
import { addItem, removeItem, updateQuantity, clearCart } from '../../store/cartStore';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  subtitle: string;
}

export async function GET({ request }) {
  try {
    const cart = persistentAtom<CartItem[]>('cart', [], {
      encode: JSON.stringify,
      decode: JSON.parse,
    });

    return new Response(JSON.stringify(cart.get()), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Cart API Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch cart' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
}

export async function POST({ request }) {
  try {
    const { action, item } = await request.json();

    if (action === 'add' && item) {
      addItem(item);
      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      });
    }

    if (action === 'remove' && item?.id) {
      removeItem(item.id);
      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      });
    }

    if (action === 'update' && item?.id && item?.quantity !== undefined) {
      updateQuantity(item.id, item.quantity);
      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      });
    }

    return new Response(JSON.stringify({ error: 'Invalid action or item' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 400,
    });
  } catch (error) {
    console.error('Cart API Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to update cart' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
}

export async function DELETE({ request }) {
  try {
    clearCart();
    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Cart API Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to clear cart' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
}