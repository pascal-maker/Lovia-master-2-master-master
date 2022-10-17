import React, { useState, useRef, useEffect } from "react";
import {
  Alert,
  SafeAreaView,
  FlatList,
  View,
  Text,
  Image,
  ActivityIndicator,
} from "react-native";
import PropTypes from "prop-types";
import ActionSheet from "react-native-actionsheet";
import { KeyboardAwareView } from "react-native-keyboard-aware-view";
import TNMediaViewerModal from "../../truly-native/TNMediaViewerModal";
import DialogInput from "react-native-dialog-input";
import { channelManager } from "../api";
import BottomInput from "./BottomInput";
import MessageThread from "./MessageThread";
import dynamicStyles from "./styles";
import { useColorScheme } from "react-native-appearance";
import { IMLocalized } from "../../localization/IMLocalization";
import RBSheet from "react-native-raw-bottom-sheet";
import { TouchableOpacity } from "react-native";

function IMChat(props) {
  const {
    onSendInput,
    onAudioRecordSend,
    onProfileClick,
    onProfileRec,
    thread,
    inputValue,
    onChangeTextInput,
    user,
    inReplyToItem,
    onLaunchCamera,
    onOpenPhotos,
    onAddMediaPress,
    uploadProgress,
    mediaItemURLs,
    isMediaViewerOpen,
    selectedMediaIndex,
    onChatMediaPress,
    onMediaClose,
    onChangeName,
    isRenameDialogVisible,
    groupSettingsActionSheetRef,
    privateSettingsActionSheetRef,
    showRenameDialog,
    onLeave,
    appStyles,
    onUserRemovePress,
    onUserBlockPress,
    onUserReportPress,
    onSenderProfilePicturePress,
    onReplyActionPress,
    onReplyingToDismiss,
    onDeleteThreadItem,
    channelItem,
    openGif,
  } = props;

  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);

  const [channel] = useState({});
  const [temporaryInReplyToItem, setTemporaryInReplyToItem] = useState(null);
  const [threadItemActionSheet, setThreadItemActionSheet] = useState({});
  const [gifs, setGifs] = useState([]);
  const [loading, setLoading] = useState(false);

  const photoUploadDialogRef = useRef();
  const threadItemActionSheetRef = useRef();

  const hasPreviouslyMarkedTyping = useRef(false);
  const staleUserTyping = useRef(null);

  const inBoundThreadItemSheetOptions = [
    IMLocalized("Reply"),
    IMLocalized("Cancel"),
  ];
  const outBoundThreadItemSheetOptions = [
    IMLocalized("Reply"),
    IMLocalized("Delete"),
    IMLocalized("Cancel"),
  ];

  useEffect(() => {
    return () => {
      handleIsUserTyping("");
    };
  }, []);

  useEffect(() => {
    if (threadItemActionSheet.options) {
      threadItemActionSheetRef.current.show();
    }
  }, [threadItemActionSheet]);

  async function fetchGifs(params) {
    console.log("fetchGifs");
    try {
      const API_KEY = "3oWgmNncMdRRRoJRWwBus7pYJOLyCJmv";
      const BASE_URL = "http://api.giphy.com/v1/gifs/search";
      const resJson = await fetch(`${BASE_URL}?api_key=${API_KEY}&q=${"abc"}`);
      const res = await resJson.json();
      console.log("res : ", res.data);
      setGifs(res.data);
      this.RBSheet.open();
    } catch (error) {
      console.warn(error);
    }
  }

  const handleIsUserTyping = (inputValue) => {
    clearTimeout(staleUserTyping.current);
    const userID = user.id || user.userID;
    const typingUsers = channelItem?.typingUsers || [];
    const typingUsersCopy = [...typingUsers];
    const notTypingUser = {
      userID,
      isTyping: false,
    };
    const typingUser = {
      userID,
      isTyping: true,
    };
    let typingUserIndex = -1;

    typingUserIndex = typingUsers.findIndex(
      (existingTypingUser) => existingTypingUser.userID === userID
    );

    if (inputValue?.length > 0) {
      if (typingUserIndex > -1) {
        typingUsersCopy[typingUserIndex] = typingUser;
      } else {
        typingUsersCopy.push(typingUser);
      }

      !hasPreviouslyMarkedTyping.current &&
        channelManager.markChannelTypingUsers(channelItem?.id, typingUsersCopy);
      hasPreviouslyMarkedTyping.current = true;
      return;
    }

    if (inputValue?.length === 0) {
      if (typingUserIndex > -1) {
        typingUsersCopy[typingUserIndex] = notTypingUser;
      } else {
        typingUsersCopy.push(notTypingUser);
      }

      hasPreviouslyMarkedTyping.current &&
        channelManager.markChannelTypingUsers(channelItem?.id, typingUsersCopy);
      hasPreviouslyMarkedTyping.current = false;
      return;
    }
  };

  const handleStaleUserTyping = () => {
    staleUserTyping.current = setTimeout(() => {
      handleIsUserTyping("");
    }, 2000);
  };

  const onChangeText = (text) => {
    onChangeTextInput(text);
    handleIsUserTyping(text);
    handleStaleUserTyping();
  };

  const onAudioRecordDone = (item) => {
    onAudioRecordSend(item);
  };

  const onSend = () => {
    onSendInput();
    handleIsUserTyping("");
  };

  const onPhotoUploadDialogDone = (index) => {
    if (index == 0) {
      onLaunchCamera();
    }

    if (index == 1) {
      onOpenPhotos();
    }
  };

  const onGroupSettingsActionDone = (index) => {
    if (index == 0) {
      showRenameDialog(true);
    } else if (index == 1) {
      onLeave();
    }
  };

  const onPrivateSettingsActionDone = (index) => {
    if (index == 3) {
      return;
    }
    var message, actionCallback;
    if (index == 0) {
      actionCallback = onUserRemovePress;
      message = IMLocalized(
        "Are you sure you want to Remove this user? You won't see their messages again."
      );
    } else if (index == 1) {
      actionCallback = onUserBlockPress;
      message = IMLocalized(
        "Are you sure you want to block this user? You won't see their messages again."
      );
    } else if (index == 2) {
      actionCallback = onUserReportPress;
      message = IMLocalized(
        "Are you sure you want to report this user? You won't see their messages again."
      );
    }
    Alert.alert(IMLocalized("Are you sure?"), message, [
      {
        text: IMLocalized("Yes"),
        onPress: actionCallback,
      },
      {
        text: IMLocalized("Cancel"),
        style: "cancel",
      },
    ]);
  };

  const sendGif = (url) => {
    console.log("url : ", url);
    this.RBSheet.close();
    global.link = url;
    openGif(url);
  };

  const onMessageLongPress = (inReplyToItem) => {
    setTemporaryInReplyToItem(inReplyToItem);

    if (user.id === inReplyToItem.senderID) {
      setThreadItemActionSheet({
        inBound: false,
        options: outBoundThreadItemSheetOptions,
        destructiveButtonIndex: 1,
        cancelButtonIndex: 2,
      });
    } else {
      setThreadItemActionSheet({
        inBound: true,
        options: inBoundThreadItemSheetOptions,
        cancelButtonIndex: 1,
      });
    }
  };

  const onReplyPress = (index) => {
    if (index == 0) {
      onReplyActionPress && onReplyActionPress(temporaryInReplyToItem);
    }
  };

  const handleInBoundThreadItemActionSheet = (index) => {
    if (index == 0) {
      onReplyPress(index);
    }
  };

  const handleOutBoundThreadItemActionSheet = (index) => {
    if (index == 0) {
      onReplyPress(index);
    }

    if (index == 1) {
      onDeleteThreadItem && onDeleteThreadItem(temporaryInReplyToItem);
    }
  };

  const onThreadItemActionSheetDone = (index) => {
    if (threadItemActionSheet.inBound) {
      handleInBoundThreadItemActionSheet(index);
    } else {
      handleOutBoundThreadItemActionSheet(index);
    }
  };

  return (
    <SafeAreaView style={styles.personalChatContainer}>
      <KeyboardAwareView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.nonkeyboardContainer}
      >
        <MessageThread
          thread={thread}
          user={user}
          appStyles={appStyles}
          onChatMediaPress={onChatMediaPress}
          onProfileClick={onProfileClick}
          onProfileRec={onProfileRec}
          onSenderProfilePicturePress={onSenderProfilePicturePress}
          onMessageLongPress={onMessageLongPress}
          channelItem={channelItem}
        />
      </KeyboardAwareView>
      <BottomInput
        uploadProgress={uploadProgress}
        value={inputValue}
        onAudioRecordDone={onAudioRecordDone}
        onChangeText={onChangeText}
        onSend={onSend}
        onRBsheetOpen={() => fetchGifs()}
        appStyles={appStyles}
        trackInteractive={true}
        onAddMediaPress={() => onAddMediaPress(photoUploadDialogRef)}
        openGif={openGif}
        inReplyToItem={inReplyToItem}
        onReplyingToDismiss={onReplyingToDismiss}
      />
      <ActionSheet
        title={IMLocalized("Group Settings")}
        options={[
          IMLocalized("Rename Group"),
          IMLocalized("Leave Group"),
          IMLocalized("Cancel"),
        ]}
        cancelButtonIndex={2}
        destructiveButtonIndex={1}
      />
      <ActionSheet
        title={"Are you sure?"}
        options={["Confirm", "Cancel"]}
        cancelButtonIndex={1}
        destructiveButtonIndex={0}
      />
      <DialogInput
        isDialogVisible={isRenameDialogVisible}
        title={IMLocalized("Change Name")}
        hintInput={channel.name}
        textInputProps={{ selectTextOnFocus: true }}
        submitText={IMLocalized("OK")}
        submitInput={onChangeName}
        closeDialog={() => {
          showRenameDialog(false);
        }}
      />
      <ActionSheet
        ref={photoUploadDialogRef}
        title={IMLocalized("Photo Upload")}
        options={[
          IMLocalized("Launch Camera"),
          IMLocalized("Open Photo Gallery"),
          IMLocalized("Cancel"),
        ]}
        cancelButtonIndex={2}
        onPress={onPhotoUploadDialogDone}
      />
      <ActionSheet
        ref={groupSettingsActionSheetRef}
        title={IMLocalized("Group Settings")}
        options={[
          IMLocalized("Rename Group"),
          IMLocalized("Leave Group"),
          IMLocalized("Cancel"),
        ]}
        cancelButtonIndex={2}
        destructiveButtonIndex={1}
        onPress={onGroupSettingsActionDone}
      />
      <ActionSheet
        ref={privateSettingsActionSheetRef}
        title={IMLocalized("Actions")}
        options={[
          IMLocalized("Remove user"),
          IMLocalized("Block user"),
          IMLocalized("Report user"),
          IMLocalized("Cancel"),
        ]}
        cancelButtonIndex={3}
        onPress={onPrivateSettingsActionDone}
      />
      {threadItemActionSheet?.options && (
        <ActionSheet
          ref={threadItemActionSheetRef}
          title={IMLocalized("Actions")}
          options={threadItemActionSheet.options}
          cancelButtonIndex={threadItemActionSheet.cancelButtonIndex}
          destructiveButtonIndex={threadItemActionSheet.destructiveButtonIndex}
          onPress={onThreadItemActionSheetDone}
        />
      )}
      <TNMediaViewerModal
        mediaItems={mediaItemURLs}
        isModalOpen={isMediaViewerOpen}
        onClosed={onMediaClose}
        selectedMediaIndex={selectedMediaIndex}
      />
      <RBSheet
        ref={(ref) => {
          this.RBSheet = ref;
        }}
        height={400}
        openDuration={250}
        customStyles={
          {
            // container: {
            //   justifyContent: "center",
            //   alignItems: "center",
            // },
          }
        }
      >
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <FlatList
            data={gifs}
            renderItem={(item) => (
              <View
                style={{
                  height: 150,
                  flex: 1,
                  backgroundColor: "white",
                }}
              >
                <TouchableOpacity
                  style={{
                    height: 150,
                    backgroundColor: "white",
                  }}
                  onPress={() => sendGif(item.item.images.original.url)}
                >
                  <Image
                    style={{ flex: 1 }}
                    source={{ uri: item.item.images.original.url }}
                    onLoadStart={() => setLoading(true)}
                    onLoadEnd={() => setLoading(false)}
                  ></Image>
                  {loading == true ? (
                    <ActivityIndicator
                      //visibility of Overlay Loading Spinner
                      visible={loading}
                      //Text with the Spinner
                      textContent={"Loading..."}
                      style={{ marginBottom: 65 }}
                      //Text style of the Spinner Text
                      textStyle={{ color: "#3c9c94" }}
                    />
                  ) : null}
                </TouchableOpacity>
              </View>
            )}
            numColumns={2}
            key={"#"}
            keyExtractor={(item) => "#" + item.id}
          />
        </View>
      </RBSheet>
    </SafeAreaView>
  );
}

IMChat.propTypes = {
  onSendInput: PropTypes.func,
  onChangeName: PropTypes.func,
  onChangeTextInput: PropTypes.func,
  onLaunchCamera: PropTypes.func,
  onOpenPhotos: PropTypes.func,
  onAddMediaPress: PropTypes.func,
  openGif: PropTypes.func,
  user: PropTypes.object,
  uploadProgress: PropTypes.number,
  isMediaViewerOpen: PropTypes.bool,
  isRenameDialogVisible: PropTypes.bool,
  selectedMediaIndex: PropTypes.number,
  onChatMediaPress: PropTypes.func,
  onMediaClose: PropTypes.func,
  showRenameDialog: PropTypes.func,
  onLeave: PropTypes.func,
};

export default IMChat;
