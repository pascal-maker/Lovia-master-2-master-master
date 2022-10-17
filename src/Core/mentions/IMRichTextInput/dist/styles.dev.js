"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.mentionStyle = void 0;

var _reactNative = require("react-native");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var width = _reactNative.Dimensions.get('window').width;

var dynamicStyles = function dynamicStyles(colorScheme, appStyles) {
  var _input;

  return new _reactNative.StyleSheet.create({
    container: {
      width: width,
      height: '100%'
    },
    editorContainer: {
      height: '100%'
    },
    textContainer: {
      alignSelf: 'stretch',
      position: 'relative',
      minHeight: 40,
      maxHeight: 140
    },
    input: (_input = {
      fontSize: 16,
      color: appStyles.colorSet[colorScheme].mainTextColor,
      fontWeight: '400',
      paddingHorizontal: 20,
      minHeight: 40,
      zIndex: _reactNative.Platform.OS == 'ios' ? 3 : undefined,
      position: 'absolute',
      top: 0
    }, _defineProperty(_input, "color", 'transparent'), _defineProperty(_input, "alignSelf", 'stretch'), _defineProperty(_input, "width", '100%'), _defineProperty(_input, "height", '100%'), _input),
    formmatedTextWrapper: {
      minHeight: 40,
      position: 'absolute',
      top: 0,
      paddingHorizontal: 20,
      paddingVertical: 5,
      width: '100%'
    },
    formmatedText: {
      fontSize: 16,
      fontWeight: '400'
    },
    mention: {
      fontSize: 16,
      fontWeight: '400',
      backgroundColor: 'rgba(36, 77, 201, 0.05)',
      color: '#244dc9'
    },
    placeholderText: {
      color: 'rgba(0, 0, 0, 0.1)',
      fontSize: 16
    }
  });
};

var mentionStyle = {
  mention: {
    fontSize: 16,
    fontWeight: '400',
    backgroundColor: 'rgba(36, 77, 201, 0.05)',
    color: '#244dc9'
  }
};
exports.mentionStyle = mentionStyle;
var _default = dynamicStyles;
exports["default"] = _default;