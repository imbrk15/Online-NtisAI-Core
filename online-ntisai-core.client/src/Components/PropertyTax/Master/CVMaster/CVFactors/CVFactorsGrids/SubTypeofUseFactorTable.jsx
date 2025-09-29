// src/Components/PropertyTax/SubTypeofUseFactorTable.js
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
 * @param {Array} rows - Each row should include a hidden `_index` from the parent.
 *                       Expected fields:
 *                       subTypeDesc, appliesTo, keySeq, shortcut, factor, effFrom, effTo
 * @param {Function} onEdit   - Called with the full row (including `_index`)
 * @param {Function} onDelete - Called with the master index `_index`
 */
export default function SubTypeofUseFactorTable({ rows = [], onEdit, onDelete }) {
    return (
        <Paper className="mt-6 overflow-x-auto" style={{ width: "80%" }}>
            <Table size="small">
                <TableHead sx={{ backgroundColor: "#f1f5f9" }}>
                    <TableRow>
                        <TableCell>Sub Type Of Use</TableCell>
                        <TableCell>Applies To</TableCell>
                        <TableCell>Keywise Sequence</TableCell>
                        <TableCell>Shortcut</TableCell>
                        <TableCell>Factor</TableCell>
                        <TableCell>Effective From</TableCell>
                        <TableCell>Effective To</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row._index}>
                            <TableCell>{row.subTypeDesc}</TableCell>
                            <TableCell>
                                {Array.isArray(row.appliesTo) ? row.appliesTo.join(", ") : row.appliesTo}
                            </TableCell>
                            <TableCell>{row.keySeq}</TableCell>
                            <TableCell>{row.shortcut}</TableCell>
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
                            <TableCell colSpan={8} align="center">
                                No records found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Paper>
    );
}
