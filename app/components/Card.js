import React from "react";
import { Image, StyleSheet, View, Text } from "react-native";
import colors from "../config/colors";

function Card({ title, subTitle, image, time, author }) {
  return (
    <View style={styles.card}>
      <Image style={styles.image} source={image} />
      <View style={styles.detailsContainer}>
        <Text>{title}</Text>
        <Text>{subTitle}</Text>
        <Text>{author}</Text>
        <Text>{time}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.white,
    margin: 20,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 100,
  },
  detailsContainer: {
    padding: 20,
  },
});
export default Card;
