import React, { useState } from "react";
import MasterDashboardHeader from "../../MasterDashboard/MasterDashboardHeader"
import MasterSidebar from "../../MasterLayout/MasterSideBar"
import MasterDashBoardFooter from "../../MasterDashboard/MasterDashBoardFooter"
import { sidebarMenu } from "../../MasterLayout/SidebarMenu"
import { FaIdBadge } from "react-icons/fa";
import FerfarTextField from "./FerfarTextField";
import FerfarSearchChips from "./FerfarSearchChips";
import FerfarCountCards from "./FerfarCountCards";
import FerfarChartZone from "./FerfarChartZone";
import FerfarZoneWise from "./FerfarHistoryCharts/FerfarZoneWise";
import FerfarPropertyTable from "./FerfarPropertyTable";

export default function FerfarHistoryMain() {
    const [filters, setFilters] = useState({
        zone: "",
        ward: "",
        propertyType: "",
        typeFilter: "",
        description: "",
    });

    // Tabs fields
    const [tabVals, setTabVals] = useState({
        upicId: "",
        propertyNo: "",
        oldPropertyNo: "",
        citySurvey: "",
        mobile: "",
        plotNo: "",
        wingFlat: "",
        societyName: "",
        shopBuildingName: "",
        address: "",
        occupierName: "",
        renterName: "",
        rateableOp: "",
        rateableA: "",
        rateableB: "",
        capitalOp: "",
        capitalA: "",
        capitalB: "",
        taxDefaulter: "",
    });

    // Live values for chips
    const combined = { ...filters, ...tabVals };

    // Snapshot used by the table (apply on Search/Reset)
    const [appliedFilters, setAppliedFilters] = useState({});
    // Table’s currently visible rows (for footer exports/SMS)
    const [visibleRows, setVisibleRows] = useState([]);

    // Chip clear
    const onClearChip = (key) => {
        if (key in filters) {
            setFilters((p) => ({ ...p, [key]: "" }));
        } else if (key === "rateable") {
            setTabVals((p) => ({
                ...p,
                rateableOp: "",
                rateableA: "",
                rateableB: "",
            }));
        } else if (key === "capital") {
            setTabVals((p) => ({ ...p, capitalOp: "", capitalA: "", capitalB: "" }));
        } else {
            setTabVals((p) => ({ ...p, [key]: "" }));
        }
    };

    // Buttons
    const handleSearch = () => setAppliedFilters(combined);
    const handleReset = () => {
        setFilters({
            zone: "",
            ward: "",
            propertyType: "",
            typeFilter: "",
            description: "",
        });
        setTabVals({
            upicId: "",
            propertyNo: "",
            oldPropertyNo: "",
            citySurvey: "",
            mobile: "",
            plotNo: "",
            wingFlat: "",
            societyName: "",
            shopBuildingName: "",
            address: "",
            occupierName: "",
            renterName: "",
            rateableOp: "",
            rateableA: "",
            rateableB: "",
            capitalOp: "",
            capitalA: "",
            capitalB: "",
            taxDefaulter: "",
        });
        setAppliedFilters({});
    };
    const tableRows = [
        { zone: "A", before: { current: 3000, pending: 400, total: 3400 }, after: { current: 3400, pending: 350, total: 3750 } },
        { zone: "B", before: { current: 2550, pending: 450, total: 3000 }, after: { current: 2500, pending: 350, total: 2850 } },
        { zone: "C", before: { current: 2200, pending: 100, total: 2300 }, after: { current: 2300, pending: 150, total: 2450 } },
    ];

    const derivedRows = tableRows.map(r => {
        const delta = r.after.total - r.before.total;
        const pct = (delta / r.before.total) * 100;
        return { ...r, change: { delta, pct } };
    });

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
        { before: { current: 0, pending: 0, total: 0 }, after: { current: 0, pending: 0, total: 0 } }
    );

    const overallDelta = totals.after.total - totals.before.total;
    const overallPct = (overallDelta / totals.before.total) * 100;

    const exportCSV = () => {
        const rows = [
            ["Zone", "Ward No", "Property No", "UPIC ID", "Before Owner Name", "After Owner Name"],
            ...visibleRows.map(r => [
                r.zone,
                r.ward,
                r.propertyNo,
                r.upic,
                r.before,
                r.after,
            ]),
            //["Grand Total", totals.before.current, totals.before.pending, totals.before.total, totals.after.current, totals.after.pending, totals.after.total, overallDelta, overallPct.toFixed(2)],
        ];
        const csv = rows.map(r => r.join(",")).join("\n");
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "wadhghat-zone-wise.csv";
        a.click();
    };
    // get current date & time
    const now = new Date();

    // format as dd/mm/yyyy, hh:mm:ss am/pm
    const formatted = now.toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
    });
    const [selectedZone, setSelectedZone] = useState("All Zones");

    return (
        <div className="h-screen flex flex-col">
            {/* Header + Sidebar */}
            <MasterDashboardHeader />
            {/*<MasterDashboardSidebar basePath="/propertyTax" />*/}
            <MasterSidebar
                basePath="/ferfarHistory"
                header="Menu"
                headerIcon={FaIdBadge}
                items={sidebarMenu("/propertyTax")}
            />
            {/* Main Content */}
            <main className="pt-16 h-[calc(100vh-64px)] overflow-y-auto pb-14 md:pb-16 transition-[margin] duration-300 flex flex-col box-border"
                style={{
                    marginLeft: "var(--sidebar-w, 50px)",
                }}>
                <div className="p-4 md:p-4 ">
                    {/* Heading */}
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-4 bg-[#dff1ff] rounded-xl px-4 py-0">

                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 relative inline-block p-2   ">
                            Ferfar History &mdash; <span className="text-slate-600">Owner Name Changes</span>
                            <span className="block h-1 bg-blue-400 mt-1 w-full"></span>
                        </h1>
                        <p className="text-xs md:text-sm text-slate-500 mt-1 p-2">
                            View <b>Before</b> vs <b>After</b>, owner names, filter by location/IDs, and see zone-wise change counts.
                        </p>


                        <div className="text-md text-slate-700 md:text-right bg-[#f2f9c8] border border-gray-300 m-2 px-3 py-1 rounded-xl">
                            Last refresh: <span className="font-medium">{formatted}</span>
                        </div>
                    </div>
                    {/*<div className="h-3" />*/}
                    <div className="relative mt-4 rounded-2xl border border-[#e6eef5] bg-white p-4 md:p-5 shadow-[0_20px_45px_rgba(28,55,90,.08),0_4px_12px_rgba(28,55,90,.06)]">
                        {/* soft top glow */}
                        <div className="pointer-events-none absolute left-0 right-0 top-0 h-16 rounded-t-2xl bg-gradient-to-b from-white/95 to-transparent" />

                        {/* Filters row */}
                        <div className="space-y-4">
                            {/*<PropertySearchTextField values={filters} onChange={setFilters} />*/}
                            <FerfarTextField values={{ ...filters, ...tabVals }} onChange={(next) => {
                                const filterKeys = ["zone", "ward", "propertyType", "typeFilter", "description"];
                                const nextFilters = {};
                                const nextTabs = { ...next };
                                for (const k of filterKeys) {
                                    nextFilters[k] = next[k] ?? "";
                                    delete nextTabs[k];
                                }
                                setFilters(nextFilters);
                                setTabVals(nextTabs);
                            }}

                                exportCSV={exportCSV} onSearch={handleSearch}
                                onReset={handleReset}>
                                <FerfarSearchChips values={combined} onClear={onClearChip} />
                            </FerfarTextField>
                            {/*<FerfarHistoryAction/>*/}
                        </div>
                    </div>
                    <div className="h-2" />
                    <FerfarCountCards totals={totals} overallDelta={overallDelta} overallPct={overallPct} />
                    {/*<div className="h-2" />*/}
                    <FerfarChartZone selectedZone={selectedZone}
                        onZoneChange={setSelectedZone} />
                    <div className="h-2" />
                    <FerfarZoneWise selectedZone={selectedZone} />
                    <div className="h-5" />
                    <FerfarPropertyTable filters={appliedFilters} onRowsChange={setVisibleRows} />
                </div>
            </main>
            <div
                style={{
                    marginLeft: "var(--sidebar-w, 50px)",
                    width: "calc(100% - var(--sidebar-w, 50px))",
                }}
            >
                <MasterDashBoardFooter />
            </div>
        </div>
    );
}