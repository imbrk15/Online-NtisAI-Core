// src/pages/MasterCards.jsx
import React, { useState, useEffect } from "react";
import { FaBalanceScale, FaTools, FaFileAlt } from "react-icons/fa";
import {
    Grid,
    TextField,
    MenuItem,
    InputAdornment, Box
} from "@mui/material";
import LayersIcon from "@mui/icons-material/Layers";
import DescriptionIcon from "@mui/icons-material/Description";
import BuildingMasterMain from "./CVMaster/BuildingRateMasterForCV/BuildingrateMasterMain";
import CitySurveyMain from "./CVMaster/CitySurveyMaster/CitySurveyMain";
import TypeOfUseMain from "./AssessmentMaster/TypeOfUseMaster/TypeOfUseMain";
import CVFactorsMain from "./CVMaster/CVFactors/CVFactorsMain";
import SubZoneMasterMain from "./CVMaster/SubZoneMaster/SubZoneMasterMain";
//import TaxMasterForCVMain from "./CVMaster/TaxMasterForCV/TaxMasterForCVMain";
import DepreciationMasterForCVMain from "./CVMaster/DepreciationMasterForCV/DepreciationMasterForCVMain";
import OpenPlotRateCVMain from "./CVMaster/OpenPlotRateCV/OpenPlotRateCVMain";
import ApplyTaxesMain from "./AssessmentMaster/ApplyTaxesMaster/ApplyTaxesMain";
import PropertyDescriptionMain from "./AssessmentMaster/PropertDescriptionAndValidation/PropertyDescriptionMain";
import ConstructionTypeMain from "./AssessmentMaster/ConstructionTypeMaster/ConstructionTypeMain";
import FloorMain from "./AssessmentMaster/Floor Master/FloorMain";
import ZoneMasterMain from "./AssessmentMaster/ZoneMaster/ZoneMasterMain";
import RateMasterMain from "./AssessmentMaster/RateMaster/RateMasterMain";
import Loader from "../../../Helpers/Loader/Loader";
import PenaltyMasterMain from "../Master/AMCMaster/PenaltyMaster/PenaltyMasterMain";
import CombineTaxMasterMain from "./CVMaster/CombineTaxMaster/CombineTaxMasterMain";
import ConditionMasterMain from "./AssessmentMaster/ConditioneMaster/ConditionMasterMain";
import DepreciationMasterMain from "./AssessmentMaster/Depreciation Master/DepreciationMasterMain";
// Reusable TileButton
const TileButton = ({ label, icon: Icon, bgClass, gradientBar, onClick }) => (
    <button
        onClick={onClick}
        className="relative flex items-center h-full rounded-[5px_15px_5px_15px] overflow-hidden shadow-md transition-all duration-300 pl-2.5 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 w-full"
    >
        {/* Left gradient accent bar */}
        <span
            aria-hidden
            className={`absolute inset-y-0 left-0 w-6 md:w-6 ${gradientBar}`}
        />

        {/* Card Content */}
        <div
            className={`relative z-[1] flex flex-col items-center justify-center gap-2 py-6 px-4 w-full rounded-[5px_15px_5px_15px] ${bgClass}`}
        >
            <Icon className="text-xl md:text-2xl group-hover:scale-110 transition-transform duration-300" />
            <span className="text-sm md:text-base font-semibold">{label}</span>
        </div>
    </button>
);

