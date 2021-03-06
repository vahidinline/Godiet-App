import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Button,
} from "react-native";
import Screen from "../components/Screen";
import Card from "../components/Card";
import colors from "../config/colors";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import VideoPage from "../components/VideoPage";

function ListingScreen({ navigation }) {
  const Stack = createStackNavigator();
  return (
    <>
      <NavigationContainer independent={true}>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name={"Video"}
            component={Video}
          />
          <Stack.Screen
            name={"videoPage"}
            component={VideoPage}
            options={({ route }) => ({ title: route.params.title })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const Video = ({ navigation }) => {
  const [videos, setVideos] = useState([]);
  console.log(videos);
  const [loading, setLoading] = useState([]);
  const getVideos = () => {
    fetch("https://vahidafshari.com/user.json")
      .then((response) => response.json())
      .then((json) => setVideos(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    setLoading(true);
    getVideos();
  }, []);

  const [id, setId] = useState();

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={videos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            console.log(item.image);
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("videoPage", {
                    title: item.title,
                    image: item.image,
                    duration: item.duration,
                    video: item.video,
                    description: item.description,
                    by: item.by,
                  })
                }
              >
                <Card
                  key={item}
                  title={item.title}
                  image={{ uri: item.image }}
                />
              </TouchableOpacity>
            );
          }}
        />
      </View>
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
