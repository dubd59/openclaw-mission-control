import React from 'react';
import { Bot } from 'lucide-react';
import { useAgentStore } from '../../store/agentStore';
import AgentCard from '../dashboard/AgentCard';

const AgentList: React.FC = () => {
  const { agents } = useAgentStore();

  if (agents.length === 0) {
    return (
      <div className="rounded-xl border border-gray-800 bg-dark-200 p-12 text-center">
        <Bot className="mx-auto mb-3 h-12 w-12 text-gray-600" />
        <p className="text-gray-400">No agents created yet</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {agents.map((agent) => (
        <AgentCard key={agent.id} agent={agent} />
      ))}
    </div>
  );
};

export default AgentList;
