import { readFileSync } from 'fs';
import { join } from 'path';

class ApiError extends Error {
  status;
  data;
  response;
  constructor(message, status, data, response) {
    super(message);
    this.status = status;
    this.data = data;
    this.response = response;
    Error.captureStackTrace(this, this.constructor);
  }
}

let envCache = null;
function loadEnv() {
  if (envCache) return envCache;
  try {
    const envPath = join(process.cwd(), ".env");
    const file = readFileSync(envPath, "utf-8");
    const lines = file.split("\n");
    const env = {};
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const [key, ...values] = trimmed.split("=");
      if (key) env[key.trim()] = values.join("=").trim();
    }
    envCache = env;
    return env;
  } catch (e) {
    return {};
  }
}

class ApiClinet {
  baseURL = "";
  basicHeaders = {
    "Content-Type": "application/json"
  };
  initialized = false;
  initialize() {
    if (this.initialized) return;
    const env = loadEnv();
    const USERNAME = env.WOO_CONSUMER_KEY;
    const PASSWORD = env.WOO_CONSUMER_SECRET;
    if (USERNAME && PASSWORD) {
      const credentials = btoa(`${USERNAME}:${PASSWORD}`);
      this.basicHeaders = {
        "Authorization": `Basic ${credentials}`,
        "Content-Type": "application/json"
      };
    }
    let url = env.WOO_API_URL || "";
    url = url.replace(/\/+$/, "").replace(/\/+/g, "/");
    this.baseURL = url;
    this.initialized = true;
  }
  async request(endpoint, options = {}) {
    this.initialize();
    if (!this.baseURL) {
      throw new ApiError("WOO_API_URL not configured", 500, {}, new Response(null, { status: 500 }));
    }
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: { ...this.basicHeaders, ...options.headers },
      ...options
    };
    const response = await fetch(url, config);
    if (!response.ok) {
      let errorData = {};
      try {
        errorData = await response.json();
      } catch (e) {
        errorData = { message: await response.text() };
      }
      throw new ApiError(
        errorData.message || `HTTP ${response.status}: ${response.statusText}`,
        response.status,
        errorData,
        response
      );
    }
    return response.json();
  }
  async get(endpoint) {
    return this.request(endpoint, { method: "GET" });
  }
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: "POST",
      body: JSON.stringify(data)
    });
  }
}
const apiClient = new ApiClinet();

class Woocommerce {
  api = apiClient;
  cache = /* @__PURE__ */ new Map();
  cacheExpiry = 3e5;
  // 5 minutes cache
  constructor() {
  }
  // Set custom cache expiry time (in milliseconds)
  setCacheExpiry(ms) {
    this.cacheExpiry = ms;
  }
  // Get all products - no caching by default for fresh data
  async getAllProducts(page = 1, perPage = 20, useCache = false) {
    const cacheKey = `products_${page}_${perPage}`;
    const now = Date.now();
    if (useCache && this.cache.has(cacheKey) && this.cache.get(cacheKey).expiry > now) {
      return this.cache.get(cacheKey).data;
    }
    try {
      const data = await this.api.get(`/products?per_page=${perPage}&page=${page}&status=publish`);
      if (useCache) {
        this.cache.set(cacheKey, {
          data,
          expiry: now + this.cacheExpiry
        });
      }
      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        console.error("WooCommerce API Error:", error.message);
        throw error;
      }
      throw new Error("Failed to fetch products");
    }
  }
  // Get single product
  async getSingleProduct(id) {
    try {
      const data = await this.api.get(`/products/${id}`);
      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        console.error("WooCommerce API Error:", error.message);
        throw error;
      }
      throw new Error(`Failed to fetch product ${id}`);
    }
  }
  // Create order
  async createOrder(orderData) {
    try {
      const data = await this.api.post("/orders", {
        ...orderData,
        status: "pending",
        payment_method_title: orderData.payment_method
      });
      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        console.error("WooCommerce API Error:", error.message);
        throw error;
      }
      throw new Error("Failed to create order");
    }
  }
  // Get payment gateways
  async getPaymentGateways() {
    try {
      const data = await this.api.get("/payment_gateways");
      return data.filter((gateway) => gateway.enabled === true);
    } catch (error) {
      if (error instanceof ApiError) {
        console.error("WooCommerce API Error:", error.message);
        throw error;
      }
      throw new Error("Failed to fetch payment gateways");
    }
  }
  // Get orders
  async getOrders(customerEmail) {
    try {
      const params = customerEmail ? `?customer_email=${encodeURIComponent(customerEmail)}` : "";
      const data = await this.api.get(`/orders${params}`);
      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        console.error("WooCommerce API Error:", error.message);
        throw error;
      }
      throw new Error("Failed to fetch orders");
    }
  }
  // Clear cache
  clearCache() {
    this.cache.clear();
  }
  // Force refresh - clear cache and get fresh data
  async refreshProducts(page = 1, perPage = 20) {
    this.clearCache();
    return this.getAllProducts(page, perPage, false);
  }
}
function stripHtml(html) {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").trim();
}
function cleanNotes(note) {
  if (!note) return "None";
  return note.replace(/^(?:notes?\s*[:-]\s*)/i, "").trim();
}
function extractNotesFromDescription(description) {
  const cleanText = stripHtml(description);
  let top = "None";
  let heart = "None";
  let base = "None";
  const topMatch = cleanText.match(/(?:top|top notes?)[:\s]+([^,\n]+(?:,\s*[^,\n]+)*?)(?=\s*(?:heart|base|s|$))/i);
  const heartMatch = cleanText.match(/(?:heart|heart notes?)[:\s]+([^,\n]+(?:,\s*[^,\n]+)*?)(?=\s*(?:base|s|$))/i);
  const baseMatch = cleanText.match(/(?:base|base notes?)[:\s]+([^,\n]+(?:,\s*[^,\n]+)*)/i);
  if (topMatch) top = cleanNotes(topMatch[1]);
  if (heartMatch) heart = cleanNotes(heartMatch[1]);
  if (baseMatch) base = cleanNotes(baseMatch[1]);
  return { top, heart, base };
}
function getPrices(woo2) {
  const salePrice = woo2.price || "";
  const regularPrice = woo2.regular_price || "2500";
  if (salePrice && salePrice !== regularPrice) {
    return { salePrice, regularPrice };
  }
  return { salePrice: "", regularPrice };
}
function mapProduct(woo2) {
  const attributes = woo2.attributes || [];
  const topAttr = attributes.find((attr) => attr.name?.toLowerCase().includes("top"));
  const heartAttr = attributes.find((attr) => attr.name?.toLowerCase().includes("heart"));
  const baseAttr = attributes.find((attr) => attr.name?.toLowerCase().includes("base"));
  const extractedNotes = extractNotesFromDescription(woo2.description || "");
  const prices = getPrices(woo2);
  return {
    id: woo2.id,
    name: woo2.name,
    salePrice: prices.salePrice,
    regularPrice: prices.regularPrice,
    description: stripHtml(woo2.description || ""),
    images: woo2.images?.map((img) => img.src).filter(Boolean) || [],
    category: woo2.category || "",
    notes: {
      top: topAttr?.options?.[0] || extractedNotes.top || "None",
      heart: heartAttr?.options?.[0] || extractedNotes.heart || "None",
      base: baseAttr?.options?.[0] || extractedNotes.base || "None"
    }
  };
}
const woo = new Woocommerce();

export { loadEnv as l, mapProduct as m, woo as w };
