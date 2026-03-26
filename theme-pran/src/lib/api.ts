/**
 * ── Data layer ─────────────────────────────────────────────────
 *
 * Single source of truth for product data.
 * When USE_SHOPIFY = false: returns hardcoded mock data.
 * When USE_SHOPIFY = true: fetches from Shopify Storefront API
 * and merges with local enrichment data (mantras, vastu, etc.).
 *
 * Components never import from data/products.ts directly.
 * They always go through this layer.
 */

import { USE_SHOPIFY } from "@/config";
import { enrichment } from "@/data/enrichment";
import type { Product } from "@/types";

// ── Mock data (demo mode) ──────────────────────────────────────

let _mockProducts: Product[] | null = null;

async function getMockProducts(): Promise<Product[]> {
  if (!_mockProducts) {
    const mod = await import("@/data/products");
    _mockProducts = mod.products;
  }
  return _mockProducts;
}

// ── Shopify data (live mode) ───────────────────────────────────

function mapShopifyProduct(node: Record<string, any>): Product {
  const handle = node.handle as string;
  const enrich = enrichment[handle] || {};

  const variants = (node.variants?.edges || []).map((e: any) => ({
    id: e.node.id,
    title: e.node.title,
    priceINR: Math.round(parseFloat(e.node.price.amount)),
    availableForSale: e.node.availableForSale,
    weight: e.node.weight
      ? `${e.node.weight} ${(e.node.weightUnit || "kg").toLowerCase()}`
      : undefined,
  }));

  const images = (node.images?.edges || []).map(
    (e: any) => e.node.url as string
  );

  return {
    id: node.id,
    handle,
    title: node.title,
    tagline: enrich.tagline || "",
    description: node.description,
    longDescription: enrich.longDescription || node.description,
    tags: node.tags || [],
    images,
    variants,
    isAddon: (node.tags || []).some(
      (t: string) => t === "addon" || t === "accessory"
    ),
    deityName: enrich.deityName,
    mantra: enrich.mantra,
    vastuPlacement: enrich.vastuPlacement,
    chakra: enrich.chakra,
    element: enrich.element,
  };
}

async function getShopifyProducts(): Promise<Product[]> {
  const { fetchShopifyProducts } = await import("@/lib/shopify");
  const edges = await fetchShopifyProducts();
  return edges.map((edge) => mapShopifyProduct(edge.node));
}

async function getShopifyProductByHandle(
  handle: string
): Promise<Product | undefined> {
  const { fetchShopifyProductByHandle } = await import("@/lib/shopify");
  const node = await fetchShopifyProductByHandle(handle);
  if (!node) return undefined;
  return mapShopifyProduct(node);
}

// ── Public API ──────────────────────────────────────────────────

export async function getProducts(): Promise<Product[]> {
  if (USE_SHOPIFY) return getShopifyProducts();
  return getMockProducts();
}

export async function getProductByHandle(
  handle: string
): Promise<Product | undefined> {
  if (USE_SHOPIFY) return getShopifyProductByHandle(handle);
  const products = await getMockProducts();
  return products.find((p) => p.handle === handle);
}

export async function getMainProducts(): Promise<Product[]> {
  const all = await getProducts();
  return all.filter((p) => !p.isAddon);
}

export async function getAddonProducts(): Promise<Product[]> {
  const all = await getProducts();
  return all.filter((p) => p.isAddon);
}
