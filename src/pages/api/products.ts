import { woo, mapProduct } from '../../lib/api/woocommerce';

export async function GET({ request }) {
  try {
    const url = new URL(request.url);
    const page = url.searchParams.get('page') || '1';
    const perPage = url.searchParams.get('per_page') || '20';

    const products = await woo.getAllProducts(parseInt(page), parseInt(perPage));
    const mappedProducts = products.map(mapProduct);

    return new Response(JSON.stringify(mappedProducts), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Products API Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch products' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
}

export async function POST({ request }) {
  try {
    const productData = await request.json();
    
    // Create product in WooCommerce
    const createdProduct = await woo.createProduct(productData);
    
    return new Response(JSON.stringify(createdProduct), {
      headers: { 'Content-Type': 'application/json' },
      status: 201,
    });
  } catch (error) {
    console.error('Product creation API Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to create product' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
}