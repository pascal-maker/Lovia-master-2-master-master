import React, { useState, useEffect, useRef, useContext } from "react";
import {
  StyleSheet,
  View,
  Alert,
  StatusBar,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  Image,
  Dimensions,
  AppState, // eslint-disable-line react-native/split-platform-components
} from "react-native";
import AppStyles from "../../AppStyles";
import { useSelector, useDispatch, ReactReduxContext } from "react-redux";
import Geolocation from "@react-native-community/geolocation";
import { firebase } from "../../Core/api/firebase/config";
import ActivityModal from "../../components/ActivityModal";
import Deck from "../../components/swipe/deck";
import NoMoreCard from "../../components/swipe/no_more_card";
import NewMatch from "../../components/swipe/newMatch";
import DynamicAppStyles from "../../DynamicAppStyles";
import DatingConfig from "../../DatingConfig";
import { setUserData } from "../../Core/onboarding/redux/auth";
import { userAPIManager } from "../../Core/api";
import { isDatingProfileCompleteForUser } from "../../utils";
import { SwipeTracker } from "../../api/";
import { IMLocalized } from "../../Core/localization/IMLocalization";
import dynamicStyles from "./styles";
import { useColorScheme } from "react-native-appearance";
import { notificationManager } from "../../Core/notifications";
import { useIap } from "../../Core/inAppPurchase/context";
import { getUserAwareCanUndoAsync } from "../../utils";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";

