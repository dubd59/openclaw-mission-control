import React from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import { useAgentStore } from '../../store/agentStore';

const AgentProgressChart: React.FC = () => {
  const { agents } = useAgentStore();

  const data = agents.map((agent) => ({
    name: agent.name.length > 15 ? `${agent.name.substring(0, 12)}...` : agent.name,
    progress: agent.progress,
    credits: Math.round(agent.creditsUsed * 100) / 100
  }));

  return (
    <div className="rounded-xl border border-gray-800 bg-dark-200 p-6">
      <h3 className="mb-4 text-lg font-semibold text-white">Agent Progress Overview</h3>
      {data.length === 0 ? (
        <div className="flex h-64 items-center justify-center text-sm text-gray-400">
          Create agents to visualize progress and usage.
        </div>
      ) : (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
              <YAxis
                stroke="#9CA3AF"
                tick={{ fill: '#9CA3AF', fontSize: 12 }}
                domain={[0, 100]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '0.5rem',
                  color: '#F9FAFB'
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="progress"
                stroke="#0EA5E9"
                strokeWidth={2}
                dot={{ fill: '#0EA5E9', strokeWidth: 2 }}
                activeDot={{ r: 8 }}
                name="Progress %"
              />
              <Line
                type="monotone"
                dataKey="credits"
                stroke="#10B981"
                strokeWidth={2}
                dot={{ fill: '#10B981', strokeWidth: 2 }}
                name="Credits Used"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default AgentProgressChart;
