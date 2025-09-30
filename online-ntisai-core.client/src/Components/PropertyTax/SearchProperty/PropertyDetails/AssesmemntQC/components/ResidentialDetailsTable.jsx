import React, { useState } from 'react';
import { Eye, EyeOff, Search, ChevronUp, ChevronDown } from 'lucide-react';

interface ResidentialDetailsTableProps {
    filterLimit?: number | null;
}

const ResidentialDetailsTable = ({ filterLimit }: ResidentialDetailsTableProps) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [expandedColumns, setExpandedColumns] = useState(new Set());

    // Sample data for Residential Details
    const tableData = [
        {
            newPropNo: "R001",
            oldPropNo: "OLD-R001",
            wing: "A",
            shopNo: "फ्लैट 101",
            shopName: "2BHK Flat",
            propHolderName: "राम कुमार",
            occupierName: "स्वयं",
            rent: "इकत्त",
            propDesc: "फ्लैट नं. 101",
            type: "R",
            floor: "1",
            ay: "2023",
            acy: "2023",
            ct: "R",
            use: "Residential",
            rooms: "3",
            bhk: "2BHK",
            toi: "2",
            cArea: "850 / 789",
            builtUpArea: "950 / 882",
            parkingArea: "25",
            rv: "48750",
            propTax: "2437", // Added Prop Tax
            totalTax: "10095",
            mobileNo: "9876543201",
            email: "ram.kumar@email.com",
            ocDate: "15/01/2023",
            ocApply: "Yes",
            ocNumber: "OC-R001",
            enBalArea: "875",
            opBalArea: "75",
            wbArea: "950",
            taxArea: "1025"
        },
        {
            newPropNo: "R002",
            oldPropNo: "-",
            wing: "A",
            shopNo: "फ्लैट 102",
            shopName: "3BHK Flat",
            propHolderName: "",
            occupierName: "किरायेदार",
            rent: "किराया",
            propDesc: "फ्लैट नं. 102",
            type: "R",
            floor: "1",
            ay: "2023",
            acy: "2023",
            ct: "R",
            use: "Residential",
            rooms: "4",
            bhk: "3BHK",
            toi: "2",
            cArea: "1200 / 1115",
            builtUpArea: "1350 / 1254",
            parkingArea: "30",
            rv: "69300",
            propTax: "3465", // Added Prop Tax
            totalTax: "14366",
            mobileNo: "9876543202",
            email: "sunil.sharma@email.com",
            ocDate: "20/01/2023",
            ocApply: "Yes",
            ocNumber: "OC-R002",
            enBalArea: "1230",
            opBalArea: "120",
            wbArea: "1380",
            taxArea: "1500"
        },
        {
            newPropNo: "R003",
            oldPropNo: "OLD-R003",
            wing: "A",
            shopNo: "फ्लैट 103",
            shopName: "1BHK Flat",
            propHolderName: "विकास अग्रवाल",
            occupierName: "स्वयं",
            rent: "इकत्त",
            propDesc: "फ्लैट नं. 103",
            type: "R",
            floor: "1",
            ay: "2023",
            acy: "2023",
            ct: "R",
            use: "Residential",
            rooms: "2",
            bhk: "1BHK",
            toi: "1",
            cArea: "600 / 557",
            builtUpArea: "700 / 650",
            parkingArea: "20",
            rv: "27440",
            propTax: "1372", // Added Prop Tax
            totalTax: "5686",
            mobileNo: "9876543203",
            email: "vikas.agrawal@email.com",
            ocDate: "25/01/2023",
            ocApply: "Yes",
            ocNumber: "OC-R003",
            enBalArea: "620",
            opBalArea: "80",
            wbArea: "720",
            taxArea: "800"
        },
        {
            newPropNo: "R004",
            oldPropNo: "-",
            wing: "B",
            shopNo: "फ्लैट 201",
            shopName: "2BHK Flat",
            propHolderName: "",
            occupierName: "किरायेदार",
            rent: "किराया",
            propDesc: "फ्लैट नं. 201",
            type: "R",
            floor: "2",
            ay: "2023",
            acy: "2023",
            ct: "R",
            use: "Residential",
            rooms: "3",
            bhk: "2BHK",
            toi: "2",
            cArea: "875 / 812",
            builtUpArea: "980 / 910",
            parkingArea: "25",
            rv: "50225",
            propTax: "2511", // Added Prop Tax
            totalTax: "10401",
            mobileNo: "9876543204",
            email: "amit.patel@email.com",
            ocDate: "30/01/2023",
            ocApply: "No",
            ocNumber: "-",
            enBalArea: "900",
            opBalArea: "80",
            wbArea: "1005",
            taxArea: "1085"
        },
        {
            newPropNo: "R005",
            oldPropNo: "OLD-R005",
            wing: "B",
            shopNo: "फ्लैट 202",
            shopName: "3BHK Flat",
            propHolderName: "राजेश गुप्ता",
            occupierName: "स्वयं",
            rent: "इकत्त",
            propDesc: "फ्लैट नं. 202",
            type: "R",
            floor: "2",
            ay: "2023",
            acy: "2023",
            ct: "R",
            use: "Residential",
            rooms: "4",
            bhk: "3BHK",
            toi: "3",
            cArea: "1150 / 1069",
            builtUpArea: "1280 / 1189",
            parkingArea: "35",
            rv: "65680",
            propTax: "3284", // Added Prop Tax
            totalTax: "13616",
            mobileNo: "9876543205",
            email: "rajesh.gupta@email.com",
            ocDate: "05/02/2023",
            ocApply: "Yes",
            ocNumber: "OC-R005",
            enBalArea: "1185",
            opBalArea: "95",
            wbArea: "1315",
            taxArea: "1410"
        },
        {
            newPropNo: "R006",
            oldPropNo: "-",
            wing: "B",
            shopNo: "फ्लैट 203",
            shopName: "2BHK Flat",
            propHolderName: "",
            occupierName: "किरायेदार",
            rent: "किराया",
            propDesc: "फ्लैट नं. 203",
            type: "R",
            floor: "2",
            ay: "2023",
            acy: "2023",
            ct: "R",
            use: "Residential",
            rooms: "3",
            bhk: "2BHK",
            toi: "2",
            cArea: "825 / 766",
            builtUpArea: "920 / 854",
            parkingArea: "20",
            rv: "47030",
            propTax: "2351", // Added Prop Tax
            totalTax: "9752",
            mobileNo: "9876543206",
            email: "prakash.joshi@email.com",
            ocDate: "10/02/2023",
            ocApply: "Yes",
            ocNumber: "OC-R006",
            enBalArea: "845",
            opBalArea: "75",
            wbArea: "940",
            taxArea: "1015"
        },
        {
            newPropNo: "R007",
            oldPropNo: "OLD-R007",
            wing: "C",
            shopNo: "फ्लैट 301",
            shopName: "4BHK Flat",
            propHolderName: "सुरेश महाजन",
            occupierName: "स्वयं",
            rent: "इकत्त",
            propDesc: "फ्लैट नं. 301",
            type: "R",
            floor: "3",
            ay: "2023",
            acy: "2023",
            ct: "R",
            use: "Residential",
            rooms: "5",
            bhk: "4BHK",
            toi: "3",
            cArea: "1650 / 1532",
            builtUpArea: "1850 / 1718",
            parkingArea: "40",
            rv: "94825",
            propTax: "4741", // Added Prop Tax
            totalTax: "19655",
            mobileNo: "9876543207",
            email: "suresh.mahajan@email.com",
            ocDate: "15/02/2023",
            ocApply: "Yes",
            ocNumber: "OC-R007",
            enBalArea: "1690",
            opBalArea: "160",
            wbArea: "1890",
            taxArea: "2050"
        },
        {
            newPropNo: "R008",
            oldPropNo: "-",
            wing: "C",
            shopNo: "फ्लैट 302",
            shopName: "1BHK Flat",
            propHolderName: "",
            occupierName: "किरायेदार",
            rent: "किराया",
            propDesc: "फ्लैट नं. 302",
            type: "R",
            floor: "3",
            ay: "2023",
            acy: "2023",
            ct: "R",
            use: "Residential",
            rooms: "2",
            bhk: "1BHK",
            toi: "1",
            cArea: "580 / 538",
            builtUpArea: "680 / 632",
            parkingArea: "15",
            rv: "26692",
            propTax: "1334", // Added Prop Tax
            totalTax: "5533",
            mobileNo: "9876543208",
            email: "anil.verma@email.com",
            ocDate: "20/02/2023",
            ocApply: "No",
            ocNumber: "-",
            enBalArea: "595",
            opBalArea: "85",
            wbArea: "695",
            taxArea: "780"
        },
        {
            newPropNo: "R009",
            oldPropNo: "OLD-R009",
            wing: "C",
            shopNo: "फ्लैट 303",
            shopName: "3BHK Flat",
            propHolderName: "मोहन देसाई",
            occupierName: "स्वयं",
            rent: "इकत्त",
            propDesc: "फ्लैट नं. 303",
            type: "R",
            floor: "3",
            ay: "2023",
            acy: "2023",
            ct: "R",
            use: "Residential",
            rooms: "4",
            bhk: "3BHK",
            toi: "2",
            cArea: "1100 / 1022",
            builtUpArea: "1250 / 1161",
            parkingArea: "30",
            rv: "64050",
            propTax: "3202", // Added Prop Tax
            totalTax: "13276",
            mobileNo: "9876543209",
            email: "mohan.desai@email.com",
            ocDate: "25/02/2023",
            ocApply: "Yes",
            ocNumber: "OC-R009",
            enBalArea: "1130",
            opBalArea: "120",
            wbArea: "1280",
            taxArea: "1410"
        },
        {
            newPropNo: "R010",
            oldPropNo: "-",
            wing: "D",
            shopNo: "फ्लैट 401",
            shopName: "2BHK Flat",
            propHolderName: "",
            occupierName: "किरायेदार",
            rent: "किराया",
            propDesc: "फ्लैट नं. 401",
            type: "R",
            floor: "4",
            ay: "2023",
            acy: "2023",
            ct: "R",
            use: "Residential",
            rooms: "3",
            bhk: "2BHK",
            toi: "2",
            cArea: "890 / 827",
            builtUpArea: "995 / 924",
            parkingArea: "25",
            rv: "50977",
            propTax: "2548", // Added Prop Tax
            totalTax: "10568",
            mobileNo: "9876543210",
            email: "ganesh.patil@email.com",
            ocDate: "02/03/2023",
            ocApply: "Yes",
            ocNumber: "OC-R010",
            enBalArea: "915",
            opBalArea: "80",
            wbArea: "1020",
            taxArea: "1100"
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
        window.location.href = "/propertyTax/propertySearch/propertyDetails";
    };

    return (
        <div className="mt-1">
            <div className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                {/* Header */}
                <div className="bg-[#E6F3FF] px-1.5 py-1 border-b border-gray-300 flex items-center justify-between">
                    <h3 className="text-xs font-semibold text-gray-800">Residential Details</h3>
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
                                title={isExpanded ? `Hide rows (${sortedData.length}/${tableData.length} results)` : `View all ${sortedData.length}/${tableData.length} results with scroll`}
                            >
                                {isExpanded ? (
                                    <Eye className="w-3 h-3 text-blue-600" />
                                ) : (
                                    <EyeOff className="w-3 h-3 text-blue-600" />
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
                                    <th
                                        className="px-1.5 py-0.5 text-left border-r border-gray-300 font-bold text-gray-900 min-w-[60px] text-[11px] leading-tight cursor-pointer hover:bg-blue-100 select-none"
                                        onClick={() => handleHeaderClick('newPropNo')}
                                        onDoubleClick={() => handleHeaderDoubleClick('newPropNo')}
                                        title="Single click to sort, double click to expand column"
                                    >
                                        New PropNo {getSortIcon('newPropNo')}
                                    </th>
                                    <th
                                        className="px-1.5 py-0.5 text-left border-r border-gray-300 font-bold text-gray-900 min-w-[60px] text-[11px] leading-tight cursor-pointer hover:bg-blue-100 select-none"
                                        onClick={() => handleHeaderClick('oldPropNo')}
                                        onDoubleClick={() => handleHeaderDoubleClick('oldPropNo')}
                                        title="Single click to sort, double click to expand column"
                                    >
                                        Old PropNo {getSortIcon('oldPropNo')}
                                    </th>
                                    <th
                                        className="px-1.5 py-0.5 text-left border-r border-gray-300 font-bold text-gray-900 min-w-[50px] text-[11px] leading-tight cursor-pointer hover:bg-blue-100 select-none"
                                        onClick={() => handleHeaderClick('wing')}
                                        onDoubleClick={() => handleHeaderDoubleClick('wing')}
                                        title="Single click to sort, double click to expand column"
                                    >
                                        Wing {getSortIcon('wing')}
                                    </th>
                                    <th
                                        className="px-1.5 py-0.5 text-left border-r border-gray-300 font-bold text-gray-900 min-w-[60px] text-[11px] leading-tight cursor-pointer hover:bg-blue-100 select-none"
                                        onClick={() => handleHeaderClick('shopNo')}
                                        onDoubleClick={() => handleHeaderDoubleClick('shopNo')}
                                        title="Single click to sort, double click to expand column"
                                    >
                                        Shop No {getSortIcon('shopNo')}
                                    </th>
                                    <th
                                        className="px-1.5 py-0.5 text-left border-r border-gray-300 font-bold text-gray-900 min-w-[80px] text-[11px] leading-tight cursor-pointer hover:bg-blue-100 select-none"
                                        onClick={() => handleHeaderClick('shopName')}
                                        onDoubleClick={() => handleHeaderDoubleClick('shopName')}
                                        title="Single click to sort, double click to expand column"
                                    >
                                        Shop Name {getSortIcon('shopName')}
                                    </th>
                                    <th
                                        className="px-1.5 py-0.5 text-left border-r border-gray-300 font-bold text-gray-900 min-w-[100px] text-[11px] leading-tight cursor-pointer hover:bg-blue-100 select-none"
                                        onClick={() => handleHeaderClick('propHolderName')}
                                        onDoubleClick={() => handleHeaderDoubleClick('propHolderName')}
                                        title="Single click to sort, double click to expand column"
                                    >
                                        PropHolder Name {getSortIcon('propHolderName')}
                                    </th>
                                    <th
                                        className="px-1.5 py-0.5 text-left border-r border-gray-300 font-bold text-gray-900 min-w-[80px] text-[11px] leading-tight cursor-pointer hover:bg-blue-100 select-none"
                                        onClick={() => handleHeaderClick('occupierName')}
                                        onDoubleClick={() => handleHeaderDoubleClick('occupierName')}
                                        title="Single click to sort, double click to expand column"
                                    >
                                        Occupier Name {getSortIcon('occupierName')}
                                    </th>
                                    <th
                                        className="px-1.5 py-0.5 text-left border-r border-gray-300 font-bold text-gray-900 min-w-[50px] text-[11px] leading-tight cursor-pointer hover:bg-blue-100 select-none"
                                        onClick={() => handleHeaderClick('rent')}
                                        onDoubleClick={() => handleHeaderDoubleClick('rent')}
                                        title="Single click to sort, double click to expand column"
                                    >
                                        Rent {getSortIcon('rent')}
                                    </th>
                                    <th
                                        className="px-1.5 py-0.5 text-left border-r border-gray-300 font-bold text-gray-900 min-w-[60px] text-[11px] leading-tight cursor-pointer hover:bg-blue-100 select-none"
                                        onClick={() => handleHeaderClick('propDesc')}
                                        onDoubleClick={() => handleHeaderDoubleClick('propDesc')}
                                        title="Single click to sort, double click to expand column"
                                    >
                                        Prop Desc {getSortIcon('propDesc')}
                                    </th>
                                    <th
                                        className="px-1.5 py-0.5 text-left border-r border-gray-300 font-bold text-gray-900 min-w-[50px] text-[11px] leading-tight cursor-pointer hover:bg-blue-100 select-none"
                                        onClick={() => handleHeaderClick('type')}
                                        onDoubleClick={() => handleHeaderDoubleClick('type')}
                                        title="Single click to sort, double click to expand column"
                                    >
                                        Type {getSortIcon('type')}
                                    </th>
                                    <th
                                        className="px-1.5 py-0.5 text-left border-r border-gray-300 font-bold text-gray-900 min-w-[50px] text-[11px] leading-tight cursor-pointer hover:bg-blue-100 select-none"
                                        onClick={() => handleHeaderClick('floor')}
                                        onDoubleClick={() => handleHeaderDoubleClick('floor')}
                                        title="Single click to sort, double click to expand column"
                                    >
                                        Floor {getSortIcon('floor')}
                                    </th>
                                    <th
                                        className="px-1.5 py-0.5 text-left border-r border-gray-300 font-bold text-gray-900 min-w-[40px] text-[11px] leading-tight cursor-pointer hover:bg-blue-100 select-none"
                                        onClick={() => handleHeaderClick('ay')}
                                        onDoubleClick={() => handleHeaderDoubleClick('ay')}
                                        title="Single click to sort, double click to expand column"
                                    >
                                        A.Y. {getSortIcon('ay')}
                                    </th>
                                    <th
                                        className="px-1.5 py-0.5 text-left border-r border-gray-300 font-bold text-gray-900 min-w-[50px] text-[11px] leading-tight cursor-pointer hover:bg-blue-100 select-none"
                                        onClick={() => handleHeaderClick('acy')}
                                        onDoubleClick={() => handleHeaderDoubleClick('acy')}
                                        title="Single click to sort, double click to expand column"
                                    >
                                        A.C.Y {getSortIcon('acy')}
                                    </th>
                                    <th
                                        className="px-1.5 py-0.5 text-left border-r border-gray-300 font-bold text-gray-900 min-w-[40px] text-[11px] leading-tight cursor-pointer hover:bg-blue-100 select-none"
                                        onClick={() => handleHeaderClick('ct')}
                                        onDoubleClick={() => handleHeaderDoubleClick('ct')}
                                        title="Single click to sort, double click to expand column"
                                    >
                                        C.T {getSortIcon('ct')}
                                    </th>
                                    <th
                                        className="px-1.5 py-0.5 text-left border-r border-gray-300 font-bold text-gray-900 min-w-[40px] text-[11px] leading-tight cursor-pointer hover:bg-blue-100 select-none"
                                        onClick={() => handleHeaderClick('use')}
                                        onDoubleClick={() => handleHeaderDoubleClick('use')}
                                        title="Single click to sort, double click to expand column"
                                    >
                                        Use {getSortIcon('use')}
                                    </th>
                                    <th
                                        className="px-1.5 py-0.5 text-left border-r border-gray-300 font-bold text-gray-900 min-w-[50px] text-[11px] leading-tight cursor-pointer hover:bg-blue-100 select-none"
                                        onClick={() => handleHeaderClick('rooms')}
                                        onDoubleClick={() => handleHeaderDoubleClick('rooms')}
                                        title="Single click to sort, double click to expand column"
                                    >
                                        Rooms {getSortIcon('rooms')}
                                    </th>
                                    <th
                                        className="px-1.5 py-0.5 text-left border-r border-gray-300 font-bold text-gray-900 min-w-[50px] text-[11px] leading-tight cursor-pointer hover:bg-blue-100 select-none"
                                        onClick={() => handleHeaderClick('bhk')}
                                        onDoubleClick={() => handleHeaderDoubleClick('bhk')}
                                        title="Single click to sort, double click to expand column"
                                    >
                                        BHK {getSortIcon('bhk')}
                                    </th>
                                    <th
                                        className="px-1.5 py-0.5 text-left border-r border-gray-300 font-bold text-gray-900 min-w-[40px] text-[11px] leading-tight cursor-pointer hover:bg-blue-100 select-none"
                                        onClick={() => handleHeaderClick('toi')}
                                        onDoubleClick={() => handleHeaderDoubleClick('toi')}
                                        title="Single click to sort, double click to expand column"
                                    >
                                        Toi {getSortIcon('toi')}
                                    </th>
                                    <th
                                        className="px-1.5 py-0.5 text-left border-r border-gray-300 font-bold text-gray-900 min-w-[70px] text-[11px] leading-tight cursor-pointer hover:bg-blue-100 select-none"
                                        onClick={() => handleHeaderClick('cArea')}
                                        onDoubleClick={() => handleHeaderDoubleClick('cArea')}
                                        title="Single click to sort, double click to expand column"
                                    >
                                        C.Area(Sqft/SqMtr) {getSortIcon('cArea')}
                                    </th>
                                    <th
                                        className="px-1.5 py-0.5 text-left border-r border-gray-300 font-bold text-gray-900 min-w-[80px] text-[11px] leading-tight cursor-pointer hover:bg-blue-100 select-none"
                                        onClick={() => handleHeaderClick('builtUpArea')}
                                        onDoubleClick={() => handleHeaderDoubleClick('builtUpArea')}
                                        title="Single click to sort, double click to expand column"
                                    >
                                        BuiltUp Area(Sqft/SqMtr) {getSortIcon('builtUpArea')}
                                    </th>
                                    <th
                                        className="px-1.5 py-0.5 text-left border-r border-gray-300 font-bold text-gray-900 min-w-[80px] text-[11px] leading-tight cursor-pointer hover:bg-blue-100 select-none"
                                        onClick={() => handleHeaderClick('parkingArea')}
                                        onDoubleClick={() => handleHeaderDoubleClick('parkingArea')}
                                        title="Single click to sort, double click to expand column"
                                    >
                                        Parking Area(SqMtr) {getSortIcon('parkingArea')}
                                    </th>
                                    <th
                                        className="px-1.5 py-0.5 text-left border-r border-gray-300 font-bold text-gray-900 min-w-[60px] text-[11px] leading-tight cursor-pointer hover:bg-blue-100 select-none"
                                        onClick={() => handleHeaderClick('rv')}
                                        onDoubleClick={() => handleHeaderDoubleClick('rv')}
                                        title="Single click to sort, double click to expand column"
                                    >
                                        RV {getSortIcon('rv')}
                                    </th>
                                    <th
                                        className="px-1.5 py-0.5 text-left border-r border-gray-300 font-bold text-gray-900 min-w-[60px] text-[11px] leading-tight cursor-pointer hover:bg-blue-100 select-none"
                                        onClick={() => handleHeaderClick('propTax')}
                                        onDoubleClick={() => handleHeaderDoubleClick('propTax')}
                                        title="Single click to sort, double click to expand column"
                                    >
                                        Prop Tax {getSortIcon('propTax')}
                                    </th>
                                    <th
                                        className="px-1.5 py-0.5 text-left border-r border-gray-300 font-bold text-gray-900 min-w-[70px] text-[11px] leading-tight cursor-pointer hover:bg-blue-100 select-none"
                                        onClick={() => handleHeaderClick('totalTax')}
                                        onDoubleClick={() => handleHeaderDoubleClick('totalTax')}
                                        title="Single click to sort, double click to expand column"
                                    >
                                        Total Tax {getSortIcon('totalTax')}
                                    </th>
                                    <th
                                        className="px-1.5 py-0.5 text-left border-r border-gray-300 font-bold text-gray-900 min-w-[80px] text-[11px] leading-tight cursor-pointer hover:bg-blue-100 select-none"
                                        onClick={() => handleHeaderClick('mobileNo')}
                                        onDoubleClick={() => handleHeaderDoubleClick('mobileNo')}
                                        title="Single click to sort, double click to expand column"
                                    >
                                        Mobile No {getSortIcon('mobileNo')}
                                    </th>
                                    <th
                                        className="px-1.5 py-0.5 text-left border-r border-gray-300 font-bold text-gray-900 min-w-[120px] text-[11px] leading-tight cursor-pointer hover:bg-blue-100 select-none"
                                        onClick={() => handleHeaderClick('email')}
                                        onDoubleClick={() => handleHeaderDoubleClick('email')}
                                        title="Single click to sort, double click to expand column"
                                    >
                                        Email {getSortIcon('email')}
                                    </th>
                                    <th
                                        className="px-1.5 py-0.5 text-left border-r border-gray-300 font-bold text-gray-900 min-w-[70px] text-[11px] leading-tight cursor-pointer hover:bg-blue-100 select-none"
                                        onClick={() => handleHeaderClick('ocDate')}
                                        onDoubleClick={() => handleHeaderDoubleClick('ocDate')}
                                        title="Single click to sort, double click to expand column"
                                    >
                                        OC Date {getSortIcon('ocDate')}
                                    </th>
                                    <th
                                        className="px-1.5 py-0.5 text-left border-r border-gray-300 font-bold text-gray-900 min-w-[60px] text-[11px] leading-tight cursor-pointer hover:bg-blue-100 select-none"
                                        onClick={() => handleHeaderClick('ocApply')}
                                        onDoubleClick={() => handleHeaderDoubleClick('ocApply')}
                                        title="Single click to sort, double click to expand column"
                                    >
                                        OC Apply {getSortIcon('ocApply')}
                                    </th>
                                    <th
                                        className="px-1.5 py-0.5 text-left border-r border-gray-300 font-bold text-gray-900 min-w-[70px] text-[11px] leading-tight cursor-pointer hover:bg-blue-100 select-none"
                                        onClick={() => handleHeaderClick('ocNumber')}
                                        onDoubleClick={() => handleHeaderDoubleClick('ocNumber')}
                                        title="Single click to sort, double click to expand column"
                                    >
                                        OC Number {getSortIcon('ocNumber')}
                                    </th>
                                    <th
                                        className="px-1.5 py-0.5 text-left border-r border-gray-300 font-bold text-gray-900 min-w-[70px] text-[11px] leading-tight cursor-pointer hover:bg-blue-100 select-none"
                                        onClick={() => handleHeaderClick('enBalArea')}
                                        onDoubleClick={() => handleHeaderDoubleClick('enBalArea')}
                                        title="Single click to sort, double click to expand column"
                                    >
                                        EnBal Area {getSortIcon('enBalArea')}
                                    </th>
                                    <th
                                        className="px-1.5 py-0.5 text-left border-r border-gray-300 font-bold text-gray-900 min-w-[70px] text-[11px] leading-tight cursor-pointer hover:bg-blue-100 select-none"
                                        onClick={() => handleHeaderClick('opBalArea')}
                                        onDoubleClick={() => handleHeaderDoubleClick('opBalArea')}
                                        title="Single click to sort, double click to expand column"
                                    >
                                        OpBal Area {getSortIcon('opBalArea')}
                                    </th>
                                    <th
                                        className="px-1.5 py-0.5 text-left border-r border-gray-300 font-bold text-gray-900 min-w-[60px] text-[11px] leading-tight cursor-pointer hover:bg-blue-100 select-none"
                                        onClick={() => handleHeaderClick('wbArea')}
                                        onDoubleClick={() => handleHeaderDoubleClick('wbArea')}
                                        title="Single click to sort, double click to expand column"
                                    >
                                        W/B Area {getSortIcon('wbArea')}
                                    </th>
                                    <th
                                        className="px-1.5 py-0.5 text-left border-r border-gray-300 font-bold text-gray-900 min-w-[60px] text-[11px] leading-tight cursor-pointer hover:bg-blue-100 select-none"
                                        onClick={() => handleHeaderClick('taxArea')}
                                        onDoubleClick={() => handleHeaderDoubleClick('taxArea')}
                                        title="Single click to sort, double click to expand column"
                                    >
                                        Tax Area {getSortIcon('taxArea')}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayedData.length > 0 ? (
                                    displayedData.map((row, index) => (
                                        <tr key={index}
                                            className="border-b border-gray-200 hover:bg-gray-50 cursor-context-menu"
                                            onContextMenu={(e) => handleRowRightClick(e, row)}
                                            title="Right-click to view property details">
                                            <td className={getCellClass('newPropNo', "px-1.5 py-1.5 border-r border-gray-200 text-gray-800")} title={row.newPropNo}>{row.newPropNo}</td>
                                            <td className={getCellClass('oldPropNo', "px-1.5 py-1.5 border-r border-gray-200 text-gray-800")} title={row.oldPropNo}>{row.oldPropNo}</td>
                                            <td className={getCellClass('wing', "px-1.5 py-1.5 border-r border-gray-200 text-gray-800")} title={row.wing}>{row.wing}</td>
                                            <td className={getCellClass('shopNo', "px-1.5 py-1.5 border-r border-gray-200 text-gray-800")} title={row.shopNo}>{row.shopNo}</td>
                                            <td className={getCellClass('shopName', "px-1.5 py-1.5 border-r border-gray-200 text-gray-800")} title={row.shopName}>{row.shopName}</td>
                                            <td className={getCellClass('propHolderName', "px-1.5 py-1.5 border-r border-gray-200 text-gray-800")} title={row.propHolderName}>{row.propHolderName}</td>
                                            <td className={getCellClass('occupierName', "px-1.5 py-1.5 border-r border-gray-200 text-gray-800")} title={row.occupierName}>{row.occupierName}</td>
                                            <td className={getCellClass('rent', "px-1.5 py-1.5 border-r border-gray-200 text-gray-800")} title={row.rent}>{row.rent}</td>
                                            <td className={getCellClass('propDesc', "px-1.5 py-1.5 border-r border-gray-200 text-gray-800")} title={row.propDesc}>{row.propDesc}</td>
                                            <td className={getCellClass('type', "px-1.5 py-1.5 border-r border-gray-200 text-gray-800")} title={row.type}>{row.type}</td>
                                            <td className={getCellClass('floor', "px-1.5 py-1.5 border-r border-gray-200 text-gray-800")} title={row.floor}>{row.floor}</td>
                                            <td className={getCellClass('ay', "px-1.5 py-1.5 border-r border-gray-200 text-gray-800")} title={row.ay}>{row.ay}</td>
                                            <td className={getCellClass('acy', "px-1.5 py-1.5 border-r border-gray-200 text-gray-800")} title={row.acy}>{row.acy}</td>
                                            <td className={getCellClass('ct', "px-1.5 py-1.5 border-r border-gray-200 text-gray-800")} title={row.ct}>{row.ct}</td>
                                            <td className={getCellClass('use', "px-1.5 py-1.5 border-r border-gray-200 text-gray-800")} title={row.use}>{row.use}</td>
                                            <td className={getCellClass('rooms', "px-1.5 py-1.5 border-r border-gray-200 text-gray-800")} title={row.rooms}>{row.rooms}</td>
                                            <td className={getCellClass('bhk', "px-1.5 py-1.5 border-r border-gray-200 text-gray-800")} title={row.bhk}>{row.bhk}</td>
                                            <td className={getCellClass('toi', "px-1.5 py-1.5 border-r border-gray-200 text-gray-800")} title={row.toi}>{row.toi}</td>
                                            <td className={getCellClass('cArea', "px-1.5 py-1.5 border-r border-gray-200 text-gray-800 text-center")} title={row.cArea}>{row.cArea}</td>
                                            <td className={getCellClass('builtUpArea', "px-1.5 py-1.5 border-r border-gray-200 text-gray-800 text-center")} title={row.builtUpArea}>{row.builtUpArea}</td>
                                            <td className={getCellClass('parkingArea', "px-1.5 py-1.5 border-r border-gray-200 text-gray-800 text-center")} title={row.parkingArea}>{row.parkingArea}</td>
                                            <td className={getCellClass('rv', "px-1.5 py-1.5 border-r border-gray-200 text-gray-800 text-center")} title={row.rv}>{row.rv}</td>
                                            <td className={getCellClass('propTax', "px-1.5 py-1.5 border-r border-gray-200 text-gray-800 text-center")} title={row.propTax}>{row.propTax}</td>
                                            <td className={getCellClass('totalTax', "px-1.5 py-1.5 border-r border-gray-200 text-gray-800 text-center")} title={row.totalTax}>{row.totalTax}</td>
                                            <td className={getCellClass('mobileNo', "px-1.5 py-1.5 border-r border-gray-200 text-gray-800")} title={row.mobileNo}>{row.mobileNo}</td>
                                            <td className={getCellClass('email', "px-1.5 py-1.5 border-r border-gray-200 text-gray-800")} title={row.email}>{row.email}</td>
                                            <td className={getCellClass('ocDate', "px-1.5 py-1.5 border-r border-gray-200 text-gray-800")} title={row.ocDate}>{row.ocDate}</td>
                                            <td className={getCellClass('ocApply', "px-1.5 py-1.5 border-r border-gray-200 text-gray-800")} title={row.ocApply}>{row.ocApply}</td>
                                            <td className={getCellClass('ocNumber', "px-1.5 py-1.5 border-r border-gray-200 text-gray-800")} title={row.ocNumber}>{row.ocNumber}</td>
                                            <td className={getCellClass('enBalArea', "px-1.5 py-1.5 border-r border-gray-200 text-gray-800 text-center")} title={row.enBalArea}>{row.enBalArea}</td>
                                            <td className={getCellClass('opBalArea', "px-1.5 py-1.5 border-r border-gray-200 text-gray-800 text-center")} title={row.opBalArea}>{row.opBalArea}</td>
                                            <td className={getCellClass('wbArea', "px-1.5 py-1.5 border-r border-gray-200 text-gray-800 text-center")} title={row.wbArea}>{row.wbArea}</td>
                                            <td className={getCellClass('taxArea', "px-1.5 py-1.5 border-r border-gray-200 text-gray-800 text-center")} title={row.taxArea}>{row.taxArea}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="32" className="px-4 py-8 text-center text-gray-500 text-sm">
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

export default ResidentialDetailsTable;