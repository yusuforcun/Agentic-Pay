const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Agentic Pay System", function () {
  let escrow, mockToken;
  let owner, employer, aiAgent; // Roller

  before(async function () {
    // 1. Oyuncuları Sahneye Al
    [owner, employer, aiAgent] = await ethers.getSigners();
    console.log("---------------------------------------------------");
    console.log("🎭 SENARYO BAŞLIYOR");
    console.log("İşveren (Employer):", employer.address);
    console.log("Yapay Zeka (Worker):", aiAgent.address);

    // 2. Sahte Parayı (MockMNEE) Bas
    const MockToken = await ethers.getContractFactory("MockMNEE");
    mockToken = await MockToken.deploy();
    console.log("💰 Mock MNEE Token Basıldı:", mockToken.target);

    // 3. Kasayı (Escrow) Kur
    // aiAgent.address'i "Trusted Validator" (Güvenilir İmza Atıcı) olarak atıyoruz
    const Escrow = await ethers.getContractFactory("AgenticEscrow");
    escrow = await Escrow.deploy(mockToken.target, aiAgent.address); 
    console.log("🏦 Escrow Kontratı Kuruldu:", escrow.target);
    console.log("---------------------------------------------------");
  });

  it("Tam Tur Test: İş Verme -> Yapma -> Ödeme", async function () {
    const amount = ethers.parseEther("100"); // 100 Token

    // ADIM A: İşverene Para Ver ve Onayla
    await mockToken.mint(employer.address, amount); // İşverene para bas
    await mockToken.connect(employer).approve(escrow.target, amount); // Kasaya parayı çekmesi için izin ver
    console.log("✅ İşveren parayı onayladı.");

    // ADIM B: Görevi Oluştur
    await escrow.connect(employer).createTask(amount);
    console.log("✅ Görev #1 oluşturuldu ve para kilitlendi.");

    // KONTROL: Para gerçekten kasada mı?
    expect(await mockToken.balanceOf(escrow.target)).to.equal(amount);

    // ADIM C: Yapay Zeka İşi Yapsın ve İmzalasın (OFF-CHAIN KISIM)
    const taskId = 1;
    // Mesajı Hash'le (Solidity'deki mantığın aynısı)
    const messageHash = ethers.solidityPackedKeccak256(
        ["uint256", "uint256"], 
        [taskId, amount]
    );
    const messageBytes = ethers.getBytes(messageHash);
    
    // Yapay Zeka Cüzdanıyla İmzala
    const signature = await aiAgent.signMessage(messageBytes);
    console.log("🤖 Yapay Zeka işi bitirdi ve kriptografik imzayı attı.");
    console.log("📝 İmza:", signature.substring(0, 50) + "...");

    // ADIM D: Kanıtı Sun ve Ödemeyi Al (ON-CHAIN KISIM)
    // AI Agent (veya herhangi biri) completeTask fonksiyonunu çağırıp imzayı sunar
    await escrow.connect(aiAgent).completeTask(taskId, signature);
    console.log("✅ İmza doğrulandı ve ödeme serbest bırakıldı!");

    // FİNAL KONTROL: Para Yapay Zekanın cebine girdi mi?
    const agentBalance = await mockToken.balanceOf(aiAgent.address);
    expect(agentBalance).to.equal(amount);
    console.log("🎉 MUTLU SON: AI Agent bakiyesi:", ethers.formatEther(agentBalance), "MNEE");
  });
});