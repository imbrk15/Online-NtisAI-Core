// src/Components/PropertyTax/Master/CVMaster/ZoneMaster/ZoneMasterMain.jsx
import * as React from "react";
import {
    Box,
    Grid,
    Typography,
    Tabs,
    Tab,
    Divider,
    tabsClasses,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ZoneTabMain from "./ZoneTab/ZoneTabMain";
import ZoneSectionTabMain from "./ZoneSectionTab/ZoneSectionTabMain";

const BORDER = "#cbd5e1";      // slate-300
const BG_BAR = "#f8fafc";      // light bar behind inactive tabs

const NavTabs = styled(Tabs)(({ theme }) => ({
    minHeight: 0,
    [`& .${tabsClasses.indicator}`]: { display: "none" },
    [`& .${tabsClasses.flexContainer}`]: { gap: 6 },
}));
const NavTab = styled(Tab)(({ theme }) => ({
    textTransform: "none",
    minHeight: 0,
    height: 36,
    padding: "8px 14px",
    fontWeight: 700,
    fontSize: 13.5,
    color: theme.palette.text.secondary,
    border: `1px solid ${BORDER}`,
    borderBottomColor: BORDER,
    backgroundColor: BG_BAR,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginRight: 6,
    marginBottom: -1,
    "&:hover": { backgroundColor: "#f1f5f9" },
    "&.Mui-selected": {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.common.white,
        borderColor: BORDER,
        borderBottom: "0 !important",
        boxShadow: "inset 0 -1px 0 #fff",
    },
}));
export default function ZoneMasterMain({ selectedAssessmentMaster }) {
    const [tab, setTab] = React.useState("zone");
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Grid container justifyContent="center" sx={{ px: { xs: 0, sm: 2, md: 4 } }}>
            {selectedAssessmentMaster === "zoneMaster" && (
                <Box sx={{ width: "100%" }}>
                    {/* Header */}
                    <Box
                        className="rounded-xl"
                        sx={{
                            mb: 2,
                            px: { xs: 1, sm: 2, md: 3 },
                            py: { xs: 1, sm: 2, md: 2.5 },
                            background: "#f2f7ff",
                            textAlign: "center",
                        }}
                    >
                        <Typography
                            variant="h4"
                            sx={{ fontWeight: 800, fontSize: { xs: 18, sm: 20, md: 24 } }}
                        >
                            Zone Master
                        </Typography>
                    </Box>

                    {/* Tabs + content */}
                    <Box>
                        <NavTabs
                            value={tab}
                            onChange={(_, v) => setTab(v)}
                            variant={isMobile ? "scrollable" : "standard"} // ✅ responsive tabs
                            scrollButtons={isMobile ? "auto" : false}
                            allowScrollButtonsMobile
                        >
                            <NavTab value="zone" label="Zone Master" />
                            <NavTab value="section" label="Zone Section Master" />
                        </NavTabs>

                        <Divider sx={{ borderColor: BORDER }} />

                        <Box
                            sx={{
                                p: { xs: 0, sm: 2, md: 3 }, // ✅ responsive padding
                                borderTop: 0,
                                bgcolor: "white",
                                overflow: "hidden",
                                mt: 1,
                                boxShadow:
                                    "0 1px 1px rgba(0,0,0,0.02), 0 2px 4px rgba(0,0,0,0.02), 0 8px 16px rgba(0,0,0,0.02)",
                            }}
                        >
                            {tab === "zone" ? <ZoneTabMain /> : <ZoneSectionTabMain />}
                        </Box>
                    </Box>
                </Box>
            )}
        </Grid>
    );
}
