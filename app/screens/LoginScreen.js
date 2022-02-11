import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import Screen from "../components/Screen";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import firebase from "firebase/compat/app";
import { firebaseConfig } from "../db/firebase";
import "firebase/compat/auth";
import {
  getAuth,
  onAuthStateChanged,
  FacebookAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import colors from "../config/colors";

export default function App({ navigation }) {
  const recaptchaVerifier = React.useRef(null);
  const [phoneNumber, setPhoneNumber] = React.useState();
  const [verificationId, setVerificationId] = React.useState();
  const [verificationCode, setVerificationCode] = React.useState();

  const [message, showMessage] = React.useState();
  const auth = getAuth();

  // // Listen for authentication state to change.
  // onAuthStateChanged(auth, (user) => {
  //   console.log(user);

  //   // Do other things
  // });

  const [shouldShow, setShouldShow] = useState(true);

  return (
    <Screen style={{ textAlign: "center" }}>
      <View style={{ padding: 20, marginTop: 50 }}>
        <View
          style={{
            //position: "absolute",
            alignItems: "center",
          }}
        >
          <Image
            style={{
              //position: "absolute",
              top: 0,
              width: 200,
              height: 50,
            }}
            source={{
              uri: "https://godiet.eu/_nuxt/img/143c88b.png",
            }}
          />
        </View>
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={firebaseConfig}
        />

        <View
          style={{
            alignContent: "center",
            textAlign: "center",
            justifyContent: "center",
            margin: 0,
            alignItems: "center",
          }}
        >
          <Text style={{ marginTop: 20 }}>
            enter your phone number with country code
          </Text>
          <TextInput
            style={{
              marginVertical: 10,
              fontSize: 17,
              borderColor: colors.light,
              borderWidth: 1,
              width: "60%",
              height: 40,
              borderRadius: 5,
            }}
            placeholder="+1 555-555"
            autoFocus
            autoCompleteType="tel"
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
            onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
          />
          <Button
            style={{
              color: colors.white,
              backgroundColor: colors.secondary,
              borderRadius: 5,
              fontSize: 20,
              fontWeight: "600",
              textAlign: "center",
              alignItems: "center",
              padding: 10,
            }}
            title="Confirm your phone number"
            disabled={!phoneNumber}
            onPress={async () => {
              // The FirebaseRecaptchaVerifierModal ref implements the
              // FirebaseAuthApplicationVerifier interface and can be
              // passed directly to `verifyPhoneNumber`.
              try {
                const phoneProvider = new firebase.auth.PhoneAuthProvider();
                const verificationId = await phoneProvider.verifyPhoneNumber(
                  phoneNumber,
                  recaptchaVerifier.current
                );
                setVerificationId(verificationId);
                showMessage({
                  text: "Verification code has been sent",
                });
              } catch (err) {
                showMessage({ text: `Error: ${err.message}`, color: "red" });
              }
            }}
            onPressOut={async () => setShouldShow(!shouldShow)}
          />
        </View>

        <View
          style={{
            alignContent: "center",
            textAlign: "center",
            justifyContent: "center",
            margin: 0,
            alignItems: "center",
          }}
        >
          <Text style={{ marginTop: 20 }}>enter your validation code </Text>
          <TextInput
            style={{
              marginVertical: 10,
              fontSize: 17,
              borderColor: colors.light,
              borderWidth: 1,
              width: "60%",
              height: 40,
              borderRadius: 5,
            }}
            editable={!!verificationId}
            placeholder="123456"
            keyboardType="phone-pad"
            onChangeText={setVerificationCode}
          />
          <Button
            title="Confirm"
            disabled={!verificationId}
            onPress={async () => {
              try {
                const credential = firebase.auth.PhoneAuthProvider.credential(
                  verificationId,
                  verificationCode
                );
                await firebase.auth().signInWithCredential(credential);
                showMessage({ text: "Your number has been confirmed 👍" });
              } catch (err) {
                showMessage({ text: `Error: ${err.message}`, color: "red" });
              }
            }}
          />
          <View>
            <TouchableOpacity
              style={styles.button}
              editable={!!verificationId}
              onPress={() => navigation.navigate("Payment")}
            >
              <Text style={styles.text}>Buy Plan</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.button}
              editable={!!verificationId}
              onPress={() => navigation.navigate("Welcome")}
            >
              <Text style={styles.text}>Back to home</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* <Button
          disabled={!verificationId}
          title="شروع"
          onPress={() => navigation.navigate("Profile")}
        /> */}
        {message ? (
          <TouchableOpacity
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: 0xffffffee, justifyContent: "center" },
            ]}
            onPress={() => showMessage(undefined)}
          >
            <Text
              style={{
                color: message.color || "blue",
                fontSize: 17,
                textAlign: "center",
                margin: 20,
              }}
            >
              {message.text}
            </Text>
          </TouchableOpacity>
        ) : undefined}
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  button: {
    borderColor: colors.light,
    borderWidth: 1,
    margin: 5,
    color: colors.white,
    height: 50,
    borderRadius: 5,
  },
  text: {
    color: colors.white,
    backgroundColor: colors.secondary,
    borderRadius: 5,
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    alignItems: "center",
    padding: 10,
  },
});
