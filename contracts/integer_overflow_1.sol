// SPDX-License-Identifier: MIT
pragma solidity >=0.8.18;

contract Overflow {
    uint private sellerBalance=0;
    
    function add(uint value) public {
        sellerBalance += value; // possible overflow

        // possible auditor assert
        // assert(sellerBalance >= value); 
    } 

    function safeAdd(uint value) public {
        require(value + sellerBalance >= sellerBalance);
        sellerBalance += value; 
    } 
}