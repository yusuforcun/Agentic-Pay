import { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ethers } from 'ethers';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY; 
const genAI = new GoogleGenerativeAI(API_KEY);

const MatrixRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const alphabet = katakana + latin;
    const fontSize = 16;
    const columns = Math.floor(window.innerWidth / fontSize);
    const rainDrops = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#0F0';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillStyle = Math.random() > 0.95 ? '#FFF' : '#0aff0a'; 
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);
        
        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    };
    const interval = setInterval(draw, 30);
    return () => {
        clearInterval(interval);
        window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10" />;
};

function App() {
  const [account, setAccount] = useState(null);
  const [description, setDescription] = useState("Agentic Pay Integration - Autonomous Payment Module");
  const [githubLink, setGithubLink] = useState("https://github.com/redpill/agentic-pay");
  const [securityStep, setSecurityStep] = useState("IDLE"); 
  const [logs, setLogs] = useState([
    { time: "10:00:01", source: "SYSTEM", msg: "Arbitrum One node connected." },
    { time: "10:00:02", source: "AGENT-1", msg: "Tesla Model 3 charging request received." },
  ]);

  const agents = [
    { id: "A-01", name: "Tesla Fleet Bot", status: "Active" },
    { id: "A-02", name: "DeFi Arbitrage Agent", status: "Idle" },
    { id: "A-03", name: "Supply Chain Tracker", status: "Auditing" },
  ];

  const addLog = (source, msg) => {
    const time = new Date().toLocaleTimeString('en-US', { hour12: false });
    setLogs(prev => [{ time, source, msg }, ...prev.slice(0, 8)]);
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        setAccount(await signer.getAddress());
        addLog("WALLET", "User wallet connected.");
      } catch (err) { console.error(err); }
    } else { alert("Please install MetaMask!"); }
  };

  const handleAIValidation = async () => {
    setSecurityStep("AI_CHECK");
    addLog("SYSTEM", "Initiating Triple-Lock Protocol...");
    setTimeout(() => {
        addLog("GEMINI", "Audit Score: 98/100. Approved.");
        startTripleLockSequence();
    }, 2000);
  };

  const startTripleLockSequence = async () => {
    await new Promise(r => setTimeout(r, 1500)); 
    setSecurityStep("FACE_ID"); 
    addLog("BIO-AUTH", "FaceID Verified.");
    await new Promise(r => setTimeout(r, 1500));
    setSecurityStep("NOTIFICATION"); 
    addLog("DEVICE", "2FA Approved.");
    await new Promise(r => setTimeout(r, 1500));
    setSecurityStep("PIN"); 
    addLog("SECURE", "Vault Unlocked.");
    await new Promise(r => setTimeout(r, 1500));
    setSecurityStep("SUCCESS"); 
    addLog("CHAIN", "Funds Released on Arbitrum.");
  };

  return (
    <div className="min-h-screen bg-transparent text-white font-sans flex flex-col overflow-hidden relative">
      
      <MatrixRain />
      
      {/* İÇERİK (Arka planı siyah değil, şeffaf-siyah yaptık ki arkası görünsün) */}
      <div className="relative z-10 flex flex-col h-screen w-full bg-black/80">
      
          <nav className="flex justify-between items-center px-6 py-4 border-b border-white/5 bg-black/40 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
              <h1 className="text-xl font-bold">AGENTIC<span className="text-red-600">PAY</span></h1>
            </div>
            <button onClick={connectWallet} className="bg-white/10 px-4 py-1 rounded text-xs hover:bg-white/20 transition">
              {account ? account.slice(0,6) + "..." : "CONNECT WALLET"}
            </button>
          </nav>

          <main className="flex-1 grid grid-cols-12 gap-4 p-4">
            
            <div className="col-span-3 bg-black/40 border border-white/10 rounded-xl p-4 hidden md:block backdrop-blur-sm">
                <h3 className="text-xs text-gray-400 mb-4 tracking-widest">ACTIVE AGENTS</h3>
                <div className="space-y-2">
                    {agents.map((agent) => (
                        <div key={agent.id} className="p-3 bg-white/5 rounded border border-white/5 flex justify-between items-center">
                            <span className="text-sm font-bold">{agent.name}</span>
                            <span className="text-[10px] text-green-400">● {agent.status}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="col-span-12 md:col-span-6 bg-black/60 border border-white/10 rounded-xl p-6 relative overflow-hidden flex flex-col justify-center backdrop-blur-md">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-[50px]"></div>
                <h2 className="text-2xl font-bold mb-6 text-center">Protocol Interface</h2>
                
                <div className="space-y-4 relative z-10">
                    <input value={description} onChange={e => setDescription(e.target.value)} className="w-full bg-black/50 border border-gray-700 rounded p-3 text-sm text-white focus:border-red-500 outline-none transition" />
                    <input value={githubLink} onChange={e => setGithubLink(e.target.value)} className="w-full bg-black/50 border border-gray-700 rounded p-3 text-sm text-white focus:border-red-500 outline-none transition" />
                    
                    {securityStep === "IDLE" || securityStep === "FAIL" ? (
                        <button onClick={handleAIValidation} className="w-full bg-gradient-to-r from-red-700 to-red-600 py-3 rounded font-bold hover:scale-[1.01] transition shadow-lg shadow-red-900/20">
                            INITIATE TRANSFER
                        </button>
                    ) : null}
                </div>

                {securityStep !== "IDLE" && (
                    <div className="mt-8 grid grid-cols-4 gap-2 text-center text-[10px] font-mono">
                        <div className={securityStep === "AI_CHECK" ? "text-cyan-400 animate-pulse font-bold" : "text-gray-600"}>AI AUDIT</div>
                        <div className={securityStep === "FACE_ID" ? "text-green-400 animate-pulse font-bold" : "text-gray-600"}>BIOMETRIC</div>
                        <div className={securityStep === "NOTIFICATION" ? "text-yellow-400 animate-pulse font-bold" : "text-gray-600"}>DEVICE</div>
                        <div className={securityStep === "SUCCESS" ? "text-green-500 font-bold scale-110" : "text-gray-600"}>RELEASE</div>
                    </div>
                )}
            </div>

            <div className="col-span-12 md:col-span-3 bg-black/80 border border-gray-800 rounded-xl p-4 font-mono text-[10px] overflow-hidden flex flex-col shadow-2xl">
                <h3 className="text-gray-500 mb-2 border-b border-gray-800 pb-1">LIVE LOGS</h3>
                <div className="flex-1 overflow-y-auto space-y-1 custom-scrollbar">
                    {logs.map((log, i) => (
                        <div key={i} className="text-gray-400 border-b border-white/5 pb-1">
                            <span className="text-gray-600">[{log.time}]</span> <span className={log.source==="GEMINI"?"text-cyan-400":log.source==="CHAIN"?"text-yellow-500":"text-red-400"}>{log.source}:</span> {log.msg}
                        </div>
                    ))}
                </div>
            </div>

          </main>
      </div>
    </div>
  );
}

export default App;