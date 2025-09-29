// src/Components/PropertyTax/Master/CVMaster/DepreciationMasterForCV/DepreciationMasterForCVTable.jsx
import * as React from "react";
import { Grid, TextField, InputAdornment, Box } from "@mui/material";

import PercentIcon from "@mui/icons-material/Percent";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import CustomButton from "../../../../../Helpers/ExtraProperties/CustomButtons";
import MasterCustomTable from "../../../../../Helpers/ExtraProperties/MasterCustomTable";
import YearPickerField from "../../../../../Helpers/ExtraProperties/YearPickerField";
import { ValidationProvider } from "../../../../../Contexts/ValidationContext"
/** Reusable year-only picker with a clickable start icon (no end icon) */


/** Sample data for the new structure */
const defaultRows = [
    { id: 1, code: "DR001", constId: "A1", minYear: "0", maxYear: "10", rate: 2.5, year: "2024" },
    { id: 2, code: "DR002", constId: "B1", minYear: "11", maxYear: "25", rate: 1.5, year: "2024" },
    { id: 3, code: "DR003", constId: "OP", minYear: "0", maxYear: "15", rate: 2.0, year: "2024" },
];

/** Table columns for MasterCustomTable */
const columns = [
    { key: "code", header: "ID", isPrimary: true },
    { key: "constId", header: "CONSTRUCTION ID", isPrimary: true },
    { key: "minYear", header: "MIN YEAR", align: "center" },
    { key: "maxYear", header: "MAX YEAR", align: "center" },
    {
        key: "rate",
        header: "RATE (%)",
        align: "center",
        render: (value) =>
            value === "" || value === null || value === undefined
                ? "—"
                : `${Number(value).toFixed(2)}%`,
    },
    { key: "year", header: "YEAR", align: "center" },
];

