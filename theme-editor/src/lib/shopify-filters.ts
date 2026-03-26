import type { Liquid } from 'liquidjs';

export function registerShopifyFilters(engine: Liquid): void {
  // Asset / URL filters
  engine.registerFilter('asset_url', (v: string) => `/assets/${v}`);
  engine.registerFilter('image_url', (v: unknown, ...args: unknown[]) => {
    if (v && typeof v === 'object' && 'src' in v) return (v as { src: string }).src;
    return typeof v === 'string' ? v : '';
  });
  engine.registerFilter('img_url', (v: unknown) => {
    if (v && typeof v === 'object' && 'src' in v) return (v as { src: string }).src;
    return typeof v === 'string' ? v : '';
  });
  engine.registerFilter('stylesheet_tag', (v: string) =>
    `<link rel="stylesheet" href="${v}">`);
  engine.registerFilter('script_tag', (v: string) =>
    `<script src="${v}"></script>`);

  // Money
  engine.registerFilter('money', (v: unknown) => {
    const n = Number(v) || 0;
    const amount = n > 200 ? n / 100 : n; // heuristic: cents vs dollars
    return `$${amount.toFixed(2)}`;
  });
  engine.registerFilter('money_with_currency', (v: unknown) => {
    const n = Number(v) || 0;
    const amount = n > 200 ? n / 100 : n;
    return `$${amount.toFixed(2)} USD`;
  });
  engine.registerFilter('weight_with_unit', (v: unknown) => `${v} g`);

  // Date
  engine.registerFilter('date', (v: unknown, fmt: string) => {
    if (v === 'now' || v === 'today') {
      const d = new Date();
      if (fmt === '%Y') return String(d.getFullYear());
      if (fmt === '%B %d, %Y') return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      return d.toLocaleDateString();
    }
    return String(v);
  });

  // Translation stub
  engine.registerFilter('t', (v: string) => v);

  // String filters
  engine.registerFilter('escape', (v: unknown) => {
    const s = String(v ?? '');
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  });
  engine.registerFilter('strip_html', (v: unknown) => String(v ?? '').replace(/<[^>]*>/g, ''));
  engine.registerFilter('truncate', (v: unknown, n: number = 50) => {
    const s = String(v ?? '');
    return s.length > n ? s.slice(0, n) + '...' : s;
  });
  engine.registerFilter('truncatewords', (v: unknown, n: number = 15) => {
    const words = String(v ?? '').split(/\s+/);
    return words.length > n ? words.slice(0, n).join(' ') + '...' : words.join(' ');
  });
  engine.registerFilter('newline_to_br', (v: unknown) => String(v ?? '').replace(/\n/g, '<br>'));
  engine.registerFilter('strip', (v: unknown) => String(v ?? '').trim());
  engine.registerFilter('upcase', (v: unknown) => String(v ?? '').toUpperCase());
  engine.registerFilter('downcase', (v: unknown) => String(v ?? '').toLowerCase());
  engine.registerFilter('capitalize', (v: unknown) => {
    const s = String(v ?? '');
    return s.charAt(0).toUpperCase() + s.slice(1);
  });
  engine.registerFilter('replace', (v: unknown, search: string, replace: string) =>
    String(v ?? '').split(search).join(replace));
  engine.registerFilter('remove', (v: unknown, search: string) =>
    String(v ?? '').split(search).join(''));
  engine.registerFilter('append', (v: unknown, s: string) => String(v ?? '') + s);
  engine.registerFilter('prepend', (v: unknown, s: string) => s + String(v ?? ''));
  engine.registerFilter('url_encode', (v: unknown) => encodeURIComponent(String(v ?? '')));
  engine.registerFilter('url_decode', (v: unknown) => decodeURIComponent(String(v ?? '')));
  engine.registerFilter('json', (v: unknown) => JSON.stringify(v));
  engine.registerFilter('pluralize', (v: unknown, singular: string, plural: string) =>
    Number(v) === 1 ? singular : plural);

  // Array filters
  engine.registerFilter('where', (arr: unknown[], prop: string, val?: unknown) => {
    if (!Array.isArray(arr)) return [];
    if (val === undefined) return arr.filter(i => i && (i as Record<string, unknown>)[prop]);
    return arr.filter(i => i && (i as Record<string, unknown>)[prop] === val);
  });
  engine.registerFilter('map', (arr: unknown[], prop: string) => {
    if (!Array.isArray(arr)) return [];
    return arr.map(i => i && (i as Record<string, unknown>)[prop]);
  });
  engine.registerFilter('sort', (arr: unknown[], prop?: string) => {
    if (!Array.isArray(arr)) return [];
    const copy = [...arr];
    if (prop) copy.sort((a, b) => String((a as Record<string, unknown>)[prop]).localeCompare(String((b as Record<string, unknown>)[prop])));
    else copy.sort();
    return copy;
  });
  engine.registerFilter('uniq', (arr: unknown[]) => Array.isArray(arr) ? [...new Set(arr)] : []);
  engine.registerFilter('concat', (a: unknown[], b: unknown[]) => {
    return [...(Array.isArray(a) ? a : []), ...(Array.isArray(b) ? b : [])];
  });
  engine.registerFilter('first', (arr: unknown[]) => Array.isArray(arr) ? arr[0] : arr);
  engine.registerFilter('last', (arr: unknown[]) => Array.isArray(arr) ? arr[arr.length - 1] : arr);
  engine.registerFilter('size', (v: unknown) => {
    if (Array.isArray(v)) return v.length;
    if (typeof v === 'string') return v.length;
    return 0;
  });

  // Math filters
  engine.registerFilter('plus', (a: unknown, b: unknown) => Number(a) + Number(b));
  engine.registerFilter('minus', (a: unknown, b: unknown) => Number(a) - Number(b));
  engine.registerFilter('times', (a: unknown, b: unknown) => Number(a) * Number(b));
  engine.registerFilter('divided_by', (a: unknown, b: unknown) => {
    const bv = Number(b);
    return bv === 0 ? 0 : Number(a) / bv;
  });
  engine.registerFilter('modulo', (a: unknown, b: unknown) => Number(a) % Number(b));
  engine.registerFilter('abs', (v: unknown) => Math.abs(Number(v)));
  engine.registerFilter('ceil', (v: unknown) => Math.ceil(Number(v)));
  engine.registerFilter('floor', (v: unknown) => Math.floor(Number(v)));
  engine.registerFilter('round', (v: unknown, n: number = 0) => {
    const factor = Math.pow(10, n);
    return Math.round(Number(v) * factor) / factor;
  });

  // No-op passthrough filters
  engine.registerFilter('color_modify', (v: unknown) => v);
  engine.registerFilter('font_modify', (v: unknown) => v);
  engine.registerFilter('font_url', (v: unknown) => String(v ?? ''));
  engine.registerFilter('base64_encode', (v: unknown) => {
    try { return btoa(String(v ?? '')); } catch { return String(v ?? ''); }
  });
  engine.registerFilter('base64_decode', (v: unknown) => {
    try { return atob(String(v ?? '')); } catch { return String(v ?? ''); }
  });

  // Ternary helper used in theme.liquid
  engine.registerFilter('ternary', (v: unknown, trueVal: unknown, falseVal: unknown) =>
    v ? trueVal : falseVal);
}
