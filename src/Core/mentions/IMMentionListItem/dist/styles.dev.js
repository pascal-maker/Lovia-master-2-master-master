"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactNative = require("react-native");

var height = _reactNative.Dimensions.get('window').height;

var mentionItemContainerHeight = Math.floor(height * 0.066);
var mentionPhotoSize = Math.floor(mentionItemContainerHeight * 0.66);

var dynamicStyles = function dynamicStyles(colorScheme, appStyles) {
  return new _reactNative.StyleSheet.create({
    mentionItemContainer: {
      width: ' 100%',
      height: mentionItemContainerHeight,
      alignSelf: 'center',
      padding: 10,
      alignItems: 'center',
      flexDirection: 'row'
    },
    mentionPhotoContainer: {
      flex: 0.8,
      flexDirection: 'row',
      alignItems: 'center'
    },
    mentionPhoto: {
      height: mentionPhotoSize,
      borderRadius: mentionPhotoSize / 2,
      width: mentionPhotoSize
    },
    mentionNameContainer: {
      flex: 6,
      height: '100%',
      justifyContent: 'center',
      borderBottomColor: appStyles.colorSet[colorScheme].hairlineColor,
      borderBottomWidth: 0.5
    },
    mentionName: {
      color: appStyles.colorSet[colorScheme].mainTextColor,
      fontWeight: '400'
    }
  });
};

var _default = dynamicStyles;
exports["default"] = _default;