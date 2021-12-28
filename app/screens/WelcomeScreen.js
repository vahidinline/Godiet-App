import React from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import AppButton from "../components/AppButton";
import colors from "../config/colors";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./LoginScreen";

function WelcomeScreen({ navigation }) {
  return (
    <>
      <ImageBackground
        blurRadius={10}
        style={styles.background}
        source={require("../assets/bg.png")}
      >
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={{
              uri: "https://godiet.eu/_nuxt/img/143c88b.png",
            }}
          />
        </View>
        <Text style={styles.tagline}>Your way to be fit</Text>
        <View style={styles.buttonContainer}>
          <AppButton
            title="Login"
            onPress={() => navigation.navigate("LoginScreen")}
          />
          <AppButton title="register" color="secondary" />
        </View>
      </ImageBackground>
    </>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonContainer: {
    padding: 20,
    width: "100%",
  },

  registerButton: {
    width: "100%",
    height: 70,
    backgroundColor: colors.secondary,
  },
  logo: {
    position: "absolute",
    top: 70,
    width: 100,
    height: 30,
  },
  logoContainer: {
    position: "absolute",
    top: 90,
    alignItems: "center",
  },
  tagline: {
    fontSize: 20,
    fontWeight: "200",
    paddingBottom: 450,
    color: colors.white,
  },
});
export default WelcomeScreen;
