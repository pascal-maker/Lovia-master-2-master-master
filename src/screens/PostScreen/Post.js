import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  Keyboard,
  Modal,
  Alert,
  KeyboardAvoidingView,
  SafeAreaView,
} from "react-native";
import { firebase } from "../../Core/api/firebase/config";
import { authManager } from "../../Core/onboarding/utils/api";
import PostImagePicker from "../../Core/truly-native/TNProfilePictureSelector/PostImagePicker";
import FullScreenImage from "../../Core/truly-native/TNProfilePictureSelector/FullScreenImage";
import DynamicAppStyles from "../../DynamicAppStyles";
import DatingConfig from "../../DatingConfig";
import { IMLocalized } from "../../Core/localization/IMLocalization";
import TNActivityIndicator from "../../Core/truly-native/TNActivityIndicator";
import { useSelector, useDispatch, ReactReduxContext } from "react-redux";
import ActionSheet from "react-native-actionsheet";
import AsyncStorage from "@react-native-community/async-storage";
import Like from "./Like";
import { isEmpty } from "lodash";
import { userAPIManager } from "../../Core/api";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import NoPost from "./NoPost";
import { notificationManager } from "../../Core/notifications";

import { postUpload } from "../../Core/api/firebase/auth";
import { DEVICE_WIDTH } from "../../helpers/statics";

