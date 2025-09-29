// src/Components/PropertyTax/Master/CVMaster/ZoneMaster/ZoneTab/ZoneRecordsTable.jsx
import * as React from "react";
import { Grid, TextField, InputAdornment, Typography, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MasterCustomTable from "../../../../../../Helpers/ExtraProperties/MasterCustomTable";
import SourceOutlinedIcon from '@mui/icons-material/SourceOutlined';

const columns = [
    { key: "zoneNo", header: "ZONE NO", isPrimary: true },
    { key: "zoneType", header: "ZONE TYPE" },
    { key: "remark", header: "REMARK" },
];

export default function ZoneRecordsTable({ rows, onEdit, onDelete, editIndex }) {
    const [query, setQuery] = React.useState("");

    const filtered = React.useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return rows;
        return rows.filter((r) => {
            const zoneNo = (r.zoneNo || "").toString().toLowerCase();
            const zoneType = (r.zoneType || "").toString().toLowerCase();
            const remark = (r.remark || "").toString().toLowerCase();
            return zoneNo.includes(q) || zoneType.includes(q) || remark.includes(q);
        });
    }, [rows, query]);

    return (
        <Box mt={2}>
            <Grid container alignItems="center" justifyContent="space-between" sx={{ px: 1, pb: 1 }}>
                <Grid item sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>  <SourceOutlinedIcon className="text-blue-500" size={24} /> Records</Typography>
                </Grid>
                <Grid item xs="auto">
                    <TextField
                        label="Search"
                        size="small"
                        tooltip="Search by Zone No, Zone Type, Remark"
                        placeholder="Search by Zone No, Zone Type, Remark"
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
                pagination={true}
            />
        </Box>
    );
}
