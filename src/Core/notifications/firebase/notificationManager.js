import { firebase } from "../../api/firebase/config";
import { updateUser, getUserByID } from "../../api/firebase/auth";

const notificationsRef = firebase.firestore().collection("notifications");

const fcmURL = "https://fcm.googleapis.com/fcm/send";
const firebaseServerKey =
  // "AAAAZZi3wC8:APA91bHeliBpJQfKUTiLYtvam7-1b1H9rSCgLFnOfoYwBHlzUvTNCs4yP7jqD7ltSnVoJ4GPrqQ-1jIytZKiIktIEGQmTR-voUiq1a3BqPdW_SZpew4psD6MtmYNGDqSjoo5REVc8uLs";
  "AAAANPymQ1s:APA91bFB4glgmC1gsZRRz9T7MCs2fUqZscfBiyCjMQXJl_DA-rdHvDOs3FhrVr9rfUsEQ6DugeVxxFvclG5v8HpITQfavytuRDLDOv1dy0XtWWx6n6BliF2_xiTt9owuARvlbASQS2L7"  // sha-256 : 7A:38:9C:BB:FD:76:8C:70:4D:1C:3A:CD:9A:05:DE:A5:28:A2:64:E2:98:F8:C3:C6:94:6F:3A:00:4F:51:ED:19

const handleUserBadgeCount = async (userID) => {
  const user = await getUserByID(userID);
  if (user?.badgeCount) { 
    const newBadgeCount = user.badgeCount + 1;
    updateUser(userID, { badgeCount: newBadgeCount });
    return newBadgeCount;
  }
  return 0;
};

const sendPushNotification = async (
  toUser,
  title,
  body,
  type,
  metadata = {},
) => {

  console.log('toUser : ',toUser)
  console.log('title : ',title)
  console.log('body : ',body)
  console.log('type : ',type)
  console.log('metadata : ',metadata)
  
  if (metadata && metadata.outBound && toUser.id == metadata.outBound.id) {
    console.log('first condition')
    return;
  }
  if (toUser.settings && toUser.settings.push_notifications_enabled == false) {
    console.log('second condition')
    return;
  }
  if (!toUser.pushToken) {
    console.log('third condition')
    return;
  }

  const notification = {
    toUserID: toUser.id,
    title,
    body,
    metadata,
    toUser,
    type,
    seen: false,
  };

  const ref = await notificationsRef.add({
    ...notification,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });

  console.log('ref : ',ref)

  notificationsRef.doc(ref.id).update({ id: ref.id });

  const userBadgeCount = await handleUserBadgeCount(toUser.id || toUser.userID);

  console.log('userBadgeCount : ',userBadgeCount)
  const pushNotification = {
    to: toUser.pushToken,
    notification: {
      title: title,
      body: body,
      sound: "default",
      badge: userBadgeCount,
    },
    data: { type, toUserID: toUser.id, ...metadata },
    priority: "high",
  };

  console.log('pushNotification : ',pushNotification)
  console.log('toUser.pushToken',toUser.pushToken)
  console.log('fcmURL : ',fcmURL);
  console.log('headers : ',{
    "Authorization": "key=" + firebaseServerKey,
    "Content-Type": "application/json",
  });
  console.log('body : ',pushNotification);

  fetch(fcmURL, {
    method: "post",
    headers: new Headers({
      "Authorization": "key=" + firebaseServerKey,
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(pushNotification),
  })
    .then((res) => res.json())
    .then((res) => console.log("resNotification : ", res))
    .catch((error) => console.log("errorNotification : ", error));
};
const sendCallNotification = async (
  sender,
  recipient,
  channelID,
  callType,
  callID
) => {
  if (!recipient.pushToken) {
    return;
  }

  const pushNotification = {
    to: recipient.pushToken,
    priority: "high",
    data: {
      channelID,
      recipientID: recipient.id,
      senderID: sender.id,
      callType,
      callID,
      callerName: sender.firstName,
      priority: "high",
      contentAvailable: true,
    },
  };

  try {
    const response = await fetch(fcmURL, {
      method: "post",
      headers: new Headers({
        Authorization: "key=" + firebaseServerKey,
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(pushNotification),
    });
    console.log("jjj push notif " + JSON.stringify(pushNotification));
    console.log(JSON.stringify(response));
  } catch (error) {
    console.log(error);
  }
};

export const notificationManager = {
  sendPushNotification,
  sendCallNotification,
};
