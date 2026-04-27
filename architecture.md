# Astro + WooCommerce Integration Guide

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    ASTRO SITE (Frontend)                    │
│  - Product catalog, product detail pages                    │
│  - Cart UI, checkout UI                                     │
│  - Payment processing                                       │
└────────────────────┬────────────────────────────────────────┘
                     │ API Calls (SSR or client-side)
                     ▼
┌─────────────────────────────────────────────────────────────┐
│               WORDPRESS + WOOCOMMERCE (Backend)             │
│  - Products, prices, stock                                  │
│  - Orders, payment records                                  │
│  - Customers                                                │
└─────────────────────────────────────────────────────────────┘
```

---

## Implementation Phases

### Phase 1: WooCommerce API Setup

| Task | Description |
|------|-------------|
| 1.1 | Generate REST API credentials in WooCommerce → Settings → Advanced → REST API |
| 1.2 | Configure permissions: **Read/Write** for products, orders, customers |
| 1.3 | Store credentials in environment variables |
| 1.4 | Test connectivity: `https://yourdomain.com/wp-json/wc/v3/products` |

**`.env` setup:**
```env
WOO_API_URL=https://yourdomain.com/wp-json/wc/v3
WOO_CONSUMER_KEY=ck_xxxxxxxxxxxxx
WOO_CONSUMER_SECRET=cs_xxxxxxxxxxxxx
```

---

### Phase 2: WooCommerce API Client

**Create:** `src/lib/woocommerce.ts`

```typescript
const WOO_API_URL = import.meta.env.WOO_API_URL;
const WOO_CONSUMER_KEY = import.meta.env.WOO_CONSUMER_KEY;
const WOO_CONSUMER_SECRET = import.meta.env.WOO_CONSUMER_SECRET;

const auth = Buffer.from(`${WOO_CONSUMER_KEY}:${WOO_CONSUMER_SECRET}`).toString('base64');

async function fetchWoo<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${WOO_API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`WooCommerce API Error: ${response.statusText}`);
  }

  return response.json();
}

export const getProducts = () => fetchWoo('/products');
export const getProduct = (id: number) => fetchWoo(`/products/${id}`);
export const createOrder = (orderData: object) =>
  fetchWoo('/orders', { method: 'POST', body: JSON.stringify(orderData) });
```

---

### Phase 3: Product Catalog Integration

| Task | Steps |
|------|-------|
| 3.1 | Replace static product data with dynamic WooCommerce fetch |
| 3.2 | Map WooCommerce fields to your display format |
| 3.3 | Handle product categories/attributes as filters |
| 3.4 | Update collection pages to use SSR |
| 3.5 | Optional: keep static fallback for build-time hybrid rendering |

**Generic product type + mapper:**
```typescript
interface WooProduct {
  id: number;
  name: string;
  slug: string;
  regular_price: string;
  description: string;
  short_description: string;
  images: { src: string; alt: string }[];
  categories: { id: number; name: string; slug: string }[];
  attributes: { name: string; options: string[] }[];
  stock_status: 'instock' | 'outofstock';
}

function getAttribute(product: WooProduct, name: string): string {
  return product.attributes.find(a => a.name === name)?.options.join(', ') ?? '';
}

function mapProduct(woo: WooProduct) {
  return {
    id: woo.id,
    slug: woo.slug,
    name: woo.name,
    price: woo.regular_price,
    description: woo.description,
    shortDescription: woo.short_description,
    images: woo.images.map(img => ({ src: img.src, alt: img.alt })),
    categories: woo.categories.map(c => c.slug),
    inStock: woo.stock_status === 'instock',
    // Add custom attribute mappings here as needed
  };
}
```

---

### Phase 4: Cart Implementation

**Create:** `src/context/CartContext.tsx` (React Context)

```typescript
interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  total: number;
}
```

**Create:** `src/components/Cart.tsx`

Cart storage strategy:
- Use `localStorage` for persistence across sessions
- Sync cart state on page load
- Handle merging for guest users

---

### Phase 5: Checkout Flow

**Create:** `src/pages/checkout.astro`

**Step 1 — Cart Review:** Display items, allow quantity adjustments, show subtotal/shipping/total.

**Step 2 — Customer Information:**
```typescript
interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}
```

**Step 3 — Payment Selection:**

