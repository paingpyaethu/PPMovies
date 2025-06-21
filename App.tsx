import 'react-native-gesture-handler';

import React from 'react';
import AppNavigator from '@/navigation/AppNavigator';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from '@/store';

if (__DEV__) {
  require('@/devtools/ReactotronConfig');
}

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;
