import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StatusBar,
  SafeAreaView,
  Dimensions,
} from "react-native";

import { firebase } from "../../Core/api/firebase/config";
import FastImage from "react-native-fast-image";
import { IMLocalized } from "../../Core/localization/IMLocalization";
import ImageView from "react-native-image-view";
import dynamicStyles from "./styles";
import { useColorScheme } from "react-native-appearance";
import PropTypes from "prop-types";
import { DEVICE_WIDTH } from "../../helpers/statics";

const HIT_SLOP = { top: 15, left: 15, right: 15, bottom: 15 };

const ProfileScreen = ({ route, navigation }, props) => {
  const swipeData = firebase.firestore().collection("swipe_counts");
  const user = useSelector((state) => state.auth.user);
  const postData = firebase.firestore().collection("post");
  const swipes = firebase.firestore().collection("swipes");
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);
  const userRef = firebase.firestore().collection("users");

  const [loading, setLoading] = useState(false);
  const [swiperDotWidth, setSwiperDotWidth] = useState(null);
  const [photosUpdated, setPhotosUpdated] = useState(false);
  const [isImageViewerVisible, setIsImageViewerVisible] = useState(false);
  const [tappedImageIndex, setTappedImageIndex] = useState(null);
  const [postCount, setPostCount] = useState();
  const [swipeCount, setSwipeCount] = useState();
  const [RecentPhotos, setRecentPhotos] = useState();
  const [School, setSchool] = useState();
  const [Bio, setBio] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [matchesCount, setMatchesCount] = useState();
  const [profilePicture, setProfilePicture] = useState();
  const [myPhotos] = useState(
    props.instagramPhotos || [props.profilePictureURL]
  );
  const [instagramPhotos, setInstagramPhotos] = useState(
    props.instagramPhotos || []
  );
  const [Distance, setDistance] = useState();
  const updatePhotos = (photos) => {
    let myphotos = [];
    let temp = [];

    if (photos && photos.length > 0) {
      photos.map((item, index) => {
        item && temp.push(item);

        if (index % 6 == 5) {
          temp && myphotos.push(temp);
          temp = [];
        }
      });

      myphotos.push(temp);
      setInstagramPhotos(myphotos);
      setPhotosUpdated(true);
    }
  };

  const formatViewerImages = () => {
    const myPhotos = [];

    if (photosUpdated) {
      instagramPhotos.map((photos) => {
        photos.map((photo) => {
          myPhotos.push({
            source: {
              uri: photo && photo,
            },
            width: Dimensions.get("window").width,
            height: Math.floor(Dimensions.get("window").height * 0.6),
          });
        });
      });

      return myPhotos;
    } else {
      return [];
    }
  };
  console.log("user.userID", user.userID);
  useEffect(() => {
    userRef
      .orderBy("createdAt")
      .limit()
      .onSnapshot((document1) => {
        const userData1 = document1.docs.map((doc) => doc.data());
        setLoading(true);
        // console.log('userref:',userData1)
        var recentPhotos = [];

        userData1.reverse().map((item) => {
          if (item.userID === route.params.id) {
            recentPhotos = item.photos;
            // alert('recentPhotos:---', recentPhotos)
          }
        });
        updatePhotos(recentPhotos);
        setRecentPhotos(recentPhotos);
      });
  }, []);

  // console.log('user Ref', userRef)
  useEffect(() => {
    getPostData();
    Location();
    setSwiperDotWidth(Math.floor(DEVICE_WIDTH / myPhotos.length) - 4);
  }, []);

  const distance = (lat1, lon1, lat2, lon2, unit = "K") => {
    console.log("location : ", lat1, lon1, lat2, lon2);
    console.log("lat1 : ", lat1);
    console.log("lon1 : ", lon1);
    console.log("lat2 : ", lat2);
    console.log("lon2 : ", lon2);
    console.log("unit", unit);

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
      console.log("distance", dist);
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
      const distance = Math.round(dist);
      if (distance >= 2.0) {
        setDistance(distance + " " + IMLocalized("Km"));
      } else {
        setDistance(IMLocalized("1 Km"));
      }
      // console.log('distance >=2.0', distance >= 2.0)
      setDistance(distance + " " + IMLocalized("Km"));
      // setDistance(IMLocalized("1 Km"));
    }
  };

  const Location = () => {
    userRef
      .orderBy("createdAt")
      .limit()
      .onSnapshot((document1) => {
        const userData1 = document1.docs.map((doc) => doc.data());
        setLoading(true);

        userData1.reverse().map((item) => {
          if (item.userID === route.params.id) {
            const myLocation = user.location;
            const location = item.location ? item.location : "unlimited";
            console.log("item.location", item.location);
            console.log("user.location", user.location);
            item.distance = distance(
              location.latitude,
              location.longitude,
              myLocation.latitude,
              myLocation.longitude
            );
            console.log("Location.longitude", location.longitude);
            console.log("Location.latitude", location.latitude);
            console.log("myLocation.longitude", myLocation.longitude);
            console.log("Location.longitude", myLocation.latitude);
            console.log("location Log", user.location);

            // distance = item.location
          }
        });
      });
    // })
  };
  const getPostData = () => {
    // For Post Counts
    postData
      .orderBy("createdAt")
      .limit()
      .onSnapshot((document1) => {
        const userData1 = document1.docs.map((doc) => doc.data());
        const userId = route.params.id;
        setLoading(true);

        var temp = 0;

        userData1.reverse().map((item) => {
          // console.log('item.school1 : ', item.school)
          // console.log('User Data : ', item.school.userId)

          // console.log("user Data-----", userId)
          // console.log('route.params.id....', route.params.id)
          // console.log('item.school.userId....', item.userId)
          // console.log("route.params.Id:---", route.params.Id)
          // console.log("item.userId:", item.userId)
          // console.log("UserId:", userId)

          if (item.userId === route.params.id) {
            temp += 1;
          }
        });

        setPostCount(temp);
      });

    // For Matches Count
    swipes
      .orderBy("createdAt")
      .limit()
      .onSnapshot((document) => {
        const userData = document.docs.map((doc) => doc.data());
        setLoading(true);

        var count = 0;

        userData.map((item) => {
          if (item.swipedProfile === route.params.id) {
            if (item.hasBeenSeen === true) count += 1;
          }
        });
        setMatchesCount(count);

        // For Swipes Count
        swipes
          .orderBy("createdAt")
          .limit()
          .onSnapshot((document) => {
            const userData = document.docs.map((doc) => doc.data());
            setLoading(true);
            var swipecount = 0;
            userData.map((item) => {
              if (item.swipedProfile === route.params.id) {
                if (item.type == "like") {
                  if (item.hasBeenSeen === true) {
                    swipecount += 1;
                    console.log("item.hasBeenSeen::::", item.hasBeenSeen);
                    console.log("");
                  }
                }
              }
            });
            setSwipeCount(swipecount);
            // console.log('Swipe Data:-', userData)
          });
      });

    // For ProfilePicture
    userRef
      .orderBy("createdAt")
      .limit()
      .onSnapshot((document1) => {
        const userData1 = document1.docs.map((doc) => doc.data());
        setLoading(true);
        // console.log("userData1:--", userData1)
        var profilepicture = [];
        userData1.reverse().map((item) => {
          if (item.userID === route.params.id) {
            profilepicture = item.profilePictureURL;
          }
        });
        setProfilePicture(profilepicture);
      });

    // For SchoolData
    userRef
      .orderBy("createdAt")
      .limit()
      .onSnapshot((document1) => {
        const userData1 = document1.docs.map((doc) => doc.data());
        setLoading(true);
        // console.log("userData1:--",userData1)
        var school = [];
        userData1.reverse().map((item) => {
          if (item.userID === route.params.id) {
            school = item.school;
          }
        });
        setSchool(school);
      });

    // For FirstName
    userRef
      .orderBy("createdAt")
      .limit()
      .onSnapshot((document1) => {
        const userData1 = document1.docs.map((doc) => doc.data());
        setLoading(true);
        // console.log("userData1:--",userData1)
        var firstname = [];
        userData1.reverse().map((item) => {
          if (item.userID === route.params.id) {
            firstname = item.firstName;
          }
        });
        setFirstName(firstname);
      });

    // For LastName
    userRef
      .orderBy("createdAt")
      .limit()
      .onSnapshot((document1) => {
        const userData1 = document1.docs.map((doc) => doc.data());
        setLoading(true);
        // console.log("userData1:--",userData1)
        var lastname = [];
        userData1.reverse().map((item) => {
          if (item.userID === route.params.id) {
            lastname = item.lastName;
          }
        });
        setLastName(lastname);
      });

    // For BioData
    userRef
      .orderBy("createdAt")
      .limit()
      .onSnapshot((document1) => {
        const userData1 = document1.docs.map((doc) => doc.data());
        setLoading(true);
        // console.log("userData1:--", userData1)
        var bio = [];
        userData1.reverse().map((item) => {
          if (item.userID === route.params.id) {
            bio = item.bio;
          }
        });
        setBio(bio);
      });
  };

  const closeButton = () => (
    <TouchableOpacity
      hitSlop={HIT_SLOP}
      style={styles.closeButton}
      onPress={() => setIsImageViewerVisible(false)}
    >
      <Text style={styles.closeButton__text}>×</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View>
        <View style={styles.MaincontainerHeader}>
          <View style={styles.containerHeader}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                style={styles.backArrowPost}
                source={require("../../../assets/images/back_arrow.png")}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.containerHeader2}>
            <Text style={styles.headerTextPost}>Lovia</Text>
          </View>
        </View>
      </View>

      <View style={styles.MainContainerPost}>
        <ScrollView style={styles.body}>
          {/* <View style={styles.ContainerPost}> */}
          <View style={styles.profilePictureContainerPost}>
            <View style={styles.profilePictureView}>
              <Image
                style={styles.ProfilePicture}
                source={{ uri: profilePicture }}
              />
            </View>
            <View style={styles.dataView}>
              <View style={styles.nameViewPost}>
                <Text style={styles.Firstname}>{firstName}</Text>
                <Text style={styles.Lastname}>{lastName}</Text>
              </View>
              <View style={styles.schoolView}>
                <Text style={styles.schoolName} numberOfLines={3}>
                  {School}
                </Text>
              </View>
              <Text style={styles.distance}>{Distance}</Text>
            </View>
          </View>
          <View>
            <View style={styles.containerPostdata}>
              <View style={styles.postCounter}>
                <View style={styles.postCount}>
                  <Text style={styles.count}>{postCount}</Text>
                  <Text style={styles.postText}>Posts</Text>
                </View>
                <View style={styles.matchesCount}>
                  <Text style={styles.matches}>{matchesCount}</Text>
                  <Text style={styles.matchesText}>Followers</Text>
                </View>
                <View style={styles.swipesCount}>
                  <Text style={styles.swipes}>{swipeCount}</Text>
                  <Text style={styles.swipesText}>Likes</Text>
                </View>
              </View>
            </View>
          </View>
          <View>
            <View style={styles.ContainerDesc}>
              {Bio == null ? (
                <View style={styles.descView}>
                  <Text style={styles.descText}>No Bio Added</Text>
                </View>
              ) : (
                <View style={styles.descView}>
                  <Text style={styles.descText}>{Bio}</Text>
                </View>
              )}
            </View>
          </View>
          <View>
            <Text style={[styles.photoTitleLabel, { fontWeight: "bold" }]}>
              {IMLocalized("Recent photos")}
            </Text>
            {instagramPhotos.map((i) => (
              <View key={"photos" + i} style={styles.photoViewRecentPhoto}>
                <FlatList
                  horizontal={false}
                  numColumns={3}
                  // data={photos}
                  data={RecentPhotos}
                  scrollEnabled={false}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity
                      onPress={() => {
                        setIsImageViewerVisible(true);
                        setTappedImageIndex(index);
                      }}
                      key={"item" + index}
                      style={styles.myphotosItemViewPost}
                    >
                      {photosUpdated && item && (
                        <FastImage
                          style={{ width: "100%", height: "100%" }}
                          source={{ uri: item }}
                        />
                      )}
                    </TouchableOpacity>
                  )}
                />
              </View>
            ))}
          </View>
        </ScrollView>
        <ImageView
          isSwipeCloseEnabled={false}
          images={formatViewerImages()}
          isVisible={isImageViewerVisible}
          onClose={() => setIsImageViewerVisible(false)}
          imageIndex={tappedImageIndex}
          controls={{ close: closeButton }}
        />
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});
ProfileScreen.propTypes = {
  firstName: PropTypes.string,
  age: PropTypes.string,
  study: PropTypes.string,
  school: PropTypes.string,
  distance: PropTypes.string,
  profilePictureURL: PropTypes.string,
  instagramPhotos: PropTypes.array,
  bio: PropTypes.string,
  isDone: PropTypes.bool,
  setShowMode: PropTypes.func,
  bottomTabBar: PropTypes.bool,
};

export default ProfileScreen;
