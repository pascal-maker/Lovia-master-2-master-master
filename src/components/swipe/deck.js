import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Modal,
  Alert,
  Image,
  Platform,
} from "react-native";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";
import Swiper from "react-native-deck-swiper";
import TinderCard from "./tinder_card";
import AppStyles from "../../AppStyles";
import DatingConfig from "../../DatingConfig";
import BottomTabBar from "./bottom_tab_bar";
import CardDetailsView from "./CardDetailsView/CardDetailsView";
import { IMLocalized } from "../../Core/localization/IMLocalization";
import { size } from "../../helpers/devices";
import { ifIphoneX } from "react-native-iphone-x-helper";
import { TouchableOpacity } from "react-native";
import { useColorScheme } from "react-native-appearance";
import { userAPIManager } from "../../Core/api";
import { setUserData } from "../../Core/onboarding/redux/auth";
import ActionSheet from "react-native-actionsheet";
import IMFormComponent from "../../Core/profile/ui/components/IMProfileSettings/IMProfileSettings";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const Deck = (props) => {
  const {
    data,
    setShowMode,
    onUndoSwipe,
    onSwipe,
    showMode,
    onAllCardsSwiped,
    appStyles1,
    user,
    form,
    onPost,
    navigation,
    // isPlanActive,
    setSubscriptionVisible,
    renderEmptyState,
    renderNewMatch,
    canUserSwipe,
    refreshRecommendations,
  } = props;

  const isPlanActive = useSelector((state) => state.inAppPurchase.isPlanActive);

  const useSwiper = useRef(null);
  const hasActivePlan = useRef(false);
  const currentDeckIndex = useRef(0);

  let actionSheet = useRef();

  var optionArray = [
    "Universiteit Gent",
    "ArteveldeHogeschool",
    "LUCA School of Arts/ Campus Sint lucas Gent",
    "Hogeschool Gent",
    "Odisee Technologiecampus Gent",
    "De Hogeschool West-Vlaanderen",
    "KASK & Conservatorium",
    "all",
    "Cancel",
  ];

  const colorScheme = useColorScheme();

  const [showModal, setShowModal] = useState(false);

  const [schoolName, setSchoolName] = useState(
    global.schoolName == undefined ? "all" : global.schoolName
  );

  useEffect(() => {
    console.log("global.schoolName", global.schoolName);
    hasActivePlan.current = isPlanActive;
  }, [isPlanActive]);

  const showActionSheet = async () => {
    //To show the Bottom ActionSheet

    actionSheet.current.show();
  };

  const onDislikePressed = () => {
    useSwiper.current.swipeLeft();
  };

  const onSuperLikePressed = () => {
    useSwiper.current.swipeTop();
  };

  const onLikePressed = () => {
    useSwiper.current.swipeRight();
  };

  const handleSwipe = (type, index) => {
    const currentDeckItem = data[index];

    currentDeckIndex.current = index;

    // if (canUserSwipe || hasActivePlan.current) {
    onSwipe(type, currentDeckItem);
    // } else {
    //   useSwiper.current.swipeBack();
    //   alertDailySwipeExceeded();
    // }
  };

  const onSwipedLeft = (index) => {
    handleSwipe("dislike", index);
  };

  const onSwipedRight = (index) => {
    handleSwipe("like", index);
  };

  const onSwipedTop = (index) => {
    handleSwipe("like", index);
  };

  const onSwipedAll = () => {
    onAllCardsSwiped();
  };

  const onTapCard = (index) => {
    currentDeckIndex.current = index;
    setShowMode(1);
  };

  const undoSwipe = () => {
    // if (!hasActivePlan.current) {
    //   requestUpgrade();

    //   return;
    // }

    useSwiper.current.swipeBack((index) => {
      const prevDeckItem = data[index - 1];

      currentDeckIndex.current = index;
      onUndoSwipe(prevDeckItem);
    });
  };

  const requestUpgrade = () => {
    Alert.alert(
      IMLocalized("Upgrade account"),
      IMLocalized("Upgrade your account now to undo a swipe."),
      [
        {
          text: IMLocalized("Upgrade Now"),
          onPress: () => setSubscriptionVisible(true),
        },
        {
          text: IMLocalized("Cancel"),
        },
      ],
      { cancelable: true }
    );
  };

  const alertDailySwipeExceeded = () => {
    Alert.alert(
      IMLocalized("Daily swipes exceeded"),
      IMLocalized(
        "You have exceeded the daily swipes limit. Upgrade your account now to enjoy unlimited swipes"
      ),
      [
        {
          text: IMLocalized("Upgrade Now"),
          onPress: () => setSubscriptionVisible(true),
        },
        {
          text: IMLocalized("Cancel"),
        },
      ],
      { cancelable: true }
    );
  };

  const renderCard = (item) => {
    if (item) {
      return (
        <TinderCard
          key={"TinderCard" + item.id}
          url={item.profilePictureURL}
          name={item.firstName}
          age={item.age}
          school={item.school}
          distance={item.distance}
          setShowMode={setShowMode}
          undoSwipe={undoSwipe}
        />
      );
    }
  };

  const renderCardDetail = (item, isDone) => {
    return (
      item && (
        <CardDetailsView
          key={"CardDetail" + item.id}
          uid={item.id}
          profilePictureURL={item.profilePictureURL}
          firstName={item.firstName}
          lastName={item.lastName}
          age={item.age}
          study={item.study}
          school={item.school}
          distance={item.distance}
          bio={item.bio}
          instagramPhotos={
            item?.photos?.length > 0 ? item.photos : [item.profilePictureURL]
          }
          setShowMode={setShowMode}
          onSwipeTop={onSuperLikePressed}
          onSwipeRight={onLikePressed}
          onSwipeLeft={onDislikePressed}
          isDone={isDone}
          bottomTabBar={true}
          refreshRecommendations={refreshRecommendations}
          data={data}
        />
      )
    );
  };

  const renderOverlayLabel = (label, color) => {
    return (
      <View style={[styles.overlayLabel, { borderColor: color }]}>
        {/* <Text style={[styles.overlayLabelText, { color }]}>{label}</Text> */}
        {label === "skip" ? (
          <Image
            style={[styles.crossIcon, { tintColor: color }]}
            source={AppStyles.iconSet.Dislike}
          />
        ) : (
          <Image
            style={[styles.tickIcon, { tintColor: color }]}
            source={AppStyles.iconSet.Like1}
          />
        )}
      </View>
    );
  };
  const renderOverlayLabelNew = (label, color) => {
    return (
      <View style={styles.undoIconContainer2}>
        <Image style={styles.icon2} source={AppStyles.iconSet.Dislike} />
      </View>
    );
  };

  const openModal = async () => {
    const name = await AsyncStorage.getItem("schoolname");
    console.log("name : ", name);
    setSchoolName(name);
    setShowModal(true);
  };

  const renderBottomTabBar = (containerStyle, buttonContainerStyle) => {
    return (
      <View style={styles.bottomTabBarContainer}>
        <BottomTabBar
          onDislikePressed={onDislikePressed}
          onSuperLikePressed={onSuperLikePressed}
          onLikePressed={onLikePressed}
          containerStyle={containerStyle}
          buttonContainerStyle={buttonContainerStyle}
        />
      </View>
    );
  };

  // const form = props.form;
  // const initialValuesDict = props.user.settings || {};

  const onFormSubmit = (school) => {
    // console.log("alteredFormDict : ", school);
    // console.log("form : ", form);
    // console.log("user : ", user);

    // const user1 = user;
    // var newSettings = user.settings || {};
    // const form1 = form;
    // const alteredFormDict1 = school;

    // form1.sections.forEach((section) => {
    //   console.log('section : ',section)
    //   section.fields.forEach((field) => {
    //     console.log('fields : ',field)
    //     const newValue = alteredFormDict1['school_preference'];

    //     console.log('');

    //     if (newValue != null) {
    //       //newSettings[field.key] = alteredFormDict[field.key];
    //     }
    //   });
    // });

    // let newUser = { ...user1, settings: newSettings };
    // console.log('user.id : ',user.id);
    // console.log('user1 ',user1);

    var formData = form;
    var userData = user;

    console.log("formData : ", formData);
    console.log("userData : ", userData);
    console.log("userId : ", userData.id);
    console.log("userId : ", userData.settings.school_preference);

    userData.settings.school_preference = school;

    console.log("New userData : ", userData);

    userAPIManager.updateSchoolPre(user.id, userData);
    // userAPIManager.updatePrivacy(user.id, userData);

    navigation();
    //setUserData(newUser);
  };

  const onFormButtonPress = (buttonField) => {
    console.log(schoolName);
    setShowModal(false);
    onFormSubmit(schoolName);
  };

  if (data.length === 0) {
    return (
      <View style={styles.noMoreCards}>
        <View style={{ height: "15%", justifyContent: "center" }}>
          <View
            style={{
              // marginTop:
              //   Platform.OS == "ios"
              //     ? Dimensions.get("window").height < 740
              //       ? 17
              //       : 45
              //     : 21,
              // marginTop:
              //   Platform.OS == "ios"
              //     ? Dimensions.get("window").height < 740
              //       ? 25
              //       : 45
              //     : 25,

              marginHorizontal: 25,
              flexDirection: "row",
            }}
          >
            <View style={{ flex: 1, height: 30 }}>
              <TouchableOpacity
                onPress={() => {
                  openModal();
                }}
              >
                <Image
                  source={AppStyles.iconSet.School}
                  style={{ height: 24, width: 24 }}
                />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, height: 30, alignItems: "center" }}>
              <Text
                style={{ fontSize: 18, color: "#4bd3cb", fontWeight: "bold" }}
              >
                Lovia
              </Text>
            </View>
            <View style={{ flex: 1, height: 30, alignItems: "flex-end" }}>
              <TouchableOpacity
                onPress={() => {
                  onPost();
                }}
              >
                <Image
                  source={AppStyles.iconSet.Explore}
                  style={{ height: 25, width: 25 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {renderEmptyState()}
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={showModal}
          onRequestClose={() => {
            console.log("Modal has been closed.");
          }}
        >
          <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
            <View
              style={{
                height: 90,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
                backgroundColor: "#FFFFFF",
                justifyContent: "flex-end",
              }}
            >
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <Image
                  source={AppStyles.iconSet.false2}
                  style={{
                    height: 20,
                    width: 20,
                    tintColor: "#000000",
                    marginHorizontal: 20,
                    marginBottom: 10,
                  }}
                />
              </TouchableOpacity>
            </View>
            <Text style={{ fontSize: 17, marginTop: 20, marginHorizontal: 20 }}>
              DISCOVERY
            </Text>

            <TouchableOpacity
              onPress={() => showActionSheet()}
              style={{
                height: 40,
                backgroundColor: "#FFFFFF",
                marginTop: 15,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
                backgroundColor: "#FFFFFF",
                flexDirection: "row",
                paddingHorizontal: 20,
              }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    justifyContent: "center",
                  }}
                >
                  School Preference
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "flex-end",
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    justifyContent: "center",
                  }}
                >
                  {schoolName}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={(index) => {
                // Clicking on the option will give you alert
                //alert(optionArray[index]);
                console.log(index);
                onFormButtonPress();
                //setShowModal(false);
              }}
              style={{
                height: 40,
                backgroundColor: "#FFFFFF",
                marginTop: 120,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                justifyContent: "center",
                elevation: 5,
                backgroundColor: "#FFFFFF",
                paddingHorizontal: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                Save
              </Text>
            </TouchableOpacity>
            <ActionSheet
              ref={actionSheet}
              // Title of the Bottom Sheet
              title={"Which one do you like ?"}
              // Options Array to show in bottom sheet
              options={optionArray}
              cancelButtonIndex={8}
              onPress={(index) => {
                console.log(index);
                if (index === "My Matches") {
                  global.schoolName = optionArray[8];
                }
                if (index == 8) {
                  console.log("if");
                } else {
                  console.log("ifelse");
                  global.schoolName = optionArray[index];
                  // setSchool(optionArray[index]);
                  setSchoolName(optionArray[index]);
                  AsyncStorage.setItem("schoolname", optionArray[index]);
                  //onFormButtonPress(optionArray[index]);
                }
              }}
            />
          </View>
        </Modal>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{ height: "15%", justifyContent: "center" }}>
        <View
          style={{
            // marginTop:
            //   Platform.OS == "ios"
            //     ? Dimensions.get("window").height < 740
            //       ? 17
            //       : 45
            //     : 21,
            // marginTop:
            //   Platform.OS == "ios"
            //     ? Dimensions.get("window").height < 740
            //       ? 25
            //       : 45
            //     : 25,

            marginHorizontal: 25,
            flexDirection: "row",
          }}
        >
          <View style={{ flex: 1, height: 30 }}>
            <TouchableOpacity
              onPress={() => {
                openModal();
              }}
            >
              <Image
                source={AppStyles.iconSet.School}
                style={{ height: 24, width: 24 }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, height: 30, alignItems: "center" }}>
            <Text
              style={{ fontSize: 18, color: "#4bd3cb", fontWeight: "bold" }}
            >
              Lovia
            </Text>
          </View>
          <View style={{ flex: 1, height: 30, alignItems: "flex-end" }}>
            <TouchableOpacity
              onPress={() => {
                onPost();
              }}
            >
              <Image
                source={AppStyles.iconSet.Explore}
                style={{ height: 25, width: 25 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{ height: "85%" }}>
        <Swiper
          ref={useSwiper}
          animateCardOpacity={true}
          containerStyle={styles.swiperContainer}
          cards={data}
          renderCard={renderCard}
          cardIndex={0}
          backgroundColor="white"
          stackSize={2}
          verticalSwipe={true}
          infinite={false}
          showSecondCard={true}
          animateOverlayLabelsOpacity={true}
          onTapCard={onTapCard}
          onSwipedRight={onSwipedRight}
          onSwipedTop={onSwipedTop}
          onSwipedLeft={onSwipedLeft}
          onSwipedAll={onSwipedAll}
          swipeBackCard={true}
          overlayLabels={{
            left: {
              title: "NOPE",
              element: renderOverlayLabel("skip", "#FF0000"),
              style: {
                wrapper: styles.overlayWrapper,
              },
            },
            right: {
              title: "LIKE",
              element: renderOverlayLabel("epic", "#00FF00"),
              style: {
                wrapper: {
                  ...styles.overlayWrapper,
                  alignItems: "flex-start",
                  marginLeft: 40,
                },
              },
            },
            // top: {
            //   title: "SUPER LIKE",
            //   element: renderOverlayLabelNew("super like", "#00FFAC"),
            //   style: {
            //     wrapper: {
            //       ...styles.overlayWrapper,
            //       alignItems: "flex-start",
            //       marginLeft: 30,
            //     },
            //   },
            // },
          }}
        />
      </View>
      {/* <View style={{ height: 0.3, backgroundColor: "black" }}></View> */}
      {/* <View style={{ height: "9%" }}>{renderBottomTabBar()}</View> */}

      {showMode == 1 && data[currentDeckIndex.current] && (
        <Modal animationType={"slide"}>
          <View style={styles.cardDetailContainer}>
            <View style={styles.cardDetailL}>
              {renderCardDetail(data[currentDeckIndex.current])}
            </View>
          </View>
        </Modal>
      )}
      {showMode == 2 && (
        <Modal
          transparent={false}
          visible={showMode == 2 ? true : false}
          animationType={"slide"}
        >
          <View style={styles.newMatch}>{renderNewMatch()}</View>
        </Modal>
      )}

      <Modal
        animationType={"slide"}
        transparent={false}
        visible={showModal}
        onRequestClose={() => {
          console.log("Modal has been closed.");
        }}
      >
        {/* <IMFormComponent
        form={form}
        initialValuesDict={'initialValuesDict'}
        onFormChange={onFormChange}
        navigation={props.navigation}
        appStyles={appStyles1}
        onFormButtonPress={onFormButtonPress}
      /> */}
        <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
          <View
            style={{
              height: 90,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
              backgroundColor: "#FFFFFF",
              justifyContent: "flex-end",
            }}
          >
            <TouchableOpacity onPress={() => setShowModal(false)}>
              <Image
                source={AppStyles.iconSet.false2}
                style={{
                  height: 20,
                  width: 20,
                  tintColor: "#000000",
                  marginHorizontal: 20,
                  marginBottom: 10,
                }}
              />
            </TouchableOpacity>
          </View>
          <Text style={{ fontSize: 17, marginTop: 20, marginHorizontal: 20 }}>
            DISCOVERY
          </Text>

          <TouchableOpacity
            onPress={() => showActionSheet()}
            style={{
              height: 40,
              backgroundColor: "#FFFFFF",
              marginTop: 15,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
              backgroundColor: "#FFFFFF",
              flexDirection: "row",
              paddingHorizontal: 20,
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  justifyContent: "center",
                }}
              >
                School Preference
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "flex-end",
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  justifyContent: "center",
                }}
              >
                {schoolName}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={(index) => {
              // Clicking on the option will give you alert
              //alert(optionArray[index]);
              console.log(index);
              onFormButtonPress();
              //setShowModal(false);
            }}
            style={{
              height: 40,
              backgroundColor: "#FFFFFF",
              marginTop: 120,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              justifyContent: "center",
              elevation: 5,
              backgroundColor: "#FFFFFF",
              paddingHorizontal: 20,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              Save
            </Text>
          </TouchableOpacity>
          <ActionSheet
            ref={actionSheet}
            // Title of the Bottom Sheet
            title={"Which one do you like?"}
            // Options Array to show in bottom sheet
            options={optionArray}
            // Define cancel button index in the option array
            // This will take the cancel option in bottom
            // and will highlight it
            cancelButtonIndex={8}
            // Highlight any specific option
            //destructiveButtonIndex={1}
            onPress={(index) => {
              // Clicking on the option will give you alert
              //alert(optionArray[index]);
              console.log(index);
              if (index == 8) {
                console.log("if");
              } else {
                console.log("ifelse");
                //setSchool(optionArray[index]);
                setSchoolName(optionArray[index]);
                AsyncStorage.setItem("schoolname", optionArray[index]);
                //onFormButtonPress(optionArray[index]);
              }
            }}
          />
        </View>
      </Modal>
    </View>
  );
};

