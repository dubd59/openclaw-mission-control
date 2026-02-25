import { useAgentStore } from '../store/agentStore';
import { useApiStore } from '../store/apiStore';

export const recordApiUsage = (
  apiKeyId: string,
  cost: number,
  tokens: number,
  agentId?: string
) => {
  const { updateCreditUsage, addActivity } = useAgentStore.getState();
  const { addMetric } = useApiStore.getState();

  addMetric({ apiKeyId, cost, tokens, agentId });
  updateCreditUsage(apiKeyId, cost, agentId);

  addActivity({
    type: 'api_call',
    message: `API call recorded: $${cost.toFixed(2)} / ${tokens} tokens`,
    agentId,
    metadata: { apiKeyId, cost, tokens }
  });
};
