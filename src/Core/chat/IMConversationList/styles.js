import { StyleSheet, Dimensions } from "react-native";

const { height } = Dimensions.get("window");

const dynamicStyles = (appStyles, colorScheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    },
    userImageContainer: {
      borderWidth: 0,
    },
    chatsChannelContainer: {
      flex: 1,
      padding: 0,
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    },
    chatItemContainer: {
      flexDirection: "row",
      marginBottom: 20,
    },
    chatItemContent: {
      flex: 1,
      alignSelf: "center",
      marginLeft: 10,
    },
    chatFriendName: {
      color: appStyles.colorSet[colorScheme].mainTextColor,
      fontSize: 17,
    },
    content: {
      flexDirection: "row",
    },
    message: {
      flex: 2,
      color: appStyles.colorSet[colorScheme].mainSubtextColor,
    },
    emptyViewContainer: {
      marginTop: height / 5,
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
