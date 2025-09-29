import React from "react";
import {
    Grid,
} from "@mui/material";
import TypeofUseMasterContent from "./TypeofUseMasterContent"
export default function TypeOfUseMain({ selectedAssessmentMaster }){
    return (
        <Grid className="justify-content-center">
            {selectedAssessmentMaster === "typeOfUseMaster" && (
                <>
                   <TypeofUseMasterContent/>
                </>
            )}
        </Grid>
    );
}