// src/Components/PropertyTax/Master/CVMaster/ZoneMaster/ZoneTab/ZoneTabMain.jsx
import * as React from "react";
import {
    Grid,
    TextField,
    MenuItem,
    InputAdornment,
    Typography,
    Box,
} from "@mui/material";

import FeedIcon from "@mui/icons-material/Feed";
import CategoryIcon from "@mui/icons-material/Category";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CustomButton from "../../../../../../Helpers/ExtraProperties/CustomButtons";
import ZoneRecordsTable from "./ZoneRecordsTable";
import { ValidationProvider } from "../../../../../../Contexts/ValidationContext";
const ZONE_TYPES = ["Residential", "Commercial", "Industrial", "Mixed Use", "Agricultural"];

// Dropdown zones (your custom list)
const ZONE_NAMES = ["Zone A", "Zone B", "Zone C", "Zone D", "Zone E"];

const DEFAULT_ROWS = [
    { id: 1, zoneNo: "Zone A", zoneType: "Residential", remark: "Central residential area" },
    { id: 2, zoneNo: "Zone B", zoneType: "Commercial", remark: "Business district" },
    { id: 3, zoneNo: "Zone C", zoneType: "Industrial", remark: "Manufacturing area" },
    { id: 4, zoneNo: "Zone D", zoneType: "Mixed Use", remark: "Mixed development" },
    { id: 5, zoneNo: "Zone E", zoneType: "Agricultural", remark: "Farming Area" },
];

