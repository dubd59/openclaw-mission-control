import React from 'react';
import { AlertTriangle, CheckCircle2, Clock3, Cpu, XCircle } from 'lucide-react';
import { useAgentStore } from '../../store/agentStore';
import { Activity } from '../../types';

const iconForActivity = (type: Activity['type']) => {
  if (type === 'agent_complete') {
    return <CheckCircle2 className="h-4 w-4 text-green-400" />;
  }
  if (type === 'credit_warning') {
    return <AlertTriangle className="h-4 w-4 text-yellow-400" />;
  }
  if (type === 'error') {
    return <XCircle className="h-4 w-4 text-red-400" />;
  }
  if (type === 'api_call') {
    return <Cpu className="h-4 w-4 text-primary-400" />;
  }
  return <Clock3 className="h-4 w-4 text-blue-400" />;
};

const ActivityFeed: React.FC = () => {
  const { activities } = useAgentStore();

  return (
    <div className="rounded-xl border border-gray-800 bg-dark-200 p-6">
      <h3 className="mb-4 text-lg font-semibold text-white">Recent Activity</h3>

      {activities.length === 0 ? (
        <div className="rounded-lg bg-dark-300 p-8 text-center text-sm text-gray-400">
          No activity yet. Actions will appear here in real time.
        </div>
      ) : (
        <div className="space-y-3">
          {activities.slice(0, 20).map((activity) => (
            <div
              key={activity.id}
              className="flex items-start justify-between rounded-lg border border-gray-800 bg-dark-300 p-3"
            >
              <div className="flex items-start space-x-3">
                <div className="mt-0.5">{iconForActivity(activity.type)}</div>
                <div>
                  <p className="text-sm text-white">{activity.message}</p>
                  <p className="mt-1 text-xs uppercase tracking-wide text-gray-500">{activity.type}</p>
                </div>
              </div>
              <div className="text-xs text-gray-500">
                {new Date(activity.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;
