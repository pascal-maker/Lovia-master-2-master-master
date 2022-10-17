"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserByID = exports.updateUser = exports.fetchAndStorePushTokenIfPossible = exports.updateProfilePhoto = exports.registerWithPhoneNumber = exports.loginWithSMSCode = exports.sendSMSToPhoneNumber = exports.retrieveUserByPhone = exports.onVerificationChanged = exports.logout = exports.loginWithFacebook = exports.loginWithApple = exports.loginWithEmailAndPassword = exports.register = exports.sendPasswordResetEmail = exports.retrievePersistedAuthUser = exports.tryAlternatePersistedAuthUserRetriever = void 0;

var _localData = require("../../onboarding/utils/api/local/localData");

/**
 * Implement These Methods If You Are Adding Your Own Custom Backend
 */

/**
 * Determine whether the user is in the database
 *
 * @param {object} user - this is a user object
 * const mockData = {
 *    id,
 *    userID,
 *    stripeCustomerID,
 *    phone,
 *    email,
 *    firstName,
 *    lastName,
 *    profilePictureURL,
 *  };
 * @param {function} resolve this callback get invoked after the auth state of the user has been determined
 */
var handleUserFromAuthStateChanged = function handleUserFromAuthStateChanged(user, resolve) {
  //if user is in our database in call resolve({ ...userData, id: user.uid, userID: user.uid });
  //if user object is null or the user is not logged in then resolve(null)
  resolve({
    user: _localData.mockData
  });
};
/**
 * this function tries to retrieve persisted user from other auth providers e.g Firebase, facebook, apple
 *
 * @param {function} resolve
 */


var tryAlternatePersistedAuthUserRetriever = function tryAlternatePersistedAuthUserRetriever(resolve) {
  // verify user is in on the current device and the user exists on our database
  // if success call resolve({ ...userData, id: user.uid, userID: user.uid });
  // if error call resolve(null)
  resolve({
    user: _localData.mockData
  });
};
/**
 * Verify that the user is logged in on that device
 */


exports.tryAlternatePersistedAuthUserRetriever = tryAlternatePersistedAuthUserRetriever;

var retrievePersistedAuthUser = function retrievePersistedAuthUser() {
  // return a promise
  return new Promise(function (resolve) {
    // retrieve saved user from local storage and verify that the user....
    //   is saved in our database for all auth providers
    // if success call resolve({ ...userData, id: user.uid, userID: user.uid });
    // if error call resolve(null)
    resolve(_localData.mockData);
  });
};
/**
 * Send password reset to user
 *
 * @param {String} email email of the user retrieving password
 */


exports.retrievePersistedAuthUser = retrievePersistedAuthUser;

var sendPasswordResetEmail = function sendPasswordResetEmail(email) {//send password reset email
};
/**
 * Sign in with Credential || for apple and facebook auth providers
 *
 * @param {object} authManager the is the injected authmanager in the app
 * @param {object} credential object containing email and password
 * @param {String} appIdentifier the app identifier
 */


exports.sendPasswordResetEmail = sendPasswordResetEmail;

var signInWithCredential = function signInWithCredential(authManager, credential, appIdentifier) {
  // return a promise
  return new Promise(function (resolve, _reject) {
    // log into the app
    // if user is a new user register
    // then log the user in
    // if success call
    // resolve({
    //      user: { ...userData, id: uid, userID: uid },
    //      accountCreated: true, //accountCreated can be "false", if the user exists already
    // });
    // or
    // resolve({ error: ErrorCode.serverError });
    resolve({
      user: _localData.mockData
    });
  });
};
/**
 * Register user
 * 
 * @param {object} [userDetails] user details
 * {
    email,
    firstName,
    lastName,
    password,
    phone,
    profilePictureURL,
    location,
    signUpLocation,
  }
 * @param {Strng} appIdentifier app identifier of the app
 */


var register = function register(userDetails, appIdentifier) {
  // return a promise
  return new Promise(function (resolve, _reject) {
    // register the user in the database
    // if successful resolve({ user: data });
    // if error call resolve({ error: ErrorCode.[the correct error code] });
    resolve({
      user: _localData.mockData
    });
  });
};
/**
 * Login with email and password
 *
 * @param {String} email the email of current user
 * @param {String} password the password of current user
 */


exports.register = register;

var loginWithEmailAndPassword = function loginWithEmailAndPassword(email, password) {
  return regeneratorRuntime.async(function loginWithEmailAndPassword$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", new Promise(function (resolve, reject) {
            // log into the app
            // if success call
            // resolve({ user: newUserData });
            // or
            // resolve({ error: ErrorCode.[the correct error code] });
            // resolve({user: mockData})
            resolve({
              user: _localData.mockData
            });
          }));

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};
/**
 * Login with Apple
 *
 * @param {String} identityToken app identity token
 * @param {String} nonce secret key string for apple login
 * @param {String} appIdentifier the app identifier
 */


exports.loginWithEmailAndPassword = loginWithEmailAndPassword;

var loginWithApple = function loginWithApple(identityToken, nonce, appIdentifier) {
  // initialize apple credential
  var appleCredential = null; // return a promise

  return new Promise(function (resolve, _reject) {
    // sign in with credential
    // resolve(response)
    // reponse format:
    // {
    //     user: { ...userData, id: uid, userID: uid },
    //     accountCreated: true, //accountCreated can be "false", if the user exists already
    // };
    // or
    // { error: ErrorCode.serverError };
    resolve({
      user: _localData.mockData
    });
  });
};
/**
 * Login with Facebook
 *
 * @param {String} accessToken app access token
 * @param {String} appIdentifier app identify
 */


