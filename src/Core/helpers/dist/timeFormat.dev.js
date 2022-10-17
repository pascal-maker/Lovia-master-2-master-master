"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timeFormat = void 0;

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var timeFormat = function timeFormat(timeStamp) {
  if (timeStamp) {
    if ((0, _moment["default"])(timeStamp).isValid()) {
      return _moment["default"].unix(timeStamp).fromNow();
    }

    if ((0, _moment["default"])().diff(_moment["default"].unix(timeStamp.seconds), 'days') == 0) {
      return _moment["default"].unix(timeStamp.seconds).format('H:mm');
    }

    return _moment["default"].unix(timeStamp.seconds).fromNow();
  }

  return ' ';
};

exports.timeFormat = timeFormat;