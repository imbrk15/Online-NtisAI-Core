import React from "react";
import { Box, Chip } from "@mui/material";

const CHIP_LABEL = {
    // top selects
    zone: "Zone",
    ward: "Ward",
    description: "Property Description",
    propertyType: "Property Type",
    typeFilter: "Type Filter",

    // quick tab (text)
    upicId: "UPIC",
    propertyNo: "Property No",
    oldPropertyNo: "Old Property No",
    citySurvey: "City Survey",
    mobile: "Mobile",

    // location tab (text)
    plotNo: "Plot No",
    wingFlat: "Wing/Flat",
    societyName: "Society",
    shopBuildingName: "Shop/Building",
    address: "Address",

    // people tab (text)
    occupierName: "Occupier",
    renterName: "Renter",

    // values & dues (composite / select)
    rateable: "Rateable Value",
    capital: "Capital Value",
    taxDefaulter: "Tax Defaulter",
};

const SELECT_OPTIONS = {
    zone: [
        { value: "", label: "Select Zone", disabled: true },
        { value: "Kalwa", label: "Kalwa" },
        { value: "Mumbra", label: "Mumbra" },
    ],
    ward: [
        { value: "", label: "Select Ward", disabled: true },
        { value: "Kalwa1", label: "Kalwa1" },
        { value: "Kalwa2", label: "Kalwa2" },
        { value: "Mumbra1", label: "Mumbra1" },
        { value: "Mumbra2", label: "Mumbra2" },
    ],
};

const SKIP = new Set(["", "all", "any"]);

// helpers
function optLabelFor(key, value) {
    const list = SELECT_OPTIONS[key];
    if (!list) return value;
    const found = list.find((o) => String(o.value) === String(value));
    return found ? found.label : value;
}

function formatRange(op, a, b) {
    if (!op) return "";
    if (op === "between") return a && b ? `Between ${a} and ${b}` : "";
    if (op === "gt") return a ? `More Than ${a}` : "";
    if (op === "lt") return a ? `Less Than ${a}` : "";
    return "";
}

function derive(values = {}) {
    const out = { ...values };

    // composite strings
    const rateable = formatRange(
        values.rateableOp,
        values.rateableA,
        values.rateableB
    );
    if (rateable) out.rateable = rateable;
    else delete out.rateable;

    const capital = formatRange(
        values.capitalOp,
        values.capitalA,
        values.capitalB
    );
    if (capital) out.capital = capital;
    else delete out.capital;

    // hide empty / "all" / "any"
    for (const k of Object.keys(out)) {
        const raw = String(out[k] ?? "")
            .trim()
            .toLowerCase();
        if (SKIP.has(raw)) delete out[k];
    }
    return out;
}
function FerfarSearchChips({ values, onClear }) {
    const flat = derive(values);
    return (
        <Box
            sx={{
                mt: 2,
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
                pb: 2,
            }}
        >
            {Object.keys(CHIP_LABEL).map((key) => {
                let val = flat[key];
                if (!val) return null;

                // map value to label for select-based keys
                if (key in SELECT_OPTIONS) {
                    val = optLabelFor(key, values[key]);
                    if (!val || SKIP.has(String(values[key] ?? "").toLowerCase()))
                        return null;
                }

                return (
                    <Chip
                        key={key}
                        label={`${CHIP_LABEL[key]}: ${val}`}
                        onDelete={() => onClear?.(key)}
                        variant="outlined"
                        sx={{
                            borderRadius: "999px",
                            fontWeight: 600,
                        }}
                    />
                );
            })}
        </Box>
    )
}

export default FerfarSearchChips;