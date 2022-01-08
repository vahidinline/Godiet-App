import React, { useState } from "react";
import Screen from "./Screen";
import AppTextInput from "./AppTextInput";
import { View, TouchableOpacity, Text } from "react-native";

function MealPlan({ navigation }) {
  const [mealPlan, setMealPlan] = useState(null);
  const [calories, setCalories] = useState(2000);

  function handleChange(e) {
    setCalories(e.target.value);
  }
  function GetMealData() {
    fetch(
      `https://api.spoonacular.com/mealplanner/generate?apiKey=4774d5b2cbf340e7acfb28f056e70714&timeFrame=day&targetCalories=2000`
    )
      .then((response) => response.json())
      .then((data) => {
        setMealPlan(data);
        alert("done");
      })
      .catch(() => {
        console.log("Errorr");
      });
  }
  return (
    <Screen>
      <AppTextInput onChange={() => handleChange}></AppTextInput>
      <View>
        <TouchableOpacity onPress={() => GetMealData}>
          <Text>Get Data</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

export default MealPlan;
