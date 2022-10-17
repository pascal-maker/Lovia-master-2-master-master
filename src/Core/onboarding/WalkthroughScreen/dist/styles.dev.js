"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactNative = require("react-native");

var dynamicStyles = function dynamicStyles(appStyles, colorScheme) {
  return _reactNative.StyleSheet.create({
    title: {
      fontSize: 25,
      fontWeight: 'bold',
      textAlign: 'center',
      paddingBottom: 25,
      color: 'white'
    },
    text: {
      fontSize: 18,
      textAlign: 'center',
      color: 'white',
      paddingLeft: 10,
      paddingRight: 10
    },
    image: {
      width: 100,
      height: 100,
      marginBottom: 60,
      tintColor: 'white'
    },
    image2: {
      width: 115,
      height: 100,
      marginBottom: 60,
      tintColor: 'white'
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeForegroundColor
    },
    button: {
      fontSize: 18,
      color: 'white',
      marginTop: 10
    }
  });
};

var _default = dynamicStyles;
exports["default"] = _default;