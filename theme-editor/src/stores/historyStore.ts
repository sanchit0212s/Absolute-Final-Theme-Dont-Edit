import { create } from 'zustand';
import type { Change } from '@/types/editor';

const MAX_UNDO = 100;

interface HistoryState {
  undoStack: Change[];
  redoStack: Change[];
  pushChange: (change: Change) => void;
  undo: () => Change | undefined;
  redo: () => Change | undefined;
  canUndo: () => boolean;
  canRedo: () => boolean;
  clear: () => void;
}

export const useHistoryStore = create<HistoryState>((set, get) => ({
  undoStack: [],
  redoStack: [],

  pushChange: (change) => {
    set(s => ({
      undoStack: [...s.undoStack.slice(-MAX_UNDO + 1), change],
      redoStack: [], // clear redo on new change
    }));
  },

  undo: () => {
    const { undoStack } = get();
    if (undoStack.length === 0) return undefined;
    const change = undoStack[undoStack.length - 1];
    set(s => ({
      undoStack: s.undoStack.slice(0, -1),
      redoStack: [...s.redoStack, change],
    }));
    return change;
  },

  redo: () => {
    const { redoStack } = get();
    if (redoStack.length === 0) return undefined;
    const change = redoStack[redoStack.length - 1];
    set(s => ({
      redoStack: s.redoStack.slice(0, -1),
      undoStack: [...s.undoStack, change],
    }));
    return change;
  },

  canUndo: () => get().undoStack.length > 0,
  canRedo: () => get().redoStack.length > 0,
  clear: () => set({ undoStack: [], redoStack: [] }),
}));
