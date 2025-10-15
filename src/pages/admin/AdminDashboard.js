import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import MenuSection from './MenuSection.js';
import ManageOrders from './ManageOrders.js';
import Reservations from './Reservations.js';
import OnlineOrderStatus from './OnlineOrderStatus.js';  // ✅ Import kiya

const hideGlobalElements = () => {
  const navbar = document.querySelector('nav');
  const footer = document.querySelector('footer');
  const sideIcons = document.querySelector('.floating-reservation-container');

  if (navbar) navbar.style.display = 'none';
  if (footer) footer.style.display = 'none';
  if (sideIcons) sideIcons.style.display = 'none';
};

const AdminDashboard = () => {
  const [selectedSection, setSelectedSection] = useState('welcome');
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    hideGlobalElements();
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  // ✅ Naya section render case add kiya
  const renderSectionContent = () => {
    switch (selectedSection) {
      case 'menu':
        return <MenuSection />;
      case 'orders':
        return <ManageOrders />;
      case 'reservations':
        return <Reservations />;
      case 'orderStatus':
        return <OnlineOrderStatus />;
      default:
        return <p>👋 Welcome to Admin Dashboard!</p>;
    }
  };

  return (
    <div className="admin-dashboard-container">
      <div className="admin-header">
        <h2>Admin Dashboard</h2>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>

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
          <option value="orderStatus">🔁 Order Status</option> {/* ✅ New Option */}
        </select>
      ) : (
        <div className="admin-sections">
          <div className="admin-card" onClick={() => setSelectedSection('menu')}>📝 Manage Menu</div>
          <div className="admin-card" onClick={() => setSelectedSection('orders')}>📦 Manage Orders</div>
          <div className="admin-card" onClick={() => setSelectedSection('reservations')}>📊 Reservations</div>
          <div className="admin-card" onClick={() => setSelectedSection('orderStatus')}>🔁 Order Status</div> {/* ✅ New Card */}
        </div>
      )}

      <div className="admin-content">
        {renderSectionContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
