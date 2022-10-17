"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _localData = require("./localData");

/**
 * Implement These Methods If You Are Adding Your Own Custom Backend
 */

/**
 * A method that logs the user into his account
 * Parameters
 * @username - The user's username
 * @password - The user's password
 *
 * returns a promise that resolves to user data
 **/
var loginWithEmailAndPassword = function loginWithEmailAndPassword(email, password) {
  return new Promise(function (resolve, _reject) {
    resolve({
      user: _localData.mockData
    }); // morkData takes the format of:
    // const mockData = {
    //   id,
    //   userID,
    //   stripeCustomerID,
    //   phone,
    //   email,
    //   firstName,
    //   lastName,
    //   profilePictureURL,
    // };
  });
};
/**
 * A method that creates a new user using email and password
 * Parameters
 * @userDetails - The user details submitted by the user
 * format of userDetials:
 * const userDetails = {
 *     id,
 *     userID,
 *     stripeCustomerID,
 *     phone,
 *     email,
 *     firstName,
 *     lastName,
 *     profilePictureURL,
 *     ...
 *  };
 * @appConfig - config containing details of he app
 *
 * format of config:
 *
 * const config = {
 *    isSMSAuthEnabled: true,
 *    isUIOnlyVariantEnabled: true,
 *    isFirebaseBackendEnabled: false,
 *    appIdentifier: 'rn-messenger-android',
 *    ...
 * }
 *
 * returns a promise that resolves to user data
 **/


var createAccountWithEmailAndPassword = function createAccountWithEmailAndPassword(userDetails, appConfig) {
  return new Promise(function (resolve, _reject) {
    resolve({
      user: _localData.mockData
    }); // morkData takes the format of:
    // const mockData = {
    //   id,
    //   userID,
    //   stripeCustomerID,
    //   phone,
    //   email,
    //   firstName,
    //   lastName,
    //   profilePictureURL,
    // };
  });
};
/**
 * Registers users using Facebook gateway
 *
 * @appConfig - config containing details of he app
 *
 * format of config:
 *
 * const config = {
 *    isSMSAuthEnabled: true,
 *    isUIOnlyVariantEnabled: true,
 *    isFirebaseBackendEnabled: false,
 *    appIdentifier: 'rn-messenger-android',
 *    ...
 * }
 * returns a promise that resolves to user data
 **/


var loginOrSignUpWithFacebook = function loginOrSignUpWithFacebook(appConfig) {
  return new Promise(function (resolve, _reject) {
    resolve({
      user: _localData.mockData
    }); // morkData takes the format of:
    // const mockData = {
    //   id,
    //   userID,
    //   stripeCustomerID,
    //   phone,
    //   email,
    //   firstName,
    //   lastName,
    //   profilePictureURL,
    // };
  });
};
/**
 * A method that creates a new user using facebook gateway
 *
 * @appConfig - config containing details of he app
 *
 * format of config:
 *
 * const config = {
 *    isSMSAuthEnabled: true,
 *    isUIOnlyVariantEnabled: true,
 *    isFirebaseBackendEnabled: false,
 *    appIdentifier: 'rn-messenger-android',
 *    ...
 * }
 *
 * returns a promise that resolves to user data
 **/


var loginOrSignUpWithApple = function loginOrSignUpWithApple() {
  return new Promise(function (resolve, _reject) {
    resolve({
      user: _localData.mockData
    }); // morkData takes the format of:
    // const mockData = {
    //   id,
    //   userID,
    //   stripeCustomerID,
    //   phone,
    //   email,
    //   firstName,
    //   lastName,
    //   profilePictureURL,
    // };
  });
};
/**
 * Send out a password reset to the user's email
 * Parameters
 * @email - The user's email
 *
 * returns a promise that resolves to user data
 **/


var sendPasswordResetEmail = function sendPasswordResetEmail(email) {
  return {};
};
/**
 * Login using the SMS code
 *
 * returns a promise that resolves to user data
 **/


var loginWithSMSCode = function loginWithSMSCode() {
  return new Promise(function (resolve, _reject) {
    resolve({
      user: _localData.mockData
    }); // morkData takes the format of:
    // const mockData = {
    //   id,
    //   userID,
    //   stripeCustomerID,
    //   phone,
    //   email,
    //   firstName,
    //   lastName,
    //   profilePictureURL,
    // };
  });
};
/*
 ** Logout out of the app
 **
 ** returns a promise that resolves to user data
 */


var logout = function logout() {};

var retrievePersistedAuthUser = function retrievePersistedAuthUser() {
  return new Promise(function (resolve) {
    resolve(null);
  });
};

var validateUsernameFieldIfNeeded = function validateUsernameFieldIfNeeded(inputFields, appConfig) {
  return new Promise(function (resolve, reject) {
    resolve({
      success: true
    }); // Error format:
    // resolve({ error: IMLocalized('Invalid username') });
  });
};

var localAuthManager = {
  loginWithEmailAndPassword: loginWithEmailAndPassword,
  createAccountWithEmailAndPassword: createAccountWithEmailAndPassword,
  loginOrSignUpWithFacebook: loginOrSignUpWithFacebook,
  loginOrSignUpWithApple: loginOrSignUpWithApple,
  loginWithSMSCode: loginWithSMSCode,
  sendPasswordResetEmail: sendPasswordResetEmail,
  logout: logout,
  retrievePersistedAuthUser: retrievePersistedAuthUser,
  validateUsernameFieldIfNeeded: validateUsernameFieldIfNeeded
};
var _default = localAuthManager;
exports["default"] = _default;