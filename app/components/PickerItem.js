import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import styles from "../config/styles";
import AppText from "./AppText";

function PickerItem({ label, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

export default PickerItem;
