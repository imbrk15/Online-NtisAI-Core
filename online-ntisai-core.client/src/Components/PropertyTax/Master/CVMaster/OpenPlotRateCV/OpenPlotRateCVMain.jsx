import * as React from "react";
import {
    Box,
    Grid,
    TextField,
    MenuItem,
    InputAdornment,
    FormControl,
    InputLabel,
    Select,
    OutlinedInput,
} from "@mui/material";
import PercentIcon from "@mui/icons-material/Percent";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"; // Year icon
import AccountBalanceIcon from "@mui/icons-material/AccountBalance"; // ← added
// YearCalendar imports
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { YearCalendar } from "@mui/x-date-pickers/YearCalendar";
import { Popover } from "@mui/material";
import CustomButton from "../../../../../Helpers/ExtraProperties/CustomButtons";
import MasterCustomTable from "../../../../../Helpers/ExtraProperties/MasterCustomTable";
import { ValidationProvider } from "../../../../../Contexts/ValidationContext"


const ZONES = [
    { key: "zoneA-central", label: "Zone A - Central", csn: "CSN004" },
    { key: "zoneA-north", label: "Zone A - North", csn: "CSN006" },
    { key: "zoneB-east", label: "Zone B - East", csn: "CSN003" },
    { key: "zoneB-industrial", label: "Zone B - Industrial", csn: "CSN007" },
    { key: "zoneC-residential", label: "Zone C - Residential", csn: "CSN005" },
];

const INR = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" });

// Define table columns
const columns = [
    {
        key: "year",
        header: "YEAR",
        isPrimary: true,
    },
    {
        key: "zoneLabel",
        header: "ZONE/SUBZONE",
    },
    {
        key: "csn",
        header: "CSN",
    },
    {
        key: "rate",
        header: "RATE (PER SQ FT)",
        align: "right",
        render: (value) => (
            <span style={{ color: "#2e7d32", fontWeight: 700 }}>
                {INR.format(value)}
            </span>
        ),
    },
];

