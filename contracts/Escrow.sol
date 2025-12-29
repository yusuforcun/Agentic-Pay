// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function transfer(address recipient, uint256 amount) external returns (bool);
}

contract AgenticEscrow {
    struct Task {
        uint256 id;
        address employer;
        uint256 amount;
        bool isCompleted;
    }

    IERC20 public paymentToken;
    address public trustedValidator;

    mapping(uint256 => Task) public tasks;
    uint256 public taskCount;

    event TaskCreated(uint256 taskId, address employer, uint256 amount);
    event TaskCompleted(uint256 taskId, address worker);

    constructor(address _tokenAddress, address _validator) {
        paymentToken = IERC20(_tokenAddress);
        trustedValidator = _validator;
    }

    function createTask(uint256 _amount) external {
        require(_amount > 0, "Miktar 0 olamaz");
        bool success = paymentToken.transferFrom(msg.sender, address(this), _amount);
        require(success, "Transfer basarisiz");

        taskCount++;
        tasks[taskCount] = Task(taskCount, msg.sender, _amount, false);
        emit TaskCreated(taskCount, msg.sender, _amount);
    }

    function completeTask(uint256 _taskId, bytes memory _signature) external {
        Task storage task = tasks[_taskId];
        require(!task.isCompleted, "Bu is zaten tamamlandi");
        require(task.amount > 0, "Gecersiz is");

        bytes32 messageHash = keccak256(abi.encodePacked(_taskId, task.amount));
        bytes32 ethSignedMessageHash = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", messageHash));
        
        (bytes32 r, bytes32 s, uint8 v) = splitSignature(_signature);
        address signer = ecrecover(ethSignedMessageHash, v, r, s);

        require(signer == trustedValidator, "Gecersiz imza! Yetkisiz islem.");

        task.isCompleted = true;
        bool success = paymentToken.transfer(msg.sender, task.amount);
        require(success, "Odeme transferi basarisiz");

        emit TaskCompleted(_taskId, msg.sender);
    }

    function splitSignature(bytes memory sig) internal pure returns (bytes32 r, bytes32 s, uint8 v) {
        require(sig.length == 65, "Gecersiz imza uzunlugu");
        assembly {
            r := mload(add(sig, 32))
            s := mload(add(sig, 64))
            v := byte(0, mload(add(sig, 96)))
        }
    }
}