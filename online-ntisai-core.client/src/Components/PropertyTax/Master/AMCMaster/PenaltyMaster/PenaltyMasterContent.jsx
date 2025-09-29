import React, { useMemo, useState, useCallback } from "react";
import {
    Box,
    Typography,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Checkbox,
    Grid,
    Snackbar,
    Alert,
    styled,
} from "@mui/material";

import DescriptionIcon from "@mui/icons-material/Description";
import CustomButton from "../../../../../Helpers/ExtraProperties/CustomButtons";

const COLUMNS = [
    { key: "ID", label: "ID", type: "number" },
    { key: "AssesmentID", label: "AssesmentID", type: "text" },
    { key: "IsAppliedOwnerID", label: "IsAppliedOwnerID", type: "checkbox" },
    { key: "IsValidateDate", label: "IsValidateDate", type: "checkbox" },
    { key: "PropertyTax", label: "PropertyTax", type: "checkbox" },
    { key: "EducationTax", label: "EducationTax", type: "checkbox" },
    { key: "EmploymentTax", label: "EmploymentTax", type: "checkbox" },
    { key: "SpEducationTax", label: "SpEducationTax", type: "checkbox" },
    { key: "DrainCess", label: "DrainCess", type: "checkbox" },
    { key: "RoadCess", label: "RoadCess", type: "checkbox" },
    { key: "TreeCess", label: "TreeCess", type: "checkbox" },
    { key: "SewageDisposalCess", label: "SewageDisposalCess", type: "checkbox" },
    { key: "Sanitation", label: "Sanitation", type: "checkbox" },
    { key: "WaterBenefit", label: "WaterBenefit", type: "checkbox" },
    { key: "SpWaterCess", label: "SpWaterCess", type: "checkbox" },
    { key: "WaterBill", label: "WaterBill", type: "checkbox" },
    { key: "MajorBuilding", label: "MajorBuilding", type: "checkbox" },
    { key: "FireCess", label: "FireCess", type: "checkbox" },
    { key: "LightCess", label: "LightCess", type: "checkbox" },
    { key: "Tax1", label: "Tax1", type: "checkbox" },
    { key: "Tax2", label: "Tax2", type: "checkbox" },
    { key: "Tax3", label: "Tax3", type: "checkbox" },
    { key: "Tax4", label: "Tax4", type: "checkbox" },
    { key: "Tax5", label: "Tax5", type: "checkbox" },
    { key: "BillGeneration", label: "BillGenerationDate", type: "date" },
    { key: "start_half_on_current", label: "start_half_on_current", type: "date" },
    { key: "end_half_on_current", label: "end_half_on_current", type: "date" },
    { key: "start_full_on_current", label: "start_full_on_current", type: "date" },
    { key: "end_full_on_current", label: "end_full_on_current", type: "date" },
    { key: "start_full_on_pending", label: "start_full_on_pending", type: "date" },
    { key: "end_full_on_pending", label: "end_full_on_pending", type: "date" },
    { key: "Rate_current", label: "Rate_current", type: "number" },
    { key: "Rate_Pending", label: "Rate_Pending", type: "number" },
    { key: "Year", label: "Year", type: "text" },
];

// Sticky header styles
const StickyTableHead = styled(TableHead)({
    position: "sticky",
    top: 0,
    zIndex: 2,
    backgroundColor: "#e0e0e0",
});
const StickyHeaderCell = styled(TableCell)({
    backgroundColor: "#e0e0e0",
    fontWeight: "bold",
    whiteSpace: "nowrap",
    padding: "8px",
});

// Sample initial rows
const buildInitialRows = () =>
    Array.from({ length: 5 }).map((_, idx) => ({
        _selected: false,
        ID: idx + 1,
        AssesmentID: idx + 1, // integer
        IsAppliedOwnerID: false,
        IsValidateDate: idx % 2 === 1,
        PropertyTax: idx % 2 === 0,
        EducationTax: idx % 2 === 1,
        EmploymentTax: true,
        SpEducationTax: true,
        DrainCess: false,
        RoadCess: true,
        TreeCess: true,
        SewageDisposalCess: true,
        Sanitation: false,
        WaterBenefit: true,
        SpWaterCess: true,
        WaterBill: false,
        MajorBuilding: false,
        FireCess: true,
        LightCess: true,
        Tax1: true,
        Tax2: false,
        Tax3: false,
        Tax4: false,
        Tax5: false,
        BillGeneration: "01/01/2025",
        start_half_on_current: "15/01/2025",
        end_half_on_current: "30/06/2025",
        start_full_on_current: "01/07/2025",
        end_full_on_current: "31/12/2025",
        start_full_on_pending: "01/07/2024",
        end_full_on_pending: "31/12/2024",
        Rate_current: 2,
        Rate_Pending: 2,
        Year: "2025",
    }));

