module.exports.getUsersEmailToWallet = async (db) => {
  const toBeReturned = {};
  const snapshot = await db.collection("users").get();
  snapshot.forEach((doc) => {
    const data = doc.data();
    toBeReturned[data.email] = data.privateKey;
  });
  return toBeReturned;
};
