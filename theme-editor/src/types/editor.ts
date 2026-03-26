import type { SectionSchema } from './schema';

export type ThemeFileType = 'section' | 'snippet' | 'template' | 'layout' | 'config' | 'asset' | 'locale';

export interface ThemeFile {
  path: string;
  content: string;
  type: ThemeFileType;
  schema?: SectionSchema;
}

export interface TemplateSection {
  type: string;
  settings: Record<string, unknown>;
  blocks?: Record<string, TemplateBlock>;
  block_order?: string[];
  disabled?: boolean;
}

export interface TemplateBlock {
  type: string;
  settings: Record<string, unknown>;
}

export interface TemplateJSON {
  sections: Record<string, TemplateSection>;
  order: string[];
}

export type ChangeType =
  | 'setting'
  | 'block_setting'
  | 'section_order'
  | 'block_order'
  | 'add_section'
  | 'remove_section'
  | 'add_block'
  | 'remove_block'
  | 'asset_replace'
  | 'global_setting';

export interface Change {
  id: string;
  type: ChangeType;
  timestamp: number;
  templatePath: string;
  sectionId: string;
  blockId?: string;
  settingId?: string;
  oldValue: unknown;
  newValue: unknown;
}

export type DevicePreview = 'desktop' | 'tablet' | 'mobile';

export interface EditorSelection {
  sectionId: string | null;
  blockId: string | null;
  settingId: string | null;
}

// For the asset store
export interface EditorAsset {
  blob: Blob;
  objectUrl: string;
  filename: string;
  originalPath?: string;
}
