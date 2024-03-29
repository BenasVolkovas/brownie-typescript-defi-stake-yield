from scripts.helpful_scripts import get_account, get_contract
from brownie import DappToken, TokenFarm, config, network
from web3 import Web3
from pathlib import Path
import yaml
import json
import shutil

KEPT_BALANCE = Web3.toWei(100, "ether")


def deploy_token_farm_and_dapp_token(frontEndUpdate=False):
    account = get_account()
    dappToken = DappToken.deploy({"from": account})
    tokenFarm = TokenFarm.deploy(
        dappToken.address,
        {"from": account},
        publish_source=config["networks"][network.show_active()].get("verify", False),
    )
    tx = dappToken.transfer(
        tokenFarm.address, dappToken.totalSupply() - KEPT_BALANCE, {"from": account}
    )
    tx.wait(1)

    # Allow DappToken, WethToken, FauToken/Dai
    wethToken = get_contract("weth_token")
    fauToken = get_contract("dai_token")
    dictOFAllowedTokens = {
        dappToken: get_contract("dai_usd_price_feed"),
        fauToken: get_contract("dai_usd_price_feed"),
        wethToken: get_contract("eth_usd_price_feed"),
    }

    add_allowed_tokens(tokenFarm, dictOFAllowedTokens, account)
    if frontEndUpdate:
        update_front_end()
    return tokenFarm, dappToken


def add_allowed_tokens(tokenFarm, dictOFAllowedTokens, account):
    for token in dictOFAllowedTokens:
        addTx = tokenFarm.addAllowedToken(token.address, {"from": account})
        addTx.wait(1)
        setTx = tokenFarm.setPriceFeedContract(
            token.address, dictOFAllowedTokens[token], {"from": account}
        )
        setTx.wait(1)
    return tokenFarm


def update_front_end():
    copy_folders_to_front_end("./build", "./front_end/src/chain-info")
    # Send config file in JSON format for front end
    with open("brownie-config.yml", "r") as brownieConfig:
        configDict = yaml.load(brownieConfig, Loader=yaml.FullLoader)

        with open("./front_end/src/brownie-config.json", "w") as brownieConfigJson:
            json.dump(configDict, brownieConfigJson)

    print("Front End Updated!")


def copy_folders_to_front_end(src, dest):
    if Path(dest).exists():
        shutil.rmtree(dest)
    shutil.copytree(src, dest)


def main():
    print("Deploying...")
    deploy_token_farm_and_dapp_token(frontEndUpdate=True)
