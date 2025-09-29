// src/Components/AssessmentMaster/RVRatebyMultiplier/RVRatebyMultiplierMain.jsx
import React from "react";
import { Box } from "@mui/material";
import RVRatebyMultiplierContent from "./RVRatebyMultiplierContent";

export default function RVRatebyMultiplierMain({ selectedMaster }) {
    if (selectedMaster !== "rvRatebyMultiplier") return null;

    return (
        <Box sx={{ p: { xs: 0, md: 0 } }}>
            <RVRatebyMultiplierContent />
        </Box>
    );
}
