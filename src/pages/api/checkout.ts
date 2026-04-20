import { woo, mapProduct } from '../../lib/api/woocommerce';

export async function POST({ request }) {
  try {
    const orderData = await request.json();

    // Validate required fields
    const requiredFields = ['line_items', 'billing', 'shipping'];
    for (const field of requiredFields) {
      if (!orderData[field]) {
        return new Response(JSON.stringify({ error: `${field} is required` }), {
          headers: { 'Content-Type': 'application/json' },
          status: 400,
        });
      }
    }

    // Format order data for WooCommerce
    const wooOrderData = {
      line_items: orderData.line_items.map(item => ({
        product_id: item.productId,
        quantity: item.quantity,
        price: item.price,
        name: item.name,
      })),
      billing: {
        first_name: orderData.billing.firstName,
        last_name: orderData.billing.lastName,
        email: orderData.billing.email,
        phone: orderData.billing.phone,
        address_1: orderData.billing.address,
        city: orderData.billing.city,
        postcode: orderData.billing.postalCode,
        country: orderData.billing.country || 'IN',
      },
      shipping: {
        first_name: orderData.shipping.firstName,
        last_name: orderData.shipping.lastName,
        address_1: orderData.shipping.address,
        city: orderData.shipping.city,
        postcode: orderData.shipping.postalCode,
        country: orderData.shipping.country || 'IN',
      },
      payment_method: orderData.paymentMethod,
      customer_note: orderData.customerNote || '',
    };

    // Create order in WooCommerce
    const order = await woo.createOrder(wooOrderData);

    return new Response(JSON.stringify({
      success: true,
      orderId: order.id,
      message: 'Order created successfully'
    }), {
      headers: { 'Content-Type': 'application/json' },
      status: 201,
    });
  } catch (error) {
    console.error('Checkout API Error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to create order',
      details: error.message 
    }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
}