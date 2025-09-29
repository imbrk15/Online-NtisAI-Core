import React, { useEffect, useState } from "react";
import {
    Grid,
    //FormLabel,
    TextField,
    MenuItem,
    InputAdornment,
} from "@mui/material";

// MUI icons
import AccountBalanceIcon from "@mui/icons-material/AccountBalance"; // Zone
import LocationOnIcon from "@mui/icons-material/LocationOn"; // Ward
import ApartmentIcon from "@mui/icons-material/Apartment"; // Property Type
import FilterListIcon from "@mui/icons-material/FilterList"; // Type Filter
import DescriptionIcon from "@mui/icons-material/Description"; // Description

function PropertySearchTextField({ values, onChange }) {
    const [form, setForm] = useState({
        zone: "",
        ward: "",
        propertyType: "",
        typeFilter: "",
        description: "",
        ...(values || {}),
    });

    // sync internal state if parent updates values
    useEffect(() => {
        if (values) setForm((prev) => ({ ...prev, ...values }));
    }, [values]);

    const setField = (k) => (v) => {
        const next = { ...form, [k]: v };
        setForm(next);
        onChange?.(next);
    };


    return (
        <Grid container spacing={2} >
            {/* Zone */}
            <Grid sx={{
                flexBasis: { xs: "100%", sm: "45%", md: "15%" },
                maxWidth: { xs: "100%", sm: "45%", md: "15%" },
            }}>
                <TextField
                    id="zone"
                    select
                    fullWidth
                    size="small"
                    label="Select Zone"
                    variant="outlined"
                    value={form.zone || "select zone"}
                    onChange={(e) => setField("zone")(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountBalanceIcon />
                            </InputAdornment>
                        ),
                    }}
                >
                    <MenuItem value="select zone" disabled>Select Zone</MenuItem>
                    <MenuItem value="Kalwa">Kalwa</MenuItem>
                    <MenuItem value="Mumbra">Mumbra</MenuItem>
                </TextField>
            </Grid>

            {/* Ward */}
            <Grid sx={{
                flexBasis: { xs: "100%", sm: "45%", md: "15%" },
                maxWidth: { xs: "100%", sm: "45%", md: "15%" },
            }}>
                <TextField
                    id="ward"
                    select
                    fullWidth
                    size="small"
                    label="Select Ward"
                    value={form.ward || "ward"}
                    disabled={!form.zone}
                    onChange={(e) => setField("ward")(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LocationOnIcon />
                            </InputAdornment>
                        ),
                    }}
                >
                    <MenuItem value="ward" disabled>Select ward</MenuItem>
                    <MenuItem value="Kalwa1">Kalwa1</MenuItem>
                    <MenuItem value="Kalwa2">Kalwa2</MenuItem>
                    <MenuItem value="Mumbra1">Mumbra1</MenuItem>
                    <MenuItem value="Mumbra2">Mumbra2</MenuItem>
                </TextField>
            </Grid>

            {/* Property Type */}
            <Grid sx={{
                flexBasis: { xs: "100%", sm: "45%", md: "15%" },
                maxWidth: { xs: "100%", sm: "45%", md: "15%" },
            }}>
                <TextField
                    id="propertyType"
                    select
                    fullWidth
                    size="small"
                    label="Property Type"
                    value={form.propertyType || "type"}
                    onChange={(e) => setField("propertyType")(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <ApartmentIcon />
                            </InputAdornment>
                        ),
                    }}
                >
                    <MenuItem value="type" disabled>Select Property Type</MenuItem>
                    <MenuItem value="Assessed">Assessed</MenuItem>
                    <MenuItem value="Unassessed">Unassessed</MenuItem>
                    <MenuItem value="Under Assessed">Under Assessed</MenuItem>
                </TextField>
            </Grid>

            {/* Type Filter */}
            <Grid sx={{
                flexBasis: { xs: "100%", sm: "45%", md: "15%" },
                maxWidth: { xs: "100%", sm: "45%", md: "15%" },
            }}>
                <TextField
                    id="typeFilter"
                    select
                    fullWidth
                    size="small"
                    label="Type Filter"
                    value={form.typeFilter || "filter"}
                    onChange={(e) => setField("typeFilter")(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <FilterListIcon />
                            </InputAdornment>
                        ),
                    }}
                >
                    <MenuItem value="filter" disabled>Select Type Filter</MenuItem>
                    <MenuItem value="Survey Completed">Survey Completed</MenuItem>
                    <MenuItem value="Data Entry Completed">Data Entry Completed </MenuItem>
                    <MenuItem value="QC Completed">QC Completed </MenuItem>
                    <MenuItem value="Notice Distributed">Noice Distributed</MenuItem>
                </TextField>
            </Grid>

            {/* Property Description */}
            <Grid sx={{
                flexBasis: { xs: "100%", sm: "45%", md: "20%" },
                maxWidth: { xs: "100%", sm: "45%", md: "20%" },
            }}>
                <TextField
                    id="description"
                    select
                    fullWidth
                    size="small"
                    label="Property Description"
                    value={form.description || "desc"}
                    onChange={(e) => setField("description")(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <DescriptionIcon />
                            </InputAdornment>
                        ),
                    }}
                >
                    <MenuItem value="desc" disabled>Select Property Description</MenuItem>
                    <MenuItem value="निवासी">निवासी</MenuItem>
                    <MenuItem value="अनिवासी">अनिवासी</MenuItem>
                </TextField>
            </Grid>
        </Grid>
    );
}

export default PropertySearchTextField;
