import React, { useState } from "react";
import {
    Grid,
    TextField,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Checkbox,
    ListItemText,
    OutlinedInput,
    InputAdornment,
    Box
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"; // Year
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee"; // Rate
import AccountBalanceIcon from "@mui/icons-material/AccountBalance"; // Zone
import HomeWorkIcon from "@mui/icons-material/HomeWork"; // Construction Type
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { YearCalendar } from "@mui/x-date-pickers/YearCalendar";

import CustomButton from "../../../../../Helpers/ExtraProperties/CustomButtons";
import MasterCustomTable from "../../../../../Helpers/ExtraProperties/MasterCustomTable";
import { ValidationProvider } from "../../../../../Contexts/ValidationContext"
import YearPickerField from "../../../../../Helpers/ExtraProperties/YearPickerField";

const zoneOptions = [
    "Zone A - 01",
    "Zone A - 02",
    "Zone B - 01",
    "Zone B - 02",
    "Zone C - 01",
    "Zone D - 01",
    "Zone E - 01",
    "Zone F - 02",
];

const constructionOptions = [
    "RCC Frame",
    "Load Bearing",
    "Steel Frame",
    "Brick Masonry",
    "Concrete Block",
    "Wooden",
    "Precast",
];

// Define table columns
const columns = [
    {
        key: "year",
        header: "YEAR",
        isPrimary: true,
    },
    {
        key: "zone",
        header: "ZONE/SUBZONE",
    },
    {
        key: "type",
        header: "CONSTRUCTION TYPE",
    },
    {
        key: "rate",
        header: "RATE (PER SQ FT)",
        align: "right",
        render: (value) => (
            <span className="text-green-600 font-semibold">
                ₹{value.toFixed(2)}
            </span>
        ),
    },
];
export default function BuildingRateCV() {

    const [year, setYear] = useState("");
    const [rate, setRate] = useState("");
    const [zone, setZone] = useState("");
    const [constructionTypes, setConstructionTypes] = useState([]);
    const [rows, setRows] = useState([
        { id: 1, year: 2024, zone: "Zone A - Central", type: "RCC Frame", rate: 850 },
        { id: 2, year: 2024, zone: "Zone A - Central", type: "Load Bearing", rate: 720 },
        { id: 3, year: 2024, zone: "Zone B - East", type: "Steel Frame", rate: 920 },
        { id: 4, year: 2024, zone: "Zone C - Residential", type: "Brick Masonry", rate: 480 },
        { id: 5, year: 2023, zone: "Zone A - Central", type: "RCC Frame", rate: 810 },
    ]);

    const [editIndex, setEditIndex] = useState(null);
    const [editingId, setEditingId] = useState(null);

    // Year Picker popover state
    const [anchorEl, setAnchorEl] = useState(null);
    const handleOpenYearPicker = (event) => setAnchorEl(event.currentTarget);
    const handleCloseYearPicker = () => setAnchorEl(null);
    const open = Boolean(anchorEl);

    const handleYearSelect = (newYear) => {
        if (newYear) setYear(newYear.year().toString());
        handleCloseYearPicker();
    };

    // derived validity
    const isFormValid = year && rate && zone && constructionTypes.length > 0;


    const handleAddOrUpdate = () => {
        if (year && rate && zone && constructionTypes.length > 0) {
            if (editIndex !== null) {
                // Update existing row
                const updatedRows = [...rows];
                updatedRows[editIndex] = {
                    ...updatedRows[editIndex],
                    year: Number(year),
                    zone,
                    type: constructionTypes.join(", "),
                    rate: parseFloat(rate),
                };
                setRows(updatedRows);
                setEditIndex(null);

            } else {
                // Add New Row
                const newRow = {
                    id: Date.now(), // Generate unique ID
                    year: Number(year),
                    zone,
                    type: constructionTypes.join(", "),
                    rate: parseFloat(rate),
                };
                setRows([newRow, ...rows]);

            }

            // Reset form
            setYear("2024");
            setRate("");
            setZone("");
            setConstructionTypes([]);
            setEditingId(null);
        }
    };

    const handleEdit = (index, row) => {
        setYear(row.year.toString());
        setRate(row.rate.toString());
        setZone(row.zone);
        setConstructionTypes(row.type.split(", "));
        setEditIndex(index);
        setEditingId(index);

    };

    const handleDelete = (index, row) => {
        setRows(rows.filter((_, i) => i !== index));

        if (editIndex === index) {
            setEditIndex(null);
            setEditingId(null);
            setYear("2024");
            setRate("");
            setZone("");
            setConstructionTypes([]);
        }
    };
    const handleRowClick = (index, row) => {
        setEditingId(index);
    };
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="p-2 pt-0">
                <div className="flex items-center justify-center mb-4 bg-[#effef0] rounded-xl py-2 mb-2">
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 p-4">
                        Building Rate Master for CV
                    </h1>
                </div>

                {/* Form Section */}
                <Grid
                    container
                    spacing={2}
                    className="mb-4 pt-2"
                >
                    {/* Year */}
                    <YearPickerField
                        year={year}
                        setYear={setYear}
                        gridProps={{
                            flexBasis: { xs: "100%", sm: "45%", md: "15%" },
                            maxWidth: { xs: "100%", sm: "45%", md: "15%" },
                        }}
                    />

                    {/* Rate */}
                    <Grid
                        sx={{
                            flexBasis: { xs: "100%", sm: "45%", md: "15%" },
                            maxWidth: { xs: "100%", sm: "45%", md: "15%" },
                        }}
                    >
                        <TextField
                            fullWidth
                            label="Rate"
                            size="small"
                            placeholder="Enter rate value"
                            value={rate}
                            onChange={(e) => setRate(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <CurrencyRupeeIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>

                    {/* Zone - Subzone */}
                    <Grid
                        sx={{
                            flexBasis: { xs: "100%", sm: "45%", md: "30%" },
                            maxWidth: { xs: "100%", sm: "45%", md: "30%" },
                        }}
                    >
                        <FormControl fullWidth>
                            <InputLabel>Zone - Subzone</InputLabel>
                            <Select
                                value={zone}
                                size="small"
                                onChange={(e) => setZone(e.target.value)}
                                input={
                                    <OutlinedInput
                                        label="Zone - Subzone"
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <AccountBalanceIcon sx={{ color: "#757575" }} />
                                            </InputAdornment>
                                        }
                                    />
                                }
                                renderValue={(selected) =>
                                    selected.length === 0
                                        ? "Select Zone - Subzone"
                                        : selected.join(", ")
                                }
                                displayEmpty
                            >
                                <MenuItem disabled value="">
                                    Select Zone - Subzone
                                </MenuItem>
                                {zoneOptions.map((z) => (
                                    <MenuItem key={z} value={z}>
                                        {z}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Construction Type */}
                    <Grid
                        sx={{
                            flexBasis: { xs: "100%", sm: "45%", md: "30%" },
                            maxWidth: { xs: "100%", sm: "45%", md: "30%" },
                        }}
                    >
                        <FormControl fullWidth>
                            <InputLabel>Construction Type</InputLabel>
                            <Select
                                multiple
                                value={constructionTypes}
                                size="small"
                                onChange={(e) => setConstructionTypes(e.target.value)}
                                input={
                                    <OutlinedInput
                                        label="Construction Type"
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <HomeWorkIcon />
                                            </InputAdornment>
                                        }
                                    />
                                }
                                renderValue={(selected) =>
                                    selected.length === 0
                                        ? "Select Construction Type"
                                        : selected.join(", ")
                                }
                                displayEmpty
                            >
                                <MenuItem disabled value="">
                                    <em>Select Construction Type</em>
                                </MenuItem>
                                {constructionOptions.map((c) => (
                                    <MenuItem key={c} value={c}>
                                        <Checkbox
                                            size="small"
                                            checked={constructionTypes.indexOf(c) > -1}
                                        />
                                        <ListItemText primary={c} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                </Grid>
                {/* Add / Update Button */}
                <Box sx={{ mt: { xs: 1, md: 3 }, mb: 2 }} >
                    <Grid container spacing={2} justifyContent="center">
                        <ValidationProvider
                            rules={{
                                add: () => year && rate && zone && constructionTypes.length > 0,
                                updated: () =>
                                    editIndex !== null &&
                                    year &&
                                    rate &&
                                    zone &&
                                    constructionTypes.length > 0,
                                delete: () => rows.length > 0,
                                reset: () => year || rate || zone || constructionTypes.length > 0,
                            }}
                        >
                            {editIndex !== null ? (
                                <>
                                    <Grid item xs={12} sm="auto">
                                        <CustomButton
                                            type="updated"
                                            onClick={handleAddOrUpdate}
                                            size="small"
                                            fullWidth
                                            className="h-full"
                                            style={{ width: "150px" }}
                                        >
                                            Update
                                        </CustomButton>
                                    </Grid>
                                    <Grid item xs={12} sm="auto">
                                        <CustomButton
                                            type="clear"
                                            onClick={() => {
                                                setEditIndex(null);
                                                setEditingId(null);
                                                setYear("");
                                                setRate("");
                                                setZone("");
                                                setConstructionTypes([]);
                                            }}
                                            size="small"
                                            fullWidth
                                            className="h-full bg-gray-300 text-black hover:bg-gray-400"
                                            style={{ width: "150px" }}
                                        >
                                            Cancel
                                        </CustomButton>
                                    </Grid>
                                </>
                            ) : (
                                <Grid item xs={12} sm="auto">
                                    <CustomButton
                                        type="add"
                                        onClick={handleAddOrUpdate}
                                        size="small"
                                        fullWidth
                                        className="h-full"
                                        style={{ width: "150px" }}
                                    >
                                        Add
                                    </CustomButton>
                                </Grid>
                            )}
                        </ValidationProvider>
                    </Grid>
                </Box>



                {/* Table Section */}
                <MasterCustomTable
                    columns={columns}
                    data={rows}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onRowClick={handleRowClick}
                    editIndex={editingId}
                />
            </div>
        </LocalizationProvider>
    );
}
