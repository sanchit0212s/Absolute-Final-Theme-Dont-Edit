import { SectionList } from './SectionList';
import { getTemplateList } from '@/lib/theme-loader';
import { useEditorStore } from '@/stores/editorStore';
import { Layers } from 'lucide-react';

export function LeftSidebar() {
  return (
    <div className="w-64 bg-editor-surface border-r border-editor-border flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-editor-border">
        <Layers size={16} className="text-editor-accent" />
        <span className="text-sm font-semibold">Layers</span>
      </div>

      {/* Section list */}
      <div className="flex-1 overflow-y-auto">
        <SectionList />
      </div>
    </div>
  );
}
