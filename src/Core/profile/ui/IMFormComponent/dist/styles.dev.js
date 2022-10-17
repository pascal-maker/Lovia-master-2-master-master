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
      backgroundColor: appStyles.colorSet[colorScheme].whiteSmoke
    },
    //Profile Settings
    settingsTitleContainer: {
      width: '100%',
      height: 55,
      justifyContent: 'flex-end'
    },
    settingsTitle: {
      color: appStyles.colorSet[colorScheme].mainSubtextColor,
      paddingLeft: 10,
      fontSize: 14,
      paddingBottom: 6,
      fontWeight: '500'
    },
    settingsTypesContainer: {
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor
    },
    settingsTypeContainer: {
      borderBottomColor: appStyles.colorSet[colorScheme].whiteSmoke,
      borderBottomWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 50
    },
    settingsType: {
      color: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
      fontSize: 14,
      fontWeight: '500'
    },
    //Edit Profile
    contentContainer: {
      width: '100%',
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: appStyles.colorSet[colorScheme].hairlineColor,
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor
    },
    divider: {
      height: 0.5,
      width: '96%',
      alignSelf: 'flex-end',
      backgroundColor: appStyles.colorSet[colorScheme].hairlineColor
    },
    text: {
      fontSize: 14,
      color: appStyles.colorSet[colorScheme].mainTextColor
    },
    //app Settings
    appSettingsTypeContainer: {
      flexDirection: 'row',
      borderBottomWidth: 0,
      justifyContent: 'space-between',
      paddingHorizontal: 15
    },
    appSettingsSaveContainer: {
      marginTop: 4,
      height: 45,
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor
    },
    placeholderTextColor: {
      color: appStyles.colorSet[colorScheme].hairlineColor
    }
  });
};

var _default = dynamicStyles;
exports["default"] = _default;