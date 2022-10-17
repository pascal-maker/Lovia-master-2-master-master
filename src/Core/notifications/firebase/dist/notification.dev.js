"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateNotification = exports.subscribeNotifications = exports.notificationsRef = void 0;

var _config = require("../../api/firebase/config");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var notificationsRef = _config.firebase.firestore().collection('notifications');

exports.notificationsRef = notificationsRef;

var subscribeNotifications = function subscribeNotifications(userId, callback) {
  return notificationsRef.where('toUserID', '==', userId).orderBy('createdAt', 'desc').limit(100).onSnapshot(function (notificationSnapshot) {
    var notifications = [];
    notificationSnapshot.forEach(function (notificationDoc) {
      var notification = notificationDoc.data();
      notification.id = notificationDoc.id;
      notifications.push(notification);
    });
    callback(notifications);
  }, function (error) {
    console.log(error);
    alert(error);
  });
};

exports.subscribeNotifications = subscribeNotifications;

var updateNotification = function updateNotification(notification) {
  return regeneratorRuntime.async(function updateNotification$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(notificationsRef.doc(notification.id).update(_objectSpread({}, notification)));

        case 3:
          return _context.abrupt("return", {
            success: true
          });

        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          return _context.abrupt("return", {
            error: _context.t0,
            success: false
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 6]]);
};

exports.updateNotification = updateNotification;