import React from "react";
import {
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import Screen from "../components/Screen";
import Card from "../components/Card";
import colors from "../config/colors";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import VideoPage from "../components/VideoPage";
import WelcomeScreen from "./WelcomeScreen";
const Stack = createStackNavigator();
const listing = [
  {
    id: 1,
    title: "Warm Up excersice",
    duration: "10 minutes",
    image: require("../assets/warmup.jpeg"),
  },
  {
    id: 2,
    title: "Cool Down",
    duration: "5 minutes",
    image: require("../assets/cooldown.jpeg"),
  },
];
function ListingScreen(props) {
  return (
    <>
      <NavigationContainer independent={true}>
        <Stack.Navigator>
          <Stack.Screen name={"Video"} component={Video} />
          <Stack.Screen name={"videoPage"} component={VideoPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const Video = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("videoPage")}>
        <FlatList
          data={listing}
          keyExtractor={(listing) => listing.id.toString}
          renderItem={({ item }) => (
            <Card
              title={item.title}
              subTitle={item.duration}
              image={item.image}
            />
          )}
        />
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={() => navigation.navigate("welcome")}>
        <Card style={styles.list}>
          <Text>Privacy Policy</Text>
        </Card>
      </TouchableOpacity> */}
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
});
export default ListingScreen;
