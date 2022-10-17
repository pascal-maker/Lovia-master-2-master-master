import React, { useEffect, useState } from 'react'
import {
  View, Text, Image, TouchableOpacity, FlatList,
  SafeAreaView
} from 'react-native'
import { useSelector } from 'react-redux'
import TNActivityIndicator from '../../Core/truly-native/TNActivityIndicator'
import DynamicAppStyles from '../../DynamicAppStyles'
import { firebase } from '../../Core/api/firebase/config'
import { notificationManager } from "../../Core/notifications";


const Like = props => {
  console.log('props : ', props.route.params.likedata)
  const user = useSelector(state => state.auth.user)

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const postData = firebase.firestore().collection('post')

  useEffect(() => {
    var temp = []
    props.route.params.likeData.reverse().map(item => {
      if (item.likeStatus) {
        temp.push(item)
      }
    })
    setData(temp)
    // getLikeData()
  }, [])

  const getLikeData = () => {
    var data = []

    data = props.route.params.likeData
    setLoading(true)

    postData
      .doc(props.route.params.fid)
      .collection('post')
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data())
        console.log('userData : ', data)
        setData(data)
        setLoading(false)
      })
  
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ height: 60, flexDirection: 'row', marginHorizontal: 15 }}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Image
              style={{ height: 20, width: 15, borderRadius: 30 }}
              source={require('../../../assets/images/back_arrow.png')}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Likes</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center'
          }}
        >
          {/* <Image
            style={{ height: 24, width: 24 }}
            source={require('../../../assets/images/school.png')}
          /> */}
        </View>
      </View>
      <View style={{ height: 4, backgroundColor: '#F4F4F5' }}></View>
      <FlatList
        data={data}
        // ListHeaderComponent={() => {
        //   return (
        //     <Text style={{ fontSize: 16, marginLeft: 15, marginVertical: 10 }}>
        //       Trending
        //     </Text>
        //   )
        // }}
        contentContainerStyle={{ marginTop: 5 }}
        renderItem={(item, index) => {
          console.log('item : ', item)
          console.log('index : ', index)
          return (
            <View>
              <View
                style={{
                  height: 50,
                  marginHorizontal: 15,
                  marginVertical: 5,
                  flexDirection: 'row'
                }}
              >
                <View style={{ flex: 1, justifyContent: 'center' }}>
                  <Image
                    style={{ height: 40, width: 40, borderRadius: 40 }}
                    source={{ uri: item.item.profilepic }}
                  />
                </View>
                <View style={{ flex: 5.5, justifyContent: 'center' }}>
                  <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                    {item.item.name}
                  </Text>
                </View>
              </View>
            </View>
          )
        }}
      />
      {loading && <TNActivityIndicator appStyles={DynamicAppStyles} />}
    </SafeAreaView>
  )
}

export default Like

// postData
//   .doc(fid)
//   .collection('likes')
//   .doc(user.userID)
//   .set({
//     likeStatus: false,
//     userId: user.userID,
//     name: user.firstName + ' ' + user.lastName,
//     profilepic: user.profilePictureURL
//   })
//   .then(() => {
//     // if (!isEmpty(data)) {
//     //   console.log('data not null')

//     postData
//       .doc(fid)
//       .collection('likes')
//       .get()
//       .then(querySnapshot => {
//         const data = querySnapshot.docs.map(doc => doc.data())
//         console.log('makelike data : ', data)

//         data.map(item => {
//           console.log('item : ', item)
//           console.log('item.userId : ', item.userId)

//           if (item.userId == user.userID) {
//             if (item.likeStatus) {
//               console.log('true')

//               postData
//                 .doc(fid)
//                 .collection('likes')
//                 .doc(user.userID)
//                 .set({
//                   likeStatus: false,
//                   userId: user.userID,
//                   name: user.firstName + ' ' + user.lastName,
//                   profilepic: user.profilePictureURL
//                 })
//                 .then(() => {
//                   console.log('fid => ', fid)
//                   postData
//                     .doc(fid)
//                     .get()
//                     .then(documentSnapshot => {
//                       console.log('User exists: ', documentSnapshot.exists)

//                       if (documentSnapshot.exists) {
//                         console.log('User data: ', documentSnapshot.data())

//                         var data = documentSnapshot.data()

//                         console.log('data : ', data.likeCount)

//                         // if (data.likeCount == undefined) {
//                         postData
//                           .doc(fid)
//                           .update({
//                             likeCount: data.likeCount - 1
//                           })
//                           .then(() => {
//                             var temp = data123

//                             temp.map(item => {
//                               console.log('fid123 : ', fid)
//                               console.log('item.fid123 : ', item.id)

//                               if (fid == item.id) {
//                                 console.log('condition apply')
//                                 item.likeCount = data.likeCount - 1

//                                 postData
//                                   .doc(fid)
//                                   .collection('likes')
//                                   .doc(user.userID)
//                                   .delete()
//                                   .then(() => {
//                                     console.log('User deleted!')
//                                   })
//                               }
//                             })

//                             setData([...temp])

//                             console.log('User updated!')
//                           })
//                         // }
//                       }

//                       setLoading(false)
//                     })
//                 })
//                 .catch(error => {
//                   const { message } = error
//                   setLoading(false)

