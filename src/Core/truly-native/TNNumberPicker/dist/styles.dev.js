"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactNative = require("react-native");

var dynamicStyles = function dynamicStyles(appStyles, colorScheme) {
  var colorSet = appStyles.colorSet[colorScheme];
  return _reactNative.StyleSheet.create({
    containerView: {
      backgroundColor: colorSet.mainThemeBackgroundColor,
      flex: 1,
      flexDirection: 'row'
    },
    buttonContainer: {
      marginLeft: 20,
      marginRight: 20
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colorSet.mainTextColor
    },
    buttonImage: {
      width: 32,
      height: 32,
      tintColor: colorSet.mainThemeForegroundColor
    }
  });
};

var _default = dynamicStyles;
exports["default"] = _default;