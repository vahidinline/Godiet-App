import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { MainStackNavigator, ContactStackNavigator } from "./AuthNavigator";
import WelcomeScreen from "../screens/WelcomeScreen";
import Calories from "../components/Calories";
import ProfileInput from "../components/ProfileInput";
import LoginScreen from "../screens/LoginScreen";
import Stepcounter from "../components/Stepcounter";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <MaterialCommunityIcons name="home" color={"#000"} size={30} />
          ),
        }}
        name="Home"
        component={WelcomeScreen}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <MaterialCommunityIcons name="tools" color={"#000"} size={30} />
          ),
        }}
        name="Calories"
        component={Calories}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <MaterialCommunityIcons name="account" color={"#000"} size={30} />
          ),
        }}
        name="Profile"
        component={ProfileInput}
      />
      {/* <Tab.Screen
        options={{ headerShown: false }}
        name="Login"
        component={LoginScreen}
      /> */}
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <MaterialCommunityIcons name="counter" color={"#000"} size={30} />
          ),
        }}
        name="Step"
        component={Stepcounter}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;