"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactNative = require("react-native");

var dynamicStyles = function dynamicStyles(appStyles, colorScheme) {
  var colorSet = appStyles.colorSet[colorScheme];
  var fontSet = appStyles.fontFamily;
  return new _reactNative.StyleSheet.create({
    btnClickContain: {
      flexDirection: 'row',
      padding: 5,
      marginTop: 0,
      marginBottom: 0,
      backgroundColor: colorSet.whiteSmoke
    },
    btnContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-start',
      backgroundColor: colorSet.whiteSmoke,
      padding: 7
    },
    btnIcon: {
      tintColor: colorSet.mainTextColor,
      height: 30,
      width: 30
    },
    btnText: {
      fontFamily: fontSet.main,
      fontWeight: 'bold',
      marginLeft: 20,
      marginTop: 5,
      color: colorSet.mainTextColor
    }
  });
};

var _default = dynamicStyles;
exports["default"] = _default;