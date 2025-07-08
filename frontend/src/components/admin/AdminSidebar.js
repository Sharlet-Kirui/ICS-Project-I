// frontend/src/components/admin/AdminSidebar.js
import React from 'react';
import './css_files/AdminSidebar.css'; // Assuming this includes the CSS above

function AdminSidebar({ activeTab, setActiveTab }) {
  const menuItems = ['Overview', 'Users', 'Startup Verification', 'Investor Verification'];

  return (
    <div className="admin-sidebar">
      {menuItems.map((item) => (
        <button
          key={item}
          onClick={() => setActiveTab(item)}
          className={activeTab === item ? 'active' : ''}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export default AdminSidebar;
