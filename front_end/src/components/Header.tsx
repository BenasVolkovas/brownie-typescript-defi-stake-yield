import { useEthers } from "@usedapp/core";
import { Button, Box } from "@mui/material";

const Header = () => {
    const { account, activateBrowserWallet, deactivate } = useEthers();
    const isConnected = account !== undefined;

    return (
        <Box
            sx={{
                margin: ({ spacing }) => spacing(1),
                display: "flex",
                justifyContent: "flex-end",
            }}
        >
            {isConnected ? (
                <Button
                    color="primary"
                    variant="contained"
                    onClick={deactivate}
                >
                    Disconnect
                </Button>
            ) : (
                <Button
                    color="primary"
                    variant="contained"
                    onClick={() => activateBrowserWallet()}
                >
                    Connect
                </Button>
            )}
        </Box>
    );
};

export default Header;
