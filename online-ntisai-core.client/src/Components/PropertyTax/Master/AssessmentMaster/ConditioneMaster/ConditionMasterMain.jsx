import React from "react";
import { Grid } from "@mui/material";
import ConditionMasterContent from "./ConditionMasterContent"

export default function ConditionMasterMain({ selectedAssessmentMaster }) {
    return (
        <Grid className="justify-content-center">
            {selectedAssessmentMaster === "conditionMaster" && (
                <>
                    <ConditionMasterContent />
                </>
            )}
        </Grid>
    );
}
