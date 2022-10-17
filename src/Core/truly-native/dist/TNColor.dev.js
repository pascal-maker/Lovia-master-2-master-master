"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _invertColor = _interopRequireDefault(require("invert-color"));

var _reactNativeAppearance = require("react-native-appearance");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var TNColor = function TNColor(hexStringColor) {
  return (0, _invertColor["default"])(hexStringColor);
}; // const TNColor = hexStringColor => {
//   const colorScheme = Appearance.getColorScheme();
//   if (colorScheme === 'dark') {
//     return invert(hexStringColor);
//   }
//   return hexStringColor;
// };


var _default = TNColor;
exports["default"] = _default;