import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./app/navigation/AuthNavigator";
import TabNavigation from "./app/navigation/TabNavigation";
import { LogBox } from "react-native";
import Screen from "./app/components/Screen";
import logger from "./utility/logger";
import * as Localization from "expo-localization";
import i18n from "i18n-js";
import { en, fa } from "./app/lang";
i18n.fallbacks = true;

// Set the key-value pairs for the different languages you want to support.

i18n.translations = { en, fa };
// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;
logger.start();
// import NetInfo, { useNetInfo } from "@react-native-community/netinfo";
// import registerNNPushToken from "native-notify";

LogBox.ignoreLogs([
  "Warning: Async Storage has been extracted from react-native core",
]);

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
    </View>
  );
}

function App() {
  // logger.log(new Error("error in app"));
  // registerNNPushToken(2005, "PcPLgorwPWyNM5NGdBplPs");

  // const netInfo = useNetInfo();
  // return netInfo.isInternetReachable ? (
  //   <View></View>
  // ) : (
  //   <Screen>
  //     <Text>Offline</Text>
  //   </Screen>
  // );
  // const unsubscribe = NetInfo.addEventListener((netInfo) =>
  //   console.log(netInfo)
  // );
  // unsubscribe();
  return (
    <>
      <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>
    </>
  );
}

export default App;
