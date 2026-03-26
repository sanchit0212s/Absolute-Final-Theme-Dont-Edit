/**
 * ── Shopify Storefront API client ──────────────────────────────
 *
 * Copied from the production app (src/lib/shopify.ts) with one
 * change: no dependency on `sonner` for toast notifications.
 * Error handling is done via console.error instead.
 *
 * This file is only imported when USE_SHOPIFY = true (via api.ts).
 * It is never called in demo mode, so tree-shaking removes it
 * from the bundle automatically.
 */

import { SHOPIFY_CONFIG } from "@/config";

const STOREFRONT_URL = `https://${SHOPIFY_CONFIG.storeDomain}/api/${SHOPIFY_CONFIG.apiVersion}/graphql.json`;

// ─── Shopify types ──────────────────────────────────────────────

export interface ShopifyProduct {
  node: {
    id: string;
    title: string;
    description: string;
    handle: string;
    tags: string[];
    priceRange: {
      minVariantPrice: { amount: string; currencyCode: string };
    };
    images: {
      edges: Array<{ node: { url: string; altText: string | null } }>;
    };
    variants: {
      edges: Array<{
        node: {
          id: string;
          title: string;
          price: { amount: string; currencyCode: string };
          availableForSale: boolean;
          weight: number | null;
          weightUnit: string | null;
          selectedOptions: Array<{ name: string; value: string }>;
        };
      }>;
    };
    options: Array<{ name: string; values: string[] }>;
  };
}

export interface ShopifyCartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    price: { amount: string; currencyCode: string };
    product: {
      title: string;
      images: {
        edges: Array<{ node: { url: string; altText: string | null } }>;
      };
    };
  };
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: { amount: string; currencyCode: string };
    totalAmount: { amount: string; currencyCode: string };
    totalTaxAmount: { amount: string; currencyCode: string } | null;
  };
  lines: {
    edges: Array<{ node: ShopifyCartLine }>;
  };
}

// ─── API client ─────────────────────────────────────────────────

