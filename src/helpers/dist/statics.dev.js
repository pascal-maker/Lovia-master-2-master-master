"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LOCAL_STORAGE_KEY = exports.IS_ANDROID = exports.DEVICE_HEIGHT = exports.DEVICE_WIDTH = void 0;

var _reactNative = require("react-native");

var DEVICE_WIDTH = _reactNative.Dimensions.get('window').width;

exports.DEVICE_WIDTH = DEVICE_WIDTH;

var DEVICE_HEIGHT = _reactNative.Dimensions.get('window').height;

exports.DEVICE_HEIGHT = DEVICE_HEIGHT;
var IS_ANDROID = _reactNative.Platform.OS === 'android';
exports.IS_ANDROID = IS_ANDROID;
var LOCAL_STORAGE_KEY = 'mid5LocalStorage';
exports.LOCAL_STORAGE_KEY = LOCAL_STORAGE_KEY;