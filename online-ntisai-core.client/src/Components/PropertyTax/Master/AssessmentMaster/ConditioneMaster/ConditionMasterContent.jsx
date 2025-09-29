// src/.../ConditionMasterContent.jsx
import React, { useMemo, useState } from "react";
import {
    Grid,
    Paper,
    TextField,
    MenuItem,
    InputAdornment,
    Typography,
    Box,
    IconButton,
    Tooltip,
    GlobalStyles,
} from "@mui/material";

import CustomButton from "../../../../../Helpers/ExtraProperties/CustomButtons";
import MasterCustomTable from "../../../../../Helpers/ExtraProperties/MasterCustomTable";
import { ValidationProvider } from "../../../../../Contexts/ValidationContext";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import HomeWorkIcon from "@mui/icons-material/HomeWork";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import ConstructionOutlinedIcon from "@mui/icons-material/ConstructionOutlined";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import StyleOutlinedIcon from "@mui/icons-material/StyleOutlined";
import PercentIcon from "@mui/icons-material/Percent";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DifferenceIcon from "@mui/icons-material/Difference";

const FLOORS = ["FL001", "FL002", "FL003", "FL004", "FL005"];
const CONSTRUCTIONS = ["RCC", "Load Bearing", "Steel Structure", "Wooden", "Composite"];
const USE_TYPES = ["Residential", "Commercial", "Industrial", "Institutional", "Mixed Use"];
const TYPES = ["Type A", "Type B", "Type C"];

const TABLE_MAX_HEIGHT = 420;

// ---- helpers for CONDITION ID sequencing ----
const extractIdNum = (id) => {
    const m = String(id || "").match(/(\d+)$/);
    return m ? parseInt(m[1], 10) : -Infinity;
};
const buildNextCondId = (allRows) => {
    const maxNum = allRows.reduce((acc, r) => Math.max(acc, extractIdNum(r.conditionId)), 0);
    const next = maxNum + 1;
    return `COND${String(next).padStart(3, "0")}`;
};

