import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../logic/store';
import { AuthProvider } from '../auth/auth-context';
import { PaperProvider } from 'react-native-paper';
import AppNavigator from '../component/app-navigator';

const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <PaperProvider>
          <AppNavigator />
        </PaperProvider>
      </AuthProvider>
    </Provider>
  );
};

export default App;
