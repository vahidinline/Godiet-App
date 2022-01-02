import React, { useState } from "react";
import AppTextInput from "./AppTextInput";
import Screen from "./Screen";
import { TextInput, StyleSheet, Text } from "react-native";
import colors from "../config/colors";
import AppPicker from "./AppPicker";

import Icon from "react-native-vector-icons/FontAwesome";
import RadioButtonRN from "radio-buttons-react-native";

function Calories() {
  const [genderSelect, setGenderSelect] = useState(1);
  const [activitySelect, setActivitySelect] = useState(1);
  const [ageSelect, setAgeSelect] = useState(39);
  const [weightSelect, setWeightSelect] = useState(79);
  const [heightSelect, setHeightSelect] = useState(183);
  const HandleCalories = () => {
    if (!genderSelect || !activitySelect) return <Text>rwwewe </Text>;
    else if (parseInt(genderSelect) === 1 && parseInt(activitySelect) === 1)
      return (
        <Text style={styles.text}>
          {parseInt(
            1.2 *
              (66.5 +
                13.75 * parseFloat(weightSelect) +
                5.003 * parseFloat(heightSelect) -
                6.755 * parseFloat(ageSelect))
          )}
        </Text>
      );
    else if (genderSelect == 1 && activitySelect == 2)
      return (
        <Text style={styles.text}>
          {parseInt(
            1.375 *
              (66.5 +
                13.75 * parseFloat(weightSelect) +
                5.003 * parseFloat(heightSelect) -
                6.755 * parseFloat(ageSelect))
          )}
        </Text>
      );
    else if (genderSelect === 1 && activitySelect === 3)
      return (
        <Text style={styles.text}>
          {parseInt(
            1.55 *
              (
                66.5 +
                13.75 * parseFloat(weightSelect) +
                5.003 * parseFloat(heightSelect) -
                6.755 * parseFloat(ageSelect)
              ).toFixed(2)
          )}
        </Text>
      );
    else if (genderSelect === 1 && activitySelect === 4)
      return (
        <Text style={styles.text}>
          {parseInt(
            1.725 *
              (
                66.5 +
                13.75 * parseFloat(weightSelect) +
                5.003 * parseFloat(heightSelect) -
                6.755 * parseFloat(ageSelect)
              ).toFixed()
          )}
        </Text>
      );
    else if (parseInt(genderSelect) === 1 && parseInt(activitySelect) === 5)
      return (
        <Text style={styles.text}>
          {parseInt(
            1.9 *
              (66.5 +
                13.75 * parseFloat(weightSelect) +
                5.003 * parseFloat(heightSelect) -
                6.755 * parseFloat(ageSelect))
          )}
        </Text>
      );
    //female condition
    else if (parseInt(genderSelect) === 2 && parseInt(activitySelect) === 1)
      return (
        <Text style={styles.text}>
          {parseInt(
            1.2 *
              (655 +
                9.563 * parseFloat(weightSelect) +
                1.85 * parseFloat(heightSelect) -
                4.676 * parseFloat(ageSelect))
          )}
        </Text>
      );
    else if (parseInt(genderSelect) === 2 && parseInt(activitySelect) === 2)
      return (
        <Text style={styles.text}>
          {parseInt(
            1.375 *
              (655 +
                9.563 * parseFloat(weightSelect) +
                1.85 * parseFloat(heightSelect) -
                4.676 * parseFloat(ageSelect))
          )}
        </Text>
      );
    else if (parseInt(genderSelect) === 2 && parseInt(activitySelect) === 3)
      return (
        <Text style={styles.text}>
          {parseInt(
            1.55 *
              (655 +
                9.563 * parseFloat(weightSelect) +
                1.85 * parseFloat(heightSelect) -
                4.676 * parseFloat(ageSelect))
          )}
        </Text>
      );
    else if (parseInt(genderSelect) === 2 && parseInt(activitySelect) === 4)
      return (
        <Text style={styles.text}>
          {parseInt(
            1.725 *
              (655 +
                9.563 * parseFloat(weightSelect) +
                1.85 * parseFloat(heightSelect) -
                4.676 * parseFloat(ageSelect))
          )}
        </Text>
      );
    else if (parseInt(genderSelect) === 2 && parseInt(activitySelect) === 5)
      return (
        <Text style={styles.text}>
          {parseInt(
            1.9 *
              (655 +
                9.563 * parseFloat(weightSelect) +
                1.85 * parseFloat(heightSelect) -
                4.676 * parseFloat(ageSelect))
          )}
        </Text>
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
  return (
    <Screen>
      <RadioButtonRN
        data={gender}
        selectedBtn={(e) => setGenderSelect(e.value)}
        icon={<Icon name="check-circle" size={25} color="#2c9dd1" />}
        animationTypes={["pulse", "rotate"]}
      />
      <AppTextInput
        style={{
          flex: 0.5,
        }}
        name="weight"
        autoCapitalize="none"
        placeholder="Weight"
        onChangeText={(item) => setWeightSelect(item)}
      />
      <AppTextInput
        style={{
          flex: 0.5,
        }}
        name="height"
        autoCapitalize="none"
        placeholder="Height"
        onChangeText={(item) => setHeightSelect(item)}
      />
      <AppTextInput
        name="age"
        autoCapitalize="none"
        placeholder="Age"
        onChangeText={(item) => setAgeSelect(item)}
      />

      {/* <RadioButtonRN
        data={activity}
        selectedBtn={(e) => setActivitySelect(e.value)}
        icon={<Icon name="check-circle" size={25} color="#2c9dd1" />}
        animationTypes={["pulse", "rotate"]}
        box={true}
      /> */}

      {/* <AppPicker
        selectedItem={genderSelect}
        onSelectItem={(item) => setGenderSelect(item.value)}
        items={gender}
        placeholder={"Gender"}
      /> */}
      <AppPicker
        selectedItem={activitySelect}
        onSelectItem={(item) => setActivitySelect(item.value)}
        items={activity}
        placeholder={"Activity"}
      />
      <HandleCalories style={styles.text} />
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    borderRadius: 5,
    flexDirection: "column",
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
    fontSize: 30,
    flex: 1,
    textAlign: "center",
    fontWeight: "800",
  },
});
export default Calories;
