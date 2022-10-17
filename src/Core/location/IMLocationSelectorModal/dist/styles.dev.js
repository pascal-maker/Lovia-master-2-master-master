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

var dynamicStyles = function dynamicStyles(appStyles, colorScheme) {
  return _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor
    },
    //
    navBarContainer: _objectSpread({
      flexDirection: 'row',
      position: 'absolute',
      justifyContent: 'center'
    }, (0, _reactNativeIphoneXHelper.ifIphoneX)({
      top: 50
    }, {
      top: 12
    }), {
      paddingVertical: 10,
      // height: 25,
      width: '100%',
      paddingHorizontal: 10,
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      zIndex: 1
    }),
    navBarTitleContainer: {
      flex: 5
    },
    leftButtonContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    rightButtonContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    buttonText: {
      fontSize: 14,
      color: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
      fontWeight: '600'
    },
    // GooglePlacesAutocomplete
    placesAutocompleteContainer: _objectSpread({}, (0, _reactNativeIphoneXHelper.ifIphoneX)({
      marginTop: 46
    }, {
      marginTop: 50
    }), {
      height: '50%',
      backgroundColor: appStyles.colorSet[colorScheme].whiteSmoke
    }),
    placesAutocompleteTextInputContainer: {
      width: '100%',
      backgroundColor: appStyles.colorSet[colorScheme].hairlineColor,
      borderBottomWidth: 0,
      borderTopWidth: 0
    },
    placesAutocompleteTextInput: {
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      color: appStyles.colorSet[colorScheme].mainTextColor
    },
    placesAutocompletedDescription: {
      fontWeight: '400',
      color: appStyles.colorSet[colorScheme].mainSubtextColor
    },
    predefinedPlacesDescription: {
      color: appStyles.colorSet[colorScheme].mainSubtextColor
    },
    predefinedPlacesPoweredContainer: {
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor
    },
    mapContainer: {
      width: '100%',
      height: '39%',
      backgroundColor: appStyles.colorSet[colorScheme].whiteSmoke
    }
  });
};

var _default = dynamicStyles;
exports["default"] = _default;