exports.loginWithApple = loginWithApple;

var loginWithFacebook = function loginWithFacebook(accessToken, appIdentifier) {
  // initialize facebook credential
  var credential = null; // return a promise

  return new Promise(function (resolve, _reject) {
    // sign in with credential
    // resolve(response)
    // reponse format:
    // {
    //     user: { ...userData, id: uid, userID: uid },
    //     accountCreated: true, //accountCreated can be "false", if the user exists already
    // };
    // or
    // { error: ErrorCode.serverError };
    resolve({
      user: _localData.mockData
    });
  });
};
/**
 * Logout of the device
 */


exports.loginWithFacebook = loginWithFacebook;

var logout = function logout() {// sign out of app for all auth providers
};
/**
 * A listener that verifies the user's phone number
 *
 * @param {String} phone phone number being verified
 */


exports.logout = logout;

var onVerificationChanged = function onVerificationChanged(phone) {//optional
  // listen on and verify user's
};
/**
 * Retrieve user from database using phone number
 *
 * @param {String} phone user's phone number being retreived
 */


exports.onVerificationChanged = onVerificationChanged;

var retrieveUserByPhone = function retrieveUserByPhone(phone) {
  // return a promise
  return new Promise(function (resolve) {
    // check if the user is logged using phone number
    // call resolve({ error: true }); or
    // call resolve({ success: true });
    resolve({
      error: true
    });
  });
};
/**
 * Send SMS to phone number
 *
 * @param {String} phoneNumber the user's phone number
 * @param {object} captchaVerifier this is used for captcha verification
 */


exports.retrieveUserByPhone = retrieveUserByPhone;

var sendSMSToPhoneNumber = function sendSMSToPhoneNumber(phoneNumber, captchaVerifier) {
  // return a promise
  return new Promise(function (resolve, _reject) {// send sms to user
    // call resolve({ confirmationResult });
    // confirmationResult takes the format: {verificationID: string}
    // resolve({ error: ErrorCode.smsNotSent });
  });
};
/**
 * Login with SMS
 *
 * @param {String} smsCode SMS code sent to the user's phone
 * @param {String} verificationID Verification id of from the backend
 */


exports.sendSMSToPhoneNumber = sendSMSToPhoneNumber;

var loginWithSMSCode = function loginWithSMSCode(smsCode, verificationID) {
  // initialize phone credential
  var credential = null; // return a promise

  return new Promise(function (resolve, _reject) {
    // login with SMS
    // if successful call resolve({user: userData }); or
    // resolve({ error: ErrorCode.[the correct error code] });
    resolve({
      user: _localData.mockData
    });
  });
};
/**
 * Register user with Phone number
 * 
 * @param {String} userDetails an object containing user details
 * userDetails:
 * {
    firstName,
    lastName,
    phone,
    profilePictureURL,
    location,
    signUpLocation,
  }
 * @param {String} smsCode sent to the user
 * @param {String} verificationID the verification ID received from the backend
 * @param {String} appIdentifier the appIdentifier
 */


exports.loginWithSMSCode = loginWithSMSCode;

var registerWithPhoneNumber = function registerWithPhoneNumber(userDetails, smsCode, verificationID, appIdentifier) {
  // return a promise
  return new Promise(function (resolve, _reject) {
    // register user using user data
    // if successful resolve({ user: data }); or
    // resolve({ error: ErrorCode.[the correct error code] });
    resolve({
      user: _localData.mockData
    });
  });
};
/**
 * Update profile picture
 *
 * @param {String} userID user id of current user
 * @param {String} profilePictureURL profile picture of current user
 */


exports.registerWithPhoneNumber = registerWithPhoneNumber;

var updateProfilePhoto = function updateProfilePhoto(userID, profilePictureURL) {
  // return a promise
  return new Promise(function (resolve, _reject) {
    // update profile picture
    // if success call resolve({ success: true });
    // resolve({ error: error });
    resolve({
      success: true
    });
  });
};
/**
 * Fetch push token from device and store
 *
 * @param {String} user the user object of the current user
 */


exports.updateProfilePhoto = updateProfilePhoto;

var fetchAndStorePushTokenIfPossible = function fetchAndStorePushTokenIfPossible(user) {
  return regeneratorRuntime.async(function fetchAndStorePushTokenIfPossible$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
        case "end":
          return _context2.stop();
      }
    }
  });
};
/**
 *
 * @param {String} userID
 * @param {object} newData object containing new user Data
 * e.g
 * { pushKitToken: token }
 */


exports.fetchAndStorePushTokenIfPossible = fetchAndStorePushTokenIfPossible;

var updateUser = function updateUser(userID, newData) {
  return regeneratorRuntime.async(function updateUser$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          return _context3.abrupt("return", {
            user: _localData.mockData
          });

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
};
/**
 * Fetch user Data by user ID
 *
 * @param {String} userID user id of current user
 */


exports.updateUser = updateUser;

var getUserByID = function getUserByID(userID) {
  return regeneratorRuntime.async(function getUserByID$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          return _context4.abrupt("return", _localData.mockData);

        case 1:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.getUserByID = getUserByID;