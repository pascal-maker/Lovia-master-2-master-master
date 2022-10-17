import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  BackHandler,
  TouchableOpacity,
  Text,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import { connect } from "react-redux";
import TextButton from "react-native-button";
import { userAPIManager } from "../../../api";
import { authManager } from "../../../onboarding/utils/api";

import TNActivityIndicator from "../../../truly-native/TNActivityIndicator";
import IMFormComponent from "../IMFormComponent/IMFormComponent";
import { setUserData } from "../../../onboarding/redux/auth";
import { IMLocalized } from "../../../localization/IMLocalization";
import { Appearance } from "react-native-appearance";
import { firebase } from "../../../../Core/api/firebase/config";
import DynamicAppStyles from "../../../../DynamicAppStyles";
import DatingConfig from "../../../../DatingConfig";
import { deleteAccount } from "../../../api/firebase/auth";

const matchesDBRef = firebase.firestore().collection("swipes");
const socialFeedsRef = firebase.firestore().collection("social_feeds");
const channelsRef = firebase.firestore().collection("channels");

const postsDBRef = firebase.firestore().collection("post");
const usersDBRef = firebase.firestore().collection("users");

class IMEditProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.appStyles = props.route.params.appStyles;
    let screenTitle = props.route.params.screenTitle;
    let COLOR_SCHEME = Appearance.getColorScheme();
    let currentTheme = this.appStyles.navThemeConstants[COLOR_SCHEME];
    props.navigation.setOptions({
      headerTitle: screenTitle,
      headerRight: () => (
        <TextButton style={{ marginRight: 12 }} onPress={this.onFormSubmit}>
          Done
        </TextButton>
      ),
      headerStyle: {
        backgroundColor: currentTheme.backgroundColor,
      },
      headerTintColor: currentTheme.fontColor,
    });
    this.form = props.route.params.form;
    this.onComplete = props.route.params.onComplete;

    this.state = {
      form: props.form,
      alteredFormDict: {},
      loading: false,
    };
    this.didFocusSubscription = props.navigation.addListener(
      "focus",
      (payload) =>
        BackHandler.addEventListener(
          "hardwareBackPress",
          this.onBackButtonPressAndroid
        )
    );
  }

  componentDidMount() {
    this.willBlurSubscription = this.props.navigation.addListener(
      "beforeRemove",
      (payload) =>
        BackHandler.removeEventListener(
          "hardwareBackPress",
          this.onBackButtonPressAndroid
        )
    );
  }

  componentWillUnmount() {
    this.didFocusSubscription && this.didFocusSubscription();
    this.willBlurSubscription && this.willBlurSubscription();
  }

  onBackButtonPressAndroid = () => {
    this.props.navigation.goBack();
    return true;
  };

  isInvalid = (value, regex) => {
    const regexResult = regex.test(value);

    if (value.length > 0 && !regexResult) {
      return true;
    }
    if (value.length > 0 && regexResult) {
      return false;
    }
  };

  onFormSubmit = () => {
    var newUser = { ...this.props.user };
    const form = this.form;
    const alteredFormDict = this.state.alteredFormDict;
    var allFieldsAreValid = true;

    form.sections.forEach((section) => {
      section.fields.forEach((field) => {
        const newValue = alteredFormDict[field.key]?.trim();
        if (newValue != null) {
          if (field.regex && this.isInvalid(newValue, field.regex)) {
            allFieldsAreValid = false;
          } else {
            newUser[field.key] = alteredFormDict[field.key]?.trim();
          }
        }
      });
    });

    if (allFieldsAreValid) {
      userAPIManager.updateUserData(this.props.user.id, newUser);
      this.props.setUserData({ user: newUser });
      this.props.navigation.goBack();
      if (this.onComplete) {
        this.onComplete();
      }
    } else {
      alert(
        IMLocalized(
          "An error occurred while trying to update your account. Please make sure all fields are valid."
        )
      );
    }
  };

  onFormChange = (alteredFormDict) => {
    this.setState({ alteredFormDict });
  };

  deleteUser = async () => {
    Alert.alert("Alert", "Are you sure you want to delete your profile", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: async () => {
          this.setState({ loading: true });

          var user = firebase.auth().currentUser;

          if (user != null) {
            let uid = user.uid;
            await this.deleteUserMatch(uid);
            await this.deleteUserFeedsAndChannels(uid);
            await this.deleteUserChannels(uid);
            await this.deleteUserPosts(uid);
            await this.deleteUserCurrent(uid);
            this.setState({ loading: false });
          }
        },
      },
    ]);
  };

  deleteUserMatch = async (currentUserID) => {
    var user = firebase.auth().currentUser;
    console.log(user);
    await matchesDBRef
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let match = doc.data();
          if (match.author == user.uid || match.swipedProfile == user.uid)
            doc.ref.delete();
          // console.log(match.author);
        });
        console.log("Deleted chat Matches ");
      })
      .catch(function (error) {
        console.log("Error in Deleting Matches: ", error);
      });
  };

  deleteUserFeedsAndChannels = async (currentUserID) => {
    var user = firebase.auth().currentUser;
    console.log(user.uid);

    await socialFeedsRef
      .doc("0Ae9oWyDNHbtycSQ8V44sSoTY8r2")
      .collection("chat_feed")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (doc) => {
          let match = doc.data();
          console.log(" Channel id ", match.id);
          // await this.deleteUserChannels(match.id);
        });
        console.log("Deleted chat Channels ");
      })
      .catch(function (error) {
        console.log("Error in deleting chat Channels ", error);
      });

    //// Delete my socialFeeds
    // await socialFeedsRef
    //   .doc(user.uid)
    //   .delete()
    //   .then(() => {
    //     // User deleted.
    //     console.log(" Deleted socialFeeds  ");
    //     // this.onLogout();
    //   })
    //   .catch((error) => {
    //     // An error ocurred
    //     console.log("Error in socialFeeds ", error);
    //   });
  };

  deleteUserChannels = async (channelID) => {
    await channelsRef
      .doc(channelID)
      .collection("thread")
      .get()
      .then((querySnapshot) => {
        console.log("Total Threads: ", querySnapshot.size);
        querySnapshot.forEach((doc) => {
          let match = doc.data();
          console.log("Threads ", match);
          doc.ref.delete();
        });
      });
    await channelsRef.doc(channelID).delete();
  };

  deleteUserPosts = async (currentUserID) => {
    var user = firebase.auth().currentUser;
    console.log(user.uid);
    /// find and delete my channels in my socialFeeds
    await postsDBRef
      .where("userId", "==", user.uid)
      .get()
      .then((querySnapshot) => {
        // console.log("Total Posts: ", querySnapshot.size());

        querySnapshot.forEach((doc) => {
          let match = doc.data();
          doc.ref.delete();
        });
        console.log("Deleted Posts ");
      })
      .catch(function (error) {
        console.log("Error in deleting Posts ", error);
      });
  };

  deleteUserCurrent = async (currentUserID) => {
    const user = firebase.auth().currentUser;
    console.log(user.email);
    firebase
      .auth()
      .signInWithEmailAndPassword(user.email, "123456")
      .then((userx) => {
        const user = firebase.auth().currentUser;
        usersDBRef
          .doc(user.uid)
          .delete()
          .then(() => {
            // User deleted.
            console.log(" Deleted USER for Database ");
            user
              .delete()
              .then(() => {
                // User deleted.
                console.log(" Deleted USER ");
                this.onLogout();
              })
              .catch((error) => {
                // An error ocurred
                console.log("Error in deleting USER ", error);
              });
          })
          .catch((error) => {
            // An error ocurred
            console.log("Error in deleting USER ", error);

            // ...
          });
      })
      .catch(function (error) {
        console.log("Error in deleting USER ", error);
      });
  };

  onLogout = async () => {
    // authManager.logout(firebase.auth().currentUser);
    // dispatch(logout());
    this.props.navigation.navigate("LoadScreen", {
      appStyles: DynamicAppStyles,
      appConfig: DatingConfig,
    });
  };

  render() {
    return (
      <>
        {/* {this.state.loading && (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center",marginTop:50 }}
          >
            <ActivityIndicator />
          </View>
        )}
        <IMFormComponent
          form={this.form}
          initialValuesDict={this.props.user}
          onFormChange={this.onFormChange}
          navigation={this.props.navigation}
          appStyles={this.appStyles}
          deleteUser={() => this.deleteUser()}
        /> */}

        {this.state.loading ? (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 100,
            }}
          >
            <ActivityIndicator />
          </View>
        ) : (
          <IMFormComponent
            form={this.form}
            initialValuesDict={this.props.user}
            onFormChange={this.onFormChange}
            navigation={this.props.navigation}
            appStyles={this.appStyles}
            deleteUser={() => this.deleteUser()}
          />
        )}
      </>
    );
  }
}

IMEditProfileScreen.propTypes = {
  user: PropTypes.object,
  setUserData: PropTypes.func,
};

const mapStateToProps = ({ auth }) => {
  return {
    user: auth.user,
  };
};

export default connect(mapStateToProps, { setUserData })(IMEditProfileScreen);
