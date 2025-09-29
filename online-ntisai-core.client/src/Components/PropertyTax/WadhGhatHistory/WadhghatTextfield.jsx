
import React, { useState } from "react";
import {
    Grid,
    TextField,
    MenuItem,
    InputAdornment,
} from "@mui/material";

import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BadgeIcon from "@mui/icons-material/Badge";
import HomeIcon from "@mui/icons-material/Home";

import CustomButton from "../../../Helpers/ExtraProperties/CustomButtons";
import WadhghatSearchChips from "./WadhghatSearchChips";
import { ValidationProvider } from "../../../Contexts/ValidationContext"
// ? Reusable IconText Field
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
            startAdornment: (
                <InputAdornment position="start">{icon}</InputAdornment>
            ),
        }}
        InputLabelProps={{
            shrink: true,
            sx: { left: 0 },
        }}
        sx={{
            "& .MuiInputBase-root": { height: 40 },
            "& .MuiInputBase-input": { fontSize: 16 },
        }}
        inputProps={inputProps}
    />
);

export default function WadhghatTextfield({ exportCSV, onSearch, onReset, onChange }) {
    const [form, setForm] = useState({
        zone: "",
        ward: "",
        propertyNo: "",
        upicId: "",
    });

    const setField = (k) => (v) => {
        const next = { ...form, [k]: v };
        setForm(next);
        onChange?.(next);
    };

    const handleClear = (key) => {
        const next = { ...form, [key]: "" };
        setForm(next);
        onChange?.(next);
    };

    const handleReset = () => {
        const clearedForm = {
            zone: "",
            ward: "",
            propertyNo: "",
            upicId: "",
        };
        setForm(clearedForm);
        onChange?.(clearedForm);
        onReset?.();
    };

    return (
        <div className="bg-white rounded-2xl border border-slate-200 p-4 md:p-5 shadow-sm">
            <div className="flex flex-col">

                {/* Filter Fields */}
                <Grid
                    container
                    spacing={2}
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: 2
                    }}
                >
                    <Grid item>
                        <TextField
                            id="zone"
                            select
                            fullWidth
                            size="small"
                            label="Select Zone"
                            value={form.zone || "select zone"}
                            onChange={(e) => setField("zone")(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountBalanceIcon />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                "& .MuiInputBase-root": { height: 40 },
                                "& .MuiInputBase-input": { fontSize: 16 },
                            }}
                        >
                            <MenuItem value="select zone" disabled>Select Zone</MenuItem>
                            <MenuItem value="Kalwa">Kalwa</MenuItem>
                            <MenuItem value="Mumbra">Mumbra</MenuItem>
                            <MenuItem value="Diva">Diva</MenuItem> {/* ? New Zone */}
                        </TextField>
                    </Grid>

                    <Grid item>
                        <TextField
                            id="ward"
                            select
                            fullWidth
                            size="small"
                            label="Select Ward"
                            value={form.ward || "ward"}
                            onChange={(e) => setField("ward")(e.target.value)}
                            disabled={!form.zone}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LocationOnIcon />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                "& .MuiInputBase-root": { height: 40 },
                                "& .MuiInputBase-input": { fontSize: 16 },
                            }}
                        >
                            <MenuItem value="ward" disabled>Select Ward</MenuItem>
                            <MenuItem value="Kalwa1">Kalwa1</MenuItem>
                            <MenuItem value="Kalwa2">Kalwa2</MenuItem>
                            <MenuItem value="Mumbra1">Mumbra1</MenuItem>
                            <MenuItem value="Mumbra2">Mumbra2</MenuItem>
                        </TextField>
                    </Grid>

                    <Grid item>
                        <IconText
                            id="propertyNo"
                            label="Property No"
                            placeholder="e.g. KLW-2001"
                            icon={<HomeIcon />}
                            value={form.propertyNo}
                            onChange={setField("propertyNo")}
                        />
                    </Grid>

                    <Grid item>
                        <IconText
                            id="upicId"
                            label="UPIC ID"
                            placeholder="e.g. KLW2001"
                            icon={<BadgeIcon />}
                            value={form.upicId}
                            onChange={setField("upicId")}
                        />
                    </Grid>
                </Grid>

                {/* ? Search Chips */}
                <div className="flex flex-wrap ">
                    <WadhghatSearchChips values={form} onClear={handleClear} />
                </div>

                {/* ? Actions */}
                <ValidationProvider
                    rules={{
                        search: () =>
                            form.zone.trim() !== "" ||
                            form.ward.trim() !== "" ||
                            form.propertyNo.trim() !== "" ||
                            form.upicId.trim() !== "",
                        reset: () =>
                            form.zone !== "" ||
                            form.ward !== "" ||
                            form.propertyNo !== "" ||
                            form.upicId !== "",
                        export: () => true, // always allow export
                    }}
                >
                    <div className="flex flex-wrap items-center gap-2 mt-0">
                        <CustomButton type="search" onClick={() => onSearch?.(form)} className="w-44 sm:w-40" >
                            Search
                        </CustomButton>
                        <CustomButton type="reset" onClick={handleReset} className="w-44 sm:w-40" >
                            Reset
                        </CustomButton>
                        <CustomButton type="export" onClick={exportCSV} className="w-44 sm:w-40" >
                            Export CSV
                        </CustomButton>
                        <span className="ms-auto text-xs text-slate-500">
                            Filters active: {Object.values(form).filter(Boolean).length}
                        </span>
                    </div>
                </ValidationProvider>
            </div>
        </div>
    );
}

