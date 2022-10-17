import React, { useEffect, useState } from "react";

import { AppRegistry, LogBox, StatusBar } from "react-native";
import SplashScreen from "react-native-splash-screen";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import * as RNLocalize from "react-native-localize";
import { Appearance, AppearanceProvider } from "react-native-appearance";
import { setI18nConfig } from "./src/Core/localization/IMLocalization";
import { AppNavigator } from "./src/navigations/AppNavigation";
import IAPManagerWrapped from "./src/Core/inAppPurchase/IAPManagerWrapped";
import AppReducer from "./src/redux";
import { enableScreens } from "react-native-screens";
import DynamicAppStyles from "./src/DynamicAppStyles";
import DatingConfig from "./src/DatingConfig";
import {
  requestUserPermission,
  notificationListener,
} from "./src/Core/notifications/firebase/notificationService";
import messaging from "@react-native-firebase/messaging";

const MainNavigator = AppNavigator;

const store = createStore(AppReducer, applyMiddleware(thunk));

// const useForceUpdate = () => useState()[1];

const App = (props) => {
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());
  enableScreens();

  useEffect(() => {
    SplashScreen.hide();
    LogBox.ignoreAllLogs(true);
    requestUserPermission(), notificationListener(), setI18nConfig();
    RNLocalize.addEventListener("change", handleLocalizationChange);
    Appearance.addChangeListener(({ colorScheme }) => {
      setColorScheme(colorScheme);
    });
    return () => {
      RNLocalize.removeEventListener("change", handleLocalizationChange);
    };
  }, []);
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert("A new FCM message arrived!", JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);
  const handleLocalizationChange = () => {
    setI18nConfig();
    // useForceUpdate();
  };

  return (
    <Provider store={store}>
      <AppearanceProvider>
        {/* <IAPManagerWrapped
          appStyles={DynamicAppStyles}
          appConfig={DatingConfig}> */}
        <StatusBar />
        <MainNavigator screenProps={{ theme: colorScheme }} />
        {/* </IAPManagerWrapped> */}
      </AppearanceProvider>
    </Provider>
  );
};

App.propTypes = {};

App.defaultProps = {};

AppRegistry.registerComponent("App", () => App);

export default App;
