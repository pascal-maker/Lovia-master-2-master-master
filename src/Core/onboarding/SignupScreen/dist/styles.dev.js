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

var _Dimensions$get = _reactNative.Dimensions.get('window'),
    height = _Dimensions$get.height;

var imageSize = height * 0.232;
var photoIconSize = imageSize * 0.27;

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
      marginBottom: 30,
      alignSelf: 'stretch',
      textAlign: 'left',
      marginLeft: 35
    },
    content: {
      paddingLeft: 50,
      paddingRight: 50,
      textAlign: 'center',
      fontSize: appStyles.fontSet.middle,
      color: appStyles.colorSet[colorScheme].mainThemeForegroundColor
    },
    loginContainer: {
      width: appStyles.sizeSet.buttonWidth,
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
      borderRadius: appStyles.sizeSet.radius,
      padding: 10,
      marginTop: 30
    },
    loginText: {
      color: appStyles.colorSet[colorScheme].mainThemeBackgroundColor
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
    signupContainer: {
      alignSelf: 'center',
      width: appStyles.sizeSet.buttonWidth,
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
      borderRadius: appStyles.sizeSet.radius,
      padding: 10,
      marginTop: 50
    },
    signupText: {
      color: appStyles.colorSet[colorScheme].mainThemeBackgroundColor
    },
    image: {
      width: '100%',
      height: '100%'
    },
    imageBlock: {
      flex: 2,
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center'
    },
    imageContainer: {
      height: imageSize,
      width: imageSize,
      borderRadius: imageSize,
      shadowColor: '#006',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.1,
      overflow: 'hidden'
    },
    formContainer: {
      width: '100%',
      flex: 4,
      alignItems: 'center'
    },
    photo: {
      marginTop: imageSize * 0.77,
      marginLeft: -imageSize * 0.29,
      width: photoIconSize,
      height: photoIconSize,
      borderRadius: photoIconSize
    },
    addButton: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#d9d9d9',
      opacity: 0.8,
      zIndex: 2
    },
    orTextStyle: _defineProperty({
      color: 'black',
      marginTop: 20,
      marginBottom: 10,
      alignSelf: 'center'
    }, "color", appStyles.colorSet[colorScheme].mainTextColor),
    PhoneNumberContainer: {
      marginTop: 10,
      marginBottom: 10,
      alignSelf: 'center'
    },
    smsText: {
      color: '#4267b2'
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