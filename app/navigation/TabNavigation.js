import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

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
        options={{ headerShown: false }}
        name="Welcome"
        component={WelcomeScreen}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Calories"
        component={Calories}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Profile"
        component={ProfileInput}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Login"
        component={LoginScreen}
      />
      <Tab.Screen name="Step" component={Stepcounter} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
