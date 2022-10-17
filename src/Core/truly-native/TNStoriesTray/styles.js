import {
  StyleSheet
} from 'react-native';

const dynamicStyles = (appStyles, colorScheme) => {
  return StyleSheet.create({
    storiesContainer: {
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      marginBottom: 5,
      // paddingTop: Platform.OS == 'ios' ? 40 : 35,
      flexDirection: 'row',
    },
    seenStyle: {
      borderColor: appStyles.colorSet[colorScheme].grey,
      borderWidth: 1,
    },
    title: {
      color: appStyles.colorSet[colorScheme].mainTextColor,
      fontSize: 20,
      marginBottom: 10,
      fontWeight: "bold",
    },
  });
};

export default dynamicStyles;