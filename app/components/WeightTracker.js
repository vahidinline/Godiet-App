import React, { useState, useEffect } from "react";
import { ScrollView, View, TextInput, Text, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";
import colors from "../config/colors";
import Screen from "./Screen";
import { getAuth } from "firebase/auth";
import * as Device from "expo-device";
import { firebase, firebaseConfig } from "../db/firebase";
import { Dimensions } from "react-native";
import { Button } from "react-native-paper";
function WeightTracker({ navigation }) {
  firebase.initializeApp(firebaseConfig);
  const screenWidth = Dimensions.get("window").width;
  const [weightTracker, setWeighTracker] = useState([0]);
  const [weightSelect, setWeightSelect] = useState();
  if (weightTracker.length) {
    console.log("First Log", weightTracker);
  }
  const [dataTracker, setDataTracker] = useState([]);
  const [dateTracker, setDateTracker] = useState([]);

  const uuid = Device.osBuildFingerprint;
  var time = new Date();
  var dd = String(time.getDate()).padStart(2, "0");
  var mm = String(time.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = time.getFullYear();
  time = mm + "/" + dd + "/" + yyyy;
  const auth = getAuth();

  useEffect(() => {
    getweight();
  }, []);
  // //get weight tracker

  const getweight = () =>
    firebase
      .firestore()
      .collection("weights")
      .orderBy("time")
      .where("user", "==", uuid)

      .get()
      .then((querySnapshot) => {
        let result = [0];
        let date = [];
        let data = [];
        querySnapshot.forEach((doc) => {
          result.push(+doc.data().Weight);

          //date.push(doc.data().date);
          //data.push(+doc.data().Weight, doc.data().date);
        });

        setDateTracker(date);
        if (result.length) {
          setWeighTracker(result);
        }
      });

  //weight track -- save weight
  const weightTracking = async () => {
    try {
      let dateObj = new Date();
      let month = dateObj.getUTCMonth() + 1; //months from 1-12
      let day = dateObj.getUTCDate();
      let year = dateObj.getUTCFullYear();
      let newdate = year + "/" + month + "/" + day;
      const db = await firebase.firestore();
      const increment = firebase.firestore.FieldValue.serverTimestamp();
      db.collection("weights").doc().set({
        time: increment,
        user: uuid,
        Weight: weightSelect,
        date: newdate,
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
            placeholder="Weight"
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
            disabled={!weightTracker}
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
              datasets: [
                {
                  data: weightTracker,
                },
              ],
            }}
            width={Dimensions.get("window").width} // from react-native
            height={220}
            yAxisLabel=" KG "
            //withVerticalLabels={false}
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#fb8c00",
              backgroundGradientTo: "#ffa726",
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 1,
              },
            }}
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
