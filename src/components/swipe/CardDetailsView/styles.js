import {
  StyleSheet
} from 'react-native';
import DynamicAppStyles from '../../../DynamicAppStyles';
import {
  DEVICE_HEIGHT
} from '../../../helpers/statics';
import {
  size
} from '../../../helpers/devices';
import invert from "invert-color";

const dynamicStyles = (colorScheme) => {
  return StyleSheet.create({
    body: {
      flex: 1,
      backgroundColor: DynamicAppStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    },
    photoView: {
      width: '100%',
      height: DEVICE_HEIGHT * 0.6,
      backgroundColor: 'skyblue',
    },
    profilePhoto: {
      width: '100%',
      height: '100%',

    },
    backView: {
      position: 'absolute',
      // top: DEVICE_HEIGHT * 0.467,
      // top: DEVICE_HEIGHT * 0.02,
      top: DEVICE_HEIGHT * 0.05,
      right: 15,
      width: 40,
      height: 40,
      borderRadius: 27.5,
      backgroundColor: DynamicAppStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      justifyContent: 'center',
      alignItems: 'center',
    },
    backIcon: {
      width: 20,
      height: 20,
      resizeMode: 'contain',
      tintColor: invert(DynamicAppStyles.colorSet[colorScheme].mainThemeBackgroundColor),
    },
    titleView: {
      width: '100%',
      paddingHorizontal: 12,
      marginVertical: 20,
      // marginTop: 5,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
    },
    nameText: {
      fontSize: 30,
      fontWeight: 'bold',
      marginRight: 10,
      color: DynamicAppStyles.colorSet[colorScheme].mainTextColor,
    },
    ageText: {
      bottom: 1,
      fontSize: 25,
      color: DynamicAppStyles.colorSet[colorScheme].mainTextColor,
    },
    captionView: {
      width: '100%',
      paddingHorizontal: 12,
    },
    itemView: {
      width: '100%',
      paddingVertical: 2,
      marginVertical: 2,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
    },
    icon: {
      width: size(20),
      height: size(20),
      tintColor: 'grey',
    },
    icon2: {
      // width: size(20),
      // height: size(18),
      width: size(22),
      height: size(19),
      tintColor: 'grey',
    },
    text: {
      paddingLeft: size(10),
      fontSize: size(16),
      color: DynamicAppStyles.colorSet[colorScheme].mainTextColor,
      backgroundColor: 'transparent',
    },
    lineView: {
      marginTop: 4,
      width: '100%',
      height: 1,
      backgroundColor: DynamicAppStyles.colorSet[colorScheme].hairlineColor,
    },
    bioView: {
      width: '100%',
      paddingHorizontal: 12,
      marginVertical: 15,
    },
    label: {
      fontSize: size(20),
    },
    bioText: {
      fontSize: size(16),
      color: DynamicAppStyles.colorSet[colorScheme].mainTextColor,
    },
    instagramView: {
      flex: 1,
      //width: '100%',
      marginHorizontal: 15,
      // paddingHorizontal: 12,
      marginBottom: 50
    },
    slide: {
      flex: 1,
      justifyContent: 'center',
    },
    myphotosItemView: {
      width: '100%',
      height: 400,
      // marginHorizontal: 8,
      marginVertical: 8,
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'grey',
      overflow: 'hidden',
    },
    inlineActionsContainer: {
      //   position: "absolute",
      // bottom: 0,
      // width: "95%",
      // alignSelf: "center",
      flex: 1,
      width: '100%',
      // backgroundColor:
      //   DynamicAppStyles.colorSet[colorScheme].inlineActionsColor,
      alignSelf: 'center',
      alignItems: 'center',
      position: 'absolute',
      bottom: -50,
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
      marginRight: 15,
    },
    closeButton__text: {
      backgroundColor: 'transparent',
      fontSize: 35,
      lineHeight: 35,
      color: '#FFF',
      textAlign: 'center',
    },
  });
};

export default dynamicStyles;