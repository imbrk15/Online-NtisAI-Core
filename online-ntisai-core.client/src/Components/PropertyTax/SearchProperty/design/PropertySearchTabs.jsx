import React, { useEffect, useState } from "react";
import {
    Box,
    Tabs,
    Tab,
    Grid,
    TextField,
    InputAdornment,
    MenuItem,
} from "@mui/material";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import PlaceIcon from "@mui/icons-material/Place";
import GroupsIcon from "@mui/icons-material/Groups";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import BadgeIcon from "@mui/icons-material/Badge";
import HomeIcon from "@mui/icons-material/Home";
import HistoryIcon from "@mui/icons-material/History";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import ApartmentIcon from "@mui/icons-material/Apartment";
import Groups2Icon from "@mui/icons-material/Groups2";
import StorefrontIcon from "@mui/icons-material/Storefront";
import PersonIcon from "@mui/icons-material/Person";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import LocationPinIcon from '@mui/icons-material/LocationPin';
import CropFreeIcon from '@mui/icons-material/CropFree';

function TabPanel({ children, value, index, ...other }) {
    return (
        <div role="tabpanel" hidden={value !== index} {...other}>
            {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
        </div>
    );
}
const a11y = (i) => ({
    id: `prop-tab-${i}`,
    "aria-controls": `prop-tabpanel-${i}`,
});

const IconText = ({
    id,
    label,
    placeholder,
    icon,
    type = "text",
    value,
    onChange,
    inputProps,

}) => (
    <TextField
        id={id}
        label={label}
        placeholder={placeholder}
        fullWidth
        size="small"
        type={type}
        value={value ?? ""}
        onChange={(e) => onChange?.(e.target.value)}
        InputProps={{
            startAdornment: <InputAdornment position="start">{icon}</InputAdornment>,
        }}
        InputLabelProps={{
            shrink: true,
            sx: {
                left: 0,
            },
        }}
        sx={{

            "& .MuiInputBase-root": { height: 40 },
            "& .MuiInputBase-input": { fontSize: 16 },
        }}
        inputProps={inputProps}
    />
);

function PropertySearchTabs({ values, onChange, children }) {
    const [tab, setTab] = useState(0);

    // local state, synced with parent
    const [form, setForm] = useState({
        // Quick
        upicId: "",
        propertyNo: "",
        oldPropertyNo: "",
        citySurvey: "",
        mobile: "",
        // Location
        plotNo: "",
        wingFlat: "",
        societyName: "",
        shopBuildingName: "",
        address: "",
        // People
        occupierName: "",
        renterName: "",
        // Values
        rateableOp: "",
        rateableA: "",
        rateableB: "",
        capitalOp: "",
        capitalA: "",
        capitalB: "",
        taxDefaulter: "",
        ...(values || {}),
    });

    useEffect(() => {
        if (values) setForm((p) => ({ ...p, ...values }));
    }, [values]);

    const setField = (k) => (v) => {
        const next = { ...form, [k]: v };
        setForm(next);
        onChange?.(next);
    };

    return (
        <Box sx={{ mt: 2 }}>
            <Tabs
                value={tab}
                onChange={(_, v) => setTab(v)}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                    minHeight: 44,
                    "& .MuiTab-root": { textTransform: "none", minHeight: 44, gap: 1 },

                    // Mobile view: stack vertically
                    "@media (max-width: 614px)": {
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "stretch",

                        "& .MuiTabs-flexContainer": {
                            flexDirection: "column",
                        },
                        "& .MuiTab-root": {
                            justifyContent: "flex-start",
                            borderBottom: "1px solid #ddd",
                        },
                    },
                }}
            >
                <Tab
                    icon={<ManageSearchIcon fontSize="small" />}
                    iconPosition="start"
                    label="Quick Property Search"
                    {...a11y(0)}
                />
                <Tab
                    icon={<PlaceIcon fontSize="small" />}
                    iconPosition="start"
                    label="Location"
                    {...a11y(1)}
                />
                <Tab
                    icon={<GroupsIcon fontSize="small" />}
                    iconPosition="start"
                    label="People"
                    {...a11y(2)}
                />
                <Tab
                    icon={<CurrencyRupeeIcon fontSize="small" />}
                    iconPosition="start"
                    label="Values & Dues"
                    {...a11y(3)}
                />
            </Tabs>

            {/* QUICK */}

            <Box
                sx={{
                    bgcolor: "aliceblue",
                    // border: "1px solid #d6e6fb",
                    borderRadius: 1.25, // ~10px
                    px: 2,
                    py: 2,
                    overflow: "visible",
                }}
            >
                <TabPanel value={tab} index={0}>
                    <Grid container spacing={2} alignItems="flex-end">
                        <Grid sx={{
                            flexBasis: { xs: "100%", sm: "45%", md: "18%" },
                            maxWidth: { xs: "100%", sm: "45%", md: "18%" },
                        }}>
                            <IconText
                                id="upicIdInput"
                                label="UPIC ID"
                                placeholder="Enter UPIC ID"
                                icon={<BadgeIcon />}
                                value={form.upicId}
                                onChange={setField("upicId")}
                            />
                        </Grid>
                        <Grid sx={{
                            flexBasis: { xs: "100%", sm: "45%", md: "18%" },
                            maxWidth: { xs: "100%", sm: "45%", md: "18%" },
                        }}>
                            <IconText
                                id="propertyNoInput"
                                label="Property No"
                                placeholder="Enter Property No"
                                icon={<HomeIcon />}
                                value={form.propertyNo}
                                onChange={setField("propertyNo")}
                            />
                        </Grid>
                        <Grid sx={{
                            flexBasis: { xs: "100%", sm: "45%", md: "18%" },
                            maxWidth: { xs: "100%", sm: "45%", md: "18%" },
                        }}>
                            <IconText
                                id="oldPropertyNoInput"
                                label="Old Property No"
                                placeholder="Enter Old Property No"
                                icon={<HistoryIcon />}
                                value={form.oldPropertyNo}
                                onChange={setField("oldPropertyNo")}
                            />
                        </Grid>
                        <Grid sx={{
                            flexBasis: { xs: "100%", sm: "45%", md: "18%" },
                            maxWidth: { xs: "100%", sm: "45%", md: "18%" },
                        }}>
                            <IconText
                                id="citySurveyInput"
                                label="City Survey No"
                                placeholder="Enter City Survey No"
                                icon={<LocationCityIcon />}
                                value={form.citySurvey}
                                onChange={setField("citySurvey")}
                            />
                        </Grid>
                        <Grid sx={{
                            flexBasis: { xs: "100%", sm: "45%", md: "18%" },
                            maxWidth: { xs: "100%", sm: "45%", md: "218" },
                        }}>
                            <IconText
                                id="mobileInput"
                                label="Mobile No"
                                placeholder="Enter Mobile No"
                                icon={<PhoneIphoneIcon />}
                                value={form.mobile}
                                onChange={setField("mobile")}
                                type="tel"
                                inputProps={{
                                    inputMode: "numeric",
                                    pattern: "\\d*",
                                    maxLength: 10,
                                }}
                            />
                        </Grid>
                    </Grid>
                </TabPanel>

                {/* LOCATION */}
                <TabPanel value={tab} index={1}>
                    <Grid container spacing={2}>
                        <Grid sx={{
                            flexBasis: { xs: "100%", sm: "45%", md: "18%" },
                            maxWidth: { xs: "100%", sm: "45%", md: "18%" },
                        }}>
                            <IconText
                                id="plotInput"
                                label="Plot No"
                                placeholder="Plot No"
                                icon={<CropFreeIcon />}
                                value={form.plotNo}
                                onChange={setField("plotNo")}
                            />
                        </Grid>

                        <Grid sx={{
                            flexBasis: { xs: "100%", sm: "45%", md: "18%" },
                            maxWidth: { xs: "100%", sm: "45%", md: "18%" },
                        }}>
                            <IconText
                                id="wingFlatInput"
                                label="Wing / Flat No"
                                placeholder="Wing/Flat No"
                                icon={<ApartmentIcon />}
                                value={form.wingFlat}
                                onChange={setField("wingFlat")}
                            />
                        </Grid>

                        <Grid sx={{
                            flexBasis: { xs: "100%", sm: "45%", md: "18%" },
                            maxWidth: { xs: "100%", sm: "45%", md: "18%" },
                        }}>
                            <IconText
                                id="societyNameInput"
                                label="Society Name"
                                placeholder="Enter Society Name"
                                icon={<Groups2Icon />}
                                value={form.societyName}
                                onChange={setField("societyName")}
                            />
                        </Grid>

                        <Grid sx={{
                            flexBasis: { xs: "100%", sm: "45%", md: "18%" },
                            maxWidth: { xs: "100%", sm: "45%", md: "18%" },
                        }}>
                            <IconText
                                id="shopBuildingNameInput"
                                label="Shop / Building Name"
                                placeholder="Enter Shop/Building Name"
                                icon={<StorefrontIcon />}
                                value={form.shopBuildingName}
                                onChange={setField("shopBuildingName")}
                            />
                        </Grid>

                        <Grid sx={{
                            flexBasis: { xs: "100%", sm: "45%", md: "18%" },
                            maxWidth: { xs: "100%", sm: "45%", md: "18%" },
                        }}>
                            <IconText
                                id="addressInput"
                                label="Address"
                                placeholder="Enter Address"
                                icon={<LocationPinIcon />}
                                value={form.address}
                                onChange={setField("address")}
                            />
                        </Grid>
                    </Grid>
                </TabPanel>


                {/* PEOPLE */}
                <TabPanel value={tab} index={2}>
                    <Grid container spacing={2} alignItems="flex-end">
                        <Grid item xs={12} sm={6} md={2.4} sx={{ flexGrow: 0.25 }}>
                            <IconText
                                id="occupierNameInput"
                                label="Occupier Name"
                                placeholder="Enter Occupier Name"
                                icon={<PersonIcon />}
                                value={form.occupierName}
                                onChange={setField("occupierName")}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2.4} sx={{ flexGrow: 0.25 }}>
                            <IconText
                                id="renterNameInput"
                                label="Renter Name"
                                placeholder="Enter Renter Name"
                                icon={<PersonAddAlt1Icon />}
                                value={form.renterName}
                                onChange={setField("renterName")}
                            />
                        </Grid>
                    </Grid>
                </TabPanel>

                {/* VALUES & DUES */}
                <TabPanel value={tab} index={3}>
                    <Grid container spacing={2}>
                        {/* Rateable */}
                        <Grid>
                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: {
                                        xs: "100%",
                                        sm: form.rateableOp === "between"
                                            ? "30% 30% 30%" // Operator + A + B
                                            : "55% 40%",   // Operator + A
                                        md: form.rateableOp === "between"
                                            ? "35% 30% 30%"
                                            : "55% 40%",
                                    },
                                    gap: 2,
                                }}
                            >
                                {/* Operator */}
                                <TextField
                                    id="rateableOp"
                                    select
                                    fullWidth
                                    size="small"
                                    label="Rateable Value"
                                    value={form.rateableOp || "RateableValue"}
                                    onChange={(e) => setField("rateableOp")(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <CurrencyRupeeIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                >
                                    <MenuItem value="RateableValue" disabled>Rateable Value</MenuItem>
                                    <MenuItem value="gt">More Than</MenuItem>
                                    <MenuItem value="lt">Less Than</MenuItem>
                                    <MenuItem value="between">Between</MenuItem>
                                </TextField>

                                {/* Value A */}
                                <TextField
                                    id="rateableA"
                                    type="number"
                                    fullWidth
                                    size="small"
                                    placeholder="Value"
                                    value={form.rateableA}
                                    onChange={(e) => setField("rateableA")(e.target.value)}
                                />

                                {/* Value B (only when between) */}
                                {form.rateableOp === "between" && (
                                    <TextField
                                        id="rateableB"
                                        type="number"
                                        fullWidth
                                        size="small"
                                        placeholder="and Value"
                                        value={form.rateableB}
                                        onChange={(e) => setField("rateableB")(e.target.value)}
                                    />
                                )}
                            </Box>
                        </Grid>

                        {/* Capital (same pattern as Rateable) */}
                        <Grid item xs={12} md={4}>
                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: {
                                        xs: "100%",
                                        sm: form.capitalOp === "between"
                                            ? "30% 30% 30%" // Operator + A + B
                                            : "55% 40%",   // Operator + A
                                        md: form.capitalOp === "between"
                                            ? "35% 30% 30%"
                                            : "55% 40%",
                                    },
                                    gap: 2,
                                    alignItems: "center",
                                }}
                            >
                                {/* Operator */}
                                <TextField
                                    id="capitalOp"
                                    select
                                    fullWidth
                                    size="small"
                                    label="Capital Value"
                                    value={form.capitalOp || "capitalValue"}
                                    onChange={(e) => setField("capitalOp")(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AccountBalanceIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                >
                                    <MenuItem value="capitalValue" disabled>Capital Value</MenuItem>
                                    <MenuItem value="gt">More Than</MenuItem>
                                    <MenuItem value="lt">Less Than</MenuItem>
                                    <MenuItem value="between">Between</MenuItem>
                                </TextField>

                                {/* Value A */}
                                <TextField
                                    id="capitalA"
                                    type="number"
                                    fullWidth
                                    size="small"
                                    placeholder="Value"
                                    value={form.capitalA}
                                    onChange={(e) => setField("capitalA")(e.target.value)}
                                />

                                {/* Value B (only when between) */}
                                {form.capitalOp === "between" && (
                                    <TextField
                                        id="capitalB"
                                        type="number"
                                        fullWidth
                                        size="small"
                                        placeholder="and Value"
                                        value={form.capitalB}
                                        onChange={(e) => setField("capitalB")(e.target.value)}
                                    />
                                )}
                            </Box>
                        </Grid>

                        {/* Tax Defaulter */}
                        <Grid sx={{
                            flexBasis: { xs: "100%", sm: "50%", md: "16%" },
                            maxWidth: { xs: "100%", sm: "50%", md: "16%" },
                        }}>
                            <TextField
                                id="taxDefSelect"
                                select
                                fullwidth
                                size="small"
                                label="Tax Defaulter"
                                value={form.taxDefaulter || "taxdefaulter"}
                                onChange={(e) => setField("taxDefaulter")(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <CurrencyRupeeIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            >
                                <MenuItem value="taxdefaulter" disabled>Tax Defaulter</MenuItem>
                                <MenuItem value="top100">TOP 100</MenuItem>
                                <MenuItem value="top200">Top 200</MenuItem>
                                <MenuItem value="top500">Top 500</MenuItem>
                                <MenuItem value="top1000">Top 1000</MenuItem>
                                <MenuItem value="gt10000">Above 10,000</MenuItem>
                                <MenuItem value="gt50000">Above 50,000</MenuItem>
                                <MenuItem value="gt1lakh">Above 1 Lakh</MenuItem>
                                <MenuItem value="gt2lakh">More than 2 Lakh</MenuItem>
                            </TextField>
                        </Grid>
                    </Grid>

                </TabPanel>
                {children && (
                    <Box sx={{ mt: 2 }}>
                        {children}
                    </Box>
                )}
            </Box>

        </Box>

    );
}

export default PropertySearchTabs;
