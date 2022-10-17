"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactNative = require("react-native");

var _reactNativeIphoneXHelper = require("react-native-iphone-x-helper");

var _devices = require("../../helpers/devices");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var WINDOW_WIDTH = _reactNative.Dimensions.get('window').width;

var dynamicStyles = function dynamicStyles(appStyles, colorScheme, outBound) {
  var chatBackgroundColor = appStyles.colorSet[colorScheme].mainThemeBackgroundColor;
  var audioPlayPauseContainerSize = 24;
  var audioPlayIconSize = 15;
  return _reactNative.StyleSheet.create({
    safeAreaViewContainer: _objectSpread({
      backgroundColor: chatBackgroundColor,
      flex: 1
    }, (0, _reactNativeIphoneXHelper.ifIphoneX)({
      marginBottom: 25
    }, {
      marginBottom: 5
    })),
    personalChatContainer: {
      backgroundColor: chatBackgroundColor,
      flex: 1
    },
    //Bottom Input
    bottomContentContainer: _objectSpread({
      backgroundColor: chatBackgroundColor
    }, (0, _reactNativeIphoneXHelper.ifIphoneX)({
      paddingBottom: 19
    }, {
      paddingBottom: 5
    })),
    inputContainer: {
      flex: 8,
      borderRadius: 20,
      backgroundColor: appStyles.colorSet[colorScheme].whiteSmoke,
      flexDirection: 'row',
      alignItems: 'center',
      overflow: 'hidden'
    },
    micIconContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 5,
      backgroundColor: 'transparent'
    },
    inputBar: {
      justifyContent: 'center',
      alignItems: 'center',
      borderTopWidth: 1,
      borderTopColor: appStyles.colorSet[colorScheme].hairlineColor,
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      flexDirection: 'row'
    },
    progressBar: {
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
      height: 3,
      shadowColor: '#000',
      width: 0
    },
    inputIconContainer: {
      margin: 10,
      flex: 0.5
    },
    inputIcon: {
      tintColor: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
      width: 25,
      height: 25
    },
    micIcon: {
      tintColor: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
      width: 17,
      height: 17
    },
    micIcon2: {
      tintColor: '#3c9c94',
      width: 17,
      height: 17
    },
    input: {
      alignSelf: 'center',
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 3,
      paddingRight: 20,
      width: '93%',
      fontSize: 16,
      lineHeight: 22,
      color: appStyles.colorSet[colorScheme].mainTextColor
    },
    inReplyToView: {
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      borderTopWidth: 1,
      borderTopColor: appStyles.colorSet[colorScheme].hairlineColor,
      padding: 8
    },
    replyingToHeaderText: {
      fontSize: 13,
      color: appStyles.colorSet[colorScheme].mainTextColor,
      marginBottom: 4
    },
    replyingToNameText: {
      fontWeight: 'bold'
    },
    replyingToContentText: {
      fontSize: 12,
      color: appStyles.colorSet[colorScheme].grey9
    },
    replyingToCloseButton: {
      position: 'absolute',
      right: 0,
      top: 2
    },
    replyingToCloseIcon: {
      width: 25,
      height: 25,
      tintColor: appStyles.colorSet[colorScheme].grey9
    },
    // Message Thread
    nonkeyboardContainer: {
      flex: 1
    },
    messageContentThreadContainer: {
      margin: 6
    },
    messageThreadContainer: {
      marginBottom: 24
    },
    // Thread Item
    sendItemContainer: {
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      flexDirection: 'row',
      marginBottom: 10
    },
    itemContent: {
      padding: 10,
      backgroundColor: appStyles.colorSet[colorScheme].hairlineColor,
      borderRadius: 10
    },
    indicatorContainer: {
      width: '100%'
    },
    typingIndicatorContainer: {
      backgroundColor: appStyles.colorSet[colorScheme].hairlineColor,
      borderRadius: 17,
      height: 40,
      width: '17%',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: '3%',
      marginBottom: '2%',
      marginVertical: 4
    },
    indicatorDotContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%'
    },
    typingIndicatorContentSupport: {
      position: 'absolute',
      bottom: '13%',
      left: '2.6%',
      height: 15,
      width: 15,
      borderRadius: 7.5,
      backgroundColor: appStyles.colorSet[colorScheme].hairlineColor,
      zIndex: -1
    },
    typingIndicatorSupport: {
      position: 'absolute',
      bottom: '1%',
      left: '1%',
      height: 8,
      width: 8,
      borderRadius: 4,
      backgroundColor: appStyles.colorSet[colorScheme].hairlineColor
    },
    sendItemContent: {
      marginRight: 9,
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeForegroundColor
    },
    mediaMessage: {
      width: (0, _devices.size)(300),
      height: (0, _devices.size)(250),
      borderRadius: 10
    },
    boederImgSend: {
      position: 'absolute',
      width: (0, _devices.size)(300),
      height: (0, _devices.size)(250),
      resizeMode: 'stretch',
      tintColor: chatBackgroundColor
    },
    textBoederImgSend: {
      position: 'absolute',
      right: -5,
      bottom: 0,
      width: 20,
      height: 8,
      resizeMode: 'stretch',
      tintColor: appStyles.colorSet[colorScheme].mainThemeForegroundColor
    },
    sendTextMessage: {
      fontSize: 16,
      color: '#800080'
    },
    userIcon: {
      width: 34,
      height: 34,
      borderRadius: 17
    },
    facePileContainer: {
      marginLeft: 13,
      flexDirection: 'row-reverse',
      flexWrap: 'nowrap',
      overflow: 'visible'
    },
    facePileCircleImage: {
      borderWidth: 2,
      borderColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor
    },
    facePileOverflow: {
      backgroundColor: '#b6c0ca',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 18
    },
    facePileOverflowLabel: {
      color: appStyles.colorSet[colorScheme].mainTextColor,
      fontSize: 14,
      letterSpacing: -1,
      marginLeft: 3,
      fontWeight: 'bold'
    },
    receiveItemContainer: {
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
      flexDirection: 'row',
      marginBottom: 10
    },
    receiveItemContent: {
      marginLeft: 9
    },
    boederImgReceive: {
      position: 'absolute',
      width: (0, _devices.size)(300),
      height: (0, _devices.size)(250),
      resizeMode: 'stretch',
      tintColor: chatBackgroundColor
    },
    receiveTextMessage: {
      color: '#800080',
      fontSize: 16
    },
    textBoederImgReceive: {
      position: 'absolute',
      left: -5,
      bottom: 0,
      width: 20,
      height: 8,
      resizeMode: 'stretch',
      tintColor: appStyles.colorSet[colorScheme].hairlineColor
    },
    mediaVideoLoader: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    },
    centerItem: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    playButton: {
      position: 'absolute',
      top: '40%',
      alignSelf: 'center',
      width: 38,
      height: 38,
      overflow: 'hidden'
    },
    myMessageBubbleContainerView: {
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      flexDirection: 'column',
      maxWidth: '80%'
    },
    theirMessageBubbleContainerView: {
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      flexDirection: 'column',
      maxWidth: '80%'
    },
    inReplyToItemContainerView: {
      overflow: 'hidden',
      flex: 1,
      marginBottom: -20,
      flexDirection: 'column',
      alignItems: 'flex-end'
    },
    inReplyToTheirItemContainerView: {
      overflow: 'hidden',
      flex: 1,
      marginBottom: -20,
      flexDirection: 'column',
      alignItems: 'flex-start'
    },
    inReplyToItemHeaderView: {
      flexDirection: 'row',
      marginTop: 15,
      marginRight: 10
    },
    inReplyToIcon: {
      width: 12,
      height: 12,
      marginRight: 5,
      tintColor: appStyles.colorSet[colorScheme].grey9,
      marginTop: 1,
      marginLeft: 10
    },
    inReplyToHeaderText: {
      fontSize: 12,
      color: appStyles.colorSet[colorScheme].grey9,
      marginBottom: 5
    },
    inReplyToItemBubbleView: {
      borderRadius: 15,
      backgroundColor: appStyles.colorSet[colorScheme].grey3,
      paddingBottom: 30,
      paddingLeft: 15,
      paddingRight: 10,
      paddingTop: 5,
      overflow: 'hidden',
      flex: 1
    },
    inReplyToItemBubbleText: {
      color: appStyles.colorSet[colorScheme].grey9,
      fontSize: 14
    },
    // Bottom Audio Recorder
    recorderContainer: {
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      flex: 1
    },
    counterContainer: {
      flex: 8,
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      justifyContent: 'center',
      alignItems: 'center'
    },
    counterText: {
      fontSize: 14,
      color: appStyles.colorSet[colorScheme].mainTextColor
    },
    recorderButtonsContainer: {
      flex: 1.8,
      paddingHorizontal: 5,
      paddingBottom: 2,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    recorderButtonContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    recorderControlButton: {
      backgroundColor: '#aaaaaa',
      width: '96%',
      height: '90%',
      borderRadius: 6,
      justifyContent: 'center',
      alignItems: 'center'
    },
    butonAlternateColor: {
      backgroundColor: '#f9272a'
    },
    recoderControlText: {
      fontSize: 16,
      color: appStyles.colorSet[colorScheme].whiteSmoke
    },
    // Audio media thread item
    audioMediaThreadItemContainer: {
      backgroundColor: 'transparent',
      flexDirection: 'row',
      justifyContent: 'center',
      width: Math.floor(WINDOW_WIDTH * 0.46),
      padding: 9
    },
    audioPlayPauseIconContainer: {
      flex: 2,
      justifyContent: 'center',
      zIndex: 9
    },
    playPauseIconContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: outBound ? appStyles.colorSet[colorScheme].hairlineColor : appStyles.colorSet[colorScheme].mainThemeForegroundColor,
      height: audioPlayPauseContainerSize,
      width: audioPlayPauseContainerSize,
      borderRadius: Math.floor(audioPlayPauseContainerSize / 2)
    },
    audioMeterContainer: {
      flex: 6.5,
      justifyContent: 'center',
      alignItems: 'flex-start'
    },
    audioMeter: {
      width: '95%',
      height: 6,
      paddingLeft: 7
    },
    audioMeterThumb: {
      width: 9,
      height: 9
    },
    audioTimerContainer: {
      flex: 2.5,
      justifyContent: 'center',
      alignItems: 'center'
    },
    audioPlayIcon: {
      width: audioPlayIconSize,
      height: audioPlayIconSize,
      tintColor: outBound ? appStyles.colorSet[colorScheme].hairlineColor : appStyles.colorSet[colorScheme].mainThemeForegroundColor // marginLeft: 2,

    },
    audioTimerCount: {
      color: outBound ? appStyles.colorSet[colorScheme].hairlineColor : appStyles.colorSet[colorScheme].mainThemeForegroundColor,
      fontSize: 12
    },
    // maximumAudioTrackTintColor: {
    //   color: appStyles.colorSet[colorScheme].hairlineColor,
    // },
    minimumAudioTrackTintColor: {
      color: outBound ? appStyles.colorSet[colorScheme].hairlineColor : appStyles.colorSet[colorScheme].mainThemeForegroundColor
    },
    audioThumbTintColor: {
      color: outBound ? appStyles.colorSet[colorScheme].hairlineColor : appStyles.colorSet[colorScheme].mainThemeForegroundColor
    }
  });
};

var _default = dynamicStyles;
exports["default"] = _default;