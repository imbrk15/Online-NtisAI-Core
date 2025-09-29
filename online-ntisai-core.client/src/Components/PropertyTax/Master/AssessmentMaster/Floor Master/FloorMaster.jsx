
import React, { useState } from "react";
import {
    Grid,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    OutlinedInput,
    InputAdornment,
    TextField,
    Paper
} from "@mui/material";
import { MdSearch } from "react-icons/md";
import CustomButton from "../../../../../Helpers/ExtraProperties/CustomButtons";
import MasterCustomTable from "../../../../../Helpers/ExtraProperties/MasterCustomTable";
import SourceOutlinedIcon from '@mui/icons-material/SourceOutlined';
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';
import Elevator from '@mui/icons-material/Elevator';
import Stairs from '@mui/icons-material/Stairs';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import Description from '@mui/icons-material/Description';
import AddBox from '@mui/icons-material/AddBox';
import { ValidationProvider } from "../../../../../Contexts/ValidationContext"

const floorOption = ["New Floor", "Old Floor"];

const columns = [
    { key: "name", header: "FLOOR NAME", isPrimary: true },
    { key: "description", header: "DESCRIPTION" },
    { key: "weightWithLift", header: "WEIGHTAGE WITH LIFT" },
    { key: "weightWithoutLift", header: "WEIGHTAGE WITHOUT LIFT" },
    { key: "floorType", header: "FLOOR TYPE" },
];

