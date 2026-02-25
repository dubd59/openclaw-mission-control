import React, { useState } from 'react';
import { AlertTriangle, DollarSign, Edit2 } from 'lucide-react';
import { useAgentStore } from '../../store/agentStore';
import CreditLimitModal from './CreditLimitModal';

const ApiMonitorCard: React.FC = () => {
  const { apiKeys, updateApiKey } = useAgentStore();
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [showLimitModal, setShowLimitModal] = useState(false);

  const totalCost = apiKeys.reduce((sum, key) => sum + key.used, 0);
  const totalLimit = apiKeys.reduce((sum, key) => sum + key.monthlyLimit, 0);
  const usagePercentage = totalLimit > 0 ? (totalCost / totalLimit) * 100 : 0;

  const getStatusColor = (status: string) => {
    if (status === 'active') {
      return 'text-green-500';
    }
    if (status === 'exceeded') {
      return 'text-red-500';
    }
    return 'text-yellow-500';
  };

  const handleSetLimit = (keyId: string, limit: number) => {
    updateApiKey(keyId, { monthlyLimit: limit });
    setShowLimitModal(false);
    setSelectedKey(null);
  };

  return (
    <>
      <div className="rounded-xl border border-gray-800 bg-dark-200 p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">API Cost Monitor</h3>
          <DollarSign className="h-5 w-5 text-primary-500" />
        </div>

        <div className="mb-4 rounded-lg bg-dark-300 p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-gray-400">Total Usage</span>
            <span className="text-xl font-bold text-white">${totalCost.toFixed(2)}</span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-gray-700">
            <div
              className={`h-2.5 rounded-full ${
                usagePercentage > 90 ? 'bg-red-500' : usagePercentage > 70 ? 'bg-yellow-500' : 'bg-green-500'
              }`}
              style={{ width: `${Math.min(usagePercentage, 100)}%` }}
            />
          </div>
          <div className="mt-2 flex justify-between text-xs text-gray-400">
            <span>${totalCost.toFixed(2)} used</span>
            <span>${totalLimit.toFixed(2)} limit</span>
          </div>
        </div>

        <div className="max-h-60 space-y-3 overflow-y-auto">
          {apiKeys.map((key) => {
            const keyUsage = key.monthlyLimit > 0 ? (key.used / key.monthlyLimit) * 100 : 0;
            return (
              <div key={key.id} className="rounded-lg bg-dark-300 p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium text-white">{key.name}</span>
                    <span className={`ml-2 text-xs ${getStatusColor(key.status)}`}>{key.status}</span>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedKey(key.id);
                      setShowLimitModal(true);
                    }}
                    className="rounded p-1 hover:bg-gray-700"
                  >
                    <Edit2 className="h-3 w-3 text-gray-400" />
                  </button>
                </div>
                <div className="mt-2">
                  <div className="mb-1 flex justify-between text-xs text-gray-400">
                    <span>${key.used.toFixed(2)}</span>
                    <span>${key.monthlyLimit.toFixed(2)}</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-gray-700">
                    <div
                      className={`h-1.5 rounded-full ${
                        keyUsage > 90 ? 'bg-red-500' : keyUsage > 70 ? 'bg-yellow-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${Math.min(keyUsage, 100)}%` }}
                    />
                  </div>
                </div>
                {keyUsage > 80 && (
                  <div className="mt-2 flex items-center text-xs text-yellow-500">
                    <AlertTriangle className="mr-1 h-3 w-3" />
                    Approaching limit
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {apiKeys.length === 0 && (
          <div className="py-4 text-center text-gray-400">No API keys configured. Add keys in Settings.</div>
        )}
      </div>

      {showLimitModal && selectedKey && (
        <CreditLimitModal
          apiKey={apiKeys.find((item) => item.id === selectedKey)!}
          onClose={() => {
            setShowLimitModal(false);
            setSelectedKey(null);
          }}
          onSave={handleSetLimit}
        />
      )}
    </>
  );
};

export default ApiMonitorCard;
