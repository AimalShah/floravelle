# Floravelle + WooCommerce Integration Plan

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    ASTRALO SITE (Frontend)                  │
│  - Product catalog, product detail pages                   │
│  - Cart UI, checkout UI                                       │
│  - Payment processing                                       │
└────────────────────┬──────────────────────────────────────┘
                     │ API Calls (SSR or client-side)
                     ▼
┌─────────────────────────────────────────────────────────────┐
│               WORDPRESS + WOOCOMMERCE (Backend)              │
│  - Products, prices, stock                                  │
│  - Orders, payment records                                  │
│  - Customers                                                │
└─────────────────────────────────────────────────────────────┘
```

## Implementation Phases

### Phase 1: WooCommerce API Setup

| Task | Description |
|------|-------------|
| 1.1 | Generate WooCommerce REST API credentials (Consumer Key/Secret) in WooCommerce → Settings → Advanced → REST API |
| 1.2 | Configure API permissions: **Read/Write** for products, orders, customers |
| 1.3 | Store credentials in environment variables (no hardcoding) |
| 1.4 | Test API connectivity with endpoint `https://yourdomain.com/wp-json/wc/v3/products` |

**Env setup (add to `.env`):**
```
WOO_API_URL=https://yourdomain.com/wp-json/wc/v3
WOO_CONSUMER_KEY=ck_xxxxxxxxxxxxx
WOO_CONSUMER_SECRET=cs_xxxxxxxxxxxxx
```

### Phase 2: Create WooCommerce API Client

**Create file:** `src/lib/woocommerce.ts`

```
- Product fetching (get all products, get single product)
- Order creation (submit order to WooCommerce)
- Customer creation (optional: create customer on order)
- Stock/inventory checks
```

### Phase 3: Product Catalog Integration

| Task | Steps |
|------|-------|
| 3.1 | Replace static `data.ts` with dynamic WooCommerce product fetch |
| 3.2 | Map WooCommerce product fields → your display format |
| 3.3 | Handle product categories as filters |
| 3.4 | Update `/collection.astro` as SSR (server-side rendering) |
| 3.5 | Keep static paths fallback for build time (optional hybrid) |

**Sample product mapping:**
```typescript
interface WooProduct {
  id: number;
  name: string;
  regular_price: string;
  description: string;
  images: { src: string }[];
  attributes: { name: string; options: string[] }[];
}

function mapProduct(woo: WooProduct) {
  return {
    id: woo.id,
    name: woo.name,
    price: woo.regular_price || "2,500",
    description: woo.description,
    images: woo.images.map(img => img.src),
    notes: {
      top: getAttribute(woo, "Top Notes"),
      heart: getAttribute(woo, "Heart Notes"),
      base: getAttribute(woo, "Base Notes")
    }
  };
}
```

### Phase 4: Shopping Cart Implementation

**Create file:** `src/components/Cart.tsx` (React component)

```
- Add to cart (store cart in localStorage or session)
- Update quantity
- Remove item
- Calculate totals
- Persist across page navigation
```

### Phase 5: Checkout Flow

**Create page:** `src/pages/checkout.astro`

```
- Cart summary display
- Shipping form (collect customer details)
- Payment method selection
- Order review
- Submit → Create order in WooCommerce via API
```

**Note on Payment:** Since WooCommerce REST API doesn't have built-in payment processing, you have two options:

| Option | Approach |
|--------|----------|
| A | Use WooCommercePayment Gateways' hosted URLs (redirect to WP for payment) |
| B | Integrate payment separately (Stripe/Razorpay) → Create order in WooCommerce after payment |

### Phase 6: Order Submission

**POST to WooCommerce:**
```
Endpoint: /wp-json/wc/v3/orders
Payload: {
  line_items: [{ product_id, quantity, price }],
  billing: { first_name, last_name, email, phone, address },
  shipping: { same as billing },
  payment_method: "cod" | "stripe" | etc,
  status: "pending" | "processing"
}
```

## File Structure Changes

