import React, { useState, useEffect } from "react";
import AppTextInput from "./AppTextInput";
import Screen from "./Screen";
import {
  View,
  StyleSheet,
  Text,
  Button,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import colors from "../config/colors";
import AppPicker from "./AppPicker";
import Icon from "react-native-vector-icons/FontAwesome";
import RadioButtonRN from "radio-buttons-react-native";
import { auth } from "../firebase";
import AppText from "./AppText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppButton from "./AppButton";

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

  const [genderSelect, setGenderSelect] = useState(1);
  const [activitySelect, setActivitySelect] = useState(1);
  const [ageSelect, setAgeSelect] = useState(39);
  const [weightSelect, setWeightSelect] = useState(79);
  const [heightSelect, setHeightSelect] = useState(183);
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
    if (!genderSelect || !activitySelect) return (result = 1);
    else if (genderSelect == 1 && activitySelect == 1) result = 1.2 * menCalc;
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
  const weekToFit = 8;
  const optimumLoseWeightPerWeekMele = 1;
  const optimumLoseWeightPerWeekFemale = 0.7;

  const CalcDeficit = () => {
    if (!faveWeight) return (CalcDeficitResult = "Cant be empty");
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
  return (
    <>
      <Screen style={{ flex: 2 }}>
        <ScrollView>
          <RadioButtonRN
            style={{ flexDirection: "column" }}
            data={gender}
            selectedBtn={(e) => setGenderSelect(e.value)}
            icon={<Icon name="check-circle" size={25} color="#2c9dd1" />}
            animationTypes={["pulse", "rotate"]}
          />
          <View style={{}}>
            <AppTextInput
              style={{
                flex: 0.5,
                width: "50%",
                flexDirection: "row",
              }}
              name="weight"
              autoCapitalize="none"
              placeholder="Weight"
              onChangeText={(item) => setWeightSelect(item)}
            />
            <AppTextInput
              style={{
                flex: 0.5,
                width: "50%",
              }}
              name="height"
              autoCapitalize="none"
              placeholder="Height"
              onChangeText={(item) => setHeightSelect(item)}
            />
          </View>

          <AppTextInput
            name="age"
            autoCapitalize="none"
            placeholder="Age"
            onChangeText={(item) => setAgeSelect(item)}
          />

          <AppPicker
            selectedItem={activity}
            onSelectItem={(item) => setActivitySelect(item.value)}
            items={activity}
            placeholder={"Activity"}
          />
          <AppTextInput
            name="favWeight"
            autoCapitalize="none"
            placeholder="وزن دلخواه"
            onChangeText={(item) => setFaveWeight(item)}
          />
          <Text style={{ color: "#fff" }}>
            {(HandleCalories(), CalcDeficit())}
          </Text>
          <Text style={styles.text}>{parseInt(result)}</Text>
          <Text>
            by Using {CalcDeficitResult} calories per day, after{" "}
            {Math.abs(weightSelect - faveWeight)} weeks, you can {goal}
            weight from {weightSelect} to {faveWeight}
          </Text>
        </ScrollView>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    borderRadius: 5,
    flexDirection: "row",
    width: 10,
    padding: 15,
    marginVertical: 5,
    alignItems: "center",
    alignSelf: "center",
  },
  icon: {
    marginRight: 10,
  },
  text: {
    color: colors.dark,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 18,
    flex: 1,
    textAlign: "center",
    fontWeight: "800",
  },
});
export default Calories;
