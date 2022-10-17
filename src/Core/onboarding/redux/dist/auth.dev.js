"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.auth = exports.logout = exports.setUserData = exports.DUMMY_USER_DATA = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var UPDATE_USER = 'UPDATE_USER';
var LOG_OUT = 'LOG_OUT';
var DUMMY_USER_DATA = {};
exports.DUMMY_USER_DATA = DUMMY_USER_DATA;

var setUserData = function setUserData(data) {
  return {
    type: UPDATE_USER,
    data: data
  };
};

exports.setUserData = setUserData;

var logout = function logout() {
  return {
    type: LOG_OUT
  };
};

exports.logout = logout;
var initialState = {
  user: DUMMY_USER_DATA
};

var auth = function auth() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case UPDATE_USER:
      return _objectSpread({}, state, {
        user: action.data.user
      });

    case LOG_OUT:
      {
        return initialState;
      }

    default:
      return state;
  }
};

exports.auth = auth;