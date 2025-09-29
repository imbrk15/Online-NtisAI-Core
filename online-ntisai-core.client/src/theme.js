import { createTheme } from "@mui/material/styles";

const devanagariFontStack =
    "Mukta, 'Noto Sans Devanagari', Mangal, 'Nirmala UI', 'Kohinoor Devanagari', Roboto, Arial, sans-serif";

const theme = createTheme({
    typography: {
        fontFamily: devanagariFontStack, // global default for all Typography
    },
    components: {
        // make sure everything (including portal menus) inherits the font
        MuiCssBaseline: {
            styleOverrides: {
                "html, body": { fontFamily: devanagariFontStack },
            },
        },
        // Explicitly enforce on menu internals
        MuiMenuItem: {
            styleOverrides: {
                root: { fontFamily: devanagariFontStack },
            },
        },
        MuiListItemText: {
            styleOverrides: {
                root: { "& .MuiTypography-root": { fontFamily: devanagariFontStack } },
            },
        },
        // Inputs/selects
        MuiInputBase: {
            styleOverrides: {
                input: { fontFamily: devanagariFontStack },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                input: { fontFamily: devanagariFontStack },
            },
        },
        MuiSelect: {
            styleOverrides: {
                select: { fontFamily: devanagariFontStack },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: { fontFamily: devanagariFontStack },
            },
        },
    },
});

export default theme;
