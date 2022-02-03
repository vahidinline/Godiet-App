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
import ProfilePic from "./ProfilePic";
import * as Application from "expo-application";

function ProfileInput({ navigation }) {
  let uuidAndroid = Application.androidId;
  if (uuidAndroid === null) {
    uuidAndroid = phoneNumber;
  }
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
      }
    } catch (error) {
      alert(error);
    }
  };

  const signUp = async () => {
    try {
      const db = await firebase.firestore();
      db.collection("users").doc(uuidAndroid).set({
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
  const user = firebase
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
  // const db = firebase.firestore();
  // db.onSnapshot(
  //   (querySnapshot) => {
  //     const myUser = [];
  //     // loop through the saved users
  //     querySnapshot.forEach((doc) => {
  //       const user = doc.data();
  //       user.id = doc.id;
  //       myUser.push(user);
  //     });
  //     // set the todos to the state
  //     console.log(myUser);
  //   },
  //   (error) => {
  //     // log any error
  //     console.error(error);
  //   }
  // );

  // const getUserInfo = db.collection("users").doc();
  // const doc = getUserInfo.get();
  // if (!doc.exists) {
  //   console.log("No such document!");
  // } else {
  //   console.log("Document data:", doc.data());
  // }

  // async function getUserInfo() {
  //   try {
  //     let doc = await firebase.firestore();
  //     doc.collection("users").doc().get();

  //     if (!doc.exists) {
  //       alert("No user data found!");
  //     } else {
  //       let dataObj = doc.data();
  //       alert(doc.name);
  //     }
  //   } catch (err) {
  //     alert(err);
  //   }
  // }

  return (
    <>
      <Screen>
        <ScrollView>
          {/* <ProfilePic /> */}
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
            {/* <TextInput
              placeholder="Gender"
              name="gender"
              style={styles.Input}
              onChangeText={(genderSelect) => setGenderSelect(genderSelect)}
            /> */}
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
            <Picker
              selectedValue={genderSelect}
              onValueChange={(genderSelect) => setGenderSelect(genderSelect)}
            >
              <Picker.Item label="زن" value="female" />
              <Picker.Item label="مرد" value="male" />
            </Picker>
            <View>
              <TouchableOpacity
                style={styles.button}
                onPress={storeData}
                onPressOut={signUp}
              >
                <Text style={styles.text}>Save Data</Text>
              </TouchableOpacity>
            </View>
            {/* <View>
              <TouchableOpacity style={styles.button} onPress={signUp}>
                <Text style={styles.text}>Weight Data</Text>
              </TouchableOpacity>
            </View> */}
            <View>
              {/* <TouchableOpacity style={styles.button} onPress={}>
                <Text style={styles.text}>Get Data</Text>
              </TouchableOpacity> */}
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