//                   console.log('upload error', error)
//                 })
//             } else {
//               console.log('false')

//               postData
//                 .doc(fid)
//                 .collection('likes')
//                 .doc(user.userID)
//                 .set({
//                   likeStatus: true,
//                   userId: user.userID,
//                   name: user.firstName + ' ' + user.lastName,
//                   profilepic: user.profilePictureURL
//                 })
//                 .then(() => {
//                   postData
//                     .doc(fid)
//                     .get()
//                     .then(documentSnapshot => {
//                       console.log('User exists: ', documentSnapshot.exists)

//                       if (documentSnapshot.exists) {
//                         console.log('User data: ', documentSnapshot.data())

//                         var data = documentSnapshot.data()

//                         console.log('data : ', data.likeCount)

//                         // if (data.likeCount == undefined) {
//                         postData
//                           .doc(fid)
//                           .update({
//                             likeCount: data.likeCount + 1
//                           })
//                           .then(() => {
//                             var temp = data123

//                             temp.map(item => {
//                               console.log('fid123 : ', fid)
//                               console.log('item.fid123 : ', item.id)

//                               if (fid == item.id) {
//                                 console.log('condition apply')
//                                 item.likeCount = data.likeCount + 1
//                               }
//                             })

//                             setData([...temp])
//                             console.log('User updated!')
//                           })
//                         // }
//                       }

//                       setLoading(false)
//                     })
//                 })
//                 .catch(error => {
//                   const { message } = error
//                   setLoading(false)

//                   console.log('upload error', error)
//                 })
//             }
//           } else {
//             console.log('user id not match')

//             // if (item.likeStatus) {
//             console.log('item.likeStatus : ', item.likeStatus)
//             // }

//             // postData
//             //   .doc(fid)
//             //   .collection('likes')
//             //   .doc(user.userID)
//             //   .set({
//             //     likeStatus: true,
//             //     userId: user.userID,
//             //     name: user.firstName + ' ' + user.lastName,
//             //     profilepic: user.profilePictureURL
//             //   })
//             //   .then(() => {
//             //     postData
//             //       .doc(fid)
//             //       .get()
//             //       .then(documentSnapshot => {
//             //         console.log('User exists: ', documentSnapshot.exists)

//             //         if (documentSnapshot.exists) {
//             //           console.log('User data: ', documentSnapshot.data())

//             //           var data = documentSnapshot.data()

//             //           console.log('data : ', data.likeCount)

//             //           // if (data.likeCount == undefined) {
//             //           postData
//             //             .doc(fid)
//             //             .update({
//             //               likeCount: data.likeCount + 1
//             //             })
//             //             .then(() => {
//             //               var temp = data123

//             //               temp.map(item => {
//             //                 console.log('fid123 : ', fid)
//             //                 console.log('item.fid123 : ', item.id)

//             //                 if (fid == item.id) {
//             //                   console.log('condition apply')
//             //                   item.likeCount = data.likeCount + 1
//             //                 }
//             //               })

//             //               setData([...temp])

//             //               console.log('User updated!')
//             //             })
//             //           // }
//             //         }

//             //         setLoading(false)
//             //       })
//             //   })
//             //   .catch(error => {
//             //     const { message } = error
//             //     setLoading(false)

//             //     console.log('upload error', error)
//             //   })
//           }

//           setLoading(false)
//         })
//         // }
//         // else {
//         //   console.log('data null')

//         //   postData
//         //     .doc(fid)
//         //     .collection('likes')
//         //     .doc(user.userID)
//         //     .set({
//         //       likeStatus: true,
//         //       userId: user.userID,
//         //       name: user.firstName + ' ' + user.lastName,
//         //       profilepic: user.profilePictureURL
//         //     })
//         //     .then(() => {
//         //       postData
//         //         .doc(fid)
//         //         .get()
//         //         .then(documentSnapshot => {
//         //           console.log('User exists: ', documentSnapshot.exists)

//         //           if (documentSnapshot.exists) {
//         //             console.log('User data: ', documentSnapshot.data())

//         //             var data = documentSnapshot.data()

//         //             console.log('data : ', data.likeCount)

//         //             // if (data.likeCount == undefined) {
//         //             postData
//         //               .doc(fid)
//         //               .update({
//         //                 likeCount: data.likeCount + 1
//         //               })
//         //               .then(() => {
//         //                 var temp = data123

//         //                 temp.map(item => {
//         //                   console.log('fid123 : ', fid)
//         //                   console.log('item.fid123 : ', item.id)

//         //                   if (fid == item.id) {
//         //                     console.log('condition apply')
//         //                     item.likeCount = data.likeCount + 1
//         //                   }
//         //                 })

//         //                 setData([...temp])

//         //                 console.log('User updated!')
//         //               })
//         //             // }
//         //           }

//         //           setLoading(false)
//         //         })
//         //     })
//         //     .catch(error => {
//         //       const { message } = error
//         //       setLoading(false)

//         //       console.log('upload error', error)
//         //     })
//         // }
//       })
//       .catch(error => {
//         const { message } = error
//         setLoading(false)

//         console.log('upload error', error)
//       })
//   })
