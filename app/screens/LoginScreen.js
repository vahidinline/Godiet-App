import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import AppButton from "../components/AppButton";
import Screen from "../components/Screen";
import { Formik } from "formik";
import * as Yup from "yup";
import AppTextInput from "../components/AppTextInput";
import { auth } from "../firebase";
import { useEffect } from "react/cjs/react.development";

// const validationSchema = Yup.object().shape({
//   email: Yup.string().required().email().label("Email"),
//   password: Yup.string().required().min(6).label("Password"),
// });

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("Calories");
      }
    });
    return unsubscribe;
  }, []);

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log(user.email);
      })
      .catch((error) => alert(error.message));
  };
  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in ", user.email);
      })
      .catch((error) => alert("Please fill the form", error.message));
  };
  return (
    <>
      <Screen style={{ flex: 2 }}>
        <AppButton
          title="Welcome"
          onPress={() => navigation.navigate("Welcome")}
        />
      </Screen>
      <Screen style={styles.container}>
        {/* <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => console.log(values)}
        validationSchema={validationSchema}
      >
        {() => (
          <> */}
        <AppTextInput
          name="email"
          value={email}
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="email-address"
          placeholder="Email"
          textContentType="emailAddress"
          onChangeText={(text) => setEmail(text)}
        />
        <AppTextInput
          name="password"
          value={password}
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          placeholder="Password"
          secureTextEntry={true}
          textContentType="password"
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity onPress={handleSignUp}>
          <Text style={styles.txt}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogin}>
          <Text style={styles.txt}>LogIn</Text>
        </TouchableOpacity>
        {/* </>
        )}
      </Formik> */}
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  logo: {
    width: 300,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
  txt: {
    fontSize: 20,
    textAlign: "center",
    margin: 15,
  },
});
export default LoginScreen;
