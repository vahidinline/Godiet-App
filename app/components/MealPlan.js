import React from "react";
import { SafeAreaView, View, FlatList, StyleSheet, Text } from "react-native";

const Videos = [
  {
    Videourl: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
  },
  {
    Videourl: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
  },
  {
    Videourl: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
  },
];

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={Videos}
        renderItem={({ item }) => (
          <Video
            source={item.Videourl}
            ref={(ref) => {
              this.player = ref;
            }}
            onBuffer={this.onBuffer}
            onError={this.videoError}
            style={styles.backgroundVideo}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
