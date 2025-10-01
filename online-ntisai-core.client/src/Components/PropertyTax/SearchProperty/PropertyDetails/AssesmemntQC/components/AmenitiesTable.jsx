import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Search, ChevronUp, ChevronDown, ExternalLink } from 'lucide-react';

interface AmenitiesTableProps {
    filterLimit?: number | null;
}

const AmenitiesTable = ({ filterLimit }: AmenitiesTableProps) => {
    const navigate = useNavigate();
    const [isExpanded, setIsExpanded] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [expandedColumns, setExpandedColumns] = useState(new Set());

    const tableData = [
        {
            newPropNo: "AM1",
            floor: "G",
            assessmentYear: "2000",
            constructionYear: "2000",
            constructionType: "FR",
            use: "मराठी साहेब्रत",
            carpetArea: "2580.24 / 900",
            builutpArea: "3216.288 / 1150",
            rv: "59501",
            propTax: "13209",
            taxTotal: "14529"
        },
        {
            newPropNo: "AM2",
            floor: "G",
            assessmentYear: "2000",
            constructionYear: "2000",
            constructionType: "B2",
            use: "शेरडिन क्रीमच",
            carpetArea: "43.06 / 15",
            builutpArea: "51.672 / 18",
            rv: "814",
            propTax: "154",
            taxTotal: "169"
        },
        {
            newPropNo: "AM3",
            floor: "1",
            assessmentYear: "2001",
            constructionYear: "2001",
            constructionType: "RCC",
            use: "Club House",
            carpetArea: "1200.50 / 420",
            builutpArea: "1500.75 / 525",
            rv: "33017",
            propTax: "8716",
            taxTotal: "9588"
        },
        {
            newPropNo: "AM4",
            floor: "1",
            assessmentYear: "2002",
            constructionYear: "2002",
            constructionType: "FR",
            use: "Swimming Pool",
            carpetArea: "800.30 / 280",
            builutpArea: "1000.40 / 350",
            rv: "20258",
            propTax: "4923",
            taxTotal: "5415"
        },
        {
            newPropNo: "AM5",
            floor: "G",
            assessmentYear: "2003",
            constructionYear: "2003",
            constructionType: "RCC",
            use: "Gymnasium",
            carpetArea: "600.25 / 210",
            builutpArea: "750.30 / 263",
            rv: "14856",
            propTax: "3527",
            taxTotal: "3880"
        },
        {
            newPropNo: "AM6",
            floor: "2",
            assessmentYear: "2004",
            constructionYear: "2004",
            constructionType: "B2",
            use: "Library",
            carpetArea: "450.80 / 158",
            builutpArea: "563.50 / 197",
            rv: "9858",
            propTax: "2070",
            taxTotal: "2277"
        },
        {
            newPropNo: "AM7",
            floor: "G",
            assessmentYear: "2005",
            constructionYear: "2005",
            constructionType: "FR",
            use: "Children Play Area",
            carpetArea: "300.60 / 105",
            builutpArea: "375.75 / 131",
            rv: "6106",
            propTax: "1191",
            taxTotal: "1310"
        },
        {
            newPropNo: "AM8",
            floor: "1",
            assessmentYear: "2006",
            constructionYear: "2006",
            constructionType: "RCC",
            use: "Community Hall",
            carpetArea: "900.45 / 315",
            builutpArea: "1125.56 / 394",
            rv: "24481",
            propTax: "6387",
            taxTotal: "7026"
        },
        {
            newPropNo: "AM9",
            floor: "G",
            assessmentYear: "2007",
            constructionYear: "2007",
            constructionType: "B2",
            use: "Garden Area",
            carpetArea: "750.90 / 263",
            builutpArea: "938.63 / 329",
            rv: "17740",
            propTax: "4024",
            taxTotal: "4426"
        },
        {
            newPropNo: "AM10",
            floor: "2",
            assessmentYear: "2008",
            constructionYear: "2008",
            constructionType: "FR",
            use: "Security Office",
            carpetArea: "200.40 / 70",
            builutpArea: "250.50 / 88",
            rv: "3632",
            propTax: "632",
            taxTotal: "695"
        }
    ];

    const hasMoreRows = tableData.length > 2;

    // Filter data based on search term
    const filteredData = tableData.filter(row =>
        Object.values(row).some(value =>
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    // Sort data based on sort configuration
    const sortedData = [...filteredData].sort((a, b) => {
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

    // Apply filter limit if specified (based on New Property No column)
    let limitedData = sortedData;
    if (filterLimit !== null && filterLimit !== undefined) {
        // Sort by newPropNo for consistent top N filtering
        const sortedByPropNo = [...sortedData].sort((a, b) => {
            const aNum = parseInt(a.newPropNo.replace(/\D/g, '')) || 0;
            const bNum = parseInt(b.newPropNo.replace(/\D/g, '')) || 0;
            return aNum - bNum; // ascending order for "top" items
        });
        limitedData = sortedByPropNo.slice(0, filterLimit);

        // Re-apply the current sort if active
        if (sortConfig.key) {
            limitedData = [...limitedData].sort((a, b) => {
                const aValue = a[sortConfig.key]?.toString() || '';
                const bValue = b[sortConfig.key]?.toString() || '';

                const aNum = parseFloat(aValue);
                const bNum = parseFloat(bValue);

                if (!isNaN(aNum) && !isNaN(bNum)) {
                    return sortConfig.direction === 'asc' ? aNum - bNum : bNum - aNum;
                }

                if (sortConfig.direction === 'asc') {
                    return aValue.localeCompare(bValue);
                } else {
                    return bValue.localeCompare(aValue);
                }
            });
        }
    }

    // Show only first 2 rows when collapsed, all rows when expanded (from limited data)
    const displayedData = isExpanded ? limitedData : limitedData.slice(0, 4);

    const handleToggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    // Handle single click for sorting
    const handleHeaderClick = (columnKey) => {
        let direction = 'asc';
        if (sortConfig.key === columnKey && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key: columnKey, direction });
    };

    // Handle double click for column expansion
    const handleHeaderDoubleClick = (columnKey) => {
        const newExpandedColumns = new Set(expandedColumns);
        if (newExpandedColumns.has(columnKey)) {
            newExpandedColumns.delete(columnKey);
        } else {
            newExpandedColumns.add(columnKey);
        }
        setExpandedColumns(newExpandedColumns);
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

    // Get cell styling based on whether column is expanded
    const getCellClass = (columnKey, baseClass = "") => {
        const expandedClass = expandedColumns.has(columnKey) ?
            "max-w-none whitespace-normal break-words" :
            "max-w-[150px] truncate whitespace-nowrap overflow-hidden";
        return `${baseClass} ${expandedClass}`;
    };
    // Handle right-click navigation
    const handleRowRightClick = (e: React.MouseEvent, rowData: any) => {
        e.preventDefault(); // Prevent default context menu
        navigate("/propertyTax/propertySearch/propertyDetails");
    };

    // Handle view icon click navigation
    const handleViewClick = (e: React.MouseEvent, rowData: any) => {
        e.stopPropagation(); // Prevent row click events
        navigate("/propertyTax/propertySearch/propertyDetails");
    };

    return (
        <div className="mt-1">
            <div className="bg-white border border-[#0288d1] rounded-lg overflow-hidden shadow-md">
                {/* Header */}
                <div className="bg-gradient-to-r from-[#0277bd] to-[#0288d1] px-2 py-1.5 border-b border-[#0277bd] flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-white">Amenities</h3>
                    <div className="flex items-center gap-2">
                        {/* Search Box */}
                        <div className="relative flex items-center">
                            <Search className="w-3 h-3 text-gray-400 absolute left-1.5" />
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-6 pr-2 py-1 text-xs border border-[#b3e5fc] rounded bg-white focus:outline-none focus:ring-2 focus:ring-white focus:border-white w-32 shadow-sm"
                            />
                        </div>
                        {/* Toggle Eye Icon */}
                        {hasMoreRows && (
                            <div
                                onClick={handleToggleExpanded}
                                className="cursor-pointer hover:scale-110 transition-transform duration-200"
                                title={isExpanded ? `Hide rows (${sortedData.length}/${tableData.length} results)` : `View all ${sortedData.length}/${tableData.length} results with scroll`}
                            >
                                {isExpanded ? (
                                    <Eye className="w-3.5 h-3.5 text-white drop-shadow-sm" />
                                ) : (
                                    <EyeOff className="w-3.5 h-3.5 text-white drop-shadow-sm" />
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Table Container with horizontal and vertical scroll */}
                <div className="overflow-x-auto scrollbar-corporate">
                    <div className={isExpanded ? "max-h-[280px] overflow-y-auto scrollbar-corporate" : ""}>
                        <table className="w-full text-[11px]">
                            <thead className="sticky top-0 bg-white shadow-sm z-10">
                                <tr className="bg-gradient-to-b from-[#e1f5fe] to-[#b3e5fc] border-b-2 border-[#0288d1]">
                                    <th className="px-1.5 py-1.5 border-r border-[#81d4fa] w-[35px] text-center" title="View Details">

                                    </th>
                                    <th
                                        className="px-2 py-1.5 text-left border-r border-[#81d4fa] font-bold text-[#01579b] min-w-[70px] cursor-pointer hover:bg-[#b3e5fc] transition-colors select-none"
                                        onClick={() => handleHeaderClick('newPropNo')}
                                        onDoubleClick={() => handleHeaderDoubleClick('newPropNo')}
                                        title="Single click to sort, double click to expand column"
                                    >
                                        New Property No {getSortIcon('newPropNo')}
                                    </th>
                                    <th
                                        className="px-2 py-1.5 text-left border-r border-[#81d4fa] font-bold text-[#01579b] min-w-[40px] cursor-pointer hover:bg-[#b3e5fc] transition-colors select-none"
                                        onClick={() => handleHeaderClick('floor')}
                                        onDoubleClick={() => handleHeaderDoubleClick('floor')}
                                        title="Single click to sort, double click to expand column"
                                    >
                                        Floor {getSortIcon('floor')}
                                    </th>
                                    <th
                                        className="px-2 py-1.5 text-left border-r border-[#81d4fa] font-bold text-[#01579b] min-w-[70px] cursor-pointer hover:bg-[#b3e5fc] transition-colors select-none"
                                        onClick={() => handleHeaderClick('assessmentYear')}
                                        onDoubleClick={() => handleHeaderDoubleClick('assessmentYear')}
                                        title="Single click to sort, double click to expand column"
                                    >
                                        Assessment Year {getSortIcon('assessmentYear')}
                                    </th>
                                    <th
                                        className="px-2 py-1.5 text-left border-r border-[#81d4fa] font-bold text-[#01579b] min-w-[70px] cursor-pointer hover:bg-[#b3e5fc] transition-colors select-none"
                                        onClick={() => handleHeaderClick('constructionYear')}
                                        onDoubleClick={() => handleHeaderDoubleClick('constructionYear')}
                                        title="Single click to sort, double click to expand column"
                                    >
                                        Construction Year {getSortIcon('constructionYear')}
                                    </th>
                                    <th
                                        className="px-2 py-1.5 text-left border-r border-[#81d4fa] font-bold text-[#01579b] min-w-[70px] cursor-pointer hover:bg-[#b3e5fc] transition-colors select-none"
                                        onClick={() => handleHeaderClick('constructionType')}
                                        onDoubleClick={() => handleHeaderDoubleClick('constructionType')}
                                        title="Single click to sort, double click to expand column"
                                    >
                                        Construction Type {getSortIcon('constructionType')}
                                    </th>
                                    <th
                                        className="px-2 py-1.5 text-left border-r border-[#81d4fa] font-bold text-[#01579b] min-w-[80px] cursor-pointer hover:bg-[#b3e5fc] transition-colors select-none"
                                        onClick={() => handleHeaderClick('use')}
                                        onDoubleClick={() => handleHeaderDoubleClick('use')}
                                        title="Single click to sort, double click to expand column"
                                    >
                                        Use {getSortIcon('use')}
                                    </th>
                                    <th
                                        className="px-2 py-1.5 text-left border-r border-[#81d4fa] font-bold text-[#01579b] min-w-[90px] cursor-pointer hover:bg-[#b3e5fc] transition-colors select-none"
                                        onClick={() => handleHeaderClick('carpetArea')}
                                        onDoubleClick={() => handleHeaderDoubleClick('carpetArea')}
                                        title="Single click to sort, double click to expand column"
                                    >
                                        Carpet Area<br />(sqFt/sqMtr) {getSortIcon('carpetArea')}
                                    </th>
                                    <th
                                        className="px-2 py-1.5 text-left border-r border-[#81d4fa] font-bold text-[#01579b] min-w-[90px] cursor-pointer hover:bg-[#b3e5fc] transition-colors select-none"
                                        onClick={() => handleHeaderClick('builutpArea')}
                                        onDoubleClick={() => handleHeaderDoubleClick('builutpArea')}
                                        title="Single click to sort, double click to expand column"
                                    >
                                        BuiltUp Area<br />(sqFt/sqMtr) {getSortIcon('builutpArea')}
                                    </th>
                                    <th
                                        className="px-2 py-1.5 text-left border-r border-[#81d4fa] font-bold text-[#01579b] min-w-[60px] cursor-pointer hover:bg-[#b3e5fc] transition-colors select-none"
                                        onClick={() => handleHeaderClick('rv')}
                                        onDoubleClick={() => handleHeaderDoubleClick('rv')}
                                        title="Single click to sort, double click to expand column"
                                    >
                                        RV {getSortIcon('rv')}
                                    </th>
                                    <th
                                        className="px-2 py-1.5 text-left border-r border-[#81d4fa] font-bold text-[#01579b] min-w-[70px] cursor-pointer hover:bg-[#b3e5fc] transition-colors select-none"
                                        onClick={() => handleHeaderClick('propTax')}
                                        onDoubleClick={() => handleHeaderDoubleClick('propTax')}
                                        title="Single click to sort, double click to expand column"
                                    >
                                        Prop Tax {getSortIcon('propTax')}
                                    </th>
                                    <th
                                        className="px-2 py-1.5 text-left font-bold text-[#01579b] min-w-[70px] cursor-pointer hover:bg-[#b3e5fc] transition-colors select-none"
                                        onClick={() => handleHeaderClick('taxTotal')}
                                        onDoubleClick={() => handleHeaderDoubleClick('taxTotal')}
                                        title="Single click to sort, double click to expand column"
                                    >
                                        Tax Total {getSortIcon('taxTotal')}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayedData.length > 0 ? (
                                    displayedData.map((row, index) => (
                                        <tr key={index}
                                            className="border-b border-[#b3e5fc] hover:bg-[#e1f5fe] cursor-context-menu transition-colors duration-150"
                                            onContextMenu={(e) => handleRowRightClick(e, row)}
                                            title="Right-click to view property details">
                                            <td className="px-1.5 py-1.5 border-r border-[#b3e5fc] text-center bg-[#fafafa]">
                                                <ExternalLink
                                                    className="w-3.5 h-3.5 cursor-pointer hover:scale-125 transition-transform inline-block"
                                                    style={{ color: '#0277bd' }}
                                                    onClick={(e) => handleViewClick(e, row)}
                                                    title="Click to view property details"
                                                />
                                            </td>
                                            <td className={getCellClass('newPropNo', "px-2 py-1.5 border-r border-[#b3e5fc] text-[#263238] font-medium")} title={row.newPropNo}>{row.newPropNo}</td>
                                            <td className={getCellClass('floor', "px-2 py-1.5 border-r border-[#b3e5fc] text-[#455a64]")} title={row.floor}>{row.floor}</td>
                                            <td className={getCellClass('assessmentYear', "px-2 py-1.5 border-r border-[#b3e5fc] text-[#455a64]")} title={row.assessmentYear}>{row.assessmentYear}</td>
                                            <td className={getCellClass('constructionYear', "px-2 py-1.5 border-r border-[#b3e5fc] text-[#455a64]")} title={row.constructionYear}>{row.constructionYear}</td>
                                            <td className={getCellClass('constructionType', "px-2 py-1.5 border-r border-[#b3e5fc] text-[#455a64]")} title={row.constructionType}>{row.constructionType}</td>
                                            <td className={getCellClass('use', "px-2 py-1.5 border-r border-[#b3e5fc] text-[#455a64]")} title={row.use}>{row.use}</td>
                                            <td className={getCellClass('carpetArea', "px-2 py-1.5 border-r border-[#b3e5fc] text-[#455a64] text-center")} title={row.carpetArea}>{row.carpetArea}</td>
                                            <td className={getCellClass('builutpArea', "px-2 py-1.5 border-r border-[#b3e5fc] text-[#455a64] text-center")} title={row.builutpArea}>{row.builutpArea}</td>
                                            <td className={getCellClass('rv', "px-2 py-1.5 border-r border-[#b3e5fc] text-[#01579b] text-center font-medium")} title={row.rv}>{row.rv}</td>
                                            <td className={getCellClass('propTax', "px-2 py-1.5 border-r border-[#b3e5fc] text-[#01579b] text-center font-medium")} title={row.propTax}>{row.propTax}</td>
                                            <td className={getCellClass('taxTotal', "px-2 py-1.5 text-[#0277bd] text-center font-bold")} title={row.taxTotal}>{row.taxTotal}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="13" className="px-4 py-8 text-center text-[#455a64] text-sm bg-[#f5f5f5]">
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
