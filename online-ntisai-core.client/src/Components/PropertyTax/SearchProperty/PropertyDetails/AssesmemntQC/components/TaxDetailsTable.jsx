import React from 'react';

const TaxDetailsTable = () => {
    const tableData = [
        {
            rv: "479",
            propTax: "165436",
            exuTax: "57218",
            empTax: "14304",
            tree: "4795",
            spExuTax: "0",
            sanitation: "220",
            drainCess: "0",
            spWaterC: "0",
            roadCess: "14382",
            fireCess: "0",
            lightCe: "5830",
            watBer: "23970",
            mBuild: "0",
            sewage: "23970",
            waterB: "0",
            tax1: "0",
            tax2: "0"
        }
    ];

    return (
        <div className="mt-1">
            <div className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                {/* Table Container with horizontal scroll */}
                <div className="overflow-x-auto scrollbar-corporate">
                    <table className="w-full text-[11px]">
                        <thead>
                            <tr className="bg-[#F5F9FF] border-b border-gray-300">
                                <th className="px-1 py-1 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[40px]">
                                    RV
                                </th>
                                <th className="px-1 py-1 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[50px]">
                                    PropTax
                                </th>
                                <th className="px-1 py-1 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[50px]">
                                    ExuTax
                                </th>
                                <th className="px-1 py-1 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[50px]">
                                    EmpTax
                                </th>
                                <th className="px-1 py-1 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[40px]">
                                    Tree
                                </th>
                                <th className="px-1 py-1 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[55px]">
                                    SpExuTax
                                </th>
                                <th className="px-1 py-1 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[55px]">
                                    Sanitation
                                </th>
                                <th className="px-1 py-1 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[55px]">
                                    DrainCess
                                </th>
                                <th className="px-1 py-1 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[55px]">
                                    SpWaterC
                                </th>
                                <th className="px-1 py-1 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[55px]">
                                    RoadCess
                                </th>
                                <th className="px-1 py-1 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[50px]">
                                    FireCess
                                </th>
                                <th className="px-1 py-1 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[50px]">
                                    LightCe
                                </th>
                                <th className="px-1 py-1 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[50px]">
                                    WatBer
                                </th>
                                <th className="px-1 py-1 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[50px]">
                                    MBuild
                                </th>
                                <th className="px-1 py-1 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[50px]">
                                    Sewage
                                </th>
                                <th className="px-1 py-1 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[50px]">
                                    WaterB
                                </th>
                                <th className="px-1 py-1 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[40px]">
                                    Tax1
                                </th>
                                <th className="px-1 py-1 text-left font-semibold text-gray-700 min-w-[40px]">
                                    Tax2
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((row, index) => (
                                <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="px-1 py-1 border-r border-gray-200 text-gray-800 text-right">{row.rv}</td>
                                    <td className="px-1 py-1 border-r border-gray-200 text-gray-800 text-right">{row.propTax}</td>
                                    <td className="px-1 py-1 border-r border-gray-200 text-gray-800 text-right">{row.exuTax}</td>
                                    <td className="px-1 py-1 border-r border-gray-200 text-gray-800 text-right">{row.empTax}</td>
                                    <td className="px-1 py-1 border-r border-gray-200 text-gray-800 text-right">{row.tree}</td>
                                    <td className="px-1 py-1 border-r border-gray-200 text-gray-800 text-right">{row.spExuTax}</td>
                                    <td className="px-1 py-1 border-r border-gray-200 text-gray-800 text-right">{row.sanitation}</td>
                                    <td className="px-1 py-1 border-r border-gray-200 text-gray-800 text-right">{row.drainCess}</td>
                                    <td className="px-1 py-1 border-r border-gray-200 text-gray-800 text-right">{row.spWaterC}</td>
                                    <td className="px-1 py-1 border-r border-gray-200 text-gray-800 text-right">{row.roadCess}</td>
                                    <td className="px-1 py-1 border-r border-gray-200 text-gray-800 text-right">{row.fireCess}</td>
                                    <td className="px-1 py-1 border-r border-gray-200 text-gray-800 text-right">{row.lightCe}</td>
                                    <td className="px-1 py-1 border-r border-gray-200 text-gray-800 text-right">{row.watBer}</td>
                                    <td className="px-1 py-1 border-r border-gray-200 text-gray-800 text-right">{row.mBuild}</td>
                                    <td className="px-1 py-1 border-r border-gray-200 text-gray-800 text-right">{row.sewage}</td>
                                    <td className="px-1 py-1 border-r border-gray-200 text-gray-800 text-right">{row.waterB}</td>
                                    <td className="px-1 py-1 border-r border-gray-200 text-gray-800 text-right">{row.tax1}</td>
                                    <td className="px-1 py-1 text-gray-800 text-right">{row.tax2}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TaxDetailsTable;