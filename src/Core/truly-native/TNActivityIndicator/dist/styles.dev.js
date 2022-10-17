"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactNative = require("react-native");

var styles = function styles(appStyles, colorScheme) {
  return _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0,
      bottom: 0
    },
    indicatorContainer: {
      width: 100,
      height: 100,
      borderRadius: 10,
      backgroundColor: 'rgba(52, 52, 52, 0.7)',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute'
    },
    text: {
      color: 'white',
      fontSize: 15,
      marginBottom: 20
    }
  });
};

var _default = styles;
exports["default"] = _default;