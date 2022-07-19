import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AppRegistry} from 'react-native';
import Toast from 'react-native-toast-message';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/redux/store';
import {SWRConfig} from 'swr';
import {AppState} from 'react-native';

import App from './src';
import {name as appName} from './app.json';

const AppWithRouter = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <SafeAreaProvider>
        <NavigationContainer>
          <SWRConfig
            value={{
              provider: () => new Map(),
              isOnline() {
                /* Customize the network state detector */
                return true;
              },
              isVisible() {
                /* Customize the visibility state detector */
                return true;
              },
              initFocus(callback) {
                let appState = AppState.currentState;

                const onAppStateChange = nextAppState => {
                  /* If it's resuming from background or inactive mode to active one */
                  if (
                    appState.match(/inactive|background/) &&
                    nextAppState === 'active'
                  ) {
                    callback();
                  }
                  appState = nextAppState;
                };

                // Subscribe to the app state change events
                const subscription = AppState.addEventListener(
                  'change',
                  onAppStateChange,
                );

                return () => {
                  subscription.remove();
                };
              },
              initReconnect(callback) {
                /* Register the listener with your state provider */
              },
            }}>
            <App />
          </SWRConfig>
        </NavigationContainer>
        <Toast />
      </SafeAreaProvider>
    </PersistGate>
  </Provider>
);

AppRegistry.registerComponent(appName, () => AppWithRouter);
