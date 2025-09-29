import React from "react";

const TaxDetails = () => {
    const factorsHeaders = [
        "ID",
        "Base Value",
        "Floor Factor ",
        "Floor Factor Value",
        "Age Factor",
        " Age Value ",
        "Con Type Factor",
        "Con Type Value ",
        "Use Factor",
        "Use Value",
        "Final Capital Value",
    ];

    const factorsData = [
        {
            id: "1",
            baseValue: "4,64,650",
            floorFactor: "1.10",
            floorFactorValue: "4,64,650",
            ageFactor: "0.90",
            ageValue: "4,18,185",
            conTypeFactor: "0.80",
            conTypeValue: "3,34,552",
            useFactor: "0.50",
            useValue: "1,63,274",
            finalCapitalValue: "1,63,274",
        },
        {
            id: "2",
            baseValue: "75,00,000",
            floorFactor: "1.50",
            floorFactorValue: "1,12,50,000",
            ageFactor: "0.90",
            ageValue: "1,01,25,000",
            conTypeFactor: "1.05",
            conTypeValue: "1,06,31,250",
            useFactor: "1.00",
            useValue: "1,06,31,250",
            finalCapitalValue: "1,06,31,250",
        },
    ];

    // Define headers with both key and label
    const taxHeaders = [
        { key: "taxes", label: "Taxes" },
        { key: "GeneralTax", label: "General Tax" },
        { key: "WaterTax", label: "Water Tax" },
        { key: "WaterBenefitTax", label: "Water Benefit Tax" },
        { key: "SewerageTax", label: "Sewerage Tax" },
        { key: "SpEduTax", label: "Sp. Edu. Tax" },
        { key: "Employee", label: "Employee" },
        { key: "Tree", label: "Tree" },
        { key: "Fire", label: "Fire" },
        { key: "Light", label: "Light" },
        { key: "Drain", label: "Drain" },
        { key: "TotalTax", label: "Total Tax" },
    ];

    const taxData = [
        {
            taxes: "Residential (%)",
            GeneralTax: 0.110,
            WaterTax: 0.253,
            WaterBenefitTax: 0.069,
            SewerageTax: 0.163,
            SpEduTax: 0.043,
            Employee: 0.010,
            Tree: 0.002,
            Fire: 0.110,
            Light: 0.035,
            Drain: 0.040,
            TotalTax: 0.78,
        },
        {
            taxes: "Commercial (%)",
            GeneralTax: 0.270,
            WaterTax: 0.620,
            WaterBenefitTax: 0.170,
            SewerageTax: 0.400,
            SpEduTax: 0.105,
            Employee: 0.100,
            Tree: 0.080,
            Fire: 0.020,
            Light: 0.005,
            Drain: 0.130,
            TotalTax: 1.9,
        },
        { taxes: "Net" },
        { taxes: "Retain" },
        { taxes: "Hearing" },
        { taxes: "App. Comi." },
        { taxes: "Remission" },
    ];

    return (
        <div>
            <div className="bg-white shadow-md rounded-md border border-gray-300">
                {/* ✅ Factors Calculation Table */}
                <div className="overflow-x-auto mb-3">
                    <div className="bg-[#40648a] text-white px-4 py-2 rounded-t-md text-center font-semibold">
                        Factors Calculation
                    </div>
                    <table className="w-full border border-gray-300 text-sm">
                        <thead style={{ backgroundColor: "#d9e3ec", color: "black" }}>
                            <tr>
                                {factorsHeaders.map((col) => (
                                    <th
                                        key={col}
                                        className="border border-gray-300 px-3 py-2 text-left font-bold"
                                    >
                                        {col}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {factorsData.map((row, idx) => (
                                <tr key={idx} className="odd:bg-white even:bg-gray-50">
                                    {Object.values(row).map((val, i) => (
                                        <td key={i} className="border border-gray-300 px-3 py-2">
                                            {val}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* ✅ Tax Details Table */}
                <div className="mt-2">
                    <div className="bg-[#40648a] text-white px-4 py-2 rounded-t-md text-center font-semibold">
                        Tax Details
                    </div>
                    <table className="table-fixed border border-gray-300 text-xs w-full">
                        <thead style={{ backgroundColor: "#d9e3ec", color: "black" }}>
                            <tr>
                                {taxHeaders.map((col, idx) => (
                                    <th
                                        key={idx}
                                        className="border border-gray-300 px-1 py-0.5 truncate font-bold"
                                        style={{ width: `${100 / taxHeaders.length}%` }}
                                    >
                                        {col.label}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {taxData.map((row, rowIdx) => (
                                <tr key={rowIdx} className="odd:bg-white even:bg-gray-50">
                                    {taxHeaders.map((header, colIdx) => (
                                        <td
                                            key={colIdx}
                                            className="border border-gray-300 px-1 py-0.5 text-center truncate"
                                        >
                                            {row[header.key] ?? ""}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    );
};

export default TaxDetails;