export default function FloorMaster() {
    const [floors, setFloors] = useState([
        {
            id: 1,
            floorType: "New Floor",
            name: "Basement",
            description: "Below ground level",
            weightWithLift: 0.70,
            weightWithoutLift: 0.60,
        },
        {
            id: 2,
            floorType: "New Floor",
            name: "Ground Floor",
            description: "Street level floor",
            weightWithLift: 1.0,
            weightWithoutLift: 1.0,
        },
        {
            id: 3,
            floorType: "Old Floor",
            name: "First Floor",
            description: "One level above ground",
            weightWithLift: "N/A",
            weightWithoutLift: "N/A",
        },
        {
            id: 4,
            floorType: "Old Floor",
            name: "Second Floor",
            description: "Two level above ground",
            weightWithLift: "N/A",
            weightWithoutLift: "N/A",
        },
        {
            id: 5,
            floorType: "Old Floor",
            name: "Third Floor",
            description: "Three level above ground",
            weightWithLift: "N/A",
            weightWithoutLift: "N/A",
        },
        {
            id: 6,
            floorType: "New Floor",
            name: "Mezzanine",
            description: "Intermediate floor between ground and first",
            weightWithLift: "0.95",
            weightWithoutLift: "0.95",
        },
        {
            id: 7,
            floorType: "New Floor",
            name: "Penthouse",
            description: "Top floor luxury apartment",
            weightWithLift: "1.10",
            weightWithoutLift: "0.85",
        },
    ]);

    const [editIndex, setEditIndex] = useState(null);
    const [formData, setFormData] = useState({
        floorType: "",
        name: "",
        description: "",
        weightWithLift: "",
        weightWithoutLift: "",
    });
    const [searchQuery, setSearchQuery] = useState("");

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        if (!formData.name?.trim() || !formData.floorType?.trim()) return;

        const newFloor = {
            id: Date.now(),
            ...formData,
            weightWithLift:
                formData.floorType === "Old Floor" ? "N/A" : formData.weightWithLift,
            weightWithoutLift:
                formData.floorType === "Old Floor" ? "N/A" : formData.weightWithoutLift,
        };

        setFloors([newFloor, ...floors]);
        handleClear();
    };


    const handleUpdate = () => {
        if (editIndex === null) return;

        const updatedRows = [...floors];
        updatedRows[editIndex] = {
            ...updatedRows[editIndex],
            ...formData,
            weightWithLift:
                formData.floorType === "Old Floor" ? "N/A" : formData.weightWithLift,
            weightWithoutLift:
                formData.floorType === "Old Floor" ? "N/A" : formData.weightWithoutLift,
        };

        setFloors(updatedRows);
        handleClear();
    };

    const handleEdit = (index, row) => {
        setFormData({
            floorType: row.floorType || "",
            name: row.name || "",
            description: row.description || "",
            weightWithLift: row.weightWithLift || "",
            weightWithoutLift: row.weightWithoutLift || "",
        });
        setEditIndex(index);
    };

    const handleDelete = (index) => {
        const updatedFloors = [...floors];
        updatedFloors.splice(index, 1);
        setFloors(updatedFloors);

        if (editIndex === index) {
            handleClear();
        } else if (editIndex !== null && index < editIndex) {
            setEditIndex(editIndex - 1);
        }
    };

    const handleRowClick = (index, row) => {
        setFormData({
            floorType: row.floorType || "",
            name: row.name || "",
            description: row.description || "",
            weightWithLift: row.weightWithLift || "",
            weightWithoutLift: row.weightWithoutLift || "",
        });
        setEditIndex(index);
    };

    const handleClear = () => {
        setEditIndex(null);
        setFormData({
            floorType: "",
            name: "",
            description: "",
            weightWithLift: "",
            weightWithoutLift: "",
        });
    };

    const handleNew = () => {
        handleClear();
    };

    const filteredFloors = floors.filter(
        (f) =>
            f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (f.description || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
            (f.floorType || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
            (f.weightWithLift || "").toString().includes(searchQuery) ||
            (f.weightWithoutLift || "").toString().includes(searchQuery)
    );

    return (
        <div className="p-0 pt-0">
            {/* Title */}
            <div className="flex items-center justify-center mb-4 bg-[#f2f7ff] rounded-xl py-4">
                <h1 className="text-2xl font-bold text-gray-800">Floor Master</h1>
            </div>

            {/* Form Section */}
            <Paper elevation={2} className="p-4 mb-6 rounded-2xl shadow-sm">
                <div className="flex items-center gap-2 text-xl font-semibold text-gray-700 mb-3">
                    <ApartmentRoundedIcon className="text-blue-500" size={24} />
                    Floor Configuration
                </div>

                <Grid container spacing={2} className="mb-4 pt-3">
                    {/* Floor Type */}
                    <Grid sx={{
                        flexBasis: { xs: "100%", sm: "45%", md: "18%" },
                        maxWidth: { xs: "100%", sm: "45%", md: "18%" },
                    }}>
                        <FormControl fullWidth size="small">
                            <InputLabel id="select-floor-type-label">Select Floor Type</InputLabel>
                            <Select
                                labelId="select-floor-type-label"
                                id="select-floor-type"
                                value={formData.floorType}
                                size="small"
                                onChange={(e) => handleChange("floorType", e.target.value)}
                                input={
                                    <OutlinedInput
                                        label="Select Floor Type"
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <CategoryOutlinedIcon sx={{ color: "#757575" }} />
                                            </InputAdornment>
                                        }
                                    />
                                }
                                displayEmpty
                            >
                                <MenuItem disabled value="">
                                    Select Floor Type
                                </MenuItem>
                                {floorOption.map((z) => (
                                    <MenuItem key={z} value={z}>
                                        {z}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Floor Name */}
                    <Grid sx={{
                        flexBasis: { xs: "100%", sm: "45%", md: "18%" },
                        maxWidth: { xs: "100%", sm: "45%", md: "18%" },
                    }}>
                        <TextField
                            fullWidth
                            label="Enter New Floor"
                            size="small"
                            placeholder="Enter Floor Name"
                            value={formData.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AddBox />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>

                    {/* Description */}
                    <Grid sx={{
                        flexBasis: { xs: "100%", sm: "45%", md: "18%" },
                        maxWidth: { xs: "100%", sm: "45%", md: "18%" },
                    }}>
                        <TextField
                            fullWidth
                            label="Floor Description"
                            size="small"
                            placeholder="Enter Description"
                            value={formData.description}
                            onChange={(e) => handleChange("description", e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Description />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>

                    {/* Weight with Lift */}
                    <Grid sx={{
                        flexBasis: { xs: "100%", sm: "45%", md: "18%" },
                        maxWidth: { xs: "100%", sm: "45%", md: "18%" },
                    }}>
                        <TextField
                            fullWidth
                            label="Weightage with Lift"
                            size="small"
                            placeholder={
                                formData.floorType === "Old Floor" ? "N/A for Old Floor" : "e.g : 1.00"
                            }
                            value={formData.floorType === "Old Floor" ? "" : formData.weightWithLift}
                            onChange={(e) => handleChange("weightWithLift", e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Elevator />
                                    </InputAdornment>
                                ),
                            }}
                            disabled={formData.floorType === "Old Floor"}
                        />
                    </Grid>

                    {/* Weight without Lift */}
                    <Grid sx={{
                        flexBasis: { xs: "100%", sm: "45%", md: "18%" },
                        maxWidth: { xs: "100%", sm: "45%", md: "18%" },
                    }}>
                        <TextField
                            fullWidth
                            label="Weightage without Lift"
                            size="small"
                            placeholder={
                                formData.floorType === "Old Floor" ? "N/A for Old Floor" : "e.g : 0.95"
                            }
                            value={
                                formData.floorType === "Old Floor" ? "" : formData.weightWithoutLift
                            }
                            onChange={(e) => handleChange("weightWithoutLift", e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Stairs />
                                    </InputAdornment>
                                ),
                            }}
                            disabled={formData.floorType === "Old Floor"}
                        />
                    </Grid>
                </Grid>

                {/* Buttons */}
                <div className="mb-4">
                    <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                        <Grid item xs={12}>
                            <ValidationProvider
                                rules={{
                                    new: () => true, // always valid
                                    save: () =>
                                        formData.name.trim() !== "" && formData.floorType.trim() !== "",
                                    updated: () =>
                                        editIndex !== null &&
                                        formData.name.trim() !== "" &&
                                        formData.floorType.trim() !== "",
                                    delete: () => editIndex !== null,
                                    clear: () =>
                                        formData.name.trim() !== "" ||
                                        formData.floorType.trim() !== "" ||
                                        formData.description.trim() !== "" ||
                                        formData.weightWithLift.toString().trim() !== "" ||
                                        formData.weightWithoutLift.toString().trim() !== "",
                                }}
                            >
                                <div className="flex flex-wrap gap-4 justify-center">
                                    {/* Always visible buttons */}
                                    <CustomButton type="new" onClick={handleNew} style={{ width: "100px" }}>
                                        New
                                    </CustomButton>

                                    <CustomButton type="save" onClick={handleSave} style={{ width: "100px" }}>
                                        Save
                                    </CustomButton>

                                    <CustomButton
                                        type="clear"
                                        onClick={handleClear}
                                        style={{ width: "100px" }}
                                        // Optionally, disable if nothing to clear
                                        disabled={
                                            !formData.name &&
                                            !formData.floorType &&
                                            !formData.description &&
                                            !formData.weightWithLift &&
                                            !formData.weightWithoutLift
                                        }
                                    >
                                        Clear
                                    </CustomButton>

                                    {/* Only show when editing a row */}
                                    {editIndex !== null && (
                                        <>
                                            <CustomButton type="updated" onClick={handleUpdate} style={{ width: "100px" }}>
                                                Update
                                            </CustomButton>

                                            <CustomButton
                                                type="delete"
                                                onClick={() => handleDelete(editIndex, formData)}
                                                style={{ width: "100px" }}
                                            >
                                                Delete
                                            </CustomButton>
                                        </>
                                    )}
                                </div>

                            </ValidationProvider>
                        </Grid>
                    </Grid>
                </div>
            </Paper>

            {/* Table Section */}
            <Paper className="p-4 mb-6">
                <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                    <Grid item xs={12} md={8}>
                        <div className="flex items-center gap-2 text-xl font-semibold text-gray-700 mb-3">
                            <SourceOutlinedIcon className="text-blue-500" size={24} />
                            Records
                        </div>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <div className="flex mb-3">
                            <TextField
                                label="Search Floors"
                                size="small"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by Floor Name, Description, Floor type, weightage with lift, weightage without lift"
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <MdSearch />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </div>
                    </Grid>
                </Grid>

                <MasterCustomTable
                    columns={columns}
                    data={filteredFloors}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onRowClick={handleRowClick}
                    editIndex={editIndex}
                    pagination={true}
                />
            </Paper>
        </div>
    );
}
