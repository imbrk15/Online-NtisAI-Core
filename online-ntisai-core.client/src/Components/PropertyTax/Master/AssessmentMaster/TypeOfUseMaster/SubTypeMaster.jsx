import React, { useState } from "react";
import {
    Drawer,
    Grid,
    TextField,
    IconButton,
    MenuItem,
    InputAdornment,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import DescriptionIcon from "@mui/icons-material/Description";
import CategoryIcon from "@mui/icons-material/Category";
import NumbersIcon from "@mui/icons-material/Numbers";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import CustomButton from "../../../../../Helpers/ExtraProperties/CustomButtons"
import MasterCustomTable from "../../../../../Helpers/ExtraProperties/MasterCustomTable"
import { ValidationProvider } from "../../../../../Contexts/ValidationContext"

export default function SubTypeMaster({ open, onClose }) {
    const [subTypes, setSubTypes] = useState([
        {
            id: 1,
            subType: "Institutional Premium",
            appliesTo: "Educational",
            keySeq: 1,
            shortcut: "Ctrl+Shift+I",
        },
        {
            id: 2,
            subType: "Commercial Premium",
            appliesTo: "Government,Agricultural",
            keySeq: 2,
            shortcut: "Ctrl+Shift+C",
        },
    ]);

    // Form state
    const [formData, setFormData] = useState({
        subType: "",
        appliesTo: "",
        keySeq: "",
        shortcut: "",
    });

    const [editIndex, setEditIndex] = useState(null);

    // Define table columns
    const columns = [
        {
            key: "subType",
            header: "SUB TYPE OF USE",
            isPrimary: true,
        },
        {
            key: "appliesTo",
            header: "APPLIES TO",
        },
        {
            key: "keySeq",
            header: "KEYWISE SEQ",
        },
        {
            key: "shortcut",
            header: "SHORTCUT",
        },
    ];

    // Handle input
    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    // Save new row
    const handleSave = () => {
        if (!formData.subType || !formData.appliesTo) {
            return;
        }

        const newSubType = {
            id: Date.now(),
            ...formData,
        };
        setSubTypes([newSubType, ...subTypes]);
        handleClear();
    };

    // Update row
    const handleUpdate = () => {
        if (editIndex === null) return;

        if (!formData.subType || !formData.appliesTo) {
            return;
        }

        const updated = [...subTypes];
        updated[editIndex] = formData;
        setSubTypes(updated);
        handleClear();
    };

    // Delete row
    const handleDelete = (index, row) => {
        setSubTypes(subTypes.filter((_, i) => i !== index));

        if (editIndex === index) {
            handleClear();
        }
    };

    // Clear form
    const handleClear = () => {
        setFormData({
            subType: "",
            appliesTo: "",
            keySeq: "",
            shortcut: "",
        });
        setEditIndex(null);
    };

    // Handle row edit
    const handleEdit = (index, row) => {
        setFormData(row);
        setEditIndex(index);
    };

    // Handle row click
    const handleRowClick = (index, row) => {
        setEditIndex(index);
    };

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: { width: { xs: "100%", md: "30%" } },
            }}
        >
            <div className="p-4 flex justify-between items-center border-b">
                <h2 className="text-xl font-bold">Sub Type of Use Factor</h2>
                <IconButton onClick={onClose}>
                    <Close />
                </IconButton>
            </div>

            <div className="p-4 space-y-4">
                {/* Drawer Form */}
                <Grid container spacing={2}>
                    <Grid sx={{
                        flexBasis: { xs: "100%", sm: "45%", md: "45%" },
                        maxWidth: { xs: "100%", sm: "45%", md: "45%" },
                    }}>
                        <TextField
                            fullWidth
                            label="Sub Type of Use Description"
                            placeholder="Enter sub type description"
                            InputLabelProps={{ shrink: true }}
                            value={formData.subType}
                            size="small"
                            onChange={(e) => handleChange("subType", e.target.value)}
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
                        flexBasis: { xs: "100%", sm: "45%", md: "45%" },
                        maxWidth: { xs: "100%", sm: "45%", md: "45%" },
                    }}>
                        <TextField
                            select
                            fullWidth
                            label="Type of Use Description"
                            value={formData.appliesTo || ""}
                            onChange={(e) => handleChange("appliesTo", e.target.value)}
                            size="small"
                            InputLabelProps={{ shrink: true }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <CategoryIcon />
                                    </InputAdornment>
                                ),
                            }}
                            SelectProps={{
                                displayEmpty: true,
                                renderValue: (selected) => {
                                    if (!selected) {
                                        return (
                                            <span style={{ color: "rgba(0,0,0,0.6)" }}>
                                                Select type of use
                                            </span>
                                        );
                                    }
                                    return selected;
                                },
                            }}
                        >
                            <MenuItem value="" disabled>
                                Select Type of Use
                            </MenuItem>
                            <MenuItem value="Educational">Educational</MenuItem>
                            <MenuItem value="Government">Government</MenuItem>
                            <MenuItem value="Agricultural">Agricultural</MenuItem>
                            <MenuItem value="Healthcare">Healthcare</MenuItem>
                            <MenuItem value="Religious">Religious</MenuItem>
                        </TextField>
                    </Grid>

                    <Grid sx={{
                        flexBasis: { xs: "100%", sm: "45%", md: "45%" },
                        maxWidth: { xs: "100%", sm: "45%", md: "45%" },
                    }}>
                        <TextField
                            fullWidth
                            label="Keywise Sequence"
                            placeholder="Enter sequence no"
                            InputLabelProps={{ shrink: true }}
                            value={formData.keySeq}
                            size="small"
                            onChange={(e) => handleChange("keySeq", e.target.value)}
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
                        flexBasis: { xs: "100%", sm: "45%", md: "45%" },
                        maxWidth: { xs: "100%", sm: "45%", md: "45%" },
                    }}>
                        <TextField
                            fullWidth
                            label="Keyboard Shortcut"
                            placeholder="e.g. Ctrl+E"
                            InputLabelProps={{ shrink: true }}
                            value={formData.shortcut}
                            size="small"
                            onChange={(e) => handleChange("shortcut", e.target.value)}
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

                {/* Drawer Buttons */}
                <ValidationProvider
                    rules={{
                        save: () =>
                            formData.subType.trim() !== "" &&
                            formData.appliesTo.trim() !== "",
                        updated: () => editIndex !== null,
                        delete: () => editIndex !== null,
                        clear: () =>
                            formData.subType.trim() !== "" ||
                            formData.appliesTo.trim() !== "" ||
                            formData.keySeq.trim() !== "" ||
                            formData.shortcut.trim() !== "",
                    }}
                >
                    <div className="flex gap-2 flex-wrap mb-4">
                        <CustomButton
                            type="save"
                            onClick={handleSave}
                            size="small"
                            style={{ width: "90px" }}
                        >
                            Save
                        </CustomButton>

                        <CustomButton
                            type="updated"
                            onClick={handleUpdate}
                            disabled={editIndex === null}
                            size="small"
                            style={{ width: "90px" }}
                        >
                            Update
                        </CustomButton>

                        <CustomButton
                            type="delete"
                            onClick={() => handleDelete(editIndex, formData)}
                            disabled={editIndex === null}
                            size="small"
                            style={{ width: "90px" }}
                        >
                            Delete
                        </CustomButton>

                        <CustomButton
                            type="clear"
                            onClick={handleClear}
                            size="small"
                            style={{ width: "90px" }}
                        >
                            Clear
                        </CustomButton>
                    </div>
                </ValidationProvider>

                {/* MasterCustomTable */}
                <MasterCustomTable
                    columns={columns}
                    data={subTypes}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onRowClick={handleRowClick}
                    editIndex={editIndex}
                    pagination={true}
                />
            </div>
        </Drawer>
    );
}
