import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "../config/colors";
import AppButton from "./AppButton";
import AppText from "./AppText";
import AppTextInput from "./AppTextInput";
import { auth } from "../firebase";
import Screen from "./Screen";

function ProfileInput({ navigation }) {
  const [name, setName] = useState();
  const [nameValue, setNameValue] = useState();
  const [ageValue, setAgeValue] = useState();
  // const handleLogOut = () => {
  //   auth.signOut();
  // };
  const storeData = () => {
    if (nameValue) {
      AsyncStorage.setItem("name", nameValue);
      setName("");
      alert("Data Saved");
    } else {
      alert("Please fill data");
    }
  };

  const getData = () => {
    AsyncStorage.getItem("name").then((name) => {
      setName(name);
    });
  };
  const load = async () => {
    try {
      let name = await AsyncStorage.getItem("name");
      if (name !== null) {
        setName(name);
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const person = {
    name: nameValue,
    age: ageValue,
  };

  return (
    <Screen>
      <View style={styles.mainContainer}>
        <AppTextInput
          name="name"
          style={styles.input}
          onChangeText={(nameValue) => setNameValue(nameValue)}
        />
        <AppTextInput
          name="age"
          style={styles.input}
          onChangeText={(ageValue) => setAgeValue(ageValue)}
        />
        <View>
          <TouchableOpacity onPress={storeData}>
            <Text>Save Daily goal</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={getData}>
            <Text>Show Daily goal</Text>
          </TouchableOpacity>
          <Text>{name}</Text>
          <Text>
            {person.age}
            {person.name}
          </Text>
        </View>
        {/* <AppButton title="Log out" onPress={handleLogOut} /> */}
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    margin: 10,
    backgroundColor: colors.secondary,
    borderRadius: 10,
    padding: 10,
    marginTop: 150,
    color: colors.light,
  },
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
