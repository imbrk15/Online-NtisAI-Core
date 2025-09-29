// src/Components/AssessmentMaster/ZoneSectionWiseOpenPlotRateMaster/ZoneSectionWiseOpenPlotRateMasterContent.jsx
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

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CategoryIcon from "@mui/icons-material/Category";
import TableChartIcon from "@mui/icons-material/TableChart";

import CustomButton from "../../../../../../Helpers/ExtraProperties/CustomButtons";
import RateMasterCustomTable from "../../../../../../Helpers/ExtraProperties/RateMasterCustomTable";

// 🔹 Excel export libs
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { YearCalendar } from "@mui/x-date-pickers/YearCalendar";
import { ValidationProvider } from "../../../../../../Contexts/ValidationContext";
const columns = [
    { key: "type", header: "Type" },
    { key: "zone1", header: "ZONE 1" },
    { key: "zone2", header: "ZONE 2" },
    { key: "zone3", header: "ZONE 3" },
    { key: "zone4", header: "ZONE 4" },
    { key: "zone5", header: "ZONE 5" },
    { key: "zone6", header: "ZONE 6" },
];

const defaultRows = [
    { type: "Residential", zone1: 10.5, zone2: 9.0, zone3: 8.0, zone4: 7.0, zone5: 6.0, zone6: 5.0 },
    { type: "Commercial", zone1: 15.75, zone2: 13.5, zone3: 12.0, zone4: 10.5, zone5: 9.0, zone6: 7.5 },
    { type: "Industrial", zone1: 18.9, zone2: 16.2, zone3: 14.4, zone4: 12.6, zone5: 10.8, zone6: 9.0 },
    { type: "Institutional", zone1: 8.4, zone2: 7.2, zone3: 6.4, zone4: 5.6, zone5: 4.8, zone6: 4.0 },
];

export default function ZoneSectionWiseOpenPlotRateMasterContent() {
    const [rows] = useState(defaultRows);

    // Form states
    const [year, setYear] = useState("");
    const [comMultiplier, setComMultiplier] = useState("");
    const [indMultiplier, setIndMultiplier] = useState("");
    const [zoneSection, setZoneSection] = useState("");

    // Year picker popover
    const [anchorEl, setAnchorEl] = useState(null);
    const openYear = Boolean(anchorEl);

    const handleOpenYearPicker = (e) => setAnchorEl(e.currentTarget);
    const handleCloseYearPicker = () => setAnchorEl(null);
    const handleYearSelect = (newYear) => {
        if (newYear) setYear(newYear.year().toString());
        handleCloseYearPicker();
    };

    // 🔹 Export handler
    const handleExport = () => {
        // Prepare data
        const exportData = rows.map((row) => {
            let obj = {};
            columns.forEach((col) => {
                obj[col.header] = row[col.key];
            });
            return obj;
        });

        // Convert to worksheet
        const ws = XLSX.utils.json_to_sheet(exportData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "RateMatrix");

        // Export
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        saveAs(new Blob([excelBuffer], { type: "application/octet-stream" }), "ZoneSectionWiseRates.xlsx");
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box className="mt-2">
                <Box className="p-2 bg-[#f2f7ff96] rounded-xl">
                    {/* Heading */}
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
                            <CategoryIcon sx={{ fontSize: { xs: 18, md: 18 }, color: "primary.main" }} />
                            Zone Section Wise Open Plot Rate Master
                        </Typography>
                    </Box>
                    {/*<Typography*/}
                    {/*    variant="h4"*/}
                    {/*    sx={{*/}
                    {/*        fontSize: { xs: 18, md: 18 },*/}
                    {/*        display: "flex",*/}
                    {/*        alignItems: "center",*/}
                    {/*        gap: 1,*/}
                    {/*        mb: 2,*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    <CategoryIcon sx={{ fontSize: { xs: 20, md: 22 }, color: "primary.main" }} />*/}
                    {/*    Zone Section Wise Open Plot Rate Master*/}
                    {/*</Typography>*/}

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
                        {/* Year with YearCalendar */}
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

                        {/* Commercial Multiplier */}
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                size="small"
                                label="Commercial Multiplier"
                                placeholder="e.g. 1.5"
                                value={comMultiplier}
                                onChange={(e) => setComMultiplier(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <CategoryIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>

                        {/* Industrial Multiplier */}
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                size="small"
                                label="Industrial Multiplier"
                                placeholder="e.g. 1.8"
                                value={indMultiplier}
                                onChange={(e) => setIndMultiplier(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <CategoryIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>

                        {/* Zone Section Dropdown */}
                        <Grid item xs={12}>
                            <TextField
                                id="zoneSection"
                                select
                                fullWidth
                                size="small"
                                label="Zone Section"
                                value={zoneSection || "Select Zone Section"}
                                onChange={(e) => setZoneSection(e.target.value)}
                                variant="outlined"
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
                    </Grid>
                </Box>

                {/* Table Title */}
                <Typography
                    variant="h6"
                    className="pb-2 pt-4 font-bold text-slate-700"
                    sx={{ fontSize: { xs: 18, md: 18 }, ml: 2 }}
                >
                    <TableChartIcon sx={{ color: "primary.main", fontSize: { xs: 18, md: 18 }, mr: 1 }} />
                    Rate Matrix - Zone Section Wise
                </Typography>

                {/* Table */}
                <RateMasterCustomTable columns={columns} data={rows} pagination={false} />

                {/* Buttons */}
                <Box sx={{ mt: { xs: 2, md: 3 }, mb: 2 }}>
                    <Grid container spacing={2} justifyContent="center">
                        <ValidationProvider
                            rules={{
                                add: () =>
                                    zoneSection.trim() !== "" &&
                                    comMultiplier.trim() !== "" &&
                                    indMultiplier.trim() !== "" &&
                                    year.trim(),
                                generate: () =>
                                    zoneSection.trim() !== "" &&
                                    comMultiplier.trim() !== "" &&
                                    indMultiplier.trim() !== "" &&
                                    year.trim(),
                                updated: () =>
                                    zoneSection.trim() !== "" ||
                                    indMultiplier.trim() !== "" ||
                                    comMultiplier.trim() !== "" ||
                                    year.trim() !== "",
                                delete: () => true, // allow delete always
                                clear: () =>
                                    year.trim() !== "" ||
                                    comMultiplier.trim() !== "" ||
                                    indMultiplier.trim() !== "" ||
                                    zoneSection.trim() !== "",
                            }}
                        >
                            <Grid item xs={12} sm="auto">
                                <CustomButton type="add" style={{ width: "140px" }}>Apply</CustomButton>
                            </Grid>
                            <Grid item xs={12} sm="auto">
                                <CustomButton type="updated" style={{ width: "140px" }}>Update Rates</CustomButton>
                            </Grid>
                            <Grid item xs={12} sm="auto">
                                <CustomButton type="export" onClick={handleExport} style={{ width: "140px" }}>Export</CustomButton>
                            </Grid>
                            <Grid item xs={12} sm="auto">
                                <CustomButton type="delete" style={{ width: "140px" }}>Delete</CustomButton>
                            </Grid>
                            <Grid item xs={12} sm="auto">
                                <CustomButton type="clear" style={{ width: "140px" }}>Cancel</CustomButton>
                            </Grid>
                        </ValidationProvider>
                    </Grid>
                </Box>

            </Box>
        </LocalizationProvider>
    );
}
