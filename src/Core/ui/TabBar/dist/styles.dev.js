"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactNative = require("react-native");

var _reactNativeIphoneXHelper = require("react-native-iphone-x-helper");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var dynamicStyles = function dynamicStyles(appStyles, colorScheme) {
  return _reactNative.StyleSheet.create({
    tabBarContainer: _objectSpread({}, (0, _reactNativeIphoneXHelper.ifIphoneX)({
      height: 80
    }, {
      height: 45
    }), {
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      flexDirection: 'row',
      borderTopWidth: 0.5,
      borderTopColor: appStyles.colorSet[colorScheme].hairlineColor
    }),
    tabContainer: {
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    tabIcon: _objectSpread({}, (0, _reactNativeIphoneXHelper.ifIphoneX)({
      width: 25,
      height: 25
    }, {
      width: 22,
      height: 22
    })),
    focusTintColor: {
      tintColor: appStyles.colorSet[colorScheme].mainThemeForegroundColor
    },
    unFocusTintColor: {
      tintColor: appStyles.colorSet[colorScheme].bottomTintColor
    }
  });
};

var _default = dynamicStyles;
exports["default"] = _default;