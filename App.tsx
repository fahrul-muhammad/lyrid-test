import Router from './src/routes';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/redux/store';
import Toast from 'react-native-toast-message';
import {toastConfig} from './src/utils/toast';
import SplashScreen from 'react-native-splash-screen';
import React, {useEffect} from 'react';

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router />
        <Toast config={toastConfig} />
      </PersistGate>
    </Provider>
  );
}
