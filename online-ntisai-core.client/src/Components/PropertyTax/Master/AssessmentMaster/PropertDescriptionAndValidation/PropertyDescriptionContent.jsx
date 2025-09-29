import React from "react";
import {
    Box, Grid, Typography, Paper, TextField, MenuItem, InputAdornment, Stack,
    useMediaQuery, useTheme, Table, TableHead, TableBody, TableRow, TableCell,
    TableContainer, ClickAwayListener, Select
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import CustomButton from "../../../../../Helpers/ExtraProperties/CustomButtons";
import { ValidationProvider } from "../../../../../Contexts/ValidationContext";
import DescriptionIcon from "@mui/icons-material/Description";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import TypeSpecimenIcon from "@mui/icons-material/TypeSpecimen";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";

/* Ordinal headers: FIRST -> TWENTIETH */
const ORDINALS = [
    "FIRST", "SECOND", "THIRD", "FOURTH", "FIFTH", "SIXTH", "SEVENTH", "EIGHTH", "NINTH", "TENTH",
    "ELEVENTH", "TWELFTH", "THIRTEENTH", "FOURTEENTH", "FIFTEENTH", "SIXTEENTH", "SEVENTEENTH", "EIGHTEENTH", "NINETEENTH", "TWENTIETH",
];
const NUM_VALUE_COLS = ORDINALS.length;

/* TYPE (LOCAL) options from your screenshot */
const TYPE_LOCAL_OPTIONS = ["अनिवासी", "औद्योगिक", "NO TAX", "निवासी", "मिश्र"];

/* Each ordinal column gets its own 3-option list */
const OPTIONS_BY_COL = {
    first: ["EP", "WEP", "DG"],
    second: ["V", "WR", "WC"],
    third: ["PR", "OP", "O"],
    fourth: ["C", "S", "R"],
    fifth: ["UC", "UCC", "CH"],
    sixth: ["IC", "ICP", "ICC"],
    seventh: ["ICR", "ICCT", "ICHT"],
    eighth: ["GR", "WGR", "RGN"],
    ninth: ["SPK", "SPKC", "OPK"],
    tenth: ["OPKC", "PRIT", "ASW"],
    eleventh: ["N", "NR", "NC"],
    twelfth: ["MTR", "T", "GO"],
    thirteenth: ["AG", "PC", "WAT"],
    fourteenth: ["B", "GC", "WGC"],
    fifteenth: ["HO", "V2", "R2"],
    sixteenth: ["C2", "S2", "R2"],
    seventeenth: ["R", "C", "SPK"],
    eighteenth: ["GR", "ICR", "MTR"],
    nineteenth: ["NR", "PR", "WC"],
    twentieth: ["SPK", "NC", "OPK"],
};
const getOptionsForKey = (key) => OPTIONS_BY_COL[key] ?? [];

/* Include current cell value at the front if it's not already in the allowed options */
const getOptionsIncludingCurrent = (baseOptions, current) => {
    const base = baseOptions || [];
    if (current && !base.includes(current)) return [current, ...base];
    return base;
};

/* Sample data: 20 short codes per row */
const INITIAL_ROWS = [
    {
        id: 1, propertyDescription: "खाजगी शाळा", typeLocal: "C", typeDescription: "बिगर निवासी",
        values: ["EP", "WEP", "V", "OPK", "RGN", "N", "C", "S", "HO", "WR", "SPKC", "OPKC", "NC", "ICH", "ICHT", "WR", "GR", "IC", "PR", "SPK"]
    },
    {
        id: 2, propertyDescription: "म.न.पा. शाळा", typeLocal: "N", typeDescription: "नगरपालिका मालकी शाळा",
        values: ["N", "V", "ICCT", "PR", "C", "S", "SPK", "OPK", "SPKC", "ICC", "OP", "SPK", "N", "T", "SPK", "WAT", "ICR", "NC", "NR", "OPK"]
    },
    {
        id: 3, propertyDescription: "खाजगी रुग्णालय", typeLocal: "C", typeDescription: "बिगर निवासी",
        values: ["DG", "GC", "V", "GR", "WGR", "SPK", "OPK", "ICCT", "ICHT", "WR", "O", "PR", "SPK", "OP", "ICCT", "NR", "AG", "OPK", "WC", "SPK"]
    },
    {
        id: 4, propertyDescription: "म.न.पा. चे रुग्णालय", typeLocal: "N", typeDescription: "नगरपालिका मालकी रुग्णालय",
        values: ["N", "V", "WC", "N", "C", "R", "WR", "O", "PR", "SPK", "OP", "OPK", "OP", "ICCT", "N", "MTR", "SPK", "OBC", "SPK", "NC"]
    },
    {
        id: 5, propertyDescription: "बँक व वित्तीय संस्था", typeLocal: "C", typeDescription: "बिगर निवासी",
        values: ["B", "WC", "V", "UC", "CH", "S", "OPK", "SPK", "N", "MTR", "OBC", "SPK", "C", "PR", "ICCT", "WR", "PC", "SPK", "C", "PRIT"]
    },
    {
        id: 6, propertyDescription: "धार्मिक स्थळ", typeLocal: "R", typeDescription: "धार्मिक",
        values: ["R", "V", "UC", "C", "T", "OPK", "SPK", "N", "T", "SPK", "WAT", "ICR", "ICP", "PR", "SPK", "NC", "NR", "ICCT", "ICR", "OPK"]
    },
    {
        id: 7, propertyDescription: "निवासी", typeLocal: "R", typeDescription: "निवासी",
        values: ["S", "H", "N", "C", "GO", "UCC", "UC", "R", "OPK", "OPKC", "NC", "WR", "UC", "SPK", "OPK", "ICCT", "ICHT", "WR", "O", "SPK"]
    },
    {
        id: 8, propertyDescription: "दुकान", typeLocal: "C", typeDescription: "बिगर निवासी",
        values: ["ASW", "PR", "PR", "SPK", "ICCT", "ICR", "WR", "C", "PRIT", "S", "ICP", "PR", "WR", "UC", "OPK", "NC", "NR", "ICCT", "ICR", "SPK"]
    },
    {
        id: 9, propertyDescription: "रेस्टॉरंट आणि बार", typeLocal: "C", typeDescription: "बिगर निवासी",
        values: ["R", "WR", "V", "S", "WC", "SPK", "OPK", "NC", "NR", "ICCT", "ICR", "OPK", "V", "GR", "WGC", "OPK", "RGN", "N", "C", "S"]
    },
];

/* Columns */
const COLUMNS = [
    { key: "propertyDescription", header: "PROPERTY DESCRIPTION" },
    { key: "typeLocal", header: "TYPE (LOCAL)" },
    { key: "typeDescription", header: "TYPE DESCRIPTION" },
    ...ORDINALS.map((label) => ({ key: label.toLowerCase(), header: label, align: "right" })),
];

/* Map ordinal key -> index inside values[] */
const ordinalIndexByKey = Object.fromEntries(ORDINALS.map((l, i) => [l.toLowerCase(), i]));

/* pad to 20 values with blanks */
const padValues = (arr) => {
    const vals = (arr ?? []).slice(0, NUM_VALUE_COLS);
    while (vals.length < NUM_VALUE_COLS) vals.push("");
    return vals;
};

export default function PropertyDescriptionContent() {
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down("sm"));

    const idRef = React.useRef(INITIAL_ROWS.length + 1);

    const [rows, setRows] = React.useState(() =>
        INITIAL_ROWS.map((r) => ({ ...r, values: padValues(r.values) }))
    );

    // >>> PAGINATION
    const ROWS_PER_PAGE = 8;
    const [page, setPage] = React.useState(1);
    const totalPages = Math.max(1, Math.ceil(rows.length / ROWS_PER_PAGE));
    const pagedRows = React.useMemo(() => {
        const start = (page - 1) * ROWS_PER_PAGE;
        return rows.slice(start, start + ROWS_PER_PAGE);
    }, [rows, page]);
    // <<< PAGINATION

    const [newDescription, setNewDescription] = React.useState("");
    const [newType, setNewType] = React.useState("");
    const [newTypeDescription, setNewTypeDescription] = React.useState("");
    const [editingId, setEditingId] = React.useState(null);

    // which single cell is in edit mode
    const [editingCell, setEditingCell] = React.useState(null); // {rowId, key} | null

    const resetForm = () => {
        setNewDescription("");
        setNewType("");
        setNewTypeDescription("");
        setEditingId(null);
    };

    const onAddOrUpdate = () => {
        if (editingId == null) {
            const nextId = idRef.current++;
            const newRow = {
                id: nextId,
                propertyDescription: newDescription.trim(),
                typeLocal: newType,
                typeDescription: newTypeDescription.trim(),
                values: Array(NUM_VALUE_COLS).fill(""),
            };
            setRows((prev) => [newRow, ...prev]);
            setPage(1);
        } else {
            setRows((prev) =>
                prev.map((r) =>
                    r.id === editingId
                        ? {
                            ...r,
                            propertyDescription: newDescription.trim(),
                            typeLocal: newType,
                            typeDescription: newTypeDescription.trim(),
                        }
                        : r
                )
            );
        }
        resetForm();
    };

    const onGenerateExcel = () => {
        const headers = ["PROPERTY DESCRIPTION", "TYPE (LOCAL)", "TYPE DESCRIPTION", ...ORDINALS];
        const rowsForCsv = rows.map((r) =>
            [
                `"${r.propertyDescription}"`,
                `"${r.typeLocal}"`,
                `"${r.typeDescription}"`,
                ...padValues(r.values).map((v) => `"${v ?? ""}"`),
            ].join(",")
        );
        const csv = "\uFEFF" + [headers.join(","), ...rowsForCsv].join("\n");
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "PropertyDescriptionUseValidation.csv";
        a.click();
        URL.revokeObjectURL(url);
    };

    const hasFormValues = newDescription.trim() !== "" && newType.trim() !== "" && newTypeDescription.trim() !== "";
    const canAdd = editingId == null && hasFormValues;
    const canUpdate = editingId != null && hasFormValues;

    const actionBtnSx = {
        height: { xs: 34, sm: 40 }, minHeight: { xs: 34, sm: 40 },
        px: { xs: 1.25, sm: 2 }, fontSize: { xs: 12, sm: 14 },
        borderRadius: 2, minWidth: { xs: 100, sm: 120 }, alignSelf: "flex-start",
    };
    const equalFieldSx = {
        "& .MuiOutlinedInput-root": { borderRadius: 2, minHeight: 40 },
        "& .MuiInputBase-input": { py: 0.75 },
    };

    const selectedHoverBg = alpha(theme.palette.primary.main, 0.06);

    // display + update
    const getDisplayValue = (row, key) => {
        if (key === "typeLocal") return row.typeLocal ?? "";
        if (key === "typeDescription") return row.typeDescription ?? "";
        const idx = ordinalIndexByKey[key];
        if (idx !== undefined) return row.values?.[idx] ?? "";
        return row[key] ?? "";
    };

    const minTableWidth = Math.max(1200, COLUMNS.length * 140);

    const handleCellChange = (rowId, key, newValue) =>
        setRows((prev) =>
            prev.map((r) => {
                if (r.id !== rowId) return r;

                if (key === "propertyDescription") return { ...r, propertyDescription: newValue };
                if (key === "typeLocal") return { ...r, typeLocal: newValue };
                if (key === "typeDescription") return { ...r, typeDescription: newValue };

                const idx = ordinalIndexByKey[key];
                if (idx !== undefined) {
                    const vals = padValues(r.values);
                    vals[idx] = String(newValue || "");
                    return { ...r, values: vals };
                }
                return r;
            })
        );

    return (
        <div className="p-4 pt-0">
            {/* Heading */}
            <Box sx={{ textAlign: "center", backgroundColor: "#f2f7ff", p: { xs: 1.5, sm: 2 }, mb: { xs: 2, sm: 3 }, borderRadius: "10px" }}>
                <Typography fontWeight={700} sx={{ fontSize: { xs: 18, sm: 20, md: 22 }, color: "#1f2937" }}>
                    Property Description &amp; Type of Use Validation
                </Typography>
            </Box>

            {/* Top buttons */}
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1} justifyContent={{ xs: "stretch", md: "flex-end" }} alignItems={{ xs: "stretch", sm: "center" }} sx={{ mb: 2 }}>
                <CustomButton type="new" size="small" onClick={() => { }}>
                    Add Property Description
                </CustomButton>

                <CustomButton type="export" size={isXs ? "medium" : "small"} onClick={onGenerateExcel}>
                    Generate Excel
                </CustomButton>
            </Stack>

            {/* Form */}
            <Paper elevation={3} sx={{ p: { xs: 1.5, sm: 2 }, mb: { xs: 2, sm: 3 }, borderRadius: "10px" }}>
                <Typography fontWeight={700} mb={2} sx={{ fontSize: { xs: 16, sm: 18 } }}>
                    {editingId == null ? "Add Property Description" : "Edit Property Description"}
                </Typography>

                <Grid container spacing={1.5} alignItems="center">
                    <Grid sx={{
                        flexBasis: { xs: "100%", sm: "45%", md: "25%" },
                        maxWidth: { xs: "100%", sm: "45%", md: "25%" },
                    }}>
                        <TextField
                            fullWidth size="small" label="Property Description" placeholder="Enter description"
                            value={newDescription} InputLabelProps={{ shrink: true }}
                            onChange={(e) => setNewDescription(e.target.value)}
                            InputProps={{ startAdornment: (<InputAdornment position="start"><DescriptionIcon sx={{ color: "#757575" }} /></InputAdornment>) }}
                            sx={equalFieldSx}
                        />
                    </Grid>

                    <Grid sx={{
                        flexBasis: { xs: "100%", sm: "45%", md: "25%" },
                        maxWidth: { xs: "100%", sm: "45%", md: "25%" },
                    }}>
                        {/* TYPE (LOCAL) — uses options from screenshot */}
                        <TextField
                            select fullWidth size="small" label="Type (Local)" value={newType}
                            onChange={(e) => setNewType(e.target.value)} InputLabelProps={{ shrink: true }}
                            SelectProps={{
                                displayEmpty: true,
                                renderValue: (val) =>
                                    val ? <span style={{ fontWeight: 400 }}>{val}</span> : <span style={{ color: "#9ca3af" }}>Select Type</span>,
                            }}
                            InputProps={{ startAdornment: (<InputAdornment position="start" sx={{ mr: "-4px", ml: "-2px" }}><FormatAlignRightIcon sx={{ color: "#757575", fontSize: 20 }} /></InputAdornment>) }}
                            sx={{ ...equalFieldSx, "& .MuiSelect-select": { pl: "28px !important", fontWeight: 400 } }}
                        >
                            <MenuItem value=""><em>Select Type</em></MenuItem>
                            {TYPE_LOCAL_OPTIONS.map((opt) => (
                                <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    <Grid sx={{
                        flexBasis: { xs: "100%", sm: "45%", md: "25%" },
                        maxWidth: { xs: "100%", sm: "45%", md: "25%" },
                    }}>
                        <TextField
                            fullWidth size="small" label="Type Description" placeholder="Enter type description"
                            value={newTypeDescription} InputLabelProps={{ shrink: true }}
                            onChange={(e) => setNewTypeDescription(e.target.value)}
                            InputProps={{ startAdornment: (<InputAdornment position="start"><TypeSpecimenIcon sx={{ color: "#757575" }} /></InputAdornment>) }}
                            sx={equalFieldSx}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Stack direction={{ xs: "column", sm: "row" }} spacing={1} justifyContent="flex-end">
                            <ValidationProvider rules={{ add: () => canAdd, updated: () => canUpdate, clear: () => true }}>
                                <CustomButton type="clear" onClick={() => { setNewDescription(""); setNewType(""); setNewTypeDescription(""); setEditingCell(null); }} sx={actionBtnSx}>
                                    Cancel
                                </CustomButton>
                                {editingId == null ? (
                                    <CustomButton type="add" onClick={onAddOrUpdate} sx={actionBtnSx}>Add</CustomButton>
                                ) : (
                                    <CustomButton type="updated" onClick={onAddOrUpdate} sx={actionBtnSx}>Update</CustomButton>
                                )}
                            </ValidationProvider>
                        </Stack>
                    </Grid>
                </Grid>
            </Paper>

            {/* Table — horizontal scroll on the table, not the page */}
            <ClickAwayListener onClickAway={() => setEditingCell(null)}>
                <Box
                    sx={{
                        width: "100%",
                        overflowX: "auto",
                        borderRadius: 1,
                        border: "1px solid #e5e7eb",
                        "&::-webkit-scrollbar": { height: 10 },
                        "&::-webkit-scrollbar-thumb": { backgroundColor: "#cbd5e1", borderRadius: 8 },
                        "&::-webkit-scrollbar-track": { backgroundColor: "#f1f5f9", borderRadius: 8 },
                    }}
                >
                    <TableContainer
                        component={Paper}
                        elevation={0}
                        sx={{
                            borderRadius: 3,
                            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                            overflowX: "auto",
                            scrollbarWidth: "thin",
                            scrollbarColor: "#9e9e9e #f0f0f0",
                        }}
                    >
                        <Table sx={{ minWidth: Math.max(1200, COLUMNS.length * 140) }}>
                            <TableHead>
                                <TableRow>
                                    {COLUMNS.map((col) => (
                                        <TableCell
                                            key={col.key}
                                            align={col.align || "left"}
                                            sx={{
                                                fontWeight: 700,
                                                color: "#fff",
                                                backgroundColor: "#0ea5b7",
                                                whiteSpace: "nowrap",
                                                ...(col.key === "propertyDescription" ? { minWidth: 260 } : {})
                                            }}
                                        >
                                            {col.header}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {pagedRows.map((row, idx) => {
                                    const zebra = ((page - 1) * ROWS_PER_PAGE + idx) % 2 ? "#f8fafc" : "inherit";
                                    return (
                                        <TableRow
                                            key={row.id}
                                            hover
                                            sx={{
                                                backgroundColor: zebra,
                                                "&:hover": { backgroundColor: selectedHoverBg },
                                                transition: "background-color 120ms ease-in-out",
                                            }}
                                        >
                                            {COLUMNS.map((col) => {
                                                const isEditing = editingCell?.rowId === row.id && editingCell?.key === col.key;
                                                const display = String(getDisplayValue(row, col.key) ?? "");
                                                const isOrdinal = ordinalIndexByKey[col.key] !== undefined;

                                                return (
                                                    <TableCell
                                                        key={col.key}
                                                        align={col.align || "left"}
                                                        onClick={() => setEditingCell({ rowId: row.id, key: col.key })}
                                                        sx={{
                                                            cursor: "pointer",
                                                            ...(col.key === "propertyDescription" ? { minWidth: 260 } : {})
                                                        }}
                                                    >
                                                        {!isEditing ? (
                                                            <Box sx={{ textAlign: col.align === "right" ? "right" : "left" }}>{display}</Box>
                                                        ) : (
                                                            (() => {
                                                                // TYPE (LOCAL) — Select with screenshot options, showing current by default
                                                                if (col.key === "typeLocal") {
                                                                    const current = String(getDisplayValue(row, col.key) ?? "");
                                                                    const opts = getOptionsIncludingCurrent(TYPE_LOCAL_OPTIONS, current);
                                                                    const selectValue = current || "";
                                                                    return (
                                                                        <Select
                                                                            size="small"
                                                                            value={selectValue}
                                                                            displayEmpty
                                                                            fullWidth
                                                                            onClick={(e) => e.stopPropagation()}
                                                                            onChange={(e) => { handleCellChange(row.id, col.key, e.target.value); setEditingCell(null); }}
                                                                            renderValue={(selected) =>
                                                                                selected !== "" ? selected : <span style={{ color: "#9ca3af" }}>Select…</span>
                                                                            }
                                                                            MenuProps={{ disablePortal: true, PaperProps: { sx: { minWidth: 160 } }, onClick: (e) => e.stopPropagation() }}
                                                                            sx={{ width: "100%", "& .MuiSelect-select": { py: 0.5 } }}
                                                                        >
                                                                            {opts.map((opt) => (
                                                                                <MenuItem key={opt} value={opt} onClick={(e) => e.stopPropagation()}>
                                                                                    {opt}
                                                                                </MenuItem>
                                                                            ))}
                                                                        </Select>
                                                                    );
                                                                }

                                                                // Text fields for non-ordinal text columns
                                                                if (!isOrdinal && (col.key === "propertyDescription" || col.key === "typeDescription")) {
                                                                    return (
                                                                        <TextField
                                                                            size="small"
                                                                            autoFocus
                                                                            fullWidth
                                                                            defaultValue={getDisplayValue(row, col.key)}
                                                                            onClick={(e) => e.stopPropagation()}
                                                                            onBlur={(e) => { handleCellChange(row.id, col.key, e.target.value); setEditingCell(null); }}
                                                                            onKeyDown={(e) => {
                                                                                if (e.key === "Enter") { handleCellChange(row.id, col.key, e.currentTarget.value); setEditingCell(null); }
                                                                                if (e.key === "Escape") { setEditingCell(null); }
                                                                            }}
                                                                            sx={{ "& .MuiOutlinedInput-input": { py: 0.75 } }}
                                                                        />
                                                                    );
                                                                }

                                                                // Ordinal columns — Select with per-column 3 options (show current if outside)
                                                                if (isOrdinal) {
                                                                    const current = String(getDisplayValue(row, col.key) ?? "");
                                                                    const opts = getOptionsIncludingCurrent(getOptionsForKey(col.key), current);
                                                                    const selectValue = current || "";
                                                                    return (
                                                                        <Select
                                                                            size="small"
                                                                            value={selectValue}
                                                                            displayEmpty
                                                                            fullWidth
                                                                            onClick={(e) => e.stopPropagation()}
                                                                            onChange={(e) => { handleCellChange(row.id, col.key, e.target.value); setEditingCell(null); }}
                                                                            renderValue={(selected) =>
                                                                                selected !== "" ? selected : <span style={{ color: "#9ca3af" }}>Select…</span>
                                                                            }
                                                                            MenuProps={{ disablePortal: true, PaperProps: { sx: { minWidth: 160 } }, onClick: (e) => e.stopPropagation() }}
                                                                            sx={{ width: "100%", "& .MuiSelect-select": { py: 0.5 } }}
                                                                        >
                                                                            {opts.map((opt) => (
                                                                                <MenuItem key={opt} value={opt} onClick={(e) => e.stopPropagation()}>
                                                                                    {opt}
                                                                                </MenuItem>
                                                                            ))}
                                                                        </Select>
                                                                    );
                                                                }

                                                                // Fallback to text
                                                                return (
                                                                    <TextField
                                                                        size="small"
                                                                        autoFocus
                                                                        fullWidth
                                                                        defaultValue={getDisplayValue(row, col.key)}
                                                                        onClick={(e) => e.stopPropagation()}
                                                                        onBlur={(e) => { handleCellChange(row.id, col.key, e.target.value); setEditingCell(null); }}
                                                                        onKeyDown={(e) => {
                                                                            if (e.key === "Enter") { handleCellChange(row.id, col.key, e.currentTarget.value); setEditingCell(null); }
                                                                            if (e.key === "Escape") { setEditingCell(null); }
                                                                        }}
                                                                        sx={{ "& .MuiOutlinedInput-input": { py: 0.75 } }}
                                                                    />
                                                                );
                                                            })()
                                                        )}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* Pagination controls */}
                    {totalPages > 1 && (
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "end",
                                alignItems: "center",
                                flexWrap: "wrap",
                                gap: "12px",
                                padding: "12px 16px",
                            }}
                        >
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <button
                                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    style={{ border: "none", background: "transparent", cursor: page === 1 ? "not-allowed" : "pointer", padding: "6px 10px" }}
                                    aria-label="Previous page"
                                >
                                    <ArrowCircleLeftOutlinedIcon sx={{ fontSize: 36, color: page === 1 ? "#ccc" : "#4a90e2" }} />
                                </button>

                                {(() => {
                                    const current = page - 1;
                                    const pages = [];
                                    const totalNumbers = 3;
                                    const totalBlocks = totalNumbers + 2;

                                    if (totalPages <= totalBlocks) {
                                        for (let i = 0; i < totalPages; i++) pages.push(i);
                                    } else {
                                        let startPage = Math.max(1, current - 1);
                                        let endPage = Math.min(totalPages - 2, current + 1);

                                        if (current <= 1) { startPage = 1; endPage = 3; }
                                        if (current >= totalPages - 2) { startPage = totalPages - 4; endPage = totalPages - 2; }

                                        pages.push(0);
                                        if (startPage > 1) pages.push("...");
                                        for (let i = startPage; i <= endPage; i++) pages.push(i);
                                        if (endPage < totalPages - 2) pages.push("...");
                                        pages.push(totalPages - 1);
                                    }

                                    return pages.map((p, idx) =>
                                        p === "..." ? (
                                            <span key={idx}>...</span>
                                        ) : (
                                            <button
                                                key={p}
                                                onClick={() => setPage(p + 1)}
                                                style={{
                                                    width: 30, height: 30, borderRadius: 6, border: "none",
                                                    background: p + 1 === page ? "linear-gradient(135deg,#4a90e2,#7b61ff)" : "transparent",
                                                    color: p + 1 === page ? "white" : "black",
                                                    cursor: "pointer", fontWeight: p + 1 === page ? 600 : 400,
                                                    transform: "rotate(45deg)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 4px",
                                                }}
                                            >
                                                <span style={{ transform: "rotate(-45deg)" }}>{p + 1}</span>
                                            </button>
                                        )
                                    );
                                })()}

                                <button
                                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                    disabled={page === totalPages}
                                    style={{ border: "none", background: "transparent", cursor: page === totalPages ? "not-allowed" : "pointer", padding: "6px 10px" }}
                                    aria-label="Next page"
                                >
                                    <ArrowCircleRightOutlinedIcon sx={{ fontSize: 36, color: page === totalPages ? "#ccc" : "#4a90e2" }} />
                                </button>
                            </div>
                        </div>
                    )}
                </Box>
            </ClickAwayListener>
        </div>
    );
}
