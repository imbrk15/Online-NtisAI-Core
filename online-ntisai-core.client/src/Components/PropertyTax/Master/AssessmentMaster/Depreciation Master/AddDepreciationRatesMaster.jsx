


import React, { useState } from "react";
import {
    Grid,
    TextField,
    MenuItem,
    InputAdornment,
    Box,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PercentIcon from "@mui/icons-material/Percent";
import CustomButton from "../../../../../Helpers/ExtraProperties/CustomButtons";
import MasterCustomTable from "../../../../../Helpers/ExtraProperties/MasterCustomTable";
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';
import SourceOutlinedIcon from '@mui/icons-material/SourceOutlined';
import SearchIcon from '@mui/icons-material/Search';
import YearPickerField from "../../../../../Helpers/ExtraProperties/YearPickerField";
import { ValidationProvider } from "../../../../../Contexts/ValidationContext";
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';

export default function AddDepreciationRatesMaster() {
    const [formData, setFormData] = useState({
        constructionID: "",
        minYear: "",
        maxYear: "",
        rate: "",
        year: "",
    });

    const [rows, setRows] = useState([
        {
            id: 1,
            constructionID: "A1",
            minYear: "2024",
            maxYear: "2030",
            rate: "5.00",
            year: "2024",
        },
    ]);

    const [selectedIndex, setSelectedIndex] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [isEditMode, setIsEditMode] = useState(false);

    const columns = [
        { key: "constructionID", header: "Construction ID", isPrimary: true },
        { key: "minYear", header: "Min Year" },
        { key: "maxYear", header: "Max Year" },
        { key: "rate", header: "Rate (%)" },
        { key: "year", header: "Year" },
    ];

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSave = () => {
        const allFieldsFilled = Object.values(formData).every((v) => v !== "");
        if (!allFieldsFilled) return;

        setRows([{ id: Date.now(), ...formData }, ...rows]);
        handleClear();
    };

    const handleUpdate = () => {
        if (selectedIndex !== null) {
            const updatedRows = [...rows];
            updatedRows[selectedIndex] = { ...formData, id: updatedRows[selectedIndex].id };
            setRows(updatedRows);
            handleClear();
        }
    };

    const handleDelete = (index) => {
        const updated = [...rows];
        updated.splice(index, 1);
        setRows(updated);
        handleClear();
    };

    const handleClear = () => {
        setFormData({
            constructionID: "",
            minYear: "",
            maxYear: "",
            rate: "",
            year: "",
        });
        setSelectedIndex(null);
        setIsEditMode(false);
    };

    const handleNew = () => {
        handleClear();
    };

    const handleRowClick = (index, row) => {
        setFormData(row);
        setSelectedIndex(index);
        setIsEditMode(true);
    };

    const filteredRows = rows.filter((row) =>
        Object.values(row).some((val) =>
            val.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    // Validation rules for the buttons
    const validationRules = {
        save: () =>
            !isEditMode &&
            Object.values(formData).every(
                (val) => val !== null && val.toString().trim() !== ""
            ),
        updated: () =>
            isEditMode &&
            selectedIndex !== null &&
            Object.values(formData).every(
                (val) => val !== null && val.toString().trim() !== ""
            ),
        delete: () => isEditMode && selectedIndex !== null,
        clear: () =>
            Object.values(formData).some(
                (val) => val !== null && val.toString().trim() !== ""
            ) || isEditMode,
        new: () => isEditMode,
    };


    return (
        <Box
            sx={{
                /* make the component height follow its content (don't stretch) */
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#fff",
                width: "100%",
                overflow: "hidden",
                margin: 0,
                padding: 2,
                pb: 0,
                mb: 0,
                flexGrow: 0,
            }}
        >
            {/* Form Section */}
            <Box
                className="border p-4  mb-6 rounded-xl"
                sx={{
                    /* Important: do not let this box grow to fill any parent */
                    flexGrow: 0,
                    mb: 0,
                    pb: 0,
                    overflow: "hidden"
                    
                }}
            >
                <h2 className="font-bold text-lg mb-4 flex items-center">
                    < TrendingUpOutlinedIcon className="text-blue-500 mr-2" size={24} />
                    Add Depreciation Rates
                </h2>

 

                <Grid container spacing={2} className="mb-6">

                    {/* Construction ID Field */}
                    <Grid item xs={12} sm={6} md={3} sx={{ flexBasis: { xs: '100%', sm: '45%', md: '15%' }, maxWidth: { xs: '100%', sm: '45%', md: '15%' }, mb: 2 }}>
                        <TextField
                            id="constructionID"
                            select
                            fullWidth
                            size="small"
                            variant="outlined"
                            label="Select Construction ID"
                            value={formData.constructionID || "select_construction"}
                            onChange={(e) => handleChange("constructionID", e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <ApartmentRoundedIcon />
                                    </InputAdornment>
                                ),
                            }}
                        //  sx={{ minWidth: 200 }}
                        >
                            <MenuItem value="select_construction" disabled>
                                Select Construction ID
                            </MenuItem>
                            <MenuItem value="A1">A1</MenuItem>
                            <MenuItem value="A2">A2</MenuItem>
                            <MenuItem value="B1">B1</MenuItem>
                        </TextField>
                    </Grid>

                    {/* Min Year Field */}
                    <Grid item xs={12} sm={6} md={3} sx={{ flexBasis: { xs: '100%', sm: '45%', md: '15%' }, maxWidth: { xs: '100%', sm: '45%', md: '15%' }, mb: 2 }}>
                        <TextField
                            fullWidth
                            size="small"
                            label="Min Year"
                            placeholder="e.g.- 1998"
                            value={formData.minYear}
                            onChange={(e) => handleChange("minYear", e.target.value)}
                            inputProps={{ inputMode: "numeric", pattern: "\\d{4}", maxLength: 4 }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <CalendarMonthIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>

                    {/* Max Year Field */}
                    <Grid item xs={12} sm={6} md={3} sx={{ flexBasis: { xs: '100%', sm: '45%', md: '15%' }, maxWidth: { xs: '100%', sm: '45%', md: '15%' }, mb: 2 }}>
                        <TextField
                            fullWidth
                            size="small"
                            label="Max Year"
                            placeholder="e.g.- 2025"
                            value={formData.maxYear}
                            onChange={(e) => handleChange("maxYear", e.target.value)}
                            inputProps={{ inputMode: "numeric", pattern: "\\d{4}", maxLength: 4 }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <CalendarMonthIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>

                    {/* Rate Field */}
                    <Grid item xs={12} sm={6} md={3} sx={{ flexBasis: { xs: '100%', sm: '45%', md: '15%' }, maxWidth: { xs: '100%', sm: '45%', md: '15%' }, mb: 2 }}>
                        <TextField
                            fullWidth
                            size="small"
                            label="Rate (%)"
                            value={formData.rate}
                            onChange={(e) => handleChange("rate", e.target.value)}
                            placeholder="10.00"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PercentIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>

                    {/* Year Picker Field */}
                    {/*<Grid item xs={12} sm={6} md={3} sx={{ flexBasis: { xs: '100%', sm: '45%', md: '15%' }, maxWidth: { xs: '100%', sm: '45%', md: '15%' }, mb: 2 }}>*/}
                    {/*    <YearPickerField*/}
                    {/*        year={formData.year}*/}
                    {/*        setYear={(newYear) => handleChange("year", newYear)}*/}
                    {/*        style={{ width: "100%" }} // Make the Year Picker Field fill the available width*/}
                    {/*    />*/}
                    {/*</Grid>*/}

                    <YearPickerField
                        year={formData.year}
                        setYear={(newYear) => handleChange("year", newYear)}
                        gridProps={{
                            flexBasis: { xs: "100%", sm: "45%", md: "15%" },
                            maxWidth: { xs: "100%", sm: "45%", md: "15%" },
                            mb: 2,
                        }}
                    />


                </Grid>


                {/* Buttons */}
                <div className="flex gap-3 mb-4 flex-wrap">
                    <ValidationProvider rules={validationRules}>
                        <CustomButton type="new" onClick={handleNew} style={{ width: "100px" }}>
                            New
                        </CustomButton>
                        <CustomButton type="save" onClick={handleSave} style={{ width: "100px" }}>
                            Save
                        </CustomButton>
                        {isEditMode && (
                            <>
                                <CustomButton type="updated" onClick={handleUpdate} style={{ width: "100px" }}>
                                    Update
                                </CustomButton>
                                <CustomButton type="clear" onClick={handleClear} style={{ width: "100px" }}>
                                    Clear
                                </CustomButton>
                            </>
                        )}
                        <CustomButton type="delete" onClick={() => handleDelete(selectedIndex)} style={{ width: "100px" }} disabled={!isEditMode}>
                            Delete
                        </CustomButton>
                    </ValidationProvider>
                </div>

                {/* Table Section: wrapper prevents TableContainer from forcing a min-height */}
                <Box
                    sx={{
                        mb: 0,
                        pb: 0,
                        "& .MuiTableContainer-root": {
                            minHeight: "unset !important",
                            maxHeight: "none !important",
                        },
                    }}
                >
                    <MasterCustomTable
                        columns={columns}
                        data={filteredRows}
                        onEdit={(index, row) => handleRowClick(index, row)}
                        onDelete={(index) => handleDelete(index)}
                        onRowClick={handleRowClick}
                        editIndex={selectedIndex}
                    />
                </Box>
            </Box>
        </Box>
    );
}

