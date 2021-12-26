import React from "react";
import { StyleSheet, Image, Text } from "react-native";
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
              name="email"
              autoCapitalize="none"
              autoCorrect={false}
              icon="email"
              keyboardType="email-address"
              placeholder="Email"
              textContentType="emailAddress"
            />
            <AppFormField
              name="password"
              autoCapitalize="none"
              autoCorrect={false}
              icon="lock"
              placeholder="Password"
              secureTextEntry={true}
              textContentType="password"
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
