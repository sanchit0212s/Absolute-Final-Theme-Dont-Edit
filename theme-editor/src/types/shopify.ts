// Types for mock Shopify Liquid objects
export interface ShopifyProduct {
  id: number;
  title: string;
  handle: string;
  description: string;
  type: string;
  vendor: string;
  url: string;
  featured_image: ShopifyImage;
  images: ShopifyImage[];
  variants: ShopifyVariant[];
  tags: string[];
  price: number;
  price_min: number;
  price_max: number;
  compare_at_price: number | null;
  available: boolean;
  metafields: { custom: Record<string, string> };
  first_available_variant: ShopifyVariant;
}

export interface ShopifyImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface ShopifyVariant {
  id: number;
  title: string;
  price: number;
  compare_at_price: number | null;
  available: boolean;
  sku: string;
  weight: number;
  weight_unit: string;
  featured_image: ShopifyImage | null;
}

export interface ShopifyCollection {
  id: number;
  title: string;
  handle: string;
  description: string;
  url: string;
  image: ShopifyImage | null;
  products: ShopifyProduct[];
  products_count: number;
  all_tags: string[];
}

export interface ShopifyCart {
  item_count: number;
  total_price: number;
  items: ShopifyCartItem[];
  currency: string;
}

export interface ShopifyCartItem {
  id: number;
  title: string;
  variant_title: string;
  quantity: number;
  price: number;
  line_price: number;
  image: string;
  url: string;
  handle: string;
}

export interface ShopifyShop {
  name: string;
  url: string;
  description: string;
  email: string;
  money_format: string;
  currency: string;
  locale: string;
}

export interface ShopifyRoutes {
  root_url: string;
  account_url: string;
  account_login_url: string;
  account_logout_url: string;
  account_register_url: string;
  collections_url: string;
  cart_url: string;
  search_url: string;
}

export interface ShopifyRequest {
  locale: { iso_code: string; endpoint_prefix: string };
  page_type: string;
}

export interface ShopifyLinklist {
  title: string;
  handle: string;
  links: ShopifyLink[];
}

export interface ShopifyLink {
  title: string;
  url: string;
  active: boolean;
  links: ShopifyLink[];
}

export interface ShopifyGlobals {
  shop: ShopifyShop;
  cart: ShopifyCart;
  routes: ShopifyRoutes;
  request: ShopifyRequest;
  linklists: Record<string, ShopifyLinklist>;
  collections: Record<string, ShopifyCollection>;
  settings: Record<string, unknown>;
  page_title: string;
  page_description: string;
  canonical_url: string;
  content_for_header: string;
}
