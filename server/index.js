import express from "express";
import Stripe from "stripe";
const app = express();
const port = 3000;
const PUBLISH_KEY =
  "pk_live_51JSLBhAB6MVrXxqz2xIX8gMzOy42N5NXaVfe1JEXWOX2RNSWJQJtYG2BCDvduyHp9nmpGgXA3Mj1yjcjkdVs1DX700fmWJ7rzX";
const SECRET_KEY =
  "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";
//Confirm the API version from your stripe dashboard
const stripe = Stripe(SECRET_KEY, { apiVersion: "2020-08-27" });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.post("/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1099, //lowest denomination of particular currency
      currency: "usd",
      payment_method_types: ["card"], //by default
    });

    const clientSecret = paymentIntent.client_secret;

    res.json({
      clientSecret: clientSecret,
    });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
});
