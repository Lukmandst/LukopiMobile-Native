import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AppRegistry, Platform} from 'react-native';
import Toast from 'react-native-toast-message';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/redux/store';
import {SWRConfig} from 'swr';
import {AppState} from 'react-native';
import PushNotification from 'react-native-push-notification';

import App from './src';
import {name as appName} from './app.json';

PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    console.log('TOKEN:', token);
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);

    // process the notification

    // (required) Called when a remote is received or opened, or local notification is opened
    // notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function (notification) {
    console.log('ACTION:', notification.action);
    console.log('NOTIFICATION:', notification);

    // process the action
  },

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function (err) {
    console.error(err.message, err);
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: Platform.OS === 'ios',
});

PushNotification.createChannel(
  {
    channelId: 'local-notification',
    channelName: 'Local Notification',
  },
  created => console.log('channel is ', created ? 'created' : 'available'),
);

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
