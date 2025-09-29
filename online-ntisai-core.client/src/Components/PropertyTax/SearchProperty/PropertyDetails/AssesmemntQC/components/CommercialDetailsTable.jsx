import React, { useState } from "react";
import {
    Eye,
    EyeOff,
    Search,
    ChevronUp,
    ChevronDown,
} from "lucide-react";

interface CommercialDetailsTableProps {
    filterLimit?: number | null;
}

const CommercialDetailsTable = ({
    filterLimit,
}: CommercialDetailsTableProps) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: "asc",
    });
    const [expandedColumns, setExpandedColumns] = useState(
        new Set(),
    );

    const tableData = [
        {
            newPropNo: "1020",
            oldPropNo: "-",
            wing: "1",
            shopNo: "शॉप नाम...",
            shopName: "Self",
            propHolderName: "",
            occupierName: "0",
            rent: "इकत्त",
            propDesc: "1",
            type: "B",
            floor: "2000",
            ay: "2000",
            acy: "A2",
            ct: "S",
            use: "1",
            rooms: "0",
            toi: "1",
            cArea: "147 / 136",
            builtUpArea: "140 / 130",
            parkingArea: "0",
            rv: "59501",
            totalTax: "14529",
            mobileNo: "9876543210",
            email: "owner1@email.com",
            ocDate: "01/01/2020",
            ocApply: "Yes",
            ocNumber: "OC001",
            enBalArea: "15",
            opBalArea: "2",
            wbArea: "150",
            taxArea: "165",
        },
        {
            newPropNo: "1021",
            oldPropNo: "-",
            wing: "2",
            shopNo: "शॉप दो...",
            shopName: "Tenant",
            propHolderName: "नवाब स्मार्ट",
            occupierName: "1",
            rent: "किराया",
            propDesc: "2",
            type: "A",
            floor: "2001",
            ay: "2001",
            acy: "A1",
            ct: "M",
            use: "2",
            rooms: "2",
            toi: "1",
            cArea: "174 / 161",
            builtUpArea: "165 / 153",
            parkingArea: "5",
            rv: "33017",
            totalTax: "6854",
            mobileNo: "9876543211",
            email: "owner2@email.com",
            ocDate: "02/01/2020",
            ocApply: "Yes",
            ocNumber: "OC002",
            enBalArea: "18",
            opBalArea: "3",
            wbArea: "175",
            taxArea: "196",
        },
        {
            newPropNo: "1022",
            oldPropNo: "OLD22",
            wing: "3",
            shopNo: "शॉप तीन",
            shopName: "Medical Store",
            propHolderName: "राम कुमार",
            occupierName: "1",
            rent: "इकत्त",
            propDesc: "3",
            type: "B",
            floor: "2002",
            ay: "2002",
            acy: "A2",
            ct: "S",
            use: "2",
            rooms: "3",
            toi: "2",
            cArea: "156 / 145",
            builtUpArea: "150 / 139",
            parkingArea: "8",
            rv: "28456",
            totalTax: "5894",
            mobileNo: "9876543212",
            email: "ram.kumar@email.com",
            ocDate: "03/01/2020",
            ocApply: "Yes",
            ocNumber: "OC003",
            enBalArea: "20",
            opBalArea: "4",
            wbArea: "160",
            taxArea: "184",
        },
        {
            newPropNo: "1023",
            oldPropNo: "-",
            wing: "4",
            shopNo: "शॉप चार",
            shopName: "Grocery Store",
            propHolderName: "",
            occupierName: "0",
            rent: "इकत्त",
            propDesc: "4",
            type: "C",
            floor: "2003",
            ay: "2003",
            acy: "A3",
            ct: "L",
            use: "1",
            rooms: "1",
            toi: "1",
            cArea: "162 / 150",
            builtUpArea: "155 / 144",
            parkingArea: "0",
            rv: "42789",
            totalTax: "8856",
            mobileNo: "9876543213",
            email: "suresh.patil@email.com",
            ocDate: "04/01/2020",
            ocApply: "No",
            ocNumber: "-",
            enBalArea: "22",
            opBalArea: "5",
            wbArea: "165",
            taxArea: "192",
        },
        {
            newPropNo: "1024",
            oldPropNo: "OLD24",
            wing: "5",
            shopNo: "शॉप पाच",
            shopName: "Electronics",
            propHolderName: "मनोज शर्मा",
            occupierName: "1",
            rent: "किराया",
            propDesc: "5",
            type: "A",
            floor: "2004",
            ay: "2004",
            acy: "A1",
            ct: "M",
            use: "1",
            rooms: "4",
            toi: "2",
            cArea: "143 / 133",
            builtUpArea: "138 / 128",
            parkingArea: "10",
            rv: "24617",
            totalTax: "5103",
            mobileNo: "9876543214",
            email: "manoj.sharma@email.com",
            ocDate: "05/01/2020",
            ocApply: "Yes",
            ocNumber: "OC004",
            enBalArea: "16",
            opBalArea: "2",
            wbArea: "145",
            taxArea: "163",
        },
        {
            newPropNo: "1025",
            oldPropNo: "-",
            wing: "6",
            shopNo: "शॉप सहा",
            shopName: "Clothing Store",
            propHolderName: "",
            occupierName: "0",
            rent: "इकत्त",
            propDesc: "6",
            type: "B",
            floor: "2005",
            ay: "2005",
            acy: "A2",
            ct: "S",
            use: "1",
            rooms: "2",
            toi: "1",
            cArea: "158 / 147",
            builtUpArea: "152 / 141",
            parkingArea: "3",
            rv: "31245",
            totalTax: "6476",
            mobileNo: "9876543215",
            email: "amit.desai@email.com",
            ocDate: "06/01/2020",
            ocApply: "Yes",
            ocNumber: "OC005",
            enBalArea: "19",
            opBalArea: "3",
            wbArea: "160",
            taxArea: "182",
        },
        {
            newPropNo: "1026",
            oldPropNo: "OLD26",
            wing: "7",
            shopNo: "शॉप सात",
            shopName: "Restaurant",
            propHolderName: "विकास अग्रवाल",
            occupierName: "1",
            rent: "किराया",
            propDesc: "7",
            type: "C",
            floor: "2006",
            ay: "2006",
            acy: "A3",
            ct: "L",
            use: "3",
            rooms: "6",
            toi: "3",
            cArea: "171 / 159",
            builtUpArea: "165 / 153",
            parkingArea: "12",
            rv: "48923",
            totalTax: "10135",
            mobileNo: "9876543216",
            email: "vikas.agrawal@email.com",
            ocDate: "07/01/2020",
            ocApply: "Yes",
            ocNumber: "OC006",
            enBalArea: "25",
            opBalArea: "6",
            wbArea: "180",
            taxArea: "211",
        },
        {
            newPropNo: "1027",
            oldPropNo: "-",
            wing: "8",
            shopNo: "शॉप आठ",
            shopName: "Hardware Store",
            propHolderName: "",
            occupierName: "0",
            rent: "इकत्त",
            propDesc: "8",
            type: "B",
            floor: "2007",
            ay: "2007",
            acy: "A2",
            ct: "M",
            use: "1",
            rooms: "3",
            toi: "2",
            cArea: "165 / 153",
            builtUpArea: "160 / 149",
            parkingArea: "5",
            rv: "35678",
            totalTax: "7395",
            mobileNo: "9876543217",
            email: "ramesh.kumar@email.com",
            ocDate: "08/01/2020",
            ocApply: "No",
            ocNumber: "-",
            enBalArea: "20",
            opBalArea: "4",
            wbArea: "170",
            taxArea: "194",
        },
        {
            newPropNo: "1028",
            oldPropNo: "OLD28",
            wing: "9",
            shopNo: "शॉप नऊ",
            shopName: "Book Store",
            propHolderName: "संजय मिश्रा",
            occupierName: "1",
            rent: "इकत्त",
            propDesc: "9",
            type: "A",
            floor: "2008",
            ay: "2008",
            acy: "A1",
            ct: "S",
            use: "1",
            rooms: "2",
            toi: "1",
            cArea: "152 / 141",
            builtUpArea: "148 / 138",
            parkingArea: "2",
            rv: "27834",
            totalTax: "5768",
            mobileNo: "9876543218",
            email: "sanjay.mishra@email.com",
            ocDate: "09/01/2020",
            ocApply: "Yes",
            ocNumber: "OC007",
            enBalArea: "18",
            opBalArea: "2",
            wbArea: "155",
            taxArea: "175",
        },
        {
            newPropNo: "1029",
            oldPropNo: "-",
            wing: "10",
            shopNo: "शॉप दहा",
            shopName: "Pharmacy",
            propHolderName: "",
            occupierName: "0",
            rent: "किराया",
            propDesc: "10",
            type: "B",
            floor: "2009",
            ay: "2009",
            acy: "A2",
            ct: "M",
            use: "2",
            rooms: "3",
            toi: "2",
            cArea: "169 / 157",
            builtUpArea: "162 / 150",
            parkingArea: "7",
            rv: "39567",
            totalTax: "8200",
            mobileNo: "9876543219",
            email: "prakash.joshi@email.com",
            ocDate: "10/01/2020",
            ocApply: "Yes",
            ocNumber: "OC008",
            enBalArea: "22",
            opBalArea: "5",
            wbArea: "175",
            taxArea: "202",
        },
    ];

    const hasMoreRows = tableData.length > 2;

    // Filter data based on search term
    const filteredData = tableData.filter((row) =>
        Object.values(row).some((value) =>
            value
                .toString()
                .toLowerCase()
                .includes(searchTerm.toLowerCase()),
        ),
    );

    // Sort data based on sort configuration
    const sortedData = [...filteredData].sort((a, b) => {
        if (!sortConfig.key) return 0;

        const aValue = a[sortConfig.key]?.toString() || "";
        const bValue = b[sortConfig.key]?.toString() || "";

        // Try to parse as numbers if possible
        const aNum = parseFloat(aValue);
        const bNum = parseFloat(bValue);

        if (!isNaN(aNum) && !isNaN(bNum)) {
            return sortConfig.direction === "asc"
                ? aNum - bNum
                : bNum - aNum;
        }

        // Otherwise sort as strings
        if (sortConfig.direction === "asc") {
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
            const aNum =
                parseInt(a.newPropNo.replace(/\D/g, "")) || 0;
            const bNum =
                parseInt(b.newPropNo.replace(/\D/g, "")) || 0;
            return aNum - bNum; // ascending order for "top" items
        });
        limitedData = sortedByPropNo.slice(0, filterLimit);

        // Re-apply the current sort if active
        if (sortConfig.key) {
            limitedData = [...limitedData].sort((a, b) => {
                const aValue = a[sortConfig.key]?.toString() || "";
                const bValue = b[sortConfig.key]?.toString() || "";

                const aNum = parseFloat(aValue);
                const bNum = parseFloat(bValue);

                if (!isNaN(aNum) && !isNaN(bNum)) {
                    return sortConfig.direction === "asc"
                        ? aNum - bNum
                        : bNum - aNum;
                }

                if (sortConfig.direction === "asc") {
                    return aValue.localeCompare(bValue);
                } else {
                    return bValue.localeCompare(aValue);
                }
            });
        }
    }

    // Show only first 2 rows when collapsed, all rows when expanded (from limited data)
    const displayedData = isExpanded
        ? limitedData
        : limitedData.slice(0, 4);

    const handleToggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    // Handle single click for sorting
    const handleHeaderClick = (columnKey) => {
        let direction = "asc";
        if (
            sortConfig.key === columnKey &&
            sortConfig.direction === "asc"
        ) {
            direction = "desc";
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
        return sortConfig.direction === "asc" ? (
            <ChevronUp className="w-3 h-3 inline ml-1" />
        ) : (
            <ChevronDown className="w-3 h-3 inline ml-1" />
        );
    };

    // Get cell styling based on whether column is expanded
    const getCellClass = (columnKey, baseClass = "") => {
        const expandedClass = expandedColumns.has(columnKey)
            ? "max-w-none whitespace-normal break-words"
            : "max-w-[150px] truncate whitespace-nowrap overflow-hidden";
        return `${baseClass} ${expandedClass}`;
    };

    return (
        <div className="mt-1">
            <div className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                {/* Header */}
                <div className="bg-[#E6F3FF] px-1.5 py-1 border-b border-gray-300 flex items-center justify-between">
                    <h3 className="text-xs font-semibold text-gray-800">
                        Commercial Details
                    </h3>
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
                                title={
                                    isExpanded
                                        ? `Hide rows (${sortedData.length}/${tableData.length} results)`
                                        : `View all ${sortedData.length}/${tableData.length} results with scroll`
                                }
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
                    <div
                        className={
                            isExpanded
                                ? "max-h-[280px] overflow-y-auto scrollbar-corporate"
                                : ""
                        }
                    >
                        <table className="w-full text-[11px]">
                            <thead className="sticky top-0 bg-white">
                                <tr className="bg-[#F5F9FF] border-b border-gray-300">
                                    <th
                                        className="px-1.5 py-0.5 text-left border-r border-gray-300 font-bold text-gray-900 min-w-[60px] text-[11px] leading-tight cursor-pointer hover:bg-blue-100 select-none"
                                        onClick={() =>
                                            handleHeaderClick("newPropNo")
                                        }
                                        onDoubleClick={() =>
                                            handleHeaderDoubleClick("newPropNo")
                                        }
                                        title="Single click to sort, double click to expand column"
                                    >
                                        New PropNo {getSortIcon("newPropNo")}
                                    </th>
                                    <th
                                        className="px-1.5 py-0.5 text-left border-r border-gray-300 font-bold text-gray-900 min-w-[60px] text-[11px] leading-tight cursor-pointer hover:bg-blue-100 select-none"
                                        onClick={() =>
                                            handleHeaderClick("oldPropNo")
                                        }
                                        onDoubleClick={() =>
                                            handleHeaderDoubleClick("oldPropNo")
                                        }
                                        title="Single click to sort, double click to expand column"
                                    >
                                        Old PropNo {getSortIcon("oldPropNo")}
                                    </th>
                                    <th
                                        className="px-1.5 py-0.5 text-left border-r border-gray-300 font-bold text-gray-900 min-w-[50px] text-[11px] leading-tight cursor-pointer hover:bg-blue-100 select-none"
                                        onClick={() => handleHeaderClick("wing")}
                                        onDoubleClick={() =>
                                            handleHeaderDoubleClick("wing")
                                        }
                                        title="Single click to sort, double click to expand column"
                                    >
                                        Wing {getSortIcon("wing")}
                                    </th>
                                    <th
                                        className="px-1.5 py-0.5 text-left border-r border-gray-300 font-bold text-gray-900 min-w-[60px] text-[11px] leading-tight cursor-pointer hover:bg-blue-100 select-none"
                                        onClick={() => handleHeaderClick("shopNo")}
                                        onDoubleClick={() =>
                                            handleHeaderDoubleClick("shopNo")
                                        }
                                        title="Single click to sort, double click to expand column"
                                    >
                                        Shop No {getSortIcon("shopNo")}
                                    </th>
                                    <th
                                        className="px-1.5 py-0.5 text-left border-r border-gray-300 font-bold text-gray-900 min-w-[80px] text-[11px] leading-tight cursor-pointer hover:bg-blue-100 select-none"
                                        onClick={() =>
                                            handleHeaderClick("shopName")
                                        }
                                        onDoubleClick={() =>
                                            handleHeaderDoubleClick("shopName")
                                        }
                                        title="Single click to sort, double click to expand column"
                                    >
                                        Shop Name {getSortIcon("shopName")}
                                    </th>
                                    <th
                                        className="px-1.5 py-0.5 text-left border-r border-gray-300 font-bold text-gray-900 min-w-[100px] text-[11px] leading-tight cursor-pointer hover:bg-blue-100 select-none"
                                        onClick={() =>
                                            handleHeaderClick("propHolderName")
                                        }
                                        onDoubleClick={() =>
                                            handleHeaderDoubleClick("propHolderName")
                                        }
                                        title="Single click to sort, double click to expand column"
                                    >
                                        PropHolder Name{" "}
                                        {getSortIcon("propHolderName")}
                                    </th>
                                    <th
                                        className="px-1.5 py-0.5 text-left border-r border-gray-300 font-bold text-gray-900 min-w-[80px] text-[11px] leading-tight cursor-pointer hover:bg-blue-100 select-none"
                                        onClick={() =>
                                            handleHeaderClick("occupierName")
                                        }
                                        onDoubleClick={() =>
                                            handleHeaderDoubleClick("occupierName")
                                        }
                                        title="Single click to sort, double click to expand column"
                                    >
                                        Occupier Name {getSortIcon("occupierName")}
                                    </th>
                                    <th
                                        className="px-1.5 py-0.5 text-left border-r border-gray-300 font-bold text-gray-900 min-w-[50px] text-[11px] leading-tight cursor-pointer hover:bg-blue-100 select-none"
                                        onClick={() => handleHeaderClick("rent")}
                                        onDoubleClick={() =>
                                            handleHeaderDoubleClick("rent")
                                        }
                                        title="Single click to sort, double click to expand column"
                                    >
                                        Rent {getSortIcon("rent")}
                                    </th>
                                    <th
                                        className="px-1.5 py-0.5 text-left border-r border-gray-300 font-bold text-gray-900 min-w-[60px] text-[11px] leading-tight cursor-pointer hover:bg-blue-100 select-none"
                                        onClick={() =>
                                            handleHeaderClick("propDesc")
                                        }
                                        onDoubleClick={() =>
                                            handleHeaderDoubleClick("propDesc")
                                        }
                                        title="Single click to sort, double click to expand column"
                                    >
                                        Prop Desc {getSortIcon("propDesc")}
                                    </th>
                                    <th
                                        className="px-1.5 py-0.5 text-left border-r border-gray-300 font-bold text-gray-900 min-w-[50px] text-[11px] leading-tight cursor-pointer hover:bg-blue-100 select-none"
                                        onClick={() => handleHeaderClick("type")}
                                        onDoubleClick={() =>
                                            handleHeaderDoubleClick("type")
                                        }
                                        title="Single click to sort, double click to expand column"
                                    >
                                        Type {getSortIcon("type")}
                                    </th>
                                    <th
                                        className="px-1.5 py-0.5 text-left border-r border-gray-300 font-bold text-gray-900 min-w-[50px] text-[11px] leading-tight cursor-pointer hover:bg-blue-100 select-none"
                                        onClick={() => handleHeaderClick("floor")}
                                        onDoubleClick={() =>
                                            handleHeaderDoubleClick("floor")
                                        }
                                        title="Single click to sort, double click to expand column"
                                    >
                                        Floor {getSortIcon("floor")}
                                    </th>
                                    <th
                                        className="px-1.5 py-0.5 text-left border-r border-gray-300 font-bold text-gray-900 min-w-[40px] text-[11px] leading-tight cursor-pointer hover:bg-blue-100 select-none"
                                        onClick={() => handleHeaderClick("ay")}
                                        onDoubleClick={() =>
                                            handleHeaderDoubleClick("ay")
                                        }
                                        title="Single click to sort, double click to expand column"
                                    >
                                        A.Y. {getSortIcon("ay")}
                                    </th>
                                    <th
                                        className="px-1.5 py-0.5 text-left border-r border-gray-300 font-bold text-gray-900 min-w-[50px] text-[11px] leading-tight cursor-pointer hover:bg-blue-100 select-none"
                                        onClick={() => handleHeaderClick("acy")}
                                        onDoubleClick={() =>
                                            handleHeaderDoubleClick("acy")
                                        }
                                        title="Single click to sort, double click to expand column"
                                    >
                                        A.C.Y {getSortIcon("acy")}
                                    </th>
                                    <th
                                        className="px-1.5 py-0.5 text-left border-r border-gray-300 font-bold text-gray-900 min-w-[40px] text-[11px] leading-tight cursor-pointer hover:bg-blue-100 select-none"
                                        onClick={() => handleHeaderClick("ct")}
                                        onDoubleClick={() =>
                                            handleHeaderDoubleClick("ct")
                                        }
                                        title="Single click to sort, double click to expand column"
                                    >
                                        C.T {getSortIcon("ct")}
                                    </th>
                                    <th
                                        className="px-1.5 py-0.5 text-left border-r border-gray-300 font-bold text-gray-900 min-w-[40px] text-[11px] leading-tight cursor-pointer hover:bg-blue-100 select-none"
                                        onClick={() => handleHeaderClick("use")}
                                        onDoubleClick={() =>
                                            handleHeaderDoubleClick("use")
                                        }
                                        title="Single click to sort, double click to expand column"
                                    >
                                        Use {getSortIcon("use")}
                                    </th>
                                    <th
                                        className="px-1.5 py-0.5 text-left border-r border-gray-300 font-bold text-gray-900 min-w-[50px] text-[11px] leading-tight cursor-pointer hover:bg-blue-100 select-none"
                                        onClick={() => handleHeaderClick("rooms")}
                                        onDoubleClick={() =>
                                            handleHeaderDoubleClick("rooms")
                                        }
                                        title="Single click to sort, double click to expand column"
                                    >
                                        Rooms {getSortIcon("rooms")}
                                    </th>
                                    <th
                                        className="px-1.5 py-0.5 text-left border-r border-gray-300 font-bold text-gray-900 min-w-[40px] text-[11px] leading-tight cursor-pointer hover:bg-blue-100 select-none"
                                        onClick={() => handleHeaderClick("toi")}
                                        onDoubleClick={() =>
                                            handleHeaderDoubleClick("toi")
                                        }
                                        title="Single click to sort, double click to expand column"
                                    >
                                        Toi {getSortIcon("toi")}
                                    </th>
                                    <th
                                        className="px-1.5 py-0.5 text-left border-r border-gray-300 font-bold text-gray-900 min-w-[70px] text-[11px] leading-tight cursor-pointer hover:bg-blue-100 select-none"
                                        onClick={() => handleHeaderClick("cArea")}
                                        onDoubleClick={() =>
                                            handleHeaderDoubleClick("cArea")
                                        }
                                        title="Single click to sort, double click to expand column"
                                    >
                                        C.Area(Sqft/SqMtr) {getSortIcon("cArea")}
                                    </th>
                                    <th
                                        className="px-1.5 py-0.5 text-left border-r border-gray-300 font-bold text-gray-900 min-w-[80px] text-[11px] leading-tight cursor-pointer hover:bg-blue-100 select-none"
                                        onClick={() =>
                                            handleHeaderClick("builtUpArea")
                                        }
                                        onDoubleClick={() =>
                                            handleHeaderDoubleClick("builtUpArea")
                                        }
                                        title="Single click to sort, double click to expand column"
                                    >
                                        BuiltUp Area(Sqft/SqMtr){" "}
                                        {getSortIcon("builtUpArea")}
                                    </th>
                                    <th
                                        className="px-1.5 py-0.5 text-left border-r border-gray-300 font-bold text-gray-900 min-w-[80px] text-[11px] leading-tight cursor-pointer hover:bg-blue-100 select-none"
                                        onClick={() =>
                                            handleHeaderClick("parkingArea")
                                        }
                                        onDoubleClick={() =>
                                            handleHeaderDoubleClick("parkingArea")
                                        }
                                        title="Single click to sort, double click to expand column"
                                    >
                                        Parking Area(SqMtr){" "}
                                        {getSortIcon("parkingArea")}
                                    </th>
                                    <th
                                        className="px-1.5 py-0.5 text-left border-r border-gray-300 font-bold text-gray-900 min-w-[60px] text-[11px] leading-tight cursor-pointer hover:bg-blue-100 select-none"
                                        onClick={() => handleHeaderClick("rv")}
                                        onDoubleClick={() =>
                                            handleHeaderDoubleClick("rv")
                                        }
                                        title="Single click to sort, double click to expand column"
                                    >
                                        RV {getSortIcon("rv")}
                                    </th>
                                    <th
                                        className="px-1.5 py-0.5 text-left border-r border-gray-300 font-bold text-gray-900 min-w-[70px] text-[11px] leading-tight cursor-pointer hover:bg-blue-100 select-none"
                                        onClick={() =>
                                            handleHeaderClick("totalTax")
                                        }
                                        onDoubleClick={() =>
                                            handleHeaderDoubleClick("totalTax")
                                        }
                                        title="Single click to sort, double click to expand column"
                                    >
                                        Total Tax {getSortIcon("totalTax")}
                                    </th>
                                    <th
                                        className="px-1.5 py-0.5 text-left border-r border-gray-300 font-bold text-gray-900 min-w-[80px] text-[11px] leading-tight cursor-pointer hover:bg-blue-100 select-none"
                                        onClick={() =>
                                            handleHeaderClick("mobileNo")
                                        }
                                        onDoubleClick={() =>
                                            handleHeaderDoubleClick("mobileNo")
                                        }
                                        title="Single click to sort, double click to expand column"
                                    >
                                        Mobile No {getSortIcon("mobileNo")}
                                    </th>
                                    <th
                                        className="px-1.5 py-0.5 text-left border-r border-gray-300 font-bold text-gray-900 min-w-[120px] text-[11px] leading-tight cursor-pointer hover:bg-blue-100 select-none"
                                        onClick={() => handleHeaderClick("email")}
                                        onDoubleClick={() =>
                                            handleHeaderDoubleClick("email")
                                        }
                                        title="Single click to sort, double click to expand column"
                                    >
                                        Email {getSortIcon("email")}
                                    </th>
                                    <th
                                        className="px-1.5 py-0.5 text-left border-r border-gray-300 font-bold text-gray-900 min-w-[70px] text-[11px] leading-tight cursor-pointer hover:bg-blue-100 select-none"
                                        onClick={() => handleHeaderClick("ocDate")}
                                        onDoubleClick={() =>
                                            handleHeaderDoubleClick("ocDate")
                                        }
                                        title="Single click to sort, double click to expand column"
                                    >
                                        OC Date {getSortIcon("ocDate")}
                                    </th>
                                    <th
                                        className="px-1.5 py-0.5 text-left border-r border-gray-300 font-bold text-gray-900 min-w-[60px] text-[11px] leading-tight cursor-pointer hover:bg-blue-100 select-none"
                                        onClick={() => handleHeaderClick("ocApply")}
                                        onDoubleClick={() =>
                                            handleHeaderDoubleClick("ocApply")
                                        }
                                        title="Single click to sort, double click to expand column"
                                    >
                                        OC Apply {getSortIcon("ocApply")}
                                    </th>
                                    <th
                                        className="px-1.5 py-0.5 text-left border-r border-gray-300 font-bold text-gray-900 min-w-[70px] text-[11px] leading-tight cursor-pointer hover:bg-blue-100 select-none"
                                        onClick={() =>
                                            handleHeaderClick("ocNumber")
                                        }
                                        onDoubleClick={() =>
                                            handleHeaderDoubleClick("ocNumber")
                                        }
                                        title="Single click to sort, double click to expand column"
                                    >
                                        OC Number {getSortIcon("ocNumber")}
                                    </th>
                                    <th
                                        className="px-1.5 py-0.5 text-left border-r border-gray-300 font-bold text-gray-900 min-w-[70px] text-[11px] leading-tight cursor-pointer hover:bg-blue-100 select-none"
                                        onClick={() =>
                                            handleHeaderClick("enBalArea")
                                        }
                                        onDoubleClick={() =>
                                            handleHeaderDoubleClick("enBalArea")
                                        }
                                        title="Single click to sort, double click to expand column"
                                    >
                                        EnBal Area {getSortIcon("enBalArea")}
                                    </th>
                                    <th
                                        className="px-1.5 py-0.5 text-left border-r border-gray-300 font-bold text-gray-900 min-w-[70px] text-[11px] leading-tight cursor-pointer hover:bg-blue-100 select-none"
                                        onClick={() =>
                                            handleHeaderClick("opBalArea")
                                        }
                                        onDoubleClick={() =>
                                            handleHeaderDoubleClick("opBalArea")
                                        }
                                        title="Single click to sort, double click to expand column"
                                    >
                                        OpBal Area {getSortIcon("opBalArea")}
                                    </th>
                                    <th
                                        className="px-1.5 py-0.5 text-left border-r border-gray-300 font-bold text-gray-900 min-w-[60px] text-[11px] leading-tight cursor-pointer hover:bg-blue-100 select-none"
                                        onClick={() => handleHeaderClick("wbArea")}
                                        onDoubleClick={() =>
                                            handleHeaderDoubleClick("wbArea")
                                        }
                                        title="Single click to sort, double click to expand column"
                                    >
                                        W/B Area {getSortIcon("wbArea")}
                                    </th>
                                    <th
                                        className="px-1.5 py-0.5 text-left border-r border-gray-300 font-bold text-gray-900 min-w-[60px] text-[11px] leading-tight cursor-pointer hover:bg-blue-100 select-none"
                                        onClick={() => handleHeaderClick("taxArea")}
                                        onDoubleClick={() =>
                                            handleHeaderDoubleClick("taxArea")
                                        }
                                        title="Single click to sort, double click to expand column"
                                    >
                                        Tax Area {getSortIcon("taxArea")}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayedData.length > 0 ? (
                                    displayedData.map((row, index) => (
                                        <tr
                                            key={index}
                                            className="border-b border-gray-200 hover:bg-gray-50"
                                        >
                                            <td
                                                className={getCellClass(
                                                    "newPropNo",
                                                    "px-1.5 py-1.5 border-r border-gray-200 text-gray-800",
                                                )}
                                                title={row.newPropNo}
                                            >
                                                {row.newPropNo}
                                            </td>
                                            <td
                                                className={getCellClass(
                                                    "oldPropNo",
                                                    "px-1.5 py-1.5 border-r border-gray-200 text-gray-800",
                                                )}
                                                title={row.oldPropNo}
                                            >
                                                {row.oldPropNo}
                                            </td>
                                            <td
                                                className={getCellClass(
                                                    "wing",
                                                    "px-1.5 py-1.5 border-r border-gray-200 text-gray-800",
                                                )}
                                                title={row.wing}
                                            >
                                                {row.wing}
                                            </td>
                                            <td
                                                className={getCellClass(
                                                    "shopNo",
                                                    "px-1.5 py-1.5 border-r border-gray-200 text-gray-800",
                                                )}
                                                title={row.shopNo}
                                            >
                                                {row.shopNo}
                                            </td>
                                            <td
                                                className={getCellClass(
                                                    "shopName",
                                                    "px-1.5 py-1.5 border-r border-gray-200 text-gray-800",
                                                )}
                                                title={row.shopName}
                                            >
                                                {row.shopName}
                                            </td>
                                            <td
                                                className={getCellClass(
                                                    "propHolderName",
                                                    "px-1.5 py-1.5 border-r border-gray-200 text-gray-800",
                                                )}
                                                title={row.propHolderName}
                                            >
                                                {row.propHolderName}
                                            </td>
                                            <td
                                                className={getCellClass(
                                                    "occupierName",
                                                    "px-1.5 py-1.5 border-r border-gray-200 text-gray-800",
                                                )}
                                                title={row.occupierName}
                                            >
                                                {row.occupierName}
                                            </td>
                                            <td
                                                className={getCellClass(
                                                    "rent",
                                                    "px-1.5 py-1.5 border-r border-gray-200 text-gray-800",
                                                )}
                                                title={row.rent}
                                            >
                                                {row.rent}
                                            </td>
                                            <td
                                                className={getCellClass(
                                                    "propDesc",
                                                    "px-1.5 py-1.5 border-r border-gray-200 text-gray-800",
                                                )}
                                                title={row.propDesc}
                                            >
                                                {row.propDesc}
                                            </td>
                                            <td
                                                className={getCellClass(
                                                    "type",
                                                    "px-1.5 py-1.5 border-r border-gray-200 text-gray-800",
                                                )}
                                                title={row.type}
                                            >
                                                {row.type}
                                            </td>
                                            <td
                                                className={getCellClass(
                                                    "floor",
                                                    "px-1.5 py-1.5 border-r border-gray-200 text-gray-800",
                                                )}
                                                title={row.floor}
                                            >
                                                {row.floor}
                                            </td>
                                            <td
                                                className={getCellClass(
                                                    "ay",
                                                    "px-1.5 py-1.5 border-r border-gray-200 text-gray-800",
                                                )}
                                                title={row.ay}
                                            >
                                                {row.ay}
                                            </td>
                                            <td
                                                className={getCellClass(
                                                    "acy",
                                                    "px-1.5 py-1.5 border-r border-gray-200 text-gray-800",
                                                )}
                                                title={row.acy}
                                            >
                                                {row.acy}
                                            </td>
                                            <td
                                                className={getCellClass(
                                                    "ct",
                                                    "px-1.5 py-1.5 border-r border-gray-200 text-gray-800",
                                                )}
                                                title={row.ct}
                                            >
                                                {row.ct}
                                            </td>
                                            <td
                                                className={getCellClass(
                                                    "use",
                                                    "px-1.5 py-1.5 border-r border-gray-200 text-gray-800",
                                                )}
                                                title={row.use}
                                            >
                                                {row.use}
                                            </td>
                                            <td
                                                className={getCellClass(
                                                    "rooms",
                                                    "px-1.5 py-1.5 border-r border-gray-200 text-gray-800",
                                                )}
                                                title={row.rooms}
                                            >
                                                {row.rooms}
                                            </td>
                                            <td
                                                className={getCellClass(
                                                    "toi",
                                                    "px-1.5 py-1.5 border-r border-gray-200 text-gray-800",
                                                )}
                                                title={row.toi}
                                            >
                                                {row.toi}
                                            </td>
                                            <td
                                                className={getCellClass(
                                                    "cArea",
                                                    "px-1.5 py-1.5 border-r border-gray-200 text-gray-800 text-center",
                                                )}
                                                title={row.cArea}
                                            >
                                                {row.cArea}
                                            </td>
                                            <td
                                                className={getCellClass(
                                                    "builtUpArea",
                                                    "px-1.5 py-1.5 border-r border-gray-200 text-gray-800 text-center",
                                                )}
                                                title={row.builtUpArea}
                                            >
                                                {row.builtUpArea}
                                            </td>
                                            <td
                                                className={getCellClass(
                                                    "parkingArea",
                                                    "px-1.5 py-1.5 border-r border-gray-200 text-gray-800 text-center",
                                                )}
                                                title={row.parkingArea}
                                            >
                                                {row.parkingArea}
                                            </td>
                                            <td
                                                className={getCellClass(
                                                    "rv",
                                                    "px-1.5 py-1.5 border-r border-gray-200 text-gray-800 text-center",
                                                )}
                                                title={row.rv}
                                            >
                                                {row.rv}
                                            </td>
                                            <td
                                                className={getCellClass(
                                                    "totalTax",
                                                    "px-1.5 py-1.5 border-r border-gray-200 text-gray-800 text-center",
                                                )}
                                                title={row.totalTax}
                                            >
                                                {row.totalTax}
                                            </td>
                                            <td
                                                className={getCellClass(
                                                    "mobileNo",
                                                    "px-1.5 py-1.5 border-r border-gray-200 text-gray-800",
                                                )}
                                                title={row.mobileNo}
                                            >
                                                {row.mobileNo}
                                            </td>
                                            <td
                                                className={getCellClass(
                                                    "email",
                                                    "px-1.5 py-1.5 border-r border-gray-200 text-gray-800",
                                                )}
                                                title={row.email}
                                            >
                                                {row.email}
                                            </td>
                                            <td
                                                className={getCellClass(
                                                    "ocDate",
                                                    "px-1.5 py-1.5 border-r border-gray-200 text-gray-800",
                                                )}
                                                title={row.ocDate}
                                            >
                                                {row.ocDate}
                                            </td>
                                            <td
                                                className={getCellClass(
                                                    "ocApply",
                                                    "px-1.5 py-1.5 border-r border-gray-200 text-gray-800",
                                                )}
                                                title={row.ocApply}
                                            >
                                                {row.ocApply}
                                            </td>
                                            <td
                                                className={getCellClass(
                                                    "ocNumber",
                                                    "px-1.5 py-1.5 border-r border-gray-200 text-gray-800",
                                                )}
                                                title={row.ocNumber}
                                            >
                                                {row.ocNumber}
                                            </td>
                                            <td
                                                className={getCellClass(
                                                    "enBalArea",
                                                    "px-1.5 py-1.5 border-r border-gray-200 text-gray-800 text-center",
                                                )}
                                                title={row.enBalArea}
                                            >
                                                {row.enBalArea}
                                            </td>
                                            <td
                                                className={getCellClass(
                                                    "opBalArea",
                                                    "px-1.5 py-1.5 border-r border-gray-200 text-gray-800 text-center",
                                                )}
                                                title={row.opBalArea}
                                            >
                                                {row.opBalArea}
                                            </td>
                                            <td
                                                className={getCellClass(
                                                    "wbArea",
                                                    "px-1.5 py-1.5 border-r border-gray-200 text-gray-800 text-center",
                                                )}
                                                title={row.wbArea}
                                            >
                                                {row.wbArea}
                                            </td>
                                            <td
                                                className={getCellClass(
                                                    "taxArea",
                                                    "px-1.5 py-1.5 border-r border-gray-200 text-gray-800 text-center",
                                                )}
                                                title={row.taxArea}
                                            >
                                                {row.taxArea}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="30"
                                            className="px-4 py-8 text-center text-gray-500 text-sm"
                                        >
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

export default CommercialDetailsTable;