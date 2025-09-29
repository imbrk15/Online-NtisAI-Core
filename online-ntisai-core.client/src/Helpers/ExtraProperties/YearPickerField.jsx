// src/components/Common/YearPickerField.jsx
import React, { useState } from "react";
import { Grid, TextField, InputAdornment, Popover } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { YearCalendar } from "@mui/x-date-pickers/YearCalendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

/**
 * A reusable Year Picker Field
 * @param {string} year - current year value
 * @param {function} setYear - setter function for year
 * @param {object} gridProps - optional responsive grid sizing
 */
export default function YearPickerField({ year, setYear, gridProps }) {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpenYearPicker = (event) => setAnchorEl(event.currentTarget);
    const handleCloseYearPicker = () => setAnchorEl(null);
    const open = Boolean(anchorEl);

    const handleYearSelect = (newYear) => {
        if (newYear) setYear(newYear.year().toString());
        handleCloseYearPicker();
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid
                item
                xs={12}
                sm={6}
                md={2}
                sx={{
                    flexBasis: { xs: "50%", sm: "25%", md: "10%" },
                    maxWidth: { xs: "50%", sm: "25%", md: "10%" },
                    ...gridProps, // allow override
                }}
            >
                <TextField
                    fullWidth
                    label="Year"
                    size="small"
                    placeholder="Select Year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <CalendarMonthIcon
                                    onClick={handleOpenYearPicker}
                                    style={{ cursor: "pointer" }}
                                    titleAccess="Pick a year"
                                />
                            </InputAdornment>
                        ),
                    }}
                />
                <Popover
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleCloseYearPicker}
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                >
                    <YearCalendar
                        value={year ? dayjs(year, "YYYY") : null}
                        onChange={handleYearSelect}
                        yearsOrder="desc"
                    />
                </Popover>
            </Grid>
        </LocalizationProvider>
    );
}
