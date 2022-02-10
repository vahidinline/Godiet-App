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
const Stack = createStackNavigator();
const AuthNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      options={{ headerShown: false }}
      name="Welcome"
      component={WelcomeScreen}
    />
    <Stack.Screen
      options={{ headerShown: false }}
      name="Login"
      component={LoginScreen}
    />
    <Stack.Screen
      options={{ headerShown: false }}
      name="Calories"
      component={Calories}
    />
    <Stack.Screen
      options={{ headerShown: false }}
      name="tracker"
      component={WeightTracker}
    />
    <Stack.Screen
      options={{ headerShown: true }}
      name="Profile"
      component={ProfileInput}
    />
    <Stack.Screen
      options={{ headerShown: false }}
      name="Payment"
      component={Payment}
    />
    <Stack.Screen
      options={{ headerShown: true }}
      name="Workout"
      component={ListingScreen}
    />
  </Stack.Navigator>
);

export default AuthNavigator;
