import {
  StyleSheet
} from 'react-native';
import DynamicAppStyles from '../../DynamicAppStyles';

const dynamicStyles = (colorScheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      height: '100%',
    },
    safeAreaContainer: {
      flex: 1,
      backgroundColor: DynamicAppStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      backgroundColor: 'white',
    },
  });
};

export default dynamicStyles;