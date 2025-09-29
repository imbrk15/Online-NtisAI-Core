import React, { useState, useEffect } from "react";
import {
    Button,
    MenuItem,
    Select,
    TextField,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Grid,
    Typography,
    Box,
    Paper,
    TablePagination,
    InputAdornment,
    FormControl,
    InputLabel,
    OutlinedInput,
} from "@mui/material";

import { Edit, Delete } from "@mui/icons-material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import UpdateIcon from "@mui/icons-material/Update";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import LocationCityIcon from "@mui/icons-material/LocationCity";

const zones = ["Zone A", "Zone B", "Zone C", "Zone D", "Zone E", "Zone F"];

const defaultSubzones = [
    { id: "1", zone: "Zone A", subzone: "01" },
    { id: "2", zone: "Zone A", subzone: "02" },
    { id: "3", zone: "Zone B", subzone: "01" },
    { id: "4", zone: "Zone B", subzone: "02" },
    { id: "5", zone: "Zone C", subzone: "01" },
    { id: "6", zone: "Zone D", subzone: "01" },
    { id: "7", zone: "Zone E", subzone: "01" },
    { id: "8", zone: "Zone F", subzone: "02" },
];

const SubzoneMaster = ({ selectedMaster }) => {
    const [zone, setZone] = useState("");
    const [subzone, setSubzone] = useState("");
    const [subzones, setSubzones] = useState([]);
    const [editingId, setEditingId] = useState(null);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(8);

    useEffect(() => {
        try {
            const stored = JSON.parse(localStorage.getItem("subzones"));
            if (stored && stored.length > 0) {
                setSubzones(stored);
            } else {
                setSubzones(defaultSubzones);
                localStorage.setItem("subzones", JSON.stringify(defaultSubzones));
            }
        } catch {
            setSubzones(defaultSubzones);
            localStorage.setItem("subzones", JSON.stringify(defaultSubzones));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("subzones", JSON.stringify(subzones));
    }, [subzones]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!zone || !subzone) {
            alert("Please fill all fields.");
            return;
        }

        if (editingId !== null) {
            setSubzones((prev) =>
                prev.map((item) =>
                    item.id === editingId ? { ...item, zone, subzone } : item
                )
            );
        } else {
            const alreadyExists = subzones.some(
                (item) => item.zone === zone && item.subzone === subzone
            );
            if (alreadyExists) {
                alert("Subzone already exists.");
                return;
            }

            setSubzones((prev) => [
                { id: Date.now().toString(), zone, subzone },
                ...prev,
            ]);
        }

        setZone("");
        setSubzone("");
        setEditingId(null);
    };

    const handleEdit = (item) => {
        setZone(item.zone);
        setSubzone(item.subzone);
        setEditingId(item.id.toString());
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete?")) {
            setSubzones((prev) => prev.filter((item) => item.id !== id));
            if (editingId === id) {
                setEditingId(null);
                setZone("");
                setSubzone("");
            }
        }
    };

    const handleCancel = () => {
        setEditingId(null);
        setZone("");
        setSubzone("");
    };

    const rows = subzones;

    return (
        <Grid container direction="column" spacing={3}>
            {selectedMaster === "subzonemaster" && (
                <>
                    {/* HEADER */}
                    <Grid item>
                        <Box
                            sx={{
                                background: "linear-gradient(to bottom, #f4f1fd, #eaf2ff)",
                                padding: "20px 30px",
                                borderRadius: "16px",
                            }}
                        >
                            <Typography fontSize="24px" fontWeight="bold" sx={{ color: "#1a2c47" }}>
                                Sub Zone Master
                            </Typography>
                        </Box>
                    </Grid>

                    {/* FORM */}
                    <Grid item>
                        <form onSubmit={handleSubmit}>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "flex-end",
                                    gap: 2,
                                    background: "#f3f6f4",
                                    padding: "12px 16px",
                                    borderRadius: "12px",
                                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                                }}
                            >
                                <Grid item>
                                    <FormControl fullWidth size="small" sx={{ width: "400px" }}>
                                        <InputLabel>Zone no/विभाग</InputLabel>
                                        <Select
                                            value={zone}
                                            onChange={(e) => setZone(e.target.value)}
                                            input={
                                                <OutlinedInput
                                                    label="Zone no/विभाग"
                                                    startAdornment={
                                                        <InputAdornment position="start">
                                                            <AccountBalanceIcon sx={{ color: "#757575" }} />
                                                        </InputAdornment>
                                                    }
                                                />
                                            }
                                            displayEmpty
                                        >
                                            <MenuItem value="">
                                                Select Zones
                                            </MenuItem>
                                            {zones.map((z) => (
                                                <MenuItem key={z} value={z}>
                                                    {z}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item>
                                    <FormControl fullWidth size="small" sx={{ width: "400px" }}>
                                        <TextField
                                            value={subzone}
                                            onChange={(e) => setSubzone(e.target.value)}
                                            label="Subzone No"
                                            placeholder="Enter Subzone No"
                                            variant="outlined"
                                            size="small"
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <LocationCityIcon sx={{ color: "#757575" }} />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </FormControl>
                                </Grid>

                                <Box sx={{ display: "flex", gap: 1 }}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        sx={{
                                            height: "40px",
                                            minWidth: "140px",
                                            textTransform: "none",
                                            fontWeight: "bold",
                                            fontSize: "14px",
                                        }}
                                        startIcon={editingId !== null ? <UpdateIcon /> : <AddCircleIcon />}
                                    >
                                        {editingId ? "Update Subzone" : "Add Subzone"}
                                    </Button>
                                    {editingId && (
                                        <Button
                                            variant="outlined"
                                            onClick={handleCancel}
                                            sx={{
                                                height: "40px",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                    )}
                                </Box>
                            </Box>
                        </form>
                    </Grid>

                    {/* TABLE */}
                    <Grid item>
                        <TableContainer component={Paper} className="shadow-lg rounded-lg">
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold' }}>ZONE NO</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>SUB ZONE NO</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold', textAlign: 'right' }}>ACTIONS</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody >
                                    {rows
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) => {
                                            const isEditing = row.id === editingId;
                                            const isEven = index % 2 === 1;
                                            let bgColor = "F6F6F6";        //"#fff";

                                            if (isEditing) {
                                                bgColor = "F6F6F6";   //"#e3f2fd"; // editing highlight
                                                // border - color: "#e3f2fd";
                                            } else if (isEven) {
                                                bgColor = "#f0f0f0"; // even rows
                                            }

                                            return (
                                                <TableRow
                                                    hover
                                                    key={row.id}
                                                    sx={{
                                                        backgroundColor: bgColor,
                                                    }}
                                                >
                                                    <TableCell size="small">{row.zone}</TableCell>
                                                    <TableCell size="small">{row.subzone}</TableCell>
                                                    <TableCell size="small" align="right">
                                                        <IconButton
                                                            onClick={() => handleEdit(row)}
                                                            color="primary"
                                                        >
                                                            <Edit />
                                                        </IconButton>
                                                        <IconButton
                                                            onClick={() => handleDelete(row.id)}
                                                            color="error"
                                                        >
                                                            <Delete fontSize="small" />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    {rows.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={3} align="center">
                                                No subzones added yet.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[8, 10, 25]}
                            component="div"
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Grid>
                </>
            )}
        </Grid>
    );
};

export default SubzoneMaster;
