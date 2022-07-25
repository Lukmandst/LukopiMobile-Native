import PushNotification from 'react-native-push-notification';

const CHANNEL_ID = 'local-notification';

export const sendLocalNotification = (title, message) => {
  PushNotification.localNotification({
    channelId: CHANNEL_ID,
    title,
    message,
  });
};
