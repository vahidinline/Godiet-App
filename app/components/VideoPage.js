import * as React from "react";
import { View, StyleSheet, Text, Image, Button } from "react-native";
import { Video, AVPlaybackStatus } from "expo-av";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import colors from "../config/colors";
import ListItemSeprator from "./ListItemSeprator";

export default function VideoPage({ route }) {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const Stack = createNativeStackNavigator();
  // <NavigationContainer>
  //   <Stack.Navigator>
  //     <Stack.Screen name="LoginScreen" component={LoginScreen} />
  //   </Stack.Navigator>
  // </NavigationContainer>;
  return (
    <>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>{route.params.title}</Text>
        </View>
        <View>
          <Text style={styles.duration}>{route.params.duration}</Text>
        </View>

        <Video
          ref={video}
          style={styles.video}
          shouldPlay={false}
          useNativeControls={true}
          rate={1.0}
          volume={1.0}
          source={{
            uri: route.params.video,
          }}
          useNativeControls
          resizeMode="contain"
          isLooping
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />

        <View style={styles.buttons}>
          <Button
            title={status.isPlaying ? "Pause" : "Play"}
            onPress={() =>
              status.isPlaying
                ? video.current.pauseAsync()
                : video.current.playAsync()
            }
          />
        </View>
        <ListItemSeprator />
        <View>
          <Text style={styles.description}>{route.params.description}</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  video: {
    alignSelf: "center",
    width: 400,
    height: 300,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 50,
    fontWeight: "600",
    color: colors.secondary,
  },
  duration: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
    color: colors.secondary,
  },
  description: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
    color: colors.secondary,
  },
});
