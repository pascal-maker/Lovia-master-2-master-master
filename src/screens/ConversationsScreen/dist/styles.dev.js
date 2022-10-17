"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactNative = require("react-native");

var dynamicStyles = function dynamicStyles(colorScheme, appStyles) {
  return _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      marginTop: _reactNative.Platform.OS == 'ios' ? 60 : 40,
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor
    },
    userImageContainer: {
      borderWidth: 0
    },
    chatsChannelContainer: {
      // flex: 1,
      padding: 10
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