import React from "react";
import { Image, View, StyleSheet, Text } from "react-native";
import AppText from "../components/AppText";
import ListItem from "../components/ListItem";

function ListingDetailsScreen(props) {
  return (
    <View>
      <Image style={styles.image} source={require("../assets/bg.png")} />
      <View style={styles.detailscontainer}>
        <Text style={styles.title}>Varzesh</Text>
        <Text style={styles.subTitle}>100</Text>
        <View style={styles.userContainer}>
          <ListItem
            image={require("../assets/bg.png")}
            title="Vahid"
            subTitle="Afshari"
          />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
  detailscontainer: {
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "500",
    marginVertical: 10,
  },
  subTitle: {
    fontSize: 15,
    fontWeight: "500",
  },
  userContainer: {
    marginVertical: 40,
  },
});
export default ListingDetailsScreen;
