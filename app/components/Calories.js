import React, { useState } from "react";
import AppTextInput from "./AppTextInput";
import Screen from "./Screen";
import { TextInput, StyleSheet, Text } from "react-native";
import colors from "../config/colors";
import AppPicker from "./AppPicker";
import AppButton from "./AppButton";

function Calories() {
  const [genderSelect, setGenderSelect] = useState(1);
  const [activitySelect, setActivitySelect] = useState(2);
  const [ageSelect, setAgeSelect] = useState(20);
  const [weightSelect, setWeightSelect] = useState(60);
  const [heightSelect, setHeightSelect] = useState(170);

  const HandleCalories = () => {
    if (genderSelect == 1 && activitySelect == 1)
      return (
        <Text>
          {1.2 *
            (66.5 +
              13.75 * parseFloat(weightSelect) +
              5.003 * parseFloat(heightSelect) -
              6.755 * parseFloat(ageSelect))}
        </Text>
      );
    else if (genderSelect === 1 && activitySelect === 2)
      return (
        <Text>
          {1.375 *
            (66.5 +
              13.75 * parseFloat(weightSelect) +
              5.003 * parseFloat(heightSelect) -
              6.755 * parseFloat(ageSelect))}
        </Text>
      );
    else if (ageSelect === 10 || activity === 3) return <Text>3</Text>;
  };
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
  const activity = [
    {
      label: "Sedentary (little or no exercise)",
      name: "عدم تحرک",
      value: 1,
    },
    {
      label: "Lightly active (light exercise/sports 1-3 days/week)",
      name: "فعالیت کم",
      value: 2,
    },
    {
      label: "Moderately active (moderate exercise/sports 3-5 days/week)",
      name: "نسبتا فعال",
      value: 3,
    },
    {
      label: "Very active (hard exercise/sports 6-7 days a week)",
      name: "فعال",
      value: 4,
    },
    {
      label:
        "Extra active (very hard exercise/sports & physical job or 2x training)",
      name: "خیلی فعال",
      value: 5,
    },
  ];
  return (
    <Screen>
      <AppTextInput
        name="weight"
        autoCapitalize="none"
        keyboardType="numeric"
        placeholder="Weight"
        onChangeText={(item) => setWeightSelect(item)}
      />
      <AppTextInput
        name="height"
        autoCapitalize="none"
        keyboardType="numeric"
        placeholder="Height"
        onChangeText={(item) => setHeightSelect(item)}
      />
      <AppTextInput
        name="age"
        autoCapitalize="none"
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
      <AppButton title="محاسبه کالری نقصان" onPress={() => HandleCalories()} />
      <HandleCalories />
    </Screen>
  );
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
