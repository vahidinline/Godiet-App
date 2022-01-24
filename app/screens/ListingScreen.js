import React, { useState, useEffect } from "react";
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
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState([]);
  getVideos = () => {
    fetch("https://jsonkeeper.com/b/5609")
      .then((response) => response.json())
      .then((json) => setVideos(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    setLoading(true);
    getVideos();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("videoPage")}>
        <FlatList
          data={videos}
          keyExtractor={(id) => id.toString}
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
