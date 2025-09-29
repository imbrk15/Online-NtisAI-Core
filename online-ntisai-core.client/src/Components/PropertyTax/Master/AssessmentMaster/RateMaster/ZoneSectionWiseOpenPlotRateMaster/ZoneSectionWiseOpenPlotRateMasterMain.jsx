// src/Components/AssessmentMaster/ZoneSectionWiseOpenPlotRateMaster/ZoneSectionWiseOpenPlotRateMasterMain.jsx
import React from "react";
import { Box } from "@mui/material";
import ZoneSectionWiseOpenPlotRateMasterContent from "./ZoneSectionWiseOpenPlotRateMasterContent";

export default function ZoneSectionWiseOpenPlotRateMasterMain({ selectedMaster }) {
    if (selectedMaster !== "zoneSectionWiseOpenPlotRateMaster") return null;

    return (
        <Box sx={{ p: { xs: 0, md: 0 } }}>
            <ZoneSectionWiseOpenPlotRateMasterContent />
        </Box>
    );
}
