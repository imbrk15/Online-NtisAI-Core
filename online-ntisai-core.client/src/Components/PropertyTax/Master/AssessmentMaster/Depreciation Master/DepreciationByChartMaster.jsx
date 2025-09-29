
import React, { useState } from "react";
import {
    Grid,
    Typography,
    Box,
    MenuItem,
    TextField,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import CustomButton from "../../../../../Helpers/ExtraProperties/CustomButtons";
import MasterCustomTable from "../../../../../Helpers/ExtraProperties/MasterCustomTable";
import YearPickerField from "../../../../../Helpers/ExtraProperties/YearPickerField";
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import DonutSmallOutlinedIcon from '@mui/icons-material/DonutSmallOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';



export default function DepreciationByChartMaster() {
    const [year, setYear] = useState("");
    const [minYear, setMinYear] = useState("");
    const [maxYear, setMaxYear] = useState("");
    const [ranges, setRanges] = useState([]);
    const [rates, setRates] = useState([
        { year: "2024", rate: "10.00", method: "Straight Line" },
    ]);

    const depreciationMethods = ["Straight Line", "Declining Balance", "Sum of Years Digits"];

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const addRange = () => {
        if (minYear && maxYear && parseInt(minYear) <= parseInt(maxYear)) {
            const newRange = `${minYear} - ${maxYear}`;
            if (!ranges.includes(newRange)) {
                setRanges([...ranges, newRange]);
            }
        }
    };

    const handleGenerateRates = () => console.log("Generate Rates clicked");
    const handleUpdate = () => console.log("Update clicked");
    const handleDelete = () => console.log("Delete clicked");
    const handleExport = () => console.log("Export clicked");
    const handleCancel = () => console.log("Cancel clicked");

    return (
        <Box sx={{ p: { xs: 2, md: 4 }, backgroundColor: "#f8fafc" }}>
            <Box sx={{
                display: "flex",
                flexWrap: "wrap", // allow wrapping for responsiveness
                gap: 3,
            }}>
                {/* Chart Configuration */}
                <Box
                    sx={{
                        flexBasis: { xs: "100%", md: "48%" }, // 100% width on xs and sm, ~half width on md and above
                        maxWidth: { xs: "100%", md: "48%" },
                        mb: 2,
                        backgroundColor: "#fff",
                        padding: 4,
                        borderRadius: 2,
                        boxShadow: 1,
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        boxSizing: "border-box",
                    }}
                >
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        < BarChartOutlinedIcon className="text-blue-500 mr-2" size={24} />
                        Chart Configuration
                    </Typography>

                    {/* Enter Year TextField */}
                    <YearPickerField
                        year={year}
                        setYear={setYear}
                        gridProps={{
                            flexBasis: { xs: "100%", sm: "50%", md: "40%" },
                            maxWidth: { xs: "100%", sm: "50%", md: "40%" },
                        }}
                    />

                    <Typography variant="subtitle1" fontWeight="bold">
                        Add Year Range
                    </Typography>

                    {/* Min Year, Max Year, and Add Range Button */}
                    <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
                        {/*<YearPickerField*/}
                        {/*    year={minYear} setYear={setMinYear}*/}
                        {/*    gridProps={{*/}
                        {/*        flexBasis: { xs: "100%", sm: "30%" },*/}
                        {/*        maxWidth: { xs: "100%", sm: "30%" },*/}
                        {/*    }}*/}
                        {/*/>*/}

                        <YearPickerField
                            year={minYear}
                            setYear={setMinYear}
                            label="Min Year"
                            placeholder="e.g. 1998"
                            gridProps={{
                                flexBasis: { xs: "100%", sm: "30%" },
                                maxWidth: { xs: "100%", sm: "30%" },
                            }}
                        />

                        {/*<YearPickerField*/}
                        {/*    year={maxYear} setYear={setMaxYear}*/}
                        {/*    gridProps={{*/}
                        {/*        flexBasis: { xs: "100%", sm: "30%" },*/}
                        {/*        maxWidth: { xs: "100%", sm: "30%" },*/}
                        {/*    }}*/}
                        {/*/>*/}

                        <YearPickerField
                            year={maxYear}
                            setYear={setMaxYear}
                            label="Max Year"
                            placeholder="e.g. 2025"
                            gridProps={{
                                flexBasis: { xs: "100%", sm: "30%" },
                                maxWidth: { xs: "100%", sm: "30%" },
                            }}
                        />

                        <Grid
                            item
                            xs={12}
                            sm={2}
                            sx={{
                                flexBasis: { xs: "100%", md: "30%", sm: "50%" },
                                maxWidth: { xs: "100%", md: "30%", sm: "50%" },
                            }}
                        >
                            <CustomButton
                                type="save"
                                onClick={addRange}
                                style={{ width: "100%", height: "100%", minHeight: "35px" }}
                            >
                                Add Range
                            </CustomButton>
                        </Grid>
                    </Grid>

                    <Typography variant="subtitle1" fontWeight="bold">
                        Added Ranges
                    </Typography>
                    <Box
                        sx={{
                            flexBasis: { xs: "100%", sm: "90%", md: "100%" },
                            maxWidth: { xs: "100%", sm: "90%", md: "100%" },
                            backgroundColor: "#f6f8fa",
                            p: 2,
                            borderRadius: 1,
                            height: "150px",
                            overflow: "auto",
                            width: "100%",
                        }}
                    >
                        {ranges.length > 0 ? (
                            ranges.map((range, idx) => (
                                <Typography key={idx}>{range}</Typography>
                            ))
                        ) : (
                            <Typography color="textSecondary">No ranges added yet</Typography>
                        )}
                    </Box>
                </Box>

                {/* Chart Management */}
                <Box
                    sx={{
                        flexBasis: { xs: "100%", md: "48%" },
                        maxWidth: { xs: "100%", md: "48%" },
                        mb: 2,
                        backgroundColor: "#fff",
                        padding: 4,
                        borderRadius: 2,
                        boxShadow: 1,
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        boxSizing: "border-box",
                    }}
                >
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        <DonutSmallOutlinedIcon  className="text-blue-500 mr-2" size={24} />
                        Chart Management
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mb: 2,
                            p: 1.5,
                            borderRadius: 1,
                            backgroundColor: "#8e44ad",
                            boxShadow: 3,
                        }}
                    >
                        <InsertChartIcon sx={{ color: "#fff", mr: 1 }} />
                        <Typography variant="h6" fontWeight="bold" sx={{ color: "#fff" }}>
                            Create Depreciation Chart
                        </Typography>
                    </Box>

                    <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ textAlign: "center" }}>
                        < InsertChartOutlinedIcon className="text-blue-500 mr-2" size={24} />
                        Chart Metadata
                    </Typography>
                    <Box
                        sx={{
                            mb: 2,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center", // centers all children horizontally
                        }}
                    >
                        {[
                            { label: "Created By:", value: "Admin User" },
                            { label: "Creation Date:", value: "2024-01-15" },
                            { label: "Last Modified:", value: "2024-01-15" },
                            { label: "Chart Status:", value: "Active", color: "green" },
                        ].map((item, i) => (
                            <Box
                                key={i}
                                sx={{
                                    display: "flex",
                                    mb: 0.5,
                                    width: { xs: "100%", sm: "80%", md: "60%" }, // responsive width
                                    maxWidth: "400px", // optional limit to avoid overly wide layout
                                }}
                            >
                                <Typography sx={{ flexBasis: "40%" }}>{item.label}</Typography>
                                <Typography
                                    fontWeight="bold"
                                    sx={{ flexGrow: 1, color: item.color || "inherit" }}
                                >
                                    {item.value}
                                </Typography>
                            </Box>
                        ))}
                    </Box>


                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                        <TrendingUpOutlinedIcon  className="text-blue-500 mr-2" size={24} />
                        Depreciation Rates
                    </Typography>

                    <MasterCustomTable
                        data={rates}
                        columns={[
                            { key: "year", header: "Year" },
                            { key: "rate", header: "Rate (%)" },
                            {
                                key: "method",
                                header: "Method",
                                render: (value, row) => (
                                    <TextField
                                        select
                                        size="small"
                                        value={value}
                                        onChange={(e) => {
                                            const updated = [...rates];
                                            const idx = rates.findIndex(
                                                (r) => r.year === row.year
                                            );
                                            if (idx !== -1) {
                                                updated[idx].method = e.target.value;
                                                setRates(updated);
                                            }
                                        }}
                                        sx={{
                                            minWidth: "200px",
                                            "& .MuiOutlinedInput-root": {
                                                "& fieldset": {
                                                    border: "none",
                                                },
                                                "&:hover fieldset": {
                                                    border: "none",
                                                },
                                                "&.Mui-focused fieldset": {
                                                    border: "none",
                                                },
                                            },
                                        }}
                                    >
                                        {depreciationMethods.map((method, i) => (
                                            <MenuItem key={i} value={method}>
                                                {method}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                ),
                            },
                        ]}
                    />
                </Box>

            </Box>
            {/* Footer Buttons */}
            <Box
                sx={{
                    mt: 3,
                    p: 3,
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    flexWrap: "wrap",
                    gap: 2,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {[
                    { type: "new", label: "Generate Rates", onClick: handleGenerateRates },
                    { type: "updated", label: "Update", onClick: handleUpdate },
                    { type: "delete", label: "Delete", onClick: handleDelete },
                    { type: "export", label: "Export", onClick: handleExport },
                    { type: "clear", label: "Cancel", onClick: handleCancel },
                ].map((btn, i) => (
                    <CustomButton
                        key={i}
                        type={btn.type}
                        onClick={btn.onClick}
                        style={{
                            width: "150px",
                            minHeight: "40px",
                            fontWeight: "bold",
                            textTransform: "none",
                        }}
                    >
                        {btn.label}
                    </CustomButton>
                ))}
            </Box>

        </Box>
    );
}