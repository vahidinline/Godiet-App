import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

export default function BmiCalculator() {
  const [sex, setSex] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [BMIString, setBMIString] = useState("");
  const calculateBMI = (weight, height) => {
    setWeight(weight);
    setHeight(height);
    let BMI = Math.round((weight / (height * height)) * 100) / 100;
    if (BMI <= 0 || weight === "" || height === "") setBMIString("");
    else classify(BMI, "Your BMI is " + BMI);
  };
  const classify = (BMI, prevStr) => {
    let s = "";
    if (BMI < 18.5) s = "You are underweight";
    else if (BMI < 25) s = "You are normal weight";
    else if (BMI < 30) s = "You are overweight";
    else if (BMI < 40) s = "You are obese";
    else if (BMI > 40) s = "You are morbidly obese";
    setBMIString(prevStr + "\n" + s);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{BMIString}</Text>
      <TextInput
        placeholder={"Sex"}
        style={styles.input}
        onChangeText={(value) => setSex(value)}
      />
      <TextInput
        placeholder={"Age"}
        style={styles.input}
        onChangeText={(value) => setAge(value)}
      />
      <TextInput
        placeholder={"Height (in meters)"}
        style={styles.input}
        onChangeText={(value) => calculateBMI(weight, value)}
      />
      <TextInput
        placeholder={"Weight (in kilograms)"}
        style={styles.input}
        onChangeText={(value) => calculateBMI(value, height)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1D2228",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 8,
    margin: 10,
    width: 200,
    color: "#FB8122",
  },
  text: {
    fontSize: 30,
    color: "#FB8122",
  },
});
