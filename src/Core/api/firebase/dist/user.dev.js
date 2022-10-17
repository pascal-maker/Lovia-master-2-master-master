"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.subscribeCurrentUser = exports.subscribeUsers = exports.updateUserData = exports.getUserData = exports.usersRef = void 0;

var _config = require("./config");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var usersRef = _config.firebase.firestore().collection('users');

exports.usersRef = usersRef;

var getUserData = function getUserData(userId) {
  var user;
  return regeneratorRuntime.async(function getUserData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(usersRef.doc(userId).get());

        case 3:
          user = _context.sent;
          return _context.abrupt("return", {
            data: _objectSpread({}, user.data(), {
              id: user.id
            }),
            success: true
          });

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          return _context.abrupt("return", {
            error: 'Oops! an error occurred. Please try again',
            success: false
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.getUserData = getUserData;

var updateUserData = function updateUserData(userId, userData) {
  var userRef;
  return regeneratorRuntime.async(function updateUserData$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          userRef = usersRef.doc(userId);
          _context2.next = 4;
          return regeneratorRuntime.awrap(userRef.update(_objectSpread({}, userData)));

        case 4:
          return _context2.abrupt("return", {
            success: true
          });

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", {
            error: _context2.t0,
            success: false
          });

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.updateUserData = updateUserData;

var subscribeUsers = function subscribeUsers(callback) {
  return usersRef.onSnapshot(function (querySnapshot) {
    var users = [];
    querySnapshot.forEach(function (doc) {
      users.push(doc.data());
    });
    return callback(users);
  });
};

exports.subscribeUsers = subscribeUsers;

var subscribeCurrentUser = function subscribeCurrentUser(userId, callback) {
  var ref = usersRef.where('id', '==', userId).onSnapshot({
    includeMetadataChanges: true
  }, function (querySnapshot) {
    var docs = querySnapshot.docs;

    if (docs.length > 0) {
      callback(docs[0].data());
    }
  });
  return ref;
};

exports.subscribeCurrentUser = subscribeCurrentUser;