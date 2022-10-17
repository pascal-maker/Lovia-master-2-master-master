"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactNative = require("react-native");

var _reactNativeAppearance = require("react-native-appearance");

var COLOR_SCHEME = _reactNativeAppearance.Appearance.getColorScheme();

var styles = function styles(appStyles) {
  return new _reactNative.StyleSheet.create({
    tnCardContainer: {
      flex: 1,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: appStyles.colorSet[COLOR_SCHEME].mainThemeBackgroundColor,
      paddingBottom: 15,
      paddingTop: 15,
      paddingLeft: 15,
      paddingRight: 15
    },
    tnCardShadow: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    }
  });
};

var _default = styles;
exports["default"] = _default;