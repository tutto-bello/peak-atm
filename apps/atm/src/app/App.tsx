import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../logic/store';
import { AuthProvider, useAuth } from '../auth/auth-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import UserScreen from '../screens/user-screen';
import OperatorScreen from '../screens/operator-screen';
import LoginScreen from '../screens/login-screen';

const Tab = createBottomTabNavigator();

const ProtectedOperatorScreen = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginScreen />; // Redirect unauthorized users to UserScreen
  }

  return <OperatorScreen />;
};

const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <NavigationContainer>
          <Tab.Navigator id={undefined}>
            <Tab.Screen name="User" component={UserScreen} />
            <Tab.Screen name="Operator" component={ProtectedOperatorScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </Provider>
  );
};

export default App;
