import { StyleSheet,Platform } from 'react-native';

const dynamicStyles = (colorScheme, appStyles) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      //marginTop:Platform.OS == 'ios'? 60 : 40,
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    },
    userImageContainer: {
      borderWidth: 0,
    },
    chatsChannelContainer: {
      // flex: 1,
      padding: 10,
    },
    content: {
      flexDirection: 'row',
    },
    message: {
      flex: 2,
      color: appStyles.colorSet[colorScheme].mainSubtextColor,
    },
  });
};

export default dynamicStyles;
