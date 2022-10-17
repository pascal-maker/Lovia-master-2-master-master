"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactNative = require("react-native");

var _DynamicAppStyles = _interopRequireDefault(require("../../DynamicAppStyles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var width = _reactNative.Dimensions.get('window').width;

var dynamicStyles = function dynamicStyles(colorScheme) {
  return _reactNative.StyleSheet.create({
    MainContainer: {
      flex: 1,
      backgroundColor: _DynamicAppStyles["default"].colorSet[colorScheme].mainThemeBackgroundColor,
      marginTop: 5
    },
    safeAreaContainer: {
      flex: 1,
      backgroundColor: _DynamicAppStyles["default"].colorSet[colorScheme].mainThemeBackgroundColor
    },
    body: {
      width: '100%',
      marginTop: 50
    },
    photoView: {
      top: _reactNative.Platform.OS === 'ios' ? '4%' : '1%',
      width: 146,
      height: 146,
      borderRadius: 73,
      backgroundColor: 'grey',
      overflow: 'hidden',
      alignSelf: 'center'
    },
    profilePictureContainer: {
      marginTop: 30
    },
    nameView: {
      width: '100%',
      marginTop: -10,
      justifyContent: 'center',
      alignItems: 'center'
    },
    name: {
      fontSize: 21,
      fontWeight: 'bold',
      // marginRight: 10,
      color: _DynamicAppStyles["default"].colorSet[colorScheme].mainTextColor,
      padding: 10
    },
    myphotosView: {
      width: '100%',
      paddingHorizontal: 12,
      marginTop: 20,
      marginBottom: 15
    },
    itemView: {
      width: '100%',
      paddingVertical: 2,
      marginVertical: 2,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
      marginBottom: 11
    },
    slide: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    slideActivity: {
      height: '100%',
      width: '90%'
    },
    myphotosItemView: {
      width: Math.floor(width * 0.24),
      height: Math.floor(width * 0.24),
      marginHorizontal: 8,
      marginVertical: 8,
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'grey',
      overflow: 'hidden'
    },
    optionView: {
      width: '100%',
      marginVertical: 9,
      paddingHorizontal: 12,
      flexDirection: 'row'
    },
    iconView: {
      flex: 0.2,
      justifyContent: 'center',
      alignItems: 'center'
    },
    textView: {
      flex: 0.8,
      justifyContent: 'center',
      alignItems: 'flex-start'
    },
    textLabel: {
      fontSize: 16,
      color: _DynamicAppStyles["default"].colorSet[colorScheme].mainTextColor
    },
    photoTitleLabel: {
      fontWeight: '500',
      fontSize: 17,
      paddingLeft: 22,
      color: _DynamicAppStyles["default"].colorSet[colorScheme].mainTextColor
    },
    logoutView: {
      width: '92%',
      marginTop: 20,
      marginBottom: 50,
      marginHorizontal: 12,
      padding: 10,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: _DynamicAppStyles["default"].colorSet[colorScheme].inputBgColor,
      justifyContent: 'center',
      alignItems: 'center'
    },
    inactiveDot: {
      backgroundColor: _DynamicAppStyles["default"].colorSet[colorScheme].grey6,
      width: 8,
      height: 8,
      borderRadius: 4,
      marginLeft: 3,
      marginRight: 3,
      marginTop: 3,
      marginBottom: 3
    }
  });
};

var _default = dynamicStyles;
exports["default"] = _default;