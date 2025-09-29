// src/Components/AssessmentMaster/YearlyRate/YearlyRateContent.jsx
import React, { useState } from "react";
import {
    Grid,
    TextField,
    MenuItem,
    InputAdornment,
    Typography,
    Box,
    Popover,
} from "@mui/material";

import CustomButton from "../../../../../../Helpers/ExtraProperties/CustomButtons";
import RateMasterCustomTable from "../../../../../../Helpers/ExtraProperties/RateMasterCustomTable";
import { ValidationProvider } from "../../../../../../Contexts/ValidationContext";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CategoryIcon from "@mui/icons-material/Category";

import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { YearCalendar } from "@mui/x-date-pickers/YearCalendar";
import ApartmentIcon from "@mui/icons-material/Apartment";

const columns = [
    { key: "type", header: "Construction Type" },
    { key: "z001", header: "Z001" },
    { key: "z002", header: "Z002" },
    { key: "z003", header: "Z003" },
    { key: "z004", header: "Z004" },
    { key: "z005", header: "Z005" },
    { key: "z006", header: "Z006" },
];

const defaultRows = [
    { type: "RCC Frame Structure", z001: 850, z002: 800, z003: 790, z004: 700, z005: 650, z006: 600 },
    { type: "Load Bearing Structure", z001: 750, z002: 700, z003: 650, z004: 600, z005: 350, z006: 350 },
    { type: "Steel Frame Structure", z001: 900, z002: 850, z003: 800, z004: 750, z005: 700, z006: 650 },
    { type: "Wooden Structure", z001: 400, z002: 380, z003: 350, z004: 340, z005: 320, z006: 350 },
    { type: "Composite Structure", z001: 800, z002: 750, z003: 700, z004: 650, z005: 600, z006: 500 },
];

