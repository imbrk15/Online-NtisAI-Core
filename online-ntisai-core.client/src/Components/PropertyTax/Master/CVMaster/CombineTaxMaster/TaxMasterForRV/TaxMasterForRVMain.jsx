import React from "react";
import { Box, Paper } from "@mui/material";
import TaxMasterForRVContent from "./TaxMasterForRVContent";

const TaxMasterForRVMain = () => {
    return (
        <Box className="w-full">
            <Paper elevation={0} className="pt-3 rounded-lg overflow-x-auto">
                <TaxMasterForRVContent />
            </Paper>
        </Box>
    );
};

export default TaxMasterForRVMain;
