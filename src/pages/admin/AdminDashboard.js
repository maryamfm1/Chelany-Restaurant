import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [selectedSection, setSelectedSection] = useState('welcome');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const renderSectionContent = () => {
    switch (selectedSection) {
      case 'menu':
        return <p>📝 Here you can manage the menu items.</p>;
      case 'orders':
        return <p>📦 Manage orders here.</p>;
      case 'reservations':
        return <p>📊 Reservation list and actions.</p>;
      case 'settings':
        return <p>👤 Admin settings go here.</p>;
      default:
        return <p>👋 Welcome to Admin Dashboard!</p>;
    }
  };

  return (
    <div className="admin-dashboard-container">
      <h2>Admin Dashboard</h2>

      {/* Mobile View: Dropdown */}
      {isMobile ? (
        <select
          className="admin-dropdown"
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
        >
          <option value="welcome">🏠 Welcome</option>
          <option value="menu">📝 Manage Menu</option>
          <option value="orders">📦 Manage Orders</option>
          <option value="reservations">📊 Reservations</option>
          <option value="settings">👤 Admin Settings</option>
        </select>
      ) : (
        <div className="admin-sections">
          <div className="admin-card" onClick={() => setSelectedSection('menu')}>📝 Manage Menu</div>
          <div className="admin-card" onClick={() => setSelectedSection('orders')}>📦 Manage Orders</div>
          <div className="admin-card" onClick={() => setSelectedSection('reservations')}>📊 Reservations</div>
          <div className="admin-card" onClick={() => setSelectedSection('settings')}>👤 Admin Settings</div>
        </div>
      )}

      <div className="admin-content">
        {renderSectionContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
