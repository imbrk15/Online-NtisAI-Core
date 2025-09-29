import React, { useState } from "react";
import {
    Grid,
    TextField,
    MenuItem,
    InputAdornment,
    Checkbox,
    FormGroup,
    Box
} from "@mui/material";
import PercentIcon from "@mui/icons-material/Percent";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CustomButton from "../../../../../../Helpers/ExtraProperties/CustomButtons";
import MasterCustomTable from "../../../../../../Helpers/ExtraProperties/MasterCustomTable";
import { ValidationProvider } from "../../../../../../Contexts/ValidationContext";

/* ---------- Helper ---------- */
const numberFmt = (v) => Number(v).toLocaleString("en-IN");

/* ---------- Base table rows ---------- */
const TABLE_ROWS = [
    { id: 1, useCode: "RES", description: "Residential", type: "Standard", general: "Residential", vSwachhta: 100, mSwachhta: 150, jalLaabh: 200, agnishaman: 50, visheshShikshan: 75, paniPatti: 300 },
    { id: 2, useCode: "COM", description: "Commercial", type: "Business", general: "Commercial", vSwachhta: 200, mSwachhta: 300, jalLaabh: 400, agnishaman: 100, visheshShikshan: 150, paniPatti: 600 },
    { id: 3, useCode: "IND", description: "Industrial", type: "Manufacturing", general: "Industrial", vSwachhta: 300, mSwachhta: 450, jalLaabh: 600, agnishaman: 150, visheshShikshan: 225, paniPatti: 900 },
    { id: 4, useCode: "EDU", description: "Educational", type: "Institutional", general: "Educational", vSwachhta: 50, mSwachhta: 75, jalLaabh: 100, agnishaman: 25, visheshShikshan: 0, paniPatti: 150 },
    { id: 5, useCode: "REL", description: "Religious", type: "Exempt", general: "Religious", vSwachhta: 0, mSwachhta: 0, jalLaabh: 0, agnishaman: 0, visheshShikshan: 0, paniPatti: 0 },
    { id: 6, useCode: "GOV", description: "Government", type: "Public", general: "Government", vSwachhta: 150, mSwachhta: 225, jalLaabh: 300, agnishaman: 75, visheshShikshan: 112, paniPatti: 450 },
    { id: 7, useCode: "HOS", description: "Hospital", type: "Healthcare", general: "Hospital", vSwachhta: 125, mSwachhta: 200, jalLaabh: 250, agnishaman: 60, visheshShikshan: 90, paniPatti: 350 },
];

/* ---------- Tax options ---------- */
const TAX_NAME_OPTIONS = [
    "वि. स्वच्छता कर रु.",
    "म. स्वच्छता कर रु.",
    "जल लाभ कर रु.",
    "अग्निशमन कर रु.",
    "विशेष शिक्षकर.",
    "पाणीपट्टी",
];

/* ---------- Mapping tax name -> column key ---------- */
const taxKeyMap = {
    "वि. स्वच्छता कर रु.": "vSwachhta",
    "म. स्वच्छता कर रु.": "mSwachhta",
    "जल लाभ कर रु.": "jalLaabh",
    "अग्निशमन कर रु.": "agnishaman",
    "विशेष शिक्षकर.": "visheshShikshan",
    "पाणीपट्टी": "paniPatti",
};

