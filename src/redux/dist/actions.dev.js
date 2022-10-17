"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setSwipesListenerDidSubscribe = exports.setIncomingSwipes = exports.setMatches = exports.setSwipes = void 0;

var _types = _interopRequireDefault(require("./types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var setSwipes = function setSwipes(data) {
  return {
    type: _types["default"].SET_SWIPES,
    data: data
  };
};

exports.setSwipes = setSwipes;

var setMatches = function setMatches(data) {
  return {
    type: _types["default"].SET_MATCHES,
    data: data
  };
};

exports.setMatches = setMatches;

var setIncomingSwipes = function setIncomingSwipes(data) {
  return {
    type: _types["default"].SET_INCOMING_SWIPES,
    data: data
  };
};

exports.setIncomingSwipes = setIncomingSwipes;

var setSwipesListenerDidSubscribe = function setSwipesListenerDidSubscribe() {
  return {
    type: _types["default"].DID_SUBSCRIBE_TO_SWIPES
  };
};

exports.setSwipesListenerDidSubscribe = setSwipesListenerDidSubscribe;