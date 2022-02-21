import { useEthers } from "@usedapp/core";
import helperConfig from "../helper-config.json";
import { Box } from "@mui/system";
import networkMapping from "../chain-info/deployments/map.json";
import { constants } from "ethers";
import brownieConfig from "../brownie-config.json";
import dappImage from "../assets/images/dapp.png";
import ethImage from "../assets/images/dapp.png";
import daiImage from "../assets/images/dapp.png";
import { YourWallet } from "./yourWallet/YourWallet";

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

    return <YourWallet supportedTokens={supportedTokens} />;
};
