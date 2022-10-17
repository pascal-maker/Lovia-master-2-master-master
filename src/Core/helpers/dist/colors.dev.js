"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.modedColor = void 0;

var _reactNativeAppearance = require("react-native-appearance");

var _reactNative = require("react-native");

var modedColor = function modedColor(lightModeColor, darkModeColor) {
  return _reactNativeAppearance.Appearance.getColorScheme() === "dark" ? _reactNative.Platform.OS == "ios" ? lightModeColor : darkModeColor : lightModeColor;
};

exports.modedColor = modedColor;