const SwipeScreen = (props) => {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const styles = dynamicStyles(colorScheme);

  const { store } = useContext(ReactReduxContext);

  const { setSubscriptionVisible } = useIap();
  const user = useSelector((state) => state.auth.user);
  const swipes = useSelector((state) => state.dating.swipes);
  const bannedUserIDs = useSelector((state) => state.userReports.bannedUserIDs);
  const matches = useSelector((state) => state.dating.matches);
  const isPlanActive = useSelector((state) => state.inAppPurchase.isPlanActive);
  // const incomingSwipes = useSelector(state => state.dating.incomingSwipes);
  const dispatch = useDispatch();

  const [recommendations, setRecommendations] = useState([]);
  const [
    hasStartedFetchingFirstRecommendationsBatch,
    setHasStartedFetchingFirstRecommendationsBatch,
  ] = useState(false);
  const [showMode, setShowMode] = useState(0);
  const [currentMatchData, setCurrentMatchData] = useState(null);
  const [appState, setAppState] = useState(AppState.currentState);
  const [positionWatchID, setPositionWatchID] = useState(null);
  const [userSettingsDidChange, setUserSettingsDidChange] = useState(false);
  const [
    hasConsumedRecommendationsStream,
    setHasConsumedRecommendationsStream,
  ] = useState(false);
  const [hasValidatedCurrentProfile, setHasValidatedCurrentProfile] = useState(
    false
  );
  const [canUserSwipe, setCanUserSwipe] = useState(false);

  const recommendationBatchLimit = 75;
  const swipeThreshold = 5;
  const usersRef = firebase.firestore().collection("users");
  var userRef = null;

  console.log("usersRef : ", usersRef);

  const userAwareCanUndo = useRef(false);
  const isLoadingRecommendations = useRef(false);
  const swipeCountDetail = useRef({});
  //const didFocusSubscription = useRef(null);
  const swipeTracker = useRef(new SwipeTracker(store, user.id));
  const recommendationRef = useRef(
    usersRef.orderBy("id", "desc").limit(recommendationBatchLimit)
  );
  console.log("recommendationRef : ", recommendationRef);
  useEffect(() => {
    StatusBar.setHidden(false);
    swipeTracker.current.subscribeIfNeeded();

    let didFocusSubscription = props.navigation.addListener(
      "focus",
      (payload) => handleComponentDidFocus()
    );

    AppState.addEventListener("change", handleAppStateChange);

    if (user) {
      userRef = usersRef.doc(user.id);
    }

    // if (!isDatingProfileCompleteForUser(user)) {
    //   handleIncompleteUserData();
    // } else {
    //   setHasValidatedCurrentProfile(true);
    // }

    getUserSwipeCount();

    watchPositionChange();

    return () => {
      didFocusSubscription && didFocusSubscription();
      AppState.removeEventListener("change", handleAppStateChange);
      positionWatchID != null && Geolocation.clearWatch(positionWatchID);
      swipeTracker.current.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (matches != null) {
      // We retrieve all new matches and notify the user
      const unseenMatches = matches.filter((match) => !match.matchHasBeenSeen);

      console.log("unseenMatches : ", unseenMatches);
      console.log("unseenMatches::", unseenMatches[0]);
      if (unseenMatches.length > 0 && !currentMatchData) {
        // Send push notification
        notificationManager.sendPushNotification(
          unseenMatches[0],
          IMLocalized("New Follower!🤩"),
          IMLocalized("Someone started following you."),
          "friend_match",
          { fromUser: user }
        );
        setCurrentMatchData(unseenMatches[0]);
      }
    }
  }, [matches, currentMatchData]);

  useEffect(() => {
    if (currentMatchData) {
      swipeTracker.current.markSwipeAsSeen(currentMatchData, user);
      setShowMode(2);
    }
  }, [currentMatchData]);

  useEffect(() => {
    if (recommendations.length === 0 && swipes) {
      getMoreRecommendationsIfNeeded();
    }
  }, [swipes, recommendations]);

  useEffect(
    () => {
      setRecommendations([]);
      isLoadingRecommendations.current = false;
      setHasConsumedRecommendationsStream(false);
      // recommendationRef.current = usersRef
      //   .orderBy('id', 'desc')
      //   .limit(recommendationBatchLimit);
    },
    [
      // user?.settings?.distance_radius,
      // user?.settings?.gender_preference,
      // user?.settings?.gender,
    ]
  );

  const getUserSwipeCount = async () => {
    const userID = user.id || user.userID;

    const swipeCountInfo = await swipeTracker.current.getUserSwipeCount(userID);

    if (swipeCountInfo) {
      swipeCountDetail.current = swipeCountInfo;
    } else {
      resetSwipeCountDetail();
    }

    getCanUserSwipe(false);
  };

  const resetSwipeCountDetail = () => {
    swipeCountDetail.current = {
      count: 0,
      createdAt: {
        seconds: Date.now() / 1000,
      },
    };
  };

  const updateSwipeCountDetail = () => {
    const userID = user.id || user.userID;

    swipeTracker.current.updateUserSwipeCount(
      userID,
      swipeCountDetail.current.count
    );
  };

  const getSwipeTimeDifference = (swipeCountDetail) => {
    let now = +new Date();
    let createdAt = +new Date();

    if (swipeCountDetail?.createdAt?.seconds) {
      createdAt = +new Date(swipeCountDetail.createdAt.seconds * 1000);
    }

    return now - createdAt;
  };

  const getCanUserSwipe = (shouldUpdate = true) => {
    if (isPlanActive) {
      setCanUserSwipe(true);

      return true;
    }

    const oneDay = 60 * 60 * 24 * 1000;

    const swipeTimeDifference = getSwipeTimeDifference(
      swipeCountDetail.current
    );

    if (swipeTimeDifference > oneDay) {
      resetSwipeCountDetail();
      updateSwipeCountDetail();

      setCanUserSwipe(true);

      return true;
    }

    if (
      swipeTimeDifference < oneDay &&
      swipeCountDetail.current.count < DatingConfig.dailySwipeLimit
    ) {
      if (shouldUpdate) {
        swipeCountDetail.current.count += 1;
        updateSwipeCountDetail();
      }

      setCanUserSwipe(
        swipeCountDetail.current.count + 1 <= DatingConfig.dailySwipeLimit
      );

      return true;
    }

    if (
      swipeTimeDifference < oneDay &&
      swipeCountDetail.current.count >= DatingConfig.dailySwipeLimit
    ) {
      setCanUserSwipe(false);

      return false;
    }
  };

  const handleAppStateChange = (nextAppState) => {
    if (appState.match(/inactive|background/) && nextAppState === "active") {
      userRef
        .update({
          isOnline: true,
        })
        .then(() => {
          dispatch(setUserData({ user: { ...user, isOnline: true } }));
        })
        .then(() => {
          setAppState(nextAppState);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      userRef
        .update({
          isOnline: false,
        })
        .then(() => {
          dispatch(setUserData({ user: { ...user, isOnline: false } }));
        })
        .then(() => {
          setAppState(nextAppState);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const watchPositionChange = async () => {
    if (Platform.OS === "ios") {
      setPositionWatchID(watchPosition());
    } else {
      handleAndroidLocationPermission();
    }
  };

  const handleAndroidLocationPermission = async () => {
    try {
      const { status } = await Location.requestPermissionsAsync();
      // requestBackgroundPermissionsAsync()
      if (status === "granted") {
        setPositionWatchID(watchPosition());
      } else {
        alert(
          IMLocalized(
            "Location permission denied. Turn on location to use the app."
          )
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const watchPosition = () => {
    return Geolocation.watchPosition((position) => {
      const locationDict = {
        position: {
          // for legacy reasons
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
        location: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
      };
      userRef
        .update(locationDict)
        .then(() => {
          dispatch(setUserData({ user: { ...user, ...locationDict } }));
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  const handleComponentDidFocus = () => {
    // if (userSettingsDidChange) {
    //   setUserSettingsDidChange(false);
    //   setRecommendations([]);
    //   setHasConsumedRecommendationsStream(false);
    //   isLoadingRecommendations = false;
    //   recommendationRef.current = usersRef
    //     .orderBy("id", "desc")
    //     .limit(recommendationBatchLimit);
    // }
  };

  const handleIncompleteUserData = () => {
    Alert.alert(
      IMLocalized("Let's complete your profile"),
      IMLocalized(
        "Welcome to Lovia. Let's complete your profile to let other people find you."
      ),
      [
        {
          text: IMLocalized("Let's go"),
          onPress: () => {
            user.profilePictureURL
              ? props.navigation.navigate("AccountDetails", {
                  screenTitle: IMLocalized("profile"),
                  appStyles: DynamicAppStyles,
                  form: DatingConfig.editProfileFields,
                  onComplete: () => {},
                })
              : props.navigation.navigate("AddProfilePicture");
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleNewMatchButtonTap = (nextScreen) => {
    setShowMode(0);
    setCurrentMatchData(null);
    if (nextScreen) {
      props.navigation.navigate(nextScreen);
    }
  };

  /*
   ** Returns null if otherUser is not compatible with the search filters of the current user
   ** Otherwise, it appends the distance property to the otherUser object.
   */
  const hydratedValidRecommendation = (otherUser) => {
    var userSettings = user.settings;
    if (!userSettings) {
      userSettings = {
        distance_radius: "unlimited",
        gender_preference: "all",
        school_preference: "all",
        wall_preference: "all",
        show_me: true,
      };
      let newUser = { ...user, settings: userSettings };
      userAPIManager.updateUserData(user?.id, newUser);
      dispatch(setUserData({ user: newUser }));
    }
    const myLocation = user.location;

    const appDistance = (userSettings &&
      userSettings.distance_radius &&
      userSettings.distance_radius.toLowerCase() != "unlimited" &&
      userSettings.distance_radius.split(" ")) || ["100000"];
    const distanceValue = Number(appDistance[0]);
    const { firstName, email, phone, profilePictureURL, id } = otherUser;
    const defaultAvatar =
      "https://www.iosapptemplates.com/wp-content/uploads/2019/06/empty-avatar.jpg";

    const location = otherUser.location ? otherUser.location : "unlimited";
    const isNotCurrentUser = id != user.id;
    const hasNotBeenBlockedByCurrentUser =
      bannedUserIDs != null && !bannedUserIDs.includes(id);
    const hasPreviouslyNotBeenSwiped =
      swipes != null && !swipes.find((user) => user.id == id);

    const otherUserProfileIsPublic =
      otherUser.settings && otherUser.settings.show_me != null
        ? otherUser.settings.show_me == "true"
        : true;
    console.log("======================================================");
    console.log("firstName : ", firstName);
    console.log("email : ", email);
    // console.log("phone : ", phone);
    console.log("profilePictureURL : ", profilePictureURL);
    console.log("id : ", id);

    const currentUserGenderPre = user.settings
      ? user.settings.gender_preference
      : "all";

    const otherUserGender = otherUser.gender ? otherUser.gender : "all";
    const currentUserGenderFemale = user.settings
      ? user.settings.gender_preference
      : "female";
    const otherUserGenderFemale = otherUser.gender
      ? otherUser.gender
      : "female";
    const myGenderPre =
      (userSettings && userSettings?.gender_preference) || "all";
    const isGenderCompatible =
      myGenderPre == "all"
        ? true
        : currentUserGenderPre.toLowerCase() == otherUserGender.toLowerCase();
    myGenderPre == "female"
      ? true
      : currentUserGenderFemale.toLowerCase() ==
        otherUserGenderFemale.toLowerCase();

    const currentUserSchoolPre = user.settings
      ? user.settings.school_preference
      : "all";

    const otherUserSchool = otherUser ? otherUser.school : "all";

    const myschoolPre =
      (userSettings && userSettings?.school_preference) || "all";

    var isMatches;

    matches.map((item) => {
      if (item.id == id) {
        console.log("false");
        isMatches = false;
      } else {
        console.log("true");
      }
    });
    console.log("isMatches : ", isMatches);

    const isSchoolCompatible =
      myschoolPre == "all" ? true : otherUserSchool == currentUserSchoolPre;

    // const isMatches = id == matches[0].id ? false : true;
    console.log("isSchoolCompatible : ", myschoolPre);

    console.log("profilePictureURL : ", profilePictureURL);

    if (
      firstName &&
      // firstName.length > 0 &&
      // (email || phone) &&
      // profilePictureURL &&
      // profilePictureURL != defaultAvatar &&
      (location || appDistance == "100000") &&
      isNotCurrentUser &&
      hasPreviouslyNotBeenSwiped &&
      isGenderCompatible &&
      isSchoolCompatible &&
      // otherUserProfileIsPublic &&
      hasNotBeenBlockedByCurrentUser &&
      isMatches == undefined
    ) {
      if (!location || !myLocation) {
        otherUser.distance = IMLocalized("> 100 Km away");
        return otherUser;
      }

      otherUser.distance = distance(
        location.latitude,
        location.longitude,
        myLocation.latitude,
        myLocation.longitude
      );

      const otherUserDistanceNumber = otherUser.distance.match(/\d+/);
      console.log("otherUserDistanceNumber", otherUserDistanceNumber);
      const isWithinDistanceRadius =
        otherUserDistanceNumber?.length > 0 &&
        otherUserDistanceNumber[0] <= distanceValue;

      if (appDistance == "100000" || isWithinDistanceRadius) {
        return otherUser;
      }
    }
    return null;
  };

  const distance = (lat1, lon1, lat2, lon2, unit = "K") => {
    console.log("location : ", lat1, lon1, lat2, lon2);
    if (lat1 == lat2 && lon1 == lon2) {
      return "< 1 Km";
    } else {
      var radlat1 = (Math.PI * lat1) / 180;
      var radlat2 = (Math.PI * lat2) / 180;
      var theta = lon1 - lon2;
      var radtheta = (Math.PI * theta) / 180;
      var dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit == "K") {
        dist = dist * 1.609344;
      }
      if (unit == "N") {
        dist = dist * 0.8684;
      }

      // const radlat1 = (Math.PI * lat1) / 180;
      // const radlat2 = (Math.PI * lat2) / 180;
      // const theta = lon1 - lon2;
      // const radtheta = (Math.PI * theta) / 180;
      // let dist =
      //   Math.sin(radlat1) * Math.sin(radlat2) +
      //   Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

      // if (dist > 1) {
      //   dist = 1;
      // }

      // dist = Math.acos(dist);
      // dist = (dist * 180) / Math.PI;
      // dist = dist * 60 * 1.1515;

      // if (unit == "K") {
      //   // dist = dist * 1.609344;
      //   dist = dist * 0.621371;
      // }

      // if (unit == "N") {
      //   dist = dist * 0.8684;
      // }

      const distance = Math.round(dist);
      if (distance >= 2.0) {
        return distance + " " + IMLocalized("Km");
      }
      return IMLocalized("1 Km");
    }
  };

  const getMoreRecommendationsIfNeeded = async () => {
    if (isLoadingRecommendations.current || hasConsumedRecommendationsStream) {
      return;
    }

    isLoadingRecommendations.current = true;

    try {
      const documentSnapshots = await recommendationRef.current.get();
      console.log("documentSnapshots : ", documentSnapshots);
      const docs = documentSnapshots.docs;
      console.log("docs : ", docs);
      if (docs.length > 0) {
        // Get the last visible recommendation document and construct a new query starting at this document,
        recommendationRef.current = usersRef
          .orderBy("id", "desc")
          .startAfter(documentSnapshots.docs[docs.length - 1])
          .limit(recommendationBatchLimit);

        // Filter out invalid recommendations and update the UI data source
        const newRecommendations = filteredAndHydratedRecommendations(docs);

        console.log("newRecommendationsx : ", newRecommendations);

        isLoadingRecommendations.current = false;

        if (newRecommendations.length > 0) {
          setRecommendations([...recommendations, ...newRecommendations]);
        } else {
          getMoreRecommendationsIfNeeded();
        }
      } else {
        isLoadingRecommendations.current = false;
        setHasConsumedRecommendationsStream(true);
      }
    } catch (error) {
      console.log(error);
      alert(error);
      isLoadingRecommendations.current = false;
    }
  };

  const filteredAndHydratedRecommendations = (docs) => {
    const hydratedRecommendations = docs.map((doc) => {
      return hydratedValidRecommendation(doc.data());
    });
    return hydratedRecommendations.filter(
      (recommendation) => recommendation != null
    );
  };

  const undoSwipe = (swipeToUndo) => {
    if (!swipeToUndo) {
      return;
    }

    const swipeToUndoId = swipeToUndo.id || swipeToUndo.userID;
    const userID = user.id || user.userID;

    swipeTracker.current.removeSwipe(swipeToUndoId, userID);
  };

  const onSwipe = (type, swipeItem) => {
    console.log("type : ", type);
    console.log("swipeItem : ", swipeItem);

    const canSwipe = getCanUserSwipe();

    console.log("canSwipe : ", canSwipe);

    if (!canSwipe) {
      return;
    }

    if (swipeItem && canSwipe) {
      if (type == "like" || type === "dislike") {
        swipeTracker.current.addSwipe(user, swipeItem, type, (response) => {});
      }

      // swipeTracker.current.addSwipe(user, swipeItem, type, (response) => {});

      if (!userAwareCanUndo.current && type === "dislike" && !isPlanActive) {
        shouldAlertCanUndo();
      }
    }
  };

  const onAllCardsSwiped = () => {
    // empty recommendations to trigger fetch of new recommendation stream;
    setRecommendations([]);
  };

  const shouldAlertCanUndo = async () => {
    const isUserAware = await getUserAwareCanUndoAsync();

    if (isUserAware) {
      userAwareCanUndo.current = true;

      return;
    }

    // Alert.alert(
    //   IMLocalized('Pardon the interruption'),
    //   IMLocalized(
    //     "Don't lose this amazing friend just because you accidentally swiped left. Upgrade your account now to see them again.",
    //   ),
    //   [
    //     {
    //       text: IMLocalized('Upgrade Now'),
    //       onPress: () => setSubscriptionVisible(true),
    //     },
    //     {
    //       text: IMLocalized('Cancel'),
    //     },
    //   ],
    //   { cancelable: true },
    // );
    userAwareCanUndo.current = true;
  };

  const renderEmptyState = () => {
    return <NoMoreCard profilePictureURL={user.profilePictureURL} />;
  };

  const renderNewMatch = () => {
    return (
      <NewMatch
        url={currentMatchData.profilePictureURL}
        onSendMessage={() => handleNewMatchButtonTap("Conversations")}
        onKeepSwiping={() => handleNewMatchButtonTap(null)}
      />
    );
  };

  const navToHome = () => {
    props.navigation.navigate("LoadScreen", {
      screenTitle: IMLocalized("Dating Profile"),
      appStyles: DynamicAppStyles,
      form: DatingConfig.editProfileFields,
      onComplete: () => {},
    });
  };

  const onPost = () => {
    props.navigation.navigate("Post", {
      screenTitle: IMLocalized("Dating Profile"),
      appStyles: DynamicAppStyles,
      form: DatingConfig.editProfileFields,
      onComplete: () => {},
    });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.container}>
          {(recommendations.length > 0 || hasConsumedRecommendationsStream) && (
            <Deck
              data={recommendations}
              appStyles1={DynamicAppStyles}
              form={DatingConfig.userSettingsFields}
              navigation={() => navToHome()}
              user={user}
              setShowMode={setShowMode}
              onUndoSwipe={undoSwipe}
              onSwipe={onSwipe}
              onPost={() => onPost()}
              showMode={showMode}
              onAllCardsSwiped={onAllCardsSwiped}
              isPlanActive={isPlanActive}
              setSubscriptionVisible={setSubscriptionVisible}
              renderEmptyState={renderEmptyState}
              renderNewMatch={renderNewMatch}
              canUserSwipe={canUserSwipe}
              refreshRecommendations={setRecommendations}
            />
          )}
          {!hasConsumedRecommendationsStream && recommendations.length === 0 && (
            <ActivityModal
              loading={
                !hasConsumedRecommendationsStream &&
                recommendations.length === 0
              }
              title={IMLocalized("Please wait")}
              size={"large"}
              activityColor={"white"}
              titleColor={"white"}
              activityWrapperStyle={{
                backgroundColor: "#404040",
              }}
            />
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

//'https://pbs.twimg.com/profile_images/681369932207013888/CHESpTzF.jpg'

export default SwipeScreen;
