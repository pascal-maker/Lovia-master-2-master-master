"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactNative = require("react-native");

var _Dimensions$get = _reactNative.Dimensions.get('window'),
    height = _Dimensions$get.height;

var imageSize = height * 0.14;

var dynamicStyles = function dynamicStyles(appStyles, colorScheme) {
  return _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor
    },
    buttonContainer: {
      height: 53,
      width: '98%',
      backgroundColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center'
    },
    imageContainer: {
      height: imageSize,
      width: imageSize,
      marginTop: 50
    },
    closeButton: {
      alignSelf: 'flex-end',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
      marginRight: 15,
      backgroundColor: appStyles.colorSet[colorScheme].grey0,
      width: 28,
      height: 28,
      borderRadius: 20,
      overflow: 'hidden'
    },
    closeIcon: {
      width: 27,
      height: 27
    },
    userName: {
      marginTop: 5,
      color: appStyles.colorSet[colorScheme].mainTextColor,
      fontSize: 17,
      marginBottom: 40
    },
    logout: {
      width: '90%',
      borderWidth: 1,
      color: appStyles.colorSet[colorScheme].mainTextColor,
      fontSize: 15,
      paddingVertical: 10,
      borderColor: appStyles.colorSet[colorScheme].grey3,
      borderRadius: 5,
      textAlign: 'center'
    }
  });
};

var _default = dynamicStyles;
exports["default"] = _default;