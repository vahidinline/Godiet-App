import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import colors from "../config/colors";
import styles from "../config/styles";
import AppText from "./AppText";
import ListItemSeprator from "./ListItemSeprator";

function PickerItem({ label, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text
        style={{
          fontSize: 30,
          direction: "rtl",
          lineHeight: 80,
          textAlign: "center",
          backgroundColor: colors.secondary,
          color: colors.light,
        }}
      >
        {label}
      </Text>
      <ListItemSeprator />
    </TouchableOpacity>
  );
}

export default PickerItem;
