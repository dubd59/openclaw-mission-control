import React, { useState } from 'react';
import { Save, X } from 'lucide-react';
import { useAgentStore } from '../../store/agentStore';
import { AgentConfig } from '../../types';

interface AgentBuilderProps {
  onClose: () => void;
}

const AgentBuilder: React.FC<AgentBuilderProps> = ({ onClose }) => {
  const { addAgent, apiKeys } = useAgentStore();
  const [name, setName] = useState('');
  const [type, setType] = useState<'research' | 'analysis' | 'generation' | 'monitoring' | 'custom'>('research');
  const [config, setConfig] = useState<AgentConfig>({
    model: 'gpt-4',
    temperature: 0.7,
    maxTokens: 2000,
    instructions: '',
    tools: []
  });
  const [selectedApiKeys, setSelectedApiKeys] = useState<string[]>([]);
  const [creditLimit, setCreditLimit] = useState(100);

  const tools = ['web_search', 'code_interpreter', 'file_search', 'function_calling', 'retrieval'];

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    addAgent({
      name,
      status: 'idle',
      type,
      progress: 0,
      apiKeys: selectedApiKeys,
      creditLimit,
      creditsUsed: 0,
      config
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl border border-gray-800 bg-dark-200">
        <div className="flex items-center justify-between border-b border-gray-800 p-6">
          <h2 className="text-xl font-bold text-white">Build New Agent</h2>
          <button onClick={onClose} className="rounded p-1 hover:bg-gray-800">
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-400">Agent Name</label>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-lg border border-gray-700 bg-dark-300 px-4 py-2 text-white focus:border-primary-500 focus:outline-none"
              placeholder="e.g., Research Assistant"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-400">Agent Type</label>
            <select
              value={type}
              onChange={(event) => setType(event.target.value as typeof type)}
              className="w-full rounded-lg border border-gray-700 bg-dark-300 px-4 py-2 text-white focus:border-primary-500 focus:outline-none"
            >
              <option value="research">Research Agent</option>
              <option value="analysis">Analysis Agent</option>
              <option value="generation">Content Generation</option>
              <option value="monitoring">Monitoring Agent</option>
              <option value="custom">Custom Agent</option>
            </select>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Model Configuration</h3>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-400">Model</label>
              <select
                value={config.model}
                onChange={(event) => setConfig({ ...config, model: event.target.value })}
                className="w-full rounded-lg border border-gray-700 bg-dark-300 px-4 py-2 text-white focus:border-primary-500 focus:outline-none"
              >
                <option value="gpt-4">GPT-4</option>
                <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                <option value="claude-2">Claude 2</option>
                <option value="claude-instant">Claude Instant</option>
              </select>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-400">Temperature ({config.temperature})</label>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  value={config.temperature}
                  onChange={(event) => setConfig({ ...config, temperature: parseFloat(event.target.value) })}
                  className="w-full"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-400">Max Tokens</label>
                <input
                  type="number"
                  min="1"
                  max="32000"
                  value={config.maxTokens}
                  onChange={(event) => setConfig({ ...config, maxTokens: parseInt(event.target.value, 10) || 1 })}
                  className="w-full rounded-lg border border-gray-700 bg-dark-300 px-4 py-2 text-white"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-400">System Instructions</label>
            <textarea
              value={config.instructions}
              onChange={(event) => setConfig({ ...config, instructions: event.target.value })}
              rows={4}
              className="w-full rounded-lg border border-gray-700 bg-dark-300 px-4 py-2 text-white focus:border-primary-500 focus:outline-none"
              placeholder="Define the agent's behavior and capabilities..."
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-400">Available Tools</label>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {tools.map((tool) => (
                <label key={tool} className="flex items-center space-x-2 rounded-lg bg-dark-300 p-2">
                  <input
                    type="checkbox"
                    checked={config.tools.includes(tool)}
                    onChange={(event) => {
                      if (event.target.checked) {
                        setConfig({ ...config, tools: [...config.tools, tool] });
                        return;
                      }
                      setConfig({ ...config, tools: config.tools.filter((item) => item !== tool) });
                    }}
                    className="accent-primary-500"
                  />
                  <span className="text-sm capitalize text-white">{tool.replace('_', ' ')}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Resource Allocation</h3>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-400">Assign API Keys</label>
              <div className="space-y-2">
                {apiKeys.length === 0 && <div className="text-sm text-gray-500">No API keys found. Add one in Settings.</div>}
                {apiKeys.map((key) => (
                  <label key={key.id} className="flex items-center justify-between rounded-lg bg-dark-300 p-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedApiKeys.includes(key.id)}
                        onChange={(event) => {
                          if (event.target.checked) {
                            setSelectedApiKeys([...selectedApiKeys, key.id]);
                            return;
                          }
                          setSelectedApiKeys(selectedApiKeys.filter((id) => id !== key.id));
                        }}
                        className="accent-primary-500"
                      />
                      <span className="text-white">{key.name}</span>
                    </div>
                    <span className="text-xs uppercase text-gray-400">{key.provider}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-400">Credit Limit ($)</label>
              <input
                type="number"
                value={creditLimit}
                onChange={(event) => setCreditLimit(parseFloat(event.target.value) || 0)}
                className="w-full rounded-lg border border-gray-700 bg-dark-300 px-4 py-2 text-white"
                min="0"
                step="10"
              />
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              className="flex flex-1 items-center justify-center space-x-2 rounded-lg bg-primary-600 px-4 py-2 font-medium text-white hover:bg-primary-700"
            >
              <Save className="h-4 w-4" />
              <span>Create Agent</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg bg-gray-700 px-4 py-2 font-medium text-white hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgentBuilder;
