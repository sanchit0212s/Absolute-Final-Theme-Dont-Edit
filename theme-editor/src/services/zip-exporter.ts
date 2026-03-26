import JSZip from 'jszip';
import type { ThemeFile, TemplateJSON } from '@/types/editor';
import type { EditorAsset } from '@/types/editor';

export async function exportThemeZip(
  themeFiles: Map<string, ThemeFile>,
  modifiedTemplates: Map<string, TemplateJSON>,
  modifiedGlobalSettings: Record<string, unknown> | null,
  newAssets: Map<string, EditorAsset>,
): Promise<Blob> {
  const zip = new JSZip();

  for (const [path, file] of themeFiles) {
    let content = file.content;

    // Apply template modifications
    if (file.type === 'template' && modifiedTemplates.has(path)) {
      content = JSON.stringify(modifiedTemplates.get(path), null, 2);
    }

    // Apply global settings modifications
    if (path === 'config/settings_data.json' && modifiedGlobalSettings) {
      try {
        const data = JSON.parse(content);
        data.current = { ...data.current, ...modifiedGlobalSettings };
        content = JSON.stringify(data, null, 2);
      } catch { /* use original */ }
    }

    zip.file(path, content);
  }

  // Add new/replaced assets
  for (const [filename, asset] of newAssets) {
    zip.file(`assets/${filename}`, asset.blob);
  }

  return zip.generateAsync({ type: 'blob' });
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
