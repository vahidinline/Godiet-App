import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import StripeApp from "./StripeApp";
import { StripeProvider } from "@stripe/stripe-react-native";
function Payment(props) {
  return (
    <StripeProvider publishableKey="pk_live_51JSLBhAB6MVrXxqz2xIX8gMzOy42N5NXaVfe1JEXWOX2RNSWJQJtYG2BCDvduyHp9nmpGgXA3Mj1yjcjkdVs1DX700fmWJ7rzX">
      <StripeApp />
    </StripeProvider>
  );
}

export default Payment;
