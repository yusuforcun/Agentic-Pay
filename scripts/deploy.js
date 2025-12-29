const hre = require("hardhat");

async function main() {
  console.log("🚀 Fırlatma İşlemi Başlatılıyor...");

  // 1. Cüzdanı Tanı
  const [deployer] = await hre.ethers.getSigners();
  console.log("👨‍✈️ Pilot (Deployer) Hesabı:", deployer.address);
  console.log(
    "💰 Hesap Bakiyesi:",
    (await hre.ethers.provider.getBalance(deployer.address)).toString()
  );

  // 2. Önce Sahte Parayı (MockMNEE) Yükle
  // NOT: Gerçek Testnet'te MNEE token adresi belliyse bu adımı atlayıp direkt adresi yazabiliriz.
  // Ama garanti olsun diye kendi tokenımızı basıyoruz.
  console.log("------------------------------------------------");
  console.log("Coin basılıyor...");
  const MockToken = await hre.ethers.getContractFactory("MockMNEE");
  const mockToken = await MockToken.deploy();
  await mockToken.waitForDeployment();
  const tokenAddress = mockToken.target;
  console.log("✅ MockMNEE Yüklendi! Adresi:", tokenAddress);

  // 3. Kasayı (Escrow) Yükle
  console.log("------------------------------------------------");
  console.log("Kasa (Escrow) kuruluyor...");
  const Escrow = await hre.ethers.getContractFactory("AgenticEscrow");
  
  // Parametreler: (Token Adresi, Validator Adresi)
  // Validator olarak şimdilik deploy eden kişinin (senin) adresini veriyoruz.
  const escrow = await Escrow.deploy(tokenAddress, deployer.address);
  await escrow.waitForDeployment();
  const escrowAddress = escrow.target;
  console.log("✅ AgenticEscrow Yüklendi! Adresi:", escrowAddress);

  console.log("------------------------------------------------");
  console.log("🎉 OPERASYON BAŞARILI!");
  console.log("Bu adresleri bir yere not et (Frontend'de lazım olacak):");
  console.log(`TOKEN_ADDRESS="${tokenAddress}"`);
  console.log(`ESCROW_ADDRESS="${escrowAddress}"`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});