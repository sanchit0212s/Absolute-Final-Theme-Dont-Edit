import { create } from 'zustand';
import type { Change, ChangeType, TemplateJSON } from '@/types/editor';

let changeCounter = 0;

interface ChangeState {
  changes: Change[];
  addChange: (change: Omit<Change, 'id' | 'timestamp'>) => void;
  getEffectiveValue: (templatePath: string, sectionId: string, settingId: string, defaultValue: unknown) => unknown;
  getEffectiveBlockValue: (templatePath: string, sectionId: string, blockId: string, settingId: string, defaultValue: unknown) => unknown;
  getEffectiveSectionOrder: (templatePath: string, originalOrder: string[]) => string[];
  applyChanges: (templatePath: string, original: TemplateJSON) => TemplateJSON;
  clearChanges: () => void;
  hasChanges: () => boolean;
}

export const useChangeStore = create<ChangeState>((set, get) => ({
  changes: [],

  addChange: (partial) => {
    const change: Change = {
      ...partial,
      id: `change-${++changeCounter}`,
      timestamp: Date.now(),
    };
    set(s => ({ changes: [...s.changes, change] }));
  },

  getEffectiveValue: (templatePath, sectionId, settingId, defaultValue) => {
    const { changes } = get();
    let value = defaultValue;
    for (const c of changes) {
      if (c.templatePath === templatePath && c.sectionId === sectionId && c.settingId === settingId && c.type === 'setting') {
        value = c.newValue;
      }
    }
    return value;
  },

  getEffectiveBlockValue: (templatePath, sectionId, blockId, settingId, defaultValue) => {
    const { changes } = get();
    let value = defaultValue;
    for (const c of changes) {
      if (c.templatePath === templatePath && c.sectionId === sectionId && c.blockId === blockId && c.settingId === settingId && c.type === 'block_setting') {
        value = c.newValue;
      }
    }
    return value;
  },

  getEffectiveSectionOrder: (templatePath, originalOrder) => {
    const { changes } = get();
    let order = originalOrder;
    for (const c of changes) {
      if (c.templatePath === templatePath && c.type === 'section_order') {
        order = c.newValue as string[];
      }
    }
    return order;
  },

  applyChanges: (templatePath, original) => {
    const { changes } = get();
    const relevant = changes.filter(c => c.templatePath === templatePath);
    if (relevant.length === 0) return original;

    // Deep clone
    const result: TemplateJSON = JSON.parse(JSON.stringify(original));

    for (const c of relevant) {
      switch (c.type as ChangeType) {
        case 'setting': {
          if (result.sections[c.sectionId] && c.settingId) {
            result.sections[c.sectionId].settings[c.settingId] = c.newValue;
          }
          break;
        }
        case 'block_setting': {
          const section = result.sections[c.sectionId];
          if (section?.blocks && c.blockId && c.settingId) {
            if (!section.blocks[c.blockId]) {
              section.blocks[c.blockId] = { type: '', settings: {} };
            }
            section.blocks[c.blockId].settings[c.settingId] = c.newValue;
          }
          break;
        }
        case 'section_order': {
          result.order = c.newValue as string[];
          break;
        }
        case 'add_section': {
          const newSection = c.newValue as { type: string; settings: Record<string, unknown> };
          result.sections[c.sectionId] = { ...newSection };
          if (!result.order.includes(c.sectionId)) {
            result.order.push(c.sectionId);
          }
          break;
        }
        case 'remove_section': {
          delete result.sections[c.sectionId];
          result.order = result.order.filter(id => id !== c.sectionId);
          break;
        }
      }
    }

    return result;
  },

  clearChanges: () => set({ changes: [] }),
  hasChanges: () => get().changes.length > 0,
}));
