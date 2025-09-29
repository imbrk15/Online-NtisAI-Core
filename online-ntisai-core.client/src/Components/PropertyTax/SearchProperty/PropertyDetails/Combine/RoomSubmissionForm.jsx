import React, { useState, useRef } from "react";
import {
    Button,
    TextField,
    Select,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Box,
    Typography,
    Paper,
} from "@mui/material";
import { Calculator } from "lucide-react";

export default function RoomSubmissionForm({ onClose }) {
    const [entries, setEntries] = useState([
        { id: "1", roomNo: "2", length: 2, width: 5, area: 10, roomCount: 1, isMinus: false, isOuter: false, total: 10, remark: "" },
        { id: "2", roomNo: "3", length: 3, width: 5, area: 15, roomCount: 1, isMinus: false, isOuter: false, total: 15, remark: "" },
        { id: "3", roomNo: "4", length: 6, width: 4, area: 24, roomCount: 1, isMinus: false, isOuter: false, total: 24, remark: "" },
        { id: "4", roomNo: "5", length: 2, width: 1, area: 2, roomCount: 1, isMinus: false, isOuter: false, total: 2, remark: "" },
        { id: "5", roomNo: "6", length: 6, width: 3, area: 18, roomCount: 1, isMinus: false, isOuter: false, total: 18, remark: "" },
    ]);

    const [formData, setFormData] = useState({
        roomNo: "100",
        length: "",
        width: "",
        roomCount: "1",
        isMinus: "No",
        isOuter: "No",
        remark: "-Select-",
    });

    const [showOffsetPopup, setShowOffsetPopup] = useState(false);
    const [offsetData, setOffsetData] = useState({ length: "", width: "", area: "" });
    const [offsetEntries, setOffsetEntries] = useState([]);

    // 🔹 Refs for navigation
    const roomNoRef = useRef(null);
    const lengthRef = useRef(null);
    const widthRef = useRef(null);
    const areaRef = useRef(null);
    const roomCountRef = useRef(null);
    const isMinusRef = useRef(null);
    const isOuterRef = useRef(null);
    const totalRef = useRef(null);
    const remarkRef = useRef(null);

    const fieldRefs = [
        roomNoRef,
        lengthRef,
        widthRef,
        areaRef,
        roomCountRef,
        isMinusRef,
        isOuterRef,
        totalRef,
        remarkRef,
    ];

    const calculateArea = (length, width, roomCount) => length * width * roomCount;

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (field === "isMinus" && value === "Yes") {
            setShowOffsetPopup(true);
        }
    };

    const handleKeyDown = (e, currentIndex) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (currentIndex === fieldRefs.length - 1) {
                handleAdd();
            } else if (fieldRefs[currentIndex + 1]?.current) {
                fieldRefs[currentIndex + 1].current.focus();
            }
        } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            if (currentIndex > 0 && fieldRefs[currentIndex - 1]?.current) {
                fieldRefs[currentIndex - 1].current.focus();
            }
        }
    };

    // 🔹 Offset handling
    const handleOffsetInputChange = (field, value) => {
        setOffsetData((prev) => {
            const updated = { ...prev, [field]: value };
            if (field === "length" || field === "width") {
                const length = parseFloat(field === "length" ? value : updated.length);
                const width = parseFloat(field === "width" ? value : updated.width);
                if (!isNaN(length) && !isNaN(width)) {
                    updated.area = (length * width).toString();
                }
            }
            return updated;
        });
    };

    const handleOffsetAdd = () => {
        if (!offsetData.length || !offsetData.width) return;
        setOffsetEntries((prev) => [...prev, offsetData]);
        setOffsetData({ length: "", width: "", area: "" });
    };

    const handleOffsetOK = () => {
        console.log("Offset entries saved:", offsetEntries);
        setShowOffsetPopup(false);
    };

    const handleOffsetClose = () => {
        setOffsetData({ length: "", width: "", area: "" });
        setOffsetEntries([]);
        setShowOffsetPopup(false);
        setFormData((prev) => ({ ...prev, isMinus: "No" }));
    };

    const handleAdd = () => {
        const length = parseFloat(formData.length);
        const width = parseFloat(formData.width);
        const roomCount = parseInt(formData.roomCount);

        if (isNaN(length) || isNaN(width) || isNaN(roomCount)) {
            alert("Please enter valid numeric values for length, width, and room count");
            return;
        }

        const area = calculateArea(length, width, roomCount);
        const isMinus = formData.isMinus === "Yes";
        const total = isMinus ? -area : area;

        const newEntry = {
            id: Date.now().toString(),
            roomNo: formData.roomNo,
            length,
            width,
            area,
            roomCount,
            isMinus,
            isOuter: formData.isOuter === "Yes",
            total,
            remark: formData.remark === "-Select-" ? "" : formData.remark,
        };

        setEntries((prev) => [...prev, newEntry]);
        setFormData({
            roomNo: (parseInt(formData.roomNo) + 1).toString(),
            length: "",
            width: "",
            roomCount: "1",
            isMinus: "No",
            isOuter: "No",
            remark: "-Select-",
        });
    };

    const handleClear = () => setEntries([]);
    const handleShow = () => console.log("Show entries:", entries);

    return (
        <div className="w-full">
            {/* Sticky Header */}
            <div className="sticky top-0 z-50 bg-[#40648a] text-white text-xl font-semibold text-center py-2.5 shadow-md w-full">
                <h1>ROOM WISE SUBMISSION IN SQUARE METER</h1>
            </div>

            {/* Input Form Section */}
            <div className="sticky top-16 z-40 bg-white shadow-md border-t border-gray-200 w-full mb-3">
                <Table
                    sx={{
                        "& .MuiTableCell-root": {
                            padding: "4px 6px", // 👈 tighter
                            fontSize: "0.85rem",
                        },
                    }}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Room No</TableCell>
                            <TableCell align="center">Length</TableCell>
                            <TableCell align="center">Width</TableCell>
                            <TableCell align="center">Area</TableCell>
                            <TableCell align="center">RoomCount</TableCell>
                            <TableCell align="center">Offset</TableCell>
                            <TableCell align="center">Outer</TableCell>
                            <TableCell align="center">Total</TableCell>
                            <TableCell align="center">Remark</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            {/* Form Inputs (unchanged, compact padding applied globally) */}
                            <TableCell align="center">
                                <TextField
                                    size="small"
                                    inputRef={roomNoRef}
                                    value={formData.roomNo}
                                    onChange={(e) => handleInputChange("roomNo", e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(e, 0)}
                                />
                            </TableCell>
                            <TableCell align="center">
                                <TextField
                                    size="small"
                                    type="number"
                                    inputRef={lengthRef}
                                    value={formData.length}
                                    onChange={(e) => handleInputChange("length", e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(e, 1)}
                                    placeholder="0"
                                />
                            </TableCell>
                            <TableCell align="center">
                                <TextField
                                    size="small"
                                    type="number"
                                    inputRef={widthRef}
                                    value={formData.width}
                                    onChange={(e) => handleInputChange("width", e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(e, 2)}
                                    placeholder="0"
                                />
                            </TableCell>
                            <TableCell align="center">
                                <TextField
                                    size="small"
                                    type="number"
                                    inputRef={areaRef}
                                    value={
                                        formData.length && formData.width
                                            ? (
                                                parseFloat(formData.length) *
                                                parseFloat(formData.width) || 0
                                            ).toString()
                                            : ""
                                    }
                                    onKeyDown={(e) => handleKeyDown(e, 3)}
                                    InputProps={{ readOnly: true }}
                                />
                            </TableCell>
                            <TableCell align="center">
                                <TextField
                                    size="small"
                                    type="number"
                                    inputRef={roomCountRef}
                                    value={formData.roomCount}
                                    onChange={(e) => handleInputChange("roomCount", e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(e, 4)}
                                />
                            </TableCell>
                            <TableCell align="center">
                                <Select
                                    size="small"
                                    inputRef={isMinusRef}
                                    value={formData.isMinus}
                                    onChange={(e) => handleInputChange("isMinus", e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(e, 5)}
                                >
                                    <MenuItem value="No">No</MenuItem>
                                    <MenuItem value="Yes">Yes</MenuItem>
                                </Select>
                            </TableCell>
                            <TableCell align="center">
                                <Select
                                    size="small"
                                    inputRef={isOuterRef}
                                    value={formData.isOuter}
                                    onChange={(e) => handleInputChange("isOuter", e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(e, 6)}
                                >
                                    <MenuItem value="No">No</MenuItem>
                                    <MenuItem value="Yes">Yes</MenuItem>
                                </Select>
                            </TableCell>
                            <TableCell align="center">
                                <TextField
                                    size="small"
                                    inputRef={totalRef}
                                    value={
                                        formData.length && formData.width && formData.roomCount
                                            ? (
                                                calculateArea(
                                                    parseFloat(formData.length) || 0,
                                                    parseFloat(formData.width) || 0,
                                                    parseInt(formData.roomCount) || 1
                                                ) *
                                                (formData.isMinus === "Yes" ? -1 : 1)
                                            ).toString()
                                            : ""
                                    }
                                    onKeyDown={(e) => handleKeyDown(e, 7)}
                                    InputProps={{ readOnly: true }}
                                />
                            </TableCell>
                            <TableCell align="center">
                                <Select
                                    size="small"
                                    inputRef={remarkRef}
                                    value={formData.remark}
                                    onChange={(e) => handleInputChange("remark", e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(e, 8)}
                                >
                                    <MenuItem value="-Select-">-Select-</MenuItem>
                                    <MenuItem value="Living Room">Living Room</MenuItem>
                                    <MenuItem value="Bedroom">Bedroom</MenuItem>
                                    <MenuItem value="Kitchen">Kitchen</MenuItem>
                                    <MenuItem value="Bathroom">Bathroom</MenuItem>
                                    <MenuItem value="Office">Office</MenuItem>
                                </Select>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>

            {/* Buttons */}
            <div className="p-3 bg-white/90 border-t border-gray-200 shadow-md w-full">
                <div className="flex gap-4 mb-3">
                    <Button variant="contained" color="success" onClick={handleAdd}>
                        Add Room
                    </Button>
                    <Button variant="outlined" color="error" onClick={handleClear}>
                        Clear All
                    </Button>
                    <Button variant="outlined" color="primary" onClick={handleShow}>
                        Show Data
                    </Button>
                </div>

                {/* Data Table */}
                <div className="border-t border-gray-200 shadow-md w-full mb-3">
                    <Table
                        sx={{
                            "& .MuiTableCell-root": {
                                padding: "4px 6px", // 👈 tighter row height
                                fontSize: "0.85rem",
                            },
                        }}
                    >
                        <TableHead>
                            <TableRow style={{ backgroundColor: "#40648a", color: "#fff" }}>
                                <TableCell align="center" style={{ color: "#fff" }}>RoomNo</TableCell>
                                <TableCell align="center" style={{ color: "#fff" }}>Length</TableCell>
                                <TableCell align="center" style={{ color: "#fff" }}>Width</TableCell>
                                <TableCell align="center" style={{ color: "#fff" }}>Area</TableCell>
                                <TableCell align="center" style={{ color: "#fff" }}>RoomCount</TableCell>
                                <TableCell align="center" style={{ color: "#fff" }}>Offset</TableCell>
                                <TableCell align="center" style={{ color: "#fff" }}>Outer</TableCell>
                                <TableCell align="center" style={{ color: "#fff" }}>Total</TableCell>
                                <TableCell align="center" style={{ color: "#fff" }}>Remark</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {entries.map((entry, index) => (
                                <TableRow
                                    key={entry.id}
                                    style={{ backgroundColor: index % 2 === 0 ? "#f0f4ff" : "#fff" }}
                                >
                                    <TableCell align="center">{entry.roomNo}</TableCell>
                                    <TableCell align="center">{entry.length}</TableCell>
                                    <TableCell align="center">{entry.width}</TableCell>
                                    <TableCell align="center">{entry.area}</TableCell>
                                    <TableCell align="center">{entry.roomCount}</TableCell>
                                    <TableCell align="center">{entry.isMinus ? "Yes" : "No"}</TableCell>
                                    <TableCell align="center">{entry.isOuter ? "Yes" : "No"}</TableCell>
                                    <TableCell align="center">{entry.total}</TableCell>
                                    <TableCell align="center">{entry.remark}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* Close Button */}
                <div className="flex justify-center mt-4">
                    <Button variant="outlined" onClick={onClose}>
                        Close
                    </Button>
                </div>
            </div>

            {/* Offset Dialog */}
            <Dialog open={showOffsetPopup} onClose={handleOffsetClose} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1, color: "#40648a" }}>
                    <Calculator size={20} />
                    Offset Configuration
                </DialogTitle>
                <DialogContent dividers>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                        Configure room dimensions and offset calculations for accurate area measurements.
                    </Typography>
                    <Box display="flex" gap={2} alignItems="center" mb={2}>
                        <TextField label="Length" type="number" size="small" value={offsetData.length} onChange={(e) => handleOffsetInputChange("length", e.target.value)} />
                        <TextField label="Width" type="number" size="small" value={offsetData.width} onChange={(e) => handleOffsetInputChange("width", e.target.value)} />
                        <TextField label="Area" type="number" size="small" value={offsetData.area} InputProps={{ readOnly: true }} />
                        <Button variant="contained" color="primary" onClick={handleOffsetAdd} sx={{ height: "40px" }}>
                            Add
                        </Button>
                    </Box>
                    <Paper variant="outlined" sx={{ height: 120, display: "flex", alignItems: "center", justifyContent: "center", color: "text.secondary", borderStyle: "dashed", bgcolor: "#f9fafc" }}>
                        {offsetEntries.length === 0 ? (
                            <Typography variant="body2">Offset entries will appear here</Typography>
                        ) : (
                            <Box width="100%" p={2}>
                                {offsetEntries.map((entry, i) => (
                                    <Typography key={i} variant="body2">
                                        {`Length: ${entry.length}, Width: ${entry.width}, Area: ${entry.area}`}
                                    </Typography>
                                ))}
                            </Box>
                        )}
                    </Paper>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={handleOffsetOK}>
                        OK
                    </Button>
                    <Button variant="outlined" onClick={handleOffsetClose}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
