import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useAuth } from '../auth/auth-context';
import LogoutIcon from '../component/icons/logout';

const LogoutButton = () => {
  const { isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) return null;

  return (
    <TouchableOpacity onPress={logout} style={{ marginRight: 16 }}>
      <LogoutIcon color="#414757" />
    </TouchableOpacity>
  );
};

export default LogoutButton;