| Option | Approach |
|--------|----------|
| A | Redirect to WooCommerce-hosted payment page |
| B | Integrate Stripe/Razorpay client-side → create order in WooCommerce after payment confirmation |

**Step 4 — Order Confirmation:** Validate fields, submit to WooCommerce, show order number.

---

### Phase 6: Order Submission

```
POST /wp-json/wc/v3/orders

{
  line_items: [{ product_id, quantity }],
  billing: { first_name, last_name, email, phone, address_1, city, postcode, country },
  shipping: { /* same as billing or separate */ },
  payment_method: "cod" | "stripe" | "bacs",
  status: "pending" | "processing"
}
```

---

## File Structure

```
src/
├── lib/
│   └── woocommerce.ts          ✅ CREATE — API client
├── context/
│   └── CartContext.tsx         ✅ CREATE — cart state
├── components/
│   ├── Cart.tsx                ✅ CREATE — cart UI
│   ├── CartIcon.tsx            🔄 UPDATE — show item count
│   └── checkout/
│       ├── CheckoutForm.tsx    ✅ CREATE
│       └── OrderSummary.tsx    ✅ CREATE
├── pages/
│   ├── [collection].astro      🔄 UPDATE — SSR fetch
│   ├── products/[slug].astro   🔄 UPDATE — dynamic product
│   ├── checkout.astro          ✅ CREATE
│   └── api/
│       ├── products.ts         ✅ CREATE — products route
│       ├── cart.ts             ✅ CREATE — cart operations
│       └── checkout.ts         ✅ CREATE — order submission
└── .env                        ✅ UPDATE — Woo credentials
```

---

## WooCommerce Product Setup

### Recommended Custom Attributes

Define these in WooCommerce → Products → Attributes, then assign to each product. Adjust to fit your product type:

| Attribute | Purpose |
|-----------|---------|
| `Subtitle` | Short tagline shown under the product name |
| `[Custom Attr 1]` | e.g. Material, Scent, Flavor, Size range |
| `[Custom Attr 2]` | e.g. Origin, Style, Category tag |

### Field Mapping Reference

| Your Display Field | WooCommerce Source |
|--------------------|--------------------|
| `name` | Product Title |
| `slug` | Product Slug |
| `price` | Regular Price |
| `description` | Product Description |
| `shortDescription` | Short Description |
| `images` | Product Images gallery |
| `categories` | Product Categories |
| `[custom field]` | Product Attribute |

---

## Error Handling

| Scenario | Strategy |
|----------|----------|
| API connection failure | Show error UI, allow retry |
| Product out of stock | Display "Sold Out" badge, disable Add to Cart |
| Payment failure | Surface specific error, preserve cart |
| Network timeout | Auto-retry with exponential backoff |
| Invalid form input | Validate client-side + server-side before WooCommerce call |

---

## Security Checklist

1. Never expose `WOO_CONSUMER_KEY` / `WOO_CONSUMER_SECRET` in client-side code
2. Route all WooCommerce API calls through Astro server-side API endpoints
3. Validate and sanitize all user input server-side before forwarding
4. Implement rate limiting on API routes
5. Use HTTPS for all communication

---

## Estimated Timeline

| Phase | Effort |
|-------|--------|
| 1–2: Setup + API Client | 1–2 hours |
| 3: Product Integration | 2–3 hours |
| 4: Cart | 2–3 hours |
| 5–6: Checkout + Orders | 3–4 hours |
| **Total** | **~8–12 hours** |

---

## Testing Checklist

- [ ] Products load from WooCommerce
- [ ] Product images and attributes display correctly
- [ ] Add to cart works
- [ ] Cart persists across pages
- [ ] Quantity update and remove work
- [ ] Checkout form validates correctly
- [ ] Order is created in WooCommerce on submit
- [ ] Order confirmation displays
- [ ] Out-of-stock products are correctly blocked
- [ ] Error states handled gracefully

---

## Deployment Notes

1. Set `WOO_API_URL`, `WOO_CONSUMER_KEY`, `WOO_CONSUMER_SECRET` in your hosting environment
2. Configure CORS headers on your WP server if Astro is on a different domain
3. Set Astro output to `server` (or `hybrid`) for SSR pages — `astro.config.mjs`: `output: 'server'`
4. Optionally set up WooCommerce webhooks for order status updates
5. Add caching headers or ISR for product pages to reduce API calls
