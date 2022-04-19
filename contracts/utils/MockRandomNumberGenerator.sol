//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "../interfaces/IPeakFinanceLottery.sol";

contract MockRandomNumberGenerator is Ownable {
    address public peakFinanceLottery;
    uint32 public randomResult;
    uint256 public nextRandomResult;
    uint256 public latestLotteryId;

    /**
     * @notice Constructor
     * @dev MockRandomNumberGenerator must be deployed before the lottery.
     */
    constructor() {}

    /**
     * @notice Set the address for the PeakFinanceLottery
     * @param _peakFinanceLottery: address of the PeakFinance lottery
     */
    function setLotteryAddress(address _peakFinanceLottery) external onlyOwner {
        peakFinanceLottery = _peakFinanceLottery;
    }

    /**
     * @notice Set the address for the PeakFinanceLottery
     * @param _nextRandomResult: next random result
     */
    function setNextRandomResult(uint256 _nextRandomResult) external onlyOwner {
        nextRandomResult = _nextRandomResult;
    }

    /**
     * @notice Request randomness from a user-provided seed
     * @param _seed: seed provided by the PeakFinance lottery
     */
    function getRandomNumber(uint256 _seed) external {
        require(msg.sender == peakFinanceLottery, "Only PeakFinanceLottery");
        fulfillRandomness(0, nextRandomResult);
    }

    /**
     * @notice Change latest lotteryId to currentLotteryId
     */
    function changeLatestLotteryId() external {
        latestLotteryId = IPeakFinanceLottery(peakFinanceLottery).viewCurrentLotteryId();
    }

    /**
     * @notice View latestLotteryId
     */
    function viewLatestLotteryId() external view returns (uint256) {
        return latestLotteryId;
    }

    /**
     * @notice View random result
     */
    function viewRandomResult() external view returns (uint32) {
        return randomResult;
    }

    /**
     * @notice Callback function used by ChainLink's VRF Coordinator
     */
    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal {
        randomResult = uint32(1000000 + (randomness % 1000000));
    }
}
