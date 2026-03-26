import { get as idbGet, set as idbSet, del as idbDel } from 'idb-keyval';
import type { Change } from '@/types/editor';

const CHANGES_KEY = 'theme-editor-changes';
const TIMESTAMP_KEY = 'theme-editor-saved-at';

export async function saveChanges(changes: Change[]): Promise<void> {
  await idbSet(CHANGES_KEY, changes);
  await idbSet(TIMESTAMP_KEY, Date.now());
}

export async function loadChanges(): Promise<Change[]> {
  const changes = await idbGet<Change[]>(CHANGES_KEY);
  return changes || [];
}

export async function getSavedTimestamp(): Promise<number | null> {
  return (await idbGet<number>(TIMESTAMP_KEY)) ?? null;
}

export async function clearSavedChanges(): Promise<void> {
  await idbDel(CHANGES_KEY);
  await idbDel(TIMESTAMP_KEY);
}
