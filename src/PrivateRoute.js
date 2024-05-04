// src/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';  // Adjust the import path as necessary

const PrivateRoute = ({ children }) => {
  const { authToken } = useAuth();

  return authToken ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
