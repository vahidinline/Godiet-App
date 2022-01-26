import React, { useState, useEffect } from "react";
import Screen from "./Screen";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import colors from "../config/colors";
import AppPicker from "./AppPicker";
import * as Yup from "yup";
import ListItemSeprator from "./ListItemSeprator";

import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
  VictoryLine,
  VictoryPie,
} from "victory-native";

const validationSchema = Yup.object().shape({
  weight: Yup.number().required().positive().min(30).max(220),
  age: Yup.number().required().positive().min(10).max(90),
  height: Yup.number().required().positive().min(140).max(220),
  favWeight: Yup.number().required().positive().min(30).max(220),
});

function Calories({ navigation }) {
  const activity = [
    {
      label: "بدون تحرک یا کم تحرک",
      name: "عدم تحرک",
      value: 1,
    },
    {
      label: "یک تا سه روز ورزش در هفته",
      name: "فعالیت کم",
      value: 2,
    },
    {
      label: "سه تا پنح روز ورزش در هفته",
      name: "نسبتا فعال",
      value: 3,
    },
    {
      label: "شش تا هفت روز ورزش در هفته",
      name: "فعال",
      value: 4,
    },
    {
      label: "ورزشکار حرفه ای",
      name: "خیلی فعال",
      value: 5,
    },
  ];
  const gender = [
    {
      label: "مرد",
      name: "مرد",
      value: 1,
    },
    {
      label: "زن",
      name: "زن",
      value: 2,
    },
  ];
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
  let result = 0;
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
    <Screen>
      <ScrollView>
        <View style={styles.mainContainer}>
          <View style={styles.header}></View>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <View style={styles.row}>
              <TouchableOpacity onPress={() => setGenderSelect(2)}>
                <View>
                  <Image
                    style={styles.image}
                    source={require("../assets/female.png")}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <TouchableOpacity onPress={() => setGenderSelect(1)}>
                <View>
                  <Image
                    style={styles.image}
                    source={require("../assets/male.png")}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <ListItemSeprator />
          <View style={{ flexDirection: "row" }}>
            <View style={styles.row}>
              <Text style={styles.label}>وزن فعلی</Text>
              <TextInput
                style={styles.input}
                name=""
                autoCapitalize="none"
                keyboardType="phone-pad"
                returnKeyType="done"
                onChangeText={(item) => setWeightSelect(item)}
              />
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>وزن دلخواه</Text>
              <TextInput
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
              <Text style={styles.label}>قد</Text>
              <TextInput
                style={styles.input}
                name="height"
                autoCapitalize="none"
                keyboardType="phone-pad"
                returnKeyType="done"
                onChangeText={(item) => setHeightSelect(item)}
              />
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>سن</Text>
              <TextInput
                style={styles.input}
                name="age"
                autoCapitalize="none"
                keyboardType="phone-pad"
                returnKeyType="done"
                onChangeText={(item) => setAgeSelect(item)}
              />
            </View>
          </View>

          <Text style={styles.label}>میزان فعالیت</Text>
          <AppPicker
            selectedItem={activity}
            onSelectItem={(item) => setActivitySelect(item.value)}
            items={activity}
            placeholder={"Activity"}
          />
          <ListItemSeprator />

          {/* </>
        )}
      </Formik> */}

          <View>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.leftContainer}>
                <Text style={{ color: colors.white }}>
                  {(HandleCalories(), CalcDeficit())}
                </Text>
                {/* <TouchableOpacity onPress={HandleCalories}>
                  <Text>Run</Text>
                </TouchableOpacity> */}

                {result != 0 && (
                  <Text style={styles.text}>{parseInt(result)}</Text>
                )}
              </View>

              <View style={styles.rightContainer}>
                {result != 0 && (
                  <Text style={styles.text}>
                    by Using {CalcDeficitResult} calories per day, after
                    {weekToFit} weeks, you can {goal}
                    weight from {weightSelect} to {faveWeight}
                  </Text>
                )}
              </View>
            </View>
            <Text>{userData["userage"]}</Text>
            {/* {faveWeight != null && (
              <VictoryChart theme={VictoryTheme.material}>
                <VictoryLine
                  style={{
                    data: { stroke: "#c43a31" },
                    parent: { border: "1px solid #ccc" },
                  }}
                  data={[
                    { x: 1, y: weightSelect },
                    { x: weekToFit, y: faveWeight },
                  ]}
                />
              </VictoryChart>
            )} */}
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: { flex: 1 },
  mainContainer: {
    margin: 10,
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    color: colors.dark,
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
  image: {
    width: 170,
    height: 170,
  },
  rightContainer: {
    backgroundColor: colors.white,
    width: "100%",
    height: "100%",
    padding: 15,
    marginVertical: 5,
    alignItems: "center",
    alignSelf: "center",
    flex: 0.5,
    color: colors.dark,
  },
  tinyLogo: {
    width: 140,
    height: 140,
    marginRight: 10,
  },
  icon: {
    marginRight: 10,
  },
  headerText: {
    flexDirection: "row",
    flex: 1,
    textAlign: "center",
    fontSize: 30,
    fontWeight: "500",
    textShadowColor: colors.secondary,
    alignItems: "center",
    flexWrap: "wrap",
    shadowColor: colors.light,
    textShadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1,
  },
  text: {
    color: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 18,
    flex: 1,
    textAlign: "center",
    fontWeight: "800",
    shadowColor: colors.light,
    textShadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
  },
  label: {
    direction: "rtl",
    fontSize: 20,
    textAlign: "center",
    marginTop: 15,
    borderRightColor: colors.dark,
    borderRightWidth: 2,
    color: colors.secondary,
    fontWeight: "800",
    shadowColor: colors.light,
    textShadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
  },
  input: {
    backgroundColor: colors.secondary,
    flexDirection: "row",
    width: "100%",
    padding: 15,
    marginVertical: 10,
    borderColor: colors.light,
    margin: 3,
    borderWidth: 0.5,
    color: colors.light,
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",
    shadowColor: colors.light,
    textShadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
  },

  radio: {
    backgroundColor: colors.secondary,

    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.dark,
    textShadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
  },
});
export default Calories;
