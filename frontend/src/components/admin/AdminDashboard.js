// frontend/src/components/admin/AdminDashboard.js
import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import Overview from './overview'; // Placeholder
import StartupVerification from './StartupVerification'; // Placeholder
import InvestorVerification from './InvestorVerification'; // Placeholder

import './css_files/dashboard.css'; // for layout styles
import UsersManagement from './Users';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('Overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'Users':
        return <UsersManagement />;
      case 'Startup Verification':
        return <StartupVerification />;
      case 'Investor Verification':
        return <InvestorVerification />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="dashboard">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="content">
        {renderContent()}
      </div>
    </div>
  );
}

export default AdminDashboard;
