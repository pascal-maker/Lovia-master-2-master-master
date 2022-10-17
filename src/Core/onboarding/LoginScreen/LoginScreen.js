import React, { useState } from 'react'
import {
  Alert,
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import Button from 'react-native-button'
import { connect } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import TNActivityIndicator from '../../truly-native/TNActivityIndicator'
import { IMLocalized } from '../../localization/IMLocalization'
import dynamicStyles from './styles'
import { useColorScheme } from 'react-native-appearance'
import { setUserData } from '../redux/auth'
import { localizedErrorMessage } from '../utils/ErrorCode'

const LoginScreen = props => {
  const appConfig = props.route.params.appConfig
  const authManager = props.route.params.authManager

  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const appStyles = props.route.params.appStyles
  const colorScheme = useColorScheme()
  const styles = dynamicStyles(appStyles, colorScheme)

  const onPressLogin = () => {
    setLoading(true)

    var owaugent = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@['ugent']+(?:\.be)*$/
    //surname.name@ugent.be
    var webmailhogent = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@['student']+(?:\.hogent)+(?:\.be)*$/
    //surname.name@student.hogent.be
    var mijndinararteveldehs = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@['student']+(?:\.arteveldehs)+(?:\.be)*$/
    // surname.name@student.arteveldehs.be
    var webmailodisee = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@['student']+(?:\.odisee)+(?:\.be)*$/
    // surname.name@student.odisee.be
    var owastudentkuleuven = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@['student']+(?:\.kuleuven)+(?:\.be)*$/
    //surname.name@student.kuleuven.be
    var mailstudentlucaarts = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@['student']+(?:\.luca-arts)+(?:\.be)+(?:\.be)*$/
    // surname.name@student.luca-arts.be

    // if (
    //   !email.match(owaugent) &&
    //   !email.match(webmailhogent) &&
    //   !email.match(mijndinararteveldehs) &&
    //   !email.match(webmailodisee) &&
    //   !email.match(owastudentkuleuven) &&
    //   !email.match(mailstudentlucaarts)
    // ) {
    //   Alert.alert(
    //     '',
    //     IMLocalized(
    //       'Please enter a valid email address containing below domains.\n@ugent.be\n@student.hogent.be\n@student.arteveldehs.be\n@student.odisee.be\n@student.kuleuven.be\n@student.luca-arts.be'
    //     ),
    //     [{ text: IMLocalized('OK') }],
    //     {
    //       cancelable: false
    //     }
    //   )
    //   setLoading(false)
    // } else {
      authManager
        .loginWithEmailAndPassword(
          email && email.trim(),
          password && password.trim(),
          email.trim || password.trim(),
          email.trim(),
          password.trim(),
          appConfig
        )
        .then(response => {
          setLoading(false)

          if (response?.user) {
            const user = response.user
            props.setUserData({
              user: response.user
            })
            Keyboard.dismiss()
           
            props.navigation.reset({
              index: 0,
              routes: [{ name: 'MainStack', params: { user: user } }]
            })
          } else {
            setLoading(false)

            if (response.error == 'true') {
              alert('Email not verified. Please verify email and create login')
            } else {
              Alert.alert(
                '',
                localizedErrorMessage(response.error),
                [{ text: IMLocalized('OK') }],
                {
                  cancelable: false
                }
              )
            }
          }
        })
    // }
  }

  const onFBButtonPress = () => {
    setLoading(true)
    authManager.loginOrSignUpWithFacebook(appConfig).then(response => {
      if (response?.user) {
        const user = response.user
        props.setUserData({
          user: response.user
        })
        Keyboard.dismiss()
        props.navigation.reset({
          index: 0,
          routes: [{ name: 'MainStack', params: { user: user } }]
        })
      } else {
        setLoading(false)
        Alert.alert(
          '',
          localizedErrorMessage(response.error),
          [{ text: IMLocalized('OK') }],
          {
            cancelable: false
          }
        )
      }
    })
  }

  const onAppleButtonPress = async () => {
    setLoading(true)
    authManager.loginOrSignUpWithApple(appConfig).then(response => {
      if (response?.user) {
        const user = response.user
        props.setUserData({ user })
        Keyboard.dismiss()
        props.navigation.reset({
          index: 0,
          routes: [{ name: 'MainStack', params: { user: user } }]
        })
      } else {
        setLoading(false)
        Alert.alert(
          '',
          localizedErrorMessage(response.error),
          [{ text: IMLocalized('OK') }],
          {
            cancelable: false
          }
        )
      }
    })
  }

  const onForgotPassword = async () => {
    props.navigation.push('ResetPassword', {
      isResetPassword: true,
      appStyles,
      appConfig
    })
  }

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps='always'
      >
        <TouchableOpacity
          style={{ alignSelf: 'flex-start' }}
          onPress={() => props.navigation.goBack()}
        >
          <Image
            style={appStyles.styleSet.backArrowStyle}
            source={appStyles.iconSet.backArrow}
          />
        </TouchableOpacity>
        <Text style={styles.title}>{IMLocalized('Sign In')}</Text>
        <TextInput
          style={styles.InputContainer}
          placeholder={IMLocalized('E-mail')}
          keyboardType='email-address'
          placeholderTextColor='#aaaaaa'
          onChangeText={text => setEmail(text)}
          value={email}
          underlineColorAndroid='transparent'
          autoCapitalize='none'
        />
        <TextInput
          style={styles.InputContainer}
          placeholderTextColor='#aaaaaa'
          secureTextEntry
          placeholder={IMLocalized('Password')}
          onChangeText={text => setPassword(text)}
          value={password}
          underlineColorAndroid='transparent'
          autoCapitalize='none'
        />
        <View style={styles.forgotPasswordContainer}>
          <Button
            style={styles.forgotPasswordText}
            onPress={() => onForgotPassword()}
          >
            {IMLocalized('Forgot password?')}
          </Button>
        </View>
        <Button
          containerStyle={styles.loginContainer}
          style={styles.loginText}
          onPress={() => onPressLogin()}
        >
          {IMLocalized('Log In')}
        </Button>
        {/* <Text style={styles.orTextStyle}> {IMLocalized('OR')}</Text> */}
        {/* <Button
          containerStyle={styles.facebookContainer}
          style={styles.facebookText}
          onPress={() => onFBButtonPress()}>
          {IMLocalized('Login With Facebook')}
        </Button> */}
        {/* {appleAuth.isSupported && (
          <AppleButton
            cornerRadius={25}
            style={styles.appleButtonContainer}
            buttonStyle={appStyles.appleButtonStyle[colorScheme]}
            buttonType={AppleButton.Type.SIGN_IN}
            onPress={() => onAppleButtonPress()}
          />
        )} */}
        {/* {appConfig.isSMSAuthEnabled && (
          <Button
            containerStyle={styles.phoneNumberContainer}
            onPress={() =>
              props.navigation.navigate('Sms', {
                isSigningUp: false,
                appStyles,
                appConfig,
                authManager,
              })
            }>
            {IMLocalized('Login with phone number')}
          </Button>
        )} */}

        {loading && <TNActivityIndicator appStyles={appStyles} />}
      </KeyboardAwareScrollView>
    </View>
  )
}

export default connect(null, {
  setUserData
})(LoginScreen)
