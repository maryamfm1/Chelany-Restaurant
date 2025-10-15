import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('authToken');

  if (!token) {
    // Agar token nahi hai, to login page pe bhej do
    return <Navigate to="/login" replace />;
  }

  // Agar token hai, to requested component render kar do
  return children;
};

export default ProtectedRoute;
