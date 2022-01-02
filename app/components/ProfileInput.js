import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "../config/colors";
import AppButton from "./AppButton";
import AppText from "./AppText";
import AppTextInput from "./AppTextInput";

function ProfileInput() {
  const [textInputValue, setTextInputValue] = useState("");
  const [value, setValue] = useState("");
  const saveValue = () => {
    if (textInputValue) {
      AsyncStorage.setItem("key", textInputValue);
      setTextInputValue("");
      alert("Data Saved");
    } else {
      alert("Please fill data");
    }
  };
  const getValue = () => {
    AsyncStorage.getItem("key").then((value) => {
      setValue(value);
    });
  };

  useEffect(() => {
    getValue();
  }, []);
  return (
    <View>
      <AppTextInput
        value={textInputValue}
        style={styles.input}
        onChangeText={(text) => setTextInputValue(text)}
      />
      <AppButton title="Save name" onPress={() => saveValue()} />
      <AppButton title="Remove name" onPress={() => getValue()} />
      <AppText>Name: {value}</AppText>
    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    margin: 32,
    height: 64,
    borderRadius: 5,
    width: 200,
    fontSize: 30,
    borderColor: colors.medium,
  },
});
export default ProfileInput;
