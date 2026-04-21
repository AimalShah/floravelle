import { woo } from '../../lib/api/woocommerce';

export const prerender = false;

export async function GET() {
  try {
    const gateways = await woo.getPaymentGateways();
    
    const methods = gateways.map((gateway: any) => ({
      id: gateway.id,
      title: gateway.title,
      description: gateway.description || '',
    }));

    return new Response(JSON.stringify({ methods }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Payment Methods API Error:', error);
    const fallbackMethods = [
      { id: 'cod', title: 'Cash on Delivery', description: 'Pay when you receive your order' }
    ];
    return new Response(JSON.stringify({ methods: fallbackMethods }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  }
}