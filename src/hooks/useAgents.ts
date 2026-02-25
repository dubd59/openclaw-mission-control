import { useMemo } from 'react';
import { useAgentStore } from '../store/agentStore';

export const useAgents = () => {
  const { agents } = useAgentStore();

  const running = useMemo(() => agents.filter((agent) => agent.status === 'running'), [agents]);
  const completed = useMemo(() => agents.filter((agent) => agent.status === 'completed'), [agents]);
  const failed = useMemo(() => agents.filter((agent) => agent.status === 'failed'), [agents]);

  return { agents, running, completed, failed };
};
