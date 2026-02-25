import React from 'react';
import {
  Activity,
  Bot,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  CircuitBoard,
  CreditCard,
  Key,
  LayoutDashboard,
  Package,
  Settings,
  Sun,
  Moon
} from 'lucide-react';

interface SidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
  activeView: string;
  setActiveView: (view: string) => void;
  lightMode: boolean;
  toggleTheme: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, toggleSidebar, activeView, setActiveView, lightMode, toggleTheme }) => {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'agents', icon: Bot, label: 'Agents' },
    { id: 'api-keys', icon: Key, label: 'API Keys' },
    { id: 'credits', icon: CreditCard, label: 'Credit Limits' },
    { id: 'marketplace', icon: Package, label: 'Skill Marketplace' },
    { id: 'installed-skills', icon: CheckCircle, label: 'Installed Skills' },
    { id: 'activity', icon: Activity, label: 'Activity' },
    { id: 'settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <div
      className={`fixed left-0 top-0 h-screen border-r border-gray-800 bg-dark-200 transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="flex items-center justify-between border-b border-gray-800 p-4">
        {!isCollapsed ? (
          <div className="flex items-center space-x-2">
            <CircuitBoard className="h-8 w-8 text-primary-500" />
            <span className="text-xl font-bold text-white">OpenClaw</span>
          </div>
        ) : (
          <CircuitBoard className="mx-auto h-8 w-8 text-primary-500" />
        )}
        <button onClick={toggleSidebar} className="rounded-lg p-1 transition-colors hover:bg-gray-800">
          {isCollapsed ? (
            <ChevronRight className="h-5 w-5 text-gray-400" />
          ) : (
            <ChevronLeft className="h-5 w-5 text-gray-400" />
          )}
        </button>
      </div>

      <nav className="p-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={`mb-1 flex w-full items-center space-x-3 rounded-lg p-3 transition-colors ${
              activeView === item.id
                ? 'bg-primary-600 text-white'
                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <item.icon className="h-5 w-5 shrink-0" />
            {!isCollapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>

      <div className="absolute bottom-4 left-0 right-0 px-2">
        <div className={`mb-2 flex items-center justify-center rounded-lg bg-dark-300 p-2 ${isCollapsed ? 'text-center' : ''}`}>          
          <button
            onClick={toggleTheme}
            className="rounded-full p-1 hover:bg-gray-800"
            title="Toggle light/dark mode"
          >
            {lightMode ? (
              <Moon className="h-5 w-5 text-gray-300" />
            ) : (
              <Sun className="h-5 w-5 text-yellow-400" />
            )}
          </button>
        </div>
        <div className={`rounded-lg bg-dark-300 p-3 ${isCollapsed ? 'text-center' : ''}`}>
          <div className="text-xs text-gray-400">System Status</div>
          <div className="mt-1 flex items-center">
            <div className="h-2 w-2 animate-pulse-slow rounded-full bg-green-500" />
            {!isCollapsed && <span className="ml-2 text-sm text-white">Operational</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
