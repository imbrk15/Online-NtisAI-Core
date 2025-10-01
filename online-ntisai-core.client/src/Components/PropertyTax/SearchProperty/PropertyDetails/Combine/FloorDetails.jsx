import React, { useEffect, useRef, useState } from "react";
import { FaBook, FaUsers, FaHistory, FaFileAlt, FaPlus } from "react-icons/fa";
import { Menu, MenuItem, Button, Dialog, DialogContent } from "@mui/material";
import RoomSubmissionForm from "./RoomSubmissionForm";
import EditFloorInformation from "./EditFloorInformation";

// Helper function to format date from yyyy-mm-dd to dd-mm-yy
const formatDate = (dateString) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year.slice(2)}`;
};

const FloorDetails = () => {
    const [activeTab, setActiveTab] = useState("floor");
    const [activeCell, setActiveCell] = useState(null);
    const [menuAnchor, setMenuAnchor] = useState(null);
    const [menuRow, setMenuRow] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [editModal, setEditModal] = useState({});
    const inputRefs = useRef({});

    // Inline editing
    const [editingCell, setEditingCell] = useState({ row: null, col: null });
    const cellInputRef = useRef(null);

    // Define editable fields in order for navigation (excluding ID)
    const editableFields = [
        "floor", "constructionYear", "assessmentYear",
        "constructionType", "natureTypeBuilding", "subtype", "noOfRooms",
        "carpetAreaSqFt", "carpetAreaSqM",
        "builtUpAreaSqFt", "builtUpAreaSqM",
        "renterName", "calcRent", "nonCalcRent", "ocNo"
    ];

    // Room submission modal
    const [openModal, setOpenModal] = useState(false);
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);

    // auto scroll
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

    const tabs = [
        { key: "floor", label: "Floor Details", icon: <FaBook size={16} /> },
        { key: "social", label: "Social Details", icon: <FaUsers size={16} /> },
        { key: "old", label: "Old Details", icon: <FaHistory size={16} /> },
        { key: "tax", label: "Apply Tax", icon: <FaFileAlt size={16} /> },
    ];

    // ✅ Dataset with 7 records
    const [floorDetailsData, setFloorDetailsData] = useState([
        {
            id: 1,
            floor: "G",
            constructionYear: 2012,
            assessmentYear: 2023,
            constructionType: "PR",
            natureTypeBuilding: "Residential",
            subtype: "Apartment",
            noOfRooms: 2,
            carpetAreaSqFt: "121.37",
            carpetAreaSqM: "11.28",
            builtUpAreaSqFt: "145.64",
            builtUpAreaSqM: "13.53",
            renterName: "Ramesh Patil",
            calcRent: "8000",
            nonCalcRent: "5000",
            ocNo: "OC-2024-001",
            ocApply: "Yes",
            ocDate: "2024-05-12",
        },
        {
            id: 2,
            floor: "1",
            constructionYear: 2012,
            assessmentYear: 2023,
            constructionType: "A2",
            natureTypeBuilding: "Residential",
            subtype: "Apartment",
            noOfRooms: 3,
            carpetAreaSqFt: "475.02",
            carpetAreaSqM: "44.13",
            builtUpAreaSqFt: "570.02",
            builtUpAreaSqM: "52.96",
            renterName: "Suresh Sharma",
            calcRent: "12000",
            nonCalcRent: "9000",
            ocNo: "",
            ocApply: "No",
            ocDate: "",
        },
        {
            id: 3,
            floor: "2",
            constructionYear: 2013,
            assessmentYear: 2023,
            constructionType: "B1",
            natureTypeBuilding: "Commercial",
            subtype: "Shop",
            noOfRooms: 1,
            carpetAreaSqFt: "220.00",
            carpetAreaSqM: "20.43",
            builtUpAreaSqFt: "260.00",
            builtUpAreaSqM: "24.15",
            renterName: "Meena Traders",
            calcRent: "15000",
            nonCalcRent: "11000",
            ocNo: "OC-2023-045",
            ocApply: "Yes",
            ocDate: "2023-12-01",
        },
        {
            id: 4,
            floor: "3",
            constructionYear: 2014,
            assessmentYear: 2023,
            constructionType: "C1",
            natureTypeBuilding: "Residential",
            subtype: "Flat",
            noOfRooms: 2,
            carpetAreaSqFt: "300.50",
            carpetAreaSqM: "27.93",
            builtUpAreaSqFt: "360.50",
            builtUpAreaSqM: "33.49",
            renterName: "Anita Joshi",
            calcRent: "10000",
            nonCalcRent: "7500",
            ocNo: "",
            ocApply: "No",
            ocDate: "",
        },
        {
            id: 5,
            floor: "4",
            constructionYear: 2015,
            assessmentYear: 2023,
            constructionType: "PR",
            natureTypeBuilding: "Residential",
            subtype: "Apartment",
            noOfRooms: 3,
            carpetAreaSqFt: "410.00",
            carpetAreaSqM: "38.09",
            builtUpAreaSqFt: "490.00",
            builtUpAreaSqM: "45.52",
            renterName: "Vikas Rao",
            calcRent: "14000",
            nonCalcRent: "10000",
            ocNo: "OC-2022-098",
            ocApply: "Yes",
            ocDate: "2022-10-20",
        },
        {
            id: 6,
            floor: "5",
            constructionYear: 2016,
            assessmentYear: 2023,
            constructionType: "A2",
            natureTypeBuilding: "Commercial",
            subtype: "Office",
            noOfRooms: 5,
            carpetAreaSqFt: "600.00",
            carpetAreaSqM: "55.74",
            builtUpAreaSqFt: "720.00",
            builtUpAreaSqM: "66.89",
            renterName: "TechCorp Pvt Ltd",
            calcRent: "25000",
            nonCalcRent: "18000",
            ocNo: "OC-2021-123",
            ocApply: "Yes",
            ocDate: "2021-08-15",
        },
        {
            id: 7,
            floor: "6",
            constructionYear: 2017,
            assessmentYear: 2023,
            constructionType: "B2",
            natureTypeBuilding: "Residential",
            subtype: "Penthouse",
            noOfRooms: 4,
            carpetAreaSqFt: "850.00",
            carpetAreaSqM: "78.97",
            builtUpAreaSqFt: "1000.00",
            builtUpAreaSqM: "92.90",
            renterName: "Rekha Iyer",
            calcRent: "30000",
            nonCalcRent: "22000",
            ocNo: "",
            ocApply: "No",
            ocDate: "",
        },
    ]);

    const dropdownOptions = ["Edit", "New", "Delete", "Copy"];

    const handleCellSave = (rowIdx, field, value) => {
        setFloorDetailsData((prev) =>
            prev.map((row, idx) => (idx === rowIdx ? { ...row, [field]: value } : row))
        );
        setEditingCell({ row: null, col: null });
    };

    const moveToNextCell = (rowIdx, currentField) => {
        const currentIndex = editableFields.indexOf(currentField);
        if (currentIndex < editableFields.length - 1) {
            const nextField = editableFields[currentIndex + 1];
            setEditingCell({ row: rowIdx, col: nextField });
        } else {
            // Last column, exit edit mode
            setEditingCell({ row: null, col: null });
        }
    };

    const handleCellKeyDown = (e, rowIdx, field, value) => {
        if (e.key === "Enter") {
            e.preventDefault();
            // Save current value
            setFloorDetailsData((prev) =>
                prev.map((row, idx) => (idx === rowIdx ? { ...row, [field]: value } : row))
            );
            // Move to next cell
            moveToNextCell(rowIdx, field);
        } else if (e.key === "Escape") {
            e.preventDefault();
            // Cancel editing without saving
            setEditingCell({ row: null, col: null });
        }
    };

    // Focus the input when editing cell changes
    useEffect(() => {
        if (cellInputRef.current) {
            cellInputRef.current.focus();
            cellInputRef.current.select();
        }
    }, [editingCell]);

    // ✅ Right-click menu at cursor position
    const handleRowContextMenu = (event, rowIdx) => {
        event.preventDefault();
        setMenuRow(rowIdx);
        setMenuAnchor({
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
        });
    };

    const handleMenuClick = (option) => {
        if (option === "Edit" || option === "Copy") {
            setEditData(floorDetailsData[menuRow]);
            setIsModalOpen(true);
        } else if (option === "New") {
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
                renterName: "",
                calcRent: "",
                nonCalcRent: "",
                ocNo: "",
                ocApply: "No",
                ocDate: "",
            });
            setIsModalOpen(true);
        } else if (option === "Delete") {
            setFloorDetailsData((prev) => prev.filter((_, idx) => idx !== menuRow));
        }
        setMenuAnchor(null);
    };

    const handleSave = () => {
        if (editData?.id) {
            setFloorDetailsData((prev) =>
                prev.map((row) => (row.id === editData.id ? editData : row))
            );
        } else {
            setFloorDetailsData((prev) => [
                ...prev,
                { ...editData, id: prev.length + 1 },
            ]);
        }
        setIsModalOpen(false);
    };

    // ✅ show-all toggle
    const [showAll, setShowAll] = useState(false);
    const displayedData = showAll ? floorDetailsData : floorDetailsData.slice(0, 4);

    return (
        <div>
            {/* Tabs */}
            <div className="bg-[#40648a] rounded-t-md flex items-center relative">
                {/* Left spacer for centering */}
                <div className="flex-1"></div>

                {/* Centered Tabs */}
                <div className="flex items-stretch">
                    {tabs.map((tab, index) => (
                        <React.Fragment key={tab.key}>
                            <button
                                onClick={() => setActiveTab(tab.key)}
                                className={`flex items-center gap-2 px-6 py-2 transition-all 
                                    ${activeTab === tab.key
                                        ? "bg-white text-black rounded-t-md"
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

                {/* Right section with Add New Row button */}
                <div className="flex-1 flex justify-end pr-4">
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        startIcon={<FaPlus />}
                        sx={{
                            minWidth: "auto",
                            fontSize: "0.7rem",
                            padding: "2px 8px",
                            lineHeight: 1.3,
                            borderRadius: "4px",
                            textTransform: "none",
                        }}
                        onClick={() => {
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
                                renterName: "",
                                calcRent: "",
                                nonCalcRent: "",
                                ocNo: "",
                                ocApply: "No",
                                ocDate: "",
                            });
                            setIsModalOpen(true);
                        }}
                    >
                        Add New Row
                    </Button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white shadow-md rounded-b-md p-0 border border-gray-300">
                <div
                    ref={scrollRef}
                    className="overflow-x-auto"
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                >
                    <table className="w-full border border-gray-300 text-sm">
                        <thead style={{ backgroundColor: "#d9e3ec", color: "black" }}>
                            <tr>
                                {[
                                    "ID",
                                    "Floor",
                                    "Cons Yr",
                                    "Asse Yr",
                                    "Cons Type",
                                    "NTB",
                                    "Subtype",
                                    "No. of Rooms",
                                    "Carpet Area (sq.ft / sq.m)",
                                    "Built-up Area (sq.ft / sq.m)",
                                    "Name of Renter",
                                    "Cal Rent (₹)",
                                    "NCal Rent (₹)",
                                    "OC No.",
                                    "OC Date / OC Apply",
                                ].map((col) => (
                                    <th key={col} className="border px-3 py-2 text-left">
                                        {col}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {displayedData.map((row, rowIdx) => (
                                <tr
                                    key={row.id}
                                    onContextMenu={(e) => handleRowContextMenu(e, rowIdx)}
                                >
                                    {/* ID Column - Non-editable */}
                                    <td className="border px-3 py-2 bg-gray-100">
                                        {row.id}
                                    </td>

                                    {/* Editable columns */}
                                    {["floor", "constructionYear", "assessmentYear", "constructionType", "natureTypeBuilding", "subtype", "noOfRooms"].map((field) => (
                                        <td
                                            key={field}
                                            className="border px-3 py-2 cursor-pointer hover:bg-blue-50"
                                            onClick={() => setEditingCell({ row: rowIdx, col: field })}
                                        >
                                            {editingCell.row === rowIdx && editingCell.col === field ? (
                                                <input
                                                    ref={cellInputRef}
                                                    type="text"
                                                    defaultValue={row[field]}
                                                    onBlur={(e) => handleCellSave(rowIdx, field, e.target.value)}
                                                    onKeyDown={(e) => handleCellKeyDown(e, rowIdx, field, e.target.value)}
                                                    className="border border-blue-500 p-1 text-sm w-full outline-none ring-2 ring-blue-300"
                                                />
                                            ) : (
                                                row[field] || "-"
                                            )}
                                        </td>
                                    ))}
                                    {/* Carpet Area (sq.ft / sq.m) */}
                                    <td className="border px-3 py-2">
                                        <div className="text-center">
                                            {editingCell.row === rowIdx && (editingCell.col === "carpetAreaSqFt" || editingCell.col === "carpetAreaSqM") ? (
                                                <div className="flex items-center justify-center gap-1">
                                                    {editingCell.col === "carpetAreaSqFt" ? (
                                                        <>
                                                            <input
                                                                ref={cellInputRef}
                                                                type="text"
                                                                defaultValue={row.carpetAreaSqFt}
                                                                onBlur={(e) => handleCellSave(rowIdx, "carpetAreaSqFt", e.target.value)}
                                                                onKeyDown={(e) => handleCellKeyDown(e, rowIdx, "carpetAreaSqFt", e.target.value)}
                                                                className="border border-blue-500 p-1 text-sm w-20 text-center outline-none ring-2 ring-blue-300"
                                                            />
                                                            <span>/</span>
                                                            <span className="w-20 text-center">{row.carpetAreaSqM || "-"}</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span className="w-20 text-center">{row.carpetAreaSqFt || "-"}</span>
                                                            <span>/</span>
                                                            <input
                                                                ref={cellInputRef}
                                                                type="text"
                                                                defaultValue={row.carpetAreaSqM}
                                                                onBlur={(e) => handleCellSave(rowIdx, "carpetAreaSqM", e.target.value)}
                                                                onKeyDown={(e) => handleCellKeyDown(e, rowIdx, "carpetAreaSqM", e.target.value)}
                                                                className="border border-blue-500 p-1 text-sm w-20 text-center outline-none ring-2 ring-blue-300"
                                                            />
                                                        </>
                                                    )}
                                                </div>
                                            ) : (
                                                <div className="cursor-pointer hover:bg-blue-50 px-2 py-1 rounded">
                                                    <span onClick={() => setEditingCell({ row: rowIdx, col: "carpetAreaSqFt" })}>
                                                        {row.carpetAreaSqFt || "-"}
                                                    </span>
                                                    <span className="mx-1">/</span>
                                                    <span onClick={() => setEditingCell({ row: rowIdx, col: "carpetAreaSqM" })}>
                                                        {row.carpetAreaSqM || "-"}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    {/* Built-up Area (sq.ft / sq.m) */}
                                    <td className="border px-3 py-2">
                                        <div className="text-center">
                                            {editingCell.row === rowIdx && (editingCell.col === "builtUpAreaSqFt" || editingCell.col === "builtUpAreaSqM") ? (
                                                <div className="flex items-center justify-center gap-1">
                                                    {editingCell.col === "builtUpAreaSqFt" ? (
                                                        <>
                                                            <input
                                                                ref={cellInputRef}
                                                                type="text"
                                                                defaultValue={row.builtUpAreaSqFt}
                                                                onBlur={(e) => handleCellSave(rowIdx, "builtUpAreaSqFt", e.target.value)}
                                                                onKeyDown={(e) => handleCellKeyDown(e, rowIdx, "builtUpAreaSqFt", e.target.value)}
                                                                className="border border-blue-500 p-1 text-sm w-20 text-center outline-none ring-2 ring-blue-300"
                                                            />
                                                            <span>/</span>
                                                            <span className="w-20 text-center">{row.builtUpAreaSqM || "-"}</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span className="w-20 text-center">{row.builtUpAreaSqFt || "-"}</span>
                                                            <span>/</span>
                                                            <input
                                                                ref={cellInputRef}
                                                                type="text"
                                                                defaultValue={row.builtUpAreaSqM}
                                                                onBlur={(e) => handleCellSave(rowIdx, "builtUpAreaSqM", e.target.value)}
                                                                onKeyDown={(e) => handleCellKeyDown(e, rowIdx, "builtUpAreaSqM", e.target.value)}
                                                                className="border border-blue-500 p-1 text-sm w-20 text-center outline-none ring-2 ring-blue-300"
                                                            />
                                                        </>
                                                    )}
                                                </div>
                                            ) : (
                                                <div className="cursor-pointer hover:bg-blue-50 px-2 py-1 rounded">
                                                    <span onClick={() => setEditingCell({ row: rowIdx, col: "builtUpAreaSqFt" })}>
                                                        {row.builtUpAreaSqFt || "-"}
                                                    </span>
                                                    <span className="mx-1">/</span>
                                                    <span onClick={() => setEditingCell({ row: rowIdx, col: "builtUpAreaSqM" })}>
                                                        {row.builtUpAreaSqM || "-"}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    {["renterName", "calcRent", "nonCalcRent", "ocNo"].map((field) => (
                                        <td
                                            key={field}
                                            className="border px-3 py-2 cursor-pointer hover:bg-blue-50"
                                            onClick={() => setEditingCell({ row: rowIdx, col: field })}
                                        >
                                            {editingCell.row === rowIdx && editingCell.col === field ? (
                                                <input
                                                    ref={cellInputRef}
                                                    type="text"
                                                    defaultValue={row[field]}
                                                    onBlur={(e) => handleCellSave(rowIdx, field, e.target.value)}
                                                    onKeyDown={(e) => handleCellKeyDown(e, rowIdx, field, e.target.value)}
                                                    className="border border-blue-500 p-1 text-sm w-full outline-none ring-2 ring-blue-300"
                                                />
                                            ) : (
                                                row[field] || "-"
                                            )}
                                        </td>
                                    ))}
                                    <td className="border px-3 py-2">
                                        <div className="flex justify-between items-center">
                                            <span>{formatDate(row.ocDate)}</span>
                                            <input
                                                type="checkbox"
                                                checked={row.ocApply === "Yes"}
                                                onChange={(e) => {
                                                    setFloorDetailsData((prev) =>
                                                        prev.map((r) =>
                                                            r.id === row.id
                                                                ? { ...r, ocApply: e.target.checked ? "Yes" : "No" }
                                                                : r
                                                        )
                                                    );
                                                }}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Show All / Show Less toggle - bottom-right small */}
                {floorDetailsData.length > 4 && (
                    <div className="flex justify-end pr-2 mt-0.5 mb-0.5">
                        <button
                            className="text-blue-600 text-[10px] hover:underline"
                            onClick={() => setShowAll(!showAll)}
                        >
                            {showAll ? "▲ Show Less" : "▼ Show All"}
                        </button>
                    </div>
                )}

                {/* Context Menu */}
                <Menu
                    anchorReference="anchorPosition"
                    anchorPosition={
                        menuAnchor
                            ? { top: menuAnchor.mouseY, left: menuAnchor.mouseX }
                            : undefined
                    }
                    open={Boolean(menuAnchor)}
                    onClose={() => setMenuAnchor(null)}
                    PaperProps={{
                        sx: {
                            borderRadius: "6px",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                            "& .MuiMenuItem-root": {
                                fontWeight: "bold",
                                color: "#000",
                                fontSize: "0.9rem",
                                paddingY: "6px",
                                paddingX: "14px",
                            },
                            "& .MuiMenuItem-root:hover": {
                                backgroundColor: "#e6f0fa",
                            },
                        },
                    }}
                >
                    {dropdownOptions.map((option) => (
                        <MenuItem
                            key={option}
                            onClick={() => handleMenuClick(option)}
                            sx={{
                                color: option === "Delete" ? "#dc2626" : "#000",
                                fontWeight: "bold",
                            }}
                        >
                            {option}
                        </MenuItem>
                    ))}
                </Menu>
            </div>

            {/* Edit Floor Info modal */}
            <EditFloorInformation
                open={isModalOpen}
                editData={editData}
                setEditData={setEditData}
                editModal={editModal}
                setEditModal={setEditModal}
                inputRefs={inputRefs}
                handleKeyDown={() => { }}
                handleOpenSubmission={handleOpen}
                handleSave={handleSave}
                handleClose={() => setIsModalOpen(false)}
            />

            {/* Room Submission Modal */}
            <Dialog open={openModal} onClose={handleClose} maxWidth="lg" fullWidth>
                <DialogContent style={{ padding: 0 }}>
                    <RoomSubmissionForm onClose={handleClose} />
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default FloorDetails;
