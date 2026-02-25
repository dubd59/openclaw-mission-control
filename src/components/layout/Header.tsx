import React from 'react';
import { Plus } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onNewAgent?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle, onNewAgent }) => {
  return (
    <header className="mb-6 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-gray-400">{subtitle}</p>}
      </div>
      {onNewAgent && (
        <button
          onClick={onNewAgent}
          className="flex items-center space-x-2 rounded-lg bg-primary-600 px-4 py-2 text-white hover:bg-primary-700"
        >
          <Plus className="h-4 w-4" />
          <span>New Agent</span>
        </button>
      )}
    </header>
  );
};

export default Header;
