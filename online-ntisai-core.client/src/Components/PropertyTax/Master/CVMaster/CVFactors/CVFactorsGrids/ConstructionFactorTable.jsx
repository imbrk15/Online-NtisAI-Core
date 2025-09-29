// src/Components/PropertyTax/ConstructionFactorTable.js
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
 * @param {Array}  rows      - Array of rows, each should include a hidden `_index` from the parent
 * @param {Func}   onEdit    - Called with the full row (including `_index`)
 * @param {Func}   onDelete  - Called with the master index `_index`
 */
export default function ConstructionFactorTable({ rows = [], onEdit, onDelete }) {
    return (
        <Paper className="mt-6 overflow-x-auto" style={{ width: "80%" }}>
            <Table size="small">
                <TableHead sx={{ backgroundColor: "#f1f5f9" }}>
                    <TableRow>
                        <TableCell>Construction Type</TableCell>
                        <TableCell>Factor</TableCell>
                        <TableCell>Effective From</TableCell>
                        <TableCell>Effective To</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row._index}>
                            <TableCell>{row.constId ?? row.constType ?? "-"}</TableCell>
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
                            <TableCell colSpan={5} align="center">
                                No records found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Paper>
    );
}
