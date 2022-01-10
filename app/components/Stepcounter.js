import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { Pedometer } from "expo-sensors";
import AppTextInput from "./AppTextInput";
import Screen from "./Screen";
import AppButton from "./AppButton";
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
} from "victory-native";
import colors from "../config/colors";

export default function App({ navigation }) {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState("checking");
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const data = [{ quarter: 1, earnings: pastStepCount }];

  let _subscription;

  const _subscribe = () => {
    _subscription = Pedometer.watchStepCount((result) => {
      setCurrentStepCount(result.steps);
    });

    Pedometer.isAvailableAsync().then(
      (result) => {
        setIsPedometerAvailable(result);
      },
      (error) => {
        setIsPedometerAvailable("Could not get isPedometerAvailable: " + error);
      }
    );

    const end = new Date();
    const start = new Date();

    start.setHours(0, 0, 0, 0);
    Pedometer.getStepCountAsync(start, end).then(
      (result) => {
        setPastStepCount(result.steps);
      },
      (error) => {
        setPastStepCount("Could not get stepCount: " + error);
      }
    );
  };

  const _unsubscribe = () => {
    _subscription && _subscription.remove();
    _subscription = null;
  };
  useEffect(() => {
    const interval = setInterval(() => {}, 1000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  const [dailyGoal, setDailyGoal] = useState(10000);
  // const AchieveGoal = () => {
  //   if (dailyGoal <= pastStepCount) return <Text>Goal Not Achieved yet</Text>;
  //   else <Text>Goal Achieved</Text>;
  // };
  return (
    <Screen style={styles.container}>
      <VictoryChart width={350} theme={VictoryTheme.material}>
        <VictoryAxis
          // tickValues specifies both the number of ticks and where
          // they are placed on the axis
          tickValues={[1]}
          tickFormat={["Today"]}
        />
        <VictoryAxis
          dependentAxis
          // tickFormat specifies how ticks should be displayed
        />
        <VictoryBar data={data} x="quarter" y="earnings" />
      </VictoryChart>

      <View style={{ flex: 1, color: colors.light }}>
        <Text>Daily Goal: {dailyGoal}</Text>
        <Text style={styles.text}>{pastStepCount} Step(s) </Text>
        {/* <AchieveGoal /> */}

        {/* <AppText>Walk! And watch this go up: {currentStepCount}</AppText> */}
        {/* <AppTextInput
          placeholder="Set Daily Goal"
          onChangeText={(text) => setDailyGoal(text)}
        /> */}
        <Text></Text>
      </View>
      <View style={{ flex: 0.2 }}></View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.dark,
  },
  text: {
    fontSize: 30,
    fontWeight: "600",
    color: colors.light,
  },
});
