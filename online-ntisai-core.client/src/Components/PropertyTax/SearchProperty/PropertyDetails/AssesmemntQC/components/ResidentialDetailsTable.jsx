import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Search, ChevronUp, ChevronDown, ExternalLink } from 'lucide-react';

interface ResidentialDetailsTableProps {
    filterLimit?: number | null;
}

const ResidentialDetailsTable = ({ filterLimit }: ResidentialDetailsTableProps) => {
    const navigate = useNavigate();
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
                    <h3 className="text-xl font-semibold text-white">Residential Details</h3>
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
                                        className="px-2 py-1.5 text-left border-r border-[#81d4fa] font-bold text-[#01579b] min-w-[60px] text-[11px] leading-tight cursor-pointer hover:bg-[#b3e5fc] transition-colors select-none"
                                        onClick={() => handleHeaderClick('newPropNo')}
                                        onDoubleClick={() => handleHeaderDoubleClick('newPropNo')}
                                        title="Single click to sort, double click to expand column"
                                    >
                                        New PropNo {getSortIcon('newPropNo')}
                                    </th>
                                    <th
                                        className="px-2 py-1.5 text-left border-r border-[#81d4fa] font-bold text-[#01579b] min-w-[60px] text-[11px] leading-tight cursor-pointer hover:bg-[#b3e5fc] transition-colors select-none"
                                        onClick={() => handleHeaderClick('oldPropNo')}
                                        onDoubleClick={() => handleHeaderDoubleClick('oldPropNo')}
                                        title="Single click to sort, double click to expand column"
                                    >
                                        Old PropNo {getSortIcon('oldPropNo')}
                                    </th>
                                    <th
                                        className="px-2 py-1.5 text-left border-r border-[#81d4fa] font-bold text-[#01579b] min-w-[50px] text-[11px] leading-tight cursor-pointer hover:bg-[#b3e5fc] transition-colors select-none"
                                        onClick={() => handleHeaderClick('wing')}
                                        onDoubleClick={() => handleHeaderDoubleClick('wing')}
                                        title="Single click to sort, double click to expand column"
                                    >
                                        Wing {getSortIcon('wing')}
                                    </th>
                                    <th
                                        className="px-2 py-1.5 text-left border-r border-[#81d4fa] font-bold text-[#01579b] min-w-[60px] text-[11px] leading-tight cursor-pointer hover:bg-[#b3e5fc] transition-colors select-none"
                                        onClick={() => handleHeaderClick('shopNo')}
                                        onDoubleClick={() => handleHeaderDoubleClick('shopNo')}
                                        title="Single click to sort, double click to expand column"
                                    >
                                        Shop No {getSortIcon('shopNo')}
                                    </th>
                                    <th
                                        className="px-2 py-1.5 text-left border-r border-[#81d4fa] font-bold text-[#01579b] min-w-[80px] text-[11px] leading-tight cursor-pointer hover:bg-[#b3e5fc] transition-colors select-none"
                                        onClick={() => handleHeaderClick('shopName')}
                                        onDoubleClick={() => handleHeaderDoubleClick('shopName')}
                                        title="Single click to sort, double click to expand column"
                                    >
                                        Shop Name {getSortIcon('shopName')}
                                    </th>
                                    <th
                                        className="px-2 py-1.5 text-left border-r border-[#81d4fa] font-bold text-[#01579b] min-w-[100px] text-[11px] leading-tight cursor-pointer hover:bg-[#b3e5fc] transition-colors select-none"
                                        onClick={() => handleHeaderClick('propHolderName')}
                                        onDoubleClick={() => handleHeaderDoubleClick('propHolderName')}
                                        title="Single click to sort, double click to expand column"
                                    >
                                        PropHolder Name {getSortIcon('propHolderName')}
                                    </th>
                                    <th
                                        className="px-2 py-1.5 text-left border-r border-[#81d4fa] font-bold text-[#01579b] min-w-[80px] text-[11px] leading-tight cursor-pointer hover:bg-[#b3e5fc] transition-colors select-none"
                                        onClick={() => handleHeaderClick('occupierName')}
                                        onDoubleClick={() => handleHeaderDoubleClick('occupierName')}
                                        title="Single click to sort, double click to expand column"
                                    >
                                        Occupier Name {getSortIcon('occupierName')}
                                    </th>
                                    <th
                                        className="px-2 py-1.5 text-left border-r border-[#81d4fa] font-bold text-[#01579b] min-w-[50px] text-[11px] leading-tight cursor-pointer hover:bg-[#b3e5fc] transition-colors select-none"
                                        onClick={() => handleHeaderClick('rent')}
                                        onDoubleClick={() => handleHeaderDoubleClick('rent')}
                                        title="Single click to sort, double click to expand column"
                                    >
                                        Rent {getSortIcon('rent')}
                                    </th>
                                    <th
                                        className="px-2 py-1.5 text-left border-r border-[#81d4fa] font-bold text-[#01579b] min-w-[60px] text-[11px] leading-tight cursor-pointer hover:bg-[#b3e5fc] transition-colors select-none"
                                        onClick={() => handleHeaderClick('propDesc')}
                                        onDoubleClick={() => handleHeaderDoubleClick('propDesc')}
                                        title="Single click to sort, double click to expand column"
                                    >
                                        Prop Desc {getSortIcon('propDesc')}
                                    </th>
                                    <th
                                        className="px-2 py-1.5 text-left border-r border-[#81d4fa] font-bold text-[#01579b] min-w-[50px] text-[11px] leading-tight cursor-pointer hover:bg-[#b3e5fc] transition-colors select-none"
                                        onClick={() => handleHeaderClick('type')}
                                        onDoubleClick={() => handleHeaderDoubleClick('type')}
                                        title="Single click to sort, double click to expand column"
                                    >
                                        Type {getSortIcon('type')}
                                    </th>
                                    <th
                                        className="px-2 py-1.5 text-left border-r border-[#81d4fa] font-bold text-[#01579b] min-w-[50px] text-[11px] leading-tight cursor-pointer hover:bg-[#b3e5fc] transition-colors select-none"
                                        onClick={() => handleHeaderClick('floor')}
                                        onDoubleClick={() => handleHeaderDoubleClick('floor')}
                                        title="Single click to sort, double click to expand column"
                                    >
                                        Floor {getSortIcon('floor')}
                                    </th>
                                    <th
                                        className="px-2 py-1.5 text-left border-r border-[#81d4fa] font-bold text-[#01579b] min-w-[40px] text-[11px] leading-tight cursor-pointer hover:bg-[#b3e5fc] transition-colors select-none"
                                        onClick={() => handleHeaderClick('ay')}
                                        onDoubleClick={() => handleHeaderDoubleClick('ay')}
                                        title="Single click to sort, double click to expand column"
                                    >
                                        A.Y. {getSortIcon('ay')}
                                    </th>
                                    <th
                                        className="px-2 py-1.5 text-left border-r border-[#81d4fa] font-bold text-[#01579b] min-w-[50px] text-[11px] leading-tight cursor-pointer hover:bg-[#b3e5fc] transition-colors select-none"
                                        onClick={() => handleHeaderClick('acy')}
                                        onDoubleClick={() => handleHeaderDoubleClick('acy')}
                                        title="Single click to sort, double click to expand column"
                                    >
                                        A.C.Y {getSortIcon('acy')}
                                    </th>
                                    <th
                                        className="px-2 py-1.5 text-left border-r border-[#81d4fa] font-bold text-[#01579b] min-w-[40px] text-[11px] leading-tight cursor-pointer hover:bg-[#b3e5fc] transition-colors select-none"
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
                                            <td className={getCellClass('oldPropNo', "px-2 py-1.5 border-r border-[#b3e5fc] text-[#455a64]")} title={row.oldPropNo}>{row.oldPropNo}</td>
                                            <td className={getCellClass('wing', "px-2 py-1.5 border-r border-[#b3e5fc] text-[#455a64]")} title={row.wing}>{row.wing}</td>
                                            <td className={getCellClass('shopNo', "px-2 py-1.5 border-r border-[#b3e5fc] text-[#455a64]")} title={row.shopNo}>{row.shopNo}</td>
                                            <td className={getCellClass('shopName', "px-2 py-1.5 border-r border-[#b3e5fc] text-[#455a64]")} title={row.shopName}>{row.shopName}</td>
                                            <td className={getCellClass('propHolderName', "px-2 py-1.5 border-r border-[#b3e5fc] text-[#455a64]")} title={row.propHolderName}>{row.propHolderName}</td>
                                            <td className={getCellClass('occupierName', "px-2 py-1.5 border-r border-[#b3e5fc] text-[#455a64]")} title={row.occupierName}>{row.occupierName}</td>
                                            <td className={getCellClass('rent', "px-2 py-1.5 border-r border-[#b3e5fc] text-[#455a64]")} title={row.rent}>{row.rent}</td>
                                            <td className={getCellClass('propDesc', "px-2 py-1.5 border-r border-[#b3e5fc] text-[#455a64]")} title={row.propDesc}>{row.propDesc}</td>
                                            <td className={getCellClass('type', "px-2 py-1.5 border-r border-[#b3e5fc] text-[#455a64]")} title={row.type}>{row.type}</td>
                                            <td className={getCellClass('floor', "px-2 py-1.5 border-r border-[#b3e5fc] text-[#455a64]")} title={row.floor}>{row.floor}</td>
                                            <td className={getCellClass('ay', "px-2 py-1.5 border-r border-[#b3e5fc] text-[#455a64]")} title={row.ay}>{row.ay}</td>
                                            <td className={getCellClass('acy', "px-2 py-1.5 border-r border-[#b3e5fc] text-[#455a64]")} title={row.acy}>{row.acy}</td>
                                            <td className={getCellClass('ct', "px-2 py-1.5 border-r border-[#b3e5fc] text-[#455a64]")} title={row.ct}>{row.ct}</td>
                                            <td className={getCellClass('use', "px-2 py-1.5 border-r border-[#b3e5fc] text-[#455a64]")} title={row.use}>{row.use}</td>
                                            <td className={getCellClass('rooms', "px-2 py-1.5 border-r border-[#b3e5fc] text-[#455a64]")} title={row.rooms}>{row.rooms}</td>
                                            <td className={getCellClass('bhk', "px-2 py-1.5 border-r border-[#b3e5fc] text-[#455a64]")} title={row.bhk}>{row.bhk}</td>
                                            <td className={getCellClass('toi', "px-2 py-1.5 border-r border-[#b3e5fc] text-[#455a64]")} title={row.toi}>{row.toi}</td>
                                            <td className={getCellClass('cArea', "px-2 py-1.5 border-r border-[#b3e5fc] text-[#455a64] text-center")} title={row.cArea}>{row.cArea}</td>
                                            <td className={getCellClass('builtUpArea', "px-2 py-1.5 border-r border-[#b3e5fc] text-[#455a64] text-center")} title={row.builtUpArea}>{row.builtUpArea}</td>
                                            <td className={getCellClass('parkingArea', "px-2 py-1.5 border-r border-[#b3e5fc] text-[#455a64] text-center")} title={row.parkingArea}>{row.parkingArea}</td>
                                            <td className={getCellClass('rv', "px-2 py-1.5 border-r border-[#b3e5fc] text-[#0277bd] text-center font-medium")} title={row.rv}>{row.rv}</td>
                                            <td className={getCellClass('totalTax', "px-2 py-1.5 border-r border-[#b3e5fc] text-[#0277bd] text-center font-medium")} title={row.totalTax}>{row.totalTax}</td>
                                            <td className={getCellClass('mobileNo', "px-2 py-1.5 border-r border-[#b3e5fc] text-[#455a64]")} title={row.mobileNo}>{row.mobileNo}</td>
                                            <td className={getCellClass('email', "px-2 py-1.5 border-r border-[#b3e5fc] text-[#455a64]")} title={row.email}>{row.email}</td>
                                            <td className={getCellClass('ocDate', "px-2 py-1.5 border-r border-[#b3e5fc] text-[#455a64]")} title={row.ocDate}>{row.ocDate}</td>
                                            <td className={getCellClass('ocApply', "px-2 py-1.5 border-r border-[#b3e5fc] text-[#455a64]")} title={row.ocApply}>{row.ocApply}</td>
                                            <td className={getCellClass('ocNumber', "px-2 py-1.5 border-r border-[#b3e5fc] text-[#455a64]")} title={row.ocNumber}>{row.ocNumber}</td>
                                            <td className={getCellClass('enBalArea', "px-2 py-1.5 border-r border-[#b3e5fc] text-[#455a64] text-center")} title={row.enBalArea}>{row.enBalArea}</td>
                                            <td className={getCellClass('opBalArea', "px-2 py-1.5 border-r border-[#b3e5fc] text-[#455a64] text-center")} title={row.opBalArea}>{row.opBalArea}</td>
                                            <td className={getCellClass('wbArea', "px-2 py-1.5 border-r border-[#b3e5fc] text-[#455a64] text-center")} title={row.wbArea}>{row.wbArea}</td>
                                            <td className={getCellClass('taxArea', "px-2 py-1.5 border-r border-[#b3e5fc] text-[#455a64] text-center")} title={row.taxArea}>{row.taxArea}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="33" className="px-4 py-8 text-center text-[#455a64] text-sm bg-[#f5f5f5]">
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