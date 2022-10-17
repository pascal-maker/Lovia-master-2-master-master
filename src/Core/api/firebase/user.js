import { firebase } from './config';

export const usersRef = firebase.firestore().collection('users');

export const getUserData = async (userId) => {
  try {
    const user = await usersRef.doc(userId).get();

    return { data: { ...user.data(), id: user.id }, success: true };
  } catch (error) {
    console.log(error);
    return {
      error: 'Oops! an error occurred. Please try again',
      success: false,
    };
  }
};

export const updateUserData = async (userId, userData) => {
  try {
    const userRef = usersRef.doc(userId);

    console.log('userData : ',userData);

    await userRef.update({
      ...userData,
    });

    return { success: true };
  } catch (error) {
    return { error, success: false };
  }
};

export const updateSchoolPre = async (userId, userData) => {
  try {
    const userRef = usersRef.doc(userId);

    await userRef.update({
      ...userData,
    });

    return { success: true };
  } catch (error) {
    return { error, success: false };
  }
};

export const updatePrivacy = async (userId, userData) => {
  try {
    const userRef = usersRef.doc(userId);

    await userRef.update({
      ...userData,
    });

    return { success: true };
  } catch (error) {
    return { error, success: false };
  }
};



export const subscribeUsers = (callback) => {
  return usersRef.onSnapshot((querySnapshot) => {
    const users = [];
    querySnapshot.forEach((doc) => {
      users.push(doc.data());
    });
    return callback(users);
  });
};

export const subscribeCurrentUser = (userId, callback) => {
  const ref = usersRef
    .where('id', '==', userId)
    .onSnapshot({ includeMetadataChanges: true }, (querySnapshot) => {
      const docs = querySnapshot.docs;
      if (docs.length > 0) {
        callback(docs[0].data());
      }
    });
  return ref;
};
// export const updateUserPostCount = (userID, count) => {
//   const data = {
//     authorID: userID,
//     count: count,
//   };

//   if (count === 1) {
//     data.createdAt = firebase.firestore.FieldValue.serverTimestamp();
//   }

//   try {
//     swipeCountRef.doc(userID).set(data, { merge: true });
//   } catch (error) {
//     console.log(error);
//   }
// };
