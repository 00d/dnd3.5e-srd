import { create } from 'zustand';
import type { ContentType, FileInfo } from '../types';

interface AppState {
  currentType: ContentType | null;
  currentId: string | null;
  currentData: any | null;
  sourceMarkdown: string;
  entries: FileInfo[];
  searchQuery: string;

  setCurrentType: (type: ContentType | null) => void;
  setCurrentId: (id: string | null) => void;
  setCurrentData: (data: any | null) => void;
  setSourceMarkdown: (markdown: string) => void;
  setEntries: (entries: FileInfo[]) => void;
  setSearchQuery: (query: string) => void;
  reset: () => void;
}

export const useStore = create<AppState>((set) => ({
  currentType: null,
  currentId: null,
  currentData: null,
  sourceMarkdown: '',
  entries: [],
  searchQuery: '',

  setCurrentType: (type) => set({ currentType: type, currentId: null, currentData: null }),
  setCurrentId: (id) => set({ currentId: id }),
  setCurrentData: (data) => set({ currentData: data }),
  setSourceMarkdown: (markdown) => set({ sourceMarkdown: markdown }),
  setEntries: (entries) => set({ entries }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  reset: () => set({
    currentType: null,
    currentId: null,
    currentData: null,
    sourceMarkdown: '',
  }),
}));
