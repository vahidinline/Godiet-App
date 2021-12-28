import React, { useState } from "react";
import { StyleSheet, Image, Text, Switch } from "react-native";
import AppButton from "../components/AppButton";
import Screen from "../components/Screen";
import { Formik } from "formik";
import * as Yup from "yup";
import AppFormField from "../components/AppFormField";
import SubmitButton from "../components/SubmitButton";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
});

function LoginScreen(props) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  return (
    <Screen style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/godiet-logo.png")}
      />
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => console.log(values)}
        validationSchema={validationSchema}
      >
        {() => (
          <>
            <AppFormField
              name="name"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              placeholder="Your Name"
              textContentType="emailAddress"
            />
            <AppFormField
              name="age"
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="your Age"
              secureTextEntry={true}
              textContentType="numeric"
            />
            <AppFormField
              name="weight"
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="your Weight"
              secureTextEntry={true}
              textContentType="numeric"
            />
            <AppFormField
              name="height"
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="your Height"
              secureTextEntry={true}
              textContentType="numeric"
            />
            <Switch
              style={{ alignContent: "center", alignSelf: "center" }}
              accessibilityLabel="Sex"
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />

            <SubmitButton title="Login" />
          </>
        )}
      </Formik>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    width: 300,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
});
export default LoginScreen;
