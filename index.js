const express = require("express");
const app = express();

const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const { databaseURL } = require("./secrets");

const serviceAccount = require("./firebaseSecret.json");
const { getInfuraInstance } = require("./getInfuraInstance");
const { getUsersEmailToWallet } = require("./getUsersEmailToWallet");
const { givePointsToAddress } = require("./givePointsToAddress");

initializeApp({
  credential: cert(serviceAccount),
  databaseURL: databaseURL,
});

const db = getFirestore();

app.get("/kudos-reward", async (req, res) => {
  const { email, typeOfKudos } = req.query;
  console.log(email, typeOfKudos);

  const userEmailToSecretWalletMap = await getUsersEmailToWallet(db);

  if (userEmailToSecretWalletMap[email] === undefined) {
    throw Error("Email not registered yet to NFTeams app!");
  }

  const { wallet } = getInfuraInstance(userEmailToSecretWalletMap[email]);

  try {
    await givePointsToAddress(db, wallet.address, 20);
  } catch (err) {
    console.log(err);
  }

  res.sendStatus(200);
});

app.listen(process.env.PORT || 3000);
