export interface Skill {
  id: string;
  name: string;
  description: string;
  category: SkillCategory;
  author: string;
  version: string;
  installed: boolean;
  enabled: boolean;
  installPath: string;
  dependencies: string[];
  configSchema?: Record<string, unknown>;
  envVars?: string[];
  lastUpdated: Date;
  repository: string;
  stars?: number;
}

export type SkillCategory =
  | 'search'
  | 'automation'
  | 'browser'
  | 'communication'
  | 'content'
  | 'development'
  | 'data'
  | 'system'
  | 'social'
  | 'custom';

export interface SkillMarketplaceListing {
  id: string;
  name: string;
  description: string;
  category: SkillCategory;
  author: string;
  version: string;
  downloads: number;
  rating: number;
  repository: string;
  installCommand: string;
}

export interface SkillExecution {
  id: string;
  skillId: string;
  agentId?: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  startedAt: Date;
  completedAt?: Date;
  input: unknown;
  output?: unknown;
  error?: string;
  creditsUsed: number;
}
