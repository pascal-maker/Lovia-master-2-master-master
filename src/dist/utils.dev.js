"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserAwareCanUndoAsync = exports.isDatingProfileCompleteForUser = void 0;

var _reactNative = require("react-native");

var AWARE_CAN_UNDO_SWIPE = 'AWARE_CAN_UNDO_SWIPE';

var isDatingProfileCompleteForUser = function isDatingProfileCompleteForUser(user) {
  return user.profilePictureURL && user.profilePictureURL.length > 0 && user.age && user.bio && user.school && user.firstName;
};

exports.isDatingProfileCompleteForUser = isDatingProfileCompleteForUser;

var getUserAwareCanUndoAsync = function getUserAwareCanUndoAsync() {
  var isUserAware;
  return regeneratorRuntime.async(function getUserAwareCanUndoAsync$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_reactNative.AsyncStorage.getItem(AWARE_CAN_UNDO_SWIPE));

        case 2:
          isUserAware = _context.sent;

          if (!(isUserAware !== null)) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", true);

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(_reactNative.AsyncStorage.setItem(AWARE_CAN_UNDO_SWIPE, 'true'));

        case 9:
          return _context.abrupt("return", false);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.getUserAwareCanUndoAsync = getUserAwareCanUndoAsync;