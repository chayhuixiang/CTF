// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

/** 
 * @title Ballot
 * @dev Implements voting process along with vote delegation
 */

interface IDuperSuperSafeSafe {
    function balanceOf(address _addr) external view returns (uint256 balance);

    function changeOwner(address _newOwner) external;

    function changeSecretPassphrase(
        bytes32 _new_secret_passphrase,
        bytes32 _new_secret_passphrase_2,
        bytes32 _secret_passphrase,
        bytes32 _secret_passphrase_2,
        uint256 _timestamp
    ) external;

    function isSolved() external view returns (bool);

    function withdrawFunds(
        uint256 _amount,
        bytes32 _secret_passphrase,
        bytes32 _secret_passphrase_2,
        uint256 _timestamp
    ) external payable;

    receive() external payable;
}


contract Caller {
    address payable contractAddress;
    constructor(address _v) {
        contractAddress = payable(_v);
    }
    function ownerChange(address _newOwner) public {
        return IDuperSuperSafeSafe(contractAddress).changeOwner(_newOwner);
    }

    function secretPassphraseChange(bytes32 _new_secret_passphrase, bytes32 _new_secret_passphrase_2) public returns (uint256) {
        bytes32 _secret_passphrase = "hello";
        bytes32 _secret_passphrase_2 = "world";
        uint256 _timestamp = block.timestamp;
        IDuperSuperSafeSafe(contractAddress).changeSecretPassphrase(_new_secret_passphrase, _new_secret_passphrase_2, _secret_passphrase, _secret_passphrase_2, _timestamp);
        return _timestamp;
    }

    function fundsWithdrawal(uint256 _amount, bytes32 _secret_passphrase, bytes32 _secret_passphrase_2, uint256 _timestamp) public {
        return IDuperSuperSafeSafe(contractAddress).withdrawFunds(_amount, _secret_passphrase, _secret_passphrase_2, _timestamp);
    }
}
