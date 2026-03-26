import type { ThemeFile, ThemeFileType } from '@/types/editor';
import { parseSchema } from './schema-parser';

// Eagerly import all theme files as raw strings
const themeModules = import.meta.glob('../../../theme-kala-shopify/**/*.{liquid,json,css,js}', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

// Also import binary assets (images) as URLs
const themeAssets = import.meta.glob('../../../theme-kala-shopify/assets/*.{png,jpg,jpeg,gif,svg,webp,ico}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

function classifyFile(path: string): ThemeFileType {
  if (path.startsWith('sections/') || path.includes('/sections/')) return 'section';
  if (path.startsWith('snippets/') || path.includes('/snippets/')) return 'snippet';
  if (path.startsWith('templates/') || path.includes('/templates/')) return 'template';
  if (path.startsWith('layout/') || path.includes('/layout/')) return 'layout';
  if (path.startsWith('config/') || path.includes('/config/')) return 'config';
  if (path.startsWith('locales/') || path.includes('/locales/')) return 'locale';
  return 'asset';
}

function normalizePath(rawPath: string): string {
  // Convert from ../../theme-kala-shopify/sections/hero.liquid -> sections/hero.liquid
  const idx = rawPath.indexOf('theme-kala-shopify/');
  if (idx >= 0) return rawPath.slice(idx + 'theme-kala-shopify/'.length);
  return rawPath;
}

export function loadTheme(): Map<string, ThemeFile> {
  const files = new Map<string, ThemeFile>();

  // Load text files
  for (const [rawPath, content] of Object.entries(themeModules)) {
    const path = normalizePath(rawPath);
    const type = classifyFile(path);
    const file: ThemeFile = { path, content, type };

    if (type === 'section') {
      file.schema = parseSchema(content);
    }

    files.set(path, file);
  }

  return files;
}

export function getAssetUrlMap(): Map<string, string> {
  const map = new Map<string, string>();
  for (const [rawPath, url] of Object.entries(themeAssets)) {
    const filename = rawPath.split('/').pop() || '';
    map.set(filename, url);
  }
  return map;
}

export function getTemplateList(files: Map<string, ThemeFile>): string[] {
  return [...files.entries()]
    .filter(([, f]) => f.type === 'template')
    .map(([p]) => p)
    .sort();
}

export function getSectionList(files: Map<string, ThemeFile>): string[] {
  return [...files.entries()]
    .filter(([, f]) => f.type === 'section')
    .map(([p]) => p)
    .sort();
}

export function getSnippetList(files: Map<string, ThemeFile>): string[] {
  return [...files.entries()]
    .filter(([, f]) => f.type === 'snippet')
    .map(([p]) => p)
    .sort();
}
