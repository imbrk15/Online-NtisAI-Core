// src/Components/PropertyTax/Master/ZoneMaster/SubZoneMaster.jsx

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
    Box,
} from "@mui/material";

import MapOutlinedIcon from "@mui/icons-material/MapOutlined"; // Sub Zone
import AccountBalanceIcon from "@mui/icons-material/AccountBalance"; // Zone
import NumbersIcon from "@mui/icons-material/Numbers"; // SubZone Code
import CustomButton from "../../../../../Helpers/ExtraProperties/CustomButtons";
import MasterCustomTable from "../../../../../Helpers/ExtraProperties/MasterCustomTable";
import { ValidationProvider } from "../../../../../Contexts/ValidationContext";

const zoneOptions = ["Zone A", "Zone B", "Zone C", "Zone D"];

const columns = [
    { key: "zone", header: "ZONE NO", isPrimary: true },
    { key: "subZoneNo", header: "SUB ZONE NO" },
    {
        key: "subZoneCode",
        header: "SUB ZONE CODE",
        render: (value) => (
            <span className="text-blue-600 font-semibold">{value}</span>
        ),
    },
];

export default function SubZoneMaster({ selectedMaster }) {
    const [zone, setZone] = useState("");
    const [subZoneNo, setSubZoneNo] = useState("");
    const [subZoneCode, setSubZoneCode] = useState("");
    const [rows, setRows] = useState([
        { id: 1, zone: "Zone A", subZoneNo: "01", subZoneCode: "SZ001" },
        { id: 2, zone: "Zone B", subZoneNo: "02", subZoneCode: "SZ002" },
    ]);

    const [editIndex, setEditIndex] = useState(null);
    const [editingId, setEditingId] = useState(null);

    const handleAddOrUpdate = () => {
        if (zone && subZoneNo && subZoneCode.trim()) {
            if (editIndex !== null) {
                const updatedRows = [...rows];
                updatedRows[editIndex] = { ...updatedRows[editIndex], zone, subZoneNo, subZoneCode };
                setRows(updatedRows);
                setEditIndex(null);
            } else {
                const newRow = {
                    id: Date.now(),
                    zone,
                    subZoneNo,
                    subZoneCode,
                };
                setRows([newRow, ...rows]);
            }

            setZone("");
            setSubZoneNo("");
            setSubZoneCode("");
            setEditingId(null);
        }
    };

    const handleEdit = (index, row) => {
        setZone(row.zone);
        setSubZoneNo(row.subZoneNo);
        setSubZoneCode(row.subZoneCode);
        setEditIndex(index);
        setEditingId(index);
    };

    const handleDelete = (index) => {
        setRows(rows.filter((_, i) => i !== index));
        if (editIndex === index) {
            setEditIndex(null);
            setEditingId(null);
            setZone("");
            setSubZoneNo("");
            setSubZoneCode("");
        }
    };

    const handleRowClick = (index) => {
        setEditingId(index);
    };

    return (
        <Grid className="justify-content-center">
            {selectedMaster === "subzonemaster" && (
                <>
                    <div className="p-1 pt-0">
                        <div className="flex items-center justify-center mb-4 bg-[#effef0] rounded-xl py-4 mb-2">
                            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 p-4">
                                Sub Zone Master
                            </h1>
                        </div>

                        {/* Form Section */}
                        <Grid container spacing={2} className="mb-4 pt-3">
                            {/* Zone */}
                            <Grid
                                sx={{
                                    flexBasis: { xs: "100%", sm: "30%", md: "25%" },
                                    maxWidth: { xs: "100%", sm: "30%", md: "25%" },
                                }}
                            >
                                <FormControl fullWidth>
                                    <InputLabel>Zone</InputLabel>
                                    <Select
                                        value={zone || "1"}
                                        size="small"
                                        onChange={(e) => setZone(e.target.value)}
                                        input={
                                            <OutlinedInput
                                                label="Zone"
                                                startAdornment={
                                                    <InputAdornment position="start">
                                                        <AccountBalanceIcon sx={{ color: "#757575" }} />
                                                    </InputAdornment>
                                                }
                                            />
                                        }
                                    >
                                        <MenuItem value="1" disabled>
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

                            {/* Sub Zone No */}
                            <Grid
                                sx={{
                                    flexBasis: { xs: "100%", sm: "30%", md: "25%" },
                                    maxWidth: { xs: "100%", sm: "30%", md: "25%" },
                                }}
                            >
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Sub Zone No"
                                    placeholder="Enter Sub Zone No"
                                    value={subZoneNo}
                                    onChange={(e) => setSubZoneNo(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <MapOutlinedIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>

                            {/* Sub Zone Code */}
                            <Grid
                                sx={{
                                    flexBasis: { xs: "100%", sm: "30%", md: "34%" },
                                    maxWidth: { xs: "100%", sm: "30%", md: "34%" },
                                }}
                            >
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Sub Zone Code"
                                    placeholder="Enter Sub Zone Code"
                                    value={subZoneCode}
                                    onChange={(e) => setSubZoneCode(e.target.value)}
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

                        {/* Buttons */}
                        <Box sx={{ mt: { xs: 2, md: 3 }, mb: 2 }}>
                            <Grid container spacing={2} justifyContent="center">
                                <ValidationProvider
                                    rules={{
                                        add: () => zone && subZoneNo && subZoneCode.trim(),
                                        updated: () => zone && subZoneNo && subZoneCode.trim(),
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
                                                    style={{ width: "150px" }}
                                                >
                                                    Update
                                                </CustomButton>
                                            </Grid>
                                            <Grid item xs={12} sm="auto">
                                                <CustomButton
                                                    type="clear"
                                                    onClick={() => {
                                                        setEditIndex(null);
                                                        setEditingId(null);
                                                        setZone("");
                                                        setSubZoneNo("");
                                                        setSubZoneCode("");
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
            )}
        </Grid>
    );
}
