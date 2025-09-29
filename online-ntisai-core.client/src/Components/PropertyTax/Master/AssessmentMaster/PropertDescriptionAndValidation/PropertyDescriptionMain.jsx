import React from "react";
import {
    Grid,
} from "@mui/material";
import PropertyDescriptionContent from "./PropertyDescriptionContent";
export default function PropertyDescriptionMain({ selectedAssessmentMaster }) {
    return (
        <Grid className="justify-content-center">
            {selectedAssessmentMaster === "propertyDescription" && (
                <>
                   <PropertyDescriptionContent/>
                </>
            )}
        </Grid>
    );
}