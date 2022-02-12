import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import Calories from "../components/Calories";
import ProfileInput from "../components/ProfileInput";
import Stepcounter from "../components/Stepcounter";
import LoginScreen from "../screens/LoginScreen/";
import WeightTracker from "../components/WeightTracker";
import ListingScreen from "../screens/ListingScreen";
import Payment from "../components/Payment";
import colors from "../config/colors";
const Stack = createStackNavigator();
const AuthNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: colors.secondary },
      headerTintColor: colors.white,
    }}
  >
    <Stack.Screen
      options={{ headerShown: false }}
      name="Home"
      component={WelcomeScreen}
    />
    <Stack.Screen
      options={{ headerShown: true, title: "User Login" }}
      name="Login"
      component={LoginScreen}
    />
    <Stack.Screen
      options={{ headerShown: true, title: "Calories Calculator" }}
      name="Calories"
      component={Calories}
    />
    <Stack.Screen
      options={{
        headerShown: true,
        title: "Weight Tracker",
      }}
      name="tracker"
      component={WeightTracker}
    />
    <Stack.Screen
      options={{
        headerShown: true,
        title: "User Profile",
        headerStyle: { backgroundColor: colors.secondary },
      }}
      name="Profile"
      component={ProfileInput}
    />
    <Stack.Screen
      options={{ headerShown: true }}
      name="Payment"
      component={Payment}
    />
    <Stack.Screen
      options={{ headerShown: true, title: "Workout Videos" }}
      name="Workout"
      component={ListingScreen}
    />
  </Stack.Navigator>
);

export default AuthNavigator;