export default function ConditionMasterContent() {
    // ---- Form state ----
    const [floor, setFloor] = useState("");
    const [construction, setConstruction] = useState("");
    const [useType, setUseType] = useState("");
    const [type, setType] = useState("");
    const [percent, setPercent] = useState("");

    // Toolbar search / filter
    const [searchId, setSearchId] = useState("");
    const [filterId, setFilterId] = useState("");

    // which row is being edited and on which table: 'left' | 'right' | null
    const [editingId, setEditingId] = useState(null);
    const [editingSide, setEditingSide] = useState(null);

    // ---- Table data ----
    const [leftRows, setLeftRows] = useState([
        { id: 1, conditionId: "COND001", floorId: "FL001", propertyType: "RCC", useType: "Residential", rate: 120 },
        { id: 2, conditionId: "COND002", floorId: "FL002", propertyType: "Load Bearing", useType: "Commercial", rate: 110 },
        { id: 3, conditionId: "COND003", floorId: "FL003", propertyType: "Steel Structure", useType: "Industrial", rate: 85 },
        { id: 4, conditionId: "COND004", floorId: "FL004", propertyType: "Wooden", useType: "Institutional", rate: 52 },
        { id: 5, conditionId: "COND005", floorId: "FL001", propertyType: "RCC", useType: "Mixed Use", rate: 125 },
        { id: 6, conditionId: "COND006", floorId: "FL002", propertyType: "Load Bearing", useType: "Residential", rate: 95 },
        { id: 7, conditionId: "COND007", floorId: "FL005", propertyType: "Composite", useType: "Commercial", rate: 118 },
    ]);

    const [rightRows, setRightRows] = useState(() => [
        { id: 1, conditionId: "COND001", floorId: "FL001", propertyType: "RCC", useType: "Residential", rate: 120 },
        { id: 2, conditionId: "COND002", floorId: "FL002", propertyType: "Load Bearing", useType: "Commercial", rate: 110 },
        { id: 3, conditionId: "COND003", floorId: "FL003", propertyType: "Steel Structure", useType: "Industrial", rate: 85 },
        { id: 4, conditionId: "COND004", floorId: "FL004", propertyType: "Wooden", useType: "Institutional", rate: 52 },
        { id: 5, conditionId: "COND005", floorId: "FL001", propertyType: "RCC", useType: "Mixed Use", rate: 125 },
        { id: 6, conditionId: "COND006", floorId: "FL002", propertyType: "Load Bearing", useType: "Residential", rate: 95 },
        { id: 7, conditionId: "COND007", floorId: "FL005", propertyType: "Composite", useType: "Commercial", rate: 118 },
    ]);

    // ---- Helpers ----
    const nextId = useMemo(() => {
        const all = [...leftRows, ...rightRows];
        return (all.reduce((m, r) => Math.max(m, r.id || 0), 0) || 0) + 1;
    }, [leftRows, rightRows]);

    const toNumberOr = (v, fallback) => {
        const n = Number(v);
        return Number.isFinite(n) ? n : fallback;
    };

    // ===== Simple flags =====
    const hasFormValues =
        String(floor).trim() !== "" &&
        String(construction).trim() !== "" &&
        String(useType).trim() !== "" &&
        String(percent).trim() !== "";

    const canAdd = !editingId && hasFormValues;
    const canUpdate = !!editingId && hasFormValues;
    const canDelete = !!editingId;
    const canClearForm = !!(editingId || floor || construction || useType || type || percent);

    const hasActiveSearch = filterId.trim().length > 0;
    const canSearch = !editingId && searchId.trim() !== "";
    const canClearSearch = !editingId && hasActiveSearch;

    // Filtered rows (applied when user hits Search)
    const filteredLeftRows = useMemo(() => {
        if (!filterId) return leftRows;
        const q = filterId.toUpperCase();
        return leftRows.filter((r) => r.conditionId.toUpperCase().includes(q));
    }, [leftRows, filterId]);

    const filteredRightRows = useMemo(() => {
        if (!filterId) return rightRows;
        const q = filterId.toUpperCase();
        return rightRows.filter((r) => r.conditionId.toUpperCase().includes(q));
    }, [rightRows, filterId]);

    // ---- Row actions (side-aware) ----
    const onEditRow = (row, side /* 'left' | 'right' */) => {
        setEditingId(row.conditionId);
        setEditingSide(side);
        // Load fields for editing
        setFloor(row.floorId);
        setConstruction(row.propertyType);
        setUseType(row.useType);
        setPercent(String(row.rate ?? ""));
    };

    const onDeleteRow = (row, side /* 'left' | 'right' */) => {
        const id = row.conditionId;
        if (side === "left") setLeftRows((prev) => prev.filter((r) => r.conditionId !== id));
        else setRightRows((prev) => prev.filter((r) => r.conditionId !== id));

        if (searchId === id && editingSide === side) setSearchId("");
        if (editingId === id && editingSide === side) handleCancel();
    };

    // ---- Add / Update / Delete (edit-mode) ----
    const handleAdd = () => {
        if (!canAdd) return;

        const newCondId = buildNextCondId([...leftRows, ...rightRows]);

        const newRow = {
            id: nextId,
            conditionId: newCondId,
            floorId: floor,
            propertyType: construction,
            useType: useType,
            rate: toNumberOr(percent, 0),
        };

        setLeftRows((prev) => [newRow, ...prev]);
        setRightRows((prev) => [newRow, ...prev]);

        handleCancel();
    };

    const handleUpdate = () => {
        if (!canUpdate) return;

        const patch = {
            floorId: floor,
            propertyType: construction,
            useType,
            rate: percent === "" ? undefined : toNumberOr(percent, 0),
        };

        const applyPatch = (r) =>
            r.conditionId === editingId
                ? {
                    ...r,
                    ...(patch.floorId ? { floorId: patch.floorId } : {}),
                    ...(patch.propertyType ? { propertyType: patch.propertyType } : {}),
                    ...(patch.useType ? { useType: patch.useType } : {}),
                    ...(patch.rate !== undefined ? { rate: patch.rate } : {}),
                }
                : r;

        if (editingSide === "left") setLeftRows((rows) => rows.map(applyPatch));
        else setRightRows((rows) => rows.map(applyPatch));

        handleCancel();
    };

    const handleDeleteEditing = () => {
        if (!canDelete) return;
        if (editingSide === "left") setLeftRows((prev) => prev.filter((r) => r.conditionId !== editingId));
        else setRightRows((prev) => prev.filter((r) => r.conditionId !== editingId));
        handleCancel();
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditingSide(null);
        setFloor("");
        setConstruction("");
        setUseType("");
        setType("");
        setPercent("");
    };

    // Toolbar search
    const handleSearchClick = () => {
        if (!canSearch) return;
        setFilterId((searchId || "").trim());
    };
    const handleClearSearch = () => {
        if (!canClearSearch) return;
        setFilterId("");
        setSearchId("");
    };

    // ---- Columns (NO custom Actions column; let table render built-in actions) ----
    const buildColumns = () => [
        { key: "conditionId", header: "CONDITION ID", isPrimary: true },
        { key: "floorId", header: "FLOOR ID" },
        { key: "propertyType", header: "PROPERTY TYPE" },
        { key: "useType", header: "TYPE OF USE" },
        { key: "rate", header: "RATE" },
    ];

    const columnsLeft = useMemo(() => buildColumns(), []);
    const columnsRight = useMemo(() => buildColumns(), []);

    // ---- Compute edit indices (relative to currently supplied data arrays) ----
    const leftEditIndex = useMemo(() => {
        if (editingSide !== "left" || !editingId) return -1;
        return filteredLeftRows.findIndex((r) => r.conditionId === editingId);
    }, [editingSide, editingId, filteredLeftRows]);

    const rightEditIndex = useMemo(() => {
        if (editingSide !== "right" || !editingId) return -1;
        return filteredRightRows.findIndex((r) => r.conditionId === editingId);
    }, [editingSide, editingId, filteredRightRows]);

    // ---- Bridge MasterCustomTable callbacks ----
    const makeTableHandlers = (side) => ({
        onRowClick: (_globalIndex, row) => onEditRow(row, side),
        onEdit: (_globalIndex, row) => onEditRow(row, side),
        onDelete: (_globalIndex, row) => onDeleteRow(row, side),
    });

    const leftHandlers = makeTableHandlers("left");
    const rightHandlers = makeTableHandlers("right");

    return (
        <>
            {/* Sticky header styles for tables inside .tableScroll containers */}
            <GlobalStyles
                styles={{
                    ".tableScroll": { position: "relative" },
                    ".tableScroll table": { borderCollapse: "separate", borderSpacing: 0, width: "100%" },
                    ".tableScroll thead th, .tableScroll thead td, .tableScroll .MuiTableCell-head": {
                        position: "sticky",
                        top: 0,
                        zIndex: 5,
                        background: "#0a6aa1",
                        color: "#fff",
                    },
                }}
            />

            {/* Header & Filters */}
            <Paper elevation={0} sx={{ borderRadius: 3, border: "1px solid #eef2f7", backgroundColor: "#fff" }}>
                <Box sx={{ backgroundColor: "#f0f6ff", borderRadius: 2, py: 1, mb: 3, textAlign: "center" }}>
                    <Typography variant="h5" sx={{ fontWeight: "bold", color: "#1e293b" }}>
                        Condition Master
                    </Typography>
                </Box>

                {/* Responsive form row */}
                <Grid
                    container
                    spacing={2}
                    className="mb-4 pt-3"
                    sx={{
                        display: "grid",
                        gap: 2,
                        gridTemplateColumns: {
                            xs: "1fr",                                // phones: 1 per row
                            sm: "repeat(2, minmax(0, 1fr))",          // small: 2 per row
                            md: "repeat(3, minmax(0, 1fr))",          // medium: 3 per row
                            lg: "repeat(5, minmax(0, 1fr))",          // large desktops: all in one row
                        },
                    }}
                >
                    <TextField
                        select
                        fullWidth
                        size="small"
                        label="Floor"
                        value={floor}
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => setFloor(e.target.value)}
                        SelectProps={{
                            displayEmpty: true,
                            renderValue: (selected) =>
                                selected !== "" ? selected : <span style={{ color: "#9ca3af" }}>Select Floor</span>,
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <CategoryOutlinedIcon sx={{ color: "#757575" }} />
                                </InputAdornment>
                            ),
                        }}
                    >
                        <MenuItem value="">
                            <em>Select Floor</em>
                        </MenuItem>
                        {FLOORS.map((f) => (
                            <MenuItem key={f} value={f}>
                                {f}
                            </MenuItem>
                        ))}
                    </TextField>

                    {/* "Construction Type" -> TYPES -> binds to `type` */}
                    <TextField
                        select
                        fullWidth
                        size="small"
                        label="Construction Type"
                        value={type}
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => setType(e.target.value)}
                        SelectProps={{
                            displayEmpty: true,
                            renderValue: (selected) =>
                                selected !== "" ? selected : <span style={{ color: "#9ca3af" }}>Select Construction Type</span>,
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <ConstructionOutlinedIcon sx={{ color: "#757575" }} />
                                </InputAdornment>
                            ),
                        }}
                    >
                        <MenuItem value="">
                            <em>Select Construction Type</em>
                        </MenuItem>
                        {TYPES.map((t) => (
                            <MenuItem key={t} value={t}>
                                {t}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        select
                        fullWidth
                        size="small"
                        label="Type of Use"
                        value={useType}
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => setUseType(e.target.value)}
                        SelectProps={{
                            displayEmpty: true,
                            renderValue: (selected) =>
                                selected !== "" ? selected : <span style={{ color: "#9ca3af" }}>Select Type of Use</span>,
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <HomeWorkOutlinedIcon sx={{ color: "#757575" }} />
                                </InputAdornment>
                            ),
                        }}
                    >
                        <MenuItem value="">
                            <em>Select Type of Use</em>
                        </MenuItem>
                        {USE_TYPES.map((u) => (
                            <MenuItem key={u} value={u}>
                                {u}
                            </MenuItem>
                        ))}
                    </TextField>

                    {/* "Type" -> CONSTRUCTIONS -> binds to `construction` */}
                    <TextField
                        select
                        fullWidth
                        size="small"
                        label="Type"
                        value={construction}
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => setConstruction(e.target.value)}
                        SelectProps={{
                            displayEmpty: true,
                            renderValue: (selected) =>
                                selected !== "" ? selected : <span style={{ color: "#9ca3af" }}>Select Type</span>,
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <StyleOutlinedIcon sx={{ color: "#757575" }} />
                                </InputAdornment>
                            ),
                        }}
                    >
                        <MenuItem value="">
                            <em>Select Construction</em>
                        </MenuItem>
                        {CONSTRUCTIONS.map((c) => (
                            <MenuItem key={c} value={c}>
                                {c}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        fullWidth
                        size="small"
                        type="number"
                        label="Percentage"
                        InputLabelProps={{ shrink: true }}
                        placeholder="Enter Percentage"
                        value={percent}
                        onChange={(e) => setPercent(e.target.value)}
                        inputProps={{ step: "0.1", min: 0 }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PercentIcon sx={{ color: "#757575" }} />
                                </InputAdornment>
                            ),
                            endAdornment: <InputAdornment position="end"></InputAdornment>,
                        }}
                    />

                    {/* Buttons — smaller on mobile, wrap if needed, no overflow */}
                </Grid>
                <Box sx={{ mt: { xs: 2, md: 3 }, mb: 2 }}>
                    <Grid container spacing={2} justifyContent="center">
                        <ValidationProvider
                            rules={{
                                add: () => canAdd,
                                updated: () => canUpdate,
                                delete: () => canDelete,
                                clear: () => canClearForm, // "Cancel"
                            }}
                        >
                            {!editingId ? (
                                <Grid item xs={12} sm="auto">
                                    <CustomButton
                                        type="add"
                                        onClick={handleAdd}
                                        style={{ width: "120px" }}
                                    >
                                        Add
                                    </CustomButton>
                                </Grid>
                            ) : (
                                <>
                                    <Grid item xs={12} sm="auto">
                                        <CustomButton
                                            type="updated"
                                            onClick={handleUpdate}
                                            style={{ width: "120px" }}
                                        >
                                            Update
                                        </CustomButton>
                                    </Grid>
                                    <Grid item xs={12} sm="auto">
                                        <CustomButton
                                            type="delete"
                                            onClick={handleDeleteEditing}
                                            style={{ width: "120px" }}
                                        >
                                            Delete
                                        </CustomButton>
                                    </Grid>
                                    <Grid item xs={12} sm="auto">
                                        <CustomButton
                                            type="clear"
                                            onClick={handleCancel}
                                            style={{ width: "120px" }}
                                        >
                                            Cancel
                                        </CustomButton>
                                    </Grid>
                                </>
                            )}
                        </ValidationProvider>
                    </Grid>
                </Box>

            </Paper>

            {/* Condition ID toolbar (Search + Clear) */}
            <Paper elevation={0} sx={{ mt: 2, borderRadius: 2, border: "1px solid #eef2f7", backgroundColor: "#ffffff" }}>
                <Grid container alignItems="center" columnSpacing={1.8} rowSpacing={1}>
                    <Grid item xs={12} sm>
                        <TextField
                            fullWidth
                            size="small"
                            type="text"
                            label="Condition ID"
                            InputLabelProps={{ shrink: true }}
                            placeholder="Enter ID To Search"
                            value={searchId}
                            onChange={(e) => setSearchId(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") handleSearchClick();
                            }}
                            inputProps={{ spellCheck: "false" }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <HomeWorkIcon />
                                    </InputAdornment>
                                ),
                            }}
                            disabled={false}
                            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                        />
                    </Grid>

                    <Grid item xs={12} sm="auto">
                        <ValidationProvider
                            rules={{
                                search: () => canSearch,
                                clear: () => canClearSearch,
                            }}
                        >
                            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                                <CustomButton type="search" onClick={handleSearchClick} sx={{ height: 40, borderRadius: 2, minWidth: 100 }}>
                                    Search
                                </CustomButton>
                                {hasActiveSearch && !editingId && (
                                    <CustomButton type="clear" onClick={handleClearSearch} sx={{ height: 40, borderRadius: 2, minWidth: 100 }}>
                                        Clear
                                    </CustomButton>
                                )}
                            </Box>
                        </ValidationProvider>
                    </Grid>
                </Grid>
            </Paper>

            {/* Tables stacked vertically and stretched to full width */}
            <Box
                sx={{
                    mt: 2,
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gap: 2,
                    width: "100%",
                }}
            >
                {/* Top: Condition Records */}
                <Paper
                    elevation={0}
                    sx={{
                        p: 1.5,
                        borderRadius: 2,
                        border: "1px solid #eef2f7",
                        backgroundColor: "#fff",
                        overflow: "hidden",
                        width: "100%",
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1, gap: 1 }}>
                        <AssignmentIcon sx={{ color: "#0a6aa1" }} />
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: 20, lineHeight: 1.3 }}>
                            Condition Records
                        </Typography>
                    </Box>

                    <Box className="tableScroll" sx={{ maxHeight: TABLE_MAX_HEIGHT, overflowY: "auto", overflowX: "auto" }}>
                        <Box sx={{ minWidth: 900 }}>
                            <MasterCustomTable
                                columns={columnsLeft}
                                data={filteredLeftRows}
                                editIndex={leftEditIndex}
                                pagination={true}
                                hoverEffect={true}
                                stripedRows={true}
                                onRowClick={leftHandlers.onRowClick}
                                onEdit={leftHandlers.onEdit}
                                onDelete={leftHandlers.onDelete}
                            />
                        </Box>
                    </Box>
                </Paper>

                {/* Bottom: Duplicate Records */}
                <Paper
                    elevation={0}
                    sx={{
                        p: 1.5,
                        borderRadius: 2,
                        border: "1px solid #eef2f7",
                        backgroundColor: "#fff",
                        overflow: "hidden",
                        width: "100%",
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1, gap: 1 }}>
                        <DifferenceIcon sx={{ color: "#0a6aa1" }} />
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: 20, lineHeight: 1.3 }}>
                            Duplicate Records
                        </Typography>
                    </Box>

                    <Box className="tableScroll" sx={{ maxHeight: TABLE_MAX_HEIGHT, overflowY: "auto", overflowX: "auto" }}>
                        <Box sx={{ minWidth: 900 }}>
                            <MasterCustomTable
                                columns={columnsRight}
                                data={filteredRightRows}
                                editIndex={rightEditIndex}
                                pagination={true}
                                hoverEffect={true}
                                stripedRows={true}
                                onRowClick={rightHandlers.onRowClick}
                                onEdit={rightHandlers.onEdit}
                                onDelete={rightHandlers.onDelete}
                            />
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </>
    );
}
