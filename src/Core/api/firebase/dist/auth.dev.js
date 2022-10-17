"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserByID = exports.updateUser = exports.fetchAndStorePushTokenIfPossible = exports.updateProfilePhoto = exports.registerWithPhoneNumber = exports.loginWithSMSCode = exports.sendSMSToPhoneNumber = exports.retrieveUserByPhone = exports.onVerificationChanged = exports.logout = exports.loginWithFacebook = exports.loginWithApple = exports.loginWithEmailAndPassword = exports.register = exports.checkUniqueUsername = exports.sendPasswordResetEmail = exports.retrievePersistedAuthUser = exports.tryAlternatePersistedAuthUserRetriever = void 0;

var _messaging = _interopRequireDefault(require("@react-native-firebase/messaging"));

var _auth = _interopRequireWildcard(require("@react-native-firebase/auth"));

var _ErrorCode = require("../../onboarding/utils/ErrorCode");

var _config = require("./config");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var usersRef = _config.firebase.firestore().collection("users"); // const usersRef = firebase.firestore().collection('swipes');


var handleUserFromAuthStateChanged = function handleUserFromAuthStateChanged(user, resolve) {
  if (user) {
    usersRef.doc(user.uid).get().then(function (document) {
      var userData = document.data();
      resolve(_objectSpread({}, userData, {
        id: user.uid,
        userID: user.uid
      }));
    })["catch"](function (error) {
      resolve(null);
    });
  } else {
    resolve(null);
  }
};

var tryAlternatePersistedAuthUserRetriever = function tryAlternatePersistedAuthUserRetriever(resolve) {
  _auth.firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      return handleUserFromAuthStateChanged(user, resolve);
    } else {
      resolve(null);
    }
  });
};

exports.tryAlternatePersistedAuthUserRetriever = tryAlternatePersistedAuthUserRetriever;

var retrievePersistedAuthUser = function retrievePersistedAuthUser() {
  return new Promise(function (resolve) {
    return _config.firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // if (user.emailVerified) {
        return handleUserFromAuthStateChanged(user, resolve); // } else {
        //   alert("Email Not Verify. please verify email and create login");
        //   return tryAlternatePersistedAuthUserRetriever(resolve);
        // }
      } else {
        return tryAlternatePersistedAuthUserRetriever(resolve);
      }
    });
  });
};

exports.retrievePersistedAuthUser = retrievePersistedAuthUser;

var sendPasswordResetEmail = function sendPasswordResetEmail(email) {
  _config.firebase.auth().sendPasswordResetEmail(email);
};

exports.sendPasswordResetEmail = sendPasswordResetEmail;

var signInWithCredential = function signInWithCredential(authManager, credential, appIdentifier) {
  return new Promise(function (resolve, _reject) {
    authManager.auth().signInWithCredential(credential).then(function (response) {
      var isNewUser = response.additionalUserInfo.isNewUser;
      var _response$additionalU = response.additionalUserInfo.profile,
          first_name = _response$additionalU.first_name,
          last_name = _response$additionalU.last_name;
      var _response$user = response.user,
          uid = _response$user.uid,
          email = _response$user.email,
          phoneNumber = _response$user.phoneNumber,
          photoURL = _response$user.photoURL;
      var defaultProfilePhotoURL = "https://www.iosapptemplates.com/wp-content/uploads/2019/06/empty-avatar.jpg";

      if (isNewUser) {
        var timestamp = _config.firebase.firestore.FieldValue.serverTimestamp();

        var userData = {
          id: uid,
          email: email || "",
          firstName: first_name || "",
          lastName: last_name || "",
          phone: phoneNumber || "",
          profilePictureURL: photoURL || defaultProfilePhotoURL,
          userID: uid,
          appIdentifier: appIdentifier,
          createdAt: timestamp
        };
        usersRef.doc(uid).set(userData).then(function () {
          resolve({
            user: _objectSpread({}, userData, {
              id: uid,
              userID: uid
            }),
            accountCreated: true
          });
        });
      }

      usersRef.doc(uid).get().then(function (document) {
        var userData = document.data();
        resolve({
          user: _objectSpread({}, userData, {
            id: uid,
            userID: uid
          }),
          accountCreated: false
        });
      });
    })["catch"](function (_error) {
      console.log(_error);
      resolve({
        error: _ErrorCode.ErrorCode.serverError
      });
    });
  });
};

