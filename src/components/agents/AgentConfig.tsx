import React, { useMemo, useState } from 'react';
import { Agent } from '../../types';
import { useAgentStore } from '../../store/agentStore';

interface AgentConfigProps {
  agent: Agent;
}

const AgentConfig: React.FC<AgentConfigProps> = ({ agent }) => {
  const { updateAgent } = useAgentStore();
  const [temperature, setTemperature] = useState(agent.config.temperature);
  const [maxTokens, setMaxTokens] = useState(agent.config.maxTokens);
  const [instructions, setInstructions] = useState(agent.config.instructions);

  const dirty = useMemo(() => {
    return (
      temperature !== agent.config.temperature ||
      maxTokens !== agent.config.maxTokens ||
      instructions !== agent.config.instructions
    );
  }, [temperature, maxTokens, instructions, agent.config]);

  const save = () => {
    updateAgent(agent.id, {
      config: {
        ...agent.config,
        temperature,
        maxTokens,
        instructions
      }
    });
  };

  return (
    <div className="space-y-4 rounded-xl border border-gray-800 bg-dark-200 p-5">
      <h3 className="text-lg font-semibold text-white">Agent Config • {agent.name}</h3>

      <div>
        <label className="mb-2 block text-sm text-gray-400">Temperature</label>
        <input
          type="range"
          min={0}
          max={2}
          step={0.1}
          value={temperature}
          onChange={(event) => setTemperature(Number(event.target.value))}
          className="w-full"
        />
        <div className="mt-1 text-xs text-gray-500">{temperature.toFixed(1)}</div>
      </div>

      <div>
        <label className="mb-2 block text-sm text-gray-400">Max Tokens</label>
        <input
          type="number"
          value={maxTokens}
          onChange={(event) => setMaxTokens(Number(event.target.value))}
          className="w-full rounded-lg border border-gray-700 bg-dark-300 px-4 py-2 text-white"
          min={1}
          max={32000}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-gray-400">Instructions</label>
        <textarea
          rows={4}
          value={instructions}
          onChange={(event) => setInstructions(event.target.value)}
          className="w-full rounded-lg border border-gray-700 bg-dark-300 px-4 py-2 text-white"
        />
      </div>

      <button
        onClick={save}
        disabled={!dirty}
        className="rounded-lg bg-primary-600 px-4 py-2 text-sm text-white disabled:cursor-not-allowed disabled:bg-gray-700"
      >
        Save Config
      </button>
    </div>
  );
};

export default AgentConfig;
