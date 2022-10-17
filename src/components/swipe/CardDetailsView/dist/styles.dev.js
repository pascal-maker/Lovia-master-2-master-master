"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactNative = require("react-native");

var _DynamicAppStyles = _interopRequireDefault(require("../../../DynamicAppStyles"));

var _statics = require("../../../helpers/statics");

var _devices = require("../../../helpers/devices");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var dynamicStyles = function dynamicStyles(colorScheme) {
  return _reactNative.StyleSheet.create({
    body: {
      flex: 1,
      backgroundColor: _DynamicAppStyles["default"].colorSet[colorScheme].mainThemeBackgroundColor
    },
    photoView: {
      width: '100%',
      height: _statics.DEVICE_HEIGHT * 0.5,
      backgroundColor: 'skyblue'
    },
    profilePhoto: {
      width: '100%',
      height: '100%'
    },
    backView: {
      position: 'absolute',
      top: _statics.DEVICE_HEIGHT * 0.467,
      right: 20,
      width: 55,
      height: 55,
      borderRadius: 27.5,
      backgroundColor: '#db6470',
      justifyContent: 'center',
      alignItems: 'center'
    },
    backIcon: {
      width: 30,
      height: 30,
      resizeMode: 'contain',
      tintColor: 'white'
    },
    titleView: {
      width: '100%',
      paddingHorizontal: 12,
      marginVertical: 20,
      // marginTop: 5,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-end'
    },
    nameText: {
      fontSize: 30,
      fontWeight: 'bold',
      marginRight: 10,
      color: _DynamicAppStyles["default"].colorSet[colorScheme].mainTextColor
    },
    ageText: {
      bottom: 1,
      fontSize: 25,
      color: _DynamicAppStyles["default"].colorSet[colorScheme].mainTextColor
    },
    captionView: {
      width: '100%',
      paddingHorizontal: 12
    },
    itemView: {
      width: '100%',
      paddingVertical: 2,
      marginVertical: 2,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-end'
    },
    icon: {
      width: (0, _devices.size)(20),
      height: (0, _devices.size)(20),
      tintColor: 'grey'
    },
    icon2: {
      width: (0, _devices.size)(18),
      height: (0, _devices.size)(18),
      tintColor: 'grey'
    },
    text: {
      paddingLeft: (0, _devices.size)(10),
      fontSize: (0, _devices.size)(16),
      color: _DynamicAppStyles["default"].colorSet[colorScheme].mainTextColor,
      backgroundColor: 'transparent'
    },
    lineView: {
      marginTop: 4,
      width: '100%',
      height: 1,
      backgroundColor: _DynamicAppStyles["default"].colorSet[colorScheme].hairlineColor
    },
    bioView: {
      width: '100%',
      paddingHorizontal: 12,
      marginVertical: 15
    },
    label: {
      fontSize: (0, _devices.size)(20)
    },
    bioText: {
      fontSize: (0, _devices.size)(16),
      color: _DynamicAppStyles["default"].colorSet[colorScheme].mainTextColor
    },
    instagramView: {
      width: '100%',
      height: 270,
      paddingHorizontal: 12
    },
    slide: {
      flex: 1,
      justifyContent: 'center'
    },
    myphotosItemView: {
      width: 100,
      height: 100,
      marginHorizontal: 8,
      marginVertical: 8,
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'grey',
      overflow: 'hidden'
    },
    inlineActionsContainer: {
      flex: 1,
      width: '100%',
      backgroundColor: _DynamicAppStyles["default"].colorSet[colorScheme].inlineActionsColor,
      alignSelf: 'center',
      alignItems: 'center',
      position: 'absolute',
      bottom: 0
    },
    closeButton: {
      alignSelf: 'flex-end',
      height: 24,
      width: 24,
      borderRadius: 12,
      backgroundColor: 'rgba(0,0,0,0.2)',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 40,
      marginRight: 15
    },
    closeButton__text: {
      backgroundColor: 'transparent',
      fontSize: 35,
      lineHeight: 35,
      color: '#FFF',
      textAlign: 'center'
    }
  });
};

var _default = dynamicStyles;
exports["default"] = _default;