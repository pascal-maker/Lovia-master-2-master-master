"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactNative = require("react-native");

var dynamicStyles = function dynamicStyles(appStyles, colorScheme) {
  return _reactNative.StyleSheet.create({
    headerButtonContainer: {
      padding: 10
    },
    Image: {
      width: 28,
      height: 25,
      margin: 6
    },
    title: {
      color: appStyles.colorSet[colorScheme].mainTextColor,
      fontSize: 12
    }
  });
};

var _default = dynamicStyles;
exports["default"] = _default;