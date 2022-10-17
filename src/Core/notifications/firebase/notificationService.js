import AsyncStorage from "@react-native-community/async-storage";
import messaging from "@react-native-firebase/messaging";

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log("Authorization status:", authStatus);
    getFcmToken();
  }
}

const getFcmToken = async () => {
  let checkToken = await AsyncStorage.getItem("fcmToken");
  console.log("checkToken:::", checkToken);
  if (!checkToken) {
    try {
      const fcmToken = await messaging().getToken();
      if (!!fcmToken) {
        console.log("fcm token generated", fcmToken);
        await AsyncStorage.setItem("fcmToken", fcmToken);
      }
    } catch (error) {
      console.log("error in fcmToken", error);
      alert(error?.message);
    }
  }
};

export const notificationListener = async () => {
  console.log("Notification notificationListener ACTIVE");
  messaging().onNotificationOpenedApp((remoteMessage) => {
    console.log(
      "Notification caused app to open from background state:",
      remoteMessage.notification
    );
    console.log("background state", remoteMessage.notification);
    // navigation.navigate(remoteMessage.data.type);
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      if (remoteMessage) {
        console.log(
          "Notification caused app to open from quit state:",
          remoteMessage.notification
        );
        console.log("remoteMessage.notification", remoteMessage.notification);
        // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
      }
    });
};
