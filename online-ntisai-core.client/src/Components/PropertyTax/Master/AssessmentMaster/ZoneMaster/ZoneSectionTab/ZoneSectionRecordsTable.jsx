// src/Components/PropertyTax/Master/CVMaster/ZoneMaster/ZoneSectionTab/ZoneSectionRecordsTable.jsx
import * as React from "react";
import { Grid, TextField, InputAdornment, Typography, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MasterCustomTable from "../../../../../../Helpers/ExtraProperties/MasterCustomTable";
import SourceOutlinedIcon from '@mui/icons-material/SourceOutlined';

const columns = [
    { key: "sectionNo", header: "SECTION NO", isPrimary: true },
    { key: "zoneNo", header: "ZONE NO" },
    { key: "remark", header: "REMARK" },
];

export default function ZoneSectionRecordsTable({ rows, onEdit, onDelete, editIndex }) {
    const [query, setQuery] = React.useState("");

    const filtered = React.useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return rows;
        return rows.filter(
            (r) =>
                r.sectionNo.toLowerCase().includes(q) ||
                r.zoneNo.toLowerCase().includes(q) ||
                (r.remark || "").toLowerCase().includes(q)
        );
    }, [rows, query]);

    return (
        <Box mt={2}>
            <Grid container alignItems="center" justifyContent="space-  between" sx={{ px: 1, pb: 1 }}>
                <Grid item sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}> <SourceOutlinedIcon className="text-blue-500" size={24} /> Records</Typography>

                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="Search"
                        size="small"
                        placeholder="Search by Section No, Zone No, Remark"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ color: "#9ca3af" }} />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
            </Grid>

            <MasterCustomTable
                columns={columns}
                data={filtered}
                onEdit={onEdit}
                onDelete={onDelete}
                onRowClick={onEdit}
                editIndex={editIndex}
                pagination={false}
            />
        </Box>
    );
}
