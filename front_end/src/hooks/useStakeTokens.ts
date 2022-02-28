import { useEthers } from "@usedapp/core";
import TokenFarm from "../chain-info/contracts/TokenFarm.json";
import networkMapping from "../chain-info/deployments/map.json";
import { constants } from "ethers";

export const useStakeTokens = (tokenAddress: string) => {
    const { chainId } = useEthers();
    const { abi } = TokenFarm;
    const tokenFarmAddress = chainId
        ? networkMapping[String(chainId)]["TokenFarm"][0]
        : constants.AddressZero;
};
