import React from "react";
import { Text, ScrollView, View } from "react-native";
import ListingScreen from "../screens/ListingScreen";
const User = (props) => {
  return (
    <ScrollView>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>This is User Details and id is </Text>
      </View>
    </ScrollView>
  );
};
export default User;
