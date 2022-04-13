import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

function RequireAuth({ children }) {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  let location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }
  return children;
}

export default RequireAuth;
