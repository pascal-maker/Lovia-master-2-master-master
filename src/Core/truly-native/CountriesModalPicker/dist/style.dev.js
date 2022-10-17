"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactNative = require("react-native");

var _Dimensions$get = _reactNative.Dimensions.get('window'),
    height = _Dimensions$get.height,
    width = _Dimensions$get.width;

var PADDING = 8;
var BORDER_RADIUS = 5;
var FONT_SIZE = 16;
var OPTION_CONTAINER_HEIGHT = 400;

var dynamicStyles = function dynamicStyles(appStyles, colorScheme) {
  return _reactNative.StyleSheet.create({
    overlayStyle: {
      width: width,
      height: height,
      backgroundColor: '#000000bb'
    },
    optionContainer: {
      borderRadius: BORDER_RADIUS,
      width: width * 0.8,
      height: OPTION_CONTAINER_HEIGHT,
      backgroundColor: appStyles.colorSet[colorScheme].grey0,
      left: width * 0.1,
      top: (height - OPTION_CONTAINER_HEIGHT) / 2
    },
    cancelContainer: {
      left: width * 0.1,
      top: (height - OPTION_CONTAINER_HEIGHT) / 2 + 10
    },
    cancelStyle: {
      borderRadius: BORDER_RADIUS,
      width: width * 0.8,
      backgroundColor: appStyles.colorSet[colorScheme].grey0,
      padding: PADDING
    },
    cancelTextStyle: {
      textAlign: 'center',
      fontSize: FONT_SIZE,
      color: appStyles.colorSet[colorScheme].grey9
    },
    optionStyle: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: PADDING,
      borderBottomWidth: 1,
      borderBottomColor: appStyles.colorSet[colorScheme].grey3
    },
    optionTextStyle: {
      color: appStyles.colorSet[colorScheme].mainTextColor,
      fontSize: 14
    },
    sectionStyle: {
      padding: PADDING * 2,
      borderBottomWidth: 1,
      borderBottomColor: appStyles.colorSet[colorScheme].grey9
    },
    sectionTextStyle: {
      textAlign: 'center',
      fontSize: FONT_SIZE
    }
  });
};

var _default = dynamicStyles;
exports["default"] = _default;