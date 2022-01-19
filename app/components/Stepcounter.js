import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { Pedometer } from "expo-sensors";
import AppTextInput from "./AppTextInput";
import Screen from "./Screen";
import AppButton from "./AppButton";
import Icon from "react-native-vector-icons/FontAwesome";

import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
} from "victory-native";
import colors from "../config/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RadioButtonRN from "radio-buttons-react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import ListItemSeprator from "./ListItemSeprator";
export default function App({ navigation }) {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState("checking");
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const data = [{ quarter: 7, earnings: pastStepCount }];

  const [name, setName] = useState();
  const [nameValue, setNameValue] = useState();
  const end = new Date();
  const start = new Date();
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

  const AchieveGoal = () => {
    if (dailyGoal >= pastStepCount) return <Text>Goal Not Achieved yet</Text>;
    else return <Text>Goal Achieved</Text>;
  };

  const getData = () => {
    AsyncStorage.getItem("name").then((name) => {
      setName(name);
    });
  };
  const load = async () => {
    try {
      let name = await AsyncStorage.getItem("name");
      if (name !== null) {
        setName(name);
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const dailySteps = [
    {
      label: "5000",
      name: "5000",
      value: 5000,
    },
    {
      label: "10000",
      name: "10000",
      value: 10000,
    },
    {
      label: "12500",
      name: "12500",
      value: 12500,
    },
    {
      label: "15000",
      name: "15000",
      value: 15000,
    },
  ];

  return (
    <ScrollView>
      <Screen style={styles.container}>
        <View style={styles.mainContainer}>
          <View>
            <Text>Hello: {name}</Text>
          </View>
          <VictoryChart
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 },
            }}
            width={350}
            theme={VictoryTheme.material}
          >
            <VictoryAxis
              // tickValues specifies both the number of ticks and where
              // they are placed on the axis
              tickValues={[7]}
              tickFormat={["Today"]}
            />
            <VictoryAxis
              dependentAxis
              // tickFormat specifies how ticks should be displayed
              tickFormat={(x) => `${x}`}
            />
            <VictoryBar
              style={{ data: { fill: "#c43a31" } }}
              alignment="start"
              barWidth={20}
              barRatio={0.8}
              cornerRadius={10}
              data={data}
              x="quarter"
              y="earnings"
            />
          </VictoryChart>

          <View style={{ flex: 1, color: colors.light }}>
            {/* <Text>Daily Goal: {dailyGoal}</Text> */}
            <ListItemSeprator />
            <Text style={styles.text}>{pastStepCount} Step(s) </Text>
            <ListItemSeprator />
            {/* <AchieveGoal /> */}
            <ListItemSeprator />
            <Text style={styles.text}>
              Calories burned: ±{Math.round(pastStepCount * 0.063)}
            </Text>
            {/* <ListItemSeprator />
            <Text style={styles.text}>Select Your Daily Goal</Text>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1, margin: 4 }}> */}
            {/* <RadioButtonRN
                  boxStyle={styles.radio}
                  textStyle={{
                    color: colors.light,
                    fontSize: 15,
                    marginLeft: 25,
                  }}
                  data={dailySteps}
                  selectedBtn={(e) => setDailyGoal(e.value)}
                  icon={<Icon name="check-circle" size={25} color="#2c9dd1" />}
                  animationTypes={["pulse", "rotate"]}
                /> */}
            {/* <TextInput
                  style={styles.input}
                  value={dailyGoalValue}
                  onChangeText={setDailyGoalValue}
                />
              </View>
              <View>
                <TouchableOpacity onPress={storeData}>
                  <Text>Save Daily goal</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={getData}>
                  <Text>Show Daily goal</Text>
                </TouchableOpacity>
              </View>
            </View> */}
            {/* <AppText>Walk! And watch this go up: {currentStepCount}</AppText> */}
            {/* <AppTextInput
          placeholder="Set Daily Goal"
          onChangeText={(text) => setDailyGoal(text)}
        /> */}
          </View>
        </View>
      </Screen>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    margin: 10,
    backgroundColor: colors.secondary,
    borderRadius: 10,
    padding: 10,

    color: colors.light,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.light,
  },
  text: {
    fontSize: 30,
    fontWeight: "600",
    color: colors.light,
    textAlign: "center",
    margin: 20,
  },
  input: {
    backgroundColor: colors.light,
    flexDirection: "row",
    width: "100%",
    padding: 15,
    marginVertical: 10,
    borderColor: colors.light,
    margin: 3,
    borderWidth: 0.5,
    color: colors.light,
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",
  },
  radio: {
    backgroundColor: colors.secondary,

    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});
