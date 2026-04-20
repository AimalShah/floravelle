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
  private cacheExpiry = 300000; // 5 minutes cache

  constructor() {}

  // Set custom cache expiry time (in milliseconds)
  setCacheExpiry(ms: number): void {
    this.cacheExpiry = ms;
  }

  // Get all products - no caching by default for fresh data
  async getAllProducts(page = 1, perPage = 20, useCache = false): Promise<WooProduct[]> {
    const cacheKey = `products_${page}_${perPage}`;
    const now = Date.now();
    
    // Check cache only if useCache is true
    if (useCache && this.cache.has(cacheKey) && this.cache.get(cacheKey)!.expiry > now) {
      return this.cache.get(cacheKey)!.data;
    }

    try {
      // Fetch only published products
      const data = await this.api.get(`/products?per_page=${perPage}&page=${page}&status=publish`);
      
      // Cache the result only if useCache is true
      if (useCache) {
        this.cache.set(cacheKey, {
          data,
          expiry: now + this.cacheExpiry
        });
      }

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

  // Force refresh - clear cache and get fresh data
  async refreshProducts(page = 1, perPage = 20): Promise<WooProduct[]> {
    this.clearCache();
    return this.getAllProducts(page, perPage, false);
  }
}

// Helper to strip HTML tags
function stripHtml(html: string): string {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').trim();
}

// Clean notes string - remove "Notes:" prefix etc
function cleanNotes(note: string): string {
  if (!note) return 'None';
  // Remove common prefixes like "Notes:", "Top Notes:", etc.
  return note.replace(/^(?:notes?\s*[:-]\s*)/i, '').trim();
}

// Extract notes from description HTML
function extractNotesFromDescription(description: string): { top: string; heart: string; base: string } {
  const cleanText = stripHtml(description);
  
  let top = "None";
  let heart = "None";
  let base = "None";

  // Try to extract notes from description text patterns
  // Common patterns: "Top: xxx", "Heart: xxx", "Base: xxx" or "Top Notes:", etc.
  const topMatch = cleanText.match(/(?:top|top notes?)[:\s]+([^,\n]+(?:,\s*[^,\n]+)*?)(?=\s*(?:heart|base|s|$))/i);
  const heartMatch = cleanText.match(/(?:heart|heart notes?)[:\s]+([^,\n]+(?:,\s*[^,\n]+)*?)(?=\s*(?:base|s|$))/i);
  const baseMatch = cleanText.match(/(?:base|base notes?)[:\s]+([^,\n]+(?:,\s*[^,\n]+)*)/i);

  if (topMatch) top = cleanNotes(topMatch[1]);
  if (heartMatch) heart = cleanNotes(heartMatch[1]);
  if (baseMatch) base = cleanNotes(baseMatch[1]);

  return { top, heart, base };
}

// Get sale and regular price properly
function getPrices(woo: WooProduct): { salePrice: string; regularPrice: string } {
  const salePrice = woo.price || "";
  const regularPrice = woo.regular_price || "2500";
  
  // If sale price exists and is different, use it
  if (salePrice && salePrice !== regularPrice) {
    return { salePrice, regularPrice };
  }
  return { salePrice: "", regularPrice };
}

// Data transformation functions
export function mapProduct(woo: WooProduct) {
  // Try attributes first, then fall back to description
  const attributes = woo.attributes || [];
  const topAttr = attributes.find((attr: any) => attr.name?.toLowerCase().includes('top'));
  const heartAttr = attributes.find((attr: any) => attr.name?.toLowerCase().includes('heart'));
  const baseAttr = attributes.find((attr: any) => attr.name?.toLowerCase().includes('base'));
  
  const extractedNotes = extractNotesFromDescription(woo.description || '');
  const prices = getPrices(woo);
  
  return {
    id: woo.id,
    name: woo.name,
    salePrice: prices.salePrice,
    regularPrice: prices.regularPrice,
    description: stripHtml(woo.description || ''),
    images: woo.images?.map((img: any) => img.src).filter(Boolean) || [],
    category: woo.category || "",
    notes: {
      top: topAttr?.options?.[0] || extractedNotes.top || "None",
      heart: heartAttr?.options?.[0] || extractedNotes.heart || "None",
      base: baseAttr?.options?.[0] || extractedNotes.base || "None"
    }
  };
}

export const woo = new Woocommerce()
export { WooProduct, WooOrder, CartItem, CustomerInfo }
