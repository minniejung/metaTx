// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/metatx/ERC2771Context.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyMetaToken is ERC20, ERC2771Context {
    constructor(
        string memory _name,
        string memory _symbol,
        address _trustedForwarder
    ) ERC20(_name, _symbol) ERC2771Context(_trustedForwarder) {
        _mint(msg.sender, 100 ** 18);
    }

    function _msgSender()
        internal
        view
        override(Context, ERC2771Context)
        returns (address sender)
    {
        return ERC2771Context._msgSender();
    }

    function _msgData()
        internal
        view
        override(Context, ERC2771Context)
        returns (bytes calldata)
    {
        return ERC2771Context._msgData();
    }

    function _contextSuffixLength()
        internal
        view
        override(Context, ERC2771Context)
        returns (uint256)
    {
        return super._contextSuffixLength();
    }
}
