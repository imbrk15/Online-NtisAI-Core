// src/components/PropertyTax/CVFactorsGrids/FloorFactorTable.jsx
import React from "react";
import {
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
    TableContainer,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

/**
 * @param {Array}  rows           - rows filtered for "floor", each must include `_index` (master index)
 * @param {Func}   onEdit         - called with the row to edit (prefill form)
 * @param {Func}   onDelete       - called with row._index to delete in parent
 * @param {number|null} selectedIndex - master index of the row currently being edited (for highlight)
 * @param {Func}   onSelectRow    - called when a row is clicked; receive the full row
 */
export default function FloorFactorTable({
    rows = [],
    onEdit,
    onDelete,
    selectedIndex = null,
    onSelectRow,
}) {
    return (
        <TableContainer component={Paper} className="mt-6 overflow-x-auto" style={{ width: "80%" }}>
            <Table size="small" stickyHeader>
                <TableHead sx={{ backgroundColor: "#f1f5f9" }}>
                    <TableRow>
                        <TableCell>Floor ID</TableCell>
                        <TableCell>Factor</TableCell>
                        <TableCell>Effective From</TableCell>
                        <TableCell>Effective To</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {rows.map((row, i) => {
                        const isEditing = selectedIndex === row._index;
                        const isEven = i % 2 === 1;

                        return (
                            <TableRow
                                key={row._index}
                                hover
                                onClick={() => {
                                    // Row click selects + lets parent prefill the form if desired
                                    onSelectRow && onSelectRow(row);
                                }}
                                selected={isEditing}
                                sx={(theme) => ({
                                    backgroundColor: isEditing
                                        ? theme.palette.action.selected
                                        : isEven
                                            ? "#fafafa"
                                            : "#fff",
                                    transition: "background-color 150ms ease",
                                    "&:hover": {
                                        backgroundColor: theme.palette.action.hover,
                                        cursor: "pointer",
                                    },
                                    "&.Mui-selected, &.Mui-selected:hover": {
                                        backgroundColor: theme.palette.action.selected,
                                        boxShadow: `inset 0 0 0 2px ${theme.palette.primary.main}`,
                                    },
                                })}
                            >
                                <TableCell
                                    size="small"
                                    sx={(theme) =>
                                        isEditing
                                            ? {
                                                borderLeft: `6px solid ${theme.palette.primary.main}`,
                                                fontWeight: 600,
                                                pl: 2,
                                            }
                                            : { pl: 2 }
                                    }
                                >
                                    {row.floorId}
                                </TableCell>

                                <TableCell size="small">{row.factor}</TableCell>
                                <TableCell size="small">{row.effFrom}</TableCell>
                                <TableCell size="small">{row.effTo}</TableCell>

                                <TableCell size="small">
                                    <IconButton
                                        color="primary"
                                        size="small"
                                        title="Edit"
                                        onClick={(e) => {
                                            e.stopPropagation(); // don't trigger row click
                                            onEdit && onEdit(row);
                                        }}
                                    >
                                        <Edit fontSize="small" />
                                    </IconButton>

                                    <IconButton
                                        color="error"
                                        size="small"
                                        title="Delete"
                                        onClick={(e) => {
                                            e.stopPropagation(); // don't trigger row click
                                            onDelete && onDelete(row._index);
                                        }}
                                    >
                                        <Delete fontSize="small" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        );
                    })}

                    {rows.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={5} align="center">
                                No records found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
