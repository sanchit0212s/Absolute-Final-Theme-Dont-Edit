import { Liquid } from 'liquidjs';
import { registerShopifyFilters } from './shopify-filters';
import { registerShopifyTags } from './shopify-tags';
import { stripSchema } from './schema-parser';
import type { ThemeFile, TemplateJSON, TemplateSection } from '@/types/editor';
import type { ShopifyGlobals } from '@/types/shopify';
import type { SectionSchema } from '@/types/schema';

export function createEngine(themeFiles: Map<string, ThemeFile>): Liquid {
  const engine = new Liquid({
    strictFilters: false,
    strictVariables: false,
    lenientIf: true,
    fs: {
      readFileSync: (path: string) => {
        const normalized = path.replace(/^\//, '');
        const candidates = [
          normalized,
          `snippets/${normalized}.liquid`,
          `sections/${normalized}.liquid`,
          `${normalized}.liquid`,
        ];
        for (const c of candidates) {
          const f = themeFiles.get(c);
          if (f) return f.content;
        }
        return `<!-- snippet not found: ${path} -->`;
      },
      readFile: async (path: string) => {
        const normalized = path.replace(/^\//, '');
        const candidates = [
          normalized,
          `snippets/${normalized}.liquid`,
          `sections/${normalized}.liquid`,
          `${normalized}.liquid`,
        ];
        for (const c of candidates) {
          const f = themeFiles.get(c);
          if (f) return f.content;
        }
        return `<!-- snippet not found: ${path} -->`;
      },
      existsSync: (path: string) => {
        const normalized = path.replace(/^\//, '');
        return themeFiles.has(normalized)
          || themeFiles.has(`snippets/${normalized}.liquid`)
          || themeFiles.has(`sections/${normalized}.liquid`);
      },
      exists: async (path: string) => {
        const normalized = path.replace(/^\//, '');
        return themeFiles.has(normalized)
          || themeFiles.has(`snippets/${normalized}.liquid`)
          || themeFiles.has(`sections/${normalized}.liquid`);
      },
      resolve: (_root: string, file: string, _ext: string) => file,
      contains: () => true,
      dirname: () => '',
      sep: '/',
    } as unknown as Liquid['options']['fs'],
  });

  registerShopifyFilters(engine);
  registerShopifyTags(engine);

  return engine;
}

function mergeSettings(schema: SectionSchema | undefined, templateSettings: Record<string, unknown>): Record<string, unknown> {
  const merged: Record<string, unknown> = {};
  // Apply defaults from schema
  if (schema?.settings) {
    for (const s of schema.settings) {
      if (s.default !== undefined) merged[s.id] = s.default;
    }
  }
  // Override with template settings
  Object.assign(merged, templateSettings);
  return merged;
}

function buildBlocks(
  schema: SectionSchema | undefined,
  templateSection: TemplateSection,
): Array<{ id: string; type: string; settings: Record<string, unknown>; shopify_attributes: string }> {
  const blocks: Array<{ id: string; type: string; settings: Record<string, unknown>; shopify_attributes: string }> = [];

  const blockEntries = templateSection.blocks || {};
  const blockOrder = templateSection.block_order || Object.keys(blockEntries);

  for (const blockId of blockOrder) {
    const block = blockEntries[blockId];
    if (!block) continue;

    // Find block schema defaults
    const blockSchema = schema?.blocks?.find(b => b.type === block.type);
    const settings: Record<string, unknown> = {};
    if (blockSchema?.settings) {
      for (const s of blockSchema.settings) {
        if (s.default !== undefined) settings[s.id] = s.default;
      }
    }
    Object.assign(settings, block.settings || {});

    blocks.push({
      id: blockId,
      type: block.type,
      settings,
      shopify_attributes: `data-block-id="${blockId}"`,
    });
  }

  return blocks;
}

export async function renderSection(
  engine: Liquid,
  sectionId: string,
  sectionConfig: TemplateSection,
  sectionFile: ThemeFile,
  globals: ShopifyGlobals,
  assetUrlMap: Map<string, string>,
): Promise<string> {
  const liquidContent = stripSchema(sectionFile.content);
  const settings = mergeSettings(sectionFile.schema, sectionConfig.settings);
  const blocks = buildBlocks(sectionFile.schema, sectionConfig);

  // Build the section Liquid context
  const products = globals.collections['all']?.products || [];
  const collection = globals.collections['all'];

  const context: Record<string, unknown> = {
    ...globals,
    section: {
      id: sectionId,
      settings,
      blocks,
      block_order: blocks.map(b => b.id),
    },
    // Make products available at top level for collection/product templates
    product: products[0],
    collection,
    'collections': globals.collections,
  };

  try {
    let html = await engine.parseAndRender(liquidContent, context);

    // Replace asset URLs with actual blob/import URLs
    html = resolveAssetUrls(html, assetUrlMap);

    // Wrap in section container
    return `<div id="shopify-section-${sectionId}" class="shopify-section" data-section-id="${sectionId}" data-section-type="${sectionConfig.type}">${html}</div>`;
  } catch (err) {
    console.error(`Error rendering section "${sectionId}":`, err);
    return `<div id="shopify-section-${sectionId}" class="shopify-section" data-section-id="${sectionId}" data-section-type="${sectionConfig.type}"><div style="padding:2rem;color:red;border:1px solid red;margin:1rem;">Error rendering section "${sectionId}": ${err}</div></div>`;
  }
}

export async function renderStaticSection(
  engine: Liquid,
  sectionName: string,
  themeFiles: Map<string, ThemeFile>,
  globals: ShopifyGlobals,
  assetUrlMap: Map<string, string>,
): Promise<string> {
  const sectionFile = themeFiles.get(`sections/${sectionName}.liquid`);
  if (!sectionFile) return `<!-- section not found: ${sectionName} -->`;

  return renderSection(
    engine,
    sectionName,
    { type: sectionName, settings: {} },
    sectionFile,
    globals,
    assetUrlMap,
  );
}

export async function renderTemplate(
  engine: Liquid,
  templateJSON: TemplateJSON,
  themeFiles: Map<string, ThemeFile>,
  globals: ShopifyGlobals,
  assetUrlMap: Map<string, string>,
): Promise<string> {
  // Render all content sections
  const sectionHtmls: string[] = [];
  for (const sectionId of templateJSON.order) {
    const sectionConfig = templateJSON.sections[sectionId];
    if (!sectionConfig || sectionConfig.disabled) continue;

    const sectionFile = themeFiles.get(`sections/${sectionConfig.type}.liquid`);
    if (!sectionFile) {
      sectionHtmls.push(`<div data-section-id="${sectionId}"><!-- missing section: ${sectionConfig.type} --></div>`);
      continue;
    }

    const html = await renderSection(engine, sectionId, sectionConfig, sectionFile, globals, assetUrlMap);
    sectionHtmls.push(html);
  }

  const contentHtml = sectionHtmls.join('\n');

  // Render header and footer
  const headerHtml = await renderStaticSection(engine, 'header', themeFiles, globals, assetUrlMap);
  const footerHtml = await renderStaticSection(engine, 'footer', themeFiles, globals, assetUrlMap);

  // Skip cart drawer in editor preview — it overlays everything
  const cartDrawerHtml = '<!-- cart drawer hidden in editor -->';

  // Get theme CSS
  const themeCssFile = themeFiles.get('assets/theme.css');
  const themeCss = themeCssFile?.content || '';

  // Get theme JS
  const themeJsFile = themeFiles.get('assets/theme.js');
  const themeJs = themeJsFile?.content || '';

  // Build the full page
  const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${globals.page_title} – ${globals.shop.name}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
  <style>${themeCss}</style>
  <style>
    :root {
      --color-accent: ${globals.settings.color_accent || '#b8860b'};
      --color-saffron: ${globals.settings.color_saffron || '#e8a317'};
      --color-surface: ${globals.settings.color_surface || '#faf9f6'};
      --color-on-surface: ${globals.settings.color_text || '#1a1a1a'};
      --color-on-surface-muted: ${globals.settings.color_text_muted || '#6b6b6b'};
      --color-border: ${globals.settings.color_border || '#e5e5e5'};
      --color-background: #ffffff;
      --font-display: 'Cormorant Garamond', serif;
      --font-body: 'Inter', sans-serif;
    }
  </style>
  <style>
    /* Editor bridge: highlight hovered sections */
    .shopify-section.editor-hover { outline: 2px solid #6366f1; outline-offset: -2px; }
    .shopify-section.editor-selected { outline: 2px solid #818cf8; outline-offset: -2px; }
  </style>
</head>
<body class="font-body text-on-surface bg-background antialiased">
  ${headerHtml}
  <main id="MainContent" role="main">
    ${contentHtml}
  </main>
  ${footerHtml}
  ${cartDrawerHtml}
  <script>
    // Editor bridge — communicates with parent editor
    (function() {
      // Notify parent of section hover/click
      document.addEventListener('mouseover', function(e) {
        var el = e.target.closest('[data-section-id]');
        document.querySelectorAll('.editor-hover').forEach(function(s) { s.classList.remove('editor-hover'); });
        if (el) {
          el.classList.add('editor-hover');
          window.parent.postMessage({ type: 'section-hover', sectionId: el.dataset.sectionId }, '*');
        }
      });
      document.addEventListener('click', function(e) {
        var sectionEl = e.target.closest('[data-section-id]');
        document.querySelectorAll('.editor-selected').forEach(function(s) { s.classList.remove('editor-selected'); });
        if (sectionEl) {
          sectionEl.classList.add('editor-selected');
          window.parent.postMessage({
            type: 'section-click',
            sectionId: sectionEl.dataset.sectionId,
            targetTag: e.target.tagName,
            targetText: e.target.textContent?.substring(0, 100),
            isImage: e.target.tagName === 'IMG',
            rect: e.target.getBoundingClientRect(),
          }, '*');
          e.preventDefault();
        }
      });
      // Listen for commands from parent
      window.addEventListener('message', function(e) {
        if (e.data.type === 'scroll-to-section') {
          var el = document.querySelector('[data-section-id="' + e.data.sectionId + '"]');
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        if (e.data.type === 'highlight-section') {
          document.querySelectorAll('.editor-selected').forEach(function(s) { s.classList.remove('editor-selected'); });
          var el = document.querySelector('[data-section-id="' + e.data.sectionId + '"]');
          if (el) el.classList.add('editor-selected');
        }
      });
      // Disable all links in preview
      document.addEventListener('click', function(e) {
        var link = e.target.closest('a');
        if (link) e.preventDefault();
      });
    })();
  </script>
</body>
</html>`;

  return resolveAssetUrls(fullHtml, assetUrlMap);
}

function resolveAssetUrls(html: string, assetUrlMap: Map<string, string>): string {
  // Replace /assets/filename with actual URLs from the map
  return html.replace(/\/assets\/([^"'\s<>)]+)/g, (_match, filename) => {
    return assetUrlMap.get(filename) || `/assets/${filename}`;
  });
}
