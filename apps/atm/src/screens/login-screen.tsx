import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAuth } from '../auth/auth-context';

const LoginScreen = () => {
  const { login } = useAuth();

  return (
    <View>
      <Text>Login screen</Text>
      <Button title="Login as Operator" onPress={login} />
    </View>
  );
};

export default LoginScreen;
