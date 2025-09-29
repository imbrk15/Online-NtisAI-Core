import React from "react";
import {
    Grid,
} from "@mui/material";
import ConstructionTypeMaster from "./ConstructionTypeMaster";
export default function ConstructionTypeMain({ selectedAssessmentMaster }) {
    return (
        <Grid className="justify-content-center">
            {selectedAssessmentMaster === "constructionTypeMaster" && (
                <>
                    <ConstructionTypeMaster/>
                </>
            )}
        </Grid>
    );
}