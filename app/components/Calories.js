import React, { useState } from "react";
import AppTextInput from "./AppTextInput";
import Screen from "./Screen";
import { TextInput, StyleSheet, Text } from "react-native";
import colors from "../config/colors";
import AppPicker from "./AppPicker";
import AppButton from "./AppButton";

function Calories(props) {
  const [genderSelect, setGenderSelect] = useState();
  const [activitySelect, setActivitySelect] = useState();
  const [ageSelect, setAgeSelect] = useState();
  const [weightSelect, setWeightSelect] = useState();
  const [heightSelect, setHeightSelect] = useState();

  const gender = [
    {
      label: "Male",
      value: 1,
    },
    {
      label: "Female",
      value: 2,
    },
  ];
  const activity = [
    {
      label: "Sedentary (little or no exercise)",
      name: "Sedentary",
      value: 1,
    },
    {
      label: "Lightly active (light exercise/sports 1-3 days/week)",
      name: "Lightly active",
      value: 2,
    },
    {
      label: "Moderately active (moderate exercise/sports 3-5 days/week)",
      name: "Moderately active",
      value: 3,
    },
    {
      label: "Very active (hard exercise/sports 6-7 days a week)",
      name: "Very active",
      value: 4,
    },
    {
      label:
        "Extra active (very hard exercise/sports & physical job or 2x training)",
      name: "Extra active",
      value: 5,
    },
  ];
  return (
    <Screen>
      <AppTextInput
        name="weight"
        autoCapitalize="none"
        autoCorrect="none"
        keyboardType="numeric"
        placeholder="Weight"
        onChangeText={(item) => setWeightSelect(item)}
      />
      <AppTextInput
        name="height"
        autoCapitalize="none"
        autoCorrect="none"
        keyboardType="numeric"
        placeholder="Height"
        onChangeText={(item) => setHeightSelect(item)}
      />
      <AppTextInput
        name="age"
        autoCapitalize="none"
        autoCorrect="none"
        keyboardType="numeric"
        placeholder="Age"
        onChangeText={(item) => setAgeSelect(item)}
      />
      <AppPicker
        selectedItem={genderSelect}
        onSelectItem={(item) => setGenderSelect(item)}
        items={gender}
        placeholder={"Gender"}
      />
      <AppPicker
        selectedItem={activitySelect}
        onSelectItem={(item) => setActivitySelect(item)}
        items={activity}
        placeholder={"Activity"}
      />
      <AppButton
        title="Calculate"
        onPress={() => console.log(activitySelect.name)}
      />
      <Text></Text>
    </Screen>
  );
  function handleCalories([heightSelect, ageSelect]) {
    let age = parseInt(ageSelect);
    let weight = parseInt(weightSelect);
    let height = parseInt(heightSelect);
    let gender = parseInt(genderSelect);
    let activity = parseInt(activitySelect);
    return parseInt(heightSelect) + parseInt(ageSelect);
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    borderRadius: 5,
    flexDirection: "column",
    width: 300,
    padding: 15,
    marginVertical: 5,
    alignItems: "center",
    alignSelf: "center",
  },
  icon: {
    marginRight: 10,
  },
});
export default Calories;
