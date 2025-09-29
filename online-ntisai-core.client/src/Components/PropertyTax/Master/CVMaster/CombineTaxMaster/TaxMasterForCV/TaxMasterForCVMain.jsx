import React from "react";
import { Box, Paper } from "@mui/material";
import TaxMasterForCVContent from "./TaxMasterForCVContent";

const TaxMasterForCVMain = () => {
    return (
        <Box className="w-full">
            <Paper elevation={0} className="p-4 rounded-lg overflow-x-auto">
                <TaxMasterForCVContent />
            </Paper>
        </Box>
    );
};

export default TaxMasterForCVMain;
