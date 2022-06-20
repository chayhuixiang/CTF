// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/** 
 * @title Ballot
 * @dev Implements voting process along with vote delegation
 */

interface IYouOnlyLiveOnce {
    function balanceAmount() external view returns (uint);
    function increaseBalance(uint256 amount) external;
}
contract Caller {
    constructor(address _contract, uint256 _amount) {
        IYouOnlyLiveOnce(_contract).increaseBalance(_amount);
    }
}
