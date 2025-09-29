// src/Components/AssessmentMaster/RateMaster/RateMasterMain.jsx
import React, { useState } from "react";
import {
    Box,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    Typography,
    Grid,
} from "@mui/material";
import RVRatebyMultiplierMain from "./RVRatebyMultiplier/RVRatebyMultiplierMain";
import YearlyRateMain from "./YearlyRate/YearlyRateMain";
import ZoneSectionWiseOpenPlotRateMasterMain from "./ZoneSectionWiseOpenPlotRateMaster/ZoneSectionWiseOpenPlotRateMasterMain";

export default function RateMasterMain({ selectedAssessmentMaster }) {
    const [selected, setSelected] = useState("rvRatebyMultiplier");

    return (
        <Grid className="justify-content-center">
            {selectedAssessmentMaster === "rateMaster" && (
                <Box className="px-0 bg-white">
                    {/* Header */}
                    <Box
                        className="rounded-xl"
                        sx={{
                            mb: 2,
                            px: 2,
                            py: 2.5,
                            background: "#f2f7ff",
                        }}
                    >
                        <Grid container alignItems="center" justifyContent="center">
                            <Grid item>
                                <Typography
                                    variant="h4"
                                    sx={{ fontWeight: 800, fontSize: { xs: 20, md: 24 } }}
                                >
                                    Rate Master
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>

                    {/* Radio Button Switch */}
                    <Box
                        elevation={0}
                        className="p-1 mb-1 bg-white rounded-lg "
                    >
                        <FormControl component="fieldset" fullWidth>
                            <Grid container justifyContent="center">
                                <RadioGroup
                                    row
                                    value={selected}
                                    onChange={(e) => setSelected(e.target.value)}
                                >
                                    <FormControlLabel
                                        value="rvRatebyMultiplier"
                                        control={<Radio color="primary" />}
                                        label="RV Rate by Multiplier"

                                    />
                                    <FormControlLabel
                                        value="yearlyRate"
                                        control={<Radio color="primary" />}
                                        label="Yearly Rates"

                                    />
                                    <FormControlLabel
                                        value="zoneSectionWiseOpenPlotRateMaster"
                                        control={<Radio color="primary" />}
                                        label="Zone Section Wise Open Plot Rate Master"

                                    />
                                </RadioGroup>
                            </Grid>
                        </FormControl>

                        {/* Components */}
                        <RVRatebyMultiplierMain selectedMaster={selected} />
                        <YearlyRateMain selectedMaster={selected} />
                        <ZoneSectionWiseOpenPlotRateMasterMain selectedMaster={selected} />
                    </Box>
                </Box>
            )}
        </Grid>
    );
}
