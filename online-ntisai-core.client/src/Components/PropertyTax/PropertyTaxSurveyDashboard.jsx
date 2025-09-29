import React from "react";
import TabPills from "./TopCards/TabPills";
import { FaSearch } from "react-icons/fa";
import PropertyAssesmentStatus from "./Charts/PropertyAssesmentStatus";
import PropertyDistribution from "./Charts/PropertyDistribution";
import MonthlyCollectionTrend from "./Charts/MonthlyCollectionTrend";
import CollectionByZone from "./Charts/CollectionByZone";
import YearwiseCollectionComparison from "./Charts/YearwiseCollectionComparison";
import { useNavigate } from "react-router-dom";

// MUI Imports
import { Button, Card, Typography, Box } from "@mui/material";
import CustomButton from "../../Helpers/ExtraProperties/CustomButtons";

function PropertyTaxSurveyDashboard() {
    const navigate = useNavigate();

    const handleSearchClick = () => {
        navigate("/propertyTax/propertySearch");
    };

    return (
        <>
            <div className="space-y-6">
                <div className="flex items-center justify-between mt-3 md:mt-4">
                    <div className="flex-1  mt-3 md:mt-4">
                        <TabPills />
                    </div>
                </div>

                <div className="card p-6">
                    <h2 className="text-lg font-semibold">Survey Dashboard</h2>
                    <p className="text-slate-600 mt-2">
                        Module content TBD. Graphs and Search Property are{" "}
                        <strong>not</strong> shown here.
                    </p>
                </div>
            </div>
        </>
        //<Box className="space-y-6">
        //    {/* Row 1: ONLY the buttons/tiles */}
        //    <Box className="mt-3 md:mt-4 mx-4">
        //        <TabPills />
        //    </Box>

        //    {/* Card container for Dashboard */}
        //    <Card elevation={0} className="md:p-8 space-y-8 rounded-[10px]" style={{ backgroundColor: "#f9f9f9" }}>
        //        {/* Row 2: Header + Search */}
        //        <Box className="flex items-center justify-between flex-wrap gap-4">
        //            <div className="flex-1 hidden md:block" />

        //            <Typography
        //                variant="h6"
        //                className="text-slate-700 text-center flex-1"
        //            >
        //                Survey Dashboard
        //            </Typography>

        //            <Box className="flex-1 flex justify-end">
        //                <CustomButton type="search" onClick={handleSearchClick}>
        //                    Search Property
        //                </CustomButton>
        //            </Box>
        //        </Box>

        //        {/* Graphs Section */}
        //        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        //            {/* Assessment Status takes 2 cols on xl */}
        //            <div className="xl:col-span-2">
        //                <PropertyAssesmentStatus />
        //            </div>
        //            <div>
        //                <PropertyDistribution />
        //            </div>
        //        </div>

        //        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        //            <MonthlyCollectionTrend />
        //            <CollectionByZone />
        //            <YearwiseCollectionComparison />
        //        </div>
        //    </Card>
        //</Box>
    );
}

export default PropertyTaxSurveyDashboard;
