//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Greeter {

    function verify( bytes32 hash, uint8 v, bytes32 r, bytes32 s) external pure returns(address) {
        return ecrecover(hash, v, r, s);
    }
}
