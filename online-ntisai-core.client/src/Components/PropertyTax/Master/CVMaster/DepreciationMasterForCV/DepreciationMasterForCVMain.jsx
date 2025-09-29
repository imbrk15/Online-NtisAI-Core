import * as React from "react";
import { Box, Typography } from "@mui/material";
import DepreciationMasterForCVTable from "./DepreciationMasterForCVTable";

export default function DepreciationMasterForCVMain({ selectedMaster }) {
    if (selectedMaster !== "depreciationCV") return null;

    return (
        <Box sx={{ p: { xs: 1, md: 0 } }}>


            {/* Table block */}
            <Box >
                <DepreciationMasterForCVTable />
            </Box>
        </Box>
    );
}
