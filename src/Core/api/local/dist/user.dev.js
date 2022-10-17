"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.subscribeCurrentUser = exports.subscribeUsers = exports.updateUserData = exports.getUserData = void 0;

var _localData = require("../../onboarding/utils/api/local/localData");

/**
 * Implement These Methods If You Are Adding Your Own Custom Backend
 */

/**Get user data
 *
 * @param {String} userId the user id of the current user
 */
var getUserData = function getUserData(userId) {
  return regeneratorRuntime.async(function getUserData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", {
            data: _localData.mockData,
            success: true
          });

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};
/**
 * Update user data
 *
 * @param {String} userId the id of the current user
 * @param {String} userData the user Data of the current user
 */


exports.getUserData = getUserData;

var updateUserData = function updateUserData(userId, userData) {
  return regeneratorRuntime.async(function updateUserData$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", {
            success: true
          });

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
};
/**
 * Subscribe to users
 *
 * @param {function} callback a callback that is called when the user data changes on the users backend
 */


exports.updateUserData = updateUserData;

var subscribeUsers = function subscribeUsers(callback) {
  var ref = null; // object that will  be used to unsubscribed from the listener
  // listener always call callback(users) whenever there's a change in the user table

  callback([_localData.mockData]);
  return ref; //this object unsubscribes from the event
};
/**
 * Subscribe to the changes on current users' data
 *
 * @param {String} userId the user id
 * @param {function} callback a callback that is called when the user data changes on the users backend
 */


exports.subscribeUsers = subscribeUsers;

var subscribeCurrentUser = function subscribeCurrentUser(userId, callback) {
  var ref = null; //object that will  be used to unsubscribed from the listener
  // listener always call callback(users) whenever there's a change in the user table

  callback([_localData.mockData]);
  return ref; //this object unsubscribes from the event
};

exports.subscribeCurrentUser = subscribeCurrentUser;