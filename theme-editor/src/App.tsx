import { useEffect, useCallback, useState } from 'react';
import { TopBar } from '@/components/layout/TopBar';
import { LeftSidebar } from '@/components/sidebar-left/LeftSidebar';
import { RightSidebar } from '@/components/sidebar-right/RightSidebar';
import { PreviewFrame } from '@/components/preview/PreviewFrame';
import { useEditorStore } from '@/stores/editorStore';
import { useChangeStore } from '@/stores/changeStore';
import { useAssetStore } from '@/stores/assetStore';
import { loadTheme, getAssetUrlMap } from '@/lib/theme-loader';
import { exportThemeZip, downloadBlob } from '@/services/zip-exporter';
import { saveChanges, loadChanges } from '@/services/persistence';
import { Loader2, CheckCircle } from 'lucide-react';
import type { TemplateJSON } from '@/types/editor';

export default function App() {
  const { isLoaded, setThemeFiles, isPreviewOnly, isSidebarLeftOpen, isSidebarRightOpen } = useEditorStore();
  const changes = useChangeStore(s => s.changes);
  const applyChanges = useChangeStore(s => s.applyChanges);
  const { initializeAssetUrls, getAllAssets } = useAssetStore();
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  // Load theme on mount
  useEffect(() => {
    const files = loadTheme();
    setThemeFiles(files);

    const assetUrls = getAssetUrlMap();
    initializeAssetUrls(assetUrls);

    // Load persisted changes
    loadChanges().then(saved => {
      if (saved.length > 0) {
        const store = useChangeStore.getState();
        for (const c of saved) store.addChange(c);
      }
    });
  }, [setThemeFiles, initializeAssetUrls]);

  const handleSave = useCallback(async () => {
    setSaveStatus('saving');
    await saveChanges(changes);
    setSaveStatus('saved');
    setTimeout(() => setSaveStatus('idle'), 2000);
  }, [changes]);

  const handleCompile = useCallback(async () => {
    const { themeFiles } = useEditorStore.getState();

    // Build modified templates map
    const modifiedTemplates = new Map<string, TemplateJSON>();
    for (const [path, file] of themeFiles) {
      if (file.type === 'template') {
        try {
          const original = JSON.parse(file.content) as TemplateJSON;
          const modified = applyChanges(path, original);
          modifiedTemplates.set(path, modified);
        } catch { /* skip */ }
      }
    }

    const blob = await exportThemeZip(themeFiles, modifiedTemplates, null, getAllAssets());
    downloadBlob(blob, 'theme-kala-shopify.zip');
  }, [applyChanges, getAllAssets]);

  if (!isLoaded) {
    return (
      <div className="h-screen flex items-center justify-center bg-editor-bg">
        <div className="flex items-center gap-3 text-editor-text-muted">
          <Loader2 size={24} className="animate-spin" />
          <span>Loading theme...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-editor-bg">
      <TopBar onSave={handleSave} onCompile={handleCompile} />

      <div className="flex-1 flex overflow-hidden relative">
        {!isPreviewOnly && isSidebarLeftOpen && <LeftSidebar />}
        <PreviewFrame />
        {!isPreviewOnly && isSidebarRightOpen && <RightSidebar />}
      </div>

      {/* Save toast */}
      {saveStatus !== 'idle' && (
        <div className="fixed bottom-4 right-4 flex items-center gap-2 bg-editor-surface border border-editor-border rounded-lg px-4 py-2.5 shadow-lg text-sm">
          {saveStatus === 'saving' ? (
            <><Loader2 size={14} className="animate-spin text-editor-accent" /> Saving...</>
          ) : (
            <><CheckCircle size={14} className="text-editor-success" /> Changes saved</>
          )}
        </div>
      )}
    </div>
  );
}