export default function OpenPlotRateCVMain({ selectedMaster }) {

    const [rows, setRows] = React.useState([
        { id: 1, year: "2024", zoneLabel: "Zone A - Central", csn: "CSN004", rate: 620.0 },
        { id: 2, year: "2024", zoneLabel: "Zone A - North", csn: "CSN006", rate: 590.0 },
        { id: 3, year: "2024", zoneLabel: "Zone B - East", csn: "CSN003", rate: 540.0 },
        { id: 4, year: "2024", zoneLabel: "Zone B - Industrial", csn: "CSN007", rate: 515.0 },
        { id: 5, year: "2023", zoneLabel: "Zone A - Central", csn: "CSN001", rate: 620.0 },
        { id: 6, year: "2023", zoneLabel: "Zone C - Residential", csn: "CSN005", rate: 385.0 },
    ]);

    // Form state
    const [year, setYear] = React.useState(""); // no preselect
    const [rate, setRate] = React.useState("");
    const [zoneKey, setZoneKey] = React.useState("");
    const [editIndex, setEditIndex] = React.useState(null);
    const [editingId, setEditingId] = React.useState(null);

    // Year popover state/handlers
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openYear = Boolean(anchorEl);
    const handleOpenYearPicker = (e) => setAnchorEl(e.currentTarget);
    const handleCloseYearPicker = () => setAnchorEl(null);
    const handleYearSelect = (newYear) => {
        if (newYear) setYear(newYear.year().toString());
        handleCloseYearPicker();
    };

    const resetForm = () => {
        setZoneKey("");
        setRate("425.00");
        setYear("2024");
        setEditIndex(null);
        setEditingId(null);
    };

    const handleAddOrUpdate = () => {
        if (!zoneKey || !year || !rate) {

            return
        };
        const z = ZONES.find((z) => z.key === zoneKey);
        const payload = {
            id: editIndex !== null ? rows[editIndex].id : Date.now(),
            year,
            zoneLabel: z?.label || "",
            csn: z?.csn || "",
            rate: Number(rate),
        };

        if (editIndex !== null) {
            // Update existing row
            const updated = [...rows];
            updated[editIndex] = payload;
            setRows(updated);
            setEditIndex(null);

        } else {
            // Add new row
            setRows([payload, ...rows]);

        }
        resetForm();
    };

    const handleEdit = (index, row) => {
        setYear(row.year);
        setRate(String(row.rate));
        const z = ZONES.find((z) => z.label === row.zoneLabel) || ZONES.find((z) => z.csn === row.csn);
        setZoneKey(z?.key || "");
        setEditIndex(index);
        setEditingId(index);

    };

    const handleDelete = (index, row) => {
        setRows(rows.filter((_, i) => i !== index));

        if (editIndex === index) {
            resetForm();
        }
    };


    const handleRowClick = (index, row) => {
        setEditingId(index);
    };


    // Gate rendering AFTER hooks
    if (selectedMaster !== "openPlotRateCV") return null;

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ p: { xs: 0, md: 3 } }}>
                {/* Gradient heading */}
                <div className="flex items-center justify-center mb-4 bg-[#effef0] rounded-xl h-22">
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 p-4">
                        Open Plot Rate Master for CV
                    </h1>
                </div>

                {/* Inline Entry / Edit bar */}
                <Box
                    sx={{
                        p: 2,
                        display: "grid",
                        justifyContent: "center"
                    }}
                >
                    <Grid container spacing={2} alignItems="center" >
                        <Grid sx={{
                            flexBasis: { xs: "100%", sm: "40%", md: "25%" },
                            maxWidth: { xs: "100%", sm: "40%", md: "25%" },
                        }}>
                            <TextField
                                fullWidth
                                label="Year"
                                size="small"
                                placeholder="Select Year"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
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

                        <Grid sx={{
                            flexBasis: { xs: "100%", sm: "40%", md: "25%" },
                            maxWidth: { xs: "100%", sm: "40%", md: "25%" },
                        }}>
                            <TextField
                                fullWidth
                                size="small"
                                type="number"
                                label="Rate %"
                                value={rate}
                                placeholder="e.g 3.5"
                                onChange={(e) => setRate(e.target.value)}
                                inputProps={{ step: "0.01", min: 0 }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PercentIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>

                        <Grid sx={{
                            flexBasis: { xs: "100%", sm: "60%", md: "42%" },
                            maxWidth: { xs: "100%", sm: "60%", md: "42%" },
                        }}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Zone - Subzone</InputLabel>
                                <Select
                                    value={zoneKey || "1"}
                                    onChange={(e) => setZoneKey(e.target.value)}
                                    label="Zone - Subzone"
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
                                >
                                    <MenuItem value="1" disabled>
                                        Select Zone - Subzone
                                    </MenuItem>
                                    {ZONES.map((z) => (
                                        <MenuItem key={z.key} value={z.key}>
                                            {z.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={4} md={2}>
                            <ValidationProvider
                                rules={{
                                    add: () => year.trim() !== "" && rate.trim() !== "" && zoneKey.trim() !== "",
                                    updated: () => editIndex !== null && year.trim() !== "" && rate.trim() !== "" && zoneKey.trim() !== "",
                                    clear: () => year.trim() !== "" || rate.trim() !== "" || zoneKey.trim() !== "",
                                    delete: () => editIndex !== null,
                                }}
                            >
                                <Box sx={{ mt: { xs: 0, md: 1 } }} >
                                    <Grid container spacing={2} justifyContent="center">
                                        <Grid item xs={12} sm="auto">
                                            <CustomButton
                                                type={editIndex !== null ? "updated" : "add"}
                                                onClick={handleAddOrUpdate}
                                                style={{ width: "150px" }}
                                            >
                                                {editIndex !== null ? "Update Rate" : "Add New Rate"}
                                            </CustomButton>
                                        </Grid>
                                        {editIndex !== null && (
                                            <Grid item xs={12} sm="auto">
                                                <CustomButton
                                                    type="clear"
                                                    onClick={resetForm}

                                                    style={{ width: "150px" }}
                                                >
                                                    Cancel
                                                </CustomButton>
                                            </Grid>
                                        )}
                                    </Grid>
                                </Box>
                            </ValidationProvider>
                        </Grid>
                    </Grid>
                </Box>

                {/* Table with pagination + absolute index callbacks */}
                <MasterCustomTable
                    columns={columns}
                    data={rows}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onRowClick={handleRowClick}
                    editIndex={editingId}
                    pagination={true}
                    rowsPerPage={5}
                />
            </Box>
        </LocalizationProvider>
    );
}