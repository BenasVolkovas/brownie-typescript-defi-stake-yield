import { Box, Typography, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Token } from "../Main";
import React, { useState } from "react";
import { WalletBalance } from "./WalletBalance";
import { StakeForm } from "./StakeForm";
interface YourWalletProps {
    supportedTokens: Array<Token>;
}

export const YourWallet = ({ supportedTokens }: YourWalletProps) => {
    const [selectedTokenIndex, setSelectedTokensIndex] = useState<number>(0);

    const handleTabChange = (
        event: React.ChangeEvent<{}>,
        newValue: string
    ) => {
        setSelectedTokensIndex(parseInt(newValue));
    };

    return (
        <Box>
            <Typography variant="h4">Your Wallet!</Typography>
            <Box>
                <TabContext value={selectedTokenIndex.toString()}>
                    <TabList
                        onChange={handleTabChange}
                        aria-label="Stake form tabs"
                    >
                        {supportedTokens.map((token, index) => {
                            return (
                                <Tab
                                    label={token.name}
                                    value={index.toString()}
                                    key={index}
                                ></Tab>
                            );
                        })}
                    </TabList>
                    {supportedTokens.map((token, index) => {
                        return (
                            <TabPanel value={index.toString()} key={index}>
                                <WalletBalance token={token} />
                                <StakeForm token={token} />
                            </TabPanel>
                        );
                    })}
                </TabContext>
            </Box>
        </Box>
    );
};
