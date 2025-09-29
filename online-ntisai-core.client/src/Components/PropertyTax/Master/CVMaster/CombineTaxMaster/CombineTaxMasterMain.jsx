import React, { useState } from "react";
import {
    Box,
    RadioGroup,
    FormControlLabel,
    Radio,
} from "@mui/material";
import TaxMasterForRVMain from "./TaxMasterForRV/TaxMasterForRVMain";
import TaxMasterForCVMain from "./TaxMasterForCV/TaxMasterForCVMain";

const CombineTaxMasterMain = ({ selectedMaster }) => {
    const [valuationBasis, setValuationBasis] = useState("RV");
    if (selectedMaster !== "taxMasterCV") return null;

    return (
        <div className="p-2 md:p-4">
            {/* Header */}
            <div className="mb-4 rounded-xl bg-[#effef0]">
                <div
                    className="
                        flex flex-col md:flex-row 
                        items-center md:items-center 
                        justify-between md:justify-between 
                        gap-3 md:gap-6 
                        px-4 py-3
                        "
                >
                    {/* Title */}
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 text-center md:text-center">
                        Combine Tax Master
                    </h1>

                    {/* Radios */}
                    <RadioGroup
                        row
                        value={valuationBasis}
                        onChange={(e) => setValuationBasis(e.target.value)}
                        aria-label="valuation-basis"
                        name="valuation-basis"
                        className="flex flex-wrap justify-center md:justify-end gap-2"
                    >
                        <FormControlLabel
                            value="RV"
                            control={<Radio size="small" />}
                            label="RV (Rental Value)"
                        />
                        <FormControlLabel
                            value="CV"
                            control={<Radio size="small" />}
                            label="CV (Capital Value)"
                        />
                    </RadioGroup>
                </div>
            </div>

            {/* Render Content */}
            <Box className="mt-6 w-full">
                <div className="w-full overflow-x-auto">
                    {valuationBasis === "RV" ? <TaxMasterForRVMain /> : <TaxMasterForCVMain />}
                </div>
            </Box>
        </div>

    );
};

export default CombineTaxMasterMain;
