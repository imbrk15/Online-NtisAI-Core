// src/Components/AssessmentMaster/RateMasterCustomTable.jsx
import React, { useState } from "react";
import {
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableContainer,
    TextField,
} from "@mui/material";

export default function RateMasterCustomTable({ columns, data, onDataChange }) {
    const [rows, setRows] = useState(data);

    const handleCellChange = (rowIndex, key, value) => {
        const updatedRows = [...rows];
        updatedRows[rowIndex][key] = value;
        setRows(updatedRows);
        if (onDataChange) onDataChange(updatedRows);
    };

    return (
        <TableContainer
            component={Paper}
            elevation={0}
            sx={{
                borderRadius: 3,
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            }}
        >
            <Table size="small" aria-label="rate master table">
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell key={column.key} className="font-bold">
                                {column.header}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {rows.map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                            {columns.map((column, colIndex) => (
                                <TableCell key={colIndex}>
                                    {/* First column = static (not editable) */}
                                    {colIndex === 0 ? (
                                        <span
                                            style={{
                                                fontWeight: 600,
                                                color: "#111827",
                                            }}
                                        >
                                            {row[column.key]}
                                        </span>
                                    ) : (
                                        <TextField
                                            variant="outlined"
                                            size="small"
                                            value={row[column.key]}
                                            onChange={(e) =>
                                                handleCellChange(rowIndex, column.key, e.target.value)
                                            }
                                            inputProps={{
                                                style: {
                                                    fontSize: 14,
                                                    textAlign: "center",
                                                    padding: "4px 6px",
                                                },
                                            }}
                                            sx={{ width: 80 }}
                                        />
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
