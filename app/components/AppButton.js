import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { color } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

import colors from "../config/colors";

function AppButton({ title, onPress, color = "primary" }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    margin: 5,
    borderColor: colors.light,
    borderWidth: 1,
    color: colors.dark,
  },
  text: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
});
export default AppButton;
