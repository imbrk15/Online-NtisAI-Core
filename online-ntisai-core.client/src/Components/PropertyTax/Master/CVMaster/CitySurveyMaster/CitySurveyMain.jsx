import React from "react"
import {
    Grid,
} from "@mui/material";
import CitySurveyTable from "./CitySurveyTable"
export default function CitySurveyMain({selectedMaster}) {
    return (
        <Grid className="justify-content-center">
            {selectedMaster === "citySurveyCV" && (
                <>
                    <CitySurveyTable/>
                </>
            )}
        </Grid>
    );
}