import React from 'react';
import { ApiKey } from '../../types';

interface ProviderSelectProps {
  value: ApiKey['provider'];
  onChange: (provider: ApiKey['provider']) => void;
  className?: string;
}

const providers: Array<{ value: ApiKey['provider']; label: string }> = [
  { value: 'openai', label: 'OpenAI' },
  { value: 'anthropic', label: 'Anthropic' },
  { value: 'google', label: 'Google' },
  { value: 'azure', label: 'Azure' },
  { value: 'aws', label: 'AWS' },
  { value: 'huggingface', label: 'HuggingFace' },
  { value: 'microsoft', label: 'Microsoft' },
  { value: 'custom', label: 'Custom' }
];

const ProviderSelect: React.FC<ProviderSelectProps> = ({ value, onChange, className }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as ApiKey['provider'])}
      className={className}
    >
      {providers.map((p) => (
        <option key={p.value} value={p.value}>
          {p.label}
        </option>
      ))}
    </select>
  );
};

export default ProviderSelect;
