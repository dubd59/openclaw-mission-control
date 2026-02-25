import { useMemo } from 'react';
import { useApiStore } from '../store/apiStore';

export const useApiMetrics = () => {
  const { metrics } = useApiStore();

  const totalCost = useMemo(() => metrics.reduce((sum, metric) => sum + metric.cost, 0), [metrics]);
  const totalTokens = useMemo(() => metrics.reduce((sum, metric) => sum + metric.tokens, 0), [metrics]);

  return { metrics, totalCost, totalTokens };
};
