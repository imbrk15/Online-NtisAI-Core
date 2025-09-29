import React from 'react';

const PropertyTaxDetailsTable = () => {

    // Sample data for Property Tax Details
    const tableData = [
        {
            rv: "45000",
            propTax: "2250",
            eduTax: "225",
            empTax: "450",
            tree: "100",
            spEduTa: "150",
            sanitati: "350",
            drainCes: "275",
            spWaterC: "200",
            roadCes: "180",
            fireCes: "120",
            lightCe: "300",
            watBer: "250",
            mBuild: "500",
            sewage: "180",
            waterB: "320",
            tax1: "150",
            tax2: "100"
        },
    ];

    // Show only first 2 rows
    const displayedData = tableData.slice(0, 2);

    return (
        <div className="w-full mt-1">
            <div className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                
                {/* Table Container with horizontal scroll */}
                <div className="overflow-x-auto scrollbar-corporate">
                    <table className="w-full text-[11px]">
                        <thead>
                            <tr className="bg-[#F5F9FF] border-b border-gray-300">
                                <th className="px-1 py-1 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[40px]">RV</th>
                                <th className="px-1 py-1 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[50px]">PropTax</th>
                                <th className="px-1 py-1 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[50px]">EduTax</th>
                                <th className="px-1 py-1 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[50px]">EmpTax</th>
                                <th className="px-1 py-1 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[40px]">Tree</th>
                                <th className="px-1 py-1 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[50px]">SpEduTa</th>
                                <th className="px-1 py-1 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[50px]">Sanitati</th>
                                <th className="px-1 py-1 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[50px]">DrainCes</th>
                                <th className="px-1 py-1 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[55px]">SpWaterC</th>
                                <th className="px-1 py-1 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[50px]">RoadCes</th>
                                <th className="px-1 py-1 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[50px]">FireCes</th>
                                <th className="px-1 py-1 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[50px]">LightCe</th>
                                <th className="px-1 py-1 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[50px]">WatBer</th>
                                <th className="px-1 py-1 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[50px]">MBuild</th>
                                <th className="px-1 py-1 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[50px]">Sewage</th>
                                <th className="px-1 py-1 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[50px]">WaterB</th>
                                <th className="px-1 py-1 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[40px]">Tax1</th>
                                <th className="px-1 py-1 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[40px]">Tax2</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedData.map((row, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="border border-gray-300 px-0.5 py-0.5 text-center">{row.rv}</td>
                                    <td className="border border-gray-300 px-0.5 py-0.5 text-center">{row.propTax}</td>
                                    <td className="border border-gray-300 px-0.5 py-0.5 text-center">{row.eduTax}</td>
                                    <td className="border border-gray-300 px-0.5 py-0.5 text-center">{row.empTax}</td>
                                    <td className="border border-gray-300 px-0.5 py-0.5 text-center">{row.tree}</td>
                                    <td className="border border-gray-300 px-0.5 py-0.5 text-center">{row.spEduTa}</td>
                                    <td className="border border-gray-300 px-0.5 py-0.5 text-center">{row.sanitati}</td>
                                    <td className="border border-gray-300 px-0.5 py-0.5 text-center">{row.drainCes}</td>
                                    <td className="border border-gray-300 px-0.5 py-0.5 text-center">{row.spWaterC}</td>
                                    <td className="border border-gray-300 px-0.5 py-0.5 text-center">{row.roadCes}</td>
                                    <td className="border border-gray-300 px-0.5 py-0.5 text-center">{row.fireCes}</td>
                                    <td className="border border-gray-300 px-0.5 py-0.5 text-center">{row.lightCe}</td>
                                    <td className="border border-gray-300 px-0.5 py-0.5 text-center">{row.watBer}</td>
                                    <td className="border border-gray-300 px-0.5 py-0.5 text-center">{row.mBuild}</td>
                                    <td className="border border-gray-300 px-0.5 py-0.5 text-center">{row.sewage}</td>
                                    <td className="border border-gray-300 px-0.5 py-0.5 text-center">{row.waterB}</td>
                                    <td className="border border-gray-300 px-0.5 py-0.5 text-center">{row.tax1}</td>
                                    <td className="border border-gray-300 px-0.5 py-0.5 text-center">{row.tax2}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default PropertyTaxDetailsTable;