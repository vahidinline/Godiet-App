import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "../config/colors";
import Screen from "./Screen";
import { firebase } from "../db/firebase";
import * as Device from "expo-device";
import PhoneInput from "react-native-phone-input";

function ProfileInput({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState(false);
  const phoneRef = useRef(undefined);
  const [nameValue, setNameValue] = useState();
  const [ageValue, setAgeValue] = useState();
  const [genderSelect, setGenderSelect] = useState();
  const [weightSelect, setWeightSelect] = useState();
  const [heightSelect, setHeightSelect] = useState();
  const [waist, setWaist] = useState();
  const today = new Date().toJSON().slice(0, 10).replace(/-/g, "/");
  useEffect(() => {
    getData();
  }, []);
  const uid = nameValue + Device.osName + Device.osBuildId + ageValue;
  //alert(person.name);

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
        setHeightSelect(data.height);
        setWeightSelect(data.weight);
        setGenderSelect(data.gender);
        setWaist(data.waist);
        // const usersRef = firebase.firestore().collection("users");
        // usersRef
        //   .doc()
        //   .set(data)
        //   .then(() => {
        //     alert("sent");
        //   })
        //   .catch((error) => {
        //     setSpinner(false);
        //     alert("error");
        //   });
      }
    } catch (error) {
      alert(error);
    }
  };

  const signUp = async () => {
    try {
      const db = await firebase.firestore();
      db.collection("users").doc(phoneNumber).set({
        Name: nameValue,
        Weight: weightSelect,
        Gender: genderSelect,
        Age: ageValue,
        Height: heightSelect,
        Waist: waist,
        date: today,
        phone: phoneNumber,
      });
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

  return (
    <>
      <Screen>
        <ScrollView>
          <View style={styles.mainContainer}>
            <TextInput
              placeholder="Name"
              name="name"
              autoCorrect={false}
              returnKeyType="done"
              style={styles.Input}
              onChangeText={(nameValue) => setNameValue(nameValue)}
            />
            <TextInput
              placeholder="Age"
              name="age"
              autoCapitalize="none"
              keyboardType="phone-pad"
              returnKeyType="done"
              style={styles.Input}
              onChangeText={(ageValue) => setAgeValue(ageValue)}
            />
            <TextInput
              placeholder="Gender"
              name="gender"
              style={styles.Input}
              onChangeText={(genderSelect) => setGenderSelect(genderSelect)}
            />
            <TextInput
              placeholder="Weight"
              name="Weight"
              keyboardType="phone-pad"
              returnKeyType="done"
              style={styles.Input}
              onChangeText={(weightSelect) => setWeightSelect(weightSelect)}
            />
            <TextInput
              placeholder="Height"
              name="Height"
              keyboardType="phone-pad"
              returnKeyType="done"
              style={styles.Input}
              onChangeText={(heightSelect) => setHeightSelect(heightSelect)}
            />
            <TextInput
              style={styles.Input}
              placeholder="Waist"
              name="Waist"
              returnKeyType="done"
              keyboardType="phone-pad"
              onChangeText={(waist) => setWaist(waist)}
            />
            <PhoneInput
              style={styles.Input}
              ref={phoneRef}
              value={phoneNumber}
              onChangePhoneNumber={setPhoneNumber}
            />

            {/* <TextInput
              placeholder="Phone Number"
              name="number"
              autoCorrect={false}

              returnKeyType="done"
              style={styles.input}
              onChangeText={(nameValue) => setNameValue(nameValue)}
            /> */}
            <View>
              <TouchableOpacity style={styles.button} onPress={storeData}>
                <Text style={styles.text}>Save Data</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity style={styles.button} onPress={signUp}>
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
  Input: {
    borderColor: colors.light,
    borderWidth: 0.5,
    borderRadius: 2,
    padding: 16,
    fontSize: 20,
    marginBottom: 5,
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
    borderColor: colors.light,
  },
});
export default ProfileInput;
