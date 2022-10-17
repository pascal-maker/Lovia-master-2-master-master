"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactNative = require("react-native");

var _colors = require("../../helpers/colors");

var _TNColor = _interopRequireDefault(require("../../truly-native/TNColor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var dynamicStyles = function dynamicStyles(appStyles, colorScheme) {
  return _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor
    },
    orTextStyle: {
      color: appStyles.colorSet[colorScheme].mainTextColor,
      marginTop: 40,
      marginBottom: 10,
      alignSelf: 'center'
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      color: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
      marginTop: 25,
      marginBottom: 20,
      alignSelf: 'stretch',
      textAlign: 'left',
      marginLeft: 30
    },
    loginContainer: {
      width: '70%',
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
      borderRadius: 25,
      padding: 10,
      marginTop: 30,
      alignSelf: 'center'
    },
    loginText: {
      color: '#ffffff'
    },
    placeholder: {
      color: 'red'
    },
    InputContainer: {
      height: 42,
      borderWidth: 1,
      borderColor: appStyles.colorSet[colorScheme].grey3,
      backgroundColor: (0, _colors.modedColor)(appStyles.colorSet[colorScheme].mainThemeBackgroundColor, (0, _TNColor["default"])('#e0e0e0')),
      paddingLeft: 20,
      color: appStyles.colorSet[colorScheme].mainTextColor,
      width: '80%',
      alignSelf: 'center',
      marginTop: 20,
      alignItems: 'center',
      borderRadius: 25,
      textAlign: _reactNative.I18nManager.isRTL ? 'right' : 'left'
    },
    facebookContainer: {
      width: '70%',
      backgroundColor: '#4267B2',
      borderRadius: 25,
      padding: 10,
      marginTop: 30,
      alignSelf: 'center'
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
    phoneNumberContainer: {
      marginTop: 20
    },
    forgotPasswordContainer: {
      width: '80%',
      alignSelf: 'center',
      alignItems: 'flex-end'
    },
    forgotPasswordText: {
      fontSize: 14,
      padding: 4
    }
  });
};

var _default = dynamicStyles;
exports["default"] = _default;