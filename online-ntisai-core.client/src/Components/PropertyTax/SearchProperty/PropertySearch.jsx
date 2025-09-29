import React from "react";
import { useState } from "react";
import "./css/PropertySearchTheme.css";
import PropertySearchCards from "./design/PropertySearchCards";
import PropertySearchTextField from "./design/PropertySearchTextField";
import PropertySearchTabs from "./design/PropertySearchTabs";
import PropertySearchChips from "./design/PropertySearchChips";
import PropertySearchActions from "./design/PropertySearchActions";
import PropertySearchTable from "./design/PropertySearchTable";
import PropertySearchFooterButtons from "./design/PropertySearchFooterButtons";
function PropertySearch({
    stats = { old: 10, numbering: 10, survey: 10, entry: 3, qc: 4, notice: 3 },
}) {
    // Top selects
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

    return (
        <div className="relative min-h-screen overflow-x-hidden bg-[linear-gradient(135deg,#eef2f7_0%,#f8fbff_100%)]">
            <main className="w-full px-4 md:px-6 py-6 pb-0 transition-[margin,width] duration-300 ease-in-out">
                {/* Page heading */}
                <h1 className="mb-4 flex items-center justify-center gap-3 text-[2.2rem] font-extrabold text-[#004479]">
                    <img
                        src="https://img.icons8.com/color/48/000000/building.png"
                        alt="Logo"
                        className="w-[45px] h-[45px]"
                    />
                    <span className="bg-gradient-to-tr from-[#004479] to-[#0085bf] bg-clip-text text-transparent">
                        Property Search
                    </span>
                </h1>

                {/* Stat cards */}
                <PropertySearchCards stats={stats} />

                {/* Big white background card */}
                <section className="relative mt-3 rounded-2xl border border-[#e6eef5] bg-white p-4 md:p-5 shadow-[0_20px_45px_rgba(28,55,90,.08),0_4px_12px_rgba(28,55,90,.06)]">
                    {/* soft top glow */}
                    <div className="pointer-events-none absolute left-0 right-0 top-0 h-16 rounded-t-2xl bg-gradient-to-b from-white/95 to-transparent" />

                    {/* Filters row */}
                    <div className="space-y-4">
                        <PropertySearchTextField values={filters} onChange={setFilters} />
                    </div>

                    {/* Tabs + Chips */}

                    <div className="mt-3 space-y-3 pb-1 pt-0">
                        <PropertySearchTabs values={tabVals} onChange={setTabVals} >
                            <PropertySearchChips values={combined} onClear={onClearChip} />
                        </PropertySearchTabs>
                    </div>

                    {/* Search / Reset (single clean divider above) */}
                    <PropertySearchActions
                        onSearch={handleSearch}
                        onReset={handleReset}
                        filters={combined}
                    />

                    {/* Table (own horizontal scroll if needed) */}
                    <div className="mt-2 rounded-xl shadow overflow-hidden">
                        <div className="max-w-full overflow-x-auto">
                            <PropertySearchTable
                                filters={appliedFilters}
                                onRowsChange={setVisibleRows}
                            />
                        </div>
                    </div>

                    {/* Footer export buttons */}
                </section>
                <div className="mt-4">
                    <PropertySearchFooterButtons rows={visibleRows} />
                </div>
            </main>
        </div>
    );
}

export default PropertySearch;
