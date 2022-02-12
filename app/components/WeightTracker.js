import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  TextInput,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";
import { LineChart, BarChart } from "react-native-chart-kit";
import colors from "../config/colors";
import Screen from "./Screen";
import { getAuth } from "firebase/auth";
import * as Device from "expo-device";
import { firebase, firebaseConfig } from "../db/firebase";
import { Dimensions } from "react-native";
import { Button } from "react-native-paper";
import ListItemSeprator from "./ListItemSeprator";
import * as Localization from "expo-localization";
import i18n from "i18n-js";
i18n.defaultLocale = "en-US";
i18n.fallbacks = false;

// Set the key-value pairs for the different languages you want to support.
i18n.translations = {
  en: { weight: "Submit weight", get: " get weight" },
  fa: { weight: "ثبت وزن", get: "نمودار تغییرات" },
};

// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;
function WeightTracker({ navigation }) {
  firebase.initializeApp(firebaseConfig);
  const screenWidth = Dimensions.get("window").width;
  const [weightTracker, setWeighTracker] = useState([0]);
  const [weightSelect, setWeightSelect] = useState();
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
        let result = [];
        let date = [];
        let data = [];
        querySnapshot.forEach((doc) => {
          result.push(+doc.data().Weight);
          date.push(doc.data().date);
          //data.push({ weight: +doc.data().Weight, date: doc.data().date });
        });

        if (date.length) {
          setDateTracker(date);
        }

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
            <Text style={styles.text}>{i18n.t("get")}</Text>
          </Button>
        </View>

        <View>
          <Button
            disabled={!weightSelect}
            style={styles.button}
            onPress={weightTracking}
          >
            <Text style={styles.text}>{i18n.t("weight")}</Text>
          </Button>
        </View>

        <View style={styles.container}>
          <LineChart
            data={{
              labels: dateTracker,
              datasets: [
                {
                  data: weightTracker,
                },
              ],
            }}
            width={Dimensions.get("window").width} // from react-native
            height={500}
            yAxisLabel=" KG "
            chartConfig={{
              backgroundColor: "#e16a00",
              backgroundGradientFrom: "#eb8c00",
              backgroundGradientTo: "#fea726",
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 0,
              },
            }}
            verticalLabelRotation={90}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 1,
            }}
          />
        </View>
        <View style={styles.container}></View>
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
