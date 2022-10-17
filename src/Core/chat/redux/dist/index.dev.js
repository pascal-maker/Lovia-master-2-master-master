"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chat = exports.setChannelsSubcribed = exports.setChannels = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SET_CHANNELS = 'SET_CHANNELS';
var SET_CHANNELS_SUBCRIBED = 'SET_CHANNELS_SUBCRIBED';

var setChannels = function setChannels(data) {
  return {
    type: SET_CHANNELS,
    data: data
  };
};

exports.setChannels = setChannels;

var setChannelsSubcribed = function setChannelsSubcribed(data) {
  return {
    type: SET_CHANNELS_SUBCRIBED,
    data: data
  };
};

exports.setChannelsSubcribed = setChannelsSubcribed;
var initialState = {
  channels: null,
  areChannelsSubcribed: false
};

var chat = function chat() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case SET_CHANNELS_SUBCRIBED:
      return _objectSpread({}, state, {
        areChannelsSubcribed: action.data
      });

    case SET_CHANNELS:
      return _objectSpread({}, state, {
        channels: _toConsumableArray(action.data)
      });

    case 'LOG_OUT':
      return initialState;

    default:
      return state;
  }
};

exports.chat = chat;