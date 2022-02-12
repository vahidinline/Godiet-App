import React, { useState, useEffect } from "react";
import {
  Image,
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import colors from "../config/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Screen from "../components/Screen";
import LottieView from "lottie-react-native";
import i18n from "i18n-js";

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
      <Screen style={styles.background}>
        <View style={{ display: "flex", direction: "inherit" }}>
          <View>
            <LottieView
              style={styles.animation}
              source={require("../assets/splash.json")}
              autoPlay
              // OR find more Lottie files @ https://lottiefiles.com/featured
              // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
            />
          </View>
        </View>
        <View style={styles.right}>
          <View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("tracker")}
            >
              <View style={{ flexDirection: "row" }}>
                <Image source={require("../assets/button.png")} />

                <Text style={styles.text}>{i18n.t("tracking")}</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Calories")}
            >
              <View style={{ flexDirection: "row" }}>
                <Image source={require("../assets/button.png")} />
                <Text style={styles.text}>{i18n.t("Calculator")}</Text>
              </View>
            </TouchableOpacity>
          </View>
          {/* </View>
        <View style={styles.left}> */}
          <View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Login")}
            >
              <View style={{ flexDirection: "row" }}>
                <Image source={require("../assets/button.png")} />
                <Text style={styles.text}>{i18n.t("Premium")}</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Workout")}
            >
              <View style={{ flexDirection: "row" }}>
                <Image source={require("../assets/button.png")} />
                <Text style={styles.text}>{i18n.t("videos")}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Screen>
    </>
  );
}
const styles = StyleSheet.create({
  right: {
    flexDirection: "column",
    flex: 1,
    direction: "ltr",
    alignItems: "flex-start",
  },
  left: {
    flexDirection: "column",
    flex: 1,
    direction: "ltr",
  },
  background: {
    // justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: colors.white,
  },
  buttonContainer: {
    padding: 20,
    width: "100%",
  },
  animation: {
    width: 500,
    height: 500,
  },
  button: {
    borderColor: colors.light,
    padding: 5,
    color: colors.white,
    height: 50,
    borderRadius: 5,
    width: "100%",
  },
  registerButton: {
    width: 200,
    height: 70,
    backgroundColor: colors.secondary,
  },
  logo: {
    position: "absolute",
    top: 70,
    width: 200,
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
    textAlign: "center",
    alignItems: "flex-start",
    padding: 10,
    justifyContent: "center",
  },
});
export default WelcomeScreen;
