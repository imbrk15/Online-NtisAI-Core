import React from "react";
import {
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from "@mui/material";

function CustomTable({ columns, rows, onRowClick }) {
    return (
        <TableContainer
            component={Paper}
            elevation={1}
            sx={{
                maxHeight: 510,
                overflowY: "auto",
                borderRadius: "10px", // <-- custom border radius
            }}
        >
            <Table stickyHeader size="small" aria-label="custom table">
                {/* Table Header */}
                <TableHead>
                    <TableRow>
                        {columns.map((c) => (
                            <TableCell
                                key={c.key}
                                sx={{
                                    fontWeight: 700,
                                    backgroundColor: "#f1f1f1", // header background
                                    color: "#333", // header text color
                                }}
                            >
                                {c.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>

                {/* Table Body */}
                <TableBody>
                    {rows.length > 0 ? (
                        rows.map((row, idx) => (
                            <TableRow
                                key={idx}
                                hover
                                sx={{ cursor: onRowClick ? "pointer" : "default" }}
                                onClick={() => onRowClick?.(row)}
                            >
                                {columns.map((c) => (
                                    <TableCell key={c.key}>{row[c.key] ?? ""}</TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} align="center">
                                No records found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default CustomTable;
