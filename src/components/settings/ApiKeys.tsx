import React, { useState } from 'react';
import { Key, Plus, Trash2 } from 'lucide-react';
import { useAgentStore } from '../../store/agentStore';
import { ApiKey } from '../../types';

const ApiKeys: React.FC = () => {
  const { apiKeys, addApiKey, deleteApiKey } = useAgentStore();
  const [name, setName] = useState('');
  const [provider, setProvider] = useState<ApiKey['provider']>('openai');
  const [keyValue, setKeyValue] = useState('');
  const [monthlyLimit, setMonthlyLimit] = useState(100);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();

    addApiKey({
      name,
      provider,
      key: keyValue,
      monthlyLimit,
      used: 0,
      status: 'active'
    });

    setName('');
    setProvider('openai');
    setKeyValue('');
    setMonthlyLimit(100);
  };

  return (
    <div className="space-y-6">
      <form onSubmit={submit} className="rounded-xl border border-gray-800 bg-dark-200 p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">Add API Key</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Key name"
            className="rounded-lg border border-gray-700 bg-dark-300 px-4 py-2 text-white"
            required
          />
          <select
            value={provider}
            onChange={(event) => setProvider(event.target.value as ApiKey['provider'])}
            className="rounded-lg border border-gray-700 bg-dark-300 px-4 py-2 text-white"
          >
            <option value="openai">OpenAI</option>
            <option value="anthropic">Anthropic</option>
            <option value="google">Google</option>
            <option value="custom">Custom</option>
          </select>
          <input
            value={keyValue}
            onChange={(event) => setKeyValue(event.target.value)}
            placeholder="API key value"
            className="rounded-lg border border-gray-700 bg-dark-300 px-4 py-2 text-white"
            required
          />
          <input
            type="number"
            min={1}
            value={monthlyLimit}
            onChange={(event) => setMonthlyLimit(Number(event.target.value))}
            placeholder="Monthly limit"
            className="rounded-lg border border-gray-700 bg-dark-300 px-4 py-2 text-white"
            required
          />
        </div>
        <button className="mt-4 flex items-center space-x-2 rounded-lg bg-primary-600 px-4 py-2 text-white hover:bg-primary-700">
          <Plus className="h-4 w-4" />
          <span>Add Key</span>
        </button>
      </form>

      <div className="space-y-3">
        {apiKeys.map((apiKey) => (
          <div key={apiKey.id} className="flex items-center justify-between rounded-lg border border-gray-800 bg-dark-200 p-4">
            <div className="flex items-center space-x-3">
              <Key className="h-4 w-4 text-primary-500" />
              <div>
                <div className="text-white">{apiKey.name}</div>
                <div className="text-xs uppercase text-gray-400">{apiKey.provider}</div>
              </div>
            </div>
            <button
              onClick={() => deleteApiKey(apiKey.id)}
              className="rounded p-2 text-gray-400 hover:bg-red-500/20 hover:text-red-400"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApiKeys;
