import React from 'react';
import { Pause, Play, RotateCcw, Trash2, XCircle } from 'lucide-react';
import { Agent } from '../../types';
import { useAgentStore } from '../../store/agentStore';

interface AgentCardProps {
  agent: Agent;
}

const statusStyles: Record<Agent['status'], string> = {
  idle: 'bg-gray-500/20 text-gray-300',
  running: 'bg-blue-500/20 text-blue-300',
  completed: 'bg-green-500/20 text-green-300',
  failed: 'bg-red-500/20 text-red-300'
};

const AgentCard: React.FC<AgentCardProps> = ({ agent }) => {
  const { updateAgent, deleteAgent, addActivity } = useAgentStore();

  const setStatus = (status: Agent['status']) => {
    updateAgent(agent.id, {
      status,
      progress:
        status === 'running'
          ? Math.min(agent.progress + 10, 95)
          : status === 'completed'
          ? 100
          : agent.progress
    });

    addActivity({
      type: status === 'failed' ? 'error' : 'agent_start',
      message: `Agent "${agent.name}" set to ${status}`,
      agentId: agent.id
    });
  };

  return (
    <div className="rounded-xl border border-gray-800 bg-dark-200 p-5">
      <div className="mb-3 flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-white">{agent.name}</h3>
          <p className="text-xs uppercase tracking-wide text-gray-400">{agent.type}</p>
        </div>
        <span className={`rounded-full px-2 py-1 text-xs ${statusStyles[agent.status]}`}>{agent.status}</span>
      </div>

      <div className="mb-4">
        <div className="mb-1 flex justify-between text-xs text-gray-400">
          <span>Progress</span>
          <span>{agent.progress}%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-gray-700">
          <div
            className="h-2 rounded-full bg-primary-500 transition-all"
            style={{ width: `${Math.max(0, Math.min(agent.progress, 100))}%` }}
          />
        </div>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-2 text-xs text-gray-400">
        <div className="rounded bg-dark-300 p-2">
          Credits Used
          <div className="text-sm text-white">${agent.creditsUsed.toFixed(2)}</div>
        </div>
        <div className="rounded bg-dark-300 p-2">
          Limit
          <div className="text-sm text-white">${agent.creditLimit.toFixed(2)}</div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <button onClick={() => setStatus('running')} className="rounded bg-blue-600 p-2 text-white hover:bg-blue-500" title="Run">
          <Play className="h-4 w-4" />
        </button>
        <button onClick={() => setStatus('idle')} className="rounded bg-gray-700 p-2 text-white hover:bg-gray-600" title="Pause">
          <Pause className="h-4 w-4" />
        </button>
        <button onClick={() => setStatus('completed')} className="rounded bg-green-600 p-2 text-white hover:bg-green-500" title="Complete">
          <RotateCcw className="h-4 w-4" />
        </button>
        <button onClick={() => setStatus('failed')} className="rounded bg-red-700 p-2 text-white hover:bg-red-600" title="Fail">
          <XCircle className="h-4 w-4" />
        </button>
        <button onClick={() => deleteAgent(agent.id)} className="rounded bg-gray-800 p-2 text-gray-300 hover:text-red-400" title="Delete">
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default AgentCard;
