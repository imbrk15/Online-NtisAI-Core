import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import "./index.css";
import App from "./App";
import theme from "./theme";

createRoot(document.getElementById("root")).render(
    <ThemeProvider theme={theme}>
        <CssBaseline />
    <StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
        </StrictMode>
    </ThemeProvider>
);