export default function TaxMasterForRVContent() {
    const [rows, setRows] = useState(TABLE_ROWS);
    const [lastUpdated, setLastUpdated] = useState(null); // {rowId, colKey}

    // Single Tax Update form states
    const [singleTaxName, setSingleTaxName] = useState("");
    const [singleTaxPct, setSingleTaxPct] = useState("");
    const [applyTo, setApplyTo] = useState({ R: false, I: false, C: false, N: false });

    const handleUpdateData = () => {
        console.log("Update Data clicked");
    };

    /* ---------- Single Tax Update ---------- */
    const handleSingleTaxUpdate = () => {
        const targets = Object.keys(applyTo).filter((k) => applyTo[k]);
        if (!singleTaxName || !singleTaxPct || targets.length === 0) return;

        const colKey = taxKeyMap[singleTaxName];

        setRows((prev) =>
            prev.map((row) => {
                // Match type of use to apply
                const match =
                    (applyTo.R && row.useCode === "RES") ||
                    (applyTo.C && row.useCode === "COM") ||
                    (applyTo.I && row.useCode === "IND") ||
                    (applyTo.N && row.useCode === "EDU");

                if (match) {
                    setLastUpdated({ rowId: row.id, colKey });
                    return { ...row, [colKey]: Number(singleTaxPct) };
                }
                return row;
            })
        );

        // Reset fields after update
        setSingleTaxName("");
        setSingleTaxPct("");
        setApplyTo({ R: false, I: false, C: false, N: false });

        // Auto clear highlight after 2s
        setTimeout(() => setLastUpdated(null), 2000);
    };

    /* ---------- Columns with highlight support ---------- */
    const columns = [
        { key: "useCode", header: "TYPE OF USE", isPrimary: true },
        { key: "description", header: "DESCRIPTION" },
        { key: "type", header: "TYPE" },
        { key: "general", header: "GENERAL" },
        ...Object.entries(taxKeyMap).map(([taxLabel, key]) => ({
            key,
            header: taxLabel,
            align: "right",
            render: (val, row) => (
                <div
                    style={{
                        padding: "2px 6px",
                        borderRadius: "4px",
                        ...(lastUpdated &&
                            lastUpdated.rowId === row.id &&
                            lastUpdated.colKey === key
                            ? {
                                boxShadow: "0 0 8px 2px rgba(59,130,246,0.6)",
                                border: "1px solid rgba(59,130,246,0.8)",
                            }
                            : {}),
                    }}
                >
                    {numberFmt(val)}
                </div>
            ),
        })),
    ];

    return (
        <div className="p-0 pt-0">
            {/* Table Section */}
            <MasterCustomTable columns={columns} data={rows} pagination={false} />

            {/* Update Data button */}
            <Box sx={{ mt: { xs: 2, md: 3 } }} >
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12} sm="auto">
                        <CustomButton type="save" onClick={handleUpdateData} className="!px-4">
                            Update Data
                        </CustomButton>
                    </Grid>
                </Grid>
            </Box>

            {/* Single Tax Update */}
            <div className="mt-3 rounded-xl border border-slate-200 bg-white p-2 ">
                <div className="mb-3 text-base font-semibold text-slate-800">Single Tax Update</div>

                <Grid container spacing={2} sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                    {/* Tax Name */}
                    <Grid
                        item
                        sx={{
                            flexBasis: { xs: "100%", sm: "30%", md: "20%" },
                            maxWidth: { xs: "100%", sm: "30%", md: "20%" },
                        }}
                    >
                        <TextField
                            select
                            fullWidth
                            size="small"
                            label="Tax Name"
                            value={singleTaxName || "Tax Name"}
                            onChange={(e) => setSingleTaxName(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountBalanceIcon sx={{ color: "#757575" }} />
                                    </InputAdornment>
                                ),
                            }}
                        >
                            <MenuItem value="Tax Name" disabled>
                                Select Tax
                            </MenuItem>
                            {TAX_NAME_OPTIONS.map((opt) => (
                                <MenuItem key={opt} value={opt}>
                                    {opt}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    {/* Tax Value */}
                    <Grid
                        item
                        sx={{
                            flexBasis: { xs: "100%", sm: "30%", md: "20%" },
                            maxWidth: { xs: "100%", sm: "30%", md: "20%" },
                        }}
                    >
                        <TextField
                            fullWidth
                            size="small"
                            type="number"
                            label="Tax Value"
                            placeholder="Enter Value"
                            value={singleTaxPct}
                            onChange={(e) => setSingleTaxPct(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PercentIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>

                    {/* Apply To */}
                    <Grid
                        item
                        sx={{
                            flexBasis: { xs: "100%", sm: "30%", md: "20%" },
                            maxWidth: { xs: "100%", sm: "30%", md: "20%" },
                        }}
                    >
                        <div className="text-sm text-slate-700">Apply to</div>
                        <FormGroup row sx={{ gap: 2 }}>
                            {["R", "I", "C", "N"].map((k) => (
                                <label key={k} className="inline-flex items-center gap-0 text-sm text-slate-700">
                                    <Checkbox
                                        size="small"
                                        checked={applyTo[k]}
                                        onChange={(e) => setApplyTo((prev) => ({ ...prev, [k]: e.target.checked }))}
                                    />
                                    {k}
                                </label>
                            ))}
                        </FormGroup>
                    </Grid>

                    {/* Update Button with Validation */}
                    <Grid
                        item
                        sx={{
                            flexBasis: { xs: "100%", sm: "30%", md: "20%" },
                            maxWidth: { xs: "100%", sm: "30%", md: "20%" },
                        }}
                        className="flex justify-center"
                    >
                        <ValidationProvider
                            rules={{
                                add: () => singleTaxName && singleTaxPct && Object.values(applyTo).some((v) => v),
                                updated: () => singleTaxName && singleTaxPct && Object.values(applyTo).some((v) => v),
                            }}
                        >
                            <CustomButton type="add" onClick={handleSingleTaxUpdate} sx={{maxHeight: 38} }>
                                Single Tax Update
                            </CustomButton>
                        </ValidationProvider>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}