function MasterCards() {
    const [selected, setSelected] = useState("assessment");
    const CV_MASTERS_DROPDOWN = [
        { key: 'subzonemaster', name: 'Sub Zone Master' },
        { key: 'taxMasterCV', name: 'Combine Tax Master' },
        { key: 'depreciationCV', name: 'Depreciation Master for CV' },
        { key: 'openPlotRateCV', name: 'Open Plot Rate Master for CV' },
        { key: 'citySurveyCV', name: 'City Survey Master' },
        { key: 'buildingRateCV', name: 'Building Rate Master for CV' },
        { key: 'cvFactors', name: 'CV Factors' }
    ];
    const [selectedMaster, setSelectedMaster] = useState(CV_MASTERS_DROPDOWN[0].key);

    const AMC_MASTERS_DROPDOWN = [
        { key: 'penaltyMaster', name: 'Penalty Master' },
        { key: 'option2', name: 'AMC Option 2' },
        { key: 'option3', name: 'AMC Option 3' },
    ];
    const [selectedAMCMaster, setSelectedAMCMaster] = useState(AMC_MASTERS_DROPDOWN[0].key);

    const AssessmentMaster_DropDown = [
        { key: 'typeOfUseMaster', name: 'Type Of Use Master' },
        { key: 'applyTaxesMaster', name: 'Apply Taxes Master' },
        { key: 'floorMaster', name: 'Floor Master' },
        { key: 'constructionTypeMaster', name: 'Construction Type Master' },
        { key: 'zoneMaster', name: 'Zone Master' },
        { key: 'rateMaster', name: 'Rate Master' },
        { key: 'propertyDescription', name: 'Property Description & Type of Use Validation' },
        { key: 'conditionMaster', name: 'Condition Master' },
        { key: 'depreciationMaster', name: 'Depreciation Master' },
    ]
    const [selectedAssessmentMaster, setSelectedAssessmentMaster] = useState(AssessmentMaster_DropDown[0].key);

    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (selectedMaster || selectedAssessmentMaster || selected) {
            setLoading(true);
            const timer = setTimeout(() => setLoading(false), 100); // simulate API
            return () => clearTimeout(timer);
        }
    }, [selectedMaster, selectedAssessmentMaster, selected]);
    return (
        <div className="p-1 sm:p-2 lg:p-2">
            {/* Card Grid */}
            {loading && <Loader />}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {/* Assessment Master */}
                <TileButton
                    label="Assessment Master"
                    icon={FaBalanceScale}
                    bgClass="bg-gradient-to-br from-[#f2f7ff] via-[#bcd3ff] to-[#e6f0ff] text-slate-800"
                    gradientBar="bg-gradient-to-b from-[#3b5998] via-[#6a89cc] to-[#9fa8da]"
                    onClick={() => setSelected("assessment")}
                />

                {/* AMC Master */}
                <TileButton
                    label="AMC Master"
                    icon={FaTools}
                    bgClass="bg-gradient-to-br from-[#ededfa] via-[#d4d5f7] to-[#f7f7ff] text-[#4a3f1d]"
                    gradientBar="bg-gradient-to-b from-[#565793] via-[#bcbdf1] to-[#b8b8e5]"
                    onClick={() => setSelected("amc")}
                />

                {/* CV Master */}
                <TileButton
                    label="CV Master"
                    icon={FaFileAlt}
                    bgClass="bg-gradient-to-br from-[#ebfdff] via-[#bdecf3] to-[#f0fcff] text-black"
                    gradientBar="bg-gradient-to-b from-[#1b7b85] via-[#7ed6df] to-[#a5ede7]"
                    onClick={() => setSelected("cv")}
                />
            </div>

            {/* Expanded Section BELOW the cards */}
            <div className="mt-6 space-y-6">
                {selected === "assessment" && (
                    <div className="p-4 bg-white rounded-lg shadow overflow-x-auto">
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: { xs: "column", sm: "row" },
                                justifyContent: "space-between",
                                alignItems: { xs: "flex-start", sm: "center" },
                                p: 3,
                                mb: 4,
                                borderRadius: 2,
                                border: "1px solid #f2f7ff",
                                background: "linear-gradient(135deg, #f2f7ff, #bcd3ff, #e6f0ff)",
                                position: "relative",
                            }}
                        >
                            {/* Left border bar */}
                            <Box
                                sx={{
                                    position: "absolute",
                                    left: 0,
                                    top: 0,
                                    bottom: 0,
                                    width: "6px",                // thickness of the bar
                                    background: "linear-gradient(180deg, #3b5998, #6a89cc, #9fa8da)",
                                    borderTopLeftRadius: "8px",
                                    borderBottomLeftRadius: "8px",
                                }}
                            />

                            {/* Left: Icon + Title */}
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: { xs: 2, sm: 0 } }}>
                                <FaBalanceScale color="#3b5998" fontSize="1.6rem" />
                                <span style={{ fontWeight: 700, fontSize: "1.25rem" }}>Assessment Master</span>
                            </Box>

                            {/* Right: CV Masters Dropdown */}
                            <Grid sx={{ width: { xs: "100%", sm: "40%", md: "27%" } }}>
                                <TextField
                                    select
                                    fullWidth
                                    size="small"
                                    label="Assessment Master"
                                    variant="outlined"
                                    value={selectedAssessmentMaster}
                                    onChange={(e) => setSelectedAssessmentMaster(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LayersIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                >
                                    {AssessmentMaster_DropDown.map((item) => (
                                        <MenuItem key={item.key} value={item.key}>
                                            {item.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <Box mt={1} sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
                                    Choose a master to manage
                                </Box>
                            </Grid>
                        </Box>
                        <TypeOfUseMain selectedAssessmentMaster={selectedAssessmentMaster} />
                        <ApplyTaxesMain selectedAssessmentMaster={selectedAssessmentMaster} />
                        <PropertyDescriptionMain selectedAssessmentMaster={selectedAssessmentMaster} />
                        <ConstructionTypeMain selectedAssessmentMaster={selectedAssessmentMaster} />
                        <FloorMain selectedAssessmentMaster={selectedAssessmentMaster} />
                        <ZoneMasterMain selectedAssessmentMaster={selectedAssessmentMaster} />
                        <RateMasterMain selectedAssessmentMaster={selectedAssessmentMaster} />
                        <ConditionMasterMain selectedAssessmentMaster={selectedAssessmentMaster} />
                        <DepreciationMasterMain selectedAssessmentMaster={selectedAssessmentMaster} />
                    </div>
                )}
                {selected === "amc" && (
                    <div className="p-4 bg-white rounded-lg shadow">
                        {/* AMC Master Header */}
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                p: 3,
                                mb: 4,
                                borderRadius: 2,
                                border: "1px solid #f2f7ff",
                                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                                background:
                                    "linear-gradient(135deg, #ededfa, #d4d5f7, #f7f7ff)",
                                color: "black",
                                position: "relative",
                                overflow: "hidden",
                            }}
                        >
                            {/* Left border bar */}
                            <Box
                                sx={{
                                    position: "absolute",
                                    left: 0,
                                    top: 0,
                                    bottom: 0,
                                    width: "6px",
                                    background:
                                        "linear-gradient(180deg, #565793, #bcbdf1, #b8b8e5)",
                                    borderTopLeftRadius: "8px",
                                    borderBottomLeftRadius: "8px",
                                }}
                            />

                            {/* Left: Icon + Title */}
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={6}
                                sx={{ display: "flex", alignItems: "center", gap: 1 }}
                            >
                                <FaTools color="#565793" fontSize="1.8rem" />
                                <span style={{ fontWeight: 700, fontSize: "1.5rem" }}>
                                    AMC Master
                                </span>
                            </Grid>

                            {/* Right: AMC Masters Dropdown */}
                            <Grid item xs={12} sm={6} md={3}>
                                <TextField
                                    select
                                    fullWidth
                                    size="small"
                                    label="AMC Master"
                                    variant="outlined"
                                    value={selectedAMCMaster}
                                    onChange={(e) => setSelectedAMCMaster(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LayersIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                >
                                    {AMC_MASTERS_DROPDOWN.map((item) => (
                                        <MenuItem key={item.key} value={item.key}>
                                            {item.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <Box
                                    mt={1}
                                    sx={{ fontSize: "0.875rem", color: "text.secondary" }}
                                >
                                    Choose a master to manage
                                </Box>
                            </Grid>
                        </Box>
                        <PenaltyMasterMain selectedAMCMaster={selectedAMCMaster} />
                    </div>
                )}
                {selected === "cv" && (
                    <div className="p-2 bg-white rounded-lg shadow overflow-x-auto">
                        {/* CV Masters Header */}
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: { xs: "column", sm: "row" },
                                justifyContent: "space-between",
                                alignItems: { xs: "flex-start", sm: "center" },
                                p: 3,
                                mb: 4,
                                borderRadius: 2,
                                border: "1px solid #e5e7eb",
                                background: "linear-gradient(135deg, #ebfdff, #bdecf3, #f0fcff)",
                                position: "relative",
                            }}
                        >
                            {/* Left border bar */}
                            <Box
                                sx={{
                                    position: "absolute",
                                    left: 0,
                                    top: 0,
                                    bottom: 0,
                                    width: "6px",                // thickness of the bar
                                    background: "linear-gradient(180deg, #1b7b85, #7ed6df, #a5ede7)",
                                    borderTopLeftRadius: "8px",
                                    borderBottomLeftRadius: "8px",
                                }}
                            />

                            {/* Left: Icon + Title */}
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: { xs: 2, sm: 0 } }}>
                                <DescriptionIcon color="success" style={{ fontSize: "1.6rem" }} />
                                <span style={{ fontWeight: 600, fontSize: "1.25rem" }}>CV Master</span>
                            </Box>

                            {/* Right: CV Masters Dropdown */}
                            <Grid sx={{ width: { xs: "100%", sm: "40%", md: "27%" } }}>
                                <TextField
                                    select
                                    fullWidth
                                    size="small"
                                    label="Select CV Master"
                                    variant="outlined"
                                    value={selectedMaster}
                                    onChange={(e) => setSelectedMaster(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LayersIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                >

                                    {CV_MASTERS_DROPDOWN.map((item) => (
                                        <MenuItem key={item.key} value={item.key}>
                                            {item.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        </Box>
                        <SubZoneMasterMain selectedMaster={selectedMaster} />
                        <CVFactorsMain selectedMaster={selectedMaster} setSelectedMaster={setSelectedMaster} />
                        <BuildingMasterMain selectedMaster={selectedMaster} />
                        <CitySurveyMain selectedMaster={selectedMaster} />
                        <CombineTaxMasterMain selectedMaster={selectedMaster} />
                        <DepreciationMasterForCVMain selectedMaster={selectedMaster} />
                        <OpenPlotRateCVMain selectedMaster={selectedMaster} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default MasterCards;
