import { create } from 'zustand';
import type { ThemeFile, DevicePreview, TemplateJSON } from '@/types/editor';

interface EditorState {
  themeFiles: Map<string, ThemeFile>;
  isLoaded: boolean;
  activeTemplatePath: string;
  activeTemplateJSON: TemplateJSON | null;
  selectedSectionId: string | null;
  selectedBlockId: string | null;
  devicePreview: DevicePreview;
  isPreviewOnly: boolean;
  isSidebarLeftOpen: boolean;
  isSidebarRightOpen: boolean;

  setThemeFiles: (files: Map<string, ThemeFile>) => void;
  setActiveTemplate: (path: string) => void;
  selectSection: (id: string | null) => void;
  selectBlock: (id: string | null) => void;
  setDevicePreview: (device: DevicePreview) => void;
  togglePreviewOnly: () => void;
  toggleSidebarLeft: () => void;
  toggleSidebarRight: () => void;
}

export const useEditorStore = create<EditorState>((set, get) => ({
  themeFiles: new Map(),
  isLoaded: false,
  activeTemplatePath: 'templates/index.json',
  activeTemplateJSON: null,
  selectedSectionId: null,
  selectedBlockId: null,
  devicePreview: 'desktop',
  isPreviewOnly: false,
  isSidebarLeftOpen: true,
  isSidebarRightOpen: true,

  setThemeFiles: (files) => {
    set({ themeFiles: files, isLoaded: true });
    // Auto-load index template
    const path = get().activeTemplatePath;
    const templateFile = files.get(path);
    if (templateFile) {
      try {
        const json = JSON.parse(templateFile.content) as TemplateJSON;
        set({ activeTemplateJSON: json });
      } catch { /* skip */ }
    }
  },

  setActiveTemplate: (path) => {
    const file = get().themeFiles.get(path);
    if (!file) return;
    try {
      const json = JSON.parse(file.content) as TemplateJSON;
      set({
        activeTemplatePath: path,
        activeTemplateJSON: json,
        selectedSectionId: null,
        selectedBlockId: null,
      });
    } catch { /* skip */ }
  },

  selectSection: (id) => set({ selectedSectionId: id, selectedBlockId: null }),
  selectBlock: (id) => set({ selectedBlockId: id }),
  setDevicePreview: (device) => set({ devicePreview: device }),
  togglePreviewOnly: () => set(s => ({ isPreviewOnly: !s.isPreviewOnly })),
  toggleSidebarLeft: () => set(s => ({ isSidebarLeftOpen: !s.isSidebarLeftOpen })),
  toggleSidebarRight: () => set(s => ({ isSidebarRightOpen: !s.isSidebarRightOpen })),
}));