export default function PenaltyMasterContent() {
    const [rows, setRows] = useState(buildInitialRows());
    const [year, setYear] = useState("");
    const [editingCell, setEditingCell] = useState({ row: null, key: null });
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    const allSelected = rows.length > 0 && rows.every((r) => r._selected);
    const someSelected = rows.some((r) => r._selected);

    const handleSelectRow = (rowIndex) => {
        const updated = [...rows];
        updated[rowIndex]._selected = !updated[rowIndex]._selected;
        setRows(updated);
    };

    const handleSelectAll = (event) => {
        const checked = event.target.checked;
        setRows((prev) => prev.map((r) => ({ ...r, _selected: checked })));
    };

    // 🔥 Direct delete (no dialog)
    const handleDelete = () => {
        const selectedCount = rows.filter((r) => r._selected).length;
        if (selectedCount === 0) {
            setSnackbar({
                open: true,
                message: "Please select at least one row to delete",
                severity: "warning",
            });
            return;
        }
        setRows((prev) => prev.filter((r) => !r._selected));
        setSnackbar({
            open: true,
            message: `Successfully deleted ${selectedCount} record(s)`,
            severity: "success",
        });
    };

    const handleCellChange = useCallback((rowIndex, key, value) => {
        setRows((prev) => {
            const copy = [...prev];
            copy[rowIndex] = { ...copy[rowIndex], [key]: value };
            return copy;
        });
    }, []);

    // Next ID calculation
    const nextIds = useMemo(() => {
        const maxId = rows.reduce((m, r) => Math.max(m, Number(r.ID || 0)), 0);
        const next = maxId + 1;
        return { nextID: next };
    }, [rows]);

    // Add new row with same even/odd logic as initial rows
    const handleAddNew = () => {
        if (!year.trim()) {
            setSnackbar({
                open: true,
                message: "Please enter Year in 'Penalty Master Yearwise' before adding a row",
                severity: "warning",
            });
            return;
        }
        if (!/^\d{4}$/.test(year)) {
            setSnackbar({
                open: true,
                message: "Please enter a valid 4-digit year",
                severity: "warning",
            });
            return;
        }

        const newIndex = rows.length; // 0-based like buildInitialRows

        const newRow = {
            _selected: false,
            ID: nextIds.nextID,
            AssesmentID: nextIds.nextID, // integer

            IsAppliedOwnerID: false,
            IsValidateDate: newIndex % 2 === 1,
            PropertyTax: newIndex % 2 === 0,
            EducationTax: newIndex % 2 === 1,
            EmploymentTax: true,
            SpEducationTax: true,
            DrainCess: false,
            RoadCess: true,
            TreeCess: true,
            SewageDisposalCess: true,
            Sanitation: false,
            WaterBenefit: true,
            SpWaterCess: true,
            WaterBill: false,
            MajorBuilding: false,
            FireCess: true,
            LightCess: true,
            Tax1: true,
            Tax2: false,
            Tax3: false,
            Tax4: false,
            Tax5: false,

            BillGeneration: "01/01/2025",
            start_half_on_current: "15/01/2025",
            end_half_on_current: "30/06/2025",
            start_full_on_current: "01/07/2025",
            end_full_on_current: "31/12/2025",
            start_full_on_pending: "01/07/2024",
            end_full_on_pending: "31/12/2024",
            Rate_current: 2,
            Rate_Pending: 2,
            Year: year,
        };

        setRows((prev) => [...prev, newRow]);
        setSnackbar({
            open: true,
            message: "New record added successfully",
            severity: "success",
        });
    };

    const handleSave = () => {
        // Save to API here if needed
        setSnackbar({
            open: true,
            message: "Data saved successfully",
            severity: "success",
        });
    };

    const handleCloseSnackbar = () => {
        setSnackbar((s) => ({ ...s, open: false }));
    };

    return (
        <Box>
            {/* Header */}
            <Box
                sx={{
                    borderRadius: 2,
                    background:
                        "linear-gradient(135deg, #ededfaa6,rgb(226, 227, 246),rgb(238 242 253));",
                    pl: 2,
                    mb: 2,
                    py: 1,
                }}
            >
                <Typography
                    variant="h5"
                    fontWeight="bold"
                    textAlign="center"
                    padding="0.5rem"
                    fontSize="1.75rem"
                >
                    Penalty Master Information
                </Typography>
            </Box>

            <Typography
                variant="subtitle1"
                fontWeight="600"
                sx={{ mb: 1, color: "text.secondary" }}
            >
                Penalty Master Yearwise
            </Typography>

            <Grid container spacing={2} alignItems="center" mb={3}>
                <Grid item xs={12} sm={4}>
                    <TextField
                        label="Enter Year (e.g., 2025)"
                        size="small"
                        fullWidth
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                    />
                </Grid>
                <Grid item>
                    <CustomButton type="new" onClick={handleAddNew}>
                        New
                    </CustomButton>
                </Grid>
            </Grid>

            {/* Table */}
            <TableContainer
                component={Paper}
                sx={{
                    maxHeight: 500,
                    overflowX: "auto",   // ✅ horizontal scroll
                    overflowY: "auto",   // ✅ vertical scroll
                    position: "relative",
                    scrollbarWidth: "thin",
                    scrollbarColor: "#9e9e9e #f0f0f0",
                }}
            >
                <Table
                    size="small"
                    stickyHeader
                    sx={{
                        minWidth: 1800, // ✅ force horizontal scroll if columns exceed container width
                    }}
                >
                    <StickyTableHead>
                        <TableRow>
                            <TableCell
                                padding="checkbox"
                                sx={{ backgroundColor: "#e0e0e0", fontWeight: "bold" }}
                            >
                                <Checkbox
                                    checked={allSelected}
                                    indeterminate={!allSelected && someSelected}
                                    onChange={handleSelectAll}
                                    sx={{
                                        "&.Mui-checked, &.MuiCheckbox-indeterminate": {
                                            backgroundColor: "#f5f5f5",
                                            borderRadius: "4px",
                                        },
                                        "&.Mui-checked:hover, &.MuiCheckbox-indeterminate:hover": {
                                            backgroundColor: "#e0e0e0",
                                        },
                                    }}
                                />
                            </TableCell>
                            {COLUMNS.map((col) => (
                                <StickyHeaderCell key={col.key}>{col.label}</StickyHeaderCell>
                            ))}
                        </TableRow>
                    </StickyTableHead>

                    <TableBody>
                        {rows.map((row, rowIndex) => (
                            <TableRow key={`${row.AssesmentID}-${rowIndex}`} hover>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={row._selected || false}
                                        onChange={() => handleSelectRow(rowIndex)}
                                    />
                                </TableCell>

                                {COLUMNS.map((col) => {
                                    const value = row[col.key];
                                    const isEditing =
                                        editingCell.row === rowIndex && editingCell.key === col.key;

                                    if (col.type === "checkbox") {
                                        return (
                                            <TableCell key={col.key}>
                                                <Checkbox
                                                    checked={Boolean(value)}
                                                    onChange={(e) =>
                                                        handleCellChange(rowIndex, col.key, e.target.checked)
                                                    }
                                                />
                                            </TableCell>
                                        );
                                    }

                                    return (
                                        <TableCell
                                            key={col.key}
                                            onClick={() =>
                                                setEditingCell({ row: rowIndex, key: col.key })
                                            }
                                            sx={{ cursor: "pointer", padding: "8px" }}
                                        >
                                            {isEditing ? (
                                                <TextField
                                                    type={
                                                        col.key === "Year"
                                                            ? "text"
                                                            : col.type === "number"
                                                                ? "number"
                                                                : "text"
                                                    }
                                                    size="small"
                                                    autoFocus
                                                    fullWidth
                                                    sx={{
                                                        "& .MuiInputBase-input": { py: 1.2, px: 1.5 },
                                                        width:
                                                            col.key === "ID"
                                                                ? "80px"
                                                                : col.key === "BillGeneration"
                                                                    ? "100px"
                                                                    : col.key === "Year"
                                                                        ? "120px"
                                                                        : "100%",
                                                    }}
                                                    value={value || ""}
                                                    onChange={(e) => {
                                                        let val = e.target.value;
                                                        if (col.key === "Year") {
                                                            if (!/^\d{0,4}$/.test(val)) return;
                                                        }
                                                        handleCellChange(rowIndex, col.key, val);
                                                    }}
                                                    onBlur={() =>
                                                        setEditingCell({ row: null, key: null })
                                                    }
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter" || e.key === "Escape") {
                                                            setEditingCell({ row: null, key: null });
                                                        }
                                                    }}
                                                />
                                            ) : (
                                                value || "—"
                                            )}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>


            {/* Footer */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mt={3}>
                <Box display="flex" gap={2}>
                    <CustomButton type="save" onClick={handleSave}>
                        Insert/Update
                    </CustomButton>

                    <CustomButton type="delete" onClick={handleDelete}>
                        Delete
                    </CustomButton>
                </Box>

                <Box
                    sx={{
                        border: "1px solid #e0e0e0",
                        borderRadius: "8px",
                        px: 2,
                        py: 1,
                        backgroundColor: "#fafafa",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                    }}
                >
                    <DescriptionIcon fontSize="small" color="primary" />
                    <Typography variant="subtitle1" fontWeight="600" color="textPrimary">
                        Total Penalty Records: {rows.length}
                    </Typography>
                </Box>
            </Box>

            {/* Snackbar */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}
