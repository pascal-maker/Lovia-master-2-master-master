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

var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width,
    height = _Dimensions$get.height;

var closeButtonSize = Math.floor(height * 0.032);

var styles = _reactNative.StyleSheet.create({
  container: {
    width: width,
    height: height,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center'
  },
  deck: {
    width: width,
    backgroundColor: '#333333'
  },
  progressIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  indicatorWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  },
  indicators: _objectSpread({
    height: 30
  }, (0, _reactNativeIphoneXHelper.ifIphoneX)({
    marginTop: 20
  }, {
    marginTop: 2
  }), {
    alignItems: 'center',
    paddingHorizontal: 8,
    flexDirection: 'row'
  }),
  indicatorBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 50
  },
  back: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 110
  },
  next: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: 160
  },
  closeButton: _objectSpread({
    position: 'absolute'
  }, (0, _reactNativeIphoneXHelper.ifIphoneX)({
    top: 45
  }, {
    top: 25
  }), {
    right: 10,
    height: closeButtonSize,
    width: closeButtonSize,
    borderRadius: Math.floor(closeButtonSize / 2),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c4c5c4',
    opacity: 0.7,
    zIndex: 2
  }),
  closeCross: {
    width: '68%',
    height: 1,
    backgroundColor: 'black'
  }
});

var _default = styles;
exports["default"] = _default;