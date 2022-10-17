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
    }
  });
};

var _default = dynamicStyles;
exports["default"] = _default;