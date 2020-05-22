pragma solidity ^0.6.0;

import "@openzeppelin/contracts-ethereum-package/contracts/presets/ERC20PresetMinterPauser.sol";

contract MMToken is ERC20PresetMinterPauserUpgradeSafe {
    uint public userCount;
    mapping (uint => User) public users;

    struct User {
        uint id;
        address account;
    }

    event UserRegistered(
        uint id,
        address account
    );

    function registerUser() public {
        userCount++;
        User memory user = User(userCount, msg.sender);
        users[userCount] = user;
        emit UserRegistered(userCount, user.account);
    }
}
