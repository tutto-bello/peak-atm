import React from 'react';
import { useAuth } from '../auth/auth-context';
import LoginScreen from '../screens/login-screen';

const ProtectedRoute = ({ component }: { component: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? component : <LoginScreen />;
};

export default ProtectedRoute;
