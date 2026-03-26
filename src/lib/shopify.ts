import { toast } from "sonner";

const SHOPIFY_API_VERSION = '2025-07';
const SHOPIFY_STORE_PERMANENT_DOMAIN = 'mxw0ww-82.myshopify.com';
const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
const SHOPIFY_STOREFRONT_TOKEN = '7554e27f1c1ee8a574c7fa9805c8a382';

// ─── Product types ────────────────────────────────────────────────────────────

export interface ShopifyProduct {
  node: {
    id: string;
    title: string;
    description: string;
    handle: string;
    tags: string[];
    priceRange: {
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
    images: {
      edges: Array<{
        node: {
          url: string;
          altText: string | null;
        };
      }>;
    };
    variants: {
      edges: Array<{
        node: {
          id: string;
          title: string;
          price: {
            amount: string;
            currencyCode: string;
          };
          availableForSale: boolean;
          weight: number | null;
          weightUnit: string | null;
          selectedOptions: Array<{
            name: string;
            value: string;
          }>;
        };
      }>;
    };
    options: Array<{
      name: string;
      values: string[];
    }>;
  };
}

// ─── Cart types ───────────────────────────────────────────────────────────────

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

// ─── API client ───────────────────────────────────────────────────────────────

export async function storefrontApiRequest(
  query: string,
  variables: Record<string, unknown> = {},
) {
  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (response.status === 402) {
    toast.error("Shopify: Payment required", {
      description: "Your store needs an active billing plan. Visit admin.shopify.com to upgrade.",
    });
    return;
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  if (data.errors) {
    throw new Error(
      `Error calling Shopify: ${data.errors.map((e: { message: string }) => e.message).join(', ')}`,
    );
  }
  return data;
}

// ─── Product queries ──────────────────────────────────────────────────────────

const PRODUCTS_QUERY = `
  query GetProducts($first: Int!, $query: String) {
    products(first: $first, query: $query) {
      edges {
        node {
          id
          title
          description
          handle
          tags
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                availableForSale
                weight
                weightUnit
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
          options {
            name
            values
          }
        }
      }
    }
  }
`;

const PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      description
      handle
      tags
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 10) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 20) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            availableForSale
            weight
            weightUnit
            selectedOptions {
              name
              value
            }
          }
        }
      }
      options {
        name
        values
      }
    }
  }
`;

export async function fetchProducts(first = 50, query?: string): Promise<ShopifyProduct[]> {
  const data = await storefrontApiRequest(PRODUCTS_QUERY, { first, query });
  return data?.data?.products?.edges || [];
}

export async function fetchProductByHandle(handle: string) {
  const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
  return data?.data?.product || null;
}

// ─── Cart — shared fields ─────────────────────────────────────────────────────
//
// Every cart query and mutation returns this identical shape so the store
// can always replace its local copy with the authoritative Shopify response.

const CART_FIELDS = `
  id
  checkoutUrl
  totalQuantity
  cost {
    subtotalAmount { amount currencyCode }
    totalAmount    { amount currencyCode }
    totalTaxAmount { amount currencyCode }
  }
  lines(first: 100) {
    edges {
      node {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            id
            title
            price { amount currencyCode }
            product {
              title
              images(first: 1) {
                edges { node { url altText } }
              }
            }
          }
        }
      }
    }
  }
`;

// ─── Cart queries ─────────────────────────────────────────────────────────────

const CART_QUERY = `
  query GetCart($id: ID!) {
    cart(id: $id) { ${CART_FIELDS} }
  }
`;

// ─── Cart mutations ───────────────────────────────────────────────────────────

const CART_CREATE_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart { ${CART_FIELDS} }
      userErrors { field message }
    }
  }
`;

const CART_LINES_ADD_MUTATION = `
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart { ${CART_FIELDS} }
      userErrors { field message }
    }
  }
`;

const CART_LINES_UPDATE_MUTATION = `
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart { ${CART_FIELDS} }
      userErrors { field message }
    }
  }
`;

const CART_LINES_REMOVE_MUTATION = `
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { ${CART_FIELDS} }
      userErrors { field message }
    }
  }
`;

// ─── Email marketing subscription ────────────────────────────────────────────