const Post = ({ navigation }, props) => {
  const [commentsView, setCommentsView] = useState(false);
  const [commentsText, setCommentsText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [description, setDescription] = useState(null);
  const [data123, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [postButton, setPostButton] = useState(false);
  const [userSet, setUserSet] = useState(false);
  const [change, setChange] = React.useState(0);

  const [commentData, setCommentData] = useState([
    { id: "" },
    { index: "" },
    { status: "" },
    { fid: "" },
    { name: "" },
    { profilepic: "" },
    { pushToken: "" },
  ]);
  // id, index, status, fid, name, profilepic

  const likeIcon = require("../../../assets/images/red_like.png");
  const dislikeIcon = require("../../../assets/images/empty_like.png");

  const [schoolName, setSchoolName] = useState(
    global.schoolName == undefined ? "all" : global.schoolName
  );

  const [Preferences, setPreferences] = useState(
    global.schoolName == undefined ? "all" : global.schoolName
  );
  const [Privacy, setPrivacy] = useState(
    global.privacy == undefined ? "all" : global.privacy
  );

  // const matches = useSelector((state) => state.dating.matches);
  const openModal = async () => {
    const privacy = await AsyncStorage.getItem("privacy");
    const name = await AsyncStorage.getItem("schoolname");
    const preferences = await AsyncStorage.getItem("preferences");
    console.log("name : ", name);
    setPreferences(preferences);
    setSchoolName(name);
    setPrivacy(privacy);
    setShowModal1(true);
  };

  const user = useSelector((state) => state.auth.user);
  const matches = useSelector((state) => state.dating.matches);
  const userRef = firebase.firestore().collection("users");

  // const appStyles = props?.appStyles
  //   ? props?.appStyles
  //   : props.route?.params?.appStyles;

  // console.log('appStyles post : ', DynamicAppStyles)

  const postData = firebase.firestore().collection("post");
  const usersRef = firebase.firestore().collection("users");

  useEffect(() => {
    console.log("user Datax: ", user);
    getPostData();

    // const keyboardDidShowListener = Keyboard.addListener(
    //   'keyboardDidShow',
    //   () => {
    //     setPostButton(true) // or some other action
    //     setCommentsView(true)
    //   }
    // )
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setPostButton(false); // or some other action
        setCommentsView(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      // keyboardDidShowListener.remove()
    };
  }, []);

  const deletePost = () => {
    postData
      .doc(global.postId)
      .delete()
      .then(() => {
        console.log("//post Data deleted!");

        // getPostData()
      });
  };

  const getPostData = () => {
    postData
      .orderBy("createdAt")
      .limit()
      .onSnapshot((document1) => {
        const userData1 = document1.docs.map((doc) => doc.data());
        setLoading(true);
        var temp = [];

        userData1.reverse().map((item) => {
          // console.log(
          //   "item.school1 : ",
          //   item.school,
          //   user.settings.wall_preference.toLowerCase()
          // );
          if (
            user.settings.wall_preference.toLowerCase() ===
            item.school.toLowerCase()
          ) {
            temp.push(item);
          }
        });

        setData(temp);

        if (user.settings.wall_preference === "For You") {
          var isMatches = [];
          userData1.map((itemdata) => {
            if (itemdata.userId == user.id && itemdata.school === "For You") {
              isMatches.push(itemdata);
            } else {
              matches.map((item) => {
                // console.log(":x ", itemdata.school);
                if (
                  item.id === itemdata.userId &&
                  itemdata.school === "For You"
                ) {
                  isMatches.push(itemdata);
                  console.log("isMatches:..", isMatches);
                }
              });
            }
          });
          setData(isMatches);
        }

        setLoading(false);
      });
  };

  let actionSheetPost = useRef();
  let actionSheet2 = useRef();

  let bottomActionsheet = useRef();

  var optionArray = [
    "For You",
    // "Universiteit Gent",
    // "ArteveldeHogeschool",
    // "LUCA School of Arts/ Campus Sint lucas Gent",
    // "Hogeschool Gent",
    // "Odisee Technologiecampus Gent",
    // "De Hogeschool West-Vlaanderen",
    // "KASK & Conservatorium",
    "All",
    "Cancel",
  ];

  var optionArrayPost = [
    "For You",
    // "Universiteit Gent",
    // "ArteveldeHogeschool",
    // "LUCA School of Arts/ Campus Sint lucas Gent",
    // "Hogeschool Gent",
    // "Odisee Technologiecampus Gent",
    // "De Hogeschool West-Vlaanderen",
    // "KASK & Conservatorium",
    "All",
    "Cancel",
  ];

  const showActionSheetPost = async () => {
    //To show the Bottom ActionSheet

    actionSheetPost.current.show();
  };

  const showActionSheet2 = async () => {
    //To show the Bottom ActionSheet

    actionSheet2.current.show();
  };

  var deleteoptionArray = ["Delete Post", "Cancel"];

  const showBottomActionsheet = async (id) => {
    //To show the Bottom ActionSheet
    // setPostId(id)
    var loggedInUser = user;
    var isMatch = user;

    var filteredData = data123.filter((item) => item.id == id);

    if (filteredData[0].userId == loggedInUser.userID) {
      global.postId = id;
      bottomActionsheet.current.show();
    } else {
      console.log("you can't delete the post");
    }

    if (filteredData[8].userId == isMatch.userID) {
      global.postId = id;
      bottomActionsheet.current.show();
    } else {
      console.log("you can't delete the post");
    }
  };

  const onSchoolFilter = () => {
    var userData = user;
    userData.settings.wall_preference = Privacy;
    userAPIManager.updateSchoolPre(user.id, userData);
    setShowModal1(false);
    getPostData();
  };

  const createPost = () => {
    var userData = user;
    // console.log("userData : ", userData);

    userData.settings.school_preference = schoolName;
    userAPIManager.updateSchoolPre(user.id, userData);

    setShowModal1(false);

    // if (description == null) {
    if (false) {
      Alert.alert(
        "",
        IMLocalized("Please select Description."),
        [{ text: IMLocalized("OK") }],
        {
          cancelable: false,
        }
      );

      return;
    }
    setLoading(true);

    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours

    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds

    // console.log(
    //   date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec
    // )

    var time = date + "/" + month + "/" + year + " " + hours + ":" + min;

    const postDetails = {
      userId: user.userID,
      id: "",
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      name: user.firstName + " " + user.lastName,
      profilePhoto: user.profilePictureURL,
      // school: user.settings.school_preference,
      school: Privacy,
      photoFile: profilePictureFile,
      description: description,
      // description: "this post is for - " + Privacy,
      appIdentifier: DatingConfig.appIdentifier,
      likeCount: 0,
      commentCount: 0,
      pushToken: user.pushToken,
      likeData: [],
      commentData: [],
      time: time,
    };

    authManager
      .createPostWithFirebase(postDetails, DatingConfig)
      .then((response) => {
        // console.log('response1212 : ', response)

        postData
          .doc(response.user.fid)
          .update({ id: response.user.fid })
          .then(() => {
            setLoading(false);
          })
          .catch((error) => {
            const { message } = error;
            setLoading(false);
            console.log("upload error", error);
          });

        setShowModal(false);
        setProfilePictureFile(null);
        setDescription(null);
        // getPostData()
        onSchoolFilter();
        alert("Post successfully done !");
      });
    setLoading(true);
  };

  const onPressLike = (item, fid, userId, likeData) => {
    // navigation.navigate('Like', { fid: fid })
    navigation.navigate("Like", { likeData: likeData, id: userId });
  };

  const makeLike = (id, index, status, fid, name, profilepic, likeData) => {
    console.log("");
    console.log("");
    console.log("makelike =======================================>");

    setLoading(true);

    if (!isEmpty(likeData)) {
      console.log("if part when Data not null");

      var checkUserID = false;

      likeData.map((data, index) => {
        // console.log(
        //   "-------------------------",
        //   index,
        //   "--------------------------"
        // );
        // console.log('data.userId : ', data.userId)
        // console.log('user.userID : ', user.userID)

        if (data.userId == user.userID) {
          checkUserID = true;

          // console.log("--------userid match--------");
          // console.log("fid : ", fid);
          // console.log("data.id : ", data.id);
          if (fid == data.id) {
            // console.log("-- data.likeStatus : ", data.likeStatus);
            if (data.likeStatus) {
              // console.log("-- if part data.likeStatus");
              postData
                .doc(fid)
                .get()
                .then((documentSnapshot) => {
                  // console.log('User exists: ', documentSnapshot.exists)

                  if (documentSnapshot.exists) {
                    // console.log('User data: ', documentSnapshot.data())

                    var data = documentSnapshot.data();

                    var temp = data.likeData;

                    if (!isEmpty(temp)) {
                      temp.map((item, index) => {
                        if (item.userId == user.userID) {
                          temp[index].likeStatus = false;
                        }
                      });
                    }

                    // temp.push({
                    //   id: fid,
                    //   likeStatus: false,
                    //   userId: user.userID,
                    //   name: user.firstName + ' ' + user.lastName,
                    //   profilepic: user.profilePictureURL
                    // })

                    postData
                      .doc(fid)
                      .update({ likeData: temp })
                      .then(() => {
                        // getPostData()
                        // console.log("NEW LIKE 453 xxx");
                        // notificationManager.sendPushNotification(
                        //   user,
                        //   IMLocalized("new like"),
                        //   IMLocalized("You’ve got a new like!"),
                        //   "friend_match",
                        //   { fromUser: data.userId }
                        // );
                        setLoading(false);
                      })
                      .catch((error) => {
                        const { message } = error;
                        setLoading(false);
                        console.log("upload error", error);
                      });
                  }
                })
                .catch((error) => {
                  const { message } = error;
                  setLoading(false);
                  // console.log("upload error", error);
                });
            } else {
              // console.log("-- else data.likeStatus");

              postData
                .doc(fid)
                .get()
                .then((documentSnapshot) => {
                  if (documentSnapshot.exists) {
                    var data = documentSnapshot.data();

                    var temp = data.likeData;

                    if (!isEmpty(temp)) {
                      temp.map((item, index) => {
                        if (item.userId == user.userID) {
                          temp[index].likeStatus = true;
                        }
                      });
                    }

                    postData
                      .doc(fid)
                      .update({ likeData: temp })
                      .then(() => {
                        // getPostData()
                        // console.log("NEW LIKE 500 xxx");
                        notificationManager.sendPushNotification(
                          data,
                          IMLocalized("New like!🥰"),
                          IMLocalized("Someone liked your picture."),
                          "friend_match",
                          { fromUser: user }
                        );
                        setLoading(false);
                      })
                      .catch((error) => {
                        const { message } = error;
                        setLoading(false);
                        console.log("upload error", error);
                      });
                  }
                })
                .catch((error) => {
                  const { message } = error;
                  setLoading(false);
                  console.log("upload error", error);
                });
            }
          }
        } else {
          console.log("--------userid not match--------");
          console.log("--------make new like--------");
        }
      });

      // console.log('checkUserID : ', checkUserID)

      if (checkUserID) {
      } else {
        var temp = likeData;

        temp.push({
          id: fid,
          likeStatus: true,
          userId: user.userID,
          name: user.firstName + " " + user.lastName,
          profilepic: user.profilePictureURL,
        });

        postData
          .doc(fid)
          .update({ likeData: temp })
          .then(() => {
            // getPostData()
            // console.log("Sending Likes 549 xxx not Null ");
            // notificationManager.sendPushNotification(
            //   user,
            //   IMLocalized("new like"),
            //   IMLocalized("You’ve got a new like!"),
            //   "friend_match",
            //   { fromUser: data.userId }
            // );
            setLoading(false);
            setUserSet(true);
          })
          .catch((error) => {
            const { message } = error;
            setLoading(false);
            console.log("upload error", error);
          });
      }
    } else {
      console.log("else part when Data null");
      postData
        .doc(fid)
        .update({
          likeData: [
            {
              id: fid,
              likeStatus: true,
              userId: user.userID,
              name: user.firstName + " " + user.lastName,
              profilepic: user.profilePictureURL,
            },
          ],
        })
        .then(() => {
          getPostData();
          console.log("Sending Likes 583 xxx Null");
          notificationManager.sendPushNotification(
            data,
            IMLocalized("New like!🥰"),
            IMLocalized("Someone liked your picture."),
            "friend_match",
            { fromUser: user }
          );
          setLoading(false);
        })
        .catch((error) => {
          const { message } = error;
          setLoading(false);
          console.log("upload error", error);
        });
    }
  };

  const manageLike = (item, fid, userId, likeData) => {
    //  item.item.likeStatus ? likeIcon : dislikeIcon

    var getLikeData = "";

    if (!isEmpty(likeData)) {
      likeData.map((data, index) => {
        if (user.userID == data.userId) {
          if (data.likeStatus) {
            getLikeData = "true";
          } else {
            getLikeData = "false";
          }
        }
      });
    } else {
      getLikeData = "";
    }

    if (getLikeData == "true") {
      return <Image style={{ height: 15, width: 17 }} source={likeIcon} />;
    } else if (getLikeData == "false") {
      return <Image style={{ height: 15, width: 17 }} source={dislikeIcon} />;
    } else {
      return <Image style={{ height: 15, width: 17 }} source={dislikeIcon} />;
    }
  };

  const shareComment = () => {
    //id, index, status, fid, name, profilepic

    var data = [];

    data = commentData;
    // console.log("data : ", data);
    // console.log("id : ", data[0].id);
    // console.log("index : ", data[1].index);
    // console.log("status : ", data[2].status);
    // console.log("fid : ", data[3].fid);
    // console.log("name : ", data[4].name);
    // console.log("profilepic : ", data[5].profilepic);
    setLoading(true);

    var date = new Date().getDate() + 1; //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours

    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds

    console.log(
      date + "/" + month + "/" + year + " " + hours + ":" + min + ":" + sec
    );

    var time = date + "/" + month + "/" + year + " " + hours + ":" + min;

    var fid = data[3].fid;

    postData
      .doc(data[3].fid)
      .collection("comments")
      .add({
        comment: commentsText,
        name: user.firstName + " " + user.lastName,
        profilepic: user.profilePictureURL,
        time: time,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        pushToken: user.pushToken,
      })
      .then((querySnapshot) => {
        // const data = querySnapshot.docs.map(doc => doc.data())

        // console.log("fid fid : ", fid);

        postData
          .doc(fid)
          .get()
          .then((documentSnapshot) => {
            console.log("User exists: ", documentSnapshot.exists);

            if (documentSnapshot.exists) {
              console.log("User data: ", documentSnapshot.data());

              var data = documentSnapshot.data();
              console.log("commentData::::::::", data);
              console.log("commentCount data : ", data.commentCount);

              // if (data.likeCount == undefined) {
              postData
                .doc(fid)
                .update({
                  commentCount: data.commentCount + 1,
                })
                .then(() => {
                  console.log("commentCount updated!");

                  var temp = data123;

                  temp.map((item) => {
                    // console.log('fid123 : ', fid)
                    // console.log('item.fid123 : ', item.id)
                    console.log("temp", temp);
                    // console.log('data::',data)
                    // console.log('data:::',data.userId)
                    console.log("postData.id", postData.id);
                    console.log("user.id", user.id);
                    console.log("item.id", item.id);
                    console.log("item.userId", item.userId);
                    console.log("item::::::", item);

                    if (fid == item.id) {
                      console.log("condition apply");
                      item.commentCount = data.commentCount + 1;
                      notificationManager.sendPushNotification(
                        data,
                        IMLocalized("New comment!"),
                        IMLocalized("Someone commented on your post."),
                        "friend_match",
                        { fromUser: user }
                      );
                    }
                  });

                  setData([...temp]);

                  setLoading(false);
                  setCommentsView(false);
                });

              // }
            }
          });

        // console.log('makelike data : ', data)
      });
  };

  const getComment = (item, fid, userId, itemData, profilepic) => {
    navigation.navigate("Comments", { itemData: itemData });
  };
  const getLikeCount = (likeData) => {
    console.log("likeData:::", likeData);

    if (!isEmpty(likeData)) {
      var like = 0;
      likeData.map((data, index) => {
        console.log("data", data);
        if (data.likeStatus) {
          like = like + 1;
          console.log("like::::::", like);
        }
        // if (data.likeStatus === true) {
        //   if ((like = like + 1)) {
        //     notificationManager.sendPushNotification(
        //       user,
        //       IMLocalized("new like"),
        //       IMLocalized("You’ve got a new like!"),
        //       "friend_match",
        //       { fromUser: data.userId }
        //     );
        //   }
        // }
        // // if (like = like + 1) {
        // //   notificationManager.sendPushNotification(
        // //     user,
        // //     IMLocalized("new like"),
        // //     IMLocalized("You’ve got a new like!"),
        // //     "friend_match",
        // //     { fromUser: data },

        // //   );

        // }
        else {
          // like = like - 1
        }
      });

      return like;
    } else {
      return 0;
    }
  };
  // const profilePicture = (id) => {
  //   postData

  //   userRef
  //     .orderBy('createdAt')
  //     .limit()
  //     .onSnapshot(document1 => {
  //       const userData1 = document1.docs.map(doc => doc.data())
  //       var profilepicture = []
  //       userData1.map(item => {
  //         if (
  //           item.userID === id) {
  //           console.log("item.userID", item.userID)
  //           console.log("id", id)
  //           console.log("item.profilePictureURL", item.profilePictureURL)

  //           profilepicture = item.profilePictureURL;

  //         }
  //       })
  //       return profilepicture

  //       // console.log("userData1",userData1)

  //     })

  // }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ height: 60, flexDirection: "row", marginHorizontal: 15 }}>
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={{ height: 20, width: 15, borderRadius: 30 }}
              source={require("../../../assets/images/back_arrow.png")}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 18, color: "#4bd3cb", fontWeight: "bold" }}>
            Lovia
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => openModal()}>
            <Image
              style={{ height: 24, width: 24 }}
              source={require("../../../assets/images/school.png")}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ height: 4, backgroundColor: "#F4F4F5" }}></View>

      {data123.length == 0 ? (
        <View style={{ justifyContent: "center", flex: 1 }}>
          <NoPost profilePictureURL={user.profilePictureURL} />
        </View>
      ) : (
        <FlatList
          data={data123}
          ListHeaderComponent={() => {
            return (
              <Text
                style={{ fontSize: 16, marginLeft: 15, marginVertical: 10 }}
              >
                Top
              </Text>
            );
          }}
          //contentContainerStyle={{ paddingBottom: 80 }}
          renderItem={(item, index) => {
            // console.log(
            //   'item : ',
            //   item.item.profilePictureURL == undefined
            //     ? likeIcon
            //     : item.item.profilePictureURL
            // )

            // console.log('item.createdAt : ', item.createdAt)
            return (
              <View>
                {item.index === 0 ? null : (
                  <View
                    style={{ height: 4, backgroundColor: "#F4F4F5" }}
                  ></View>
                )}

                <View
                  style={{
                    height: 50,
                    marginHorizontal: 15,
                    flexDirection: "row",
                  }}
                >
                  <View style={{ flex: 1, justifyContent: "center" }}>
                    <Image
                      style={{ height: 35, width: 35, borderRadius: 30 }}
                      source={{ uri: item.item.profilePhoto }}
                      // source={{uri:profilePicture(item.item.userId)}}
                    />
                  </View>
                  <View style={{ flex: 5.5, justifyContent: "center" }}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("ProfileScreen", {
                          id: item.item.userId,
                        })
                      }
                    >
                      <Text style={{ fontSize: 12 }}>{item.item.name}</Text>
                      <Text style={{ fontSize: 8 }}>{item.item.time}</Text>
                    </TouchableOpacity>
                  </View>
                  {user.id == item.item.userId && (
                    <TouchableOpacity
                      onPress={() => showBottomActionsheet(item.item.id)}
                      style={{
                        flex: 1,
                        alignItems: "flex-end",
                        justifyContent: "center",
                      }}
                    >
                      <Image
                        style={{ height: 5, width: 15 }}
                        source={require("../../../assets/images/more.png")}
                      />
                    </TouchableOpacity>
                  )}
                </View>
                <View style={{ marginHorizontal: 15 }}>
                  <Text style={{ fontSize: 12 }}>{item.item.description}</Text>
                </View>
                {/* //   <Image
                //   style={{ height: 200, width: '100%',resizeMode:'contain' }}
                //   source={require('../../../assets/images/NoImage.jpeg')}
                // /> */}
                <FullScreenImage
                  setProfilePictureFile={item.item.profilePictureURL}
                  appStyles={DynamicAppStyles}
                />

                <View style={{ height: 45, flexDirection: "row" }}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        makeLike(
                          item.item.userId,
                          item.index,
                          item.item.likeStatus,
                          item.item.id,
                          item.item.name,
                          item.item.profilePhoto,
                          item.item.likeData
                        )
                      }
                    >
                      {manageLike(
                        item,
                        item.item.id,
                        item.item.userId,
                        item.item.likeData
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        onPressLike(
                          item,
                          item.item.id,
                          item.item.userId,
                          item.item.likeData
                        )
                      }
                    >
                      <Text
                        style={{ marginLeft: 5, fontSize: 12, marginBottom: 3 }}
                      >
                        {getLikeCount(item.item.likeData)} Likes
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        setCommentsView(true);
                        setCommentData([
                          { id: item.item.userId },
                          { index: item.index },
                          { status: item.item.likeStatus },
                          { fid: item.item.id },
                          { name: item.item.name },
                          { profilepic: item.item.profilePhoto },
                        ]);
                      }}
                    >
                      <Image
                        style={{ height: 16, width: 17 }}
                        source={require("../../../assets/images/comment3.png")}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        getComment(item, item.item.id, item.item.userId, [
                          { id: item.item.userId },
                          { index: item.index },
                          { status: item.item.likeStatus },
                          { fid: item.item.id },
                          { name: item.item.name },
                          { profilepic: item.item.profilePhoto },
                        ]);
                      }}
                    >
                      <Text
                        style={{ marginLeft: 5, fontSize: 12, marginBottom: 3 }}
                      >
                        {item.item.commentCount} Comments
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          }}
        />
      )}

      <TouchableOpacity
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: Platform.OS == "android" ? 50 : 56,
          width: 50,
          bottom: Platform.OS == "ios" ? 50 : 50,
          right: 20,
          position: "absolute",
        }}
        onPress={() => setShowModal(!showModal)}
      >
        <Image
          style={{
            height: 50,
            width: 50,
            position: "absolute",
            marginTop: 700,
            marginLeft: 320,
          }}
          source={require("../../../assets/images/new_post.png")}
        />
      </TouchableOpacity>

      {commentsView ? (
        <View
          style={{
            height: 60,
            backgroundColor: "white",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              style={{ height: 30, width: 30, borderRadius: 40 }}
              source={{ uri: user.profilePictureURL }}
            />
          </View>
          <View style={{ flex: 5, justifyContent: "center" }}>
            <View
              style={{
                height: 35,
                borderWidth: 1,
                marginRight: 30,
                borderRadius: 30,
                borderColor: "lightgray",
                flexDirection: "row",
              }}
            >
              <View style={{ flex: 5, height: 35 }}>
                <TextInput
                  autoFocus
                  placeholder={"Add a comment"}
                  style={{ marginLeft: 10, height: 35 }}
                  onChangeText={(value) => setCommentsText(value)}
                  onSubmitEditing={() => setCommentsView(false)}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "flex-end",
                  justifyContent: "center",
                  marginRight: 5,
                }}
              >
                <TouchableOpacity onPress={() => shareComment()}>
                  <Image
                    style={{ height: 25, width: 25, borderRadius: 40 }}
                    source={require("../../../assets/images/SendButton.png")}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      ) : null}

      <Modal
        animationType={"slide"}
        transparent={false}
        visible={showModal}
        onRequestClose={() => {
          // console.log('Modal has been closed.')
        }}
      >
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
          <View
            style={{ height: 60, flexDirection: "row", marginHorizontal: 15 }}
          >
            <View
              style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
            ></View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Add Photo
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <TouchableOpacity onPress={() => setShowModal(!showModal)}>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: "column",
              flex: 1,
              justifyContent: "space-evenly",
            }}
          >
            {/* <KeyboardAwareScrollView> */}
            <KeyboardAwareScrollView
              extraScrollHeight={100}
              enableOnAndroid={true}
            >
              {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} > */}
              <View>
                <PostImagePicker
                  setProfilePictureFile={setProfilePictureFile}
                  appStyles={DynamicAppStyles}
                />

                <View style={{ marginHorizontal: 20 }}>
                  <ScrollView>
                    {/* For Privacy ActionSheet */}
                    <TouchableOpacity
                      onPress={() => showActionSheet2()}
                      style={{
                        height: 45,
                        backgroundColor: "#FFFFFF",
                        marginTop: 15,
                        // shadowColor: '#000',
                        shadowOffset: {
                          width: 0,
                          height: 1,
                        },
                        shadowOpacity: 0.15,
                        shadowRadius: 2.84,
                        elevation: 2,
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
                            fontSize: 16,
                            justifyContent: "flex-start",
                            right: 15,
                          }}
                        >
                          {/* School */}
                          Privacy
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
                          {Preferences}
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <ActionSheet
                      ref={actionSheet2}
                      // title={'Which one do you like ?'}
                      options={optionArrayPost}
                      cancelButtonIndex={2}
                      onPress={(index) => {
                        console.log(index);

                        if (index == 2) {
                          console.log("if");
                        } else {
                          console.log("ifelse");
                          // setSchoolName(optionArray[index])
                          setPrivacy(optionArray[index]);
                          AsyncStorage.setItem(
                            "schoolName",
                            optionArrayPost[index]
                          );

                          setPreferences(optionArray[index]);
                          AsyncStorage.setItem(
                            "preferences",
                            optionArray[index]
                          );
                          setPrivacy(optionArray[index]);
                          AsyncStorage.setItem("privacy", optionArray[index]);
                        }
                      }}
                    />

                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        marginTop: 15,
                      }}
                    >
                      Description
                    </Text>
                    <TextInput
                      multiline={true}
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        marginTop: 15,
                      }}
                      placeholder={"Post something funny !"}
                      onChangeText={(value) => {
                        setDescription(value);
                      }}
                      onSubmitEditing={() => setPostButton(false)}
                      onTouchStart={() => setPostButton(true)}
                      // value={"This post is for - " + Privacy}
                    ></TextInput>
                  </ScrollView>
                </View>
              </View>
              <View
                style={{
                  justifyContent: "flex-end",
                  alignContent: "flex-end",
                  marginVertical: 75,
                }}
              >
                <TouchableOpacity
                  style={{
                    height: 50,
                    marginHorizontal: 50,
                    borderRadius: 50,
                    backgroundColor: "#3c9c94",
                  }}
                  onPress={() => createPost()}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      color: "white",
                      fontWeight: "bold",
                      marginTop: 15,
                      textAlign: "center",
                    }}
                  >
                    Post
                  </Text>
                </TouchableOpacity>
              </View>

              {/* </TouchableWithoutFeedback>  */}
            </KeyboardAwareScrollView>
          </View>

          {/* <View
            style={{
              flex: 1,
              backgroundColor: 'red',
              justifyContent: 'flex-end',
            

            }}
          > */}
          {/* {postButton ? null : (
              <View style={{ height: 120,backgroundColor:'aqua'}}>
                <View style={{ height: 4, backgroundColor: '#F4F4F5' }}></View>
                <View style={{ flex: 1, justifyContent: 'center',backgroundColor:'pink'}}>
                  <TouchableOpacity
                    style={{
                      height: 50,
                      marginHorizontal: 50,
                      borderRadius: 50,
                      backgroundColor: '#3c9c94'
                    }}
                    onPress={() => createPost()}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        color: 'white',
                        fontWeight: 'bold',
                        marginTop: 15,
                        textAlign: 'center'
                      }}
                    >
                      Post
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View> */}
        </SafeAreaView>
        {loading && <TNActivityIndicator appStyles={DynamicAppStyles} />}
      </Modal>

      <Modal
        animationType={"slide"}
        transparent={false}
        visible={showModal1}
        onRequestClose={() => {
          console.log("Modal has been closed.");
        }}
      >
        <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
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
            <TouchableOpacity onPress={() => setShowModal1(false)}>
              <Image
                source={require("../../../assets/images/false2.png")}
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
            onPress={() => showActionSheetPost()}
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
                {/* School */}
                Preferences
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
                {Preferences}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={(index) => {
              console.log(index);
              onSchoolFilter();
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
            ref={actionSheetPost}
            // title={"Which one do you like ?"}
            options={optionArray}
            cancelButtonIndex={2}
            onPress={(index) => {
              console.log(index);

              if (index == 2) {
                console.log("if");
              } else {
                console.log("ifelse");
                setPreferences(optionArray[index]);
                AsyncStorage.setItem("preferences", optionArray[index]);
                setPrivacy(optionArray[index]);
                AsyncStorage.setItem("privacy", optionArray[index]);
              }
            }}
          />
        </SafeAreaView>
      </Modal>

      <ActionSheet
        ref={bottomActionsheet}
        // title={'Which one do you like ?'}
        options={deleteoptionArray}
        cancelButtonIndex={1}
        onPress={(index) => {
          console.log(index);

          if (index == 0) {
            deletePost();
          }
        }}
      />

      {loading && <TNActivityIndicator appStyles={DynamicAppStyles} />}
    </SafeAreaView>
  );
};

export default Post;
