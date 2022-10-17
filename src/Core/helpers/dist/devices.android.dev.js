"use strict";

var _reactNative = require("react-native");

var device = _reactNative.Dimensions.get('window');

var scale;

if (device.width <= 414) {
  // Android smartphones
  scale = device.width / 414;
} else {
  // Android tablets
  scale = 1;
}

module.exports = {
  scale: scale,
  size: function size(pixel) {
    return Math.ceil(pixel * scale);
  }
};