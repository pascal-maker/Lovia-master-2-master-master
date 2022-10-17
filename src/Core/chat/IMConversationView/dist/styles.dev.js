"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactNative = require("react-native");

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
      // flex: 1,
      padding: 10
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
      fontSize: 17,
      fontWeight: '500'
    },
    content: {
      flexDirection: 'row',
      marginTop: 5
    },
    message: {
      flex: 2,
      color: appStyles.colorSet[colorScheme].mainSubtextColor,
      //color: '#800080',
      fontWeight: '500'
    },
    unReadmessage: {
      fontWeight: 'bold',
      color: appStyles.colorSet[colorScheme].mainTextColor //color: '#800080',

    }
  });
};

var _default = dynamicStyles;
exports["default"] = _default;