var checkUniqueUsername = function checkUniqueUsername(username) {
  return new Promise(function (resolve) {
    usersRef.where("username", "==", username).get().then(function (querySnapshot) {
      if (querySnapshot.docs.length <= 0) {
        // doesn't exist
        resolve({
          isUnique: true
        });
      } else {
        // does exist
        resolve({
          taken: true
        });
      }
    })["catch"](function (error) {
      reject(error);
    });
  });
};

exports.checkUniqueUsername = checkUniqueUsername;

var register = function register(userDetails, appIdentifier) {
  var email = userDetails.email,
      firstName = userDetails.firstName,
      lastName = userDetails.lastName,
      username = userDetails.username,
      password = userDetails.password,
      phone = userDetails.phone,
      profilePictureURL = userDetails.profilePictureURL,
      location = userDetails.location,
      signUpLocation = userDetails.signUpLocation;
  return new Promise(function (resolve, _reject) {
    _config.firebase.auth().createUserWithEmailAndPassword(email, password).then(function (response) {
      var timestamp = _config.firebase.firestore.FieldValue.serverTimestamp();

      var uid = response.user.uid;
      var data = {
        id: uid,
        userID: uid,
        // legacy reasons
        email: email,
        firstName: firstName || "",
        lastName: lastName || "",
        username: username || "",
        phone: phone || "",
        profilePictureURL: profilePictureURL,
        location: location || "",
        signUpLocation: signUpLocation || "",
        appIdentifier: appIdentifier,
        createdAt: timestamp
      };
      usersRef.doc(uid).set(data).then(function () {
        resolve({
          user: data
        });
        response.user.sendEmailVerification();
        alert("Registration successfully done and check your mail");

        _config.firebase.auth().signOut();

        _auth.firebase.auth().signOut();
      })["catch"](function (error) {
        alert(error);
        resolve({
          error: _ErrorCode.ErrorCode.serverError
        });
      });
    })["catch"](function (error) {
      //alert("error => ", error);
      console.log("_error:", error);
      var errorCode = _ErrorCode.ErrorCode.serverError;

      if (error.code === "auth/email-already-in-use") {
        errorCode = _ErrorCode.ErrorCode.emailInUse;
      }

      resolve({
        error: errorCode
      });
    });
  });
};

exports.register = register;

var loginWithEmailAndPassword = function loginWithEmailAndPassword(email, password) {
  return regeneratorRuntime.async(function loginWithEmailAndPassword$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", new Promise(function (resolve, reject) {
            _config.firebase.auth().signInWithEmailAndPassword(email, password).then(function (response) {
              _config.firebase.auth().onAuthStateChanged(function (user) {
                if (response.user.emailVerified) {
                  var uid = response.user.uid;
                  var userData = {
                    email: email,
                    password: password,
                    id: uid
                  };
                  usersRef.doc(uid).get().then(function (firestoreDocument) {
                    if (!firestoreDocument.exists) {
                      resolve({
                        errorCode: _ErrorCode.ErrorCode.noUser
                      });
                      return;
                    }

                    var user = firestoreDocument.data();

                    var newUserData = _objectSpread({}, userData, {}, user);

                    resolve({
                      user: newUserData
                    });
                  })["catch"](function (_error) {
                    console.log("_error:", _error);
                    resolve({
                      error: _ErrorCode.ErrorCode.serverError
                    });
                  });
                } else {
                  _config.firebase.auth().signOut();

                  _auth.firebase.auth().signOut();

                  resolve({
                    error: "true"
                  });
                }
              });
            })["catch"](function (error) {
              console.log("error:", error);
              var errorCode = _ErrorCode.ErrorCode.serverError;

              switch (error.code) {
                case 'auth/empty-email && auth/empty-password':
                  errorCode = _ErrorCode.emailpasswordInuse

                case 'auth/wrong-email':
                  errorCode = _ErrorCode.invalidEmail

                case "auth/wrong-password":
                  errorCode = _ErrorCode.ErrorCode.invalidPassword;
                  break;

                case "auth/network-request-failed":
                  errorCode = _ErrorCode.ErrorCode.serverError;
                  break;

                case "auth/user-not-found":
                  errorCode = _ErrorCode.ErrorCode.noUser;
                  break;

                default:
                  errorCode = _ErrorCode.ErrorCode.serverError;
              }

              resolve({
                error: errorCode
              });
            });
          }));

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.loginWithEmailAndPassword = loginWithEmailAndPassword;

