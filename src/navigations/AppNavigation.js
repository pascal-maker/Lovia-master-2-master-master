import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { Platform, Dimensions } from "react-native";
import {
  IMEditProfileScreen,
  IMUserSettingsScreen,
  IMContactUsScreen,
  IMBlockedUsersScreen,
} from "../Core/profile";
import { IMChatScreen } from "../Core/chat";
import ConversationsScreen from "../screens/ConversationsScreen/ConversationsScreen";
import LoadScreen from "../Core/onboarding/LoadScreen/LoadScreen";
import SwipeScreen from "../screens/SwipeScreen/SwipeScreen";
import Post from "../screens/PostScreen/Post";
import MyProfileScreen from "../screens/MyProfileScreen/MyProfileScreen";
import AddProfilePictureScreen from "../screens/AddProfilePictureScreen";
import LoginScreen from "../Core/onboarding/LoginScreen/LoginScreen";
import SignupScreen from "../Core/onboarding/SignupScreen/SignupScreen";
import WelcomeScreen from "../Core/onboarding/WelcomeScreen/WelcomeScreen";
import WalkthroughScreen from "../Core/onboarding/WalkthroughScreen/WalkthroughScreen";
import ResetPasswordScreen from "../Core/onboarding/ResetPasswordScreen/ResetPasswordScreen";
import SmsAuthenticationScreen from "../Core/onboarding/SmsAuthenticationScreen/SmsAuthenticationScreen";
import DynamicAppStyles from "../DynamicAppStyles";
import DatingConfig from "../DatingConfig";
import { NavigationContainer } from "@react-navigation/native";
import { TNTouchableIcon } from "../Core/truly-native";
import { useColorScheme } from "react-native-appearance";
import { authManager } from "../Core/onboarding/utils/api";
import { DEVICE_HEIGHT } from "../helpers/statics";
import Like from "../screens/PostScreen/Like";
import Comments from "../screens/PostScreen/Comments";
import ProfileScreen from "../screens/MyProfileScreen/ProfileScreen";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const LoginStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        initialParams={{
          appStyles: DynamicAppStyles,
          appConfig: DatingConfig,
          authManager: authManager,
        }}
        name="Welcome"
        component={WelcomeScreen}
      />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Sms" component={SmsAuthenticationScreen} />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPasswordScreen}
        initialParams={{
          appStyles: DynamicAppStyles,
          appConfig: DatingConfig,
          authManager: authManager,
        }}
      />
    </Stack.Navigator>
  );
};

const MyProfileStack = () => {
  let colorScheme = useColorScheme();
  let currentTheme = DynamicAppStyles.navThemeConstants[colorScheme];
  let bottomTheme = DynamicAppStyles.navBottomThemeConstants[colorScheme];

  return (
    <Stack.Navigator
      initialRouteName="MyProfile"
      screenOptions={{ headerTitleAlign: "center" }}
    >
      <Stack.Screen
        initialParams={{ appStyles: DynamicAppStyles }}
        name="MyProfile"
        options={({ navigation }) => ({
          headerTransparent: true,
          headerStatusBarHeight:
            Platform.OS == "ios"
              ? 55
              : Dimensions.get("window").height < 630
              ? DEVICE_HEIGHT * 0.88
              : // : DEVICE_HEIGHT * 0.94,
                DEVICE_HEIGHT * 0.91,

          headerTitle: () => (
            <TNTouchableIcon
              imageStyle={{ tintColor: bottomTheme.secondary }}
              containerStyle={{
                marginTop: Platform.OS == "ios" ? DEVICE_HEIGHT * 1.68 : 0,
              }}
              iconSource={require("../../assets/images/home.png")}
              appStyles={DynamicAppStyles}
              onPress={() => navigation.navigate("Swipe")}
            />
          ),
          headerRight: () => (
            <TNTouchableIcon
              imageStyle={{
                tintColor: bottomTheme.secondary,
                marginRight: 48,
              }}
              containerStyle={{
                marginTop: Platform.OS == "ios" ? DEVICE_HEIGHT * 1.68 : 0,
              }}
              iconSource={DynamicAppStyles.iconSet.conversations}
              onPress={() => {
                //navigation.pop();
                navigation.navigate("Conversations", {
                  appStyles: DynamicAppStyles,
                });
              }}
              appStyles={DynamicAppStyles}
            />
          ),
          headerLeft: () => (
            <TNTouchableIcon
              imageStyle={{
                tintColor: bottomTheme.primary,
                hight: 32,
                width: 25.5,
                alignSelf: "center",
              }}
              containerStyle={{
                height: 55,
                width: 55,
                // backgroundColor: "#FFB8CA",
                marginLeft: 48,
                // borderRadius: 55,
                marginTop: Platform.OS == "ios" ? DEVICE_HEIGHT * 1.68 : 0,
              }}
              iconSource={DynamicAppStyles.iconSet.userProfile}
              appStyles={DynamicAppStyles}
            />
          ),
          headerStyle: {
            backgroundColor: currentTheme.backgroundColor,
            borderBottomWidth: 0,
          },
          headerTintColor: currentTheme.fontColor,
        })}
        component={MyProfileScreen}
      />
      <Stack.Screen
        options={{ headerBackTitle: "Back" }}
        name="AccountDetails"
        component={IMEditProfileScreen}
      />
      <Stack.Screen
        options={{ headerBackTitle: "Back" }}
        name="Settings"
        component={IMUserSettingsScreen}
      />
      <Stack.Screen
        options={{ headerBackTitle: "Back" }}
        name="ContactUs"
        component={IMContactUsScreen}
      />
      <Stack.Screen
        options={{ headerBackTitle: "Back" }}
        name="BlockedUsers"
        component={IMBlockedUsersScreen}
      />
    </Stack.Navigator>
  );
};

