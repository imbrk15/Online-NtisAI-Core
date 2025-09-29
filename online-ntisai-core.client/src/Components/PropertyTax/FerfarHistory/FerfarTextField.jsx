import React, { useEffect, useState } from "react";
import {
    Box,
    Grid,
    TextField,
    InputAdornment,
    MenuItem,
} from "@mui/material";
// MUI icons
import AccountBalanceIcon from "@mui/icons-material/AccountBalance"; // Zone
import LocationOnIcon from "@mui/icons-material/LocationOn"; // Ward
import BadgeIcon from "@mui/icons-material/Badge";
import HomeIcon from "@mui/icons-material/Home";
import CustomButton from "../../../Helpers/ExtraProperties/CustomButtons";
import { ValidationProvider } from "../../../Contexts/ValidationContext";
function TabPanel({ children, value, index, ...other }) {
    return (
        <div role="tabpanel" hidden={value !== index} {...other}>
            {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
        </div>
    );
}

const IconText = ({
    id,
    label,
    placeholder,
    icon,
    type = "text",
    value,
    onChange,
    inputProps,

}) => (
    <TextField
        id={id}
        label={label}
        placeholder={placeholder}
        fullWidth
        size="small"
        type={type}
        value={value ?? ""}
        onChange={(e) => onChange?.(e.target.value)}
        InputProps={{
            startAdornment: <InputAdornment position="start">{icon}</InputAdornment>,
        }}
        InputLabelProps={{
            shrink: true,
            sx: {
                //fontSize: 17,
                //fontWeight: 400,
                //transform: 'translate(6px, -10px) scale(1)', // ?? adjusted float position
                //transform: "translateY(-45%)",
                left: 0,
            },
        }}
        sx={{

            "& .MuiInputBase-root": { height: 40 },
            "& .MuiInputBase-input": { fontSize: 16 },
        }}
        inputProps={inputProps}
    />
);
function FerfarTextField({ values, onChange, children, exportCSV, onSearch, onReset }) {

    const initialForm = {
        zone: "",
        ward: "",
        propertyNo: "",
        upicId: "",
        beforeName: "",
        afterName: "",
    };
    const [form, setForm] = useState({ ...initialForm, ...(values || {}) });

    // sync internal state if parent updates values
    useEffect(() => {
        if (values) setForm((prev) => ({ ...prev, ...values }));
    }, [values]);

    const setField = (k) => (v) => {
        const next = { ...form, [k]: v };
        setForm(next);
        onChange?.(next);
    };
    // ?? Reset Handler
    const handleReset = () => {
        setForm(initialForm); // clear all fields
        onChange?.(initialForm); // inform parent
        onReset?.(); // call parent reset if needed
    };
    const wardOptions = {
        Kalwa: ["Kalwa1", "Kalwa2"],
        Mumbra: ["Mumbra1", "Mumbra2"],
        Diva: ["Diva1", "Diva2"],
        Wagle: ["Wagle1", "Wagle2"],
    };
    return (
        <>
            <ValidationProvider
                rules={{
                    search: () =>
                        form.zone.trim() !== "" ||
                        form.ward.trim() !== "" ||
                        form.propertyNo.trim() !== "" ||
                        form.upicId.trim() !== "" ||
                        form.beforeName.trim() !== "" ||
                        form.afterName.trim() !== "",
                    reset: () =>
                        form.zone.trim() !== "" ||
                        form.ward.trim() !== "" ||
                        form.propertyNo.trim() !== "" ||
                        form.upicId.trim() !== "" ||
                        form.beforeName.trim() !== "" ||
                        form.afterName.trim() !== "",
                    export: () => true, // ✅ allow always, can restrict later if needed
                }}
            >
                <TabPanel>
                    {/* First Row */}
                    <Grid container spacing={2}>
                        {/* Zone */}
                        <Grid sx={{
                            flexBasis: { xs: "100%", sm: "50%", md: "20%" },
                            maxWidth: { xs: "100%", sm: "50%", md: "20%" },
                        }}>
                            <TextField
                                id="zone"
                                select
                                fullWidth
                                size="small"
                                label="Select Zone"
                                value={form.zone || "1"}
                                onChange={(e) => setField("zone")(e.target.value)}
                                // stable field width
                                SelectProps={{
                                    MenuProps: {
                                        PaperProps: { style: { minWidth: 200 } },    // stable dropdown width
                                    },
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountBalanceIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            >
                                <MenuItem value="1" disabled>Select Zone</MenuItem>
                                <MenuItem value="Kalwa">Kalwa</MenuItem>
                                <MenuItem value="Mumbra">Mumbra</MenuItem>
                                <MenuItem value="Diva">Diva</MenuItem>
                                <MenuItem value="Wagle">Wagle</MenuItem>
                            </TextField>
                        </Grid>

                        {/* Ward */}
                        <Grid sx={{
                            flexBasis: { xs: "100%", sm: "50%", md: "20%" },
                            maxWidth: { xs: "100%", sm: "50%", md: "20%" },
                        }}>
                            <TextField
                                id="ward"
                                select
                                fullWidth
                                size="small"
                                label="Select Ward"
                                value={form.ward || "1"}
                                onChange={(e) => setField("ward")(e.target.value)}
                                disabled={!form.zone}

                                SelectProps={{
                                    MenuProps: {
                                        PaperProps: { style: { minWidth: 200 } },
                                    },
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LocationOnIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            >
                                <MenuItem value="1" disabled>Select ward</MenuItem>
                                {(wardOptions[form.zone] || []).map((ward) => (
                                    <MenuItem key={ward} value={ward}>{ward}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        {/* Property No */}
                        <Grid sx={{
                            flexBasis: { xs: "100%", sm: "50%", md: "20%" },
                            maxWidth: { xs: "100%", sm: "50%", md: "20%" },
                        }}>
                            <IconText
                                id="propertyNoInput"
                                label="Property No"
                                placeholder="Enter Property No"
                                icon={<HomeIcon />}
                                value={form.propertyNo}
                                onChange={setField("propertyNo")}
                            />
                        </Grid>

                        {/* UPIC ID */}
                        <Grid sx={{
                            flexBasis: { xs: "100%", sm: "50%", md: "20%" },
                            maxWidth: { xs: "100%", sm: "50%", md: "20%" },
                        }}>
                            <IconText
                                id="upicIdInput"
                                label="UPIC ID"
                                placeholder="Enter UPIC ID"
                                icon={<BadgeIcon />}
                                value={form.upicId}
                                onChange={setField("upicId")}
                            />
                        </Grid>
                    </Grid>

                    {/* Second Row (40% each on large screens) */}
                    <Grid
                        container
                        spacing={2}
                        sx={{
                            mt: 2,
                            // default container is display:flex so the item sx below will work
                        }}
                    >
                        <Grid
                            item
                            // use flexBasis + maxWidth to force ~40% on md+, 50% on sm, 100% on xs
                            sx={{
                                flexBasis: { xs: "100%", sm: "50%", md: "20%" },
                                maxWidth: { xs: "100%", sm: "50%", md: "20%" },
                            }}
                        >
                            <IconText
                                id="beforeName"
                                label="Before Owner Name"
                                placeholder="Enter Before Owner Name"
                                icon={<BadgeIcon />}
                                value={form.beforeName}
                                onChange={setField("beforeName")}
                            />
                        </Grid>

                        <Grid
                            item
                            sx={{
                                flexBasis: { xs: "100%", sm: "50%", md: "20%" },
                                maxWidth: { xs: "100%", sm: "50%", md: "20%" },
                            }}
                        >
                            <IconText
                                id="afterName"
                                label="After Owner Name"
                                placeholder="Enter After Owner Name"
                                icon={<BadgeIcon />}
                                value={form.afterName}
                                onChange={setField("afterName")}
                            />
                        </Grid>
                    </Grid>
                </TabPanel>

                {children && (
                    <Box sx={{ mt: 2 }}>
                        {children}
                    </Box>
                )}
                {/* Actions */}
                <Box sx={{ mt: { xs: 2, md: 3 } }} >
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12} sm="auto" style={{ width: "150px" }}>
                            <CustomButton fullWidth type="search" onClick={onSearch}>Search</CustomButton>
                        </Grid>
                        <Grid item xs={12} sm="auto" style={{ width: "150px" }}>
                            <CustomButton fullWidth type="reset" onClick={handleReset}>Reset</CustomButton>
                        </Grid>
                        <Grid item xs={12} sm="auto" style={{ width: "150px" }}>
                            <CustomButton fullWidth type="export" onClick={exportCSV}>Export CSV</CustomButton>
                        </Grid>
                    </Grid>
                </Box>

            </ValidationProvider>
        </>
    )
}
export default FerfarTextField;