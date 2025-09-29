import React, { useState } from "react";
import {
    Grid,
    TextField,
    InputAdornment,
    Box,
    MenuItem,
} from "@mui/material";
import PercentIcon from "@mui/icons-material/Percent";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import YearPickerField from "../../../../../../Helpers/ExtraProperties/YearPickerField";
import CustomButton from "../../../../../../Helpers/ExtraProperties/CustomButtons";
import MasterCustomTable from "../../../../../../Helpers/ExtraProperties/MasterCustomTable";
import { ValidationProvider } from "../../../../../../Contexts/ValidationContext";

/** Default rows for Tax Master CV */
const defaultRows = [
    { id: 1, year: "2024", rate: 1.2, description: "Property Tax - Residential" },
    { id: 2, year: "2024", rate: 2.5, description: "Property Tax - Commercial" },
    { id: 3, year: "2024", rate: 0.8, description: "Water Tax - Residential" },
    { id: 4, year: "2024", rate: 1.8, description: "Water Tax - Industrial" },
    { id: 5, year: "2024", rate: 0.5, description: "Education Cess - Residential, Commercial" },
    { id: 6, year: "2023", rate: 1.0, description: "Property Tax - Residential" },
];

/** Table columns for MasterCustomTable */
const columns = [
    { key: "year", header: "Year", align: "center" },
    {
        key: "rate",
        header: "CV Rate (%)",
        align: "center",
        render: (value) =>
            value === "" || value === null || value === undefined
                ? "—"
                : `${Number(value).toFixed(2)}%`,
    },
    { key: "description", header: "Description" },
];

export default function TaxMasterForCVContent() {
    // Form state
    const [master, setMaster] = useState("");
    const [type, setType] = useState("");
    const [year, setYear] = useState("");
    const [rate, setRate] = useState("");

    // Table state
    const [rows, setRows] = useState(defaultRows);
    const [editingId, setEditingId] = useState(null);
    const [editIndex, setEditIndex] = useState(null);

    const resetForm = () => {
        setMaster("");
        setType("");
        setYear("");
        setRate("");
        setEditingId(null);
        setEditIndex(null);
    };

    const handleAddOrUpdate = () => {
        if (!master || !type || !year || rate === "") return;

        const newId = rows.length > 0 ? Math.max(...rows.map((r) => r.id)) + 1 : 1;

        const payload = {
            id: newId,
            year: String(year),
            rate: Number(rate),
            description: `${master} - ${type}`,
        };

        if (editingId !== null) {
            // Update row
            setRows((prev) => prev.map((r) => (r.id === editingId ? { ...r, ...payload } : r)));
        } else {
            // Add new row
            setRows([{ id: newId, ...payload }, ...rows]);
        }
        resetForm();
    };

    const handleEdit = (index, row) => {
        setMaster(row.description.split(" - ")[0] || "");
        setType(row.description.split(" - ")[1] || "");
        setYear(row.year || "");
        setRate(row.rate !== undefined && row.rate !== null ? String(row.rate) : "");
        setEditingId(row.id);
        setEditIndex(index);
    };

    const handleDelete = (index, row) => {
        setRows((prev) => prev.filter((r) => r.id !== row.id));
        if (editingId === row.id) resetForm();
    };

    const handleCancel = () => resetForm();

    return (
        <div className="p-0 pt-0">
            {/* Form Section */}
            <Grid
                container
                spacing={2}
                className="mb-4"
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent:"center",
                    gap: 2,
                }}
            >
                {/* Select Master */}
                <Grid
                    item
                    xs={12}
                    sm={3}
                    sx={{
                        flexBasis: { xs: "100%", sm: "45%", md: "25%" },
                        maxWidth: { xs: "100%", sm: "45%", md: "25%" },
                    }}
                >
                    <TextField
                        select
                        fullWidth
                        size="small"
                        label="Select Master"
                        value={master || "Select Master"}
                        onChange={(e) => setMaster(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountBalanceIcon />
                                </InputAdornment>
                            ),
                        }}
                    >
                        <MenuItem value="Select Master" disabled>
                            Select Master
                        </MenuItem>
                        <MenuItem value="Property Tax">Property Tax</MenuItem>
                        <MenuItem value="Water Tax">Water Tax</MenuItem>
                        <MenuItem value="Education Cess">Education Cess</MenuItem>
                    </TextField>
                </Grid>

                {/* Type of Use */}
                <Grid
                    item
                    xs={12}
                    sm={3}
                    sx={{
                        flexBasis: { xs: "100%", sm: "45%", md: "27%" },
                        maxWidth: { xs: "100%", sm: "45%", md: "27%" },
                    }}
                >
                    <TextField
                        select
                        fullWidth
                        size="small"
                        label="Type of Use"
                        value={type || "type of use"}
                        onChange={(e) => setType(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountBalanceIcon sx={{ color: "#757575" }} />
                                </InputAdornment>
                            ),
                        }}
                    >
                        <MenuItem value="type of use" disabled>
                            Select Type Of Use
                        </MenuItem>
                        <MenuItem value="Residential">Residential</MenuItem>
                        <MenuItem value="Commercial">Commercial</MenuItem>
                        <MenuItem value="Industrial">Industrial</MenuItem>
                    </TextField>
                </Grid>

                {/* Year */}
                <YearPickerField
                    year={year}
                    setYear={setYear}
                    gridProps={{
                        flexBasis: { xs: "100%", sm: "45%", md: "20%" },
                        maxWidth: { xs: "100%", sm: "45%", md: "20%" },
                    }}
                />

                {/* CV Rate % */}
                <Grid
                    item
                    xs={12}
                    sm={2}
                    sx={{
                        flexBasis: { xs: "100%", sm: "45%", md: "20%" },
                        maxWidth: { xs: "100%", sm: "45%", md: "20%" },
                    }}
                >
                    <TextField
                        fullWidth
                        size="small"
                        type="number"
                        label="CV Rate (%)"
                        placeholder="e.g.- 1.5"
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                        inputProps={{ step: "0.1", min: 0 }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PercentIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>

                {/* Add / Update + Cancel with Validation */}
            </Grid>
            <Box sx={{ mt: { xs: 2, md: 3 },mb:2 }} >
                <Grid container spacing={2} justifyContent="center">
                    <ValidationProvider
                        rules={{
                            add: () => master && type && year && rate,
                            updated: () => master && type && year && rate,
                            delete: () => rows.length > 0,
                        }}
                    >
                        <Box sx={{ display: "flex", gap: 1 }}>
                            <Grid item xs={12} sm="auto">
                                <CustomButton
                                    type={editingId !== null ? "updated" : "add"}
                                    onClick={handleAddOrUpdate}
                                    size="small"
                                    className="!h-10 !text-[14px] font-bold !normal-case"
                                    style={{width:"120px"} }
                                >
                                    {editingId !== null ? "Update" : "Add"}
                                </CustomButton>
                            </Grid>
                            {editingId && (
                                <Grid item xs={12} sm="auto">
                                    <CustomButton
                                        type="clear"
                                        onClick={handleCancel}
                                        size="small"
                                        className="!h-10 font-bold !normal-case"
                                        style={{ width: "120px" }}
                                    >
                                        Clear
                                    </CustomButton>
                                </Grid>
                            )}
                        </Box>
                    </ValidationProvider>
                </Grid>
            </Box>

            {/* Table Section */}
            <MasterCustomTable
                columns={columns}
                data={rows}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onRowClick={handleEdit}
                editIndex={editIndex}
                pagination={true}
                rowsPerPage={5}
            />
        </div>
    );
}
