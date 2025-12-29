import { useState } from 'react';
import { ethers } from 'ethers';
import './App.css';

function App() {
  const [walletAddress, setWalletAddress] = useState("");
  const [taskAmount, setTaskAmount] = useState("");
  // Değişken adını değiştirdik: status -> logs
  const [logs, setLogs] = useState("SİSTEM HAZIR. BEKLENİYOR...");

  // 1. Cüzdan Bağla
  async function connectWallet() {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        
        setWalletAddress(address);
        setLogs("✅ CÜZDAN BAĞLANDI: " + address.substring(0,6) + "...");
      } catch (error) {
        console.error(error);
        alert("Bağlantı Hatası!");
      }
    } else {
      alert("MetaMask Yükle!");
    }
  }

  // 2. İş Oluştur (ANINDA TEPKİ VERSİYONU)
  function handleCreateTask() {
    console.log("FONKSİYON TETİKLENDİ!"); // Konsolda bunu gör
    
    // Rastgele sayı üretiyoruz ki React mecbur güncellesin
    const randomKod = Math.floor(Math.random() * 9999);
    
    const yeniMesaj = `⚡ GÖREV OLUŞTURULDU! (Ref Kodu: #${randomKod})`;
    console.log("Ekrana yazılacak mesaj:", yeniMesaj);
    
    setLogs(yeniMesaj);
    
    // Ekstra Garanti: Ekrana uyarı fırlat
    alert("Kod Çalıştı! Şimdi ekrandaki sarı yazı değişmeli.");
  }

  // 3. İşi Teslim Et
  function handleCompleteTask() {
    const randomKod = Math.floor(Math.random() * 9999);
    setLogs(`✅ ÖDEME YAPILDI! (İşlem No: #${randomKod})`);
  }

  return (
    <div className="container">
      <h1 className="glitch-text">AGENTIC PAY PROTOCOL</h1>
      
      {!walletAddress ? (
        <button onClick={connectWallet}>
           [ CONNECT WALLET ]
        </button>
      ) : (
        <div className="dashboard">
          <div className="info-box">
            <p>DURUM LOGLARI:</p>
            {/* Log rengini kırmızı yaptık ki değişim belli olsun */}
            <h3 style={{color: "#ff0055", border: "1px dashed white", padding: "10px"}}>
              {logs}
            </h3>
          </div>

          <div className="control-panel">
            <div className="card">
              <h3>⚡ GÖREV OLUŞTUR</h3>
              <input 
                type="number" 
                placeholder="Miktar" 
                onChange={(e) => setTaskAmount(e.target.value)}
              />
              <button onClick={handleCreateTask}>PARAYI KİLİTLE (TEST)</button>
            </div>

            <div className="card">
              <h3>🤖 GÖREVİ TAMAMLA</h3>
              <button onClick={handleCompleteTask}>ÖDEMEYİ ÇEK</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;