import React, { useState } from "react";
import AppTextInput from "./AppTextInput";
import Screen from "./Screen";
import { TextInput, StyleSheet, Text } from "react-native";
import colors from "../config/colors";
import AppPicker from "./AppPicker";
import AppButton from "./AppButton";
import AppText from "./AppText";

function Calories() {
  const [genderSelect, setGenderSelect] = useState(1);
  const [activitySelect, setActivitySelect] = useState(1);
  const [ageSelect, setAgeSelect] = useState();
  const [weightSelect, setWeightSelect] = useState();
  const [heightSelect, setHeightSelect] = useState();

  const HandleCalories = () => {
    if (parseInt(genderSelect) === 1 && parseInt(activitySelect) === 1)
      return (
        <AppText>
          {1.2 *
            (66.5 +
              13.75 * parseFloat(weightSelect) +
              5.003 * parseFloat(heightSelect) -
              6.755 * parseFloat(ageSelect))}
        </AppText>
      );
    else if (genderSelect == 1 && activitySelect == 2)
      return (
        <AppText>
          {1.375 *
            (66.5 +
              13.75 * parseFloat(weightSelect) +
              5.003 * parseFloat(heightSelect) -
              6.755 * parseFloat(ageSelect))}
        </AppText>
      );
    else if (genderSelect === 1 && activitySelect === 3)
      return (
        <ApText>
          {1.55 *
            (66.5 +
              13.75 * parseFloat(weightSelect) +
              5.003 * parseFloat(heightSelect) -
              6.755 * parseFloat(ageSelect))}
        </ApText>
      );
    else if (genderSelect === 1 && activitySelect === 4)
      return (
        <AppText>
          {1.725 *
            (66.5 +
              13.75 * parseFloat(weightSelect) +
              5.003 * parseFloat(heightSelect) -
              6.755 * parseFloat(ageSelect))}
        </AppText>
      );
    else if (parseInt(genderSelect) === 1 && parseInt(activitySelect) === 5)
      return (
        <appText>
          {1.9 *
            (66.5 +
              13.75 * parseFloat(weightSelect) +
              5.003 * parseFloat(heightSelect) -
              6.755 * parseFloat(ageSelect))}
        </appText>
      );
    //female condition
    else if (parseInt(genderSelect) === 2 && parseInt(activitySelect) === 1)
      return (
        <appText>
          {1.2 *
            (655 +
              9.563 * parseFloat(weightSelect) +
              1.85 * parseFloat(heightSelect) -
              4.676 * parseFloat(ageSelect))}
        </appText>
      );
    else if (parseInt(genderSelect) === 2 && parseInt(activitySelect) === 2)
      return (
        <appText>
          {1.375 *
            (655 +
              9.563 * parseFloat(weightSelect) +
              1.85 * parseFloat(heightSelect) -
              4.676 * parseFloat(ageSelect))}
        </appText>
      );
    else if (parseInt(genderSelect) === 2 && parseInt(activitySelect) === 3)
      return (
        <appText>
          {1.55 *
            (655 +
              9.563 * parseFloat(weightSelect) +
              1.85 * parseFloat(heightSelect) -
              4.676 * parseFloat(ageSelect))}
        </appText>
      );
    else if (parseInt(genderSelect) === 2 && parseInt(activitySelect) === 4)
      return (
        <appText>
          {1.725 *
            (655 +
              9.563 * parseFloat(weightSelect) +
              1.85 * parseFloat(heightSelect) -
              4.676 * parseFloat(ageSelect))}
        </appText>
      );
    else if (parseInt(genderSelect) === 2 && parseInt(activitySelect) === 5)
      return (
        <appText>
          {1.9 *
            (655 +
              9.563 * parseFloat(weightSelect) +
              1.85 * parseFloat(heightSelect) -
              4.676 * parseFloat(ageSelect))}
        </appText>
      );
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
      <Text>{typeof genderSelect}</Text>
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
