const ethers = require("ethers");
const { infuraPrivateKey } = require("./secrets");

module.exports.getInfuraInstance = (privateKey) => {
  const { Wallet, providers } = ethers;

  const network = "matic";
  const infuraProvider = new providers.InfuraProvider(
    network,
    infuraPrivateKey
  );
  const wallet = new Wallet(privateKey, infuraProvider);
  return { wallet, infuraProvider };
};
