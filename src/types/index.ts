export interface Agent {
  id: string;
  name: string;
  status: 'idle' | 'running' | 'completed' | 'failed';
  type: 'research' | 'analysis' | 'generation' | 'monitoring' | 'custom';
  progress: number;
  createdAt: Date;
  lastActive: Date;
  apiKeys: string[];
  creditLimit: number;
  creditsUsed: number;
  config: AgentConfig;
}

export interface AgentConfig {
  model: string;
  temperature: number;
  maxTokens: number;
  instructions: string;
  tools: string[];
}

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  provider:
    | 'openai'
    | 'anthropic'
    | 'google'
    | 'azure'
    | 'aws'
    | 'huggingface'
    | 'microsoft'
    | 'custom';
  monthlyLimit: number;
  used: number;
  status: 'active' | 'inactive' | 'exceeded';
  lastUsed: Date;
}

export interface ApiMetric {
  id: string;
  apiKeyId: string;
  timestamp: Date;
  cost: number;
  tokens: number;
  agentId?: string;
}

export interface CreditLimit {
  id: string;
  agentId?: string;
  apiKeyId?: string;
  limit: number;
  period: 'daily' | 'weekly' | 'monthly';
  notificationThreshold: number;
}

export interface Activity {
  id: string;
  type: 'agent_start' | 'agent_complete' | 'api_call' | 'credit_warning' | 'error';
  message: string;
  timestamp: Date;
  agentId?: string;
  metadata?: unknown;
}
