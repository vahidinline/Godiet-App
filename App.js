import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./app/navigation/AuthNavigator";
import TabNavigation from "./app/navigation/TabNavigation";
import { LogBox } from "react-native";
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
  return (
    <>
      <NavigationContainer>
        <TabNavigation />
      </NavigationContainer>
    </>
  );
}

export default App;
