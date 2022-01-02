import React, { useEffect } from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import Screen from "./app/components/Screen";
import * as ImagePicker from "expo-image-picker";
import BasicForm from "./app/screens/BasicForm";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import LoginScreen from "./app/screens/LoginScreen";
import styles from "./app/config/styles";
import Stepcounter from "./app/components/Stepcounter";
import Calories from "./app/components/Calories";
import AppButton from "./app/components/AppButton";
import VideoPage from "./app/components/VideoPage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ProfileInput from "./app/components/ProfileInput";

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
      <AppButton
        title="Play"
        onPress={() => navigation.navigate("VideoPage")}
      />
    </View>
  );
}
export default function App() {
  const Tab = createBottomTabNavigator();
  const TabNavigator = () => (
    <Tab.Navigator
      tabBarOptions={{
        activeBackgroundColor: "tomato",
        activeTintColor: "white",
      }}
    >
      <Tab.Screen name="Tools" component={Calories} />
      <Tab.Screen name="WorkOut" component={VideoPage} />
    </Tab.Navigator>
  );
  return (
    <>
      <NavigationContainer>
        <Tab.Navigator initialRouteName="Home">
          <Tab.Screen
            options={{
              tabBarIcon: () => (
                <MaterialCommunityIcons name="home" size={30} />
              ),
            }}
            name="Home"
            component={HomeScreen}
          />
          <Tab.Screen
            options={{
              tabBarIcon: () => (
                <MaterialCommunityIcons name="information" size={30} />
              ),
            }}
            name="Home"
            name="WelcomeScreen"
            component={ProfileInput}
          />
          <Tab.Screen
            options={{
              tabBarIcon: () => (
                <MaterialCommunityIcons name="tools" size={30} />
              ),
            }}
            name="Home"
            name="Calories"
            component={Calories}
          />
          <Tab.Screen
            options={{
              tabBarIcon: () => (
                <MaterialCommunityIcons name="counter" size={30} />
              ),
            }}
            name="Home"
            name="Stepcounter"
            component={Stepcounter}
          />
          <Tab.Screen
            options={{
              tabBarIcon: () => (
                <MaterialCommunityIcons name="video" size={30} />
              ),
            }}
            name="Home"
            name="VideoPage"
            component={VideoPage}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}
