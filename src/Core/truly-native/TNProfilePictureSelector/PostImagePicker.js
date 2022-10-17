import React, { useState, useRef } from 'react'
import {
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  Text,
  TouchableHighlight
} from 'react-native'
import ActionSheet from 'react-native-actionsheet'
import ImageView from 'react-native-image-view'
import Icon from 'react-native-vector-icons/FontAwesome'
import * as ImagePicker from 'expo-image-picker'
import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'
import ImagePickerRN from "react-native-image-crop-picker";

import dynamicStyles from './styles'
import { useColorScheme } from 'react-native-appearance'
import { IMLocalized } from '../../localization/IMLocalization'

import FastImage from 'react-native-fast-image'

const Image = FastImage

const PostImagePicker = props => {
  const [profilePictureURL, setProfilePictureURL] = useState(
    props.profilePictureURL || ''
  )
  const originalProfilePictureURL = useRef(props.profilePictureURL || '')
  if (originalProfilePictureURL.current !== (props.profilePictureURL || '')) {
    originalProfilePictureURL.current = props.profilePictureURL || ''
    setProfilePictureURL(props.profilePictureURL || '')
  }

  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null)
  const [isImageViewerVisible, setIsImageViewerVisible] = useState(false)
  const [tappedImage, setTappedImage] = useState([])
  const actionSheet = useRef(null)
  const { appStyles } = props
  const colorScheme = useColorScheme()
  const styles = dynamicStyles(appStyles, colorScheme)

  const handleProfilePictureClick = url => {
    if (url) {
      const isAvatar = url.search('avatar')
      const image = [
        {
          source: {
            uri: url
          }
        }
      ]
      if (isAvatar === -1) {
        setTappedImage(image)
        setIsImageViewerVisible(true)
      } else {
        showActionSheet()
      }
    } else {
      showActionSheet()
    }
  }

  const onImageError = () => {
    console.log('Error loading profile photo at url ' + profilePictureURL)
    const defaultProfilePhotoURL =
      'https://www.iosapptemplates.com/wp-content/uploads/2019/06/empty-avatar.jpg'
    setProfilePictureURL(defaultProfilePhotoURL)
  }

  const onLaunchCamera = () => {
    ImagePicker.openCamera({
      cropping: false
    }).then(image => {
      startUpload(image, updateUserPhotos)
    })
  }

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      console.log('Constants.platform.ios')
      const { status } = await Permissions.askAsync(Permissions.CAMERA)
      console.log('status : ', status)
      if (status !== 'granted') {
        console.log('granted')
        Alert.alert(
          '',
          IMLocalized(
            'Sorry, we need camera roll permissions to make this work!'
          ),
          [{ text: IMLocalized('OK') }],
          {
            cancelable: false
          }
        )
      } else {
        console.log('else_part')
      }
    }
  }

  const onOpenPhotos = () => {
    ImagePickerRN.openPicker({
      cropping: false,
    })
      .then((result) => {
        console.log('result : ',result)
        // startUpload(image, updateUserPhotos);
        setProfilePictureURL(result.path)
        props.setProfilePictureFile(result)
      })
      .catch((error) => {
        console.log(error);
        setTimeout(() => {
          alert(
            IMLocalized(
              "An errord occurred while loading image. Please try again."
            )
          );
        }, 1000);
      });
  };

  const onPressAddPhotoBtn = async () => {
    console.log('onPressAddPhotoBtn')
    const options = {
      title: IMLocalized('Select photo'),
      cancelButtonTitle: IMLocalized('Cancel'),
      takePhotoButtonTitle: IMLocalized('Take Photo'),
      chooseFromLibraryButtonTitle: IMLocalized('Choose from Library'),
      maxWidth: 2000,
      maxHeight: 2000,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    }

    await getPermissionAsync()

    console.log('after_getPermissionAsync')

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images
      // allowsEditing: true,
      // aspect: [4, 3],
      // quality: 1,
    })

    console.log(result)

    if (!result.cancelled) {
      setProfilePictureURL(result.uri)
      props.setProfilePictureFile(result)
    }
  }

  const closeButton = () => (
    <TouchableOpacity
      style={styles.closeButton}
      onPress={() => setIsImageViewerVisible(false)}
    >
      <Image style={styles.closeIcon} source={appStyles.iconSet.close} />
    </TouchableOpacity>
  )

  const showActionSheet = index => {
    setSelectedPhotoIndex(index)
    actionSheet.current.show()
  }

  const onActionDone = index => {
    if (index == 0) {
      // onPressAddPhotoBtn()
      onOpenPhotos()
    }
    if (index == 2) {
      // Remove button
      if (profilePictureURL) {
        setProfilePictureURL(null)
        props.setProfilePictureFile(null)
      }
    }
  }

  return (
    <>
      {/* <View style={styles.imageBlock}> */}

      <View
        style={{
          height: 400,
          backgroundColor: 'lightgray',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {profilePictureURL ? (
          <TouchableHighlight
          style={[styles.image, { opacity: profilePictureURL ? 1 : 0.3 }]}
          onPress={() => handleProfilePictureClick(profilePictureURL)}
          // onPress={showActionSheet}
          >
          <Image
            style={[styles.image, { opacity: profilePictureURL ? 1 : 0.3 }]}
            source={
              profilePictureURL
                ? { uri: profilePictureURL }
                : appStyles.iconSet.userAvatar
            }
            resizeMode='contain'
            onError={onImageError}
          />
          </TouchableHighlight>
        ) : (
          <TouchableOpacity
            style={{
              height: 35,
              width: 180,
              backgroundColor: 'white',
              borderRadius: 5,
              alignItems: 'center',
              flexDirection: 'row'
            }}
            onPress={showActionSheet}
          >
            <Image
              style={{ height: 20, width: 20, marginHorizontal: 10 }}
              source={require('../../../../assets/images/photo_seletct.png')}
            />
            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
              Add Cover Photo
            </Text>
          </TouchableOpacity>
        )}

        {/* <ScrollView showsVerticalScrollIndicator={false}> */}
        <ActionSheet
          ref={actionSheet}
          title={IMLocalized('Confirm action')}
          options={[
            IMLocalized('Select Photo'),
            IMLocalized('Cancel'),
            // IMLocalized('Remove Post')
          ]}
          cancelButtonIndex={1}
          // destructiveButtonIndex={2}
          onPress={index => {
            onActionDone(index)
          }}
        />
        <ImageView
          images={tappedImage}
          isVisible={isImageViewerVisible}
          onClose={() => setIsImageViewerVisible(false)}
          controls={{ close: closeButton }}
        />
        {/* </ScrollView> */}
      </View>
      {/* <TouchableHighlight
          style={styles.imageContainer}
          onPress={() => handleProfilePictureClick(profilePictureURL)}>
          <Image
            style={[styles.image, { opacity: profilePictureURL ? 1 : 0.3 }]}
            source={
              profilePictureURL
                ? { uri: profilePictureURL }
                : appStyles.iconSet.userAvatar
            }
            resizeMode="cover"
            onError={onImageError}
          />
        </TouchableHighlight>

        <TouchableOpacity onPress={showActionSheet} style={styles.addButton}>
          <Icon name="camera" size={20} color="white" />
        </TouchableOpacity> */}
      {/* </View> */}
    </>
  )
}

export default PostImagePicker
