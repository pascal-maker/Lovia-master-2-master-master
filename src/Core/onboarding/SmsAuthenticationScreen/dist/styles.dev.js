"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactNative = require("react-native");

var _colors = require("../../helpers/colors");

var _TNColor = _interopRequireDefault(require("../../truly-native/TNColor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var width = _reactNative.Dimensions.get('window').width;

var codeInptCellWidth = width * 0.13;

var dynamicStyles = function dynamicStyles(appStyles, colorScheme) {
  var _phoneInputTextStyle;

  return _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      color: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
      marginTop: 25,
      marginBottom: 50,
      alignSelf: 'stretch',
      textAlign: 'left',
      marginLeft: 35
    },
    sendContainer: {
      width: '70%',
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
      borderRadius: 25,
      padding: 10,
      marginTop: 30,
      alignSelf: 'center'
    },
    sendText: {
      color: '#ffffff'
    },
    InputContainer: {
      height: 42,
      borderWidth: 1,
      borderColor: appStyles.colorSet[colorScheme].grey3,
      backgroundColor: (0, _colors.modedColor)(appStyles.colorSet[colorScheme].mainThemeBackgroundColor, (0, _TNColor["default"])('#e0e0e0')),
      paddingLeft: 10,
      color: appStyles.colorSet[colorScheme].mainTextColor,
      width: '80%',
      alignSelf: 'center',
      marginTop: 20,
      alignItems: 'center',
      borderRadius: 25
    },
    flagStyle: {
      width: 35,
      height: 25,
      borderColor: appStyles.colorSet[colorScheme].mainTextColor,
      borderBottomLeftRadius: 25,
      borderTopLeftRadius: 25,
      transform: [{
        scaleX: _reactNative.I18nManager.isRTL ? -1 : 1
      }]
    },
    phoneInputTextStyle: (_phoneInputTextStyle = {
      borderLeftWidth: _reactNative.I18nManager.isRTL ? 0 : 1,
      borderRightWidth: _reactNative.I18nManager.isRTL ? 1 : 0
    }, _defineProperty(_phoneInputTextStyle, "borderLeftWidth", 1), _defineProperty(_phoneInputTextStyle, "borderColor", appStyles.colorSet[colorScheme].grey3), _defineProperty(_phoneInputTextStyle, "height", 42), _defineProperty(_phoneInputTextStyle, "fontSize", 15), _defineProperty(_phoneInputTextStyle, "color", appStyles.colorSet[colorScheme].mainTextColor), _defineProperty(_phoneInputTextStyle, "textAlign", _reactNative.I18nManager.isRTL ? 'right' : 'left'), _defineProperty(_phoneInputTextStyle, "borderBottomRightRadius", _reactNative.I18nManager.isRTL ? 0 : 25), _defineProperty(_phoneInputTextStyle, "borderTopRightRadius", 25), _defineProperty(_phoneInputTextStyle, "borderTopRightRadius", _reactNative.I18nManager.isRTL ? 0 : 25), _defineProperty(_phoneInputTextStyle, "borderBottomLeftRadius", _reactNative.I18nManager.isRTL ? 25 : 0), _defineProperty(_phoneInputTextStyle, "borderTopLeftRadius", _reactNative.I18nManager.isRTL ? 25 : 0), _defineProperty(_phoneInputTextStyle, "paddingLeft", 10), _phoneInputTextStyle),
    input: {
      flex: 1,
      borderLeftWidth: 1,
      borderRadius: 3,
      borderColor: appStyles.colorSet[colorScheme].grey3,
      color: appStyles.colorSet[colorScheme].mainTextColor,
      fontSize: 17,
      fontWeight: '700',
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor
    },
    // code input style
    root: {
      padding: 20,
      minHeight: 300,
      alignItems: 'center'
    },
    codeFieldContainer: {
      marginTop: 20,
      alignItems: 'center'
    },
    codeInputCell: {
      width: codeInptCellWidth,
      height: codeInptCellWidth,
      lineHeight: 55,
      fontSize: 26,
      fontWeight: '400',
      textAlign: 'center',
      marginLeft: 8,
      borderRadius: 6,
      backgroundColor: appStyles.colorSet[colorScheme].grey3
    },
    focusCell: {
      borderColor: '#000'
    },
    orTextStyle: {
      marginTop: 40,
      marginBottom: 10,
      alignSelf: 'center',
      color: appStyles.colorSet[colorScheme].mainTextColor
    },
    facebookContainer: {
      width: '70%',
      backgroundColor: '#4267b2',
      borderRadius: 25,
      marginTop: 30,
      alignSelf: 'center',
      padding: 10
    },
    appleButtonContainer: {
      width: '70%',
      height: 40,
      marginTop: 16,
      alignSelf: 'center'
    },
    facebookText: {
      color: '#ffffff',
      fontSize: 14
    },
    signWithEmailContainer: {
      marginTop: 20
    },
    tos: {
      marginTop: 40,
      alignItems: 'center',
      justifyContent: 'center',
      height: 30
    }
  });
};

var _default = dynamicStyles;
exports["default"] = _default;