export default function YearlyRateContent() {
    const [rows] = useState(defaultRows);

    // Form states
    const [zoneSection, setZoneSection] = useState("");
    const [yearRange, setYearRange] = useState("");
    const [type, setType] = useState("");
    const [year, setYear] = useState("");

    // Year picker popover
    const [anchorEl, setAnchorEl] = useState(null);
    const openYear = Boolean(anchorEl);

    const handleOpenYearPicker = (e) => setAnchorEl(e.currentTarget);
    const handleCloseYearPicker = () => setAnchorEl(null);
    const handleYearSelect = (newYear) => {
        if (newYear) setYear(newYear.year().toString());
        handleCloseYearPicker();
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box className="mt-2">
                <Box className="p-2 bg-[#f2f7ff96] rounded-xl">
                    {/* Header */}
                    <Box
                        className="rounded-xl"
                        sx={{
                            mb: 2,
                            px: 2,
                            py: 1,
                        }}
                    >
                        <Typography
                            variant="h4"
                            sx={{ fontSize: { xs: 18, md: 18 }, display: "flex", alignItems: "center", gap: 1 }}
                        >
                            <CalendarMonthIcon sx={{ color: "primary.main", fontSize: { xs: 18, md: 18 } }} />
                            Yearly Rate
                        </Typography>
                    </Box>

                    {/* Form Section */}
                    <Grid
                        container
                        spacing={2}
                        sx={{
                            display: "grid",
                            //gridTemplateColumns: "1fr 1fr 1fr 1fr",
                            gridTemplateColumns: {
                                xs: "1fr",                          // Mobile: 1 per row
                                sm: "repeat(2, 1fr)",               // Tablet: 2 per row
                                md: "repeat(4, 1fr)",               // Medium: 4 per row
                                lg: "1fr 1fr 1fr 1fr", // Desktop: proportional columns
                            },
                            gap: 2,
                            mb: 2,
                        }}
                    >
                        {/* Zone Section */}
                        <Grid item xs={12}>
                            <TextField
                                id="zoneSection"
                                select
                                fullWidth
                                size="small"
                                label="Zone Section"
                                value={zoneSection || "Select Zone Section"}
                                onChange={(e) => setZoneSection(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountBalanceIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            >
                                <MenuItem value="Select Zone Section" disabled>
                                    Select Zone Section
                                </MenuItem>
                                <MenuItem value="Zone A">Zone A</MenuItem>
                                <MenuItem value="Zone B">Zone B</MenuItem>
                                <MenuItem value="Zone C">Zone C</MenuItem>
                            </TextField>
                        </Grid>

                        {/* Year Range */}
                        <Grid item xs={12}>
                            <TextField
                                id="yearRange"
                                select
                                fullWidth
                                size="small"
                                label="Year Range"
                                value={yearRange || "Select Year Range"}
                                onChange={(e) => setYearRange(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <CalendarMonthIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            >
                                <MenuItem value="Select Year Range" disabled>
                                    Select Year Range
                                </MenuItem>
                                <MenuItem value="0-50">0-50</MenuItem>
                                <MenuItem value="51-100">51-100</MenuItem>
                            </TextField>
                        </Grid>

                        {/* Type */}
                        <Grid item xs={12}>
                            <TextField
                                id="type"
                                select
                                fullWidth
                                size="small"
                                label="Type"
                                value={type || "Select Type"}
                                onChange={(e) => setType(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <CategoryIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            >
                                <MenuItem value="Select Type" disabled>
                                    Select Type
                                </MenuItem>
                                <MenuItem value="RCC">RCC</MenuItem>
                                <MenuItem value="Steel">Steel</MenuItem>
                                <MenuItem value="Wooden">Wooden</MenuItem>
                            </TextField>
                        </Grid>

                        {/* Year (text + calendar) */}
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                size="small"
                                label="Year"
                                placeholder="YYYY"
                                value={year}
                                onChange={(e) => {
                                    const val = e.target.value.replace(/\D/g, "").slice(0, 4);
                                    setYear(val);
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <CalendarMonthIcon
                                                onClick={handleOpenYearPicker}
                                                style={{ cursor: "pointer" }}
                                            />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Popover
                                open={openYear}
                                anchorEl={anchorEl}
                                onClose={handleCloseYearPicker}
                                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                            >
                                <YearCalendar
                                    value={year ? dayjs(year, "YYYY") : null}
                                    onChange={handleYearSelect}
                                    yearsOrder="desc"
                                />
                            </Popover>
                        </Grid>
                    </Grid>
                </Box>

                <Typography variant="h6" className="pb-2 pt-4 font-bold text-slate-700" sx={{ fontSize: { xs: 18, md: 18 }, ml: 2 }}>
                    <ApartmentIcon sx={{ color: "primary.main", fontSize: { xs: 18, md: 18 }, mr: 1 }} />
                    Construction Type vs Zone No. Yearly Rates
                </Typography>
                {/* Table */}
                <RateMasterCustomTable columns={columns} data={rows} pagination={false} />

                {/* Buttons */}
                <Box sx={{ mt: { xs: 2, md: 3 }, mb: 2 }}>
                    <Grid container spacing={2} justifyContent="center">
                        <ValidationProvider
                            rules={{
                                generate: () =>
                                    zoneSection.trim() !== "" &&
                                    yearRange.trim() !== "" &&
                                    type.trim() !== "" &&
                                    year.trim(),
                                updated: () =>
                                    zoneSection.trim() !== "" ||
                                    yearRange.trim() !== "" ||
                                    type.trim() !== "" ||
                                    year.trim() !== "",
                                delete: () => true, // allow delete always
                                clear: () =>
                                    zoneSection.trim() !== "" ||
                                    yearRange.trim() !== "" ||
                                    type.trim() !== "" ||
                                    year.trim() !== "",
                            }}
                        >
                            <Grid item xs={12} sm="auto">
                                <CustomButton type="generate" style={{ width: "120px" }}>Generate</CustomButton>
                            </Grid>
                            <Grid item xs={12} sm="auto">
                                <CustomButton type="updated" style={{ width: "120px" }}>Update</CustomButton>
                            </Grid>
                            <Grid item xs={12} sm="auto">
                                <CustomButton type="delete" style={{ width: "120px" }}>Delete</CustomButton>
                            </Grid>
                            <Grid item xs={12} sm="auto">
                                <CustomButton type="clear" style={{ width: "120px" }}>Cancel</CustomButton>
                            </Grid>
                        </ValidationProvider>
                    </Grid>
                </Box>
            </Box>
        </LocalizationProvider>
    );
}
