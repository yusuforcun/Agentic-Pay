// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title Agentic Pay Protocol
 * @dev Google Gemini Denetimli & Triple-Lock Korumalı Ödeme Sistemi
 */
contract AgenticPay {
    
    // --- DEVLET SIRLARI (State Variables) ---
    address public admin; // Kontratın sahibi (Sen)
    address public aiValidator; // Google Gemini API'sini temsil eden cüzdan

    enum JobStatus { PENDING, AUDITED, RELEASED, DISPUTED }

    struct Job {
        uint256 id;
        address employer;      // İşi veren
        address worker;        // İşi yapan (Veya AI Ajanı)
        uint256 amount;        // Kilitlenen para
        string ipfsProof;      // GitHub/Kanıt linki
        bool aiApproved;       // Gemini Onayı (True/False)
        JobStatus status;
    }

    mapping(uint256 => Job) public jobs;
    uint256 public jobCounter;

    // --- OLAYLAR (Events - Blockchain Logları) ---
    event JobCreated(uint256 indexed jobId, address employer, uint256 amount);
    event AIAuditComplete(uint256 indexed jobId, bool approved, string reason);
    event FundsReleased(uint256 indexed jobId, address worker, uint256 amount);

    constructor(address _aiValidator) {
        admin = msg.sender;
        aiValidator = _aiValidator;
    }

    // 1. ADIM: PARAYI KİLİTLE (Triple-Lock Başlangıcı)
    function createJob(address _worker, string memory _proof) external payable {
        require(msg.value > 0, "Bos is yapilmaz patron");
        
        jobCounter++;
        jobs[jobCounter] = Job({
            id: jobCounter,
            employer: msg.sender,
            worker: _worker,
            amount: msg.value,
            ipfsProof: _proof,
            aiApproved: false,
            status: JobStatus.PENDING
        });

        emit JobCreated(jobCounter, msg.sender, msg.value);
    }

    // 2. ADIM: GEMINI ONAYI (Backend burayı tetikler)
    function submitAIAudit(uint256 _jobId, bool _decision, string memory _reason) external {
        require(msg.sender == aiValidator || msg.sender == admin, "Yetkisiz Giris!");
        require(jobs[_jobId].status == JobStatus.PENDING, "Is zaten islendi");

        jobs[_jobId].aiApproved = _decision;
        jobs[_jobId].status = JobStatus.AUDITED;

        emit AIAuditComplete(_jobId, _decision, _reason);
    }

    // 3. ADIM: TRIPLE-LOCK AÇILIMI & ÖDEME (Son Vuruş)
    function releaseFunds(uint256 _jobId) external {
        Job storage job = jobs[_jobId];
        
        // Güvenlik Kontrolleri
        require(msg.sender == admin, "Sadece Admin (Triple-Lock) acabilir");
        require(job.status == JobStatus.AUDITED, "Once AI denetlemeli");
        require(job.aiApproved == true, "AI bu isi begenmedi, odeme yok");

        uint256 payAmount = job.amount;
        job.amount = 0;
        job.status = JobStatus.RELEASED;

        // Parayı işçiye (veya Ajana) gönder
        (bool success, ) = payable(job.worker).call{value: payAmount}("");
        require(success, "Transfer hatasi");

        emit FundsReleased(_jobId, job.worker, payAmount);
    }
}