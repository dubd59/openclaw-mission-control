import { AgentConfig } from '../types';

const presets: Record<string, Partial<AgentConfig>> = {
  research: {
    model: 'gpt-4',
    temperature: 0.3,
    maxTokens: 3000,
    instructions: 'Find reliable sources, summarize findings, and provide citations.',
    tools: ['web_search', 'retrieval']
  },
  analysis: {
    model: 'gpt-4',
    temperature: 0.2,
    maxTokens: 2500,
    instructions: 'Analyze supplied data and produce concise structured insights.',
    tools: ['code_interpreter', 'file_search']
  },
  generation: {
    model: 'gpt-4',
    temperature: 0.8,
    maxTokens: 2000,
    instructions: 'Create high-quality content aligned to requested tone and format.',
    tools: ['retrieval']
  }
};

export const generateAgentPreset = (type: string): AgentConfig => {
  const base: AgentConfig = {
    model: 'gpt-4',
    temperature: 0.7,
    maxTokens: 2000,
    instructions: '',
    tools: []
  };

  return {
    ...base,
    ...(presets[type] || {})
  };
};
