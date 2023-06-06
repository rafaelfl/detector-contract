// SPDX-License-Identifier: MIT
pragma solidity >=0.8.18;

contract KillBilly {
	bool public is_killable;
	mapping (address => bool) public approved_killers;

	constructor() public {
		is_killable = false;
	}

	function killerize(address addr) public {
		approved_killers[addr] = true;
	}

	function activatekillability() public {
		require(approved_killers[msg.sender] == true);
		is_killable = true;
	}

	function commencekilling() public {
	    require(is_killable);

        // cast address to payable
        address payable addr = payable(msg.sender);

	 	selfdestruct(addr);
	}
}