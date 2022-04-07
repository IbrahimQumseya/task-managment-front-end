import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

function AlreadySignIn({ children }) {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  let location = useLocation();
  if (isAuthenticated) {
    return <Navigate to='/home' state={{ from: location }} replace />;
  }
  return children;
}

export default AlreadySignIn;
