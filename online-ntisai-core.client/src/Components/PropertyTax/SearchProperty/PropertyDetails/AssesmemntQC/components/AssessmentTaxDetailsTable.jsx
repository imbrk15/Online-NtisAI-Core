import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

const AssessmentTaxDetailsTable = () => {
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

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

    // Separate the total tax row from individual tax rows
    const totalTaxRow = tableData.find(row => row.taxes === 'Total Tax');
    const individualTaxRows = tableData.filter(row => row.taxes !== 'Total Tax');

    // Sort only the individual tax rows based on sort configuration
    const sortedIndividualRows = [...individualTaxRows].sort((a, b) => {
        if (!sortConfig.key) return 0;

        const aValue = a[sortConfig.key]?.toString() || '';
        const bValue = b[sortConfig.key]?.toString() || '';

        // Try to parse as numbers if possible
        const aNum = parseFloat(aValue);
        const bNum = parseFloat(bValue);

        if (!isNaN(aNum) && !isNaN(bNum)) {
            return sortConfig.direction === 'asc' ? aNum - bNum : bNum - aNum;
        }

        // Otherwise sort as strings
        if (sortConfig.direction === 'asc') {
            return aValue.localeCompare(bValue);
        } else {
            return bValue.localeCompare(aValue);
        }
    });

    // Combine sorted individual rows with total tax row at the end
    const displayedData = [...sortedIndividualRows, totalTaxRow];

    // Handle single click for sorting
    const handleHeaderClick = (columnKey) => {
        let direction = 'asc';
        if (sortConfig.key === columnKey && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key: columnKey, direction });
    };

    // Get sort icon for column
    const getSortIcon = (columnKey) => {
        if (sortConfig.key !== columnKey) {
            return null;
        }
        return sortConfig.direction === 'asc' ?
            <ChevronUp className="w-3 h-3 inline ml-1" /> :
            <ChevronDown className="w-3 h-3 inline ml-1" />;
    };

    return (
        <div className="w-full mt-2">
            <div className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm">


                {/* Table Container with horizontal scroll */}
                <div className="overflow-x-auto scrollbar-corporate">
                    <table className="w-full text-xs">
                        <thead>
                            <tr className="bg-[#F5F9FF] border-b border-gray-300">
                                <th
                                    className="px-1.5 py-1.5 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[120px] cursor-pointer hover:bg-blue-50 select-none"
                                    onClick={() => handleHeaderClick('taxes')}
                                    title="Single click to sort (excludes Total Tax row)"
                                >
                                    Taxes {getSortIcon('taxes')}
                                </th>
                                <th
                                    className="px-1.5 py-1.5 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[60px] cursor-pointer hover:bg-blue-50 select-none"
                                    onClick={() => handleHeaderClick('rv')}
                                    title="Single click to sort (excludes Total Tax row)"
                                >
                                    RV {getSortIcon('rv')}
                                </th>
                                <th
                                    className="px-1.5 py-1.5 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[70px] cursor-pointer hover:bg-blue-50 select-none"
                                    onClick={() => handleHeaderClick('propTax')}
                                    title="Single click to sort (excludes Total Tax row)"
                                >
                                    PropTax {getSortIcon('propTax')}
                                </th>
                                <th
                                    className="px-1.5 py-1.5 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[70px] cursor-pointer hover:bg-blue-50 select-none"
                                    onClick={() => handleHeaderClick('eduTax')}
                                    title="Single click to sort (excludes Total Tax row)"
                                >
                                    EduTax {getSortIcon('eduTax')}
                                </th>
                                <th
                                    className="px-1.5 py-1.5 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[70px] cursor-pointer hover:bg-blue-50 select-none"
                                    onClick={() => handleHeaderClick('empTax')}
                                    title="Single click to sort (excludes Total Tax row)"
                                >
                                    EmpTax {getSortIcon('empTax')}
                                </th>
                                <th
                                    className="px-1.5 py-1.5 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[50px] cursor-pointer hover:bg-blue-50 select-none"
                                    onClick={() => handleHeaderClick('tree')}
                                    title="Single click to sort (excludes Total Tax row)"
                                >
                                    Tree {getSortIcon('tree')}
                                </th>
                                <th
                                    className="px-1.5 py-1.5 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[70px] cursor-pointer hover:bg-blue-50 select-none"
                                    onClick={() => handleHeaderClick('spEduTa')}
                                    title="Single click to sort (excludes Total Tax row)"
                                >
                                    SpEduTa {getSortIcon('spEduTa')}
                                </th>
                                <th
                                    className="px-1.5 py-1.5 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[70px] cursor-pointer hover:bg-blue-50 select-none"
                                    onClick={() => handleHeaderClick('sanitati')}
                                    title="Single click to sort (excludes Total Tax row)"
                                >
                                    Sanitati {getSortIcon('sanitati')}
                                </th>
                                <th
                                    className="px-1.5 py-1.5 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[70px] cursor-pointer hover:bg-blue-50 select-none"
                                    onClick={() => handleHeaderClick('drainCes')}
                                    title="Single click to sort (excludes Total Tax row)"
                                >
                                    DrainCes {getSortIcon('drainCes')}
                                </th>
                                <th
                                    className="px-1.5 py-1.5 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[80px] cursor-pointer hover:bg-blue-50 select-none"
                                    onClick={() => handleHeaderClick('spWaterC')}
                                    title="Single click to sort (excludes Total Tax row)"
                                >
                                    SpWaterC {getSortIcon('spWaterC')}
                                </th>
                                <th
                                    className="px-1.5 py-1.5 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[70px] cursor-pointer hover:bg-blue-50 select-none"
                                    onClick={() => handleHeaderClick('roadCes')}
                                    title="Single click to sort (excludes Total Tax row)"
                                >
                                    RoadCes {getSortIcon('roadCes')}
                                </th>
                                <th
                                    className="px-1.5 py-1.5 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[70px] cursor-pointer hover:bg-blue-50 select-none"
                                    onClick={() => handleHeaderClick('fireCes')}
                                    title="Single click to sort (excludes Total Tax row)"
                                >
                                    FireCes {getSortIcon('fireCes')}
                                </th>
                                <th
                                    className="px-1.5 py-1.5 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[70px] cursor-pointer hover:bg-blue-50 select-none"
                                    onClick={() => handleHeaderClick('lightCe')}
                                    title="Single click to sort (excludes Total Tax row)"
                                >
                                    LightCe {getSortIcon('lightCe')}
                                </th>
                                <th
                                    className="px-1.5 py-1.5 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[70px] cursor-pointer hover:bg-blue-50 select-none"
                                    onClick={() => handleHeaderClick('watBer')}
                                    title="Single click to sort (excludes Total Tax row)"
                                >
                                    WatBer {getSortIcon('watBer')}
                                </th>
                                <th
                                    className="px-1.5 py-1.5 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[70px] cursor-pointer hover:bg-blue-50 select-none"
                                    onClick={() => handleHeaderClick('mBuild')}
                                    title="Single click to sort (excludes Total Tax row)"
                                >
                                    MBuild {getSortIcon('mBuild')}
                                </th>
                                <th
                                    className="px-1.5 py-1.5 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[70px] cursor-pointer hover:bg-blue-50 select-none"
                                    onClick={() => handleHeaderClick('sewage')}
                                    title="Single click to sort (excludes Total Tax row)"
                                >
                                    Sewage {getSortIcon('sewage')}
                                </th>
                                <th
                                    className="px-1.5 py-1.5 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[70px] cursor-pointer hover:bg-blue-50 select-none"
                                    onClick={() => handleHeaderClick('waterB')}
                                    title="Single click to sort (excludes Total Tax row)"
                                >
                                    WaterB {getSortIcon('waterB')}
                                </th>
                                <th
                                    className="px-1.5 py-1.5 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[50px] cursor-pointer hover:bg-blue-50 select-none"
                                    onClick={() => handleHeaderClick('tax1')}
                                    title="Single click to sort (excludes Total Tax row)"
                                >
                                    Tax1 {getSortIcon('tax1')}
                                </th>
                                <th
                                    className="px-1.5 py-1.5 text-left font-semibold text-gray-700 min-w-[50px] cursor-pointer hover:bg-blue-50 select-none"
                                    onClick={() => handleHeaderClick('tax2')}
                                    title="Single click to sort (excludes Total Tax row)"
                                >
                                    Tax2 {getSortIcon('tax2')}
                                </th>
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