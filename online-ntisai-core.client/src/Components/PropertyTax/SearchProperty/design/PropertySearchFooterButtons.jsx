import React, { useMemo } from "react";
import { Box, Stack, Button, Grid } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import SmsIcon from "@mui/icons-material/Sms";

/**
 * Props:
 *  - rows: array of *visible* rows from the table (same keys as the table columns)
 *  - filenameBase?: string (default "properties")
 *  - smsField?: string (default "mobile")
 */
export default function PropertySearchFooterButtons({
    rows = [],
    filenameBase = "properties",
    smsField = "mobile",
}) {
    const hasRows = rows && rows.length > 0;

    const headers = useMemo(() => (hasRows ? Object.keys(rows[0]) : []), [hasRows, rows]);

    const exportToExcel = () => {
        if (!hasRows) return;
        const escape = (s) => `"${String(s ?? "").replace(/"/g, '""')}"`;

        // UTF-8 BOM so Excel renders Unicode (e.g., Marathi) correctly
        const bom = "\uFEFF";
        const csv = [
            headers.join(","),
            ...rows.map((r) => headers.map((h) => escape(r[h])).join(",")),
        ].join("\n");

        const blob = new Blob([bom + csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${filenameBase}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const exportToPDF = () => {
        if (!hasRows) return;

        const escapeHtml = (s) =>
            String(s ?? "")
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#39;");

        const head = headers.map((h) => `<th>${escapeHtml(h)}</th>`).join("");
        const body = rows
            .map(
                (r) =>
                    `<tr>${headers.map((h) => `<td>${escapeHtml(r[h])}</td>`).join("")}</tr>`
            )
            .join("");

        const html = `
      <html>
        <head>
          <title>${filenameBase}</title>
          <meta charset="utf-8" />
          <style>
            body { font-family: Arial, sans-serif; padding: 16px; }
            h2 { margin: 0 0 12px; }
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #999; padding: 6px 8px; font-size: 12px; }
            th { background: #f3f3f3; text-align: left; }
          </style>
        </head>
        <body>
          <h2>${filenameBase}</h2>
          <table>
            <thead><tr>${head}</tr></thead>
            <tbody>${body}</tbody>
          </table>
          <script>window.onload = () => window.print();</script>
        </body>
      </html>
    `;
        const w = window.open("", "_blank");
        if (w) {
            w.document.open();
            w.document.write(html);
            w.document.close();
        }
    };

    const sendSMS = async () => {
        if (!hasRows) return;

        // Gather unique mobile numbers from the provided rows
        const uniq = Array.from(
            new Set(
                rows
                    .map((r) => String(r[smsField] ?? ""))
                    .map((s) => s.replace(/[^\d+]/g, "").trim()) // keep digits and +
                    .filter(Boolean)
            )
        );

        if (uniq.length === 0) {
            alert("No mobile numbers found in the visible rows.");
            return;
        }

        // Most platforms only support 1 number reliably with sms: links.
        const first = uniq[0];
        const smsUrl = `sms:${first}`;

        // Try to open SMS app; fallback to copying numbers
        const opened = window.open(smsUrl);
        if (!opened && navigator.clipboard) {
            await navigator.clipboard.writeText(uniq.join(","));
            alert("Numbers copied to clipboard:\n" + uniq.join(", "));
        } else if (!opened) {
            alert("SMS link couldn't be opened. Numbers:\n" + uniq.join(", "));
        }
    };

    return (
        <Box sx={{ mt: { xs: 2, md: 3 } }} >
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} sm="auto" >
                    <Button id="btnExportExcel" variant="contained" style={{ width: "180px" }} startIcon={<FileDownloadIcon />} onClick={exportToExcel}>
                        Export to Excel
                    </Button>
                </Grid>
                <Grid item xs={12} sm="auto" >
                    <Button id="btnExportPDF" variant="contained" style={{ width: "180px" }} startIcon={<PictureAsPdfIcon />} onClick={exportToPDF}>
                        Export to PDF
                    </Button>
                </Grid>
                <Grid item xs={12} sm="auto" >
                    <Button id="btnSendSMS" variant="contained" style={{ width: "180px" }} startIcon={<SmsIcon />} onClick={sendSMS}>
                        Send SMS
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}
