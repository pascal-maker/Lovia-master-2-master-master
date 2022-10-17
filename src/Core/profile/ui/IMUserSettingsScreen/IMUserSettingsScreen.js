import React, { Component } from "react";
import { BackHandler, ScrollView } from "react-native";
import { connect } from "react-redux";
import { IMLocalized } from "../../../localization/IMLocalization";
import { setUserData } from "../../../onboarding/redux/auth";
import { userAPIManager } from "../../../api";
import IMFormComponent from "../IMFormComponent/IMFormComponent";
import { Appearance } from "react-native-appearance";
import AsyncStorage from "@react-native-community/async-storage";
import { setI18nConfig } from "../../../../../src/Core/localization/IMLocalization";

class IMUserSettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.appStyles = props.route.params.appStyles;
    let screenTitle = props.route.params.screenTitle || IMLocalized("Settings");
    let COLOR_SCHEME = Appearance.getColorScheme();
    let currentTheme = this.appStyles.navThemeConstants[COLOR_SCHEME];
    props.navigation.setOptions({
      headerTitle: screenTitle,
      headerStyle: {
        backgroundColor: currentTheme.backgroundColor,
      },
      headerTintColor: currentTheme.fontColor,
    });

    this.form = props.route.params.form;
    this.initialValuesDict = props.user.settings || {};

    this.state = {
      form: props.form,
      alteredFormDict: {},
    };

    this.didFocusSubscription = props.navigation.addListener(
      "focus",
      (payload) =>
        BackHandler.addEventListener(
          "hardwareBackPress",
          this.onBackButtonPressAndroid
        )
    );
  }

  componentDidMount() {
    this.willBlurSubscription = this.props.navigation.addListener(
      "beforeRemove",
      (payload) =>
        BackHandler.removeEventListener(
          "hardwareBackPress",
          this.onBackButtonPressAndroid
        )
    );
  }

  componentWillUnmount() {
    this.didFocusSubscription && this.didFocusSubscription();
    this.willBlurSubscription && this.willBlurSubscription();
  }

  onBackButtonPressAndroid = () => {
    this.props.navigation.goBack();
    return true;
  };

  onFormSubmit = () => {
    const user = this.props.user;
    var newSettings = user.settings || {};
    const form = this.form;
    const alteredFormDict = this.state.alteredFormDict;

    form.sections.forEach((section) => {
      section.fields.forEach((field) => {
        const newValue = alteredFormDict[field.key];

        if (newValue != null) {
          newSettings[field.key] = alteredFormDict[field.key];

          if (newValue == "English") {
            AsyncStorage.setItem("any_key_here", "en");
            setI18nConfig();
          }

          // if(newValue == 'France'){
          //   AsyncStorage.setItem('any_key_here', 'fr');
          //   setI18nConfig();
          // }

          // if(newValue == 'German'){
          //   AsyncStorage.setItem('any_key_here', 'gr');
          //   setI18nConfig();
          // }

          // if(newValue == 'Vertaling'){
          //   AsyncStorage.setItem('any_key_here', 'vr');
          //   setI18nConfig();
          // }
          if (newValue == "Dutch") {
            AsyncStorage.setItem("any_key_here", "du");
            setI18nConfig();
          }
        }
      });
    });

    let newUser = { ...user, settings: newSettings };
    userAPIManager.updateUserData(user.id, newUser);
    this.props.setUserData({ user: newUser });

    this.props.navigation.navigate("LoadScreen");
  };

  onFormChange = (alteredFormDict) => {
    this.setState({ alteredFormDict });
  };

  onFormButtonPress = (buttonField) => {
    this.onFormSubmit();
  };

  render() {
    return (
      <ScrollView
        style={{
          backgroundColor: this.appStyles.navThemeConstants[
            Appearance.getColorScheme()
          ].backgroundColor,
        }}
      >
        <IMFormComponent
          form={this.form}
          initialValuesDict={this.initialValuesDict}
          onFormChange={this.onFormChange}
          navigation={this.props.navigation}
          appStyles={this.appStyles}
          onFormButtonPress={this.onFormButtonPress}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    user: auth.user,
  };
};

export default connect(mapStateToProps, { setUserData })(IMUserSettingsScreen);
