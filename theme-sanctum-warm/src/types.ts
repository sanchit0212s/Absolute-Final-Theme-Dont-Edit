export interface ProductVariant {
  id: string;
  title: string;
  priceINR: number;
  availableForSale: boolean;
  weight?: string;
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  tags: string[];
  images: string[];
  variants: ProductVariant[];
  isAddon?: boolean;
  deityName?: string;
  mantra?: string;
  vastuPlacement?: string;
  chakra?: string;
  element?: string;
}

export interface CartItem {
  productId: string;
  variantId: string;
  title: string;
  variantTitle: string;
  priceINR: number;
  image: string;
  quantity: number;
}
