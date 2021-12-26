import React, { useState } from "react";
import {
  Picker,
  Button,
  StyleSheet,
  TextInput,
  Text,
  Switch,
  Modal,
  TouchableOpacity,
} from "react-native";
import Screen from "./app/components/Screen";
import Icon from "./app/components/Icon";
import ListItem from "./app/components/ListItem";
import ListingScreen from "./app/screens/ListingScreen";
import AppTextInput from "./app/components/AppTextInput";
import AppPicker from "./app/components/AppPicker";
import LoginScreen from "./app/screens/LoginScreen";

export default function App() {
  const [category, setCategory] = useState();
  return <LoginScreen />;
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 0.5,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
