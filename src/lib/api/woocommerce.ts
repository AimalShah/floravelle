import { apiClient } from "./client.ts"
import { ApiError } from "../../utils/api-error.ts"

interface WooProduct {
  id: number;
  name: string;
  regular_price: string;
  description: string;
  images: { src: string }[];
  attributes: { name: string; options: string[] }[];
  price: string;
  category: string;
}

interface WooOrder {
  id: number;
  status: string;
  total: string;
  customer_note: string;
  billing: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address_1: string;
    city: string;
    postcode: string;
    country: string;
  };
  shipping: {
    first_name: string;
    last_name: string;
    address_1: string;
    city: string;
    postcode: string;
    country: string;
  };
  line_items: Array<{
    product_id: number;
    quantity: number;
    price: string;
    name: string;
  }>;
}

interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
}

class Woocommerce {
  private api = apiClient;
  private cache = new Map<string, { data: any; expiry: number }>();

  constructor() {}

  // Get all products with caching
  async getAllProducts(page = 1, perPage = 20): Promise<WooProduct[]> {
    const cacheKey = `products_${page}_${perPage}`;
    const now = Date.now();
    
    // Check cache first (1 hour expiry)
    if (this.cache.has(cacheKey) && this.cache.get(cacheKey)!.expiry > now) {
      return this.cache.get(cacheKey)!.data;
    }

    try {
      const data = await this.api.get(`/products?per_page=${perPage}&page=${page}&status=publish`);
      
      // Cache the result
      this.cache.set(cacheKey, {
        data,
        expiry: now + 3600000 // 1 hour
      });

      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        console.error('WooCommerce API Error:', error.message);
        throw error;
      }
      throw new Error('Failed to fetch products');
    }
  }

  // Get single product
  async getSingleProduct(id: string): Promise<WooProduct> {
    try {
      const data = await this.api.get(`/products/${id}`);
      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        console.error('WooCommerce API Error:', error.message);
        throw error;
      }
      throw new Error(`Failed to fetch product ${id}`);
    }
  }

  // Create order
  async createOrder(orderData: {
    line_items: Array<{ product_id: number; quantity: number; price: string }>;
    billing: CustomerInfo;
    shipping: CustomerInfo;
    payment_method: string;
    customer_note?: string;
  }): Promise<WooOrder> {
    try {
      const data = await this.api.post('/orders', {
        ...orderData,
        status: 'pending',
        payment_method_title: orderData.payment_method
      });
      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        console.error('WooCommerce API Error:', error.message);
        throw error;
      }
      throw new Error('Failed to create order');
    }
  }

  // Get orders
  async getOrders(customerEmail?: string): Promise<WooOrder[]> {
    try {
      const params = customerEmail ? `?customer_email=${encodeURIComponent(customerEmail)}` : '';
      const data = await this.api.get(`/orders${params}`);
      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        console.error('WooCommerce API Error:', error.message);
        throw error;
      }
      throw new Error('Failed to fetch orders');
    }
  }

  // Clear cache
  clearCache(): void {
    this.cache.clear();
  }
}

// Data transformation functions
export function mapProduct(woo: WooProduct) {
  return {
    id: woo.id,
    name: woo.name,
    price: woo.regular_price || "2,500",
    description: woo.description,
    images: woo.images.map(img => img.src),
    category: woo.category || "",
    notes: {
      top: getAttribute(woo, "Top Notes") || "None",
      heart: getAttribute(woo, "Heart Notes") || "None",
      base: getAttribute(woo, "Base Notes") || "None"
    }
  };
}

function getAttribute(product: WooProduct, attributeName: string): string | null {
  const attribute = product.attributes.find(attr => attr.name === attributeName);
  return attribute ? attribute.options[0] : null;
}

export const woo = new Woocommerce()
export { WooProduct, WooOrder, CartItem, CustomerInfo }