```
src/
├── lib/
│   └── woocommerce.ts       ✅ CREATE - API client
├── components/
│   ├── Cart.tsx             ✅ CREATE - Cart UI (React)
│   ├── CartIcon.tsx        ✅ UPDATE - Cart with item count
│   └── checkout/
│       ├── CheckoutForm.tsx
│       └── OrderSummary.tsx
├── pages/
│   ├── collection.astro    🔄 UPDATE - SSR fetch
│   ├── products/[slug].astro 🔄 UPDATE - Dynamic product
│   ├── api/
│   │   ├── products.ts     ✅ CREATE - API route
│   │   ├── cart.ts        ✅ CREATE - Cart operations
│   │   └── checkout.ts    ✅ CREATE - Order submission
│   └── checkout.astro       ✅ CREATE - Checkout page
└── .env                    ✅ UPDATE - Add Woo credentials
```

## WooCommerce Product Setup Requirements

### Required Product Attributes

To match your current product display, set up these attributes in WooCommerce:

| Attribute | Example Values |
|----------|----------------|
| Top Notes | Pear Blossom |
| Heart Notes | White Gardenia, Jasmine |
| Base Notes | Brown sugar, Patchouli |
| Subtitle | Ethereal Desert Breeze |

### Product Data Mapping

| Your Current Field | WooCommerce Field |
|--------------------|-------------------|
| `name` | Product Title |
| `subtitle` | Attribute: Subtitle |
| `price` | Regular Price |
| `description` | Product Description |
| `notes.top` | Attribute: Top Notes |
| `notes.heart` | Attribute: Heart Notes |
| `notes.base` | Attribute: Base Notes |
| `images` | Product Images |

## API Client Reference

### Basic Client Structure

```typescript
// src/lib/woocommerce.ts

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

export async function getProducts() {
  return fetchWoo('/products');
}

export async function getProduct(id: number) {
  return fetchWoo(`/products/${id}`);
}

export async function createOrder(orderData: object) {
  return fetchWoo('/orders', {
    method: 'POST',
    body: JSON.stringify(orderData),
  });
}
```

## Cart Implementation Guide

### Cart State (React Context)

```typescript
// src/context/CartContext.tsx

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

### Cart Storage

- Use `localStorage` for persistence across sessions
- Sync cart state on page load
- Handle cart merging for guest users

## Checkout Flow

### Step 1: Cart Review
- Display all items in cart
- Allow quantity adjustments
- Show subtotal, shipping, total

### Step 2: Customer Information
```typescript
interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
}
```

### Step 3: Payment Selection
- Cash on Delivery (COD)
- Online Payment (requires additional setup)

### Step 4: Order Confirmation
- Validate all fields
- Submit to WooCommerce
- Show confirmation with order number

## Error Handling

| Scenario | Handling |
|----------|----------|
| API connection failure | Show error message, allow retry |
| Product out of stock | Display "Sold Out" badge, disable Add to Cart |
| Payment failure | Show specific error, preserve cart |
| Network timeout | Auto-retry with exponential backoff |

## Security Considerations

1. **Never expose API credentials in client-side code**
2. **Use server-side API routes for all WooCommerce communication**
3. **Validate all user input on server before sending to WooCommerce**
4. **Implement rate limiting on API routes**
5. **Use HTTPS for all API communication**

## Estimated Timeline

| Phase | Effort |
|-------|--------|
| 1-2: Setup + API Client | 1-2 hours |
| 3: Product Integration | 2-3 hours |
| 4: Cart | 2-3 hours |
| 5-6: Checkout + Orders | 3-4 hours |
| **Total** | **~10-12 hours** |

## Testing Checklist

- [ ] Products load correctly from WooCommerce
- [ ] Product images display properly
- [ ] Add to cart works
- [ ] Cart persists across pages
- [ ] Cart updates quantity correctly
- [ ] Remove from cart works
- [ ] Checkout form validation
- [ ] Order creates in WooCommerce
- [ ] Order confirmation displays
- [ ] Error states handled properly

## Deployment Notes

1. Set up environment variables in hosting platform
2. Configure CORS headers if needed
3. Set up webhooks for order status updates (optional)
4. Configure cachingStrategy for product pages
5. Set up monitoring for API failures