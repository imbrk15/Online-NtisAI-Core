import React from "react"
import {
    Grid,
} from "@mui/material";
import BuildingRateCV from "./BuildingRateCV";
export default function BuildingMasterMain({selectedMaster}) {
    return (
        <Grid className="justify-content-center">
            {selectedMaster === "buildingRateCV" &&(
                <>
                    <BuildingRateCV/>
                </>
            )}
        </Grid>
    );
}