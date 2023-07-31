// SPDX-License-Identifier: AGPL-3.0-or-later

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MockERC20 is ERC20, Ownable {
    constructor(string memory name_, string memory symbol_, uint _initSupply) ERC20(name_, symbol_) {
        _mint(msg.sender, _initSupply);
    }

    function mint(address to, uint amount) external onlyOwner {
        _mint(to, amount);
    }
}
