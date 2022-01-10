import React from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Button,
} from "react-native";
import AppButton from "../components/AppButton";
import colors from "../config/colors";

function WelcomeScreen({ navigation }) {
  return (
    <>
      <ImageBackground
        blurRadius={3}
        style={styles.background}
        source={require("../assets/welcome-bg.jpeg")}
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
            title="Login or Register"
            onPress={() => navigation.navigate("Login")}
          />
          <AppButton
            title="Calories"
            onPress={() => navigation.navigate("Calories")}
          />
          <AppButton
            title="Profile"
            onPress={() => navigation.navigate("Profile")}
          />
          <AppButton title="Step" onPress={() => navigation.navigate("Step")} />
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
    top: 300,
    alignItems: "center",
  },
  tagline: {
    fontSize: 20,
    fontWeight: "200",
    paddingBottom: 180,
    color: colors.white,
  },
});
export default WelcomeScreen;
