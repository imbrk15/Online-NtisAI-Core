import React, { useState } from "react";
import {
    Grid,
    TextField,
    InputAdornment,
} from "@mui/material";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import ScaleIcon from "@mui/icons-material/Scale";
import DescriptionIcon from "@mui/icons-material/Description";
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import NumbersIcon from "@mui/icons-material/Numbers";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';
import SearchIcon from "@mui/icons-material/Search";
import CustomButton from "../../../../../Helpers/ExtraProperties/CustomButtons";
import MasterCustomTable from "../../../../../Helpers/ExtraProperties/MasterCustomTable";
import SourceOutlinedIcon from '@mui/icons-material/SourceOutlined';
import { ValidationProvider } from "../../../../../Contexts/ValidationContext"
export default function ConstructionTypeMaster() {
    const [rows, setRows] = useState([
        {
            code: "CONST001",
            description: "RCC Structure",
            weightage: 1.5,
            group: "A",
            keywiseSequence: 1,
            keyboardShortcut: "Ctrl+R",
        },
        {
            code: "CONST002",
            description: "Load Bearing Walls",
            weightage: 1.25,
            group: "B",
            keywiseSequence: 2,
            keyboardShortcut: "Ctrl+L",
        },
        {
            code: "CONST003",
            description: "Steel Structure",
            weightage: 1.75,
            group: "A",
            keywiseSequence: 3,
            keyboardShortcut: "Ctrl+S",
        },
        {
            code: "CONST004",
            description: "Wooden Structure",
            weightage: 0.9,
            group: "C",
            keywiseSequence: 4,
            keyboardShortcut: "Ctrl+W",
        },
    ]);

    const [formData, setFormData] = useState({
        code: "",
        description: "",
        weightage: "",
        group: "",
        keywiseSequence: "",
        keyboardShortcut: "",
    });

    const [selectedIndex, setSelectedIndex] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [isEditMode, setIsEditMode] = useState(false);

    const columns = [
        { key: "code", header: "CONSTRUCTION ID", isPrimary: true },
        { key: "weightage", header: "WEIGHTAGE" },
        { key: "description", header: "DESCRIPTION" },
        { key: "group", header: "GROUP" },
        { key: "keywiseSequence", header: "KEYWISE SEQUENCE" },
        { key: "keyboardShortcut", header: "KEYBOARD SHORTCUT" },
    ];

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSave = () => {
        const allFieldsFilled = Object.values(formData).every(value => value !== null && value !== "");
        if (!allFieldsFilled) return;

        setRows([formData, ...rows]);
        handleClear();
    };

    const handleUpdate = () => {
        if (selectedIndex !== null) {
            const updatedRows = [...rows];
            updatedRows[selectedIndex] = formData;
            setRows(updatedRows);
            handleClear();
        }
    };

    const handleDelete = (index) => {
        const updatedRows = rows.filter((_, i) => i !== index);
        setRows(updatedRows);
        handleClear();
    };

    const handleClear = () => {
        setFormData({
            code: "",
            description: "",
            weightage: "",
            group: "",
            keywiseSequence: "",
            keyboardShortcut: "",
        });
        setSelectedIndex(null);
        setIsEditMode(false);
    };

    const handleRowClick = (idx, row) => {
        setFormData(row);
        setSelectedIndex(idx);
        setIsEditMode(true);
    };

    const filteredRows = rows.filter((row) => {
        return (
            row.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
            row.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            row.group.toLowerCase().includes(searchQuery.toLowerCase()) ||
            row.keywiseSequence.toString().includes(searchQuery) ||
            row.weightage.toString().includes(searchQuery) ||
            row.keyboardShortcut.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    return (
        <div>

            <div className="flex items-center justify-center mb-4 bg-[#f2f7ff] rounded-xl py-4">
                <h1 className="text-2xl font-bold text-gray-800">Construction Type Master</h1>
            </div>

            {/* Form Section */}
            <div className="border p-4 mb-6 rounded-xl">
                <h2 className="font-bold text-lg mb-4 flex items-center">
                    <ApartmentRoundedIcon className="text-blue-500 mr-2" size={24} />
                    Details
                </h2>
                <Grid container spacing={2} sx={{
                    mt: 2
                }}>
                    {[
                        {
                            label: "Construction ID",
                            value: formData.code,
                            field: "code",
                            icon: <HomeWorkIcon />,
                        },
                        {
                            label: "Weightage",
                            value: formData.weightage,
                            field: "weightage",
                            icon: <ScaleIcon />,
                        },
                        {
                            label: "Description",
                            value: formData.description,
                            field: "description",
                            icon: <DescriptionIcon />,
                        },
                        {
                            label: "Group",
                            value: formData.group,
                            field: "group",
                            icon: <GroupWorkIcon />,
                        },
                        {
                            label: "Keywise Sequence",
                            value: formData.keywiseSequence,
                            field: "keywiseSequence",
                            icon: <NumbersIcon />,
                        },
                        {
                            label: "Keyboard Shortcut",
                            value: formData.keyboardShortcut,
                            field: "keyboardShortcut",
                            icon: <KeyboardIcon />,
                        },
                    ].map((input, i) => (
                        <Grid key={i} sx={{
                            flexBasis: { xs: "100%", sm: "45%", md: "15%" },
                            maxWidth: { xs: "100%", sm: "45%", md: "15%" },
                            mb: 2
                        }}>
                            <TextField
                                fullWidth
                                size="small"
                                label={input.label}
                                placeholder={`Enter ${input.label.toLowerCase()}`}
                                value={input.value}
                                onChange={(e) => handleChange(input.field, e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">{input.icon}</InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                    ))}
                </Grid>



                {/* ✅ Button Section */}
                <ValidationProvider
                    rules={{
                        save: () =>
                            formData.code.trim() !== "" &&
                            formData.description.trim() !== "" &&
                            formData.weightage.toString().trim() !== "" &&
                            formData.group.trim() !== "" &&
                            formData.keywiseSequence.toString().trim() !== "" &&
                            formData.keyboardShortcut.trim() !== "",
                        updated: () =>
                            selectedIndex !== null &&
                            formData.code.trim() !== "" &&
                            formData.description.trim() !== "" &&
                            formData.weightage.toString().trim() !== "" &&
                            formData.group.trim() !== "" &&
                            formData.keywiseSequence.toString().trim() !== "" &&
                            formData.keyboardShortcut.trim() !== "",
                        delete: () => selectedIndex !== null,
                        clear: () =>
                            formData.code.trim() !== "" ||
                            formData.description.trim() !== "" ||
                            formData.weightage.toString().trim() !== "" ||
                            formData.group.trim() !== "" ||
                            formData.keywiseSequence.toString().trim() !== "" ||
                            formData.keyboardShortcut.trim() !== "",
                    }}
                >
                    <div className="flex gap-3 mb-4 flex-wrap justify-center">
                        <CustomButton type="new" onClick={handleClear} style={{ width: "100px" }}>
                            New
                        </CustomButton>
                        <CustomButton type="save" onClick={handleSave} style={{ width: "100px" }}>
                            Save
                        </CustomButton>
                        {isEditMode && (
                            <CustomButton type="updated" onClick={handleUpdate} style={{ width: "100px" }}>
                                Update
                            </CustomButton>
                        )}
                        <CustomButton
                            type="delete"
                            onClick={() => handleDelete(selectedIndex)}
                            style={{ width: "100px" }}
                        >
                            Delete
                        </CustomButton>
                        {isEditMode && (
                            <CustomButton type="clear" onClick={handleClear} style={{ width: "100px" }}>
                                Clear
                            </CustomButton>
                        )}
                    </div>
                </ValidationProvider>
            </div>

            {/* Table Section */}
            <div className="border p-4 rounded-xl">
                <div className="flex flex-wrap justify-between items-center mb-4">
                    <h2 className="font-bold text-lg flex items-center mb-2 sm:mb-0 sm:flex-grow">
                        <SourceOutlinedIcon className="text-blue-500  mr-2" size={24} />
                        Records
                    </h2>
                    <TextField
                        size="small"
                        label="Search"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                        sx={{ maxWidth: 250 }}
                    />
                </div>

                <MasterCustomTable
                    columns={columns}
                    data={filteredRows}
                    onEdit={(index, row) => handleRowClick(index, row)}
                    onDelete={(index) => handleDelete(index)}
                    onRowClick={handleRowClick}
                    editIndex={selectedIndex}
                />
            </div>
        </div>
    );
}

