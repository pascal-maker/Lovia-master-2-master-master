"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setBannedUserIDs = void 0;

var _types = _interopRequireDefault(require("./types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var setBannedUserIDs = function setBannedUserIDs(data) {
  return {
    type: _types["default"].SET_BANNED_USER_IDS,
    data: data
  };
};

exports.setBannedUserIDs = setBannedUserIDs;