import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { Agent, Activity, ApiKey, CreditLimit } from '../types';

interface AgentStore {
  agents: Agent[];
  activities: Activity[];
  apiKeys: ApiKey[];
  creditLimits: CreditLimit[];

  addAgent: (agent: Omit<Agent, 'id' | 'createdAt' | 'lastActive'>) => void;
  updateAgent: (id: string, updates: Partial<Agent>) => void;
  deleteAgent: (id: string) => void;
  addActivity: (activity: Omit<Activity, 'id' | 'timestamp'>) => void;
  addApiKey: (apiKey: Omit<ApiKey, 'id' | 'lastUsed'>) => void;
  updateApiKey: (id: string, updates: Partial<ApiKey>) => void;
  deleteApiKey: (id: string) => void;
  addCreditLimit: (limit: Omit<CreditLimit, 'id'>) => void;
  updateCreditUsage: (apiKeyId: string, cost: number, agentId?: string) => void;
}

export const useAgentStore = create<AgentStore>()(
  persist(
    (set) => ({
      agents: [],
      activities: [],
      apiKeys: [],
      creditLimits: [],

      addAgent: (agent) => {
        const newAgent: Agent = {
          ...agent,
          id: uuidv4(),
          createdAt: new Date(),
          lastActive: new Date(),
          creditsUsed: 0
        };

        set((state) => ({
          agents: [...state.agents, newAgent],
          activities: [
            {
              id: uuidv4(),
              type: 'agent_start',
              message: `Agent "${agent.name}" created`,
              timestamp: new Date(),
              agentId: newAgent.id
            },
            ...state.activities
          ]
        }));
      },

      updateAgent: (id, updates) => {
        set((state) => ({
          agents: state.agents.map((agent) =>
            agent.id === id ? { ...agent, ...updates, lastActive: new Date() } : agent
          )
        }));
      },

      deleteAgent: (id) => {
        set((state) => ({
          agents: state.agents.filter((agent) => agent.id !== id),
          activities: [
            {
              id: uuidv4(),
              type: 'agent_complete',
              message: 'Agent removed from system',
              timestamp: new Date(),
              agentId: id
            },
            ...state.activities
          ]
        }));
      },

      addActivity: (activity) => {
        set((state) => ({
          activities: [
            {
              id: uuidv4(),
              timestamp: new Date(),
              ...activity
            },
            ...state.activities
          ]
        }));
      },

      addApiKey: (apiKey) => {
        set((state) => ({
          apiKeys: [
            ...state.apiKeys,
            {
              id: uuidv4(),
              lastUsed: new Date(),
              ...apiKey
            }
          ]
        }));
      },

      updateApiKey: (id, updates) => {
        set((state) => ({
          apiKeys: state.apiKeys.map((key) => (key.id === id ? { ...key, ...updates } : key))
        }));
      },

      deleteApiKey: (id) => {
        set((state) => ({
          apiKeys: state.apiKeys.filter((key) => key.id !== id)
        }));
      },

      addCreditLimit: (limit) => {
        set((state) => ({
          creditLimits: [...state.creditLimits, { id: uuidv4(), ...limit }]
        }));
      },

      updateCreditUsage: (apiKeyId, cost, agentId) => {
        set((state) => {
          const warningActivities: Activity[] = [];

          const updatedKeys = state.apiKeys.map((key) => {
            if (key.id === apiKeyId) {
              const newUsed = key.used + cost;
              const status: ApiKey['status'] = newUsed >= key.monthlyLimit ? 'exceeded' : 'active';

              if (newUsed >= key.monthlyLimit * 0.8 && key.used < key.monthlyLimit * 0.8) {
                warningActivities.push({
                  id: uuidv4(),
                  type: 'credit_warning',
                  message: `API key "${key.name}" has used ${Math.round((newUsed / key.monthlyLimit) * 100)}% of monthly limit`,
                  timestamp: new Date(),
                  agentId,
                  metadata: { apiKeyId, usage: newUsed, limit: key.monthlyLimit }
                });
              }

              return {
                ...key,
                used: newUsed,
                status,
                lastUsed: new Date()
              };
            }
            return key;
          });

          const updatedAgents = agentId
            ? state.agents.map((agent) =>
                agent.id === agentId ? { ...agent, creditsUsed: agent.creditsUsed + cost } : agent
              )
            : state.agents;

          return {
            apiKeys: updatedKeys,
            agents: updatedAgents,
            activities: [...warningActivities, ...state.activities]
          };
        });
      }
    }),
    {
      name: 'openclaw-storage'
    }
  )
);
