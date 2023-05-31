// SPDX-License-Identifier: MIT
pragma solidity >=0.8.18;

contract HelloWeb3 {
    event UpdateMessage(string oldStr, string newStr);

    string public message;

    constructor(string memory initMessage) {
        message = initMessage;
    }

    function update(string memory newMessage) public {
        string memory oldMsg = message;

        message = newMessage;
        emit UpdateMessage(oldMsg, newMessage);
    }
}
