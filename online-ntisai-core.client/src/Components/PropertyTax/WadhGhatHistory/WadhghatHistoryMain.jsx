


import React, { useState, useEffect, useMemo } from "react";
import MasterdashboardHeader from "../../MasterDashboard/MasterDashboardHeader";
import MasterDashBoardFooter from "../../MasterDashboard/MasterDashBoardFooter";
import WadhghatTextfield from "./WadhghatTextfield";
import WadhghatCountCards from "./WadhghatCountCards";
import WadhghatPropertyTable from "./WadhghatPropertyTable";
import WadhghatZoneWise from "./wadhghatCharts/WadhghatZoneWise";
import MasterSidebar from "../../MasterLayout/MasterSideBar";
import { sidebarMenu } from "../../MasterLayout/SidebarMenu";

export default function WadhghatHistoryMain() {
    // 🔹 All table rows (zone-wise summary)
    const tableRows = [
        {
            zone: "Kalwa",
            before: { current: 3000, pending: 400, total: 3400 },
            after: { current: 3400, pending: 350, total: 3750 },
        },
        {
            zone: "Mumbra",
            before: { current: 2550, pending: 450, total: 3000 },
            after: { current: 2500, pending: 350, total: 2850 },
        },
        {
            zone: "Diva",
            before: { current: 2200, pending: 100, total: 2300 },
            after: { current: 2300, pending: 150, total: 2450 },
        },
    ];

    // 🔹 State for form input and active filter
    const [searchQuery, setSearchQuery] = useState("");
    const [filterForm, setFilterForm] = useState({
        zone: "",
        ward: "",
        propertyNo: "",
        upicId: "",
    });
    const [activeFilters, setActiveFilters] = useState({
        zone: "",
        ward: "",
        propertyNo: "",
        upicId: "",
    });

    // 🆕 State to hold the data from WadhghatPropertyTable
    const [propertyTableData, setPropertyTableData] = useState([]);

    // 🔹 Derived + Filtered rows for zone-wise summary table
    const derivedRows = useMemo(() => {
        const base = tableRows.map((r) => {
            const delta = r.after.total - r.before.total;
            const pct = (delta / r.before.total) * 100;
            return { ...r, change: { delta, pct } };
        });

        if (!searchQuery.trim()) return base;

        return base.filter((r) =>
            r.zone.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery]);

    // 🔹 Totals for zone-wise summary
    const totals = derivedRows.reduce(
        (acc, r) => {
            acc.before.current += r.before.current;
            acc.before.pending += r.before.pending;
            acc.before.total += r.before.total;
            acc.after.current += r.after.current;
            acc.after.pending += r.after.pending;
            acc.after.total += r.after.total;
            return acc;
        },
        {
            before: { current: 0, pending: 0, total: 0 },
            after: { current: 0, pending: 0, total: 0 },
        }
    );

    const overallDelta = totals.after.total - totals.before.total;
    const overallPct = totals.before.total ? (overallDelta / totals.before.total) * 100 : 0;



    ////Export CSV 3
    const exportCSV = () => {
        // Calculate row data with totals
        const rowsToExport = propertyTableData.map(p => ({
            ...p,
            beforeTotal: p.before.current + p.before.pending,
            afterTotal: p.after.current + p.after.pending,
            delta: (p.after.current + p.after.pending) - (p.before.current + p.before.pending),
        }));

        // Calculate totals for the footer
        const totals = rowsToExport.reduce(
            (acc, curr) => ({
                before: {
                    current: acc.before.current + curr.before.current,
                    pending: acc.before.pending + curr.before.pending,
                    total: acc.before.total + (curr.before.current + curr.before.pending),
                },
                after: {
                    current: acc.after.current + curr.after.current,
                    pending: acc.after.pending + curr.after.pending,
                    total: acc.after.total + (curr.after.current + curr.after.pending),
                },
                delta: acc.delta + curr.delta,
            }),
            {
                before: { current: 0, pending: 0, total: 0 },
                after: { current: 0, pending: 0, total: 0 },
                delta: 0,
            }
        );

        // Define the two-row header
        const header1 = ["Zone", "Before Change", "", "", "After Change", "", "", "Change in Total", ""];
        const header2 = ["", "Current", "Pending", "Total", "Current", "Pending", "Total", "Δ (₹)", "Δ (%)"];

        // Format data rows with percentage values as strings with the '%' sign
        const csvRows = rowsToExport.map((p) => {
            const pct = p.beforeTotal > 0 ? (p.delta / p.beforeTotal) * 100 : 0;
            return [
                p.zone,
                p.before.current,
                p.before.pending,
                p.beforeTotal,
                p.after.current,
                p.after.pending,
                p.afterTotal,
                p.delta,
                // Include the '%' sign as part of the string to force its display
                `${pct.toFixed(2)}%`,
            ];
        });

        // Create the total row
        const totalPct = totals.before.total > 0 ? (totals.delta / totals.before.total) * 100 : 0;
        const totalRow = [
            " Grand Total:",
            totals.before.current,
            totals.before.pending,
            totals.before.total,
            totals.after.current,
            totals.after.pending,
            totals.after.total,
            totals.delta,
            // Include the '%' sign for the total row as well
            `${totalPct.toFixed(2)}%`,
        ];

        // Build the CSV content
        const headerRows = [
            header1.map(h => (h ? `"${h}"` : "")).join(","),
            header2.map(h => (h ? `"${h}"` : "")).join(","),
        ].join("\n");

        const csvDataRows = csvRows.map(r => r.join(",")).join("\n");
        const csvTotalRow = totalRow.join(",");

        const csv = `${headerRows}\n${csvDataRows}\n${csvTotalRow}`;

        // Create and download the file with BOM for UTF-8 compatibility
        const BOM = "\uFEFF";
        const blob = new Blob([BOM + csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "wadhghat-properties.csv";
        a.click();
    };

    // 🔹 Last refresh time
    const [lastRefresh, setLastRefresh] = useState("");
    const getCurrentDateTime = () => {
        const now = new Date();
        return now.toLocaleString("en-GB", {
            day: "numeric",
            month: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: true,
        });
    };

    useEffect(() => {
        setLastRefresh(getCurrentDateTime());
    }, []);

    // 🔹 Handle form input changes (but don’t filter yet)
    const handleFilterChange = (form) => {
        setFilterForm(form);
    };

    return (
        <div className="h-screen flex flex-col">
            {/* Header + Sidebar */}
            <MasterdashboardHeader />
            <MasterSidebar
                title="Menu"
                basePath="/propertyTax"
                items={sidebarMenu("/propertyTax")}
                backPath="/"
                backLabel="Back to Home"
            />

            {/* Main Content */}
            <main
                className="pt-16 h-[calc(100vh-64px)] overflow-y-auto pb-14 md:pb-16 transition-[margin] duration-300 flex flex-col"
                style={{
                    marginLeft: "var(--sidebar-w, 64px)",
                }}
            >
                <div className="p-4 md:p-5">
                    {/* Heading */}
                    <div className="flex flex-col rounded-2xl md:flex-row md:items-center gap-2 md:gap-4 pb-4 p-3 bg-[#dff1ff] border-b border-gray-300 mb-4">
                        <div className="flex-1">
                            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
                                WadhGhat History —{" "}
                                <span className="text-slate-600">Zone-wise</span>
                            </h1>
                            <p className="text-xs md:text-sm text-slate-500 mt-1">
                                Compare Current, Pending, and Total Demand <b>Before</b> vs{" "}
                                <b>After</b>, with Δ and Δ%.
                            </p>
                        </div>
                        {/*<div className="text-md text-slate-700 md:text-right bg-[#f2f9c8]] border border-blue-300 px-3 py-1 rounded-xl">*/}
                        <div className="text-md text-slate-700 md:text-right bg-[#f2f9c8] border border-gray-300 m-2 px-3 py-1 rounded-xl">
                            Last refresh: <span className="font-medium">{lastRefresh}</span>
                        </div>
                    </div>

                    {/* Filters (Search + Reset + Export) */}
                    <WadhghatTextfield
                        exportCSV={exportCSV}
                        onChange={handleFilterChange}
                        onSearch={() => setActiveFilters(filterForm)}
                        onReset={() => {
                            setFilterForm({ zone: "", ward: "", propertyNo: "", upicId: "" });
                            setActiveFilters({ zone: "", ward: "", propertyNo: "", upicId: "" });
                        }}
                    />

                    <div className="h-4" />

                    {/* Stat Cards */}
                    <WadhghatCountCards
                        totals={totals}
                        overallDelta={overallDelta}
                        overallPct={overallPct}
                    />

                    <div className="h-4" />

                    {/* Table: Use activeFilters and pass a callback for data */}
                    <WadhghatPropertyTable
                        filterForm={activeFilters}
                        derivedRows={derivedRows}
                        onDataChange={setPropertyTableData} // 🆕 New prop to receive data
                    />

                    <div className="h-4" />

                    {/* Chart */}
                    <WadhghatZoneWise derivedRows={derivedRows} />

                    <div className="h-6" />

                    {/* Footer */}
                </div>
            </main>
            <MasterDashBoardFooter />
        </div>
    );
}
