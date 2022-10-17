"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactNative = require("react-native");

var _Dimensions$get = _reactNative.Dimensions.get('window'),
    height = _Dimensions$get.height;

var dynamicStyles = function dynamicStyles(appStyles, colorScheme) {
  return _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor
    },
    userImageContainer: {
      borderWidth: 0
    },
    chatsChannelContainer: {
      flex: 1,
      padding: 0,
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor
    },
    chatItemContainer: {
      flexDirection: 'row',
      marginBottom: 20
    },
    chatItemContent: {
      flex: 1,
      alignSelf: 'center',
      marginLeft: 10
    },
    chatFriendName: {
      color: appStyles.colorSet[colorScheme].mainTextColor,
      fontSize: 17
    },
    content: {
      flexDirection: 'row'
    },
    message: {
      flex: 2,
      color: appStyles.colorSet[colorScheme].mainSubtextColor
    },
    emptyViewContainer: {
      marginTop: height / 5
    }
  });
};

var _default = dynamicStyles;
exports["default"] = _default;