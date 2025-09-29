import React from "react";
import { Grid } from "@mui/material";
import PenaltyMasterContent from "./PenaltyMasterContent";

export default function PenaltyMasterMain({ selectedAMCMaster }) {
    return (
        <Grid className="justify-content-center">
            {selectedAMCMaster === "penaltyMaster" && (
                <>
                    <PenaltyMasterContent />
                </>
            )}
        </Grid>
    );
}
