import { create } from 'zustand';
import { FileType } from '../types';

interface ProjectState {
  files: FileType[];
  setFiles: (files: FileType[]) => void;
  steps: string[];
  setSteps: (steps: string[]) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  files: [],
  setFiles: (files) => set({ files }),
  steps: [],
  setSteps: (steps) => set({ steps }),
}));