var loginWithApple = function loginWithApple(identityToken, nonce, appIdentifier) {
  var appleCredential = _auth.firebase.auth.AppleAuthProvider.credential(identityToken, nonce);

  return new Promise(function (resolve, _reject) {
    signInWithCredential(_auth.firebase, appleCredential, appIdentifier).then(function (response) {
      resolve(response);
    });
  });
};

exports.loginWithApple = loginWithApple;

var loginWithFacebook = function loginWithFacebook(accessToken, appIdentifier) {
  var credential = _config.firebase.auth.FacebookAuthProvider.credential(accessToken);

  return new Promise(function (resolve, _reject) {
    signInWithCredential(_config.firebase, credential, appIdentifier).then(function (response) {
      resolve(response);
    });
  });
};

exports.loginWithFacebook = loginWithFacebook;

var logout = function logout() {
  _config.firebase.auth().signOut();

  _auth.firebase.auth().signOut();
};

exports.logout = logout;

var onVerificationChanged = function onVerificationChanged(phone) {
  (0, _auth["default"])().verifyPhoneNumber(phone).on("state_changed", function (phoneAuthSnapshot) {
    console.log("State: ", phoneAuthSnapshot.state);
  }, function (error) {
    console.error(error);
  }, function (phoneAuthSnapshot) {
    console.log(phoneAuthSnapshot);
  });
};

exports.onVerificationChanged = onVerificationChanged;

var retrieveUserByPhone = function retrieveUserByPhone(phone) {
  return new Promise(function (resolve) {
    usersRef.where("phone", "==", phone).onSnapshot(function (querySnapshot) {
      if (querySnapshot.docs.length <= 0) {
        resolve({
          error: true
        });
      } else {
        resolve({
          success: true
        });
      }
    });
  });
};

exports.retrieveUserByPhone = retrieveUserByPhone;

var sendSMSToPhoneNumber = function sendSMSToPhoneNumber(phoneNumber, captchaVerifier) {
  return new Promise(function (resolve, _reject) {
    _config.firebase.auth().signInWithPhoneNumber(phoneNumber, captchaVerifier).then(function (confirmationResult) {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      resolve({
        confirmationResult: confirmationResult
      });
    })["catch"](function (_error) {
      console.log(_error);
      console.warn(_error);
      resolve({
        error: _ErrorCode.ErrorCode.smsNotSent
      });
    });
  });
};

exports.sendSMSToPhoneNumber = sendSMSToPhoneNumber;

var loginWithSMSCode = function loginWithSMSCode(smsCode, verificationID) {
  var credential = _config.firebase.auth.PhoneAuthProvider.credential(verificationID, smsCode);

  return new Promise(function (resolve, _reject) {
    _config.firebase.auth().signInWithCredential(credential).then(function (result) {
      var user = result.user;
      usersRef.doc(user.uid).get().then(function (firestoreDocument) {
        if (!firestoreDocument.exists) {
          resolve({
            errorCode: _ErrorCode.ErrorCode.noUser
          });
          return;
        }

        var userData = firestoreDocument.data();
        resolve({
          user: userData
        });
      })["catch"](function (_error) {
        resolve({
          error: _ErrorCode.ErrorCode.serverError
        });
      });
    })["catch"](function (_error) {
      resolve({
        error: _ErrorCode.ErrorCode.invalidSMSCode
      });
    });
  });
};

