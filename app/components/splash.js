import React from "react";
import LottieView from "lottie-react-native";

function splash(props) {
  return (
    <LottieView
      style={{
        width: 400,
        height: 400,
        backgroundColor: "#eee",
      }}
      source={require("../assets/splash.json")}
      // OR find more Lottie files @ https://lottiefiles.com/featured
      // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
    />
  );
}

export default splash;
