import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../logic/store';
import Home from '../screens/home';

const App = () => {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
};

export default App;
