import { StyleSheet } from 'react-native';

const dynamicStyles = (appStyles, colorScheme) => {
  return StyleSheet.create({
    headerButtonContainer: {
      padding: 10,
    },
    Image: {
      width: 28,
      height: 25,
      margin: 6,
    },
    title: {
      color: appStyles.colorSet[colorScheme].mainTextColor,
      fontSize: 12,
    },
  });
};

export default dynamicStyles;
