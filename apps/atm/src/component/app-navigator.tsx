import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import UserScreen from '../screens/user-screen';
import OperatorScreen from '../screens/operator-screen';
import HistoryScreen from '../screens/history-screen';
import ATMIcon from '../component/icons/atm';
import ClockIcon from '../component/icons/clock';
import SettingIcon from '../component/icons/settings';
import ProtectedRoute from '../auth/protected-route';
import LogoutButton from './logout-botton';
import { useTheme } from 'react-native-paper';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const theme = useTheme();
  return (
    <NavigationContainer>
      <Tab.Navigator
        id={undefined}
        screenOptions={{
          tabBarActiveTintColor: theme.colors.primary, // Active icon & label color
          tabBarInactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen
          name="ATM"
          component={UserScreen}
          options={{
            tabBarIcon: ({ color }) => <ATMIcon color={color} />,
          }}
        />
        <Tab.Screen
          name="History"
          options={{
            tabBarIcon: ({ color }) => <ClockIcon color={color} />,
            tabBarLabel: 'History',
            headerRight: () => <LogoutButton />,
          }}
        >
          {() => <ProtectedRoute component={<HistoryScreen />} />}
        </Tab.Screen>
        <Tab.Screen
          name="Operator"
          options={{
            tabBarIcon: ({ color }) => <SettingIcon color={color} />,
            tabBarLabel: 'Operator',
            headerRight: () => <LogoutButton />,
          }}
        >
          {() => <ProtectedRoute component={<OperatorScreen />} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
