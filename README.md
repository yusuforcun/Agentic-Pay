# 🛡️ Agentic Pay: Trustless Autonomous Economy Protocol

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Network](https://img.shields.io/badge/Network-Arbitrum_One-blue)
![AI](https://img.shields.io/badge/Powered_by-Google_Gemini-orange)

**Agentic Pay** is a security-first payment protocol designed for the Autonomous Economy. It bridges the gap between AI Agents and Blockchain by introducing a **"Triple-Lock"** verification mechanism audited by **Google Gemini 1.5 Pro**.

> *"Trust is broken. We fixed it with Code."*

---

## ⚡ The Problem
As AI Agents (like Tesla Bots, Trading Bots, Supply Chain Agents) begin to transact autonomously, the risk of **hallucinated payments** or **malicious code execution** increases. There is no standard protocol to "verify" the work of an AI before releasing funds.

## 🚀 The Solution: Triple-Lock Protocol
Agentic Pay introduces a smart escrow system that requires three layers of verification before releasing any funds on the Arbitrum Network:

1.  **🤖 AI Audit (Layer 1):** Google Gemini 1.5 Pro analyzes the delivered code/work via API. If the "Trust Score" is below 70, the transaction is blocked.
2.  **👁️ Biometric Proof (Layer 2):** A FaceID/TouchID signal is required from the human supervisor.
3.  **🔒 Smart Contract Escrow (Layer 3):** Funds are locked in a Solidity contract and can only be released if Layer 1 & 2 are satisfied.

---

## 🏗️ Architecture & Tech Stack

### 🧠 AI & Logic
* **Google Gemini 1.5 Pro:** For code auditing and semantic analysis of job descriptions.
* **React + Vite:** High-performance dashboard for "Command Center".
* **Ethers.js:** Bridge between the frontend and the blockchain.

### ⛓️ Blockchain (Backend)
* **Network:** Arbitrum One (Testnet)
* **Smart Contract:** Solidity (v0.8.20)
* **Security:** `onlyAIValidator` modifier to prevent unauthorized triggers.

---

## 📸 Demo & Screenshots

### 1. The Command Center (Frontend)
Real-time dashboard tracking active AI agents and payment flows.
*(Add your Dashboard screenshot here)*

### 2. Smart Contract Logic (Backend)
Funds are locked/released based on logic gates, not just manual input.
*(Add your Remix transaction screenshot here)*

---

## 💻 How to Run Locally

1. **Clone the Repo**
   ```bash
   git clone [https://github.com/redpill/agentic-pay.git](https://github.com/redpill/agentic-pay.git)
   cd agentic-pay