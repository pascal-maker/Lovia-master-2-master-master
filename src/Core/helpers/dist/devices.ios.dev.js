"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.size = exports.scale = void 0;

var _reactNative = require("react-native");

var device = _reactNative.Dimensions.get('window');

var calculatedScale;

switch (device.width) {
  // iPhone 4, 4S, 5, 5S
  case 320:
    calculatedScale = 0.77;
    break;
  // iPhone 6, 6S

  case 375:
    calculatedScale = 0.902;
    break;
  // iPhone 6 plus, 6S plus

  case 414:
    calculatedScale = 1;
    break;

  default:
    calculatedScale = 1;
}

var scale = calculatedScale;
exports.scale = scale;

var size = function size(pixel) {
  return Math.ceil(pixel * calculatedScale);
};

exports.size = size;