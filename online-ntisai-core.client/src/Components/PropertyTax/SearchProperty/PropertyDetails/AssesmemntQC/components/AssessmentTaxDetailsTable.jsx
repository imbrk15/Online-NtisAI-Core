import React from 'react';

const AssessmentTaxDetailsTable = () => {

    // Sample data for Assessment Tax Details
    const tableData = [
        {
            taxes: "Amenities",
            rv: "15000",
            propTax: "750",
            eduTax: "75",
            empTax: "150",
            tree: "35",
            spEduTa: "50",
            sanitati: "120",
            drainCes: "95",
            spWaterC: "70",
            roadCes: "60",
            fireCes: "40",
            lightCe: "105",
            watBer: "85",
            mBuild: "175",
            sewage: "65",
            waterB: "110",
            tax1: "50",
            tax2: "35"
        },
        {
            taxes: "Commercial Tax",
            rv: "25000",
            propTax: "1250",
            eduTax: "125",
            empTax: "250",
            tree: "55",
            spEduTa: "85",
            sanitati: "200",
            drainCes: "160",
            spWaterC: "115",
            roadCes: "100",
            fireCes: "70",
            lightCe: "175",
            watBer: "140",
            mBuild: "290",
            sewage: "105",
            waterB: "185",
            tax1: "85",
            tax2: "55"
        },
        {
            taxes: "Residential Tax",
            rv: "20000",
            propTax: "1000",
            eduTax: "100",
            empTax: "200",
            tree: "45",
            spEduTa: "70",
            sanitati: "160",
            drainCes: "125",
            spWaterC: "90",
            roadCes: "80",
            fireCes: "55",
            lightCe: "140",
            watBer: "115",
            mBuild: "230",
            sewage: "85",
            waterB: "150",
            tax1: "70",
            tax2: "45"
        },
        {
            taxes: "Total Tax",
            rv: "60000",
            propTax: "3000",
            eduTax: "300",
            empTax: "600",
            tree: "135",
            spEduTa: "205",
            sanitati: "480",
            drainCes: "380",
            spWaterC: "275",
            roadCes: "240",
            fireCes: "165",
            lightCe: "420",
            watBer: "340",
            mBuild: "695",
            sewage: "255",
            waterB: "445",
            tax1: "205",
            tax2: "135"
        }
    ];

    // Show all 4 rows
    const displayedData = tableData;

    return (
        <div className="w-full mt-2">
            <div className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm">
            
                
                {/* Table Container with horizontal scroll */}
                <div className="overflow-x-auto scrollbar-corporate">
                    <table className="w-full text-xs">
                        <thead>
                            <tr className="bg-[#F5F9FF] border-b border-gray-300">
                                <th className="px-1.5 py-1.5 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[120px]">Taxes</th>
                                <th className="px-1.5 py-1.5 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[60px]">RV</th>
                                <th className="px-1.5 py-1.5 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[70px]">PropTax</th>
                                <th className="px-1.5 py-1.5 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[70px]">EduTax</th>
                                <th className="px-1.5 py-1.5 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[70px]">EmpTax</th>
                                <th className="px-1.5 py-1.5 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[50px]">Tree</th>
                                <th className="px-1.5 py-1.5 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[70px]">SpEduTa</th>
                                <th className="px-1.5 py-1.5 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[70px]">Sanitati</th>
                                <th className="px-1.5 py-1.5 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[70px]">DrainCes</th>
                                <th className="px-1.5 py-1.5 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[80px]">SpWaterC</th>
                                <th className="px-1.5 py-1.5 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[70px]">RoadCes</th>
                                <th className="px-1.5 py-1.5 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[70px]">FireCes</th>
                                <th className="px-1.5 py-1.5 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[70px]">LightCe</th>
                                <th className="px-1.5 py-1.5 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[70px]">WatBer</th>
                                <th className="px-1.5 py-1.5 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[70px]">MBuild</th>
                                <th className="px-1.5 py-1.5 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[70px]">Sewage</th>
                                <th className="px-1.5 py-1.5 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[70px]">WaterB</th>
                                <th className="px-1.5 py-1.5 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[50px]">Tax1</th>
                                <th className="px-1.5 py-1.5 text-left font-semibold text-gray-700 min-w-[50px]">Tax2</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedData.map((row, index) => (
                                <tr key={index} className={`border-b border-gray-200 hover:bg-gray-50 ${row.taxes === 'Total Tax' ? 'bg-yellow-50 font-semibold' : ''}`}>
                                    <td className="px-1.5 py-1.5 border-r border-gray-200 text-gray-800 font-medium">{row.taxes}</td>
                                    <td className="px-1.5 py-1.5 border-r border-gray-200 text-gray-800">{row.rv}</td>
                                    <td className="px-1.5 py-1.5 border-r border-gray-200 text-gray-800">{row.propTax}</td>
                                    <td className="px-1.5 py-1.5 border-r border-gray-200 text-gray-800">{row.eduTax}</td>
                                    <td className="px-1.5 py-1.5 border-r border-gray-200 text-gray-800">{row.empTax}</td>
                                    <td className="px-1.5 py-1.5 border-r border-gray-200 text-gray-800">{row.tree}</td>
                                    <td className="px-1.5 py-1.5 border-r border-gray-200 text-gray-800">{row.spEduTa}</td>
                                    <td className="px-1.5 py-1.5 border-r border-gray-200 text-gray-800">{row.sanitati}</td>
                                    <td className="px-1.5 py-1.5 border-r border-gray-200 text-gray-800">{row.drainCes}</td>
                                    <td className="px-1.5 py-1.5 border-r border-gray-200 text-gray-800">{row.spWaterC}</td>
                                    <td className="px-1.5 py-1.5 border-r border-gray-200 text-gray-800">{row.roadCes}</td>
                                    <td className="px-1.5 py-1.5 border-r border-gray-200 text-gray-800">{row.fireCes}</td>
                                    <td className="px-1.5 py-1.5 border-r border-gray-200 text-gray-800">{row.lightCe}</td>
                                    <td className="px-1.5 py-1.5 border-r border-gray-200 text-gray-800">{row.watBer}</td>
                                    <td className="px-1.5 py-1.5 border-r border-gray-200 text-gray-800">{row.mBuild}</td>
                                    <td className="px-1.5 py-1.5 border-r border-gray-200 text-gray-800">{row.sewage}</td>
                                    <td className="px-1.5 py-1.5 border-r border-gray-200 text-gray-800">{row.waterB}</td>
                                    <td className="px-1.5 py-1.5 border-r border-gray-200 text-gray-800">{row.tax1}</td>
                                    <td className="px-1.5 py-1.5 text-gray-800">{row.tax2}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default AssessmentTaxDetailsTable;