

import React from "react";
import { Box, Chip } from "@mui/material";

// Mapping labels
const CHIP_LABEL = {
    zone: "Zone",
    ward: "Ward",
    propertyNo: "Property No",
    upicId: "UPIC ID",
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

// To avoid rendering empty or placeholder values
const SKIP = new Set(["", "all", "any"]);

// Get the label for select fields
function optLabelFor(key, value) {
    const list = SELECT_OPTIONS[key];
    if (!list) return value;
    const found = list.find((o) => String(o.value) === String(value));
    return found ? found.label : value;
}

// Chip renderer
export default function WadhghatSearchChips({ values = {}, onClear }) {
    return (
        <Box
            sx={{
                mt: 1,
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
                pb: 1,
            }}
        >
            {Object.keys(CHIP_LABEL).map((key) => {
                let val = values[key];
                if (!val || SKIP.has(String(val).trim().toLowerCase())) return null;

                // Convert select values to their labels
                if (key in SELECT_OPTIONS) {
                    val = optLabelFor(key, val);
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
    );
}
