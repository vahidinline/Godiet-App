import React, { useState, useEffect } from "react";
import Screen from "./Screen";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  Picker,
  TouchableOpacity,
  Platform,
} from "react-native";
import colors from "../config/colors";
import ListItemSeprator from "./ListItemSeprator";

function Calories({ navigation }) {
  const userData = {
    userWeight: weightSelect,
    userHeight: heightSelect,
    userage: ageSelect,
  };

  const [name, setName] = useState();
  const [nameValue, setNameValue] = useState();
  const [genderSelect, setGenderSelect] = useState();
  const [activitySelect, setActivitySelect] = useState();
  const [ageSelect, setAgeSelect] = useState();
  const [weightSelect, setWeightSelect] = useState();
  const [heightSelect, setHeightSelect] = useState();
  const [faveWeight, setFaveWeight] = useState();
  let [result, setResult] = useState();
  console.log(result);
  const menCalc =
    66.5 +
    13.75 * parseFloat(weightSelect) +
    5.003 * parseFloat(heightSelect) -
    6.755 * parseFloat(ageSelect);
  const wemon =
    655 +
    9.563 * parseFloat(weightSelect) +
    1.85 * parseFloat(heightSelect) -
    4.676 * parseFloat(ageSelect);

  const HandleCalories = () => {
    if (genderSelect == 1 && activitySelect == 1) result = 1.2 * menCalc;
    else if (genderSelect == 1 && activitySelect == 2) result = 1.375 * menCalc;
    else if (genderSelect == 1 && activitySelect == 3) result = 1.55 * menCalc;
    else if (genderSelect == 1 && activitySelect == 4) result = 1.725 * menCalc;
    else if (genderSelect == 1 && activitySelect == 5) result = 1.9 * menCalc;
    //female condition
    else if (genderSelect == 2 && activitySelect == 1) result = 1.2 * wemon;
    else if (genderSelect == 2 && activitySelect == 2) result = 1.375 * wemon;
    else if (genderSelect == 2 && activitySelect == 3) result = 1.55 * wemon;
    else if (genderSelect == 2 && activitySelect == 4) result = 1.725 * wemon;
    else if (genderSelect == 2 && activitySelect == 5) result = 1.9 * wemon;
  };
  const Result = () => {
    HandleCalories();
  };
  let CalcDeficitResult = "";
  let goal = "";
  const weekToFit = Math.abs(weightSelect - faveWeight);
  const optimumLoseWeightPerWeekMele = 1;
  const optimumLoseWeightPerWeekFemale = 0.7;

  const CalcDeficit = () => {
    if (!faveWeight) return "";
    else if (faveWeight === weightSelect)
      return (CalcDeficitResult = "Cant Be the Same");
    else if (faveWeight < weightSelect) return LoseWeight();
    else if (faveWeight > weightSelect) return GainWeight();
  };
  const LoseWeight = () => {
    let diff = weightSelect - faveWeight;
    if (genderSelect == 1)
      return (CalcDeficitResult = parseInt(result) - 200), (goal = "lose ");
    else return (CalcDeficitResult = parseInt(result) - 150), (goal = "lose ");
  };
  const GainWeight = () => {
    if (genderSelect == 1)
      return (CalcDeficitResult = parseInt(result) + 200), (goal = "gain ");
    else return (CalcDeficitResult = parseInt(result) + 150), (goal = "gain ");
  };
  //console.log(result);
  return (
    <ScrollView>
      <Screen>
        <View style={styles.mainContainer}>
          <View>
            <Text style={styles.header}>محاسبه کالری تثبیت و کالری مازاد</Text>
          </View>
          <Picker
            selectedValue={genderSelect}
            onValueChange={(genderSelect) => setGenderSelect(genderSelect)}
          >
            <Picker.Item label="زن" value="2" />
            <Picker.Item label="مرد" value="1" />
          </Picker>
          <ListItemSeprator />
          <View style={{ flexDirection: "row" }}>
            <View style={styles.row}>
              <TextInput
                style={styles.input}
                placeholder="وزن فعلی"
                name=""
                autoCapitalize="none"
                keyboardType="phone-pad"
                returnKeyType="done"
                onChangeText={(item) => setWeightSelect(item)}
              />
            </View>
            <View style={styles.row}>
              <TextInput
                placeholder="وزن دلخواه"
                style={styles.input}
                name="favWeight"
                autoCapitalize="none"
                keyboardType="phone-pad"
                returnKeyType="done"
                onChangeText={(item) => setFaveWeight(item)}
              />
            </View>
          </View>

          <View style={{ flexDirection: "row" }}>
            <View style={styles.row}>
              <TextInput
                style={styles.input}
                name="height"
                placeholder="قد"
                autoCapitalize="none"
                keyboardType="phone-pad"
                returnKeyType="done"
                onChangeText={(item) => setHeightSelect(item)}
              />
            </View>
            <View style={styles.row}>
              <TextInput
                style={styles.input}
                name="age"
                placeholder="سن"
                autoCapitalize="none"
                keyboardType="phone-pad"
                returnKeyType="done"
                onChangeText={(item) => setAgeSelect(item)}
              />
            </View>
          </View>

          <Text style={styles.label}>میزان فعالیت</Text>

          <Picker
            selectedValue={activitySelect}
            onValueChange={(activitySelect) =>
              setActivitySelect(activitySelect)
            }
          >
            <Picker.Item label="بدون تحرک یا کم تحرک" value="1" />
            <Picker.Item label="یک تا سه روز ورزش در هفته" value="2" />
            <Picker.Item label="سه تا پنح روز ورزش در هفته" value="3" />
            <Picker.Item label="شش تا هفت روز ورزش در هفته" value="4" />
            <Picker.Item label="ورزشکار حرفه ای" value="5" />
          </Picker>

          <View>
            <View style={styles.leftContainer}>
              <Text style={{ color: colors.white }}>
                {(HandleCalories(), CalcDeficit())}
              </Text>
              {result != NaN && (
                <View>
                  {result > 0 && (
                    <Text style={styles.result}>
                      {parseInt(result)} کالری در روز
                    </Text>
                  )}
                </View>
              )}
            </View>

            <View style={styles.rightContainer}>
              {CalcDeficitResult > 0 && (
                <Text style={styles.text}>
                  با مصرف{CalcDeficitResult} کالری در روز, بعد از
                  {weekToFit} هفته, شما از وزن {weightSelect}
                  به {faveWeight} میرسید
                </Text>
              )}
            </View>

            <Text>{userData["userage"]}</Text>
          </View>
        </View>
      </Screen>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: { flex: 1 },
  mainContainer: {
    borderRadius: 10,
    color: colors.dark,
    backgroundColor: colors.white,
  },
  header: {
    fontSize: 25,
    fontWeight: "700",
    textAlign: "center",
    textAlignVertical: "center",
    marginBottom: Platform.OS === "android" ? 40 : 0,
    marginTop: Platform.OS === "android" ? 40 : 15,
  },
  leftContainer: {
    width: "100%",
    padding: 15,
    marginVertical: 5,
    alignItems: "center",
    alignSelf: "center",
    flex: 0.5,
    height: "100%",
    color: colors.dark,
  },
  rightContainer: {
    width: "100%",
    height: "100%",
    padding: 15,
    marginVertical: 5,
    alignItems: "center",
    alignSelf: "center",
    flex: 0.5,
    color: colors.dark,
  },
  text: {
    color: colors.dark,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 18,
    flex: 1,
    textAlign: "center",
    fontWeight: "800",
    // shadowColor: colors.light,
    // textShadowOffset: { width: 1, height: 1 },
    // shadowOpacity: 0.5,
  },
  label: {
    direction: "rtl",
    fontSize: 15,
    textAlign: "center",
    marginTop: 5,
    borderRightColor: colors.dark,
    borderRightWidth: 0.5,
    borderEndWidth: 0,
    color: colors.dark,
    fontWeight: "400",
    // shadowColor: colors.light,
    // textShadowOffset: { width: 1, height: 1 },
    // shadowOpacity: 0.5,
  },
  input: {
    flexDirection: "row",
    width: "100%",
    padding: 15,
    marginVertical: 10,
    borderColor: colors.light,
    margin: 3,
    borderWidth: 0.5,
    // borderEndWidth: 0,
    color: colors.dark,
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",

    // shadowColor: colors.medium,
    // textShadowOffset: { width: 0.5, height: 0.5 },
    // shadowOpacity: 1,
  },
  result: {
    textAlign: "center",
    fontSize: 30,
  },
});
export default Calories;