exports.loginWithSMSCode = loginWithSMSCode;

var registerWithPhoneNumber = function registerWithPhoneNumber(userDetails, smsCode, verificationID, appIdentifier) {
  var firstName = userDetails.firstName,
      lastName = userDetails.lastName,
      username = userDetails.username,
      phone = userDetails.phone,
      profilePictureURL = userDetails.profilePictureURL,
      location = userDetails.location,
      signUpLocation = userDetails.signUpLocation;

  var credential = _config.firebase.auth.PhoneAuthProvider.credential(verificationID, smsCode);

  return new Promise(function (resolve, _reject) {
    _config.firebase.auth().signInWithCredential(credential).then(function (response) {
      var timestamp = _config.firebase.firestore.FieldValue.serverTimestamp();

      var uid = response.user.uid;
      var data = {
        id: uid,
        userID: uid,
        // legacy reasons
        firstName: firstName || "",
        lastName: lastName || "",
        username: username || "",
        phone: phone,
        profilePictureURL: profilePictureURL,
        location: location || "",
        signUpLocation: signUpLocation || "",
        appIdentifier: appIdentifier,
        createdAt: timestamp
      };
      usersRef.doc(uid).set(data).then(function () {
        resolve({
          user: data
        });
      });
    })["catch"](function (error) {
      console.log(error);
      var errorCode = _ErrorCode.ErrorCode.serverError;

      if (error.code === "auth/email-already-in-use") {
        errorCode = _ErrorCode.ErrorCode.emailInUse;
      }

      resolve({
        error: errorCode
      });
    });
  });
};

exports.registerWithPhoneNumber = registerWithPhoneNumber;

var updateProfilePhoto = function updateProfilePhoto(userID, profilePictureURL) {
  return new Promise(function (resolve, _reject) {
    usersRef.doc(userID).update({
      profilePictureURL: profilePictureURL
    }).then(function () {
      resolve({
        success: true
      });
    })["catch"](function (error) {
      resolve({
        error: error
      });
    });
  });
};

exports.updateProfilePhoto = updateProfilePhoto;

var fetchAndStorePushTokenIfPossible = function fetchAndStorePushTokenIfPossible(user) {
  var settings, token;
  return regeneratorRuntime.async(function fetchAndStorePushTokenIfPossible$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap((0, _messaging["default"])().requestPermission());

        case 3:
          settings = _context2.sent;
          console.log("settings => ", settings);

          if (!settings) {
            _context2.next = 11;
            break;
          }

          _context2.next = 8;
          return regeneratorRuntime.awrap((0, _messaging["default"])().getToken());

        case 8:
          token = _context2.sent;
          console.log("token => ", token);
          updateUser(user.id || user.userID, {
            pushToken: token,
            pushKitToken: "",
            badgeCount: 0
          });

        case 11:
          _context2.next = 16;
          break;

        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);

        case 16:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 13]]);
};

exports.fetchAndStorePushTokenIfPossible = fetchAndStorePushTokenIfPossible;

var updateUser = function updateUser(userID, newData) {
  var dataWithOnlineStatus;
  return regeneratorRuntime.async(function updateUser$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          dataWithOnlineStatus = _objectSpread({}, newData, {
            lastOnlineTimestamp: _config.firebase.firestore.FieldValue.serverTimestamp()
          });
          _context3.next = 3;
          return regeneratorRuntime.awrap(usersRef.doc(userID).set(_objectSpread({}, dataWithOnlineStatus), {
            merge: true
          }));

        case 3:
          return _context3.abrupt("return", _context3.sent);

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.updateUser = updateUser;

var getUserByID = function getUserByID(userID) {
  var document;
  return regeneratorRuntime.async(function getUserByID$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(usersRef.doc(userID).get());

        case 3:
          document = _context4.sent;

          if (!document) {
            _context4.next = 6;
            break;
          }

          return _context4.abrupt("return", document.data());

        case 6:
          return _context4.abrupt("return", null);

        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);
          return _context4.abrupt("return", null);

        case 13:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

exports.getUserByID = getUserByID;