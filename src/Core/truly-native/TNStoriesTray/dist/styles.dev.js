"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactNative = require("react-native");

var dynamicStyles = function dynamicStyles(appStyles, colorScheme) {
  return _reactNative.StyleSheet.create({
    storiesContainer: {
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      marginBottom: 5,
      flexDirection: 'row'
    },
    seenStyle: {
      borderColor: appStyles.colorSet[colorScheme].grey,
      borderWidth: 1
    }
  });
};

var _default = dynamicStyles;
exports["default"] = _default;