/**
 * ── Product data hooks ─────────────────────────────────────────
 *
 * React hooks that wrap the data layer. Components use these
 * instead of importing product data directly.
 *
 * In demo mode: resolves instantly from mock data.
 * In Shopify mode: fetches from API with loading state.
 */

import { useState, useEffect } from "react";
import type { Product } from "@/types";
import { getMainProducts, getAddonProducts, getProductByHandle } from "@/lib/api";

interface UseProductsResult {
  products: Product[];
  isLoading: boolean;
}

export function useMainProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    getMainProducts().then((data) => {
      if (!cancelled) {
        setProducts(data);
        setIsLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, []);

  return { products, isLoading };
}

export function useAddonProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    getAddonProducts().then((data) => {
      if (!cancelled) {
        setProducts(data);
        setIsLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, []);

  return { products, isLoading };
}

export function useProduct(handle: string | undefined) {
  const [product, setProduct] = useState<Product | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!handle) {
      setIsLoading(false);
      return;
    }
    let cancelled = false;
    getProductByHandle(handle).then((data) => {
      if (!cancelled) {
        setProduct(data);
        setIsLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, [handle]);

  return { product, isLoading };
}
