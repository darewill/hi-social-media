import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

interface PublicRouteProps {
  children: JSX.Element;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const { user } = useContext(AuthContext);

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;
