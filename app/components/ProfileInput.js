import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "../config/colors";
import Screen from "./Screen";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

function ProfileInput({ navigation }) {
  const [name, setName] = useState();
  const [nameValue, setNameValue] = useState();
  const [ageValue, setAgeValue] = useState();
  const [genderSelect, setGenderSelect] = useState();
  const [weightSelect, setWeightSelect] = useState();
  const [heightSelect, setHeightSelect] = useState();
  const [waist, setWaist] = useState();

  //Store Object to AsyncStorage
  const storeData = async () => {
    try {
      const newperson = JSON.stringify(person);
      await AsyncStorage.setItem("@Key", newperson);
      // alert(newperson);
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
        // alert("getData");
        setHeightSelect(data.height);
        setWeightSelect(data.weight);
        setGenderSelect(data.gender);
        setWaist(data.waist);
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
    waist: waist,
  };

  //Weight Tracking
  const getWeightData = async () => {
    try {
      let data = await AsyncStorage.getItem("@Key");
      if (data !== null) {
        data = JSON.parse(data);
        setNameValue(data.name);
        setAgeValue(data.age);
      }
    } catch (error) {
      alert(error);
    }
  };
  const TrackingWeight = async () => {
    try {
      const tw = JSON.stringify(weightTrackData);
      await AsyncStorage.setItem("@weight", tw);
      alert(tw);
    } catch (e) {}
  };
  let weightTrackData = [
    {
      weight: weightSelect,
      time: Date.now(),
    },
  ];
  return (
    <>
      <Screen>
        <ScrollView>
          <View style={styles.mainContainer}>
            <TextInput
              placeholder="Name"
              name="name"
              returnKeyType="done"
              style={styles.input}
              onChangeText={(nameValue) => setNameValue(nameValue)}
            />
            <TextInput
              placeholder="Age"
              name="age"
              autoCapitalize="none"
              keyboardType="phone-pad"
              returnKeyType="done"
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
              keyboardType="phone-pad"
              returnKeyType="done"
              style={styles.input}
              onChangeText={(weightSelect) => setWeightSelect(weightSelect)}
            />
            <TextInput
              placeholder="Height"
              name="Height"
              keyboardType="phone-pad"
              returnKeyType="done"
              style={styles.input}
              onChangeText={(heightSelect) => setHeightSelect(heightSelect)}
            />
            <TextInput
              placeholder="Waist"
              name="Waist"
              returnKeyType="done"
              keyboardType="phone-pad"
              style={styles.input}
              onChangeText={(waist) => setWaist(waist)}
            />
            <View>
              <TouchableOpacity style={styles.button} onPress={storeData}>
                <Text style={styles.text}>Save Data</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity style={styles.button} onPress={TrackingWeight}>
                <Text style={styles.text}>Weight Data</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Screen>
    </>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    margin: 10,
    borderRadius: 10,
    padding: 10,
    marginTop: 150,
    color: colors.light,
  },
  input: {
    borderWidth: 0.2,
    margin: 2,
    height: 40,
    width: "100%",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    fontSize: 15,
    borderColor: colors.light,
  },
  text: {
    color: colors.dark,
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    alignItems: "center",
    padding: 10,
  },
  button: {
    borderColor: colors.light,
    borderWidth: 1,
    margin: 5,
    color: colors.white,
    height: 50,
    borderRadius: 5,
  },
});
export default ProfileInput;
