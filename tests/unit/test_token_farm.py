from brownie import network, exceptions
from scripts.helpful_scripts import (
    LOCAL_BLOCKCHAIN_ENVIRONMENTS,
    INITIAL_PRICE_FEED_VALUE,
    get_account,
    get_contract,
)
from scripts.deploy import deploy_token_farm_and_dapp_token
import pytest


def test_set_price_feed_contract():
    # Arrange
    if network.show_active() not in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        pytest.skip("Only for local testing!")

    account = get_account()
    nonOwner = get_account(index=1)
    tokenFarm, dappToken = deploy_token_farm_and_dapp_token()

    # Act
    priceFeedAddress = get_contract("eth_usd_price_feed")
    tx = tokenFarm.setPriceFeedContract(
        dappToken.address, priceFeedAddress, {"from": account}
    )
    tx.wait(1)

    # Assert
    assert tokenFarm.tokenToPriceFeed(dappToken.address) == priceFeedAddress
    with pytest.raises(exceptions.VirtualMachineError):
        tokenFarm.setPriceFeedContract(
            dappToken.address, priceFeedAddress, {"from": nonOwner}
        )


def test_stake_tokens(amount_staked):
    # Arrange
    if network.show_active() not in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        pytest.skip("Only for local testing!")

    account = get_account()
    tokenFarm, dappToken = deploy_token_farm_and_dapp_token()

    # Act
    approveTx = dappToken.approve(tokenFarm.address, amount_staked, {"from": account})
    approveTx.wait(1)
    stakeTx = tokenFarm.stakeTokens(amount_staked, dappToken.address, {"from": account})
    stakeTx.wait(1)

    # Assert
    assert tokenFarm.stakingBalance(dappToken.address, account.address) == amount_staked
    assert tokenFarm.uniqueTokensStaked(account.address) == 1
    assert tokenFarm.stakers(0) == account.address

    return tokenFarm, dappToken


def test_issue_token(amount_staked):
    # Arrange
    if network.show_active() not in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        pytest.skip("Only for local testing!")

    account = get_account()
    tokenFarm, dappToken = test_stake_tokens(amount_staked)
    startingBalance = dappToken.balanceOf(account.address)

    # Act
    issueTx = tokenFarm.issueTokens({"from": account})
    issueTx.wait(1)

    # Assert
    assert (
        dappToken.balanceOf(account.address)
        == startingBalance + INITIAL_PRICE_FEED_VALUE
    )
