export type SettingType =
  | 'text' | 'textarea' | 'richtext'
  | 'image_picker' | 'video_url'
  | 'url' | 'color' | 'range'
  | 'checkbox' | 'select'
  | 'font_picker' | 'link_list'
  | 'collection' | 'product'
  | 'number' | 'header' | 'paragraph';

export interface SchemaSetting {
  type: SettingType;
  id: string;
  label: string;
  default?: unknown;
  info?: string;
  placeholder?: string;
  // For range
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  // For select
  options?: Array<{ value: string; label: string }>;
}

export interface BlockDefinition {
  type: string;
  name: string;
  limit?: number;
  settings: SchemaSetting[];
}

export interface SchemaPreset {
  name: string;
  settings?: Record<string, unknown>;
  blocks?: Array<{ type: string; settings?: Record<string, unknown> }>;
}

export interface SectionSchema {
  name: string;
  class?: string;
  tag?: string;
  max_blocks?: number;
  settings: SchemaSetting[];
  blocks?: BlockDefinition[];
  presets?: SchemaPreset[];
}
