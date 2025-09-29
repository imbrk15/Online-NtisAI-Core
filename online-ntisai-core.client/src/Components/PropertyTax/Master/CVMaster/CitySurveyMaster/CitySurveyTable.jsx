import React, { useState } from "react";
import {
    Grid,
    TextField,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    OutlinedInput,
    InputAdornment,
    Box
} from "@mui/material";


import AccountBalanceIcon from "@mui/icons-material/AccountBalance";          // Zone
import MapOutlinedIcon from "@mui/icons-material/MapOutlined"; // Sub Zone
import NumbersIcon from "@mui/icons-material/Numbers";  // CSN
import CustomButton from "../../../../../Helpers/ExtraProperties/CustomButtons";
import MasterCustomTable from "../../../../../Helpers/ExtraProperties/MasterCustomTable";
import { ValidationProvider } from "../../../../../Contexts/ValidationContext"

const zoneOptions = [
    "Zone A",
    "Zone B",
    "Zone C",
    "Zone D",
    "Zone E",
    "Zone F",
];

const subZoneOptions = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
];

// Define table columns
const columns = [
    {
        key: "zone",
        header: "ZONE NO",
        isPrimary: true,
    },
    {
        key: "type",
        header: "SUB ZONE",
    },
    {
        key: "CSN",
        header: "CSN",
        render: (value) => (
            <span className="text-green-600 font-semibold">
                {value}
            </span>
        ),
    },
];

export default function CitySurveyTable() {

    const [zone, setZone] = useState("");
    const [subZone, setSubZone] = useState("");
    const [CSN, setCSN] = useState("");
    const [rows, setRows] = useState([
        { id: 1, zone: "Zone A", type: "01", CSN: "CSN001" },
        { id: 2, zone: "Zone B", type: "02", CSN: "CSN002" },
        { id: 3, zone: "Zone C", type: "03", CSN: "CSN003" },
        { id: 4, zone: "Zone D", type: "04", CSN: "CSN004" },
        { id: 5, zone: "Zone E", type: "05", CSN: "CSN005" },
        { id: 6, zone: "Zone F", type: "06", CSN: "CSN006" },
    ]);

    const [editIndex, setEditIndex] = useState(null);
    const [editingId, setEditingId] = useState(null);

    const handleAddOrUpdate = () => {
        if (CSN && zone && subZone.length > 0) {

            //return;


            if (editIndex !== null) {
                // Update existing row
                const updatedRows = [...rows];
                updatedRows[editIndex] = {
                    ...updatedRows[editIndex],
                    zone,
                    CSN,
                    type: subZone,
                };
                setRows(updatedRows);
                setEditIndex(null);

            } else {
                // Add New Row
                const newRow = {
                    id: Date.now(), // Generate unique ID
                    zone,
                    CSN,
                    type: subZone,
                };
                setRows([newRow, ...rows]);

            }

            // Reset form
            setCSN("");
            setZone("");
            setSubZone("");
            setEditingId(null);
        }
    };

    const handleEdit = (index, row) => {
        setZone(row.zone);
        setSubZone(row.type);
        setCSN(row.CSN);
        setEditIndex(index);
        setEditingId(index);

    };

    const handleDelete = (index, row) => {
        setRows(rows.filter((_, i) => i !== index));

        if (editIndex === index) {
            setEditIndex(null);
            setEditingId(null);
            setCSN("");
            setZone("");
            setSubZone("");
        }

    };

    const handleRowClick = (index, row) => {
        setEditingId(index);
    };

    return (
        <>
            <div className="p-1 pt-0">
                <div className="flex items-center justify-center mb-4 bg-[#effef0] rounded-xl py-4 mb-2">
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 p-4 ">
                        City Survey Master
                    </h1>
                </div>

                {/* Form Section */}
                <Grid
                    container
                    spacing={2}
                    className="mb-4 pt-3"
                >
                    {/* Zone - Subzone */}
                    <Grid sx={{
                        flexBasis: { xs: "100%", sm: "30%", md: "25%" },
                        maxWidth: { xs: "100%", sm: "30%", md: "25  %" },
                    }}>
                        <FormControl fullWidth>
                            <InputLabel>Zone </InputLabel>
                            <Select
                                value={zone}
                                size="small"
                                onChange={(e) => setZone(e.target.value)}
                                input={
                                    <OutlinedInput
                                        label="Zone "
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <AccountBalanceIcon sx={{ color: "#757575" }} />
                                            </InputAdornment>
                                        }
                                    />
                                }
                                displayEmpty
                            >
                                <MenuItem value="" disabled>
                                    Select Zone
                                </MenuItem>
                                {zoneOptions.map((z) => (
                                    <MenuItem key={z} value={z}>
                                        {z}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Sub Zone */}
                    <Grid sx={{
                        flexBasis: { xs: "100%", sm: "30%", md: "25%" },
                        maxWidth: { xs: "100%", sm: "30%", md: "25%" },
                    }}>
                        <FormControl fullWidth>
                            <InputLabel>Sub-Zone No</InputLabel>
                            <Select
                                value={subZone}
                                size="small"
                                onChange={(e) => setSubZone(e.target.value)}
                                input={
                                    <OutlinedInput
                                        label="Sub Zone No"
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <MapOutlinedIcon />
                                            </InputAdornment>
                                        }
                                    />
                                }
                                displayEmpty
                            >
                                <MenuItem value="" disabled>
                                    Select Sub Zone No
                                </MenuItem>
                                {subZoneOptions.map((c) => (
                                    <MenuItem key={c} value={c}>
                                        {c}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* CSN */}
                    <Grid sx={{
                        flexBasis: { xs: "100%", sm: "30%", md: "34%" },
                        maxWidth: { xs: "100%", sm: "30%", md: "34%" },
                    }}>
                        <TextField
                            fullWidth
                            size="small"
                            label="CSN (you can add multiple, comma‑separated)"
                            placeholder="Enter CSN number"
                            value={CSN}
                            onChange={(e) => setCSN(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <NumbersIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>

                </Grid>
                {/* Button */}
                <Box sx={{ mt: { xs: 2, md: 3 }, mb: 2 }}>
                    <Grid container spacing={2} justifyContent="center">
                        <ValidationProvider
                            rules={{
                                add: () => zone && subZone && CSN.trim(),
                                updated: () => zone && subZone && CSN.trim(),
                                delete: () => rows.length > 0,
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
                                            className="h-full w-[180px]"
                                            style={{ width: "150px" }}
                                        >
                                            Update
                                        </CustomButton>
                                    </Grid>
                                    <Grid item xs={12} sm="auto">
                                        <CustomButton
                                            type="clear"
                                            onClick={() => {
                                                setEditIndex(null); // exit edit mode
                                                setEditingId(null); // remove row highlight
                                                setCSN("");
                                                setZone("");
                                                setSubZone("");
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
                    pagination={true}
                />
            </div>
        </>
    );
}