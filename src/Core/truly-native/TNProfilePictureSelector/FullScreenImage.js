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

import dynamicStyles from './styles'
import { useColorScheme } from 'react-native-appearance'
import { IMLocalized } from '../../localization/IMLocalization'

import FastImage from 'react-native-fast-image'

const Image = FastImage

const FullScreenImage = props => {
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
      onPressAddPhotoBtn()
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
     
<TouchableOpacity style={{ marginTop: 10, width: '100%' }} onPress={() => handleProfilePictureClick(props.setProfilePictureFile)}>
                {props.setProfilePictureFile == undefined ? null : (
                  <Image
                    style={{ height: 400, width: '100%' }}
                    source={{ uri: props.setProfilePictureFile }}
                    resizeMode='contain'
                  />
                )}
              </TouchableOpacity>
      {/* <View
        style={{
          height: 200,
          backgroundColor: 'lightgray',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      > */}
        

       
        <ImageView
          images={tappedImage}
          isVisible={isImageViewerVisible}
          onClose={() => setIsImageViewerVisible(false)}
          controls={{ close: closeButton }}
        />
       
      {/* </View> */}
      
    </>
  )
}

export default FullScreenImage
