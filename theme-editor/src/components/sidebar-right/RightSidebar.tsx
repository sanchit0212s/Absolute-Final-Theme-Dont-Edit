import { useMemo } from 'react';
import { Settings, ChevronRight } from 'lucide-react';
import { useEditorStore } from '@/stores/editorStore';
import { useChangeStore } from '@/stores/changeStore';
import { useHistoryStore } from '@/stores/historyStore';
import { SettingField } from './SettingField';
import type { SectionSchema, SchemaSetting } from '@/types/schema';

export function RightSidebar() {
  const { themeFiles, activeTemplatePath, activeTemplateJSON, selectedSectionId } = useEditorStore();
  const { getEffectiveValue, addChange } = useChangeStore();
  const { pushChange } = useHistoryStore();

  const sectionInfo = useMemo(() => {
    if (!selectedSectionId || !activeTemplateJSON) return null;
    const config = activeTemplateJSON.sections[selectedSectionId];
    if (!config) return null;
    const file = themeFiles.get(`sections/${config.type}.liquid`);
    return {
      config,
      schema: file?.schema,
      name: file?.schema?.name || config.type.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
    };
  }, [selectedSectionId, activeTemplateJSON, themeFiles]);

  function handleSettingChange(settingId: string, setting: SchemaSetting, newValue: unknown) {
    if (!selectedSectionId) return;
    const oldValue = getEffectiveValue(
      activeTemplatePath,
      selectedSectionId,
      settingId,
      setting.default,
    );
    const change = {
      type: 'setting' as const,
      templatePath: activeTemplatePath,
      sectionId: selectedSectionId,
      settingId,
      oldValue,
      newValue,
    };
    addChange(change);
    pushChange({ ...change, id: `h-${Date.now()}`, timestamp: Date.now() });
  }

  return (
    <div className="w-72 bg-editor-surface border-l border-editor-border flex flex-col h-full overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-editor-border">
        <Settings size={16} className="text-editor-accent" />
        <span className="text-sm font-semibold">Properties</span>
      </div>

      <div className="flex-1 overflow-y-auto">
        {!sectionInfo ? (
          <div className="p-4 text-sm text-editor-text-muted text-center">
            <p className="mb-2">Select a section to edit its properties</p>
            <p className="text-xs">Click a section in the preview or the layers panel</p>
          </div>
        ) : (
          <div className="p-3 flex flex-col gap-3">
            {/* Section name header */}
            <div className="flex items-center gap-1 text-editor-accent text-sm font-medium">
              <ChevronRight size={14} />
              {sectionInfo.name}
            </div>

            {/* Settings */}
            {sectionInfo.schema?.settings.map(setting => (
              <SettingField
                key={setting.id}
                setting={setting}
                value={getEffectiveValue(
                  activeTemplatePath,
                  selectedSectionId!,
                  setting.id,
                  setting.default,
                )}
                onChange={val => handleSettingChange(setting.id, setting, val)}
              />
            ))}

            {/* Blocks */}
            {sectionInfo.schema?.blocks && sectionInfo.schema.blocks.length > 0 && (
              <div className="mt-2 pt-3 border-t border-editor-border">
                <span className="text-xs font-semibold text-editor-text-muted uppercase tracking-wider">
                  Blocks
                </span>
                <div className="mt-2 text-xs text-editor-text-muted">
                  {sectionInfo.schema.blocks.map(b => (
                    <div key={b.type} className="py-1 px-2 rounded bg-editor-surface-2 mb-1">
                      {b.name} <span className="text-editor-text-muted/50">({b.type})</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!sectionInfo.schema?.settings.length && (
              <p className="text-xs text-editor-text-muted">No editable settings for this section.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
