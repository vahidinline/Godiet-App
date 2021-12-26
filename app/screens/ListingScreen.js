import React from "react";
import { FlatList, StyleSheet } from "react-native";
import Screen from "../components/Screen";
import Card from "../components/Card";
import colors from "../config/colors";
const listing = [
  {
    id: 1,
    title: "Varzesh 1",
    duration: "10 minutes",
    image: require("../assets/bg.png"),
  },
  {
    id: 2,
    title: "Varzesh 2",
    duration: "15 minutes",
    image: require("../assets/bg.png"),
  },
];
function ListingScreen(props) {
  return (
    <Screen style={styles.screen}>
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
    </Screen>
  );
}
const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
});
export default ListingScreen;
