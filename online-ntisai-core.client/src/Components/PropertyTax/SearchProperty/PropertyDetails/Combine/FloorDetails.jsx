import React, { useEffect, useRef, useState } from "react";
import { FaBook, FaUsers, FaHistory, FaFileAlt } from "react-icons/fa";

import {
    FaEdit,
    FaTools,
    FaCalendarAlt,
    FaHome,
    FaBuilding,
    FaThLarge,
    FaDoorOpen,
    FaRulerCombined,
    FaDraftingCompass,
    FaKey,
    FaBalanceScale,
    FaUser,
    FaMoneyBillWave,
    FaCheckCircle,
    FaCalendarCheck,
    FaTag
} from "react-icons/fa";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    MenuItem,
    Grid,
    FormControlLabel,
    Switch,
    Button,
} from "@mui/material";
import { Copy, ClipboardPaste } from "lucide-react";
import CustomButton from "../../../../../Helpers/ExtraProperties/CustomButtons";
import RoomSubmissionForm from "./RoomSubmissionForm";
const FloorDetails = () => {
    const [activeTab, setActiveTab] = useState("floor");
    const [activeCell, setActiveCell] = useState(null);
    const [menuPos, setMenuPos] = useState({
        top: 0,
        left: 0,
        openUp: false,
        visible: false,
    });

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState(null);

    // auto horizontal scroll
    const scrollRef = useRef(null);
    const [paused, setPaused] = useState(false);
    useEffect(() => {
        let rafId,
            dir = 1;
        const speed = 0.6;
        const step = () => {
            const el = scrollRef.current;
            if (el && !paused) {
                const max = el.scrollWidth - el.clientWidth;
                el.scrollLeft += dir * speed;
                if (el.scrollLeft <= 0) dir = 1;
                if (el.scrollLeft >= max) dir = -1;
            }
            rafId = requestAnimationFrame(step);
        };
        rafId = requestAnimationFrame(step);
        return () => cancelAnimationFrame(rafId);
    }, [paused]);

    // close menu on outside click / ESC / scroll / resize
    useEffect(() => {
        const close = () => setMenuPos((p) => ({ ...p, visible: false }));
        const onDocClick = (e) => {
            if (!e.target.closest?.("[data-dd]")) close();
        };
        const onEsc = (e) => e.key === "Escape" && close();
        const onScroll = () => close();
        window.addEventListener("click", onDocClick);
        window.addEventListener("keydown", onEsc);
        window.addEventListener("scroll", onScroll, true);
        window.addEventListener("resize", onScroll, true);
        return () => {
            window.removeEventListener("click", onDocClick);
            window.removeEventListener("keydown", onEsc);
            window.removeEventListener("scroll", onScroll, true);
            window.removeEventListener("resize", onScroll, true);
        };
    }, []);

    const tabs = [
        { key: "floor", label: "Floor Details", icon: <FaBook size={16} /> },
        { key: "social", label: "Social Details", icon: <FaUsers size={16} /> },
        { key: "old", label: "Old Details", icon: <FaHistory size={16} /> },
        { key: "tax", label: "Apply Tax", icon: <FaFileAlt size={16} /> },
    ];

    const [floorDetailsData, setFloorDetailsData] = useState([
        {
            id: 1,
            floor: "G",
            constructionYear: 2012,
            assessmentYear: 2023,
            constructionType: "PR",
            natureTypeBuilding: "Residential",
            subtype: "Apartment",
            carpetAreaSqFt: "121.37",
            carpetAreaSqM: "11.28",
            builtUpAreaSqFt: "145.64",
            builtUpAreaSqM: "13.53",
        },
        {
            id: 2,
            floor: "1",
            constructionYear: 2012,
            assessmentYear: 2023,
            constructionType: "A2",
            natureTypeBuilding: "Residential",
            subtype: "Apartment",
            carpetAreaSqFt: "475.02",
            carpetAreaSqM: "44.13",
            builtUpAreaSqFt: "570.02",
            builtUpAreaSqM: "52.96",
        },
    ]);

    const getFloorName = (floor) => {
        const map = {
            G: "Ground",
            B: "Basement",
            "1": "First",
            "2": "Second",
            "3": "Third",
            "4": "Fourth",
            "5": "Fifth",
            "6": "Sixth",
            "7": "Seventh",
            "8": "Eighth",
            "9": "Ninth",
            "10": "Tenth",
        };
        return map[floor] || floor;
    };

    const dropdownOptions = ["Edit", "Delete", "Copy", "New"];

    const openMenuForCell = (e, rowIdx, colIdx) => {
        e.stopPropagation();
        const rect = e.currentTarget.getBoundingClientRect();
        const menuH = 160;
        const menuW = 160;
        const margin = 8;
        const openUp = window.innerHeight - rect.bottom < menuH + margin;
        const top = openUp ? rect.top - menuH - margin : rect.bottom + margin;
        const left = Math.min(rect.left, window.innerWidth - menuW - margin);

        setActiveCell({ row: rowIdx, col: colIdx });
        setMenuPos({ top, left, openUp, visible: true });
    };

    const handleMenuClick = (option, rowIdx) => {
        if (option === "Edit") {
            setEditData(floorDetailsData[rowIdx]);
            setIsModalOpen(true);
        }
        setMenuPos({ ...menuPos, visible: false });
    };

    const handleSave = () => {
        if (editData.id) {
            // Edit existing row
            setFloorDetailsData((prev) =>
                prev.map((row) => (row.id === editData.id ? editData : row))
            );
        } else {
            // Add new row
            setFloorDetailsData((prev) => [
                ...prev,
                { ...editData, id: prev.length + 1 },
            ]);
        }
        setIsModalOpen(false);
    };
    const [editModal, setEditModal] = useState({});
    const [openModal, setOpenModal] = useState(false);

    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);

    return (
        <div>
            {/* Tabs */}
            <div className="bg-[#40648a] rounded-t-md flex justify-between items-center">
                {/* Tabs in center */}
                <div className="flex-1 flex justify-center">
                    <div className="flex items-stretch">
                        {tabs.map((tab, index) => (
                            <React.Fragment key={tab.key}>
                                <button
                                    onClick={() => setActiveTab(tab.key)}
                                    className={`flex items-center gap-2 px-6 py-2 font-medium transition-all bg-[#40648a] mt-3 ${activeTab === tab.key
                                        ? "bg-white text-black rounded-t-lg h-[90%]"
                                        : "text-white hover:bg-[#365577]"
                                        }`}
                                >
                                    {tab.icon}
                                    {tab.label}
                                </button>
                                {index < tabs.length - 1 && (
                                    <span className="w-px h-full bg-[#365577] opacity-70" />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* + Add New Row button on the right */}
                <div className="pr-4 mt-3">
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => {
                            // Empty form data for Add case
                            setEditData({
                                id: null,
                                floor: "",
                                constructionYear: "",
                                assessmentYear: "",
                                constructionType: "",
                                natureTypeBuilding: "",
                                subtype: "",
                                noOfRooms: "",
                                carpetAreaSqFt: "",
                                carpetAreaSqM: "",
                                builtUpAreaSqFt: "",
                                builtUpAreaSqM: "",
                                roomNo: "",
                                taxLiability: "Self",
                                renterName: "",
                                calcRent: "",
                                nonCalcRent: "",
                                ocApply: "No",
                                ocDate: "",
                                ocNo: "",
                            });
                            setIsModalOpen(true);
                        }}
                    >
                        + Add New Row
                    </Button>
                </div>
            </div>



            {/* Card */}
            <div className="bg-white shadow-md rounded-b-md p-0 border border-gray-300">
                <div className="relative overflow-y-visible">
                    <div
                        ref={scrollRef}
                        className="overflow-x-auto overflow-y-visible"
                        onMouseEnter={() => setPaused(true)}
                        onMouseLeave={() => setPaused(false)}
                    >
                        <table className="w-full border border-gray-300 text-sm">
                            <thead style={{ backgroundColor: "#d9e3ec", color: "black" }}>
                                <tr>
                                    {[
                                        "ID",
                                        "Floor",
                                        "Construction Year",
                                        "Assessment Year",
                                        "Construction Type",
                                        "Nature Type of Building",
                                        "Subtype",
                                        "Carpet Area (sq.ft)",
                                        "Carpet Area (sq.m)",
                                        "Built-up Area (sq.ft)",
                                        "Built-up Area (sq.m)",
                                    ].map((col) => (
                                        <th
                                            key={col}
                                            className="border border-gray-300 px-3 py-2 text-left"
                                        >
                                            {col}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {floorDetailsData.map((row, rowIdx) => (
                                    <tr key={row.id} className="odd:bg-white even:bg-gray-50">
                                        {Object.values({
                                            id: row.id,
                                            floor: getFloorName(row.floor),
                                            constructionYear: row.constructionYear,
                                            assessmentYear: row.assessmentYear,
                                            constructionType: row.constructionType,
                                            natureTypeBuilding: row.natureTypeBuilding,
                                            subtype: row.subtype,
                                            carpetAreaSqFt: row.carpetAreaSqFt,
                                            carpetAreaSqM: row.carpetAreaSqM,
                                            builtUpAreaSqFt: row.builtUpAreaSqFt,
                                            builtUpAreaSqM: row.builtUpAreaSqM,
                                        }).map((cell, colIdx) => (
                                            <td
                                                key={colIdx}
                                                className="border px-3 py-2 relative cursor-pointer"
                                                onDoubleClick={(e) => openMenuForCell(e, rowIdx, colIdx)}
                                            >
                                                {cell}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Dropdown */}
                {menuPos.visible && activeCell && (
                    <div
                        data-dd
                        className="fixed w-40 bg-white border border-gray-300 rounded-md shadow-lg z-[9999]"
                        style={{
                            top: `${menuPos.top}px`,
                            left: `${menuPos.left}px`,
                        }}
                    >
                        {dropdownOptions.map((option) => (
                            <button
                                key={option}
                                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                                onClick={() => handleMenuClick(option, activeCell.row)}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                )}

                {/* Modal */}
                <Dialog
                    open={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    fullWidth
                    maxWidth="lg"
                >
                    <DialogTitle
                        sx={{
                            backgroundColor: "#40648a",
                            color: "white",
                            fontWeight: "bold",
                            fontSize: "1.1rem",        // ⬆️ slightly larger font
                            display: "flex",
                            justifyContent: "center",  // centers text + icon
                            alignItems: "center",
                            gap: 1,
                            borderRadius: "4px 4px 0 0",
                            padding: "6px 14px",       // ⬆️ slightly more padding for balance
                            minHeight: "36px"          // ⬆️ header height adjusted
                        }}
                    >
                        <FaEdit style={{ marginRight: "6px", fontSize: "1.1rem" }} />
                        Edit Floor Information
                    </DialogTitle>



                    <DialogContent >
                        {editData && (
                            <>
                                <Grid container spacing={2} sx={{ mt: 2, display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr", gap: 2 }}>
                                    {/* ---------------- ROW 1 ---------------- */}
                                    <Grid item xs={12} sm={2}>
                                        <TextField
                                            label="Floor"
                                            size="small"
                                            InputLabelProps={{ shrink: true }}

                                            fullWidth
                                            value={editData.floor || ""}
                                            onChange={(e) => setEditData({ ...editData, floor: e.target.value })}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={2}>
                                        <TextField
                                            label="Construction Year"
                                            size="small"
                                            InputLabelProps={{ shrink: true }}

                                            fullWidth
                                            value={editData.constructionYear}
                                            onChange={(e) => setEditData({ ...editData, constructionYear: e.target.value })}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={2}>
                                        <TextField
                                            label="Assessment Year"
                                            size="small"
                                            InputLabelProps={{ shrink: true }}

                                            fullWidth
                                            value={editData.assessmentYear}
                                            onChange={(e) => setEditData({ ...editData, assessmentYear: e.target.value })}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={2}>
                                        <TextField
                                            label="Construction Type"
                                            size="small"
                                            InputLabelProps={{ shrink: true }}

                                            fullWidth
                                            value={editData.constructionType}
                                            onChange={(e) => setEditData({ ...editData, constructionType: e.target.value })}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={2}>
                                        <TextField
                                            label="Nature Type of Building"
                                            size="small"
                                            InputLabelProps={{ shrink: true }}

                                            fullWidth
                                            value={editData.natureTypeBuilding}
                                            onChange={(e) => setEditData({ ...editData, natureTypeBuilding: e.target.value })}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={2}>
                                        <TextField
                                            label="Subtype"
                                            size="small"
                                            InputLabelProps={{ shrink: true }}

                                            fullWidth
                                            value={editData.subtype}
                                            onChange={(e) => setEditData({ ...editData, subtype: e.target.value })}
                                        />
                                    </Grid>

                                </Grid>
                                <Grid container spacing={2} sx={{ mt: 2, display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr", gap: 2 }}>

                                    {/* ---------------- ROW 2 ---------------- */}
                                    <Grid item xs={12} sm={2}>
                                        <TextField
                                            label="No of Rooms"
                                            size="small"
                                            InputLabelProps={{ shrink: true }}

                                            fullWidth
                                            value={editModal.noOfRooms || ""}
                                            onChange={(e) => setEditModal({ ...editModal, noOfRooms: e.target.value })}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={2}>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            fullWidth
                                            size="small"
                                            onClick={handleOpen}
                                            sx={{
                                                fontSize: "1rem",   // 👈 increase text size (default ~0.875rem)
                                                fontWeight: "600",  // 👈 optional: make it bolder
                                                textTransform: "none", // keeps "Submission" as typed (not ALL CAPS)
                                            }}
                                        >
                                            Submission
                                        </Button>
                                    </Grid>


                                    {/* Modal with RoomSubmissionForm */}
                                    <Dialog open={openModal} onClose={handleClose} maxWidth="lg" fullWidth>
                                        <DialogContent style={{ padding: 0 }}>
                                            <RoomSubmissionForm onClose={handleClose} />
                                        </DialogContent>
                                    </Dialog>

                                    <Grid item xs={12} sm={2}>
                                        <TextField
                                            label="Carpet Area (sq.ft)"
                                            size="small"
                                            InputLabelProps={{ shrink: true }}

                                            fullWidth
                                            value={editData.carpetAreaSqFt}
                                            onChange={(e) => setEditData({ ...editData, carpetAreaSqFt: e.target.value })}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={2}>
                                        <TextField
                                            label="Carpet Area (sq.m)"
                                            size="small"
                                            InputLabelProps={{ shrink: true }}

                                            fullWidth
                                            value={editData.carpetAreaSqM}
                                            onChange={(e) => setEditData({ ...editData, carpetAreaSqM: e.target.value })}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={2}>
                                        <TextField
                                            label="Built-up Area (sq.ft)"
                                            size="small"
                                            InputLabelProps={{ shrink: true }}

                                            fullWidth
                                            value={editData.builtUpAreaSqFt}
                                            onChange={(e) => setEditData({ ...editData, builtUpAreaSqFt: e.target.value })}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={2}>
                                        <TextField
                                            label="Built-up Area (sq.m)"
                                            size="small"
                                            InputLabelProps={{ shrink: true }}

                                            fullWidth
                                            value={editData.builtUpAreaSqM}
                                            onChange={(e) => setEditData({ ...editData, builtUpAreaSqM: e.target.value })}
                                        />
                                    </Grid>

                                </Grid>
                                {/* ---------------- ROW 3 ---------------- */}
                                <Grid container spacing={2} sx={{ mt: 2, display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr", gap: 2 }}>
                                    <Grid item xs={12} sm={3}>
                                        <TextField
                                            label="Room No"
                                            size="small"
                                            InputLabelProps={{ shrink: true }}

                                            fullWidth
                                            value={editData.roomNo || ""}
                                            onChange={(e) => setEditData({ ...editData, roomNo: e.target.value })}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={3}>
                                        <TextField
                                            label="Tax Liability"
                                            select
                                            size="small"
                                            InputLabelProps={{ shrink: true }}

                                            fullWidth
                                            value={editData.taxLiability || "Self"}
                                            onChange={(e) => setEditData({ ...editData, taxLiability: e.target.value })}
                                        >
                                            <MenuItem value="Self">Self</MenuItem>
                                            <MenuItem value="Joint">Joint</MenuItem>
                                        </TextField>
                                    </Grid>

                                    <Grid item xs={12} sm={3}>
                                        <TextField
                                            label="Renter Full Name"
                                            size="small"
                                            InputLabelProps={{ shrink: true }}

                                            fullWidth
                                            value={editData.renterName || ""}
                                            onChange={(e) => setEditData({ ...editData, renterName: e.target.value })}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={3}>
                                        <TextField
                                            label="Calculate Rent (₹)"
                                            size="small"
                                            InputLabelProps={{ shrink: true }}

                                            fullWidth
                                            value={editData.calcRent || ""}
                                            onChange={(e) => setEditData({ ...editData, calcRent: e.target.value })}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <TextField
                                            label="Non-Calculate Rent (₹)"
                                            size="small"
                                            InputLabelProps={{ shrink: true }}

                                            fullWidth
                                            value={editData.nonCalcRent || ""}
                                            onChange={(e) => setEditData({ ...editData, nonCalcRent: e.target.value })}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={3}>
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    checked={editData.ocApply === "Yes"}
                                                    onChange={(e) =>
                                                        setEditData({ ...editData, ocApply: e.target.checked ? "Yes" : "No" })
                                                    }
                                                />
                                            }
                                            label="OC Apply"
                                        />
                                    </Grid>
                                </Grid>

                                {/* ---------------- ROW 4 ---------------- */}
                                <Grid
                                    container
                                    spacing={2}
                                    sx={{
                                        mt: 2,
                                        display: "grid",
                                        gridTemplateColumns: "auto auto 1fr", // compact OC fields + flexible button section
                                        gap: 2,
                                    }}
                                >
                                    {/* OC Date */}
                                    <Grid item sx={{ width: "160px" }}>
                                        <TextField
                                            label="OC Date"
                                            type="date"
                                            size="small"
                                            value={editData.ocDate || ""}
                                            onChange={(e) => setEditData({ ...editData, ocDate: e.target.value })}
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    </Grid>

                                    {/* OC No */}
                                    <Grid item sx={{ width: "160px" }}>
                                        <TextField
                                            label="OC No"
                                            size="small"
                                            value={editData.ocNo || ""}
                                            onChange={(e) => setEditData({ ...editData, ocNo: e.target.value })}
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    </Grid>

                                    {/* Add + Apply All buttons side by side */}
                                    <Grid item display="flex" gap={1}>
                                        <CustomButton
                                            type="add"
                                            onClick={() => console.log("Add clicked")}
                                        >
                                            Add
                                        </CustomButton>

                                        <CustomButton
                                            type="generate"
                                            onClick={() => console.log("Apply All clicked")}
                                            sx={{ minWidth: "140px" }} // slightly wider than Add
                                        >
                                            Apply All
                                        </CustomButton>
                                    </Grid>
                                </Grid>




                            </>
                        )}
                    </DialogContent>

                    {/* Custom Buttons in Footer */}
                    <div className="flex justify-between items-center px-6 pb-1">
                        <div className="flex gap-2">
                            <CustomButton type="copy" onClick={() => console.log("Copy clicked")}>
                                Copy
                            </CustomButton>
                            <CustomButton type="paste" onClick={() => console.log("Paste clicked")}>
                                Paste
                            </CustomButton>
                        </div>
                        <div className="flex gap-2">
                            <CustomButton type="clear" onClick={() => setIsModalOpen(false)}>
                                Cancel
                            </CustomButton>
                            <CustomButton type="save" onClick={handleSave}>
                                Save
                            </CustomButton>
                        </div>
                    </div>
                </Dialog>
            </div>
        </div>
    );
};

export default FloorDetails;
