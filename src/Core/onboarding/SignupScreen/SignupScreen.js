import React, { useState } from "react";

import {
  Alert,
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Button from "react-native-button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ActionSheet from "react-native-actionsheet";
import dynamicStyles from "./styles";
import { useColorScheme } from "react-native-appearance";
import TNActivityIndicator from "../../truly-native/TNActivityIndicator";
import TNProfilePictureSelector from "../../truly-native/TNProfilePictureSelector/TNProfilePictureSelector";
import { IMLocalized } from "../../localization/IMLocalization";
import { setUserData } from "../redux/auth";
import { connect } from "react-redux";
import { localizedErrorMessage } from "../utils/ErrorCode";
import { storageAPI } from "../../../Core/api";
import TermsOfUseView from "../components/TermsOfUseView";
import { firebase as RNFBAuth } from "@react-native-firebase/auth";
import AsyncStorage from "@react-native-community/async-storage";
import { CheckBox } from "react-native-elements";
const emailTrail = [
  "@ugent.be",
  "@student.arteveldehs.be",
  "@student.luca-arts.be",
  "@student.hogent.be",
  "@student.odisee.be",
  "@student.hogent.be",
  "@student.hogent.be",
];
const SignupScreen = (props) => {
  const appConfig = props.route.params.appConfig;
  const appStyles = props.route.params.appStyles;
  // console.log("appStyles : ", appStyles);
  const authManager = props.route.params.authManager;

  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);

  const [inputFields, setInputFields] = useState({});
  const [suffix, setSuffix] = useState("");

  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [profilePictureFileURL, setProfilePictureFileURL] = useState(null);

  const [loading, setLoading] = useState(false);
  const [checkBox, setCheckBox] = useState(false);

  const startUpload = (source, updateUserData) => {
    setLoading(true);

    if (!source) {
      updateUserData(null);
      return;
    }

    storageAPI
      .processAndUploadMediaFile(source)
      .then(({ downloadURL }) => {
        if (downloadURL) {
          updateUserData(downloadURL);
          console.log("downloadURL", downloadURL);
          setProfilePictureFileURL(downloadURL);

          setLoading(false);
        } else {
          // an error occurred
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const updateUserInfo = (data) => {
    // setProfilePictureFileURL(data);
  };
  const updateProfilePictureURL = (file) => {
    setProfilePictureFile(file);
    startUpload(file, (uri) => updateUserInfo(uri));
  };

  const validateEmail = (text) => {
    let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(String(text).toLowerCase()) ? true : false;
  };

  const validatePassword = (text) => {
    let reg = /^(?=.*[A-Z])(?=.*[a-z])/;
    return reg.test(String(text)) ? true : false;
  };

  const trimFields = (fields) => {
    var trimmedFields = {};
    Object.keys(fields).forEach((key) => {
      if (fields[key]) {
        trimmedFields[key] = fields[key].trim();
      }
    });
    return trimmedFields;
  };

  const onRegister = async () => {
    console.log("inputFields : ", inputFields);

    // return null

    const {
      error: usernameError,
    } = await authManager.validateUsernameFieldIfNeeded(inputFields, appConfig);
    if (usernameError) {
      Alert.alert(
        "",
        IMLocalized(usernameError),
        [{ text: IMLocalized("OK") }],
        {
          cancelable: false,
        }
      );
      setInputFields((prevFields) => ({
        ...prevFields,
        password: "",
      }));
      return;
    }

    if (inputFields?.password?.trim() == "") {
      Alert.alert(
        "",
        IMLocalized("Password cannot be empty."),
        [{ text: IMLocalized("OK") }],
        {
          cancelable: false,
        }
      );
      setInputFields((prevFields) => ({
        ...prevFields,
        password: "",
      }));
      return;
    }

    if (inputFields?.password?.trim()?.length < 6) {
      Alert.alert(
        "",
        IMLocalized(
          "Password is too short. Please use at least 6 characters for security reasons."
        ),
        [{ text: IMLocalized("OK") }],
        {
          cancelable: false,
        }
      );
      setInputFields((prevFields) => ({
        ...prevFields,
        password: "",
      }));
      return;
    }

    if (!checkBox) {
      Alert.alert(
        "",
        IMLocalized("Please check Terms of use and Privacy."),
        [{ text: IMLocalized("OK") }],
        {
          cancelable: false,
        }
      );
      setInputFields((prevFields) => ({
        ...prevFields,
        password: "",
      }));
      return;
    }

    if (profilePictureFileURL == null) {
      Alert.alert(
        "",
        IMLocalized("Profile picture file is required."),
        [{ text: IMLocalized("OK") }],
        {
          cancelable: false,
        }
      );
      setInputFields((prevFields) => ({
        ...prevFields,
        password: "",
      }));
      return;
    }

    setLoading(true);

    const userDetails = {
      ...trimFields(inputFields),
      profilePictureURL: profilePictureFileURL,
      appIdentifier: appConfig.appIdentifier,
    };
    if (userDetails.username) {
      userDetails.username = userDetails.username?.toLowerCase();
    }
    userDetails.email = userDetails.email + suffix;
    console.log("userDetails", userDetails);

    authManager
      .createAccountWithEmailAndPassword(userDetails, appConfig)
      .then((response) => {
        setLoading(false);

        if (response.error) {
          Alert.alert(
            "",
            localizedErrorMessage(response.error),
            [{ text: IMLocalized("OK") }],
            {
              cancelable: false,
            }
          );
        } else {
          props.navigation.goBack();
        }
      });
  };

  const onChangeInputFields = (text, key) => {
    setInputFields((prevFields) => ({
      ...prevFields,
      [key]: text,
    }));
  };

  const onFormFieldValueChange = (formField, value) => {
    setInputFields((prevFields) => ({
      ...prevFields,
      [formField.key]: value,
    }));
  };

  const onSelectFieldPress = (selectField, ref) => {
    ref.current.show();
  };

  const onActionSheetValueSelected = (selectField, selectedIndex) => {
    console.log("selectField :: ", selectField);

    if (selectedIndex < selectField.options.length) {
      selectField.displayName = selectField.options[selectedIndex];
      const newValue = selectField.options[selectedIndex];
      onFormFieldValueChange(selectField, newValue);
    }

    console.log(
      "selectField, selectedIndex : ",
      selectField.displayName,
      selectedIndex
    );

    if (selectField.displayName == "School Preference") {
      AsyncStorage.setItem(
        "schoolname",
        selectField.displayOptions[selectedIndex]
      );
    }
    if (selectField.key == "school") {
      // onChangeInputFields(emailTrail[selectedIndex], "email");
      setSuffix(emailTrail[selectedIndex]);
    }
  };

  const renderInputField = (field, index) => {
    if (field.type == "text") {
      if (field.key == "email") {
        return (
          <View
            style={[
              {
                flexDirection: "row",
                // backgroundColor: "yellow",
                justifyContent: "center",
              },
            ]}
          >
            <TextInput
              key={index?.toString()}
              style={styles.InputContainerEmail}
              placeholder={field.placeholder}
              placeholderTextColor="#aaaaaa"
              secureTextEntry={field.secureTextEntry}
              onChangeText={(text) => onChangeInputFields(text, field.key)}
              value={inputFields[field.key]}
              keyboardType={"email-address"}
              underlineColorAndroid="transparent"
              autoCapitalize={field.autoCapitalize}
            />
            <Text style={[styles.InputContainerEmailSuffix]}>{suffix}</Text>
          </View>
        );
      } else {
        return (
          <TextInput
            key={index?.toString()}
            style={styles.InputContainer}
            placeholder={field.placeholder}
            placeholderTextColor="#aaaaaa"
            secureTextEntry={field.secureTextEntry}
            onChangeText={(text) => onChangeInputFields(text, field.key)}
            value={inputFields[field.key]}
            keyboardType={"email-address"}
            underlineColorAndroid="transparent"
            autoCapitalize={field.autoCapitalize}
          />
        );
      }
    }
    if (field.type == "select") {
      const actionSheetRef = React.createRef();
      return (
        <View>
          <TouchableOpacity
            key={index}
            onPress={() => onSelectFieldPress(field, actionSheetRef)}
            style={{ marginTop: 20 }}
          >
            <Text style={styles.InputContainer1}>{field.displayName}</Text>
            {/* <Text style={styles.text}>{computeValue(field)}</Text> */}
            <ActionSheet
              ref={actionSheetRef}
              title={field.displayName}
              options={[...field.displayOptions, IMLocalized("Cancel")]}
              cancelButtonIndex={field.displayOptions.length}
              onPress={(selectedIndex) => {
                onActionSheetValueSelected(field, selectedIndex);
              }}
            />
          </TouchableOpacity>
          <View style={styles.divider} />
        </View>
      );
    }
    return null;
  };

  const renderSignupWithEmail = () => {
    return (
      <>
        {appConfig.signupFields.map(renderInputField)}
        <CheckBox
          containerStyle={{
            backgroundColor: "transparent",
            borderColor: "transparent",
            justifyContent: "center",
            flexDirection: "row",
            alignContent: "center",
            marginVertical: "2%",
          }}
          // title="Click Here"
          checked={checkBox}
          title={
            <TermsOfUseView
              tosLink={appConfig.tosLink}
              privacyPolicyLink={appConfig.privacyPolicyLink}
              style={styles.tos}
            />
          }
          onPress={() => setCheckBox(!checkBox)}
        />

        <Button
          containerStyle={styles.signupContainer}
          style={styles.signupText}
          onPress={() => onRegister()}
        >
          {IMLocalized("Sign in")}
        </Button>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Image
            style={appStyles.styleSet.backArrowStyle}
            source={appStyles.iconSet.backArrow}
          />
        </TouchableOpacity>
        <Text style={styles.title}>{IMLocalized("Create new account")}</Text>
        <TNProfilePictureSelector
          setProfilePictureFile={updateProfilePictureURL}
          appStyles={appStyles}
        />
        {renderSignupWithEmail()}
        {/* {appConfig.isSMSAuthEnabled && (
          <>
            <Text style={styles.orTextStyle}>{IMLocalized('OR')}</Text>
            <Button
              containerStyle={styles.PhoneNumberContainer}
              onPress={() =>
                props.navigation.navigate('Sms', {
                  isSigningUp: true,
                  appStyles,
                  appConfig,
                  authManager,
                })
              }>
              {IMLocalized('Sign up with phone number')}
            </Button>
          </>
        )} */}
      </KeyboardAwareScrollView>
      {loading && <TNActivityIndicator appStyles={appStyles} />}
    </View>
  );
};

export default connect(null, {
  setUserData,
})(SignupScreen);
