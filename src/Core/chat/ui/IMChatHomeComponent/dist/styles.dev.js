"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactNative = require("react-native");

var dynamicStyles = function dynamicStyles(appStyles, colorScheme) {
  return _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor
    },
    userImageContainer: {
      borderWidth: 0
    },
    chatsChannelContainer: {
      flex: 1,
      padding: 10,
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor
    },
    content: {
      flexDirection: 'row'
    },
    message: {
      flex: 2,
      color: appStyles.colorSet[colorScheme].mainSubtextColor
    }
  });
};

var _default = dynamicStyles;
exports["default"] = _default;