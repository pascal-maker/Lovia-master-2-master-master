"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactNative = require("react-native");

var dynamicStyles = function dynamicStyles(appStyles, colorScheme) {
  return _reactNative.StyleSheet.create({
    container: {
      justifyContent: 'center',
      marginBottom: 4,
      flexDirection: 'row',
      height: 60
    },
    cancelButtonText: {
      color: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
      fontSize: 16,
      marginBottom: 5
    },
    searchInput: {
      fontSize: 14,
      color: appStyles.colorSet[colorScheme].mainTextColor,
      backgroundColor: _reactNative.Platform.OS === 'ios' ? appStyles.colorSet[colorScheme].mainThemeBackgroundColor : appStyles.colorSet[colorScheme].whiteSmoke,
      flex: 1
    }
  });
};

var _default = dynamicStyles;
exports["default"] = _default;