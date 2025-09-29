import React, { useState } from "react";
import {
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableContainer,
    IconButton,
    TextField,
    Button,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import { useToast } from "../../Contexts/ToastContext"
export default function MasterCustomTable({
    columns,
    data,
    onEdit,
    onDelete,
    onRowClick,
    editIndex,
    pagination = true,
    hoverEffect = true,
    stripedRows = true,
}) {
    const { showToast } = useToast();
    // Pagination state
    const [page, setPage] = useState(0);
    const [rowsPerPage] = useState(5);

    const totalPages = Math.ceil(data.length / rowsPerPage);

    const handleChangePage = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setPage(newPage);
        }
    };

    const displayedData = pagination
        ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : data;

    // Generate page numbers with ellipsis
    const getPageNumbers = () => {
        let pages = [];
        const totalNumbers = 3; // how many continuous page numbers to show
        const totalBlocks = totalNumbers + 2; // including first and last

        if (totalPages <= totalBlocks) {
            // Case 1: Small number of pages -> show all
            for (let i = 0; i < totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Case 2: Larger number of pages
            let startPage = Math.max(1, page - 1);
            let endPage = Math.min(totalPages - 2, page + 1);

            // Adjust if near the start
            if (page <= 1) {
                startPage = 1;
                endPage = 3;
            }

            // Adjust if near the end
            if (page >= totalPages - 2) {
                startPage = totalPages - 4;
                endPage = totalPages - 2;
            }

            pages.push(0);

            if (startPage > 1) {
                pages.push("...");
            }

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }

            if (endPage < totalPages - 2) {
                pages.push("..."); 
            }

            pages.push(totalPages - 1); 
        }

        return pages;
    };


    return (
        <>
            <TableContainer
                component={Paper}
                elevation={0}
                sx={{
                    borderRadius: 3,
                    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                    overflowX: "auto",
                    scrollbarWidth: "thin",
                    scrollbarColor: "#9e9e9e #f0f0f0",
                }}
            >
                <Table size="small" aria-label="master table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.key}
                                    align={column.align || "left"}
                                    className="font-bold"
                                >
                                    {column.header}
                                </TableCell>
                            ))}
                            {(onEdit || onDelete) && (
                                <TableCell className="font-bold" align="left">
                                    ACTIONS
                                </TableCell>
                            )}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {displayedData.map((row, index) => {
                            const globalIndex = pagination ? page * rowsPerPage + index : index;
                            const isEditing = editIndex === globalIndex;
                            const isEven = stripedRows && index % 2 === 1;

                            return (
                                <TableRow
                                    key={row.id || globalIndex}
                                    hover={hoverEffect}
                                    onClick={() => onRowClick && onRowClick(globalIndex, row)}
                                    sx={(theme) => ({
                                        backgroundColor: isEditing
                                            ? theme.palette.action.selected
                                            : isEven
                                                ? "#fafafa"
                                                : "#fff",
                                        transition: "background-color 150ms ease",
                                        "&:hover": hoverEffect ? {
                                            backgroundColor: theme.palette.action.hover,
                                            cursor: "pointer",
                                        } : {},
                                        ...(isEditing && {
                                            boxShadow: `inset 0 0 0 2px ${theme.palette.primary.main}`,
                                        }),
                                        "&.Mui-selected, &.Mui-selected:hover": {
                                            backgroundColor: theme.palette.action.selected,
                                            boxShadow: `inset 0 0 0 2px ${theme.palette.primary.main}`,
                                        },
                                    })}
                                >
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.key}
                                            align={column.align || "left"}
                                            sx={(theme) =>
                                                isEditing && column.isPrimary
                                                    ? {
                                                        borderLeft: `6px solid ${theme.palette.primary.main}`,
                                                        fontWeight: 600,
                                                        pl: 2,
                                                    }
                                                    : { pl: 2 }
                                            }
                                        >
                                            {column.render
                                                ? column.render(row[column.key], row)
                                                : row[column.key]
                                            }
                                        </TableCell>
                                    ))}

                                    {(onEdit || onDelete) && (
                                        <TableCell align="left">
                                            {onEdit && (
                                                <IconButton
                                                    color="primary"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        if (!row) {
                                                            showToast("Nothing selected to edit!", "warning");
                                                            return;
                                                        }
                                                        onEdit(globalIndex, row);
                                                        showToast("Row selected for editing!", "info");
                                                    }}
                                                >
                                                    <Edit />
                                                </IconButton>
                                            )}
                                            {onDelete && (
                                                <IconButton
                                                    color="error"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        if (!row) {
                                                            showToast("No item selected to delete!", "error");
                                                            return;
                                                        }
                                                        onDelete(globalIndex, row);
                                                        showToast("Row deleted successfully!", "error");
                                                    }}
                                                >
                                                    <Delete />
                                                </IconButton>
                                            )}
                                        </TableCell>
                                    )}
                                </TableRow>
                            );
                        })}

                        {data.length === 0 && (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length + ((onEdit || onDelete) ? 1 : 0)}
                                    align="center"
                                    className="text-slate-500"
                                >
                                    No data
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>


            </TableContainer>
            {pagination && totalPages > 1 && (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "end",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "12px",
                        padding: "12px 16px",
                    }}
                >
                    {/* Pagination numbers */}
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <button
                            onClick={() => handleChangePage(page - 1)}
                            disabled={page === 0}
                            style={{
                                border: "none",
                                background: "transparent",
                                cursor: page === 0 ? "not-allowed" : "pointer",
                                fontSize: "18px",
                                fontWeight: "bold",
                                color: page === 0 ? "#ccc" : "#333",
                                padding: "6px 10px",
                            }}
                        >
                            {<ArrowCircleLeftOutlinedIcon
                                style={{
                                    fontSize: window.innerWidth < 600 ? "28px" : "40px",
                                    fill: page === 0 ? "#ccc" : "url(#gradient)",
                                }} />}
                        </button>

                        {getPageNumbers().map((p, idx) =>
                            p === "..." ? (
                                <span key={idx}>...</span>
                            ) : (
                                <button
                                    key={p}
                                    onClick={() => handleChangePage(p)}
                                    style={{
                                        width: "30px",
                                        height: "30px",
                                        borderRadius: "6px",
                                        border: "none",
                                        background:
                                            p === page
                                                ? "linear-gradient(135deg,#4a90e2,#7b61ff)"
                                                : "transparent",
                                        color: p === page ? "white" : "black",
                                        cursor: "pointer",
                                        fontWeight: p === page ? "600" : "400",
                                        transform: "rotate(45deg)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        margin: "0 4px",
                                    }}
                                >
                                    <span style={{ transform: "rotate(-45deg)" }}>{p + 1}</span>
                                </button>
                            )
                        )}

                        <button
                            onClick={() => handleChangePage(page + 1)}
                            disabled={page === totalPages - 1}
                            style={{
                                border: "none",
                                background: "transparent",
                                cursor: page === totalPages - 1 ? "not-allowed" : "pointer",
                                fontSize: "18px",
                                fontWeight: "bold",
                                color: page === totalPages - 1 ? "#ccc" : "#333", 
                                padding: "6px 10px",
                            }}
                        >
                            {<ArrowCircleRightOutlinedIcon
                                style={{
                                    fontSize: "40px",
                                    fill: page === totalPages - 1 ? "#ccc" : "url(#gradient)",
                                }}
                            />}
                        </button>
                        <svg width="0" height="0">
                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#4a90e2" />
                                    <stop offset="100%" stopColor="#7b61ff" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>

                    {/* Go to page */}
                    {/*<div style={{*/}
                    {/*    display: "flex",*/}
                    {/*    alignItems: "center",*/}
                    {/*    gap: "8px",*/}
                    {/*    flexWrap: "wrap",  // ✅ input moves below text if narrow*/}
                    {/*}}>*/}
                    {/*    <span style={{ color: "#777" }}>Go to page</span>*/}
                    {/*    <TextField*/}
                    {/*        size="small"*/}
                    {/*        value={gotoPage}*/}
                    {/*        onChange={(e) => setGotoPage(e.target.value)}*/}
                    {/*        sx={{ width: 60 }}*/}
                    {/*        inputProps={{ style: { textAlign: "center" } }}*/}
                    {/*    />*/}
                    {/*    <Button variant="outlined" onClick={handleGoToPage}>*/}
                    {/*        Go*/}
                    {/*    </Button>*/}
                    {/*</div>*/}
                </div>
            )}
        </>

    );
}