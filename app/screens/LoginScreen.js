import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import AppButton from "../components/AppButton";
import Screen from "../components/Screen";
import { Formik } from "formik";
import * as Yup from "yup";
import AppFormField from "../components/AppFormField";
import SubmitButton from "../components/SubmitButton";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react/cjs/react.development";

// const validationSchema = Yup.object().shape({
//   email: Yup.string().required().email().label("Email"),
//   password: Yup.string().required().min(6).label("Password"),
// });

function LoginScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("HomeScreen");
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
      .catch((error) => alert("Logged in ", error.message));
  };
  return (
    <Screen style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/godiet-logo.png")}
      />
      {/* <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => console.log(values)}
        validationSchema={validationSchema}
      >
        {() => (
          <> */}
      <TextInput
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
      <TextInput
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
        <Text>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogin}>
        <Text>LogIn</Text>
      </TouchableOpacity>
      {/* </>
        )}
      </Formik> */}
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
