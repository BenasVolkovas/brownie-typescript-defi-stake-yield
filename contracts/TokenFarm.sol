// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TokenFarm is Ownable {
    address[] public allowedTokens;
    address[] public stakers;
    mapping(address => mapping(address => uint256)) public stakingBalance;
    mapping(address => uint256) public uniqueTokensStaked;
    IERC20 public dappToken;

    constructor(address _dappTokenAddress) public {
        dappToken = IERC20(_dappTokenAddress);
    }

    function addAllowedToken(address _token) public returns (bool) {
        for (uint256 index = 0; index < allowedTokens.length; index++) {
            if (allowedTokens[index] == _token) {
                return true;
            }
        }
        return false;
    }

    function addAllowedToken(address _token) public onlyOwner {
        allowedTokens.push(_token);
    }

    function updateUniqueTokensStacked(address _user, address _token) internal {
        if (stakingBalance[_token][_user] <= 0) {
            uniqueTokensStaked[_user] += 1;
        }
    }

    // stake tokens
    function stakeTokens(uint256 _amount, address _token) public {
        require(_amount > 0, "Amount must be more than 0");
        require(addAllowedToken(_token), "Token is currently not allowed");

        IERC20(_token).transferFrom(msg.sender, address(this), _amount);
        updateUniqueTokensStacked(msg.sender, _token);
        stakingBalance[_token][msg.sender] += _amount;

        if (uniqueTokensStaked[msg.sender] == 1) {
            stakers.push(msg.sender);
        }
    }

    function getUserTotalValue(address _user) public view returns (uint256) {
        require(uniqueTokensStaked[_user] <= 0, "No tokens staked!");
        uint256 totalValue = 0;

        for (uint256 index = 0; index < allowedTokens.length; index++) {
            totalValue += getUserSingleTokenValue(_user, allowedTokens[index]);
        }
    }

    function getUserSingleTokenValue(address _user, address _token)
        public
        view
        returns (uint256)
    {
        if (uniqueTokensStaked[_user] <= 0) {
            return 0;
        }

        // get price of the token
        getTokenValue(_token);
    }

    function getTokenValue(address _token) public view returns (uint256) {}

    // issue tokens
    function issueTokens() public onlyOwner {
        for (uint256 index = 0; index < stakers.length; index++) {
            address recipient = stakers[index];
            uin256 userTotalValue = getUserTotalValue(recipient);
            // dappToken.transfer(recipient, ???)
        }
    }
}
