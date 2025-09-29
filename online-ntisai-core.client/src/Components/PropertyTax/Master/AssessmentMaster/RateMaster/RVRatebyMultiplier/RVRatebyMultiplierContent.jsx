// src/Components/AssessmentMaster/RVRatebyMultiplier/RVRatebyMultiplierContent.jsx
import React, { useState } from "react";
import {
    TextField,
    MenuItem,
    InputAdornment,
    Typography,
    Box,
    Popover,
    Grid
} from "@mui/material";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CategoryIcon from "@mui/icons-material/Category";
import TableChartIcon from "@mui/icons-material/TableChart";

import CustomButton from "../../../../../../Helpers/ExtraProperties/CustomButtons";
import RateMasterCustomTable from "../../../../../../Helpers/ExtraProperties/RateMasterCustomTable";
import { ValidationProvider } from "../../../../../../Contexts/ValidationContext"; // ✅ added

import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { YearCalendar } from "@mui/x-date-pickers/YearCalendar";

const columns = [
    { key: "zone", header: "Zone No" },
    { key: "rcc", header: "RCC Frame" },
    { key: "load", header: "Load Bearing" },
    { key: "steel", header: "Steel Frame" },
    { key: "brick", header: "Brick Masonry" },
    { key: "concrete", header: "Concrete Block" },
    { key: "prefab", header: "Prefabricated" },
];

const defaultRows = [
    { zone: "Zone A", rcc: "0.00", load: "0.00", steel: "0.00", brick: "0.00", concrete: "0.00", prefab: "0.00" },
    { zone: "Zone B", rcc: "0.00", load: "0.00", steel: "0.00", brick: "0.00", concrete: "0.00", prefab: "0.00" },
    { zone: "Zone C", rcc: "0.00", load: "0.00", steel: "0.00", brick: "0.00", concrete: "0.00", prefab: "0.00" },
    { zone: "Zone D", rcc: "0.00", load: "0.00", steel: "0.00", brick: "0.00", concrete: "0.00", prefab: "0.00" },
    { zone: "Zone E", rcc: "0.00", load: "0.00", steel: "0.00", brick: "0.00", concrete: "0.00", prefab: "0.00" },
    { zone: "Zone F", rcc: "0.00", load: "0.00", steel: "0.00", brick: "0.00", concrete: "0.00", prefab: "0.00" },
];

