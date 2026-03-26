import { useEffect, useRef, useState, useCallback } from 'react';
import { Liquid } from 'liquidjs';
import { createEngine, renderTemplate } from '@/lib/liquid-engine';
import { useEditorStore } from '@/stores/editorStore';
import { useChangeStore } from '@/stores/changeStore';
import { useAssetStore } from '@/stores/assetStore';
import { createMockGlobals } from '@/lib/mock-data';
import type { DevicePreview } from '@/types/editor';
import { Loader2 } from 'lucide-react';

const DEVICE_WIDTHS: Record<DevicePreview, number> = {
  desktop: 1280,
  tablet: 768,
  mobile: 375,
};

export function PreviewFrame() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [html, setHtml] = useState('');
  const [isRendering, setIsRendering] = useState(false);
  const [iframeHeight, setIframeHeight] = useState(2000);
  const [scale, setScale] = useState(1);
  const engineRef = useRef<Liquid | null>(null);

  const { themeFiles, activeTemplatePath, activeTemplateJSON, devicePreview, selectSection } = useEditorStore();
  const { applyChanges } = useChangeStore();
  const { assetUrlMap } = useAssetStore();
  const changes = useChangeStore(s => s.changes);

  const width = DEVICE_WIDTHS[devicePreview];

  // Compute scale to fit container
  useEffect(() => {
    function computeScale() {
      if (!containerRef.current) return;
      const available = containerRef.current.clientWidth - 32; // 16px padding each side
      if (available < width) {
        setScale(available / width);
      } else {
        setScale(1);
      }
    }
    computeScale();
    const observer = new ResizeObserver(computeScale);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [width]);

  // Render the template when dependencies change
  const doRender = useCallback(async () => {
    if (!activeTemplateJSON || themeFiles.size === 0) return;

    setIsRendering(true);
    try {
      if (!engineRef.current) {
        engineRef.current = createEngine(themeFiles);
      }

      const modifiedTemplate = applyChanges(activeTemplatePath, activeTemplateJSON);

      const settingsFile = themeFiles.get('config/settings_data.json');
      let globalSettings: Record<string, unknown> = {};
      if (settingsFile) {
        try {
          const data = JSON.parse(settingsFile.content);
          globalSettings = data.current || {};
        } catch { /* skip */ }
      }

      const globals = createMockGlobals(globalSettings);
      const rendered = await renderTemplate(
        engineRef.current,
        modifiedTemplate,
        themeFiles,
        globals,
        assetUrlMap,
      );

      setHtml(rendered);
    } catch (err) {
      console.error('Render error:', err);
      setHtml(`<html><body style="color:red;padding:2rem;font-family:sans-serif"><h2>Render Error</h2><pre>${err}</pre></body></html>`);
    } finally {
      setIsRendering(false);
    }
  }, [activeTemplateJSON, activeTemplatePath, themeFiles, assetUrlMap, applyChanges, changes]);

  useEffect(() => {
    doRender();
  }, [doRender]);

  // Auto-resize iframe to content height
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    function resizeIframe() {
      try {
        const doc = iframe!.contentDocument;
        if (doc?.body) {
          const height = doc.body.scrollHeight;
          if (height > 100) setIframeHeight(height + 50);
        }
      } catch { /* cross-origin safety */ }
    }

    iframe.addEventListener('load', resizeIframe);
    const interval = setInterval(resizeIframe, 1500);
    return () => {
      iframe.removeEventListener('load', resizeIframe);
      clearInterval(interval);
    };
  }, [html]);

  // Listen for messages from iframe
  useEffect(() => {
    function handleMessage(e: MessageEvent) {
      if (e.data?.type === 'section-click') {
        selectSection(e.data.sectionId);
      }
    }
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [selectSection]);

  const scaledHeight = iframeHeight * scale;

  return (
    <div ref={containerRef} className="flex-1 bg-editor-bg flex items-start justify-center overflow-auto p-4 relative">
      {isRendering && (
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-editor-surface px-3 py-1.5 rounded-full border border-editor-border text-sm text-editor-text-muted">
          <Loader2 size={14} className="animate-spin" />
          Rendering...
        </div>
      )}
      <div
        style={{
          width: width * scale,
          height: scaledHeight,
          overflow: 'hidden',
        }}
      >
        <div
          className="bg-white shadow-2xl"
          style={{
            width,
            height: iframeHeight,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
          }}
        >
          <iframe
            ref={iframeRef}
            srcDoc={html}
            className="w-full border-0"
            style={{ width, height: iframeHeight }}
            title="Theme Preview"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      </div>
    </div>
  );
}