console.log("Platform.Version : ", Dimensions.get("window").height);

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: "transparent",
    marginTop:
      Platform.OS == "ios"
        ? Dimensions.get("window").height < 740
          ? -15
          : -50
        : -15,
  },
  overlayLabel: {
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    width: 100,
    borderWidth: 4,
    borderRadius: 50,
  },
  overlayLabelText: {
    fontSize: 32,
    fontWeight: "800",
    padding: 10,
  },
  swiperContainer: {
    marginLeft: -20,
    //marginTop: -Math.floor(SCREEN_HEIGHT * 0.01),
    backgroundColor: "transparent",
  },
  overlayWrapper: {
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    marginTop: Math.floor(SCREEN_HEIGHT * 0.2),
  },
  cardDetailContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  cardDetailL: {
    // position: 'absolute',
    // bottom: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 1,
    // paddingBottom: size(100),
    backgroundColor: "white",
  },
  bottomTabBarContainer: {
    // marginBottom: -8
    position: "absolute",
    bottom: 0,
    width: "95%",
    alignSelf: "center",
  },
  noMoreCards: {
    position: "absolute",
    top: 0,
    bottom: 50,
    left: 0,
    right: 0,
    width: SCREEN_WIDTH,
  },
  newMatch: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: "white",
  },
  undoIconContainer2: {
    height: "85%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 150,
    marginLeft: -10,
  },
  icon2: {
    width: size(40),
    height: size(40),
    tintColor: "white",
    tintColor: "white",
  },
  tickIcon: {
    width: size(60),
    height: size(50),
  },
  crossIcon: {
    width: size(50),
    height: size(50),
  },
});

export default Deck;
