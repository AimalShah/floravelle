# Floravelle: The Deep-Dive WooCommerce Architecture Guide

This guide provides an exhaustive explanation of our architecture. We focus specifically on the **rationale** (the "Why") behind our technical choices.

---

## 1. Why do we "Map" Products? (The DTO Pattern)

Mapping is the act of taking raw data from WooCommerce and converting it into a new object designed specifically for Floravelle. 

### A. Problem: API Volatility & "The Breaking Change"
WooCommerce is an external system. If the WooCommerce team decides to rename the field `regular_price` to `base_cost`, and you have used `product.regular_price` in 20 different `.astro` files, your entire site breaks. You would have to find and replace every single instance.

**The Solution (Mapping):**
You handle the change in **exactly one place**: the Mapper.
```typescript
// If the API changes, you only change this one line:
export function mapProduct(raw: any) {
  return {
    id: raw.id,
    price: raw.base_cost, // <-- We mapped 'base_cost' to our internal 'price'
  };
}
```
Now, every component on your site still uses `product.price`, and nothing breaks.

### B. Problem: Deeply Nested Metadata
WooCommerce stores things like "Top Notes" inside a complex array called `attributes`. To get a note normally, you'd have to write:
`product.attributes.find(a => a.name === "Top Note").options[0]`

**The Solution (Mapping):**
The mapper "flattens" this complexity. 
```typescript
return {
  topNote: extractAttribute(raw, "Top Note"),
};
```
In your UI, you simply write `{product.topNote}`. This makes your UI code **cleaner, faster to write, and easier to read**.

### C. Problem: Data Sanitization
APIs often return ugly data. Prices might be strings (`"2500.00"`), and descriptions often contain messy HTML tags from the WordPress editor.

**The Solution (Mapping):**
We clean the data during the map:
- Convert strings to Numbers for calculations.
- Use Regex to strip HTML from descriptions.
- Format dates into a human-readable format (e.g., "Oct 12, 2023").

---

## 2. Why the Repository Pattern (`woocommerce.ts`)?

### A. The "Source of Truth"
The `Woocommerce` class is a **Repository**. It centralizes all data logic. If a page needs products, it doesn't "know" how to fetch them; it just asks the Repository.

### B. Mocking and Testing
If you want to test your site without hitting the real WooCommerce server (which is slow and uses bandwidth), you can swap your Repository for a "Mock" version that returns fake data instantly. This makes development 10x faster.

---

## 3. Why a Custom API Client (`client.ts`)?

### A. Centralized Authentication
By having one `ApiClient`, we ensure every request automatically gets the `Authorization` header. We don't have to remember to add it.

### B. Intelligent Error Parsing
Standard `fetch()` doesn't throw an error on 404s. Our `ApiClient` does. It checks `response.ok` and automatically parses the JSON error from WooCommerce, so we can see **why** a request failed (e.g., "Invalid Consumer Secret").

---

## 4. Summary of Developer Benefits

1.  **Decoupling**: The Frontend doesn't care about WooCommerce's structure. It only cares about the `Product` type we defined.
2.  **Productivity**: You get full **Auto-complete** in VS Code because we defined our types. You don't have to check the WooCommerce documentation every 5 minutes.
3.  **Security**: Credentials are locked away in the `client.ts` and only executed on the server.
4.  **Consistency**: Every perfume note, price, and image is handled the same way across the entire site.
