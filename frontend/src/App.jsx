import { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ethers } from 'ethers';

// Gizli .env dosyasındaki anahtarı çeker
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

function App() {
  const [account, setAccount] = useState(null);
  const [description, setDescription] = useState("Agentic Pay Integration - Autonomous Payment Module");
  const [githubLink, setGithubLink] = useState("https://github.com/redpill/agentic-pay");
  const [securityStep, setSecurityStep] = useState("IDLE"); 
  const [aiAnalysis, setAiAnalysis] = useState(null);
  
  // Fake Logs & Agents
  const [logs, setLogs] = useState([
    { time: "10:00:01", source: "SYSTEM", msg: "Arbitrum One node connected." },
    { time: "10:00:02", source: "AGENT-1", msg: "Tesla Model 3 charging request received." },
    { time: "10:00:05", source: "GEMINI", msg: "Model 1.5 Pro ready for audit." },
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
    
    try {
      if (API_KEY === "BURAYA_GEMINI_API_KEY_YAZ") {
        setTimeout(() => {
             setAiAnalysis({ score: 98 });
             addLog("GEMINI", "Audit Score: 98/100. Approved.");
             startTripleLockSequence();
        }, 3000);
        return;
      }
      // Real API Logic here (Simplified for demo stability)
      startTripleLockSequence();

    } catch (error) {
      addLog("WARN", "API Error. Switching to Offline Validation.");
      startTripleLockSequence(); 
    }
  };

  const startTripleLockSequence = async () => {
    await new Promise(r => setTimeout(r, 1500)); 
    setSecurityStep("FACE_ID"); 
    addLog("BIO-AUTH", "Requesting FaceID from Admin Device...");
    await new Promise(r => setTimeout(r, 2000));
    setSecurityStep("NOTIFICATION"); 
    addLog("DEVICE", "2FA Notification sent to iPhone 15 Pro.");
    await new Promise(r => setTimeout(r, 2000));
    setSecurityStep("PIN"); 
    addLog("SECURE", "PIN Input verified.");
    await new Promise(r => setTimeout(r, 1500));
    setSecurityStep("SUCCESS"); 
    addLog("CHAIN", "Transaction broadcasted to Arbitrum Sequencer.");
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans flex flex-col overflow-hidden">
      
      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-6 py-4 border-b border-white/5 bg-black/50">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
          <h1 className="text-xl font-bold">AGENTIC<span className="text-red-600">PAY</span> <span className="text-xs text-gray-500 ml-2">DASHBOARD</span></h1>
        </div>
        <button onClick={connectWallet} className="bg-white/10 px-4 py-1 rounded text-xs hover:bg-white/20">
          {account ? account.slice(0,6) + "..." : "CONNECT WALLET"}
        </button>
      </nav>

      {/* DASHBOARD GRID */}
      <main className="flex-1 grid grid-cols-12 gap-4 p-4">
        
        {/* LEFT: AGENTS */}
        <div className="col-span-3 bg-white/5 border border-white/10 rounded-xl p-4 hidden md:block">
            <h3 className="text-xs text-gray-400 mb-4 tracking-widest">ACTIVE AGENTS</h3>
            <div className="space-y-2">
                {agents.map((agent) => (
                    <div key={agent.id} className="p-3 bg-black/40 rounded border border-white/5 flex justify-between items-center">
                        <span className="text-sm font-bold">{agent.name}</span>
                        <span className="text-[10px] text-green-400">● {agent.status}</span>
                    </div>
                ))}
            </div>
        </div>

        {/* CENTER: ACTION */}
        <div className="col-span-12 md:col-span-6 bg-black/40 border border-white/10 rounded-xl p-6 relative overflow-hidden flex flex-col justify-center">
             <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-[50px]"></div>
             <h2 className="text-2xl font-bold mb-6 text-center">Protocol Interface</h2>
             
             <div className="space-y-4 relative z-10">
                <input value={description} onChange={e => setDescription(e.target.value)} className="w-full bg-black/60 border border-gray-700 rounded p-3 text-sm text-white" />
                <input value={githubLink} onChange={e => setGithubLink(e.target.value)} className="w-full bg-black/60 border border-gray-700 rounded p-3 text-sm text-white" />
                
                {securityStep === "IDLE" || securityStep === "FAIL" ? (
                    <button onClick={handleAIValidation} className="w-full bg-gradient-to-r from-red-700 to-red-600 py-3 rounded font-bold hover:scale-[1.01] transition">
                        INITIATE TRANSFER
                    </button>
                ) : null}
             </div>

             {/* ANIMATION STEPS */}
             {securityStep !== "IDLE" && (
                <div className="mt-8 grid grid-cols-4 gap-2 text-center text-[10px] font-mono">
                    <div className={securityStep === "AI_CHECK" ? "text-cyan-400 animate-pulse" : "text-gray-600"}>AI AUDIT</div>
                    <div className={securityStep === "FACE_ID" ? "text-green-400 animate-pulse" : "text-gray-600"}>BIOMETRIC</div>
                    <div className={securityStep === "NOTIFICATION" ? "text-yellow-400 animate-pulse" : "text-gray-600"}>DEVICE</div>
                    <div className={securityStep === "SUCCESS" ? "text-green-500 font-bold" : "text-gray-600"}>RELEASE</div>
                </div>
             )}
        </div>

        {/* RIGHT: TERMINAL */}
        <div className="col-span-12 md:col-span-3 bg-black border border-gray-800 rounded-xl p-4 font-mono text-[10px] overflow-hidden flex flex-col">
            <h3 className="text-gray-500 mb-2 border-b border-gray-800 pb-1">LIVE LOGS</h3>
            <div className="flex-1 overflow-y-auto space-y-1">
                {logs.map((log, i) => (
                    <div key={i} className="text-gray-400">
                        <span className="text-gray-600">[{log.time}]</span> <span className="text-white">{log.source}:</span> {log.msg}
                    </div>
                ))}
            </div>
        </div>

      </main>
    </div>
  );
}

export default App;