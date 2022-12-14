import React, { memo } from "react";
import PropTypes from "prop-types";
import { View, FlatList, ActivityIndicator, Text } from "react-native";

import IMConversationView from "../IMConversationView";
import dynamicStyles from "./styles";
import { useColorScheme } from "react-native-appearance";
import { TNEmptyStateView } from "../../truly-native";

const IMConversationList = memo((props) => {
  const {
    onConversationPress,
    emptyStateConfig,
    conversations,
    loading,
    user,
    appStyles,
    headerComponent,
  } = props;
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);

  const renderConversationView = ({ item }) => (
    <IMConversationView
      onChatItemPress={onConversationPress}
      item={item}
      appStyles={appStyles}
      user={user}
    />
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator style={{ marginTop: 15 }} size="small" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.chatsChannelContainer}>
        {conversations && conversations.length > 0 && (
          <View>
            <Text style={styles.title}>Conversations</Text>
            <FlatList
              vertical={true}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              data={conversations}
              renderItem={renderConversationView}
              keyExtractor={(item) => `${item.id}`}
              removeClippedSubviews={false}
              ListHeaderComponent={headerComponent}
            />
          </View>
        )}
        {conversations && conversations.length <= 0 && (
          <View style={styles.emptyViewContainer}>
            <TNEmptyStateView
              emptyStateConfig={emptyStateConfig}
              appStyles={appStyles}
            />
          </View>
        )}
      </View>
      {/* <View ><Text onPress={()=>props.navigation.navigate("ProfileScreen")}>Hello</Text></View> */}
    </View>
  );
});

IMConversationList.propTypes = {
  onConversationPress: PropTypes.func,
  conversations: PropTypes.array,
};

export default IMConversationList;
