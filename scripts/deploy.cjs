const hre = require("hardhat");

async function main() {
  // // 1️⃣ Récupérer le contrat
  const MyNFT = await hre.ethers.getContractFactory("MyNFT");

  // 2️⃣ Déployer
  const myNFT = await MyNFT.deploy(); // pas besoin de “to”, ethers gère ça

  console.log("the contract: ", myNFT)
  // await myNFT.deployed();


  // // 3️⃣ Afficher l’adresse du contrat
  console.log("✅ Contract deployed at:", myNFT.address);
  console.log("hello")
}

// Catch d’erreurs
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
