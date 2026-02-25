import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { Skill, SkillExecution, SkillMarketplaceListing } from '../types/skills';

interface SkillStore {
  skills: Skill[];
  marketplaceListings: SkillMarketplaceListing[];
  executions: SkillExecution[];
  installSkill: (skill: SkillMarketplaceListing) => Promise<void>;
  uninstallSkill: (skillId: string) => Promise<void>;
  enableSkill: (skillId: string) => void;
  disableSkill: (skillId: string) => void;
  updateSkill: (skillId: string) => Promise<void>;
  trackExecution: (execution: Omit<SkillExecution, 'id' | 'startedAt'>) => string;
  updateExecution: (id: string, updates: Partial<SkillExecution>) => void;
  configureSkill: (skillId: string, config: Record<string, unknown>) => void;
  setSkillEnvVar: (skillId: string, key: string, value: string) => void;
}

const listings: SkillMarketplaceListing[] = [
  {
    id: 'desearch-web-search',
    name: 'desearch-web-search',
    description: 'Real-time internet search with customizable engines and structured extraction.',
    category: 'search',
    author: 'desearch',
    version: '2.1.0',
    downloads: 15420,
    rating: 4.8,
    repository: 'clawhub/desearch-web-search',
    installCommand: 'npx clawhub@latest install desearch-web-search'
  },
  {
    id: 'ai-web-automation',
    name: 'ai-web-automation',
    description: 'Playwright-driven browser automation for multi-step tasks.',
    category: 'browser',
    author: 'openclaw',
    version: '2.3.1',
    downloads: 18760,
    rating: 4.9,
    repository: 'clawhub/ai-web-automation',
    installCommand: 'npx clawhub@latest install ai-web-automation'
  },
  {
    id: 'telegram-bot',
    name: 'telegram-bot',
    description: 'Telegram integration for messaging and command workflows.',
    category: 'communication',
    author: 'openclaw',
    version: '2.1.0',
    downloads: 21340,
    rating: 4.8,
    repository: 'clawhub/telegram-bot',
    installCommand: 'clawhub install telegram-bot'
  },
  {
    id: 'code-executor',
    name: 'code-executor',
    description: 'Sandboxed code execution for Python, JS, and shell snippets.',
    category: 'development',
    author: 'openclaw',
    version: '1.7.0',
    downloads: 15430,
    rating: 4.7,
    repository: 'clawhub/code-executor',
    installCommand: 'clawhub install code-executor'
  },
  {
    id: 'find-skills',
    name: 'find-skills',
    description: 'Finds and recommends skills for unknown tasks.',
    category: 'search',
    author: 'openclaw',
    version: '1.2.0',
    downloads: 8930,
    rating: 4.7,
    repository: 'clawhub/find-skills',
    installCommand: 'clawhub install find-skills'
  }
];

export const useSkillStore = create<SkillStore>()(
  persist(
    (set) => ({
      skills: [],
      marketplaceListings: listings,
      executions: [],

      installSkill: async (listing) => {
        const newSkill: Skill = {
          id: listing.id,
          name: listing.name,
          description: listing.description,
          category: listing.category,
          author: listing.author,
          version: listing.version,
          installed: true,
          enabled: true,
          installPath: `~/.openclaw/skills/${listing.id}/`,
          dependencies: [],
          envVars: [],
          lastUpdated: new Date(),
          repository: listing.repository
        };

        set((state) => {
          if (state.skills.some((skill) => skill.id === listing.id)) {
            return state;
          }
          return { skills: [...state.skills, newSkill] };
        });
      },

      uninstallSkill: async (skillId) => {
        set((state) => ({
          skills: state.skills.filter((skill) => skill.id !== skillId)
        }));
      },

      enableSkill: (skillId) => {
        set((state) => ({
          skills: state.skills.map((skill) =>
            skill.id === skillId ? { ...skill, enabled: true } : skill
          )
        }));
      },

      disableSkill: (skillId) => {
        set((state) => ({
          skills: state.skills.map((skill) =>
            skill.id === skillId ? { ...skill, enabled: false } : skill
          )
        }));
      },

      updateSkill: async (skillId) => {
        set((state) => ({
          skills: state.skills.map((skill) =>
            skill.id === skillId
              ? { ...skill, lastUpdated: new Date(), version: `${skill.version}-updated` }
              : skill
          )
        }));
      },

      trackExecution: (execution) => {
        const id = uuidv4();
        const tracked: SkillExecution = {
          id,
          startedAt: new Date(),
          ...execution
        };

        set((state) => ({
          executions: [tracked, ...state.executions].slice(0, 100)
        }));

        return id;
      },

      updateExecution: (id, updates) => {
        set((state) => ({
          executions: state.executions.map((execution) =>
            execution.id === id ? { ...execution, ...updates } : execution
          )
        }));
      },

      configureSkill: (skillId, config) => {
        set((state) => ({
          skills: state.skills.map((skill) =>
            skill.id === skillId ? { ...skill, configSchema: config } : skill
          )
        }));
      },

      setSkillEnvVar: (skillId, key, value) => {
        set((state) => ({
          skills: state.skills.map((skill) => {
            if (skill.id !== skillId) {
              return skill;
            }
            const vars = skill.envVars || [];
            return { ...skill, envVars: [...vars, `${key}=${value}`] };
          })
        }));
      }
    }),
    {
      name: 'openclaw-skills-storage'
    }
  )
);
