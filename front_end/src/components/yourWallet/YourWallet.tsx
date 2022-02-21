import { Box } from "@mui/system";
import { Token } from "../Main";

interface YourWalletProps {
    supportedTokens: Array<Token>;
}

export const YourWallet = ({ supportedTokens }: YourWalletProps) => {
    return (
        <Box>
            <h1>Your Wallet!</h1>
            <Box></Box>
        </Box>
    );
};
