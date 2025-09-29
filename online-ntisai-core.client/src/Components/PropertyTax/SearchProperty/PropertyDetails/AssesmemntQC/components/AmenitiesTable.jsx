import React, { useState } from "react";
import { Eye, EyeOff, Search } from 'lucide-react';

const AmenitiesTable = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    
    const tableData = [
        {
            newPropNo: "AM1",
            floor: "G",
            assessmentYear: "2000",
            constructionYear: "2000", 
            constructionType: "FR",
            use: "मराठी साहेब्रत",
            carpetArea: "2580.24 / 900",
            builutpArea: "3216.288 / 1150"
        },
        {
            newPropNo: "AM2",
            floor: "G", 
            assessmentYear: "2000",
            constructionYear: "2000",
            constructionType: "B2",
            use: "शेरडिन क्रीमच",
            carpetArea: "43.06 / 15",
            builutpArea: "51.672 / 18"
        },
        {
            newPropNo: "AM3",
            floor: "1",
            assessmentYear: "2001",
            constructionYear: "2001",
            constructionType: "RCC",
            use: "Club House",
            carpetArea: "1200.50 / 420",
            builutpArea: "1500.75 / 525"
        },
        {
            newPropNo: "AM4",
            floor: "1", 
            assessmentYear: "2002",
            constructionYear: "2002",
            constructionType: "FR",
            use: "Swimming Pool",
            carpetArea: "800.30 / 280",
            builutpArea: "1000.40 / 350"
        },
        {
            newPropNo: "AM5",
            floor: "G",
            assessmentYear: "2003",
            constructionYear: "2003",
            constructionType: "RCC",
            use: "Gymnasium",
            carpetArea: "600.25 / 210",
            builutpArea: "750.30 / 263"
        },
        {
            newPropNo: "AM6",
            floor: "2",
            assessmentYear: "2004",
            constructionYear: "2004",
            constructionType: "B2",
            use: "Library",
            carpetArea: "450.80 / 158",
            builutpArea: "563.50 / 197"
        },
        {
            newPropNo: "AM7",
            floor: "G",
            assessmentYear: "2005",
            constructionYear: "2005",
            constructionType: "FR",
            use: "Children Play Area",
            carpetArea: "300.60 / 105",
            builutpArea: "375.75 / 131"
        },
        {
            newPropNo: "AM8",
            floor: "1",
            assessmentYear: "2006",
            constructionYear: "2006",
            constructionType: "RCC",
            use: "Community Hall",
            carpetArea: "900.45 / 315",
            builutpArea: "1125.56 / 394"
        },
        {
            newPropNo: "AM9",
            floor: "G",
            assessmentYear: "2007",
            constructionYear: "2007",
            constructionType: "B2",
            use: "Garden Area",
            carpetArea: "750.90 / 263",
            builutpArea: "938.63 / 329"
        },
        {
            newPropNo: "AM10",
            floor: "2",
            assessmentYear: "2008",
            constructionYear: "2008",
            constructionType: "FR",
            use: "Security Office",
            carpetArea: "200.40 / 70",
            builutpArea: "250.50 / 88"
        }
    ];

    const hasMoreRows = tableData.length > 2;
    
    // Filter data based on search term
    const filteredData = tableData.filter(row => 
        Object.values(row).some(value => 
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
    
    // Show only first 2 rows when collapsed, all rows when expanded (from filtered data)
    const displayedData = isExpanded ? filteredData : filteredData.slice(0, 2);

    const handleToggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="mt-1">
            <div className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                {/* Header */}
                <div className="bg-[#E6F3FF] px-1.5 py-1 border-b border-gray-300 flex items-center justify-between">
                    <h3 className="text-xs font-semibold text-gray-800">Amenities</h3>
                    <div className="flex items-center gap-2">
                        {/* Search Box */}
                        <div className="relative flex items-center">
                            <Search className="w-3 h-3 text-gray-500 absolute left-1.5" />
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-6 pr-2 py-0.5 text-xs border border-gray-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 w-28"
                            />
                        </div>
                        {/* Toggle Eye Icon */}
                        {hasMoreRows && (
                            <div
                                onClick={handleToggleExpanded}
                                className="cursor-pointer hover:opacity-70 transition-opacity duration-200"
                                title={isExpanded ? `Hide rows (${filteredData.length}/${tableData.length} results)` : `View all ${filteredData.length}/${tableData.length} results with scroll`}
                            >
                                {isExpanded ? (
                                    <EyeOff className="w-3 h-3 text-blue-600" />
                                ) : (
                                    <Eye className="w-3 h-3 text-blue-600" />
                                )}
                            </div>
                        )}
                    </div>
                </div>
                
                {/* Table Container with horizontal and vertical scroll */}
                <div className="overflow-x-auto scrollbar-corporate">
                    <div className={isExpanded ? "max-h-[280px] overflow-y-auto scrollbar-corporate" : ""}>
                        <table className="w-full text-[11px]">
                            <thead className="sticky top-0 bg-white">
                                <tr className="bg-[#F5F9FF] border-b border-gray-300">
                                <th className="px-1 py-1 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[70px]">
                                    New Property No
                                </th>
                                <th className="px-1 py-1 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[40px]">
                                    Floor
                                </th>
                                <th className="px-1 py-1 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[70px]">
                                    Assessment Year
                                </th>
                                <th className="px-1 py-1 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[70px]">
                                    Construction Year
                                </th>
                                <th className="px-1 py-1 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[70px]">
                                    Construction Type
                                </th>
                                <th className="px-1 py-1 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[80px]">
                                    Use
                                </th>
                                <th className="px-1 py-1 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[90px]">
                                    Carpet Area<br/>(sqFt/sqMtr)
                                </th>
                                <th className="px-1 py-1 text-left font-semibold text-gray-700 min-w-[90px]">
                                    BuiltUp Area<br/>(sqFt/sqMtr)
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedData.length > 0 ? (
                                displayedData.map((row, index) => (
                                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                                        <td className="px-1 py-1 border-r border-gray-200 text-gray-800">{row.newPropNo}</td>
                                        <td className="px-1 py-1 border-r border-gray-200 text-gray-800">{row.floor}</td>
                                        <td className="px-1 py-1 border-r border-gray-200 text-gray-800">{row.assessmentYear}</td>
                                        <td className="px-1 py-1 border-r border-gray-200 text-gray-800">{row.constructionYear}</td>
                                        <td className="px-1 py-1 border-r border-gray-200 text-gray-800">{row.constructionType}</td>
                                        <td className="px-1 py-1 border-r border-gray-200 text-gray-800">{row.use}</td>
                                        <td className="px-1 py-1 border-r border-gray-200 text-gray-800 text-center">{row.carpetArea}</td>
                                        <td className="px-1 py-1 text-gray-800 text-center">{row.builutpArea}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="px-4 py-8 text-center text-gray-500 text-sm">
                                        No results found for "{searchTerm}"
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AmenitiesTable;