import React from "react";
import {
    Grid,
} from "@mui/material";
import FloorMaster from "./FloorMaster"
export default function FloorMain({ selectedAssessmentMaster }) {
    return (
        <Grid className="justify-content-center">
            {selectedAssessmentMaster === "floorMaster" && (
                <>
                   <FloorMaster/>
                </>
            )}
        </Grid>
    );
}