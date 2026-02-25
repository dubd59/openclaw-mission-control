import React from 'react';

interface DashboardLayoutProps {
  isSidebarCollapsed: boolean;
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ isSidebarCollapsed, children }) => {
  return (
    <main
      className={`min-h-screen bg-dark-300 p-6 transition-all duration-300 ${
        isSidebarCollapsed ? 'ml-20' : 'ml-64'
      }`}
    >
      {children}
    </main>
  );
};

export default DashboardLayout;
