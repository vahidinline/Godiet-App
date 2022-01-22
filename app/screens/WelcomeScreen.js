import React, { useState, useEffect } from "react";
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
import LoginScreen from "./LoginScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

function WelcomeScreen({ navigation }) {
  const [nameValue, setNameValue] = useState();
  const getData = async () => {
    try {
      let data = await AsyncStorage.getItem("@Key");
      if (data !== null) {
        data = JSON.parse(data);
        setNameValue(data.name);
        // setAgeValue(data.age);
        // setHeightSelect(data.height);
        // setWeightSelect(data.weight);
        // setGenderSelect(data.gender);
      }
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

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
          {nameValue != null && (
            <View>
              <Text style={styles.text}>Welcome {nameValue}</Text>
            </View>
          )}
          {/* <AppButton
            title="SignUp or Log In"
            onPress={() => navigation.navigate("Primium")}
          /> */}
          {nameValue == null && (
            <View>
              <Text style={styles.text}>New member?</Text>

              <AppButton
                title="Start"
                onPress={() => navigation.navigate("Profile")}
              />
            </View>
          )}
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
  text: {
    fontSize: 20,
    fontWeight: "200",
    color: colors.white,
  },
});
export default WelcomeScreen;
