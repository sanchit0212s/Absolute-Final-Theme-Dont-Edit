import {
  Monitor, Tablet, Smartphone, Undo2, Redo2, Save, Download,
  PanelLeftClose, PanelRightClose, Eye, ChevronDown,
} from 'lucide-react';
import { useEditorStore } from '@/stores/editorStore';
import { useHistoryStore } from '@/stores/historyStore';
import { useChangeStore } from '@/stores/changeStore';
import { getTemplateList } from '@/lib/theme-loader';
import type { DevicePreview } from '@/types/editor';

const devices: { id: DevicePreview; icon: typeof Monitor; label: string }[] = [
  { id: 'desktop', icon: Monitor, label: 'Desktop' },
  { id: 'tablet', icon: Tablet, label: 'Tablet' },
  { id: 'mobile', icon: Smartphone, label: 'Mobile' },
];

const templateLabels: Record<string, string> = {
  'templates/index.json': 'Home',
  'templates/collection.json': 'Collection',
  'templates/product.json': 'Product',
  'templates/page.about.json': 'About',
  'templates/page.contact.json': 'Contact',
  'templates/page.guide.json': 'Guide',
  'templates/cart.json': 'Cart',
  'templates/404.json': '404',
};

export function TopBar({ onSave, onCompile }: { onSave: () => void; onCompile: () => void }) {
  const {
    themeFiles, activeTemplatePath, devicePreview,
    setActiveTemplate, setDevicePreview, togglePreviewOnly,
    toggleSidebarLeft, toggleSidebarRight,
  } = useEditorStore();
  const { canUndo, canRedo, undo, redo } = useHistoryStore();
  const { hasChanges } = useChangeStore();
  const templates = getTemplateList(themeFiles);

  return (
    <div className="h-12 bg-editor-surface border-b border-editor-border flex items-center px-3 gap-2 shrink-0">
      {/* Left: sidebar toggles */}
      <button onClick={toggleSidebarLeft} className="p-1.5 rounded hover:bg-editor-surface-2 text-editor-text-muted hover:text-editor-text" title="Toggle left panel">
        <PanelLeftClose size={16} />
      </button>

      <div className="w-px h-6 bg-editor-border" />

      {/* Template picker */}
      <div className="relative">
        <select
          value={activeTemplatePath}
          onChange={e => setActiveTemplate(e.target.value)}
          className="appearance-none bg-editor-surface-2 text-editor-text text-sm px-3 py-1.5 pr-7 rounded border border-editor-border hover:border-editor-border-hover cursor-pointer"
        >
          {templates.map(t => (
            <option key={t} value={t}>{templateLabels[t] || t}</option>
          ))}
        </select>
        <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-editor-text-muted pointer-events-none" />
      </div>

      {/* Center: device preview */}
      <div className="flex-1 flex items-center justify-center gap-1">
        {devices.map(d => (
          <button
            key={d.id}
            onClick={() => setDevicePreview(d.id)}
            className={`p-1.5 rounded transition-colors ${
              devicePreview === d.id
                ? 'bg-editor-accent text-white'
                : 'text-editor-text-muted hover:text-editor-text hover:bg-editor-surface-2'
            }`}
            title={d.label}
          >
            <d.icon size={16} />
          </button>
        ))}

        <div className="w-px h-6 bg-editor-border mx-2" />

        {/* Undo / Redo */}
        <button
          onClick={() => undo()}
          disabled={!canUndo()}
          className="p-1.5 rounded text-editor-text-muted hover:text-editor-text hover:bg-editor-surface-2 disabled:opacity-30 disabled:cursor-not-allowed"
          title="Undo"
        >
          <Undo2 size={16} />
        </button>
        <button
          onClick={() => redo()}
          disabled={!canRedo()}
          className="p-1.5 rounded text-editor-text-muted hover:text-editor-text hover:bg-editor-surface-2 disabled:opacity-30 disabled:cursor-not-allowed"
          title="Redo"
        >
          <Redo2 size={16} />
        </button>

        <div className="w-px h-6 bg-editor-border mx-2" />

        <button onClick={togglePreviewOnly} className="p-1.5 rounded text-editor-text-muted hover:text-editor-text hover:bg-editor-surface-2" title="Preview mode">
          <Eye size={16} />
        </button>
      </div>

      {/* Right: save / compile */}
      <button
        onClick={onSave}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium transition-colors ${
          hasChanges()
            ? 'bg-editor-accent text-white hover:bg-editor-accent-hover'
            : 'bg-editor-surface-2 text-editor-text-muted border border-editor-border'
        }`}
      >
        <Save size={14} />
        Save
      </button>

      <button
        onClick={onCompile}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium bg-editor-success text-white hover:brightness-110 transition"
      >
        <Download size={14} />
        Export .zip
      </button>

      <div className="w-px h-6 bg-editor-border" />

      <button onClick={toggleSidebarRight} className="p-1.5 rounded hover:bg-editor-surface-2 text-editor-text-muted hover:text-editor-text" title="Toggle right panel">
        <PanelRightClose size={16} />
      </button>
    </div>
  );
}
