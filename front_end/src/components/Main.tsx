import { useEthers } from "@usedapp/core";
import helperConfig from "../helper-config.json";
import networkMapping from "../chain-info/deployments/map.json";
import { constants } from "ethers";
import brownieConfig from "../brownie-config.json";
import dappImage from "../assets/images/dapp.png";
import ethImage from "../assets/images/eth.png";
import daiImage from "../assets/images/dai.png";
import { YourWallet } from "./wallet/YourWallet";
import { Typography } from "@mui/material";

export type Token = {
    image: string;
    address: string;
    name: string;
};

export const Main = () => {
    const { chainId } = useEthers();
    const networkName = chainId ? helperConfig[chainId] : "dev";
    const dappTokenAddress = chainId
        ? networkMapping[String(chainId)]["DappToken"][0]
        : constants.AddressZero;
    const wethTokenAddress = chainId
        ? brownieConfig["networks"][networkName]["weth_token"]
        : constants.AddressZero;
    const fauTokenAddress = chainId
        ? brownieConfig["networks"][networkName]["fau_token"]
        : constants.AddressZero;

    const supportedTokens: Array<Token> = [
        { image: dappImage, address: dappTokenAddress, name: "DAPP" },
        { image: ethImage, address: wethTokenAddress, name: "WETH" },
        { image: daiImage, address: fauTokenAddress, name: "DAI" },
    ];

    return (
        <>
            <Typography variant="h3" sx={{margin: ({spacing}) => spacing(5, 0)}}>Tokens Staking Dapp</Typography>
            <YourWallet supportedTokens={supportedTokens} />
        </>
    )
};