const CUSTOMER_EMAIL_MARKETING_SUBSCRIBE_MUTATION = `
  mutation customerEmailMarketingSubscribe($email: String!) {
    customerEmailMarketingSubscribe(email: $email) {
      customer {
        id
        emailAddress {
          emailAddress
          marketingState
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export async function subscribeEmailToMarketing(email: string): Promise<{ success: boolean; error?: string }> {
  try {
    const data = await storefrontApiRequest(CUSTOMER_EMAIL_MARKETING_SUBSCRIBE_MUTATION, { email });
    const userErrors = data?.data?.customerEmailMarketingSubscribe?.userErrors ?? [];
    if (userErrors.length > 0) {
      return { success: false, error: userErrors.map((e: { message: string }) => e.message).join(', ') };
    }
    return { success: true };
  } catch (err) {
    return { success: false, error: String(err) };
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function formatCheckoutUrl(checkoutUrl: string): string {
  try {
    const url = new URL(checkoutUrl);
    // Replace the myshopify.com domain with the custom storefront domain
    url.hostname = 'divinearts.store';
    url.searchParams.set('channel', 'online_store');
    return url.toString();
  } catch {
    return checkoutUrl;
  }
}

interface UserError {
  field: string[] | null;
  message: string;
}

function isCartNotFoundError(userErrors: UserError[]): boolean {
  return userErrors.some(
    e =>
      e.message.toLowerCase().includes('cart not found') ||
      e.message.toLowerCase().includes('does not exist'),
  );
}

// ─── Cart functions ───────────────────────────────────────────────────────────

export async function createShopifyCart(item: {
  variantId: string;
  quantity: number;
}): Promise<ShopifyCart | null> {
  const data = await storefrontApiRequest(CART_CREATE_MUTATION, {
    input: { lines: [{ quantity: item.quantity, merchandiseId: item.variantId }] },
  });

  if (data?.data?.cartCreate?.userErrors?.length > 0) {
    console.error('Cart creation failed:', data.data.cartCreate.userErrors);
    return null;
  }

  return data?.data?.cartCreate?.cart ?? null;
}

export async function addLineToShopifyCart(
  cartId: string,
  item: { variantId: string; quantity: number },
): Promise<{ cart: ShopifyCart | null; cartNotFound: boolean }> {
  const data = await storefrontApiRequest(CART_LINES_ADD_MUTATION, {
    cartId,
    lines: [{ quantity: item.quantity, merchandiseId: item.variantId }],
  });

  const userErrors: UserError[] = data?.data?.cartLinesAdd?.userErrors ?? [];
  if (isCartNotFoundError(userErrors)) return { cart: null, cartNotFound: true };
  if (userErrors.length > 0) return { cart: null, cartNotFound: false };

  return { cart: data?.data?.cartLinesAdd?.cart ?? null, cartNotFound: false };
}

export async function updateShopifyCartLine(
  cartId: string,
  lineId: string,
  quantity: number,
): Promise<{ cart: ShopifyCart | null; cartNotFound: boolean }> {
  const data = await storefrontApiRequest(CART_LINES_UPDATE_MUTATION, {
    cartId,
    lines: [{ id: lineId, quantity }],
  });

  const userErrors: UserError[] = data?.data?.cartLinesUpdate?.userErrors ?? [];
  if (isCartNotFoundError(userErrors)) return { cart: null, cartNotFound: true };
  if (userErrors.length > 0) return { cart: null, cartNotFound: false };

  return { cart: data?.data?.cartLinesUpdate?.cart ?? null, cartNotFound: false };
}

export async function removeLineFromShopifyCart(
  cartId: string,
  lineId: string,
): Promise<{ cart: ShopifyCart | null; cartNotFound: boolean }> {
  const data = await storefrontApiRequest(CART_LINES_REMOVE_MUTATION, {
    cartId,
    lineIds: [lineId],
  });

  const userErrors: UserError[] = data?.data?.cartLinesRemove?.userErrors ?? [];
  if (isCartNotFoundError(userErrors)) return { cart: null, cartNotFound: true };
  if (userErrors.length > 0) return { cart: null, cartNotFound: false };

  return { cart: data?.data?.cartLinesRemove?.cart ?? null, cartNotFound: false };
}

export async function fetchCart(cartId: string): Promise<ShopifyCart | null> {
  const data = await storefrontApiRequest(CART_QUERY, { id: cartId });
  return data?.data?.cart ?? null;
}
