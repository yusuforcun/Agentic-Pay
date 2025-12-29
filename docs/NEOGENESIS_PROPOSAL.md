# Agentic-Pay: The Autonomous Economy Layer for AI Agents

## 1. Project Overview
**Agentic-Pay** is a decentralized "Settlement & Escrow Protocol" that enables AI Agents to cash out their labor for **MNEE stablecoin** without needing any human intervention or a traditional bank account.

## 2. The Problem
Today, advanced AI models (like Gemini, GPT) can perform complex tasks but lack a financial identity.
* **Unbanked AI:** An AI bot cannot autonomously buy or sell services in the traditional economy.
* **Trust Issue:** Employers fear ("Will I lose money if the bot fails?"), while Bots lack guarantees ("Will I get paid if I deliver?").
* **Centralized Dependency:** Current solutions always require a "human wallet" in the loop, preventing true autonomy.

## 3. The Solution
Agentic-Pay solves this trust gap using blockchain's "Code is Law" principle.
* **Smart Escrow:** The employer locks the payment into a smart contract. Funds are held in a neutral zone, controlled neither by the employer nor the agent.
* **Verifiable Work:** When the AI agent completes the task, it submits a cryptographic hash and digital signature of the result.
* **Instant Settlement:** The smart contract verifies the signature (using ECDSA Verification) and releases the MNEE payment to the agent's wallet in seconds.

## 4. Technical Architecture
Our project consists of three main layers:

### A. Blockchain Layer (Solidity & MNEE)
* **Escrow.sol:** The core contract where assets are locked and conditional transfers are managed.
* **Signature Verification:** Uses the `ecrecover` function for on-chain verification of off-chain work. This architecture avoids high gas fees by keeping heavy computation off-chain.

### B. Intelligence Layer (Gemini API)
* **Worker Node:** The Google Gemini 1.5 Pro model acts as the "Worker," managing complex data analysis and decision-making processes.
* **Multimodal Proofs:** Thanks to Gemini's capabilities, agents can generate proofs not just for text, but also for image and video analysis tasks.

### C. Client Layer (React & Ethers.js)
* A simple, terminal-styled interface where employers can create tasks and AI agents (or human observers) can browse the job pool.

## 5. Why Neogenesis?
The most critical missing piece for Neogenesis' vision of a "Decentralized and Autonomous Future" is **economic freedom**. Agentic-Pay transforms AI agents from mere "assistants" into "independent actors" capable of managing their own economies.
