import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Picker,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "../config/colors";
import Screen from "./Screen";
import { firebase } from "../db/firebase";
import * as Device from "expo-device";
import PhoneInput from "react-native-phone-input";
import * as Application from "expo-application";

import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  FacebookAuthProvider,
  signInWithCredential,
} from "firebase/auth";

function ProfileInput({ navigation }) {
  let uuidAndroid = Application.androidId;
  if (uuidAndroid === null) {
    uuidAndroid = phoneNumber;
  }

  initializeApp({
    apiKey: "AIzaSyAm5d4V7-WJp1XKzPigBIzGkMtyrun0Wbc",
    authDomain: "godietapp-7b949.firebaseapp.com",
    projectId: "godietapp-7b949",
    storageBucket: "godietapp-7b949.appspot.com",
    messagingSenderId: "667014060367",
    appId: "1:667014060367:web:ad25cd71ba90d50776cd3a",
  });

  const auth = getAuth();

  // Listen for authentication state to change.
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log(user.uid);
    } else {
      console.log("signed out");
    }
    // Do other things
  });
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

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
      }
    } catch (error) {
      alert(error);
    }
  };

  const signUp = async () => {
    try {
      const db = await firebase.firestore();
      db.collection("users").doc(firebase.auth().currentUser.uid).set({
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
  const handelSave = () => {
    signUp();
    storeData();
  };
  const users = firebase
    .firestore()
    .collection("users")
    .doc(uuidAndroid)
    .get()
    .then((documentSnapshot) => {
      console.log("User exists: ", documentSnapshot.exists);

      if (documentSnapshot.exists) {
        console.log("User data: ", documentSnapshot.data());
      }
    });

  return (
    <>
      <Screen>
        <ScrollView>
          <View style={styles.mainContainer}>
            <PhoneInput
              placeholder="Phone number"
              style={styles.Input}
              ref={phoneRef}
              value={phoneNumber}
              onChangePhoneNumber={setPhoneNumber}
              returnKeyType="done"
            />
            <TextInput
              placeholder="نام"
              name="name"
              autoCorrect={false}
              returnKeyType="done"
              style={styles.Input}
              onChangeText={(nameValue) => setNameValue(nameValue)}
            />
            <TextInput
              placeholder="سن"
              name="age"
              autoCapitalize="none"
              keyboardType="phone-pad"
              returnKeyType="done"
              style={styles.Input}
              onChangeText={(ageValue) => setAgeValue(ageValue)}
            />
            <TextInput
              placeholder="وزن"
              name="Weight"
              keyboardType="phone-pad"
              returnKeyType="done"
              style={styles.Input}
              onChangeText={(weightSelect) => setWeightSelect(weightSelect)}
            />
            <TextInput
              placeholder="قد"
              name="Height"
              keyboardType="phone-pad"
              returnKeyType="done"
              style={styles.Input}
              onChangeText={(heightSelect) => setHeightSelect(heightSelect)}
            />
            <TextInput
              style={styles.Input}
              placeholder="دور کمر"
              name="Waist"
              returnKeyType="done"
              keyboardType="phone-pad"
              onChangeText={(waist) => setWaist(waist)}
            />
            <Picker
              selectedValue={genderSelect}
              onValueChange={(genderSelect) => setGenderSelect(genderSelect)}
            >
              <Picker.Item label="انتخاب جنسیت" value="" />

              <Picker.Item label="زن" value="female" />
              <Picker.Item label="مرد" value="male" />
            </Picker>
            <View>
              <TouchableOpacity
                style={styles.button}
                onPress={storeData}
                onPressOut={signUp}
              >
                <Text style={styles.text}>ذخیره اطلاعات</Text>
              </TouchableOpacity>
            </View>
            <View></View>
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
    color: colors.white,
    backgroundColor: colors.secondary,
    borderRadius: 5,
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
    backgroundColor: colors.white,

    borderWidth: 0.5,
    borderRadius: 5,
    padding: 16,
    fontSize: 20,
    marginBottom: 5,
  },
});
export default ProfileInput;
