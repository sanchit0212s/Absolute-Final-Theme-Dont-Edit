import type { SectionSchema } from '@/types/schema';

const SCHEMA_REGEX = /\{%-?\s*schema\s*-?%\}([\s\S]*?)\{%-?\s*endschema\s*-?%\}/;

export function parseSchema(liquidContent: string): SectionSchema | undefined {
  const match = liquidContent.match(SCHEMA_REGEX);
  if (!match?.[1]) return undefined;

  try {
    return JSON.parse(match[1].trim()) as SectionSchema;
  } catch {
    console.warn('Failed to parse schema JSON');
    return undefined;
  }
}

export function stripSchema(liquidContent: string): string {
  return liquidContent.replace(SCHEMA_REGEX, '').trim();
}
