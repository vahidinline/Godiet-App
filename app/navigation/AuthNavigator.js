import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import Calories from "../components/Calories";
import ProfileInput from "../components/ProfileInput";
import Stepcounter from "../components/Stepcounter";

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
      name="Profile"
      component={ProfileInput}
    />
    <Stack.Screen
      options={{ headerShown: false }}
      name="Step"
      component={Stepcounter}
    />
  </Stack.Navigator>
);

export default AuthNavigator;
