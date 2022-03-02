import React, { useState, useEffect } from "react";
import { Token } from "../Main";
import { useEthers, useTokenBalance, useNotifications } from "@usedapp/core";
import { formatUnits } from "@ethersproject/units";
import { Button, Input, CircularProgress, Box, Snackbar, Alert } from "@mui/material";
import { useStakeTokens } from "../../hooks";
import { utils } from "ethers";
export interface StakeFormProps {
    token: Token;
}

export const StakeForm = ({ token }: StakeFormProps) => {
    const { address: tokenAddress } = token;
    const { account } = useEthers();
    const tokenBalance = useTokenBalance(tokenAddress, account);
    const formattedTokenBalance: number = tokenBalance
        ? parseFloat(formatUnits(tokenBalance, 18))
        : 0;
    const {notifications} = useNotifications()


    const [amount, setAmount] = useState<
        number | string | Array<number | string>
    >(0);
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newAmount =
            event.target.value === "" ? "" : Number(event.target.value);
        setAmount(newAmount);
    };

    const { approveAndStake, state: approveAndStakeErc20State } = useStakeTokens(tokenAddress);
    const handleStakeSubmit = () => {
        const amountAsWei = utils.parseEther(amount.toString());
        return approveAndStake(amountAsWei.toString());
    };

    const isMining = approveAndStakeErc20State.status === "Mining"
    const [showErc20ApprovalSuccess, setShowErc20ApprovalSuccess] = useState(false);
    const [showStakeTokensSuccess, setShowStakeTokensSuccess] = useState(false);

    const handleCloseSnack = () => {
        setShowStakeTokensSuccess(false)
        setShowErc20ApprovalSuccess(false)
    }

    useEffect(() => {
        if (notifications.filter(
            (notification) => 
            notification.type === "transactionSucceed" && 
            notification.transactionName === "Approve ERC20"
        ).length > 0) {
            setShowStakeTokensSuccess(false)
            setShowErc20ApprovalSuccess(true)
        }
        if (notifications.filter(
            (notification) => 
            notification.type === "transactionSucceed" && 
            notification.transactionName === "Stake Tokens"
        ).length > 0) {
            setShowErc20ApprovalSuccess(false)
            setShowStakeTokensSuccess(true)
        }
    }, [notifications, showErc20ApprovalSuccess, showStakeTokensSuccess])

    return (
        <>
        <Box>
            <Input onChange={handleInputChange} />
            <Button onClick={handleStakeSubmit} disabled={isMining} color="primary" size="large">
                {isMining ?
                    <CircularProgress size={26} />
                :
                    "Stake!"
                }
            </Button>
        </Box>
        <Snackbar open={showErc20ApprovalSuccess} autoHideDuration={5000} onClose={handleCloseSnack}>
            <Alert onClose={handleCloseSnack} severity="success"> ERC-20 token transfer approved! Now approve the 2nd transaction.</Alert>
        </Snackbar>
        <Snackbar open={showStakeTokensSuccess} autoHideDuration={5000} onClose={handleCloseSnack}>
            <Alert onClose={handleCloseSnack} severity="success"> Tokens staked successfully!</Alert>
        </Snackbar>
        </>
    );
};
