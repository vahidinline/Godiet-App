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
  let diff = 0;
  const Deficit = (result, weightSelect) => {
    return (diff = weightSelect);
  };
  return (
    <Screen>
      <ScrollView>
        <AppText>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <MaterialCommunityIcons name="email" />
            <Text>Profile</Text>
          </TouchableOpacity>
        </AppText>
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
          selectedItem={activitySelect}
          onSelectItem={(item) => setActivitySelect(item.value)}
          items={activity}
          placeholder={"Activity"}
        />
        <Text style={styles.text}>{HandleCalories()}</Text>
        <Text style={styles.text}>{parseInt(result)}</Text>
        <Text>{diff}</Text>

        <TouchableOpacity onPress={() => navigation.navigate("Welcome")}>
          <Text>
            <MaterialCommunityIcons
              name="home"
              size={50}
              style={{
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            />
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </Screen>
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
    fontSize: 60,
    flex: 1,
    textAlign: "center",
    fontWeight: "800",
  },
});
export default Calories;
