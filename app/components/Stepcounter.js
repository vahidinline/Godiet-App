import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Pedometer } from "expo-sensors";

import AppText from "./AppText";

export default function App() {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState("checking");
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);

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
    const start = new Date(0, 0, 0, 0);
    start.setDate(end.getDate() - 1);
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
    _subscribe();
    return () => _unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Pedometer.isAvailableAsync(): {isPedometerAvailable}</Text>
      <AppText>Steps taken in the last 24 hours: {pastStepCount}</AppText>
      <AppText>Walk! And watch this go up: {currentStepCount}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
  },
});
