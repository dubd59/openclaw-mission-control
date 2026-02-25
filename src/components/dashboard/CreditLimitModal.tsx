import React, { useState } from 'react';
import { X } from 'lucide-react';
import { ApiKey } from '../../types';

interface CreditLimitModalProps {
  apiKey: ApiKey;
  onClose: () => void;
  onSave: (keyId: string, limit: number) => void;
}

const CreditLimitModal: React.FC<CreditLimitModalProps> = ({ apiKey, onClose, onSave }) => {
  const [limit, setLimit] = useState(apiKey.monthlyLimit);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSave(apiKey.id, limit);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-md rounded-xl border border-gray-800 bg-dark-200 p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Update Credit Limit</h3>
          <button onClick={onClose} className="rounded p-1 hover:bg-gray-800">
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="mb-2 text-sm text-gray-400">API Key</div>
            <div className="rounded-lg bg-dark-300 px-3 py-2 text-white">{apiKey.name}</div>
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-400">Monthly Limit ($)</label>
            <input
              type="number"
              min={1}
              step={1}
              value={limit}
              onChange={(event) => setLimit(Number(event.target.value))}
              className="w-full rounded-lg border border-gray-700 bg-dark-300 px-4 py-2 text-white focus:border-primary-500 focus:outline-none"
              required
            />
          </div>

          <div className="flex items-center justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg bg-gray-700 px-4 py-2 text-white hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-primary-600 px-4 py-2 text-white hover:bg-primary-700"
            >
              Save Limit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreditLimitModal;
