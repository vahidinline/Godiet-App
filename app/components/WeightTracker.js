import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  TouchableOpacity,
  TextInput,
  Text,
  StyleSheet,
} from "react-native";
import colors from "../config/colors";
import Screen from "./Screen";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  FacebookAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import * as Device from "expo-device";

import { firebase, firebaseConfig } from "../db/firebase";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { Button } from "react-native-paper";
function WeightTracker({ navigation }) {
  firebase.initializeApp(firebaseConfig);
  const screenWidth = Dimensions.get("window").width;
  const [weightTacker, setWeighTracker] = useState([]);
  const [dateTracker, setDateTracker] = useState([]);
  const [weightSelect, setWeightSelect] = useState();
  const uuid = Device.osBuildFingerprint;
  var time = new Date();
  var dd = String(time.getDate()).padStart(2, "0");
  var mm = String(time.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = time.getFullYear();
  time = mm + "/" + dd + "/" + yyyy;
  const auth = getAuth();

  useEffect(() => {
    console.log(uuid);
  }, []);
  //get weight tracker

  const getweight = () =>
    firebase
      .firestore()
      .collection("weights")
      .orderBy("user", "asc")
      //.where("user", "==", "1")

      .get()
      .then((querySnapshot) => {
        //console.log(querySnapshot.data());
        let result = [];
        let time = [];
        querySnapshot.forEach((doc) => {
          result.push(+doc.data().Weight);
          time.push(+doc.data().date);
        });
        //console.log(result);
        console.log(result);
        console.log(time);
        setWeighTracker(result);
        setDateTracker(time);
      });
  //.log(weightTacker);

  //weight track -- save weight
  const weightTracking = async () => {
    try {
      let i = 1;
      const db = await firebase.firestore();
      db.collection("weights").doc().set({
        user: "1",
        Weight: weightSelect,
        date: Date.now(),
      });
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

  return (
    <Screen>
      <ScrollView>
        <View>
          <TextInput
            placeholder="وزن"
            name="Weight"
            keyboardType="phone-pad"
            returnKeyType="done"
            style={styles.Input}
            onChangeText={(weightSelect) => setWeightSelect(weightSelect)}
          />
        </View>
        <View>
          <Button
            style={styles.button}
            onPress={getweight}
            disabled={!weightTacker}
          >
            <Text style={styles.text}>Get Weight on Chart</Text>
          </Button>
        </View>

        <View>
          <Button
            disabled={!weightSelect}
            style={styles.button}
            onPress={weightTracking}
          >
            <Text style={styles.text}>Save Weight</Text>
          </Button>
        </View>
        <View>
          <Button
            style={styles.button}
            onPress={() => navigation.navigate("Welcome")}
          >
            <Text style={styles.text}>Back to home</Text>
          </Button>
        </View>
        <View style={styles.container}>
          <LineChart
            data={{
              labels: dateTracker,
              datasets: [
                {
                  data: weightTacker,
                },
              ],
            }}
            width={Dimensions.get("window").width - 16} // from react-native
            height={220}
            chartConfig={{
              backgroundColor: "#1cc910",
              backgroundGradientFrom: "#eff3ff",
              backgroundGradientTo: "#efefef",
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 255) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            yAxisLabel={" Kg "}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>
      </ScrollView>
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff",
  },
  button: {
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

export default WeightTracker;
