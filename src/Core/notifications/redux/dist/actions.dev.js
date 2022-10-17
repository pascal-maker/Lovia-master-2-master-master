"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setNotificationListenerDidSubscribe = exports.setNotifications = void 0;

var _types = _interopRequireDefault(require("./types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var setNotifications = function setNotifications(data) {
  return {
    type: _types["default"].SET_NOTIFICATIONS,
    data: data
  };
};

exports.setNotifications = setNotifications;

var setNotificationListenerDidSubscribe = function setNotificationListenerDidSubscribe() {
  return {
    type: _types["default"].DID_SUBSCRIBE
  };
};

exports.setNotificationListenerDidSubscribe = setNotificationListenerDidSubscribe;