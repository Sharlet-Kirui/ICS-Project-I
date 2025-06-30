import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem('token');
  const userType = localStorage.getItem('userType');

  if (!token) return <Navigate to="/login" />;
  if (role && userType !== role) return <Navigate to="/unauthorized" />;

  return children;
};

export default ProtectedRoute;
