

import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import DepreciationByChartMaster from "./DepreciationByChartMaster";
import AddDepreciationRatesMaster from "./AddDepreciationRatesMaster";
import {
    Grid,
} from "@mui/material";
// Accept selectedAssessmentMaster as a prop
export default function DepreciationMasterMain({ selectedAssessmentMaster }) {
    const [selectedTab, setSelectedTab] = useState(0);

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    return (
        // Conditionally render the component based on the prop's value

        <Grid className="justify-content-center">
            {selectedAssessmentMaster === "depreciationMaster" && (
                <>
                    <Box className="p-0">
                        {/* Header */}
                        <div className="flex items-center justify-center mb-4 bg-[#f2f7ff] rounded-xl py-4">
                            <h1 className="text-2xl font-bold text-gray-800">Depreciation Master</h1>
                        </div>

                        {/* Tabs */}
                        <Tabs
                            value={selectedTab}
                            onChange={handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="standard"
                            className="bg-[#f1f5f9] rounded-md mb-4"
                        >
                            <Tab label="Depreciation by Chart" />
                            <Tab label="Add Depreciation Rates" />
                        </Tabs>

                        {/* Tab Panels */}
                        <Box hidden={selectedTab !== 0}>
                            <DepreciationByChartMaster />
                        </Box>
                        <Box hidden={selectedTab !== 1}>
                            <AddDepreciationRatesMaster />
                        </Box>
                    </Box>
                </>
            )}
        </Grid>


    );
}

