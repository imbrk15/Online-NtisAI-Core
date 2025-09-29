// src/Components/AssessmentMaster/YearlyRate/YearlyRateMain.jsx
import React from "react";
import { Box } from "@mui/material";
import YearlyRateContent from "./YearlyRateContent";

export default function YearlyRateMain({ selectedMaster }) {
    if (selectedMaster !== "yearlyRate") return null;

    return (
        <Box sx={{ p: { xs: 0, md: 0 } }}>
            <YearlyRateContent />
        </Box>
    );
}
