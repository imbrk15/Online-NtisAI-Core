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
import { usePermission } from "../../../Contexts/PermissionContext"; // Add this import

// Reusable TileButton with permission check
const TileButton = ({ label, icon: Icon, bgClass, gradientBar, onClick, hasPermission }) => {
    if (!hasPermission) return null;

    return (
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
};

// Component with permission wrapper
const PermissionWrapper = ({ componentKey, requiredLevel = 'view', children }) => {
    const { hasComponentPermission } = usePermission();

    if (!hasComponentPermission(componentKey, requiredLevel)) {
        return null;
    }

    return children;
};

function MasterCards() {
    const { hasComponentPermission } = usePermission();
    const [selected, setSelected] = useState("assessment");
    const CV_MASTERS_DROPDOWN = [
        { key: 'subzonemaster', name: 'Sub Zone Master', permissionKey: 'subzone_master' },
        { key: 'taxMasterCV', name: 'Combine Tax Master', permissionKey: 'combine_tax_master' },
        { key: 'depreciationCV', name: 'Depreciation Master for CV', permissionKey: 'depreciation_cv_master' },
        { key: 'openPlotRateCV', name: 'Open Plot Rate Master for CV', permissionKey: 'open_plot_rate_master' },
        { key: 'citySurveyCV', name: 'City Survey Master', permissionKey: 'city_survey_master' },
        { key: 'buildingRateCV', name: 'Building Rate Master for CV', permissionKey: 'building_rate_master' },
        { key: 'cvFactors', name: 'CV Factors', permissionKey: 'cv_factors_master' }
    ];
    const [selectedMaster, setSelectedMaster] = useState(CV_MASTERS_DROPDOWN[0].key);

    const AMC_MASTERS_DROPDOWN = [
        { key: 'penaltyMaster', name: 'Penalty Master', permissionKey: 'penalty_master' },
        { key: 'option2', name: 'AMC Option 2', permissionKey: 'amc_option2_master' },
        { key: 'option3', name: 'AMC Option 3', permissionKey: 'amc_option3_master' },
    ];
    const [selectedAMCMaster, setSelectedAMCMaster] = useState(AMC_MASTERS_DROPDOWN[0].key);

    const AssessmentMaster_DropDown = [
        { key: 'typeOfUseMaster', name: 'Type Of Use Master', permissionKey: 'type_of_use_master' },
        { key: 'applyTaxesMaster', name: 'Apply Taxes Master', permissionKey: 'apply_taxes_master' },
        { key: 'floorMaster', name: 'Floor Master', permissionKey: 'floor_master' },
        { key: 'constructionTypeMaster', name: 'Construction Type Master', permissionKey: 'construction_type_master' },
        { key: 'zoneMaster', name: 'Zone Master', permissionKey: 'zone_master' },
        { key: 'rateMaster', name: 'Rate Master', permissionKey: 'rate_master' },
        { key: 'propertyDescription', name: 'Property Description & Type of Use Validation', permissionKey: 'property_description_master' },
        { key: 'conditionMaster', name: 'Condition Master', permissionKey: 'condition_master' },
        { key: 'depreciationMaster', name: 'Depreciation Master', permissionKey: 'depreciation_master' },
    ]
    const [selectedAssessmentMaster, setSelectedAssessmentMaster] = useState(AssessmentMaster_DropDown[0].key);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (selectedMaster || selectedAssessmentMaster || selected) {
            setLoading(true);
            const timer = setTimeout(() => setLoading(false), 100);
            return () => clearTimeout(timer);
        }
    }, [selectedMaster, selectedAssessmentMaster, selected]);

    // Filter dropdowns based on permissions
    const filteredCVDropdown = CV_MASTERS_DROPDOWN.filter(item =>
        hasComponentPermission(item.permissionKey)
    );

    const filteredAMCDropdown = AMC_MASTERS_DROPDOWN.filter(item =>
        hasComponentPermission(item.permissionKey)
    );

    const filteredAssessmentDropdown = AssessmentMaster_DropDown.filter(item =>
        hasComponentPermission(item.permissionKey)
    );

    // If user has no permissions for any master section, show message
    if (!hasComponentPermission('assessment_master_access') &&
        !hasComponentPermission('amc_master_access') &&
        !hasComponentPermission('cv_master_access')) {
        return (
            <div className="p-4 text-center">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <FaTools className="text-yellow-600 text-3xl mx-auto mb-3" />
                    <h3 className="text-lg font-semibold text-yellow-800">No Access</h3>
                    <p className="text-yellow-700">You don't have permission to access any master sections.</p>
                    <p className="text-yellow-600 text-sm mt-2">Please contact your administrator for access.</p>
                </div>
            </div>
        );
    }

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
                    hasPermission={hasComponentPermission('assessment_master_access')}
                />

                {/* AMC Master */}
                <TileButton
                    label="AMC Master"
                    icon={FaTools}
                    bgClass="bg-gradient-to-br from-[#ededfa] via-[#d4d5f7] to-[#f7f7ff] text-[#4a3f1d]"
                    gradientBar="bg-gradient-to-b from-[#565793] via-[#bcbdf1] to-[#b8b8e5]"
                    onClick={() => setSelected("amc")}
                    hasPermission={hasComponentPermission('amc_master_access')}
                />

                {/* CV Master */}
                <TileButton
                    label="CV Master"
                    icon={FaFileAlt}
                    bgClass="bg-gradient-to-br from-[#ebfdff] via-[#bdecf3] to-[#f0fcff] text-black"
                    gradientBar="bg-gradient-to-b from-[#1b7b85] via-[#7ed6df] to-[#a5ede7]"
                    onClick={() => setSelected("cv")}
                    hasPermission={hasComponentPermission('cv_master_access')}
                />
            </div>

            {/* Expanded Section BELOW the cards */}
            <div className="mt-6 space-y-6">
                {selected === "assessment" && hasComponentPermission('assessment_master_access') && (
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
                                    width: "6px",
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

                            {/* Right: Assessment Masters Dropdown */}
                            {filteredAssessmentDropdown.length > 0 ? (
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
                                        {filteredAssessmentDropdown.map((item) => (
                                            <MenuItem key={item.key} value={item.key}>
                                                {item.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <Box mt={1} sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
                                        Choose a master to manage
                                    </Box>
                                </Grid>
                            ) : (
                                <Box sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                                    No accessible assessment components
                                </Box>
                            )}
                        </Box>

                        {/* Wrap each component with PermissionWrapper */}
                        <PermissionWrapper componentKey="type_of_use_master">
                            <TypeOfUseMain selectedAssessmentMaster={selectedAssessmentMaster} />
                        </PermissionWrapper>
                        <PermissionWrapper componentKey="apply_taxes_master">
                            <ApplyTaxesMain selectedAssessmentMaster={selectedAssessmentMaster} />
                        </PermissionWrapper>
                        <PermissionWrapper componentKey="property_description_master">
                            <PropertyDescriptionMain selectedAssessmentMaster={selectedAssessmentMaster} />
                        </PermissionWrapper>
                        <PermissionWrapper componentKey="construction_type_master">
                            <ConstructionTypeMain selectedAssessmentMaster={selectedAssessmentMaster} />
                        </PermissionWrapper>
                        <PermissionWrapper componentKey="floor_master">
                            <FloorMain selectedAssessmentMaster={selectedAssessmentMaster} />
                        </PermissionWrapper>
                        <PermissionWrapper componentKey="zone_master">
                            <ZoneMasterMain selectedAssessmentMaster={selectedAssessmentMaster} />
                        </PermissionWrapper>
                        <PermissionWrapper componentKey="rate_master">
                            <RateMasterMain selectedAssessmentMaster={selectedAssessmentMaster} />
                        </PermissionWrapper>
                        <PermissionWrapper componentKey="condition_master">
                            <ConditionMasterMain selectedAssessmentMaster={selectedAssessmentMaster} />
                        </PermissionWrapper>
                        <PermissionWrapper componentKey="depreciation_master">
                            <DepreciationMasterMain selectedAssessmentMaster={selectedAssessmentMaster} />
                        </PermissionWrapper>
                    </div>
                )}

                {selected === "amc" && hasComponentPermission('amc_master_access') && (
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
                                background: "linear-gradient(135deg, #ededfa, #d4d5f7, #f7f7ff)",
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
                                    background: "linear-gradient(180deg, #565793, #bcbdf1, #b8b8e5)",
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
                            {filteredAMCDropdown.length > 0 ? (
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
                                        {filteredAMCDropdown.map((item) => (
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
                            ) : (
                                <Box sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                                    No accessible AMC components
                                </Box>
                            )}
                        </Box>
                        <PermissionWrapper componentKey="penalty_master">
                            <PenaltyMasterMain selectedAMCMaster={selectedAMCMaster} />
                        </PermissionWrapper>
                        {/* Add other AMC components with PermissionWrapper as needed */}
                    </div>
                )}

                {selected === "cv" && hasComponentPermission('cv_master_access') && (
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
                                    width: "6px",
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
                            {filteredCVDropdown.length > 0 ? (
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
                                        {filteredCVDropdown.map((item) => (
                                            <MenuItem key={item.key} value={item.key}>
                                                {item.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                            ) : (
                                <Box sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                                    No accessible CV components
                                </Box>
                            )}
                        </Box>

                        {/* Wrap each CV component with PermissionWrapper */}
                        <PermissionWrapper componentKey="subzone_master">
                            <SubZoneMasterMain selectedMaster={selectedMaster} />
                        </PermissionWrapper>
                        <PermissionWrapper componentKey="cv_factors_master">
                            <CVFactorsMain selectedMaster={selectedMaster} setSelectedMaster={setSelectedMaster} />
                        </PermissionWrapper>
                        <PermissionWrapper componentKey="building_rate_master">
                            <BuildingMasterMain selectedMaster={selectedMaster} />
                        </PermissionWrapper>
                        <PermissionWrapper componentKey="city_survey_master">
                            <CitySurveyMain selectedMaster={selectedMaster} />
                        </PermissionWrapper>
                        <PermissionWrapper componentKey="combine_tax_master">
                            <CombineTaxMasterMain selectedMaster={selectedMaster} />
                        </PermissionWrapper>
                        <PermissionWrapper componentKey="depreciation_cv_master">
                            <DepreciationMasterForCVMain selectedMaster={selectedMaster} />
                        </PermissionWrapper>
                        <PermissionWrapper componentKey="open_plot_rate_master">
                            <OpenPlotRateCVMain selectedMaster={selectedMaster} />
                        </PermissionWrapper>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MasterCards;