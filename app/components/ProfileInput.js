import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "../config/colors";
import AppButton from "./AppButton";
import AppText from "./AppText";
import AppTextInput from "./AppTextInput";

function ProfileInput({ navigation }) {
  const [name, setName] = useState("");
  const save = async () => {
    try {
      await AsyncStorage.setItem("key", JSON.stringify(userData));
      const value = await AsyncStorage.getItem("key");
      const person = JSON.parse(value);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, []);

  return (
    <View>
      <AppTextInput
        name="name"
        style={styles.input}
        onChangeText={(text) => setName(text)}
      />

      <AppButton title="Save name" onPress={() => setName()} />
      <AppButton title="Home" onPress={() => navigation.navigate("Welcome")} />
      <AppText>Name:{name}</AppText>
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
