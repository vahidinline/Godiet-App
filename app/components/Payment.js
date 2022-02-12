import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import StripeApp from "./StripeApp";
import { StripeProvider } from "@stripe/stripe-react-native";
import colors from "../config/colors";
function Payment({ navigation }) {
  return (
    <StripeProvider publishableKey="pk_live_51JSLBhAB6MVrXxqz2xIX8gMzOy42N5NXaVfe1JEXWOX2RNSWJQJtYG2BCDvduyHp9nmpGgXA3Mj1yjcjkdVs1DX700fmWJ7rzX">
      <StripeApp />
      <View>
        <Button
          title="Back to home"
          style={styles.button}
          onPress={() => navigation.navigate("Welcome")}
        ></Button>
      </View>
    </StripeProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff",
  },
  button: {
    margin: 5,
    color: colors.white,
    height: 50,
    borderRadius: 5,
  },
});
export default Payment;
