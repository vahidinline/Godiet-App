import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "../config/colors";
import AppButton from "./AppButton";
import AppText from "./AppText";
import AppTextInput from "./AppTextInput";
import { auth } from "../firebase";
import Screen from "./Screen";
import { ScrollView } from "react-native-gesture-handler";

function ProfileInput({ navigation }) {
  const [name, setName] = useState();
  const [nameValue, setNameValue] = useState();
  const [ageValue, setAgeValue] = useState();
  const [genderSelect, setGenderSelect] = useState();
  const [activitySelect, setActivitySelect] = useState();
  const [weightSelect, setWeightSelect] = useState();
  const [heightSelect, setHeightSelect] = useState();

  //Store Object to AsyncStorage
  const storeData = async () => {
    try {
      const newperson = JSON.stringify(person);
      await AsyncStorage.setItem("@Key", newperson);
      alert(newperson);
    } catch (e) {}
  };

  //Read Object from AsyncStorage
  const getData = async () => {
    try {
      let data = await AsyncStorage.getItem("@Key");
      if (data !== null) {
        data = JSON.parse(data);
        setNameValue(data.name);
        setAgeValue(data.age);
        setHeightSelect(data.height);
        setWeightSelect(data.weight);
        setGenderSelect(data.gender);
      }
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const person = {
    name: nameValue,
    age: ageValue,
    weight: weightSelect,
    gender: genderSelect,
    height: heightSelect,
  };

  return (
    <Screen>
      <ScrollView>
        <View style={styles.mainContainer}>
          <TextInput
            placeholder="Name"
            name="name"
            style={styles.input}
            onChangeText={(nameValue) => setNameValue(nameValue)}
          />
          <TextInput
            placeholder="Age"
            name="age"
            style={styles.input}
            onChangeText={(ageValue) => setAgeValue(ageValue)}
          />
          <TextInput
            placeholder="Gender"
            name="gender"
            style={styles.input}
            onChangeText={(genderSelect) => setGenderSelect(genderSelect)}
          />
          <TextInput
            placeholder="Weight"
            name="Weight"
            style={styles.input}
            onChangeText={(weightSelect) => setWeightSelect(weightSelect)}
          />
          <TextInput
            placeholder="Height"
            name="Height"
            style={styles.input}
            onChangeText={(heightSelect) => setHeightSelect(heightSelect)}
          />
          <View>
            <TouchableOpacity onPress={storeData}>
              <Text>Save</Text>
            </TouchableOpacity>

            <Text>Name: {nameValue}</Text>
            <Text> Age: {ageValue}</Text>
            <Text> Gender: {genderSelect}</Text>
            <Text> Weight: {weightSelect}</Text>
            <Text> Height: {heightSelect}</Text>
          </View>
          {/* <AppButton title="Log out" onPress={handleLogOut} /> */}
        </View>
      </ScrollView>
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
