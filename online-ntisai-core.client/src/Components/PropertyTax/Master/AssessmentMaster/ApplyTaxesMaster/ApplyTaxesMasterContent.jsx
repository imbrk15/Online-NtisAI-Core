import React, { useState } from "react";
import {
    Grid,
    TextField,
    MenuItem,
    Button,
    RadioGroup,
    FormControlLabel,
    Radio,
    Typography,
    Paper,
    Checkbox,
    InputAdornment,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CustomButton from "../../../../../Helpers/ExtraProperties/CustomButtons";
import MasterCustomTable from "../../../../../Helpers/ExtraProperties/MasterCustomTable";
import { useToast } from "../../../../../Contexts/ToastContext";
export default function ApplyTaxesMasterContent() {
    const { showToast } = useToast(); // Get the toast function
    const [ward, setWard] = useState("2");
    const [fromProp, setFromProp] = useState("1001");
    const [toProp, setToProp] = useState("1200");
    const [scope, setScope] = useState("all");
    const [applyAll, setApplyAll] = useState(false);
    const [editIndex, setEditIndex] = useState(null);

    // All tax fields
    const [taxes, setTaxes] = useState({
        property: 250,
        education: 50,
        tree: 0,
        employ: 0,
        spEdu: 0,
        fire: 0,
        road: 35,
        light: 0,
        sewage: 40,
        sanitation: 0,
        drain: 25,
        wCess: 0,
        wBenefit: 0,
        mBuild: 0,
        wBill: 0,
        tax1: 0,
        tax2: 0,
        tax3: 0,
        tax4: 0,
        tax5: 0,
        taxForPlot: 0,
        policyApplicable: 0,
    });

    // Table rows
    const [rows, setRows] = useState([
        {
            id: 1,
            ward: 1,
            scope: "all",
            from: "",
            to: "",
            property: 0,
            education: 0,
            road: 0,
            sewage: 0,
            drain: 0,
            updated: "05/09/2025",
        },
        {
            id: 2,
            ward: 2,
            scope: "range",
            from: 1001,
            to: 1200,
            property: 250,
            education: 50,
            road: 35,
            sewage: 40,
            drain: 25,
            updated: "05/09/2025",
        },
    ]);

    // Define table columns
    const columns = [
        {
            key: "ward",
            header: "WARD",
            isPrimary: true,
        },
        {
            key: "scope",
            header: "SCOPE",
        },
        {
            key: "from",
            header: "FROM",
        },
        {
            key: "to",
            header: "TO",
        },
        {
            key: "property",
            header: "PROPERTY",
        },
        {
            key: "education",
            header: "EDUCATION",
        },
        {
            key: "road",
            header: "ROAD",
        },
        {
            key: "sewage",
            header: "SEWAGE",
        },
        {
            key: "drain",
            header: "DRAIN",
        },
        {
            key: "updated",
            header: "UPDATED",
        },
    ];

    // Labels for all text fields
    const taxLabels = {
        property: "Property",
        education: "Education",
        tree: "Tree",
        employ: "Employ.",
        spEdu: "Sp.Edu.",
        fire: "Fire",
        road: "Road",
        light: "Light",
        sewage: "Sewage",
        sanitation: "Sanitation",
        drain: "Drain",
        wCess: "W.Cess",
        wBenefit: "W.Benefit",
        mBuild: "M.Build",
        wBill: "W.Bill",
        tax1: "Tax1",
        tax2: "Tax2",
        tax3: "Tax3",
        tax4: "Tax4",
        tax5: "Tax5",
        taxForPlot: "Tax For Plot",
        policyApplicable: "Policy Applicable",
    };

    // Save button handler
    const handleSave = () => {
        const newRow = {
            id: editIndex !== null ? rows[editIndex].id : Date.now(),
            ward: parseInt(ward),
            scope,
            from: fromProp,
            to: toProp,
            property: taxes.property,
            education: taxes.education,
            road: taxes.road,
            sewage: taxes.sewage,
            drain: taxes.drain,
            updated: new Date().toLocaleDateString("en-GB"),
        };

        if (editIndex !== null) {
            // Update existing row
            const updatedRows = [...rows];
            updatedRows[editIndex] = newRow;
            setRows(updatedRows);
            setEditIndex(null);
            showToast("Tax record updated successfully!", "success");
        } else {
            // Add new row
            setRows([newRow, ...rows]);
            showToast("Tax record added successfully!", "success");
        }
    };

    // Handle row click
    const handleRowClick = (index, row) => {
        setEditIndex(index);
        setWard(row.ward.toString());
        setScope(row.scope);
        setFromProp(row.from.toString());
        setToProp(row.to.toString());
        setTaxes({
            ...taxes,
            property: row.property,
            education: row.education,
            road: row.road,
            sewage: row.sewage,
            drain: row.drain,
        });
    };

    // Clear form
    const handleClear = () => {
        setEditIndex(null);
        setWard("2");
        setScope("all");
        setFromProp("1001");
        setToProp("1200");
        setTaxes({
            ...taxes,
            property: 250,
            education: 50,
            road: 35,
            sewage: 40,
            drain: 25,
        });
        showToast("Form cleared!", "info");
    };

    return (
        <div className="p-0 pt-0">
            {/* Header */}
            <div className="flex flex-col items-center justify-center mb-4 bg-[#f2f7ff] rounded-xl py-4">
                <h1 className="text-2xl md:text-2xl font-bold tracking-tight text-slate-900">
                    Apply Taxes Master
                </h1>
                <Typography
                    variant="body2"
                    className="text-gray-600 mt-2 text-center"
                >
                    Define default tax amounts and flags, scoped by Ward / Property range.
                </Typography>
            </div>

            {/* Top Filters */}
            <Paper elevation={3} className="p-4 mb-6 rounded-2xl shadow-sm">
                <Grid container spacing={2} alignItems="center">
                    {/* Ward Dropdown */}
                    <Grid sx={{
                        flexBasis: { xs: "100%", sm: "45%", md: "20%" },
                        maxWidth: { xs: "100%", sm: "45%", md: "20%" },
                    }}>
                        <TextField
                            select
                            label="Ward No."
                            value={ward}
                            size="small"
                            onChange={(e) => setWard(e.target.value)}
                            fullWidth
                        >
                            <MenuItem value="1">1</MenuItem>
                            <MenuItem value="2">2</MenuItem>
                            <MenuItem value="3">3</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid sx={{
                        flexBasis: { xs: "100%", sm: "50%", md: "6%" },
                        maxWidth: { xs: "100%", sm: "50%", md: "6%" },
                    }} className="flex flex-col">
                        <span className="text-sm font-medium text-gray-700">All</span>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={applyAll}
                                    size="small"
                                    onChange={(e) => setApplyAll(e.target.checked)}
                                    color="primary"
                                />
                            }
                            label="Apply"
                        />
                    </Grid>
                    {/* From Prop */}
                    <Grid sx={{
                        flexBasis: { xs: "100%", sm: "45%", md: "20%" },
                        maxWidth: { xs: "100%", sm: "45%", md: "20%" },
                    }}>
                        <TextField
                            label="From Prop"
                            value={fromProp}
                            size="small"
                            onChange={(e) => setFromProp(e.target.value)}
                            fullWidth
                        />
                    </Grid>

                    {/* To Prop */}
                    <Grid sx={{
                        flexBasis: { xs: "100%", sm: "45%", md: "20%" },
                        maxWidth: { xs: "100%", sm: "45%", md: "20%" },
                    }}>
                        <TextField
                            label="To Prop"
                            value={toProp}
                            size="small"
                            onChange={(e) => setToProp(e.target.value)}
                            fullWidth
                        />
                    </Grid>

                    {/* Show Button */}
                    <Grid sx={{
                        flexBasis: { xs: "100%", sm: "30%", md: "10%" },
                        maxWidth: { xs: "100%", sm: "30%", md: "10%" },
                    }}>
                        <Button
                            variant="outlined"
                            color="primary"
                            startIcon={<VisibilityIcon />}
                            fullWidth
                        >
                            Show
                        </Button>
                    </Grid>
                </Grid>
            </Paper>

            {/* Tax Apply Criteria */}
            <Paper elevation={2} className="p-4 mb-6 rounded-2xl shadow-sm">
                <Typography variant="subtitle1" className="mb-2 font-semibold">
                    Tax Apply Criteria
                </Typography>
                <RadioGroup
                    row
                    value={scope}
                    onChange={(e) => setScope(e.target.value)}
                >
                    <FormControlLabel
                        value="all"
                        control={<Radio />}
                        label="For all properties"
                    />
                    <FormControlLabel
                        value="single"
                        control={<Radio />}
                        label="For single property"
                    />
                    <FormControlLabel
                        value="ward"
                        control={<Radio />}
                        label="For all ward"
                    />
                </RadioGroup>
            </Paper>

            {/* Tax Fields (all) */}
            <Paper elevation={2} className="p-4 mb-6 rounded-2xl shadow-sm">
                <Grid container spacing={2}>
                    {Object.keys(taxes).slice(0, 12).map((key) => (
                        <Grid sx={{
                            flexBasis: { xs: "45%", sm: "15%", md: "7%" },
                            maxWidth: { xs: "45%", sm: "15%", md: "7%" },
                        }}>
                            <TextField
                                size="small"
                                label={taxLabels[key]}
                                type="number"
                                value={taxes[key]}
                                onChange={(e) => setTaxes({ ...taxes, [key]: e.target.value })}
                                fullWidth
                            />
                        </Grid>
                    ))}
                </Grid>
                <Grid container spacing={2} className="mt-4">
                    {Object.keys(taxes).slice(12).map((key) => (
                        <Grid sx={{
                            flexBasis: { xs: "45%", sm: "15%", md: "8%" },
                            maxWidth: { xs: "45%", sm: "15%", md: "8%" },
                        }}>
                            <TextField
                                size="small"
                                label={taxLabels[key]}
                                type="number"
                                value={taxes[key]}
                                onChange={(e) => setTaxes({ ...taxes, [key]: e.target.value })}
                                fullWidth
                            />
                        </Grid>
                    ))}
                </Grid>
            </Paper>

            {/* Action Buttons */}
            <div className="flex gap-2 flex-wrap mb-4 justify-center">
                <CustomButton
                    type={editIndex !== null ? "updated" : "save"}
                    onClick={handleSave}
                    size="small"
                    sx={{ width: "120px" }}
                >
                    {editIndex !== null ? "Update" : "Save"}
                </CustomButton>

                <CustomButton
                    type="clear"
                    onClick={handleClear}
                    size="small"
                    disabled={editIndex === null}
                    sx={{ width: "120px" }}
                >
                    Cancel
                </CustomButton>
            </div>

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
