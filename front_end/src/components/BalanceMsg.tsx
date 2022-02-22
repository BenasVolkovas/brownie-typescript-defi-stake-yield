import { Box, Typography } from "@mui/material";

interface BalanceMsgProps {
    label: string;
    amount: number;
    imgSrc: string;
}

export const BalanceMsg = ({ label, imgSrc, amount }: BalanceMsgProps) => {
    return (
        <Box
            sx={{
                display: "inline-grid",
                gridTemplateColumns: "auto auto auto",
                gap: ({ spacing }) => spacing(1),
                alignItems: "center",
            }}
        >
            <Typography variant="body1">{label}</Typography>
            <Box sx={{ fontWeight: 700 }}>{amount}</Box>
            <Box
                component="img"
                sx={{ width: "32px" }}
                src={imgSrc}
                alt="token logo"
            />
        </Box>
    );
};
