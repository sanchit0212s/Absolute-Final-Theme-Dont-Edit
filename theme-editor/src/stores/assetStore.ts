import { create } from 'zustand';
import type { EditorAsset } from '@/types/editor';

interface AssetState {
  assets: Map<string, EditorAsset>;
  assetUrlMap: Map<string, string>;

  addAsset: (key: string, file: File) => void;
  getAssetUrl: (key: string) => string | undefined;
  removeAsset: (key: string) => void;
  initializeAssetUrls: (urls: Map<string, string>) => void;
  getAllAssets: () => Map<string, EditorAsset>;
  clear: () => void;
}

export const useAssetStore = create<AssetState>((set, get) => ({
  assets: new Map(),
  assetUrlMap: new Map(),

  addAsset: (key, file) => {
    const old = get().assets.get(key);
    if (old) URL.revokeObjectURL(old.objectUrl);

    const objectUrl = URL.createObjectURL(file);
    const asset: EditorAsset = {
      blob: file,
      objectUrl,
      filename: file.name,
      originalPath: key,
    };

    set(s => {
      const assets = new Map(s.assets);
      assets.set(key, asset);
      const assetUrlMap = new Map(s.assetUrlMap);
      assetUrlMap.set(key, objectUrl);
      return { assets, assetUrlMap };
    });
  },

  getAssetUrl: (key) => get().assetUrlMap.get(key),

  removeAsset: (key) => {
    const old = get().assets.get(key);
    if (old) URL.revokeObjectURL(old.objectUrl);
    set(s => {
      const assets = new Map(s.assets);
      assets.delete(key);
      const assetUrlMap = new Map(s.assetUrlMap);
      assetUrlMap.delete(key);
      return { assets, assetUrlMap };
    });
  },

  initializeAssetUrls: (urls) => {
    set({ assetUrlMap: new Map(urls) });
  },

  getAllAssets: () => get().assets,

  clear: () => {
    get().assets.forEach(a => URL.revokeObjectURL(a.objectUrl));
    set({ assets: new Map(), assetUrlMap: new Map() });
  },
}));
