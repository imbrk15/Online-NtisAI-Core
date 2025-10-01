import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Grid,
    TextField,
    MenuItem,
    FormControlLabel,
    Switch,
} from "@mui/material";
import { FaEdit } from "react-icons/fa";
import CustomButton from "../../../../../Helpers/ExtraProperties/CustomButtons";

const EditFloorInformation = ({
    open,
    editData,
    setEditData,
    editModal,
    setEditModal,
    inputRefs,
    handleKeyDown,
    handleOpenSubmission,
    handleSave,
    handleClose,
}) => {
    if (!editData) return null;

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
            <DialogTitle
                sx={{
                    backgroundColor: "#40648a",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 1,
                    borderRadius: "4px 4px 0 0",
                    padding: "6px 14px",
                    minHeight: "36px",
                }}
            >
                <FaEdit style={{ marginRight: "6px", fontSize: "1.1rem" }} />
                Edit Floor Information
            </DialogTitle>

            <DialogContent>
                {/* ---------------- ROW 1 ---------------- */}
                <Grid
                    container
                    spacing={2}
                    sx={{
                        mt: 2,
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
                        gap: 2,
                    }}
                >
                    <Grid item xs={12} sm={2}>
                        <TextField
                            label="Floor"
                            size="small"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            value={editData.floor || ""}
                            onChange={(e) => setEditData({ ...editData, floor: e.target.value })}
                            inputRef={(ref) => (inputRefs.current.floor = ref)}
                            onKeyDown={(e) => handleKeyDown(e, "floor")}
                        />
                    </Grid>

                    <Grid item xs={12} sm={2}>
                        <TextField
                            label="Construction Year"
                            size="small"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            value={editData.constructionYear}
                            onChange={(e) =>
                                setEditData({ ...editData, constructionYear: e.target.value })
                            }
                            inputRef={(ref) => (inputRefs.current.constructionYear = ref)}
                            onKeyDown={(e) => handleKeyDown(e, "constructionYear")}
                        />
                    </Grid>

                    <Grid item xs={12} sm={2}>
                        <TextField
                            label="Assessment Year"
                            size="small"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            value={editData.assessmentYear}
                            onChange={(e) =>
                                setEditData({ ...editData, assessmentYear: e.target.value })
                            }
                            inputRef={(ref) => (inputRefs.current.assessmentYear = ref)}
                            onKeyDown={(e) => handleKeyDown(e, "assessmentYear")}
                        />
                    </Grid>

                    <Grid item xs={12} sm={2}>
                        <TextField
                            label="Construction Type"
                            size="small"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            value={editData.constructionType}
                            onChange={(e) =>
                                setEditData({ ...editData, constructionType: e.target.value })
                            }
                            inputRef={(ref) => (inputRefs.current.constructionType = ref)}
                            onKeyDown={(e) => handleKeyDown(e, "constructionType")}
                        />
                    </Grid>

                    <Grid item xs={12} sm={2}>
                        <TextField
                            label="Nature Type of Building"
                            size="small"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            value={editData.natureTypeBuilding}
                            onChange={(e) =>
                                setEditData({
                                    ...editData,
                                    natureTypeBuilding: e.target.value,
                                })
                            }
                            inputRef={(ref) => (inputRefs.current.natureTypeBuilding = ref)}
                            onKeyDown={(e) => handleKeyDown(e, "natureTypeBuilding")}
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
                            inputRef={(ref) => (inputRefs.current.subtype = ref)}
                            onKeyDown={(e) => handleKeyDown(e, "subtype")}
                        />
                    </Grid>
                </Grid>

                {/* ---------------- ROW 2 ---------------- */}
                <Grid
                    container
                    spacing={2}
                    sx={{
                        mt: 2,
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
                        gap: 2,
                    }}
                >
                    <Grid item xs={12} sm={2}>
                        <TextField
                            label="No of Rooms"
                            size="small"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            value={editModal.noOfRooms || ""}
                            onChange={(e) => setEditModal({ ...editModal, noOfRooms: e.target.value })}
                            inputRef={(ref) => (inputRefs.current.noOfRooms = ref)}
                            onKeyDown={(e) => handleKeyDown(e, "noOfRooms")}
                        />
                    </Grid>

                    <Grid item xs={12} sm={2}>
                        <CustomButton
                            type="generate"
                            onClick={handleOpenSubmission}
                            fullWidth
                            sx={{
                                fontSize: "1rem",
                                fontWeight: "600",
                                textTransform: "none",
                            }}
                            inputRef={(ref) => (inputRefs.current.submission = ref)}
                            onKeyDown={(e) => handleKeyDown(e, "submission")}
                        >
                            Submission
                        </CustomButton>
                    </Grid>

                    <Grid item xs={12} sm={2}>
                        <TextField
                            label="Carpet Area (sq.ft)"
                            size="small"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            value={editData.carpetAreaSqFt}
                            onChange={(e) =>
                                setEditData({ ...editData, carpetAreaSqFt: e.target.value })
                            }
                            inputRef={(ref) => (inputRefs.current.carpetAreaSqFt = ref)}
                            onKeyDown={(e) => handleKeyDown(e, "carpetAreaSqFt")}
                        />
                    </Grid>

                    <Grid item xs={12} sm={2}>
                        <TextField
                            label="Carpet Area (sq.m)"
                            size="small"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            value={editData.carpetAreaSqM}
                            onChange={(e) =>
                                setEditData({ ...editData, carpetAreaSqM: e.target.value })
                            }
                            inputRef={(ref) => (inputRefs.current.carpetAreaSqM = ref)}
                            onKeyDown={(e) => handleKeyDown(e, "carpetAreaSqM")}
                        />
                    </Grid>

                    <Grid item xs={12} sm={2}>
                        <TextField
                            label="Built-up Area (sq.ft)"
                            size="small"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            value={editData.builtUpAreaSqFt}
                            onChange={(e) =>
                                setEditData({ ...editData, builtUpAreaSqFt: e.target.value })
                            }
                            inputRef={(ref) => (inputRefs.current.builtUpAreaSqFt = ref)}
                            onKeyDown={(e) => handleKeyDown(e, "builtUpAreaSqFt")}
                        />
                    </Grid>

                    <Grid item xs={12} sm={2}>
                        <TextField
                            label="Built-up Area (sq.m)"
                            size="small"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            value={editData.builtUpAreaSqM}
                            onChange={(e) =>
                                setEditData({ ...editData, builtUpAreaSqM: e.target.value })
                            }
                            inputRef={(ref) => (inputRefs.current.builtUpAreaSqM = ref)}
                            onKeyDown={(e) => handleKeyDown(e, "builtUpAreaSqM")}
                        />
                    </Grid>
                </Grid>

                {/* ---------------- ROW 3 ---------------- */}
                <Grid
                    container
                    spacing={2}
                    sx={{
                        mt: 2,
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
                        gap: 2,
                    }}
                >
                    <Grid item xs={12} sm={3}>
                        <TextField
                            label="Room No"
                            size="small"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            value={editData.roomNo || ""}
                            onChange={(e) => setEditData({ ...editData, roomNo: e.target.value })}
                            inputRef={(ref) => (inputRefs.current.roomNo = ref)}
                            onKeyDown={(e) => handleKeyDown(e, "roomNo")}
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
                            onChange={(e) =>
                                setEditData({ ...editData, taxLiability: e.target.value })
                            }
                            inputRef={(ref) => (inputRefs.current.taxLiability = ref)}
                            onKeyDown={(e) => handleKeyDown(e, "taxLiability")}
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
                            inputRef={(ref) => (inputRefs.current.renterName = ref)}
                            onKeyDown={(e) => handleKeyDown(e, "renterName")}
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
                            inputRef={(ref) => (inputRefs.current.calcRent = ref)}
                            onKeyDown={(e) => handleKeyDown(e, "calcRent")}
                        />
                    </Grid>

                    <Grid item xs={12} sm={3}>
                        <TextField
                            label="Non-Calculate Rent (₹)"
                            size="small"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            value={editData.nonCalcRent || ""}
                            onChange={(e) =>
                                setEditData({ ...editData, nonCalcRent: e.target.value })
                            }
                            inputRef={(ref) => (inputRefs.current.nonCalcRent = ref)}
                            onKeyDown={(e) => handleKeyDown(e, "nonCalcRent")}
                        />
                    </Grid>

                    <Grid item xs={12} sm={3}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={editData.ocApply === "Yes"}
                                    onChange={(e) =>
                                        setEditData({
                                            ...editData,
                                            ocApply: e.target.checked ? "Yes" : "No",
                                        })
                                    }
                                    inputRef={(ref) => (inputRefs.current.ocApply = ref)}
                                    onKeyDown={(e) => handleKeyDown(e, "ocApply")}
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
                        gridTemplateColumns: "auto auto 1fr",
                        gap: 2,
                    }}
                >
                    <Grid item sx={{ width: "160px" }}>
                        <TextField
                            label="OC Date"
                            type="date"
                            size="small"
                            value={editData.ocDate || ""}
                            onChange={(e) => setEditData({ ...editData, ocDate: e.target.value })}
                            InputLabelProps={{ shrink: true }}
                            inputRef={(ref) => (inputRefs.current.ocDate = ref)}
                            onKeyDown={(e) => handleKeyDown(e, "ocDate")}
                        />
                    </Grid>

                    <Grid item sx={{ width: "160px" }}>
                        <TextField
                            label="OC No"
                            size="small"
                            value={editData.ocNo || ""}
                            onChange={(e) => setEditData({ ...editData, ocNo: e.target.value })}
                            InputLabelProps={{ shrink: true }}
                            inputRef={(ref) => (inputRefs.current.ocNo = ref)}
                            onKeyDown={(e) => handleKeyDown(e, "ocNo")}
                        />
                    </Grid>

                    <Grid item display="flex" gap={1}>
                        <CustomButton type="add" onClick={() => console.log("Add clicked")}>
                            Add
                        </CustomButton>

                        <CustomButton
                            type="generate"
                            onClick={() => console.log("Apply All clicked")}
                            sx={{ minWidth: "140px" }}
                        >
                            Apply All
                        </CustomButton>
                    </Grid>
                </Grid>
            </DialogContent>

            {/* Footer */}
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
                    <CustomButton type="clear" onClick={handleClose}>
                        Cancel
                    </CustomButton>
                    <CustomButton type="save" onClick={handleSave}>
                        Save
                    </CustomButton>
                </div>
            </div>
        </Dialog>
    );
};

export default EditFloorInformation;
