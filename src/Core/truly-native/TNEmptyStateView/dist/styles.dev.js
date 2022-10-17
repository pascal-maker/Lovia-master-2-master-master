"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactNative = require("react-native");

var dynamicStyles = function dynamicStyles(appStyles, colorScheme) {
  return _reactNative.StyleSheet.create({
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      alignSelf: 'center',
      color: appStyles.colorSet[colorScheme].mainTextColor,
      marginBottom: 15
    },
    description: {
      alignSelf: 'center',
      color: appStyles.colorSet[colorScheme].mainTextColor,
      textAlign: 'center',
      width: '85%',
      lineHeight: 20
    },
    buttonContainer: {
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
      width: '75%',
      height: 45,
      alignSelf: 'center',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 30
    },
    buttonName: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: '600'
    },
    container: {
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackground
    }
  });
};

var _default = dynamicStyles;
exports["default"] = _default;