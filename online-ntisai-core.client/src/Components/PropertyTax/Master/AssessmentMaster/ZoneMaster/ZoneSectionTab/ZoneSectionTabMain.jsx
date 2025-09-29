// src/Components/PropertyTax/Master/CVMaster/ZoneMaster/ZoneSectionTab/ZoneSectionTabMain.jsx
import * as React from "react";
import {
    Grid,
    TextField,
    MenuItem,
    InputAdornment,
    Typography,
    Box,
} from "@mui/material";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import FeedIcon from "@mui/icons-material/Feed";
import CategoryIcon from "@mui/icons-material/Category";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CustomButton from "../../../../../../Helpers/ExtraProperties/CustomButtons";
import ZoneSectionRecordsTable from "./ZoneSectionRecordsTable";
import { ValidationProvider } from "../../../../../../Contexts/ValidationContext";

// Seed zones to bind section -> zone
const ZONES = ["Zone A", "Zone B", "Zone C", "Zone D"];
const SECTIONS = ["Section 1", "Section 2", "Section 3", "Section 4"];

const DEFAULT_ROWS = [
    { id: 1, sectionNo: "Section 1", zoneNo: "Zone A", remark: "Central cluster" },
    { id: 2, sectionNo: "Section 2", zoneNo: "Zone B", remark: "Business cluster" },
    { id: 3, sectionNo: "Section 3", zoneNo: "Zone C", remark: "Industrial block A" },
];

export default function ZoneSectionTabMain() {
    const [sectionNo, setSectionNo] = React.useState("select section");
    const [zoneNo, setZoneNo] = React.useState("select zone");
    const [remark, setRemark] = React.useState("");

    const [rows, setRows] = React.useState(DEFAULT_ROWS);
    const [editingId, setEditingId] = React.useState(null);

    const editIndex = React.useMemo(
        () => rows.findIndex((r) => r.id === editingId),
        [rows, editingId]
    );

    const resetForm = () => {
        setSectionNo("select section");
        setZoneNo("select zone");
        setRemark("");
        setEditingId(null);
    };

    const handleNew = () => resetForm();

    const handleSave = () => {
        if (
            !sectionNo ||
            sectionNo === "select section" ||
            !zoneNo ||
            zoneNo === "select zone" ||
            !remark.trim()
        )
            return;
        const nextId = rows.length ? Math.max(...rows.map((r) => r.id)) + 1 : 1;

        // ✅ Add new row at the beginning
        setRows([{ id: nextId, sectionNo, zoneNo, remark }, ...rows]);

        resetForm();
    };

    const handleUpdate = () => {
        if (editingId == null) return;
        setRows((prev) =>
            prev.map((r) =>
                r.id === editingId ? { ...r, sectionNo, zoneNo, remark } : r
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
        setSectionNo(row.sectionNo);
        setZoneNo(row.zoneNo);
        setRemark(row.remark || "");
    };

    return (
        <Box>
            {/* Section title */}
            <Grid container alignItems="center" columnGap={1} sx={{ mb: 2 }}>
                <CategoryIcon color="primary" />
                <Typography sx={{ fontWeight: 600, color: "text.primary", mt: 1 }}>
                    Zone Section Information
                </Typography>
            </Grid>

            {/* Form */}
            <Grid
                container
                spacing={2}
                sx={{
                    gap: 2,
                    mb: 2,
                }}
            >
                {/* Section No (dropdown) */}
                <Grid sx={{
                    flexBasis: { xs: "100%", sm: "45%", md: "25%" },
                    maxWidth: { xs: "100%", sm: "45%", md: "25%" },
                }}>
                    <TextField
                        id="sectionNo"
                        select
                        fullWidth
                        size="small"
                        label="Select Section"
                        variant="outlined"
                        value={sectionNo}
                        onChange={(e) => setSectionNo(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <HomeWorkIcon sx={{ color: "#757575" }} />
                                </InputAdornment>
                            ),
                        }}
                    >
                        <MenuItem value="select section" disabled>
                            Select Section
                        </MenuItem>
                        {SECTIONS.map((s) => (
                            <MenuItem key={s} value={s}>
                                {s}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                {/* Zone No (dropdown) */}
                <Grid sx={{
                    flexBasis: { xs: "100%", sm: "45%", md: "25%" },
                    maxWidth: { xs: "100%", sm: "45%", md: "25%" },
                }}>
                    <TextField
                        id="zoneNo"
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
                        {ZONES.map((z) => (
                            <MenuItem key={z} value={z}>
                                {z}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                {/* Remark (with placeholder) */}
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

            {/* Buttons */}
            <ValidationProvider
                rules={{
                    new: () => true, // always valid
                    save: () =>
                        sectionNo !== "select section" &&
                        zoneNo !== "select zone" &&
                        remark.trim() !== "",
                    updated: () =>
                        editingId !== null &&
                        sectionNo !== "select section" &&
                        zoneNo !== "select zone" &&
                        remark.trim() !== "",
                    delete: () => editingId !== null,
                    clear: () =>
                        sectionNo !== "select section" ||
                        zoneNo !== "select zone" ||
                        remark.trim() !== "",
                }}
            >
                <Box sx={{ mt: { xs: 2, md: 3 } }} >
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12} sm="auto" >
                            <CustomButton type="add" onClick={handleNew} style={{ width: "120px" }}>
                                New
                            </CustomButton>
                        </Grid>
                        <Grid item xs={12} sm="auto" >
                            <CustomButton type="save" onClick={handleSave} style={{ width: "120px" }}>
                                Save
                            </CustomButton>
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
                            <CustomButton type="clear" onClick={resetForm} style={{ width: "120px" }}>
                                Clear
                            </CustomButton>
                        </Grid>
                    </Grid>
                </Box>
            </ValidationProvider>

            {/* Records table */}
            <ZoneSectionRecordsTable
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
