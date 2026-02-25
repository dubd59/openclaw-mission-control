import React from 'react';
import { useAgentStore } from '../../store/agentStore';

const CreditSettings: React.FC = () => {
  const { agents } = useAgentStore();

  return (
    <div className="space-y-4 rounded-xl border border-gray-800 bg-dark-200 p-6">
      <h2 className="text-xl font-semibold text-white">Agent Credit Overview</h2>
      {agents.length === 0 ? (
        <div className="text-sm text-gray-400">No agents available.</div>
      ) : (
        <div className="space-y-3">
          {agents.map((agent) => {
            const percent = agent.creditLimit > 0 ? (agent.creditsUsed / agent.creditLimit) * 100 : 0;
            return (
              <div key={agent.id} className="rounded-lg bg-dark-300 p-3">
                <div className="mb-1 flex justify-between">
                  <span className="text-sm text-white">{agent.name}</span>
                  <span className="text-xs text-gray-400">
                    ${agent.creditsUsed.toFixed(2)} / ${agent.creditLimit.toFixed(2)}
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-700">
                  <div
                    className={`h-2 rounded-full ${percent > 90 ? 'bg-red-500' : percent > 70 ? 'bg-yellow-500' : 'bg-green-500'}`}
                    style={{ width: `${Math.min(percent, 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CreditSettings;
