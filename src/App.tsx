import React, { useMemo, useState, useEffect } from 'react';
import { Bot } from 'lucide-react';
import Sidebar from './components/layout/Sidebar';
import DashboardLayout from './components/layout/DashboardLayout';
import Header from './components/layout/Header';
import AgentProgressChart from './components/dashboard/AgentProgressChart';
import ApiMonitorCard from './components/dashboard/ApiMonitorCard';
import AgentCard from './components/dashboard/AgentCard';
import ActivityFeed from './components/dashboard/ActivityFeed';
import AgentBuilder from './components/agents/AgentBuilder';
import AgentList from './components/agents/AgentList';
import ApiKeys from './components/settings/ApiKeys';
import CreditSettings from './components/settings/CreditSettings';
import SkillMarketplace from './components/skills/SkillMarketplace';
import InstalledSkills from './components/skills/InstalledSkills';
import { useAgentStore } from './store/agentStore';

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');
  const [showAgentBuilder, setShowAgentBuilder] = useState(false);
  const [lightMode, setLightMode] = useState(false);
  const { agents } = useAgentStore();

  const runningAgents = useMemo(() => agents.filter((agent) => agent.status === 'running'), [agents]);

  useEffect(() => {
    const listener = () => setLightMode((prev) => !prev);
    window.addEventListener('toggleTheme', listener);
    return () => window.removeEventListener('toggleTheme', listener);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('light', lightMode);
  }, [lightMode]);

  const renderContent = () => {
    if (activeView === 'dashboard') {
      return (
        <div className="space-y-6">
          <Header
            title="Mission Control Dashboard"
            subtitle="Real-time command center for agents, API usage, and skills."
            onNewAgent={() => setShowAgentBuilder(true)}
          />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <AgentProgressChart />
            </div>
            <div>
              <ApiMonitorCard />
            </div>
          </div>

          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Active Agents</h2>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {runningAgents.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
              {runningAgents.length === 0 && (
                <div className="col-span-full rounded-xl border border-gray-800 bg-dark-200 p-12 text-center">
                  <Bot className="mx-auto mb-3 h-12 w-12 text-gray-600" />
                  <p className="text-gray-400">No active agents. Create one to get started.</p>
                </div>
              )}
            </div>
          </div>

          {agents.length > 0 && (
            <div>
              <h2 className="mb-4 text-xl font-semibold text-white">All Agents</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {agents.map((agent) => (
                  <AgentCard key={agent.id} agent={agent} />
                ))}
              </div>
            </div>
          )}

          <ActivityFeed />
        </div>
      );
    }

    if (activeView === 'agents') {
      return (
        <div className="space-y-6">
          <Header title="Agent Management" subtitle="Create, monitor, and control each autonomous workflow." onNewAgent={() => setShowAgentBuilder(true)} />
          <AgentList />
        </div>
      );
    }

    if (activeView === 'api-keys') {
      return (
        <div className="space-y-6">
          <Header title="API Keys" subtitle="Manage provider keys and monthly budgets." />
          <ApiKeys />
        </div>
      );
    }

    if (activeView === 'credits') {
      return (
        <div className="space-y-6">
          <Header title="Credit Limits" subtitle="Track per-agent usage against configured limits." />
          <CreditSettings />
          <ApiMonitorCard />
        </div>
      );
    }

    if (activeView === 'marketplace') {
      return <SkillMarketplace />;
    }

    if (activeView === 'installed-skills') {
      return <InstalledSkills />;
    }

    if (activeView === 'activity') {
      return (
        <div className="space-y-6">
          <Header title="Activity Log" subtitle="Audit and review all significant mission control events." />
          <ActivityFeed />
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <Header title="Settings" subtitle="Core system settings and OpenClaw integration preferences." />
        <div className="rounded-xl border border-gray-800 bg-dark-200 p-6">
          <p className="text-gray-400">Settings panel ready. Expand with local OpenClaw CLI and gateway options.</p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-dark-300">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        activeView={activeView}
        setActiveView={setActiveView}
        lightMode={lightMode}
        toggleTheme={() => setLightMode((v) => !v)}
      />

      <DashboardLayout isSidebarCollapsed={isSidebarCollapsed}>{renderContent()}</DashboardLayout>

      {showAgentBuilder && <AgentBuilder onClose={() => setShowAgentBuilder(false)} />}
    </div>
  );
}

export default App;
