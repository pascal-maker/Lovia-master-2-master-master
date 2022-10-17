"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactNative = require("react-native");

var _styles = _interopRequireDefault(require("../IMMenuButton/styles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var dynamicStyles = function dynamicStyles(appStyles, colorScheme) {
  var colorSet = appStyles.colorSet[colorScheme];
  var fontSet = appStyles.fontFamily;
  return new _reactNative.StyleSheet.create({
    content: {
      flex: 1,
      backgroundColor: colorSet.whiteSmoke
    },
    header: {
      height: _reactNative.Platform.OS === 'ios' ? '23%' : '25%',
      marginTop: _reactNative.Platform.OS === 'ios' ? 50 : 0,
      backgroundColor: _reactNative.Platform.OS === 'ios' ? colorSet.whiteSmoke : '#3066d1',
      display: 'flex',
      flexDirection: 'column'
    },
    info: {
      color: _reactNative.Platform.OS === 'ios' ? colorSet.mainTextColor : 'white',
      display: 'flex',
      fontFamily: fontSet.main,
      fontWeight: 'bold',
      marginLeft: '10%'
    },
    email: {
      color: _reactNative.Platform.OS === 'ios' ? colorSet.mainTextColor : 'white',
      display: 'flex',
      fontFamily: fontSet.main,
      fontWeight: 'normal',
      marginTop: 5,
      marginLeft: '10%'
    },
    imageContainer: _objectSpread({
      height: 80,
      width: 80,
      borderRadius: 50,
      shadowColor: '#006',
      shadowOffset: {
        width: 0,
        height: 2
      },
      marginLeft: '8%',
      shadowOpacity: 0.1,
      overflow: 'hidden'
    }, _reactNative.Platform.select({
      ios: {
        marginTop: '20%',
        marginBottom: '5%'
      },
      android: {
        marginTop: '10%',
        marginBottom: '5%'
      }
    })),
    container: {
      marginTop: '5%',
      marginLeft: '5%'
    },
    line: {
      borderBottomColor: colorSet.grey9,
      borderBottomWidth: 0.4,
      width: '95%',
      marginBottom: 10
    },
    footer: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginBottom: 24
    },
    textFooter: {
      color: colorSet.grey9,
      fontWeight: 'normal'
    }
  });
};

var _default = dynamicStyles;
exports["default"] = _default;