import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import { useSelector, useDispatch, ReactReduxContext } from "react-redux";
import { firebase } from "../../Core/api/firebase/config";
import TNActivityIndicator from "../../Core/truly-native/TNActivityIndicator";
import DynamicAppStyles from "../../DynamicAppStyles";
import { notificationManager } from "../../Core/notifications";
import { IMLocalized } from "../../Core/localization/IMLocalization";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Comments = (props) => {
  // console.log('commentdata : ', props.route.params.commentdata)
  console.log("itemData : ", props.route.params.itemData);
  console.log("props.routes.params.id", props.route.params.id);

  const [data123, setData] = useState([]);
  const [commentData, setCommentData] = useState([
    { id: "" },
    { index: "" },
    { status: "" },
    { fid: "" },
    { name: "" },
    { profilepic: "" },
  ]);
  const [loading, setLoading] = useState(false);
  const [commentsText, setCommentsText] = useState("");

  const user = useSelector((state) => state.auth.user);
  console.log("user:::::", user);
  console.log("id:::", props.route.params.id);
  const postData = firebase.firestore().collection("post");

  useEffect(() => {
    getCommentData();
    // setCommentData(props.route.params.itemData)
  }, []);

  const getCommentData = () => {
    var data = [];

    data = props.route.params.itemData;
    console.log("data : ", data);
    console.log("id : ", data[0].id);
    console.log("index : ", data[1].index);
    console.log("status : ", data[2].status);
    console.log("fid : ", data[3].fid);
    console.log("name : ", data[4].name);
    console.log("profilepic : ", data[5].profilepic);

    setLoading(true);

    postData
      .doc(data[3].fid)
      .collection("comments")
      .orderBy("createdAt")
      // .limit(10)
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        console.log("userData : ", data);

        var temp = [];

        data.reverse().map((item) => {
          temp.push(item);
        });

        console.log("userData123 : ", data);
        console.log("temp : ", temp);

        setData(temp);

        setLoading(false);
        setCommentsText("");
      });
  };
  const onProfileClick = () => {
    console.log("user.id", user.id);
    console.log("comment Data:", commentData);
    console.log("Data", data123);
    console.log("props.route.params.itemData", props.route.params.itemData);
  };
  const shareComment = () => {
    //id, index, status, fid, name, profilepic

    var data = [];

    data = props.route.params.itemData;
    console.log("data : ", data);
    console.log("id : ", data[0].id);
    console.log("index : ", data[1].index);
    console.log("status : ", data[2].status);
    console.log("fid : ", data[3].fid);
    console.log("name : ", data[4].name);
    console.log("profilepic : ", data[5].profilepic);
    console.log("data.id", data.id);
    console.log("data", data);
    setLoading(true);

    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds

    console.log(date + "/" + month + "/" + year + " " + hours + ":" + min);

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

        console.log("fid fid : ", fid);

        postData
          .doc(fid)
          .get()
          .then((documentSnapshot) => {
            console.log("User exists: ", documentSnapshot.exists);

            if (documentSnapshot.exists) {
              console.log("User data: ", documentSnapshot.data());

              var data = documentSnapshot.data();

              console.log("commentCount data : ", data.commentCount);
              console.log("data::::::", data);

              // if (data.likeCount == undefined) {
              postData
                .doc(fid)
                .update({
                  commentCount: data.commentCount + 1,
                })
                .then(() => {
                  console.log("commentCount updated!");

                  notificationManager.sendPushNotification(
                    data,
                    IMLocalized("New comment!"),
                    IMLocalized("Someone commented on your post"),
                    "friend_match",
                    { fromUser: user }
                  );
                  setLoading(false);
                });

              // }
            }
          });

        // console.log('makelike data : ', data)
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ height: 60, flexDirection: "row", marginHorizontal: 15 }}>
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
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
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Comments</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {/* <Image
            style={{ height: 24, width: 24 }}
            source={require('../../../assets/images/school.png')}
          /> */}
        </View>
      </View>
      <View style={{ height: 4, backgroundColor: "#F4F4F5" }}></View>
      <FlatList
        data={data123}
        contentContainerStyle={{ marginTop: 8 }}
        renderItem={(item, index) => {
          // console.log('item : ', item)
          // console.log('index : ', index)
          return (
            <View>
              <View
                style={{
                  //   height: 50,
                  marginHorizontal: 15,
                  marginVertical: 8,
                  flexDirection: "row",
                }}
              >
                <View style={{ flex: 1 }}>
                  <TouchableOpacity onPress={onProfileClick}>
                    {/* <TouchableOpacity 
                    onPress={()=> props.navigation.navigate('ProfileScreen',{id:user.id})}> */}
                    <Image
                      style={{ height: 40, width: 40, borderRadius: 40 }}
                      source={{ uri: item.item.profilepic }}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={[
                    {
                      flex: 5.5,
                      justifyContent: "center",
                      padding: 10,
                      backgroundColor: "#F4F4F5",
                      borderTopRightRadius: 10,
                      borderBottomLeftRadius: 10,
                      borderBottomRightRadius: 10,
                    },
                    item.index % 2 ? { marginRight: 40, marginLeft: 10 } : null,
                  ]}
                >
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    {/* {item.item.id} */}
                    {item.item.name}
                  </Text>
                  <Text style={{ fontSize: 13 }}>{item.item.comment}</Text>
                  <Text style={{ fontSize: 10, textAlign: "right" }}>
                    {item.item.time}
                  </Text>
                </View>
              </View>
            </View>
          );
        }}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View
          style={{ height: 60, backgroundColor: "white", flexDirection: "row" }}
        >
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
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
                  value={commentsText}
                  placeholder={"Add a comment"}
                  autoFocus
                  style={{ marginLeft: 10, height: 35 }}
                  onChangeText={(value) => setCommentsText(value)}
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
      </KeyboardAvoidingView>

      {loading && <TNActivityIndicator appStyles={DynamicAppStyles} />}
    </SafeAreaView>
  );
};

export default Comments;

//For Flatlist comment data
// ListHeaderComponent={() => {
//   return (
//     <Text style={{ fontSize: 16, marginLeft: 15, marginVertical: 10 }}>
//       Trending
//     </Text>
//   )
// }}
