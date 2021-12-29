import React, { useEffect } from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import Screen from "./app/components/Screen";
import * as ImagePicker from "expo-image-picker";
import BasicForm from "./app/screens/BasicForm";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import LoginScreen from "./app/screens/LoginScreen";
import styles from "./app/config/styles";
import Stepcounter from "./app/components/Stepcounter";
import Calories from "./app/components/Calories";

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image
        style={styles.logo}
        source={{
          uri: "https://godiet.eu/_nuxt/img/143c88b.png",
        }}
      />
      <Button
        title="Tap to start"
        onPress={() => navigation.navigate("WelcomeScreen")}
      />
    </View>
  );
}
export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <Calories />
    // <Stepcounter />
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName="Home">
    //     <Stack.Screen name="Home" component={HomeScreen} />
    //     <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
    //     <Stack.Screen name="LoginScreen" component={LoginScreen} />
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
}
