"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactNative = require("react-native");

var _Dimensions$get = _reactNative.Dimensions.get('window'),
    height = _Dimensions$get.height;

var imageSize = height * 0.14;
var photoIconSize = imageSize * 0.27;

var dynamicStyles = function dynamicStyles(appStyles, colorScheme) {
  return _reactNative.StyleSheet.create({
    image: {
      width: '100%',
      height: '100%'
    },
    imageBlock: {
      flex: 2,
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20
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
    addButton: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#d6d6d6',
      opacity: 0.8,
      zIndex: 2,
      marginTop: imageSize * 0.77,
      marginLeft: -imageSize * 0.29,
      width: photoIconSize,
      height: photoIconSize,
      borderRadius: photoIconSize
    },
    closeButton: {
      alignSelf: 'flex-end',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 40,
      marginRight: 15,
      backgroundColor: appStyles.colorSet[colorScheme].grey6,
      width: 28,
      height: 28,
      borderRadius: 20,
      overflow: 'hidden'
    },
    closeIcon: {
      width: 27,
      height: 27
    }
  });
};

var _default = dynamicStyles;
exports["default"] = _default;