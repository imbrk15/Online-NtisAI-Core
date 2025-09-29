// src/Components/PropertyTax/CVFactors/DepreciationFactorTable.js
import React from "react";
import {
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

/**
 * @param {Array} rows - Each row should include `_index` from the parent.
 *                       Fields: id, constType, minYear, maxYear, rate, year,
 *                               factor, effFrom, effTo
 * @param {Function} onEdit   - Called with the full row (including `_index`)
 * @param {Function} onDelete - Called with the master index `_index`
 */
export default function DepreciationFactorTable({ rows = [], onEdit, onDelete }) {
    return (
        <Paper className="mt-6 overflow-x-auto" style={{ width: "80%" }}>
            <Table size="small">
                <TableHead sx={{ backgroundColor: "#f1f5f9" }}>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Construction Type</TableCell>
                        <TableCell>Min Year</TableCell>
                        <TableCell>Max Year</TableCell>
                        <TableCell>Rate (%)</TableCell>
                        <TableCell>Year</TableCell>
                        <TableCell>Factor</TableCell>
                        <TableCell>Effective From</TableCell>
                        <TableCell>Effective To</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row._index}>
                            <TableCell>{row.id}</TableCell>
                            <TableCell>{row.constType}</TableCell>
                            <TableCell>{row.minYear}</TableCell>
                            <TableCell>{row.maxYear}</TableCell>
                            <TableCell>{row.rate}</TableCell>
                            <TableCell>{row.year}</TableCell>
                            <TableCell>{row.factor}</TableCell>
                            <TableCell>{row.effFrom}</TableCell>
                            <TableCell>{row.effTo}</TableCell>
                            <TableCell>
                                <IconButton
                                    onClick={() => onEdit && onEdit(row)}
                                    color="primary"
                                    title="Edit"
                                >
                                    <Edit />
                                </IconButton>
                                <IconButton
                                    onClick={() => onDelete && onDelete(row._index)}
                                    color="error"
                                    title="Delete"
                                >
                                    <Delete />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}

                    {rows.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={10} align="center">
                                No records found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Paper>
    );
}
