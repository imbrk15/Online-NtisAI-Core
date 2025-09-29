// src/components/PropertyTax/CVFactorMain.jsx
import React, { useMemo, useState, useRef } from "react";
import {
    Select,
    RadioGroup,
    FormControlLabel,
    Radio,
    Grid,
    TextField,
    MenuItem,
    Checkbox,
    ListItemText,
    OutlinedInput,
    InputAdornment,
    InputLabel,
    FormControl,
    Box
} from "@mui/material";

import EventIcon from "@mui/icons-material/Event";
import CategoryIcon from "@mui/icons-material/Category";
import CustomButton from "../../../../../Helpers/ExtraProperties/CustomButtons";
import MasterCustomTable from "../../../../../Helpers/ExtraProperties/MasterCustomTable"
import { ValidationProvider } from "../../../../../Contexts/ValidationContext"
import LayersIcon from "@mui/icons-material/Layers";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import DescriptionIcon from "@mui/icons-material/Description";
import NumbersIcon from "@mui/icons-material/Numbers";
import FunctionsIcon from "@mui/icons-material/Functions";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import YearPickerField from "../../../../../Helpers/ExtraProperties/YearPickerField";
export default function CVFactorMain({ selectedMaster, setSelectedMaster }) {
    const [selected, setSelected] = useState("floor"); // which factor type form is visible
    const [form, setForm] = useState({});
    const [editingIndex, setEditingIndex] = useState(null); // index in the master rows array

    const USE_OPTIONS = ["Educational", "Government", "Agricultural", "Religious"];
    const FLOOR_OPTIONS = ["G", "1", "2", "3"];

    const CONSTRUCTION_OPTIONS = ["A1", "B1", "OP", "A2", "B2", "C"];

    const [rows, setRows] = useState([
        { type: "floor", floorId: "G", factor: "1.2", effFrom: "2024-01-01", effTo: "2024-12-31" },
        { type: "floor", floorId: "1", factor: "0.9", effFrom: "2024-02-01", effTo: "2025-01-31" },

        {
            type: "construction",
            floorId: "G",
            constType: "A1",
            minYear: "1997",
            maxYear: "2000",
            rate: "1.5",
            factor: "1.85",
            year: "2024",
            effFrom: "2022-01-01",
            effTo: "2024-01-01",
        },
        {
            type: "construction",
            floorId: "G",
            constType: "B1",
            minYear: "1998",
            maxYear: "2000",
            rate: "1.5",
            factor: "1.5",
            year: "2025",
            effFrom: "2022-01-01",
            effTo: "2024-01-01",
        },
        {
            type: "construction",
            floorId: "G",
            constType: "OP",
            minYear: "1998",
            maxYear: "2000",
            rate: "1.5",
            factor: "1.0",
            year: "2025",
            effFrom: "2022-01-01",
            effTo: "2024-01-01",
        },

        {
            type: "subtype",
            subTypeDesc: "Commercial Premium",
            appliesTo: "Government, Agricultural",
            keySeq: "1",
            shortcut: "Ctrl+Shift+C",
            factor: "1.3",
            rate: "2.0",
            year: "2023",
            effFrom: "2023-05-01",
            effTo: "2024-05-01",
        },
        {
            type: "subtype",
            subTypeDesc: "Industrial Premium",
            appliesTo: "Educational",
            keySeq: "2",
            shortcut: "Ctrl+Shift+I",
            factor: "1.25",
            rate: "2.0",
            year: "2023",
            effFrom: "2023-05-01",
            effTo: "2024-05-01",
        },

        {
            type: "depreciation",
            id: "196325",
            constType: "A1",
            minYear: "1998",
            maxYear: "2000",
            rate: "2.5%",
            year: "2020",
            factor: "0.8",
            effFrom: "2020-01-01",
            effTo: "2030-01-01",
        },
        {
            type: "depreciation",
            id: "196326",
            constType: "B1",
            minYear: "1998",
            maxYear: "2000",
            rate: "1.25%",
            year: "2020",
            factor: "1.3",
            effFrom: "2020-01-01",
            effTo: "2030-01-01",
        },
        {
            type: "depreciation",
            id: "196327",
            constType: "OP",
            minYear: "1997",
            maxYear: "2000",
            rate: "2.3%",
            year: "2018",
            factor: "0.7",
            effFrom: "2020-01-01",
            effTo: "2030-01-01",
        },
    ]);
    const tableColumns = {
        floor: [
            { key: "floorId", header: "FLOOR ID", isPrimary: true },
            { key: "factor", header: "FACTOR", align: "right" },
            { key: "effFrom", header: "EFFECTIVE FROM", render: (value) => new Date(value).toLocaleDateString("en-GB") },
            { key: "effTo", header: "EFFECTIVE TO", render: (value) => new Date(value).toLocaleDateString("en-GB") },
        ],
        construction: [
            { key: "constType", header: "CONSTRUCTION TYPE", isPrimary: true },
            { key: "factor", header: "FACTOR", align: "right" },
            { key: "effFrom", header: "EFFECTIVE FROM", render: (value) => new Date(value).toLocaleDateString("en-GB") },
            { key: "effTo", header: "EFFECTIVE TO", render: (value) => new Date(value).toLocaleDateString("en-GB") },
        ],
        subtype: [
            { key: "subTypeDesc", header: "SUB TYPE DESCRIPTION", isPrimary: true },
            { key: "appliesTo", header: "APPLIES TO" },
            { key: "factor", header: "FACTOR", align: "right" },
            { key: "effFrom", header: "EFFECTIVE FROM", render: (value) => new Date(value).toLocaleDateString("en-GB") },
            { key: "effTo", header: "EFFECTIVE TO", render: (value) => new Date(value).toLocaleDateString("en-GB") },
        ],
        depreciation: [
            { key: "constType", header: "CONSTRUCTION TYPE", isPrimary: true },
            { key: "minYear", header: "MIN YEAR" },
            { key: "maxYear", header: "MAX YEAR" },
            { key: "rate", header: "RATE" },
            { key: "factor", header: "FACTOR", align: "right" },
            { key: "effFrom", header: "EFFECTIVE FROM", render: (value) => new Date(value).toLocaleDateString("en-GB") },
            { key: "effTo", header: "EFFECTIVE TO", render: (value) => new Date(value).toLocaleDateString("en-GB") },
        ],
    };
    const setField = (field) => (value) => setForm((prev) => ({ ...prev, [field]: value }));

    // ---- helpers to map appliesTo between UI (array) and storage (CSV string) ----
    const normalizeFormForSave = (type, data) => {
        const f = { ...data };
        if (type === "subtype") {
            if (Array.isArray(f.appliesTo)) f.appliesTo = f.appliesTo.join(", ");
        }
        return f;
    };

    const prepareFormFromRow = (row) => {
        const f = { ...row };
        if (row.type === "subtype") {
            if (typeof f.appliesTo === "string") {
                f.appliesTo = f.appliesTo
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean);
            } else if (!Array.isArray(f.appliesTo)) {
                f.appliesTo = [];
            }
        }
        return f;
    };



    const resetForm = () => {
        setForm({});
        setEditingIndex(null);
    };

    const handleAdd = () => {
        const payload = normalizeFormForSave(selected, form);
        setRows((prev) => [...prev, { type: selected, ...payload }]);
        resetForm();
    };


    const handleUpdate = () => {
        if (editingIndex === null) return;
        const payload = normalizeFormForSave(selected, form);
        setRows((prev) => prev.map((r, i) => (i === editingIndex ? { ...r, type: selected, ...payload } : r)));
        resetForm();
    };



    const handleClear = () => {
        resetForm();
    };


    // ---------- Row edit/delete from child tables ----------
    const handleEditFromTable = (index, rowFromChild) => {
        if (!rowFromChild) return; // safety check
        const { _index, ...pureRow } = rowFromChild;
        if (!pureRow) return;
        if (_index === undefined) {
            console.warn("Edit row missing _index!", rowFromChild);
            return;
        }
        setSelected(pureRow.type);
        setEditingIndex(_index);
        setForm(prepareFormFromRow(pureRow));
    };




    const handleDeleteFromTable = (masterIndex) => {
        setRows((prev) => prev.filter((_, idx) => idx !== masterIndex));
        if (editingIndex === masterIndex) resetForm();
    };
    const handleRowClick = (index, row) => {
        setEditingIndex(index);
    };

    const filteredRows = useMemo(
        () =>
            rows
                .map((r, i) => ({ ...r, _index: i }))
                .filter((r) => r.type === selected),
        [rows, selected]
    );
    const pickerRef = useRef(null);
    /* ---- Dynamic Fields per radio ---- */
    const renderFields = () => {
        switch (selected) {
            case "floor":
                return (
                    <>
                        <Grid
                            container
                            spacing={2}
                        >
                            {/* Floor ID */}
                            <Grid
                                sx={{
                                    flexBasis: { xs: "100%", sm: "45%", md: "22%" },
                                    maxWidth: { xs: "100%", sm: "45%", md: "22%" }
                                }}
                            >
                                <TextField
                                    select
                                    label="Floor ID"
                                    size="small"
                                    fullWidth
                                    value={form.floorId ?? "0"}
                                    onChange={(e) => setField("floorId")(e.target.value)}

                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LayersIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                >
                                    <MenuItem value="0" disabled>
                                        <em>Select Floor</em>
                                    </MenuItem>
                                    {FLOOR_OPTIONS.map((opt) => (
                                        <MenuItem key={opt} value={opt}>
                                            {opt}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            {/* Factor */}
                            <Grid
                                sx={{
                                    flexBasis: { xs: "100%", sm: "45%", md: "20%" },
                                    maxWidth: { xs: "100%", sm: "45%", md: "20%" },
                                }}
                            >
                                <TextField
                                    label="Factor"
                                    size="small"
                                    fullWidth
                                    value={form.factor || ""}
                                    placeholder="e.g. 1.25"
                                    onChange={(e) => setField("factor")(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <FunctionsIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>

                            {/* Effective From */}
                            <Grid
                                sx={{
                                    flexBasis: { xs: "100%", sm: "45%", md: "22%" },
                                    maxWidth: { xs: "100%", sm: "45%", md: "22%" },
                                }}
                            >
                                <TextField
                                    label="Effective From"
                                    type="date"
                                    size="small"
                                    fullWidth
                                    value={form.effFrom || ""}
                                    onChange={(e) => setField("effFrom")(e.target.value)}
                                    InputLabelProps={{ shrink: true }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EventIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>

                            {/* Effective To */}
                            <Grid
                                sx={{
                                    flexBasis: { xs: "100%", sm: "45%", md: "22%" },
                                    maxWidth: { xs: "100%", sm: "45%", md: "22%" },
                                }}
                            >
                                <TextField
                                    label="Effective To"
                                    type="date"
                                    size="small"
                                    fullWidth
                                    value={form.effTo || ""}
                                    onChange={(e) => setField("effTo")(e.target.value)}
                                    InputLabelProps={{ shrink: true }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EventIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                        </Grid>

                    </>
                );

            case "construction":
                return (
                    <>
                        <Grid
                            container
                            spacing={2}
                        >
                            <Grid
                                sx={{
                                    flexBasis: { xs: "100%", sm: "45%", md: "28%" },
                                    maxWidth: { xs: "100%", sm: "45%", md: "28%" }
                                }}
                            >
                                <TextField
                                    select
                                    id="constructionID"
                                    label="Construction Type"
                                    size="small"
                                    fullWidth
                                    value={form.constType ?? "Construction Type"}
                                    onChange={(e) => setField("constType")(e.target.value)}
                                    SelectProps={{
                                        MenuProps: {
                                            PaperProps: { style: { minWidth: 200 } }, // dropdown width stable
                                        },
                                    }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <HomeWorkIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                >
                                    <MenuItem value="Construction Type" disabled>
                                        <em>Select Construction Type</em>
                                    </MenuItem>
                                    {CONSTRUCTION_OPTIONS.map((opt) => (
                                        <MenuItem key={opt} value={opt}>
                                            {opt}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>


                            <Grid
                                sx={{
                                    flexBasis: { xs: "100%", sm: "45%", md: "20%" },
                                    maxWidth: { xs: "100%", sm: "45%", md: "20%" }
                                }}
                            >
                                <TextField
                                    label="Factor"
                                    size="small"
                                    fullWidth
                                    value={form.factor || ""}
                                    placeholder="e.g. 1.25"
                                    onChange={(e) => setField("factor")(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <FunctionsIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>

                            <Grid
                                sx={{
                                    flexBasis: { xs: "100%", sm: "45%", md: "22%" },
                                    maxWidth: { xs: "100%", sm: "45%", md: "22%" }
                                }}
                            >
                                <TextField
                                    label="Effective From"
                                    type="date"
                                    size="small"
                                    fullWidth
                                    value={form.effFrom || ""}
                                    onChange={(e) => setField("effFrom")(e.target.value)}
                                    InputLabelProps={{ shrink: true }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EventIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>

                            <Grid
                                sx={{
                                    flexBasis: { xs: "100%", sm: "45%", md: "22%" },
                                    maxWidth: { xs: "100%", sm: "45%", md: "22%" }
                                }}
                            >
                                <TextField
                                    label="Effective To"
                                    type="date"
                                    size="small"
                                    fullWidth
                                    value={form.effTo || ""}
                                    onChange={(e) => setField("effTo")(e.target.value)}
                                    InputLabelProps={{ shrink: true }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EventIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>

                        </Grid>
                    </>
                );

            case "subtype":
                return (
                    <>
                        <Grid
                            container
                            spacing={2}
                            sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                        >
                            {/* Sub Type of Use Description */}
                            <Grid
                                sx={{
                                    flexBasis: { xs: "100%", sm: "46%", md: "16%" },
                                    maxWidth: { xs: "100%", sm: "46%", md: "16%" },
                                }}
                            >
                                <TextField
                                    label="Sub Type of Use Description"
                                    size="small"
                                    fullWidth
                                    value={form.subTypeDesc || ""}
                                    placeholder="Enter Sub Type Description"
                                    onChange={(e) => setField("subTypeDesc")(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <DescriptionIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>

                            {/* Type Of Use Description */}
                            <Grid
                                sx={{
                                    flexBasis: { xs: "100%", sm: "46%", md: "16%" },
                                    maxWidth: { xs: "100%", sm: "46%", md: "16%" },
                                }}
                            >
                                <FormControl fullWidth size="small">
                                    <InputLabel>Type Of Use Description</InputLabel>
                                    <Select
                                        multiple
                                        displayEmpty
                                        value={Array.isArray(form.appliesTo) ? form.appliesTo : []}
                                        onChange={(e) =>
                                            setField("appliesTo")(
                                                typeof e.target.value === "string"
                                                    ? e.target.value.split(",")
                                                    : e.target.value
                                            )
                                        }
                                        input={
                                            <OutlinedInput
                                                label="Type Of Use Description"
                                                startAdornment={
                                                    <InputAdornment position="start">
                                                        <CategoryIcon />
                                                    </InputAdornment>
                                                }
                                            />
                                        }
                                        renderValue={(selected) =>
                                            !selected || selected.length === 0 ? (
                                                <em className="text-gray-400">
                                                    Select Type Of Use Description
                                                </em>
                                            ) : (
                                                selected.join(", ")
                                            )
                                        }
                                        MenuProps={{ PaperProps: { style: { maxHeight: 260 } } }}
                                    >
                                        <MenuItem disabled value="">
                                            <em>Select Type Of Use Description</em>
                                        </MenuItem>
                                        {USE_OPTIONS.map((opt) => (
                                            <MenuItem key={opt} value={opt}>
                                                <Checkbox
                                                    size="small"
                                                    checked={(form.appliesTo || []).indexOf(opt) > -1}
                                                />
                                                <ListItemText primary={opt} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            {/* Keywise Sequence */}
                            <Grid
                                sx={{
                                    flexBasis: { xs: "100%", sm: "30%", md: "10%" },
                                    maxWidth: { xs: "100%", sm: "30%", md: "10%" },
                                }}
                            >
                                <TextField
                                    label="Keywise Sequence"
                                    size="small"
                                    fullWidth
                                    value={form.keySeq || ""}
                                    placeholder="e.g. 1"
                                    onChange={(e) => setField("keySeq")(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <NumbersIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>

                            {/* Shortcut */}
                            <Grid
                                sx={{
                                    flexBasis: { xs: "100%", sm: "30%", md: "10%" },
                                    maxWidth: { xs: "100%", sm: "30%", md: "10%" },
                                }}
                            >
                                <TextField
                                    label="Keyboard Shortcut"
                                    size="small"
                                    fullWidth
                                    value={form.shortcut || ""}
                                    placeholder="e.g. Ctrl+Shift+E"
                                    onChange={(e) => setField("shortcut")(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <KeyboardIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>

                            {/* Factor */}
                            <Grid
                                sx={{
                                    flexBasis: { xs: "100%", sm: "30%", md: "10%" },
                                    maxWidth: { xs: "100%", sm: "30%", md: "10%" },
                                }}
                            >
                                <TextField
                                    label="Factor"
                                    size="small"
                                    fullWidth
                                    value={form.factor || ""}
                                    placeholder="e.g. 1.25"
                                    onChange={(e) => setField("factor")(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <FunctionsIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>

                            {/* Effective From */}
                            <Grid
                                sx={{
                                    flexBasis: { xs: "100%", sm: "30%", md: "10%" },
                                    maxWidth: { xs: "100%", sm: "30%", md: "10%" },
                                }}
                            >
                                <TextField
                                    label="Effective From"
                                    type="date"
                                    size="small"
                                    fullWidth
                                    value={form.effFrom || ""}
                                    onChange={(e) => setField("effFrom")(e.target.value)}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>

                            {/* Effective To */}
                            <Grid
                                sx={{
                                    flexBasis: { xs: "100%", sm: "30%", md: "10%" },
                                    maxWidth: { xs: "100%", sm: "30%", md: "10%" },
                                }}
                            >
                                <TextField
                                    label="Effective To"
                                    type="date"
                                    size="small"
                                    fullWidth
                                    value={form.effTo || ""}
                                    onChange={(e) => setField("effTo")(e.target.value)}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                        </Grid>
                    </>
                );

            case "depreciation":
                return (
                    <>
                        <Grid
                            container
                            spacing={2}
                            sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                        >
                            {/* Construction Type */}
                            <Grid
                                sx={{
                                    flexBasis: { xs: "100%", sm: "44%", md: "14%" },
                                    maxWidth: { xs: "100%", sm: "44%", md: "14%" },
                                }}
                            >
                                <TextField
                                    select
                                    id="constructionID"
                                    label="Construction Type"
                                    size="small"
                                    fullWidth
                                    value={form.constType ?? "Construction Type"}
                                    onChange={(e) => setField("constType")(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <HomeWorkIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                >
                                    <MenuItem value="Construction Type" disabled>
                                        <em>Select Construction Type</em>
                                    </MenuItem>
                                    {CONSTRUCTION_OPTIONS.map((opt) => (
                                        <MenuItem key={opt} value={opt}>
                                            {opt}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            {/* Min Year */}
                            <Grid
                                sx={{
                                    flexBasis: { xs: "100%", sm: "23%", md: "10%" },
                                    maxWidth: { xs: "100%", sm: "23%", md: "10%" },
                                }}
                            >
                                <TextField
                                    label="Min Year"
                                    size="small"
                                    fullWidth
                                    value={form.minYear || ""}
                                    placeholder="e.g. 1995"
                                    onChange={(e) => setField("minYear")(e.target.value)}
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
                                sx={{
                                    flexBasis: { xs: "100%", sm: "23%", md: "10%" },
                                    maxWidth: { xs: "100%", sm: "23%", md: "10%" },
                                }}
                            >
                                <TextField
                                    label="Max Year"
                                    size="small"
                                    fullWidth
                                    value={form.maxYear || ""}
                                    placeholder="e.g. 2000"
                                    onChange={(e) => setField("maxYear")(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <CalendarMonthIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>

                            {/* Rate */}
                            <Grid
                                sx={{
                                    flexBasis: { xs: "100%", sm: "30%", md: "10%" },
                                    maxWidth: { xs: "100%", sm: "30%", md: "10%" },
                                }}
                            >
                                <TextField
                                    label="Rate (%)"
                                    size="small"
                                    fullWidth
                                    value={form.rate || ""}
                                    onChange={(e) => setField("rate")(e.target.value)}
                                    placeholder="e.g. 2.5"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EventIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>

                            {/* Year (Picker) */}
                            <YearPickerField
                                year={form.year || ""}
                                setYear={(val) => setField("year")(val)}
                                gridProps={{
                                    flexBasis: { xs: "100%", sm: "30%", md: "10%" },
                                    maxWidth: { xs: "100%", sm: "30%", md: "10%" },
                                }}
                            />

                            {/* Factor */}
                            <Grid
                                sx={{
                                    flexBasis: { xs: "100%", sm: "30%", md: "8%" },
                                    maxWidth: { xs: "100%", sm: "30%", md: "8%" },
                                }}
                            >
                                <TextField
                                    label="Factor"
                                    size="small"
                                    fullWidth
                                    value={form.factor || ""}
                                    placeholder="e.g. 1.25"
                                    onChange={(e) => setField("factor")(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <FunctionsIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>

                            {/* Effective From */}
                            <Grid
                                sx={{
                                    flexBasis: { xs: "100%", sm: "30%", md: "11%" },
                                    maxWidth: { xs: "100%", sm: "30%", md: "11%" },
                                }}
                            >
                                <TextField
                                    label="Effective From"
                                    type="date"
                                    size="small"
                                    fullWidth
                                    value={form.effFrom || ""}
                                    onChange={(e) => setField("effFrom")(e.target.value)}
                                    InputLabelProps={{ shrink: true }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EventIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>

                            {/* Effective To */}
                            <Grid
                                sx={{
                                    flexBasis: { xs: "100%", sm: "30%", md: "11%" },
                                    maxWidth: { xs: "100%", sm: "30%", md: "11%" },
                                }}
                            >
                                <TextField
                                    label="Effective To"
                                    type="date"
                                    size="small"
                                    fullWidth
                                    value={form.effTo || ""}
                                    onChange={(e) => setField("effTo")(e.target.value)}
                                    InputLabelProps={{ shrink: true }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EventIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                        </Grid>

                    </>
                );

            default:
                return null;
        }
    };


    if (selectedMaster !== "cvFactors") return null;

    return (
        <ValidationProvider
            rules={{
                add: () =>
                    selected === "floor"
                        ? form.floorId && form.factor && form.effFrom && form.effTo
                        : selected === "construction"
                            ? form.constType && form.factor && form.effFrom && form.effTo
                            : selected === "subtype"
                                ? form.subTypeDesc && (form.appliesTo?.length > 0) && form.factor && form.effFrom && form.effTo
                                : selected === "depreciation"
                                    ? form.constType && form.minYear && form.maxYear && form.rate && form.year && form.factor && form.effFrom && form.effTo
                                    : false,

                updated: () =>
                    editingIndex !== null &&
                    (selected === "floor"
                        ? form.floorId && form.factor && form.effFrom && form.effTo
                        : selected === "construction"
                            ? form.constType && form.factor && form.effFrom && form.effTo
                            : selected === "subtype"
                                ? form.subTypeDesc && (form.appliesTo?.length > 0) && form.factor && form.effFrom && form.effTo
                                : selected === "depreciation"
                                    ? form.constType && form.minYear && form.maxYear && form.rate && form.year && form.factor && form.effFrom && form.effTo
                                    : false),

                clear: () => editingIndex !== null || Object.values(form).some(val => !!val),
                delete: () => rows.length > 0, // delete only if table has rows
            }}
        >
            <Grid className="justify-content-center">
                {selectedMaster === "cvFactors" && (
                    <div className="p-1 pt-0">
                        <div className="flex items-center justify-center mb-4 bg-[#effef0] rounded-xl h-22">
                            <h3 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 p-4">
                                CV Factor
                            </h3>
                        </div>

                        {/* Radios */}
                        <Grid
                            className="p-2"
                            sx={{
                                backgroundColor: "#F3FAF6"
                            }}
                        >
                            {/* Responsive RadioGroup */}
                            <RadioGroup
                                value={selected}
                                onChange={(e) => {
                                    setSelected(e.target.value);
                                    resetForm();
                                }}
                                sx={{
                                    display: "grid",
                                    gap: 1,
                                    gridTemplateColumns: {
                                        xs: "1fr",
                                        sm: "1fr 1fr",
                                        md: "1fr 1fr",
                                        lg: "repeat(4, 1fr)",
                                    },
                                    justifyItems: {
                                        xs: "start",
                                        sm: "start",
                                        md: "center",
                                        lg: "center",
                                    },
                                    pl: {
                                        xs: 2
                                    },
                                }}
                            >
                                <FormControlLabel value="floor" control={<Radio />} label="Floor Factor" />
                                <FormControlLabel value="construction" control={<Radio />} label="Construction Factor" />
                                <FormControlLabel value="subtype" control={<Radio />} label="Sub Type of Use Factor" />
                                <FormControlLabel value="depreciation" control={<Radio />} label="Depreciation Factor" />
                            </RadioGroup>

                            {/* Dynamic form below */}
                            <Grid container
                                spacing={2}
                                className="mt-4 mb-4"
                                sx={{
                                    justifyContent: { xs: "flex-start", md: "center" }, // start on small, center on large
                                    alignItems: "center",
                                }} >
                                {renderFields()}
                            </Grid>
                        </Grid>


                        {/* Action buttons */}
                        <Box sx={{ mt: { xs: 2, md: 3 } }} >
                            <Grid container spacing={2} justifyContent="center">
                                {editingIndex === null ? (
                                    <Grid item xs={12} sm="auto">
                                        <CustomButton type="add" onClick={handleAdd} style={{ width: "130px" }}>
                                            Add
                                        </CustomButton>
                                    </Grid>
                                ) : (
                                    <Grid item xs={12} sm="auto">
                                        <CustomButton type="updated" onClick={handleUpdate} style={{ width: "130px" }}>
                                            Update
                                        </CustomButton>
                                    </Grid>
                                )}
                                <Grid item xs={12} sm="auto">
                                    <CustomButton type="clear" onClick={handleClear} style={{ width: "130px" }}>
                                        Clear
                                    </CustomButton>
                                </Grid>
                            </Grid>
                        </Box>


                        {/* Tables */}
                        <Grid container spacing={2} className="mt-4" sx={{ display: "flex", justifyContent: "center" }}>
                            <MasterCustomTable
                                columns={tableColumns[selected]}
                                data={filteredRows}
                                onEdit={handleEditFromTable}
                                onDelete={handleDeleteFromTable}
                                onRowClick={handleRowClick}
                                editIndex={editingIndex}
                                pagination={true}
                            />
                        </Grid>
                    </div>
                )}
            </Grid>
        </ValidationProvider>
    );
}
