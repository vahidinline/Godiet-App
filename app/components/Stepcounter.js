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

  const [dailyGoal, setDailyGoal] = useState(0);
  const AchieveGoal = (dailyGoal, pastStepCount) => {
    if (dailyGoal <= pastStepCount) {
      return false;
    } else {
      true;
    }
  };
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

      <View style={{ flex: 1 }}>
        <Text>Daily Goal: {dailyGoal}</Text>
        <Text style={styles.text}>{pastStepCount}</Text>
        <Text style={styles.text}>Step(s)</Text>
        <Text>{AchieveGoal()}</Text>

        {/* <AppText>Walk! And watch this go up: {currentStepCount}</AppText> */}
      </View>
      <View>
        <AppTextInput
          placeholder="Set Daily Goal"
          onChangeText={(text) => setDailyGoal(text)}
        />
        <Text></Text>
      </View>
      <View style={{ flex: 1 }}>
        <AppButton
          title="Home"
          onPress={() => navigation.navigate("Welcome")}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 30,
  },
});