export async function storefrontApiRequest(
  query: string,
  variables: Record<string, unknown> = {},
) {
  const response = await fetch(STOREFRONT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_CONFIG.storefrontToken,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Shopify HTTP error: ${response.status}`);
  }

  const data = await response.json();
  if (data.errors) {
    throw new Error(
      `Shopify API error: ${data.errors.map((e: { message: string }) => e.message).join(", ")}`,
    );
  }
  return data;
}

// ─── Product queries ────────────────────────────────────────────

const PRODUCTS_QUERY = `
  query GetProducts($first: Int!, $query: String) {
    products(first: $first, query: $query) {
      edges {
        node {
          id title description handle tags
          priceRange { minVariantPrice { amount currencyCode } }
          images(first: 5) { edges { node { url altText } } }
          variants(first: 10) {
            edges {
              node {
                id title
                price { amount currencyCode }
                availableForSale weight weightUnit
                selectedOptions { name value }
              }
            }
          }
          options { name values }
        }
      }
    }
  }
`;

const PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
      id title description handle tags
      priceRange { minVariantPrice { amount currencyCode } }
      images(first: 10) { edges { node { url altText } } }
      variants(first: 20) {
        edges {
          node {
            id title
            price { amount currencyCode }
            availableForSale weight weightUnit
            selectedOptions { name value }
          }
        }
      }
      options { name values }
    }
  }
`;

export async function fetchShopifyProducts(first = 50, query?: string): Promise<ShopifyProduct[]> {
  const data = await storefrontApiRequest(PRODUCTS_QUERY, { first, query });
  return data?.data?.products?.edges || [];
}

export async function fetchShopifyProductByHandle(handle: string) {
  const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
  return data?.data?.product || null;
}

// ─── Cart ───────────────────────────────────────────────────────

const CART_FIELDS = `
  id checkoutUrl totalQuantity
  cost {
    subtotalAmount { amount currencyCode }
    totalAmount { amount currencyCode }
    totalTaxAmount { amount currencyCode }
  }
  lines(first: 100) {
    edges {
      node {
        id quantity
        merchandise {
          ... on ProductVariant {
            id title
            price { amount currencyCode }
            product {
              title
              images(first: 1) { edges { node { url altText } } }
            }
          }
        }
      }
    }
  }
`;

const CART_CREATE = `mutation cartCreate($input: CartInput!) { cartCreate(input: $input) { cart { ${CART_FIELDS} } userErrors { field message } } }`;
const CART_LINES_ADD = `mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) { cartLinesAdd(cartId: $cartId, lines: $lines) { cart { ${CART_FIELDS} } userErrors { field message } } }`;
const CART_LINES_UPDATE = `mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) { cartLinesUpdate(cartId: $cartId, lines: $lines) { cart { ${CART_FIELDS} } userErrors { field message } } }`;
const CART_LINES_REMOVE = `mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) { cartLinesRemove(cartId: $cartId, lineIds: $lineIds) { cart { ${CART_FIELDS} } userErrors { field message } } }`;
const CART_QUERY = `query GetCart($id: ID!) { cart(id: $id) { ${CART_FIELDS} } }`;

interface UserError { field: string[] | null; message: string }

function isCartNotFoundError(errors: UserError[]) {
  return errors.some(e => e.message.toLowerCase().includes("cart not found") || e.message.toLowerCase().includes("does not exist"));
}

export async function createShopifyCart(variantId: string, quantity = 1): Promise<ShopifyCart | null> {
  const data = await storefrontApiRequest(CART_CREATE, {
    input: { lines: [{ quantity, merchandiseId: variantId }] },
  });
  if (data?.data?.cartCreate?.userErrors?.length > 0) return null;
  return data?.data?.cartCreate?.cart ?? null;
}

export async function addLineToShopifyCart(cartId: string, variantId: string, quantity = 1) {
  const data = await storefrontApiRequest(CART_LINES_ADD, {
    cartId,
    lines: [{ quantity, merchandiseId: variantId }],
  });
  const errors: UserError[] = data?.data?.cartLinesAdd?.userErrors ?? [];
  if (isCartNotFoundError(errors)) return { cart: null as ShopifyCart | null, cartNotFound: true };
  return { cart: data?.data?.cartLinesAdd?.cart as ShopifyCart | null, cartNotFound: false };
}

export async function updateShopifyCartLine(cartId: string, lineId: string, quantity: number) {
  const data = await storefrontApiRequest(CART_LINES_UPDATE, {
    cartId,
    lines: [{ id: lineId, quantity }],
  });
  const errors: UserError[] = data?.data?.cartLinesUpdate?.userErrors ?? [];
  if (isCartNotFoundError(errors)) return { cart: null as ShopifyCart | null, cartNotFound: true };
  return { cart: data?.data?.cartLinesUpdate?.cart as ShopifyCart | null, cartNotFound: false };
}

export async function removeLineFromShopifyCart(cartId: string, lineId: string) {
  const data = await storefrontApiRequest(CART_LINES_REMOVE, {
    cartId,
    lineIds: [lineId],
  });
  const errors: UserError[] = data?.data?.cartLinesRemove?.userErrors ?? [];
  if (isCartNotFoundError(errors)) return { cart: null as ShopifyCart | null, cartNotFound: true };
  return { cart: data?.data?.cartLinesRemove?.cart as ShopifyCart | null, cartNotFound: false };
}

export async function fetchShopifyCart(cartId: string): Promise<ShopifyCart | null> {
  const data = await storefrontApiRequest(CART_QUERY, { id: cartId });
  return data?.data?.cart ?? null;
}

export function formatCheckoutUrl(checkoutUrl: string): string {
  try {
    const url = new URL(checkoutUrl);
    url.hostname = SHOPIFY_CONFIG.customDomain;
    url.searchParams.set("channel", "online_store");
    return url.toString();
  } catch {
    return checkoutUrl;
  }
}