export default function ZoneTabMain() {
    const [zoneNo, setZoneNo] = React.useState("select zone");
    const [zoneType, setZoneType] = React.useState("");
    const [remark, setRemark] = React.useState("");

    const [rows, setRows] = React.useState(DEFAULT_ROWS);
    const [editingId, setEditingId] = React.useState(null);

    const editIndex = React.useMemo(
        () => rows.findIndex((r) => r.id === editingId),
        [rows, editingId]
    );

    const resetForm = () => {
        setZoneNo("select zone");
        setZoneType("");
        setRemark("");
        setEditingId(null);
    };

    const handleNew = () => resetForm();

    const handleSave = () => {
        if (
            zoneNo === "select zone" ||
            !zoneNo.trim() ||
            zoneType === "select type" ||
            !zoneType.trim() ||
            !remark.trim()
        )
            return;

        const nextId = rows.length ? Math.max(...rows.map((r) => r.id)) + 1 : 1;

        // ✅ Add new row at the beginning
        setRows([{ id: nextId, zoneNo, zoneType, remark }, ...rows]);

        resetForm();
    };

    const handleUpdate = () => {
        if (editingId == null) return;
        setRows((prev) =>
            prev.map((r) =>
                r.id === editingId ? { ...r, zoneNo, zoneType, remark } : r
            )
        );
        resetForm();
    };

    const handleDelete = () => {
        if (editingId == null) return;
        setRows((prev) => prev.filter((r) => r.id !== editingId));
        resetForm();
    };

    const handleRowEdit = (_i, row) => {
        setEditingId(row.id);
        setZoneNo(row.zoneNo);
        setZoneType(row.zoneType);
        setRemark(row.remark || "");
    };

    return (
        <Box>
            {/* Section title */}
            <Grid container alignItems="center" columnGap={1} sx={{ mb: 2 }}>
                <CategoryIcon color="primary" />
                <Typography sx={{ fontWeight: 600, color: "text.primary", mt: 1 }}>
                    Zone Information
                </Typography>
            </Grid>

            {/* Form grid */}
            <Grid container spacing={2} sx={{ mb: 2 }}>
                {/* Zone No (Dropdown instead of free text) */}
                <Grid sx={{
                    flexBasis: { xs: "100%", sm: "45%", md: "25%" },
                    maxWidth: { xs: "100%", sm: "45%", md: "25%" },
                }}>
                    <TextField
                        id="zone"
                        select
                        fullWidth
                        size="small"
                        label="Select Zone"
                        variant="outlined"
                        value={zoneNo}
                        onChange={(e) => setZoneNo(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountBalanceIcon />
                                </InputAdornment>
                            ),
                        }}
                    >
                        <MenuItem value="select zone" disabled>
                            Select Zone
                        </MenuItem>
                        {ZONE_NAMES.map((z) => (
                            <MenuItem key={z} value={z}>
                                {z}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                {/* Zone Type */}
                <Grid sx={{
                    flexBasis: { xs: "100%", sm: "45%", md: "25%" },
                    maxWidth: { xs: "100%", sm: "45%", md: "25%" },
                }}>
                    <TextField
                        id="zoneType"
                        select
                        fullWidth
                        size="small"
                        label="Select Zone Type"
                        variant="outlined"
                        value={zoneType || "select type"}
                        onChange={(e) => setZoneType(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <CategoryIcon />
                                </InputAdornment>
                            ),
                        }}
                    >
                        <MenuItem value="select type" disabled>
                            Select Zone Type
                        </MenuItem>
                        {ZONE_TYPES.map((z) => (
                            <MenuItem key={z} value={z}>
                                {z}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>


                {/* Remark */}
                <Grid sx={{
                    flexBasis: { xs: "100%", sm: "45%", md: "30%" },
                    maxWidth: { xs: "100%", sm: "45%", md: "30%" },
                }}>
                    <TextField
                        fullWidth
                        size="small"
                        label="Remark"
                        placeholder="Please Enter Remark"
                        value={remark}
                        onChange={(e) => setRemark(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FeedIcon sx={{ color: "#757575" }} />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
            </Grid>

            {/* Buttons row */}
            <ValidationProvider
                rules={{
                    new: () => true, // always valid
                    save: () =>
                        zoneNo !== "select zone" &&
                        zoneNo.trim() !== "" &&
                        zoneType !== "select type" &&
                        zoneType.trim() !== "" &&
                        remark.trim() !== "",
                    updated: () =>
                        editingId !== null &&
                        zoneNo !== "select zone" &&
                        zoneNo.trim() !== "" &&
                        zoneType !== "select type" &&
                        zoneType.trim() !== "" &&
                        remark.trim() !== "",
                    delete: () => editingId !== null,
                    clear: () =>
                        zoneNo !== "select zone" ||
                        zoneType !== "" ||
                        remark.trim() !== "",
                }}
            >
                <Box sx={{ mt: { xs: 2, md: 3 } }} >
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12} sm="auto">
                            <CustomButton type="add" onClick={handleNew} style={{ width: "120px" }}>New</CustomButton>
                        </Grid>
                        <Grid item xs={12} sm="auto" >
                            <CustomButton type="save" onClick={handleSave} style={{ width: "120px" }}>Save</CustomButton>
                        </Grid>

                        {/* Show Update & Delete only when editing */}
                        {editingId !== null && (
                            <>
                                <Grid item xs={12} sm="auto" >
                                    <CustomButton type="updated" onClick={handleUpdate} style={{ width: "120px" }}>
                                        Update
                                    </CustomButton>
                                </Grid>
                                <Grid item xs={12} sm="auto" >
                                    <CustomButton type="delete" onClick={handleDelete} style={{ width: "120px" }}>
                                        Delete
                                    </CustomButton>
                                </Grid>
                            </>
                        )}

                        <Grid item xs={12} sm="auto" >
                            <CustomButton type="clear" onClick={resetForm} style={{ width: "120px" }}>Clear</CustomButton>
                        </Grid>
                    </Grid>
                </Box>
            </ValidationProvider>
            {/* Records table */}
            <ZoneRecordsTable
                rows={rows}
                onEdit={handleRowEdit}
                onDelete={(_i, row) => {
                    setRows((prev) => prev.filter((r) => r.id !== row.id));
                    if (editingId === row.id) resetForm();
                }}
                editIndex={editIndex === -1 ? null : editIndex}
            />
        </Box>
    );
}
