import * as React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { Video, AVPlaybackStatus } from "expo-av";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

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
        <Text>{route.params.title}</Text>
        <Text>{route.params.duration}</Text>
        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: route.params.video,
          }}
          useNativeControls
          resizeMode="contain"
          isLooping
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />

        {/* <View style={styles.buttons}>
          <Button
            title={status.isPlaying ? "Pause" : "Play"}
            onPress={() =>
              status.isPlaying
                ? video.current.pauseAsync()
                : video.current.playAsync()
            }
          />
        </View> */}
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
});
