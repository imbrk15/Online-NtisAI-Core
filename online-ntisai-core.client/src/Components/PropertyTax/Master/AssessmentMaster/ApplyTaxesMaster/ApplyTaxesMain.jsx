import React from "react";
import {
    Grid,
} from "@mui/material";
import ApplyTaxesMasterContent from "./ApplyTaxesMasterContent"
export default function ApplyTaxesMain({ selectedAssessmentMaster }) {
    return (
        <Grid className="justify-content-center">
            {selectedAssessmentMaster === "applyTaxesMaster" && (
                <>
                    <ApplyTaxesMasterContent/>
                </>
            )}
        </Grid>
    );
}