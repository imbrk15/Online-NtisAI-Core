import React, { useState } from "react";
import {
    Button,
    Grid,
    TextField,
    Checkbox,
    InputAdornment,
} from "@mui/material";

import { ValidationProvider } from "../../../../../Contexts/ValidationContext"
import SubTypeMaster from "./SubTypeMaster";
import MasterCustomTable from "../../../../../Helpers/ExtraProperties/MasterCustomTable"
import CustomButton from "../../../../../Helpers/ExtraProperties/CustomButtons";
// MUI icons
import CodeIcon from "@mui/icons-material/Code";
import DescriptionIcon from "@mui/icons-material/Description";
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import ScaleIcon from "@mui/icons-material/Scale";
import CategoryIcon from "@mui/icons-material/Category";
import NotesIcon from "@mui/icons-material/Notes";
import NumbersIcon from "@mui/icons-material/Numbers";
import KeyboardIcon from "@mui/icons-material/Keyboard";


export default function TypeofUseMasterContent() {
    const [drawerOpen, setDrawerOpen] = useState(false);

    // Rows data
    const [rows, setRows] = useState([
        {
            id: 1,
            code: "EDU",
            description: "Educational",
            type: "Institutional",
            longDesc: "Educational institutions and schools",
            weightage: 0.8,
            group: "D",
            taxes: {
                property_tax: true,
                eduacation_tax: true,
                employment_tax: false,
                speculation_tax: false,
                drain_cess: true,
                road_Cess: true,
                Sewage_Disposal_Cess: false,
                sanitation: true,
                fire_cess: false,
                water_cess: true,
                Lighting_cess: false,
                tree_cess: true,
            },
        },
        {
            id: 2,
            code: "REL",
            description: "Religious",
            type: "Exempt",
            longDesc: "Religious buildings and places of worship",
            weightage: 0.5,
            group: "E",
            taxes: {
                property_tax: true,
                eduacation_tax: false,
                employment_tax: true,
                speculation_tax: false,
                drain_cess: true,
                road_Cess: true,
                Sewage_Disposal_Cess: false,
                sanitation: false,
                fire_cess: false,
                water_cess: false,
                Lighting_cess: false,
                tree_cess: true,
            },
        },
        {
            id: 3,
            code: "GOV",
            description: "Government",
            type: "Public",
            longDesc: "Government buildings and offices",
            weightage: 1.20,
            group: "F",
            taxes: {
                property_tax: true,
                eduacation_tax: false,
                employment_tax: true,
                speculation_tax: false,
                drain_cess: true,
                road_Cess: true,
                Sewage_Disposal_Cess: false,
                sanitation: false,
                fire_cess: false,
                water_cess: false,
                Lighting_cess: false,
                tree_cess: true,
            },
        },
        {
            id: 4,
            code: "HOS",
            description: "Hospital",
            type: "Healthcare",
            longDesc: "Medical facilities and hospitals",
            weightage: 1.10,
            group: "G",
            taxes: {
                property_tax: true,
                eduacation_tax: false,
                employment_tax: true,
                speculation_tax: false,
                drain_cess: true,
                road_Cess: true,
                Sewage_Disposal_Cess: false,
                sanitation: false,
                fire_cess: false,
                water_cess: false,
                Lighting_cess: false,
                tree_cess: true,
            },
        },
        {
            id: 5,
            code: "AGR",
            description: "Agriculture",
            type: "Standard",
            longDesc: "Agricultural land and farming properties",
            weightage: 0.60,
            group: "I",
            taxes: {
                property_tax: true,
                eduacation_tax: false,
                employment_tax: true,
                speculation_tax: false,
                drain_cess: true,
                road_Cess: true,
                Sewage_Disposal_Cess: false,
                sanitation: false,
                fire_cess: false,
                water_cess: false,
                Lighting_cess: false,
                tree_cess: true,
            },
        },
    ]);

    // Form state
    const [formData, setFormData] = useState({
        id: null,
        code: "",
        description: "",
        type: "",
        longDesc: "",
        weightage: "",
        group: "",
        taxes: {
            property_tax: false,
            eduacation_tax: false,
            employment_tax: false,
            speculation_tax: false,
            drain_cess: false,
            road_Cess: false,
            Sewage_Disposal_Cess: false,
            sanitation: false,
            fire_cess: false,
            water_cess: false,
            Lighting_cess: false,
            tree_cess: false,
        },
    });

    const [editIndex, setEditIndex] = useState(null);

    // Define table columns
    const columns = [
        {
            key: "code",
            header: "TYPE OF USE",
            isPrimary: true,
        },
        {
            key: "description",
            header: "TYPE OF USE DESCRIPTION",
        },
        {
            key: "type",
            header: "TYPE",
        },
        {
            key: "longDesc",
            header: "DESCRIPTION",
        },
        {
            key: "weightage",
            header: "WEIGHTAGE",
        },
        {
            key: "group",
            header: "GROUP",
        },
        // Tax columns
        ...Object.keys(formData.taxes).map(tax => ({
            key: tax,
            header: tax.toUpperCase(),
            render: (value, row) => (
                <Checkbox
                    checked={row.taxes[tax]}
                    onChange={(e) => {
                        e.stopPropagation();
                        const updatedRows = [...rows];
                        const rowIndex = updatedRows.findIndex(r => r.id === row.id);
                        if (rowIndex !== -1) {
                            updatedRows[rowIndex].taxes[tax] = e.target.checked;
                            setRows(updatedRows);
                            if (editIndex === rowIndex) {
                                setFormData(updatedRows[rowIndex]);
                            }
                        }
                    }}
                />
            )
        }))
    ];

    // Handle text input change
    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    // Handle checkbox change
    const handleCheckboxChange = (tax) => {
        setFormData({
            ...formData,
            taxes: { ...formData.taxes, [tax]: !formData.taxes[tax] },
        });
    };

    // Save new row
    const handleSave = () => {
        if (formData.code && formData.description) {
            const newRow = {
                id: Date.now(),
                ...formData,
                weightage: parseFloat(formData.weightage) || 0,
            };
            setRows([newRow, ...rows]);
            handleClear();
        }
    };

    // Update selected row
    const handleUpdate = () => {
        if (editIndex !== null) {
            const updatedRows = [...rows];
            updatedRows[editIndex] = {
                ...formData,
                weightage: parseFloat(formData.weightage) || 0,
            };
            setRows(updatedRows);
            handleClear();
        }
    };

    // Delete selected row
    const handleDelete = (index, row) => {
        setRows(rows.filter((_, i) => i !== index));
        if (editIndex === index) {
            handleClear();
        }
    };

    // Clear form
    const handleClear = () => {
        setFormData({
            id: null,
            code: "",
            description: "",
            type: "",
            longDesc: "",
            weightage: "",
            group: "",
            taxes: {
                property_tax: false,
                eduacation_tax: false,
                employment_tax: false,
                speculation_tax: false,
                drain_cess: false,
                road_Cess: false,
                Sewage_Disposal_Cess: false,
                sanitation: false,
                fire_cess: false,
                water_cess: false,
                Lighting_cess: false,
                tree_cess: false,
            },
        });
        setEditIndex(null);
    };

    // Handle row click
    const handleRowClick = (index, row) => {
        setEditIndex(index);
        setFormData(row);
    };

    return (
        <div className="p-2 sm:p-2 lg:p-2">
            {/* Header */}
            <div className="bg-[#f2f7ff] rounded-xl px-4 py-3 mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                    Type of Use Master
                </h1>
                <Button
                    variant="contained"
                    color="success"
                    onClick={() => setDrawerOpen(true)} // <-- your existing logic
                >
                    + Add Sub Type of Use
                </Button>
                <SubTypeMaster open={drawerOpen} onClose={() => setDrawerOpen(false)} />
            </div>

            {/* Form */}
            <Grid container spacing={2} className="mb-4">
                <Grid sx={{
                    flexBasis: { xs: "100%", sm: "30%", md: "18%" },
                    maxWidth: { xs: "100%", sm: "30%", md: "18%" },
                }}>
                    <TextField
                        fullWidth
                        size="small"
                        label="Type of Use"
                        placeholder="Enter type of Use"
                        value={formData.code}
                        onChange={(e) => handleChange("code", e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <CodeIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>

                <Grid sx={{
                    flexBasis: { xs: "100%", sm: "30%", md: "18%" },
                    maxWidth: { xs: "100%", sm: "30%", md: "18%" },
                }}>
                    <TextField
                        fullWidth
                        size="small"
                        label="Description"
                        placeholder="Enter description"
                        value={formData.description}
                        onChange={(e) => handleChange("description", e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <DescriptionIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>

                <Grid sx={{
                    flexBasis: { xs: "100%", sm: "30%", md: "18%" },
                    maxWidth: { xs: "100%", sm: "30%", md: "18%" },
                }}>
                    <TextField
                        fullWidth
                        size="small"
                        label="Group"
                        placeholder="Enter group"
                        value={formData.group}
                        onChange={(e) => handleChange("group", e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <GroupWorkIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>

                <Grid sx={{
                    flexBasis: { xs: "100%", sm: "30%", md: "18%" },
                    maxWidth: { xs: "100%", sm: "30%", md: "18%" },
                }}>
                    <TextField
                        fullWidth
                        size="small"
                        label="Weightage"
                        placeholder="Enter weightage"
                        value={formData.weightage}
                        onChange={(e) => handleChange("weightage", e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <ScaleIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>

                <Grid sx={{
                    flexBasis: { xs: "100%", sm: "30%", md: "18%" },
                    maxWidth: { xs: "100%", sm: "30%", md: "18%" },
                }}>
                    <TextField
                        fullWidth
                        size="small"
                        label="Type"
                        placeholder="Enter type"
                        value={formData.type}
                        onChange={(e) => handleChange("type", e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <CategoryIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>

                <Grid sx={{
                    flexBasis: { xs: "100%", sm: "30%", md: "18%" },
                    maxWidth: { xs: "100%", sm: "30%", md: "18%" },
                }}>
                    <TextField
                        fullWidth
                        size="small"
                        label="Long Description"
                        placeholder="Enter detailed description"
                        value={formData.longDesc}
                        onChange={(e) => handleChange("longDesc", e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <NotesIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>

                <Grid sx={{
                    flexBasis: { xs: "100%", sm: "30%", md: "18%" },
                    maxWidth: { xs: "100%", sm: "30%", md: "18%" },
                }}>
                    <TextField
                        fullWidth
                        size="small"
                        label="Keywise Sequence"
                        placeholder="Enter sequence number"
                        defaultValue="1"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <NumbersIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>

                <Grid sx={{
                    flexBasis: { xs: "100%", sm: "30%", md: "18%" },
                    maxWidth: { xs: "100%", sm: "30%", md: "18%" },
                }}>
                    <TextField
                        fullWidth
                        size="small"
                        label="Keyboard Shortcut"
                        placeholder="e.g. Ctrl+E"
                        defaultValue="Ctrl+E"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <KeyboardIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
            </Grid>

            {/* Buttons */}
            <ValidationProvider
                rules={{
                    save: () => formData.code.trim() !== "" && formData.description.trim() !== "",
                    updated: () => editIndex !== null,
                    delete: () => editIndex !== null,
                    clear: () =>
                        formData.code.trim() !== "" ||
                        formData.description.trim() !== "" ||
                        formData.type.trim() !== "" ||
                        formData.longDesc.trim() !== "" ||
                        formData.weightage !== "" ||
                        formData.group.trim() !== "",
                }}
            >
                <div className="flex gap-2 flex-wrap mb-4 justify-center">
                    <CustomButton type="save" onClick={handleSave} style={{ width: "115px" }} >Save</CustomButton>
                    <CustomButton type="updated" onClick={handleUpdate} disabled={editIndex === null} style={{ width: "115px" }}>Update</CustomButton>
                    <CustomButton type="delete" onClick={() => handleDelete(editIndex, formData)} disabled={editIndex === null} style={{ width: "115px" }}>Delete</CustomButton>
                    <CustomButton type="clear" onClick={handleClear} style={{ width: "115px" }}>Clear</CustomButton>
                </div>
            </ValidationProvider>
            {/* Table */}
            <MasterCustomTable
                columns={columns}
                data={rows}
                onRowClick={handleRowClick}
                editIndex={editIndex}
                pagination={true}

            />
        </div>
    );
}
