import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { ApiMetric } from '../types';

interface ApiStore {
  metrics: ApiMetric[];
  addMetric: (metric: Omit<ApiMetric, 'id' | 'timestamp'>) => void;
  clearMetrics: () => void;
}

export const useApiStore = create<ApiStore>((set) => ({
  metrics: [],
  addMetric: (metric) => {
    set((state) => ({
      metrics: [
        {
          id: uuidv4(),
          timestamp: new Date(),
          ...metric
        },
        ...state.metrics
      ].slice(0, 1000)
    }));
  },
  clearMetrics: () => set({ metrics: [] })
}));
