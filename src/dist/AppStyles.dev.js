"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactNative = require("react-native");

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var WINDOW_WIDTH = _reactNative.Dimensions.get('window').width;

var WINDOW_HEIGHT = _reactNative.Dimensions.get('window').height;

var _colorSet = {
  mainThemeBackgroundColor: 'white',
  mainThemeForegroundColor: '#FFC0CB',
  mainTextColor: '#464646',
  mainSubtextColor: '#7c7c7c',
  hairlineColor: '#d6d6d6',
  grayBgColor: '#f5f5f5',
  onlineMarkColor: '#41C61B',
  inputBgColor: 'rgba(0.9, 0.9, 0.9, 0.1)'
};
var _fontSet = {
  xxlarge: 40,
  xlarge: 30,
  large: 25,
  middle: 20,
  normal: 16,
  small: 13,
  xsmall: 11
};
var _sizeSet = {
  buttonWidth: '70%',
  inputWidth: '80%',
  radius: 50
};
var _iconSet = {
  Logo: require('../assets/images/Logo.png'),
  BackgroundLayer: require('../assets/images/layerson2.png'),
  Dislike: require('../assets/images/dislike.png'),
  SuperLike: require('../assets/images/super_like.png'),
  Like: require('../assets/images/right.png'),
  home: require('../assets/icons/home-icon.png'),
  add_user: require('../assets/icons/add-user-icon.png'),
  add_user_filled: require('../assets/icons/add-user-icon-filled.png'),
  camera_filled: require('../assets/icons/camera-filled-icon.png'),
  camera: require('../assets/icons/camera-icon.png'),
  chat: require('../assets/icons/chat-icon.png'),
  close: require('../assets/icons/close-x-icon.png'),
  checked: require('../assets/icons/checked-icon.png'),
  "delete": require('../assets/icons/delete.png'),
  friends: require('../assets/icons/friends-icon.png'),
  inscription: require('../assets/icons/inscription-icon.png'),
  menu: require('../assets/icons/menu.png'),
  private_chat: require('../assets/icons/private-chat-icon.png'),
  search: require('../assets/icons/search-icon.png'),
  share: require('../assets/icons/share-icon.png'),
  tick: require('../assets/icons/tick.png'),
  vip: require('../assets/icons/vip.png'),
  undo: require('../assets/icons/undo.png'),
  star: require('../assets/images/star.png'),
  logout: require('../assets/images/logout-menu-item.png'),
  instagram: require('../assets/images/icons8-instagram-100.png'),
  account: require('../assets/images/account-male-icon.png'),
  setting: require('../assets/images/settings-menu-item.png'),
  callIcon: require('../assets/images/contact-call-icon.png'),
  schoolIcon: require('../assets/images/educate-school-icon.png'),
  studyIcon: require('../assets/images/study_icon.png'),
  markerIcon: require('../assets/images/icons8-marker-500.png'),
  arrowdownIcon: require('../assets/images/arrow-down-icon.png'),
  boederImgSend: require('../assets/images/borderImg1.png'),
  boederImgReceive: require('../assets/images/borderImg2.png'),
  textBoederImgSend: require('../assets/images/textBorderImg1.png'),
  textBoederImgReceive: require('../assets/images/textBorderImg2.png'),
  starFilled: require('../assets/images/star-filled-icon2.png'),
  crossFilled: require('../assets/images/false.png')
};
var _styleSet = {
  menuBtn: {
    container: {
      backgroundColor: _colorSet.grayBgColor,
      borderRadius: 22.5,
      padding: 10,
      marginLeft: 10,
      marginRight: 10
    },
    icon: {
      tintColor: 'black',
      width: 15,
      height: 15
    }
  },
  searchBar: {
    container: {
      marginLeft: _reactNative.Platform.OS === 'ios' ? 30 : 0,
      backgroundColor: 'transparent',
      borderBottomColor: 'transparent',
      borderTopColor: 'transparent',
      flex: 1
    },
    input: {
      backgroundColor: _colorSet.inputBgColor,
      borderRadius: 10,
      color: 'black'
    }
  },
  rightNavButton: {
    marginRight: 10
  }
};
var _functions = {
  timeFormat: function timeFormat(timeStamp) {
    var time = '';

    if (timeStamp) {
      if (!timeStamp.seconds) {
        var _seconds = timeStamp._seconds;
        timeStamp.seconds = _seconds;
      }

      if (!timeStamp.nanoseconds) {
        var _nanoseconds = timeStamp._nanoseconds;
        timeStamp.nanoseconds = _nanoseconds;
      }

      if ((0, _moment["default"])().diff(_moment["default"].unix(timeStamp.seconds), 'days') == 0) {
        time = _moment["default"].unix(timeStamp.seconds).format('H:mm');
      } else {
        time = _moment["default"].unix(timeStamp.seconds).fromNow();
      }
    }

    return time;
  }
};
var StyleDict = {
  colorSet: _colorSet,
  iconSet: _iconSet,
  sizeSet: _sizeSet,
  fontSet: _fontSet,
  styleSet: _styleSet,
  windowW: WINDOW_WIDTH,
  windowH: WINDOW_HEIGHT,
  utils: _functions
};
var _default = StyleDict;
exports["default"] = _default;