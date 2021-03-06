import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { MainStackNavigator, ContactStackNavigator } from "./AuthNavigator";
import WelcomeScreen from "../screens/WelcomeScreen";
import Calories from "../components/Calories";
import ProfileInput from "../components/ProfileInput";
import Stepcounter from "../components/Stepcounter";
import New from "../components/new";
import ListingScreen from "../screens/ListingScreen";
import LoginScreen from "../screens/LoginScreen";
import WeightTracker from "../components/WeightTracker";
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      {/* <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <MaterialCommunityIcons name="home" color={"#000"} size={30} />
          ),
        }}
        name="Home"
        component={LoginScreen}
      /> */}
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

      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="badge-account-outline"
              color={"#000"}
              size={30}
            />
          ),
        }}
        name="List"
        component={ListingScreen}
      />

      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="badge-account-outline"
              color={"#000"}
              size={30}
            />
          ),
        }}
        name="Tracker"
        component={WeightTracker}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
