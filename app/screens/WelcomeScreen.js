import React, { useState, useEffect } from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import LoginScreen from "../screens/LoginScreen";
import colors from "../config/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
function WelcomeScreen({ navigation }) {
  useEffect(() => {
    getData();
  }, []);
  const [nameValue, setNameValue] = useState();
  const getData = async () => {
    try {
      let data = await AsyncStorage.getItem("@Key");
      if (data !== null) {
        data = JSON.parse(data);
        setNameValue(data.name);
        //alert(data.name);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <LoginScreen />
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
