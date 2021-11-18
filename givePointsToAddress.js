const { ethers } = require("ethers");
const { getInfuraInstance } = require("./getInfuraInstance");
const { sourceWallet } = require("./secrets");

module.exports.givePointsToAddress = async (db, to, amount) => {
  const smartContractData = db.collection("smart-contracts").doc("MarketCoins");
  const doc = await smartContractData.get();
  const { abi, address: smartContractAddress } = doc.data();
  const fromWallet = getInfuraInstance(sourceWallet).wallet;

  const formatValueToUint256 = ethers.utils.parseUnits(`${amount}`, 18);

  return new ethers.Contract(
    smartContractAddress,
    abi,
    fromWallet
  ).sendCointsToAdress(to, formatValueToUint256);
};
