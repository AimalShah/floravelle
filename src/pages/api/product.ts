import { woo, mapProduct } from '../../lib/api/woocommerce';

export async function GET({ request }) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return new Response(JSON.stringify({ error: 'Product ID is required' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      });
    }

    const product = await woo.getSingleProduct(id);
    const mappedProduct = mapProduct(product);

    return new Response(JSON.stringify(mappedProduct), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Single Product API Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch product' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
}