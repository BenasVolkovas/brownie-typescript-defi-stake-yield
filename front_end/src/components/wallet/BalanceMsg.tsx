import { Box } from "@mui/material";

interface BalanceMsgProps {
    label: string;
    amount: number;
    imgSrc: string;
}

export const BalanceMsg = ({ label, imgSrc, amount }: BalanceMsgProps) => {
    return (
        <>
            <Box
                sx={{
                    display: "inline-grid",
                    gridTemplateColumns: "auto auto auto",
                    gap: ({ spacing }) => spacing(1),
                    alignItems: "center",
                }}
            ></Box>
            <Box sx={{ width: "32px" }}></Box>
            <Box sx={{ fontWeight: 700 }}></Box>
        </>
    );
};