const ConversationsStack = () => {
  return (
    <Stack.Navigator
      headerLayoutPreset="center"
      screenOptions={{ headerShown: false }}
      initialRouteName="Conversations"
    >
      <Stack.Screen
        initialParams={{
          appStyles: DynamicAppStyles,
        }}
        name="Conversations"
        component={ConversationsScreen}
      />
    </Stack.Navigator>
  );
};

const doNotShowHeaderOption = {
  headerShown: false,
};

const DrawerStack = () => {
  let colorScheme = useColorScheme();
  let currentTheme = DynamicAppStyles.navThemeConstants[colorScheme];
  let bottomTheme = DynamicAppStyles.navBottomThemeConstants[colorScheme];
  return (
    <Stack.Navigator
      screenOptions={{ headerTitleAlign: "center" }}
      headerMode="screen"
      initialRouteName="Swipe"
    >
      <Stack.Screen
        options={({ navigation }) => ({
          headerTransparent: true,
          headerStatusBarHeight:
            Platform.OS == "ios"
              ? 55
              : Dimensions.get("window").height < 730
              ? DEVICE_HEIGHT * 0.88
              : // : DEVICE_HEIGHT * 0.94,
                DEVICE_HEIGHT * 0.91,

          headerTitle: () => (
            <TNTouchableIcon
              imageStyle={{
                tintColor:
                  colorScheme == "light"
                    ? bottomTheme.primary
                    : bottomTheme.secondary,
                alignSelf: "center",
              }}
              containerStyle={{
                height: 55,
                width: 55,
                // backgroundColor: "#FFB8CA",
                //alignItem: "center",
                // borderRadius: 55,
                alignSelf: "center",
                marginTop: Platform.OS == "ios" ? DEVICE_HEIGHT * 1.68 : 0,
                //   marginTop:
                // Platform.OS == "ios"
                //   ? Dimensions.get("window").height < 740
                //     ? 17
                //     : 45
                //   : 17,
              }}
              iconSource={require("../../assets/images/home.png")}
              onPress={() =>
                navigation.navigate("Swipe", {
                  appStyles: DynamicAppStyles,
                })
              }
              appStyles={DynamicAppStyles}
            />
          ),
          headerRight: () => (
            <TNTouchableIcon
              imageStyle={{
                tintColor:
                  colorScheme == "light"
                    ? bottomTheme.secondary
                    : bottomTheme.primary,
                marginRight: 50,
              }}
              containerStyle={{
                marginTop: Platform.OS == "ios" ? DEVICE_HEIGHT * 1.68 : 0,
                // marginTop: Platform.OS == "android" ? DEVICE_HEIGHT * 1.68 : 0,
              }}
              iconSource={DynamicAppStyles.iconSet.conversations}
              onPress={() =>
                navigation.navigate("Conversations", {
                  appStyles: DynamicAppStyles,
                })
              }
              appStyles={DynamicAppStyles}
            />
          ),
          headerLeft: () => (
            <TNTouchableIcon
              imageStyle={{
                tintColor:
                  colorScheme == "light"
                    ? bottomTheme.secondary
                    : bottomTheme.primary,
                hight: 32,
                width: 25.5,
                marginLeft: 50,
              }}
              containerStyle={{
                marginTop: Platform.OS == "ios" ? DEVICE_HEIGHT * 1.68 : 0,
              }}
              iconSource={DynamicAppStyles.iconSet.userProfile}
              onPress={() =>
                navigation.navigate("MyProfileStack", {
                  appStyles: DynamicAppStyles,
                })
              }
              appStyles={DynamicAppStyles}
            />
          ),
          headerStyle: {
            backgroundColor: currentTheme.backgroundColor,
            borderBottomWidth: 0,
          },
          headerTintColor: currentTheme.fontColor,
        })}
        name="Swipe"
        component={SwipeScreen}
      />
      <Stack.Screen
        initialParams={{
          appStyles: DynamicAppStyles,
        }}
        options={({ navigation }) => ({
          headerTransparent: true,
          headerStatusBarHeight:
            Platform.OS == "ios"
              ? 55
              : Dimensions.get("window").height < 730
              ? DEVICE_HEIGHT * 0.88
              : // : DEVICE_HEIGHT * 0.94,
                DEVICE_HEIGHT * 0.91,

          headerTitle: () => (
            <TNTouchableIcon
              imageStyle={{ tintColor: bottomTheme.secondary }}
              containerStyle={{
                marginTop: Platform.OS == "ios" ? DEVICE_HEIGHT * 1.68 : 0,
              }}
              iconSource={require("../../assets/images/home.png")}
              onPress={() => navigation.navigate("Swipe")}
              appStyles={DynamicAppStyles}
            />
          ),
          headerRight: () => (
            <TNTouchableIcon
              imageStyle={{
                tintColor: bottomTheme.primary,
                alignSelf: "center",
              }}
              containerStyle={{
                height: 55,
                width: 55,
                // backgroundColor: "#FFB8CA",
                marginRight: 45,
                alignItem: "center",
                // borderRadius: 55,
                marginTop: Platform.OS == "ios" ? DEVICE_HEIGHT * 1.68 : 0,
              }}
              iconSource={DynamicAppStyles.iconSet.conversations}
              onPress={() =>
                navigation.navigate("Conversations", {
                  appStyles: DynamicAppStyles,
                })
              }
              appStyles={DynamicAppStyles}
            />
          ),
          headerLeft: () => (
            <TNTouchableIcon
              imageStyle={{
                tintColor: bottomTheme.secondary,
                hight: 32,
                width: 25.5,
                marginLeft: 50,
              }}
              containerStyle={{
                marginTop: Platform.OS == "ios" ? DEVICE_HEIGHT * 1.68 : 0,
              }}
              iconSource={DynamicAppStyles.iconSet.userProfile}
              onPress={() => {
                //navigation.pop();
                navigation.navigate("MyProfileStack", {
                  appStyles: DynamicAppStyles,
                });
              }}
              appStyles={DynamicAppStyles}
            />
          ),
          headerStyle: {
            backgroundColor: currentTheme.backgroundColor,
            borderBottomWidth: 0,
          },
          headerTintColor: currentTheme.fontColor,
        })}
        name="Conversations"
        component={ConversationsStack}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="MyProfileStack"
        component={MyProfileStack}
      />

      <Stack.Screen
        name="AddProfilePicture"
        component={AddProfilePictureScreen}
      />

      <Stack.Screen
        initialParams={{
          appStyles: DynamicAppStyles,
        }}
        options={{ headerShown: false }}
        name="Post"
        component={Post}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="Like"
        component={Like}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Comments"
        component={Comments}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ProfileScreen"
        component={ProfileScreen}
      />
      <Stack.Screen name="AccountDetails" component={IMEditProfileScreen} />
    </Stack.Navigator>
  );
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator headerMode="float" initialRouteName="NavStack">
      <Stack.Screen
        initialParams={{
          appStyles: DynamicAppStyles,
        }}
        options={doNotShowHeaderOption}
        name="NavStack"
        component={DrawerStack}
      />
      <Stack.Screen
        options={{ headerBackTitle: "Back" }}
        name="PersonalChat"
        component={IMChatScreen}
      />
    </Stack.Navigator>
  );
};

// Manifest of possible screens
const RootNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ animationEnabled: false, headerShown: false }}
      initialRouteName="LoadScreen"
    >
      <Stack.Screen
        initialParams={{
          appStyles: DynamicAppStyles,
          appConfig: DatingConfig,
        }}
        name="LoadScreen"
        component={LoadScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Walkthrough"
        component={WalkthroughScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="LoginStack"
        component={LoginStack}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="MainStack"
        component={MainStackNavigator}
      />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

export { RootNavigator, AppNavigator };