export default function DepreciationMasterForCVTable() {
    // Form state
    const [constId, setConstId] = React.useState("");
    const [minYear, setMinYear] = React.useState("");
    const [maxYear, setMaxYear] = React.useState("");
    const [rate, setRate] = React.useState("");
    const [year, setYear] = React.useState("");

    // Table state
    const [rows, setRows] = React.useState(defaultRows);
    const [editingId, setEditingId] = React.useState(null);
    const [editIndex, setEditIndex] = React.useState(null);

    // Only allow up to 4 digits in year fields (plain inputs)
    const handleYearFieldChange = (setter) => (e) => {
        const digits = e.target.value.replace(/\D/g, "").slice(0, 4);
        setter(digits);
    };

    const resetForm = () => {
        setConstId("");
        setMinYear("");
        setMaxYear("");
        setRate("");
        setYear("");
        setEditingId(null);
        setEditIndex(null);
    };

    const handleAddOrUpdate = () => {
        if (!constId || !minYear || !maxYear || rate === "" || !year) return;

        const newId = rows.length > 0 ? Math.max(...rows.map((r) => r.id)) + 1 : 1;

        const payload = {
            id: newId,
            code: `DR${String(newId).padStart(3, "0")}`,
            constId: String(constId).trim(),
            minYear: String(minYear),
            maxYear: String(maxYear),
            rate: Number(rate),
            year: String(year),
        };

        if (editingId !== null) {
            // Update row
            setRows((prev) => prev.map((r) => (r.id === editingId ? { ...r, ...payload } : r)));
        } else {
            // Add new row on top with unique id
            const newId = rows.length > 0 ? Math.max(...rows.map((r) => r.id)) + 1 : 1;
            setRows([{ id: newId, ...payload }, ...rows]);
        }
        resetForm();
    };

    const handleEdit = (index, row) => {
        setConstId(row.constId || "");
        setMinYear(row.minYear || "");
        setMaxYear(row.maxYear || "");
        setRate(row.rate !== undefined && row.rate !== null ? String(row.rate) : "");
        setYear(row.year || "");
        setEditingId(row.id);
        setEditIndex(index);
    };

    const handleDelete = (index, row) => {
        setRows((prev) => prev.filter((r) => r.id !== row.id));
        if (editingId === row.id) resetForm();
    };

    const handleCancel = () => resetForm();

    return (
        <div className="p-1 pt-0">
            <div className="flex items-center justify-center mb-4 bg-[#effef0] rounded-xl py-4">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 p-1 text-center">
                    Depreciation Master for CV
                </h1>
            </div>

            {/* Form Section */}
            <Grid
                container
                spacing={2}
                className="mb-4 pt-3"
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 2,
                }}
            >
                {/* Construction ID */}
                <Grid
                    item
                    xs={12}
                    sm={3}
                    sx={{
                        flexBasis: { xs: "100%", sm: "30%", md: "20%" },
                        maxWidth: { xs: "100%", sm: "30%", md: "20%" },
                    }}
                >
                    <TextField
                        fullWidth
                        size="small"
                        label="Construction ID"
                        placeholder="Enter Construction ID"
                        value={constId}
                        onChange={(e) => setConstId(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <HomeWorkIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>

                {/* Min Year */}
                <Grid
                    item
                    xs={12}
                    sm={2}
                    sx={{
                        flexBasis: { xs: "100%", sm: "30%", md: "10%" },
                        maxWidth: { xs: "100%", sm: "30%", md: "10%" },
                    }}
                >
                    <TextField
                        fullWidth
                        size="small"
                        label="Min Year"
                        placeholder="e.g.- 5"
                        value={minYear}
                        onChange={handleYearFieldChange(setMinYear)}
                        inputProps={{ inputMode: "numeric", maxLength: 4 }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <CalendarMonthIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>

                {/* Max Year */}
                <Grid
                    item
                    xs={12}
                    sm={2}
                    sx={{
                        flexBasis: { xs: "100%", sm: "30%", md: "10%" },
                        maxWidth: { xs: "100%", sm: "30%", md: "10%" },
                    }}
                >
                    <TextField
                        fullWidth
                        size="small"
                        label="Max Year"
                        placeholder="e.g.- 10"
                        value={maxYear}
                        onChange={handleYearFieldChange(setMaxYear)}
                        inputProps={{ inputMode: "numeric", maxLength: 4 }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <CalendarMonthIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>

                {/* Rate % */}
                <Grid
                    item
                    xs={12}
                    sm={2}
                    sx={{
                        flexBasis: { xs: "100%", sm: "30%", md: "10%" },
                        maxWidth: { xs: "100%", sm: "30%", md: "10%" },
                    }}
                >
                    <TextField
                        fullWidth
                        size="small"
                        type="number"
                        label="Rate (%)"
                        placeholder="e.g.- 2.85"
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                        inputProps={{ step: "0.1", min: 0 }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PercentIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>

                {/* ✅ Year using YearPickerField */}
                <YearPickerField
                    year={year}
                    setYear={setYear}
                    gridProps={{
                        flexBasis: { xs: "100%", sm: "30%", md: "10%" },
                        maxWidth: { xs: "100%", sm: "30%", md: "10%" },
                    }}
                />

                {/* Add / Update + Cancel */}
                <ValidationProvider
                    rules={{
                        add: () =>
                            !editingId && constId.trim() !== "" && minYear !== "" && maxYear !== "" && rate !== "" && year !== "",
                        updated: () =>
                            editingId !== null && constId.trim() !== "" && minYear !== "" && maxYear !== "" && rate !== "" && year !== "",
                        clear: () =>
                            constId.trim() !== "" ||
                            minYear !== "" ||
                            maxYear !== "" ||
                            rate !== "" ||
                            year !== "",
                    }}
                >
                    <Box sx={{ mt: { xs: 0, md: 0 } }} >
                        <Grid container spacing={2} justifyContent="center">
                            <Grid item xs={12} sm="auto">
                                <CustomButton
                                    type={editingId !== null ? "updated" : "add"}
                                    onClick={handleAddOrUpdate}
                                    size="small"
                                    className="!h-10 !text-[14px] font-bold !normal-case w-[120px]"
                                >
                                    {editingId !== null ? "Update" : "Add"}
                                </CustomButton>
                            </Grid>
                            {editingId && (
                                <Grid item xs={12} sm="auto">
                                    <CustomButton
                                        type="clear"
                                        onClick={handleCancel}
                                        size="small"
                                        className="!h-10 font-bold !normal-case w-[120px]"
                                    >
                                        Clear
                                    </CustomButton>
                                </Grid>
                            )}
                        </Grid>
                    </Box>
                </ValidationProvider>
            </Grid>

            {/* Table Section */}
            <MasterCustomTable
                columns={columns}
                data={rows}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onRowClick={handleEdit}
                editIndex={editIndex}
                pagination={true}
            />
        </div>
    );
}
