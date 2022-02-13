import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  Image,
} from "react-native";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import { Card } from "react-native-shadow-cards";

//ADD localhost address of your server
const API_URL = "http://localhost:3000";

const StripeApp = (props) => {
  const [email, setEmail] = useState();
  const [cardDetails, setCardDetails] = useState();
  const { confirmPayment, loading } = useConfirmPayment();

  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(`${API_URL}/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { clientSecret, error } = await response.json();
    return { clientSecret, error };
  };

  const handlePayPress = async () => {
    //1.Gather the customer's billing information (e.g., email)
    if (!cardDetails?.complete || !email) {
      Alert.alert("Please enter Complete card details and Email");
      return;
    }
    const billingDetails = {
      email: email,
    };
    //2.Fetch the intent client secret from the backend
    try {
      const { clientSecret, error } = await fetchPaymentIntentClientSecret();
      //2. confirm the payment
      if (error) {
        console.log("Unable to process payment");
      } else {
        const { paymentIntent, error } = await confirmPayment(clientSecret, {
          type: "Card",
          billingDetails: billingDetails,
        });
        if (error) {
          alert(`Payment Confirmation Error ${error.message}`);
        } else if (paymentIntent) {
          alert("Payment Successful");
          console.log("Payment successful ", paymentIntent);
        }
      }
    } catch (e) {
      console.log(e);
    }
    //3.Confirm the payment with the card details
  };

  return (
    <View style={styles.container}>
      <Image
        style={{
          width: 200,
          height: 100,
          alignItems: "center",
          justifyContent: "center",

          marginLeft: "auto",
          marginRight: "auto",
        }}
        source={require("../assets/godiet-logo.png")}
      />
      <Card
        style={{
          padding: 10,
          margin: 10,
          height: 100,
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Text style={styles.text}>Access to Godiet Premium</Text>
        <Text style={styles.text}>Find Nutrition coaches</Text>
        <Text style={styles.text}>Meal Plan generator</Text>
      </Card>
      <Card style={{ padding: 10, margin: 10 }}>
        <Text style={styles.text}>Yearly access only 554.99 €</Text>
      </Card>
      <Card style={{ padding: 10, margin: 10 }}>
        <TextInput
          autoCapitalize="none"
          placeholder="E-mail"
          keyboardType="email-address"
          onChange={(value) => setEmail(value.nativeEvent.text)}
          style={styles.input}
        />
      </Card>
      <Card style={{ padding: 10, margin: 10 }}>
        <CardField
          postalCodeEnabled={true}
          placeholder={{
            number: "4242 4242 4242 4242",
          }}
          cardStyle={styles.card}
          style={styles.cardContainer}
          onCardChange={(cardDetails) => {
            setCardDetails(cardDetails);
          }}
        />
      </Card>

      <Button onPress={handlePayPress} title="Pay 554.99€" disabled={loading} />
    </View>
  );
};
export default StripeApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 20,
  },
  input: {
    backgroundColor: "#efefefef",

    borderRadius: 8,
    fontSize: 20,
    height: 50,
    padding: 10,
  },
  card: {
    backgroundColor: "#efefefef",
  },
  cardContainer: {
    height: 50,
    marginVertical: 30,
  },
  text: {
    textAlign: "center",
    fontSize: 18,
  },
});
