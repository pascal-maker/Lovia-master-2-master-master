"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactNative = require("react-native");

var _DynamicAppStyles = _interopRequireDefault(require("../../DynamicAppStyles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var dynamicStyles = function dynamicStyles(colorScheme) {
  return _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: _DynamicAppStyles["default"].colorSet[colorScheme].secondaryForegroundColor,
      height: '100%'
    },
    safeAreaContainer: {
      flex: 1,
      backgroundColor: _DynamicAppStyles["default"].colorSet[colorScheme].mainThemeBackgroundColor
    }
  });
};

var _default = dynamicStyles;
exports["default"] = _default;