export default function RVRatebyMultiplierContent() {
    const [rows] = useState(defaultRows);

    // Form states
    const [zone, setZone] = useState("");
    const [year, setYear] = useState("");
    const [minYear, setMinYear] = useState("");
    const [yearRange, setYearRange] = useState("");
    const [resMultiplier, setResMultiplier] = useState("");
    const [comMultiplier, setComMultiplier] = useState("");
    const [indMultiplier, setIndMultiplier] = useState("");

    // Year picker popover
    const [anchorEl, setAnchorEl] = useState(null);
    const openYear = Boolean(anchorEl);

    const handleOpenYearPicker = (e) => setAnchorEl(e.currentTarget);
    const handleCloseYearPicker = () => setAnchorEl(null);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box className="mt-2">
                <Box className="p-1 bg-[#f2f7ff96] rounded-xl">
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
                            <CategoryIcon sx={{ color: "primary.main", fontSize: { xs: 18, md: 18 } }} />
                            RV Rate by Multiplier
                        </Typography>
                    </Box>

                    {/* --- FORM GRID LAYOUT --- */}
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "1fr",                          // Mobile: 1 per row
                                sm: "repeat(2, 1fr)",               // Tablet: 2 per row
                                md: "repeat(4, 1fr)",               // Medium: 4 per row
                                lg: "1fr 0.7fr 0.7fr 1fr 1fr 1fr 1fr", // Desktop
                            },
                            gap: 2,
                            alignItems: "center",
                        }}
                        className="mb-4 mt-4"
                    >
                        {/* Zone Section Dropdown */}
                        <TextField
                            id="zone"
                            select
                            fullWidth
                            size="small"
                            label="Zone Section"
                            value={zone || "Select Zone"}
                            onChange={(e) => setZone(e.target.value)}
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountBalanceIcon />
                                    </InputAdornment>
                                ),
                            }}
                        >
                            <MenuItem value="Select Zone" disabled>
                                Select Zone Section
                            </MenuItem>
                            <MenuItem value="ZoneA">Zone A</MenuItem>
                            <MenuItem value="ZoneB">Zone B</MenuItem>
                            <MenuItem value="ZoneC">Zone C</MenuItem>
                            <MenuItem value="ZoneD">Zone D</MenuItem>
                            <MenuItem value="ZoneE">Zone E</MenuItem>
                            <MenuItem value="ZoneF">Zone F</MenuItem>
                        </TextField>

                        {/* Year with YearCalendar */}
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
                                onChange={(newYear) => {
                                    if (newYear) {
                                        setYear(newYear.year().toString());
                                    }
                                    handleCloseYearPicker();
                                }}
                                yearsOrder="desc"
                            />
                        </Popover>

                        {/* Min Year */}
                        <TextField
                            fullWidth
                            size="small"
                            label="Min Year"
                            placeholder="e.g. 5"
                            value={minYear}
                            onChange={(e) => setMinYear(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <CalendarMonthIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        {/* Year Range */}
                        <TextField
                            id="yearRange"
                            select
                            fullWidth
                            size="small"
                            label="Year Range"
                            value={yearRange || "Select Range"}
                            onChange={(e) => setYearRange(e.target.value)}
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <CalendarMonthIcon />
                                    </InputAdornment>
                                ),
                            }}
                        >
                            <MenuItem value="Select Range" disabled>
                                Select Range
                            </MenuItem>
                            <MenuItem value="2020-2025">2020-2025</MenuItem>
                            <MenuItem value="2026-2030">2026-2030</MenuItem>
                        </TextField>

                        {/* Multipliers */}
                        <TextField
                            fullWidth
                            size="small"
                            label="Residential Multiplier"
                            placeholder="e.g. 1.0"
                            value={resMultiplier}
                            onChange={(e) => setResMultiplier(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <CategoryIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
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
                        <TextField
                            fullWidth
                            size="small"
                            label="Industrial Multiplier"
                            placeholder="e.g. 2.0"
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
                    </Box>
                </Box>

                {/* Table Title */}
                <Typography variant="h6" className="pb-2 pt-4 font-bold text-slate-700" sx={{ fontSize: { xs: 18, md: 18 }, ml: 2 }}>
                    <TableChartIcon sx={{ color: "primary.main", fontSize: { xs: 18, md: 18 }, mr: 1 }} />
                    Rate Matrix - Construction Type vs Zone
                </Typography>
                <RateMasterCustomTable columns={columns} data={rows} pagination={false} />

                {/* Buttons with Validation */}
                <Box sx={{ mt: { xs: 2, md: 3 }, mb: 2 }}>
                    <Grid container spacing={2} justifyContent="center">
                        <ValidationProvider
                            rules={{
                                generate: () =>
                                    zone.trim() !== "" &&
                                    year.trim() !== "" &&
                                    resMultiplier.trim() !== "",
                                updated: () =>
                                    resMultiplier.trim() !== "" ||
                                    comMultiplier.trim() !== "" ||
                                    indMultiplier.trim() !== "",
                                delete: () => true, // allow delete always
                                clear: () =>
                                    zone.trim() !== "" ||
                                    year.trim() !== "" ||
                                    minYear.trim() !== "" ||
                                    yearRange.trim() !== "" ||
                                    resMultiplier.trim() !== "" ||
                                    comMultiplier.trim() !== "" ||
                                    indMultiplier.trim() !== "",
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
