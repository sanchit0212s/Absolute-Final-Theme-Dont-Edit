/**
 * ── Shopify connection config ──────────────────────────────────
 *
 * Flip USE_SHOPIFY to true and this theme connects to your live
 * Shopify store. That's it. Everything else adapts automatically:
 * - Products fetched from Storefront API instead of mock data
 * - Cart mutations go through Shopify (real checkout URL)
 * - Local enrichment data (mantras, vastu, etc.) merged onto
 *   Shopify products by handle
 *
 * When USE_SHOPIFY is false (default), the theme runs as a
 * standalone demo with hardcoded product data and a local cart.
 */

export const USE_SHOPIFY = false;

export const SHOPIFY_CONFIG = {
  storeDomain: "mxw0ww-82.myshopify.com",
  storefrontToken: "7554e27f1c1ee8a574c7fa9805c8a382",
  apiVersion: "2025-07",
  customDomain: "divinearts.store",
};

/**
 * Real Shopify variant IDs for addon products.
 * Used when USE_SHOPIFY = true. In demo mode, local IDs are used instead.
 */
export const SHOPIFY_ADDON_IDS = {
  consecration: "gid://shopify/ProductVariant/45915468366012",
  lamp: "gid://shopify/ProductVariant/45915468398780",
};
