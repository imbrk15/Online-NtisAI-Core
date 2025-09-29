import React, { useState } from 'react';
import { Eye, EyeOff, Search } from 'lucide-react';

const CommercialDetailsTable = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    
    const tableData = [
        {
            newPropNo: "1020",
            oldPropNo: "-",
            wing: "1",
            shopNo: "शॉप नाम...",
            shopName: "Self",
            ownerType: "श्री आर.साहेब राजेंद्र...",
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
            cArea: "147",
            builtUpArea: "140",
            parkingArea: "0",
            mobileNo: "9876543210",
            email: "owner1@email.com",
            ocDate: "01/01/2020",
            ocApply: "Yes",
            ocNumber: "OC001",
            enBalArea: "15",
            opBalArea: "2",
            wbArea: "150",
            taxArea: "165",
            yrRate: "12.5"
        },
        {
            newPropNo: "1021",
            oldPropNo: "-",
            wing: "2",
            shopNo: "शॉप दो...",
            shopName: "Tenant",
            ownerType: "श्री नवाब स्मार्ट ...",
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
            cArea: "174",
            builtUpArea: "165",
            parkingArea: "5",
            mobileNo: "9876543211",
            email: "owner2@email.com",
            ocDate: "02/01/2020",
            ocApply: "Yes",
            ocNumber: "OC002",
            enBalArea: "18",
            opBalArea: "3",
            wbArea: "175",
            taxArea: "196",
            yrRate: "13.0"
        },
        {
            newPropNo: "1022",
            oldPropNo: "OLD22",
            wing: "3",
            shopNo: "शॉप तीन",
            shopName: "Medical Store",
            ownerType: "श्री राम कुमार...",
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
            cArea: "156",
            builtUpArea: "150",
            parkingArea: "8",
            mobileNo: "9876543212",
            email: "ram.kumar@email.com",
            ocDate: "03/01/2020",
            ocApply: "Yes",
            ocNumber: "OC003",
            enBalArea: "20",
            opBalArea: "4",
            wbArea: "160",
            taxArea: "184",
            yrRate: "14.2"
        },
        {
            newPropNo: "1023",
            oldPropNo: "-",
            wing: "4",
            shopNo: "शॉप चार",
            shopName: "Grocery Store",
            ownerType: "श्री सुरेश पाटील...",
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
            cArea: "162",
            builtUpArea: "155",
            parkingArea: "0",
            mobileNo: "9876543213",
            email: "suresh.patil@email.com",
            ocDate: "04/01/2020",
            ocApply: "No",
            ocNumber: "-",
            enBalArea: "22",
            opBalArea: "5",
            wbArea: "165",
            taxArea: "192",
            yrRate: "15.8"
        },
        {
            newPropNo: "1024",
            oldPropNo: "OLD24",
            wing: "5",
            shopNo: "शॉप पाच",
            shopName: "Electronics",
            ownerType: "श्री मनोज शर्मा...",
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
            cArea: "143",
            builtUpArea: "138",
            parkingArea: "10",
            mobileNo: "9876543214",
            email: "manoj.sharma@email.com",
            ocDate: "05/01/2020",
            ocApply: "Yes",
            ocNumber: "OC004",
            enBalArea: "16",
            opBalArea: "2",
            wbArea: "145",
            taxArea: "163",
            yrRate: "11.8"
        },
        {
            newPropNo: "1025",
            oldPropNo: "-",
            wing: "6",
            shopNo: "शॉप सहा",
            shopName: "Clothing Store",
            ownerType: "श्री अमित देसाई...",
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
            cArea: "158",
            builtUpArea: "152",
            parkingArea: "3",
            mobileNo: "9876543215",
            email: "amit.desai@email.com",
            ocDate: "06/01/2020",
            ocApply: "Yes",
            ocNumber: "OC005",
            enBalArea: "19",
            opBalArea: "3",
            wbArea: "160",
            taxArea: "182",
            yrRate: "13.5"
        },
        {
            newPropNo: "1026",
            oldPropNo: "OLD26",
            wing: "7",
            shopNo: "शॉप सात",
            shopName: "Restaurant",
            ownerType: "श्री विकास अग्रवाल...",
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
            cArea: "171",
            builtUpArea: "165",
            parkingArea: "12",
            mobileNo: "9876543216",
            email: "vikas.agrawal@email.com",
            ocDate: "07/01/2020",
            ocApply: "Yes",
            ocNumber: "OC006",
            enBalArea: "25",
            opBalArea: "6",
            wbArea: "180",
            taxArea: "211",
            yrRate: "16.2"
        },
        {
            newPropNo: "1027",
            oldPropNo: "-",
            wing: "8",
            shopNo: "शॉप आठ",
            shopName: "Hardware Store",
            ownerType: "श्री रमेश कुमार...",
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
            cArea: "165",
            builtUpArea: "160",
            parkingArea: "5",
            mobileNo: "9876543217",
            email: "ramesh.kumar@email.com",
            ocDate: "08/01/2020",
            ocApply: "No",
            ocNumber: "-",
            enBalArea: "20",
            opBalArea: "4",
            wbArea: "170",
            taxArea: "194",
            yrRate: "14.8"
        },
        {
            newPropNo: "1028",
            oldPropNo: "OLD28",
            wing: "9",
            shopNo: "शॉप नऊ",
            shopName: "Book Store",
            ownerType: "श्री संजय मिश्रा...",
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
            cArea: "152",
            builtUpArea: "148",
            parkingArea: "2",
            mobileNo: "9876543218",
            email: "sanjay.mishra@email.com",
            ocDate: "09/01/2020",
            ocApply: "Yes",
            ocNumber: "OC007",
            enBalArea: "18",
            opBalArea: "2",
            wbArea: "155",
            taxArea: "175",
            yrRate: "12.8"
        },
        {
            newPropNo: "1029",
            oldPropNo: "-",
            wing: "10",
            shopNo: "शॉप दहा",
            shopName: "Pharmacy",
            ownerType: "श्री प्रकाश जोशी...",
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
            cArea: "169",
            builtUpArea: "162",
            parkingArea: "7",
            mobileNo: "9876543219",
            email: "prakash.joshi@email.com",
            ocDate: "10/01/2020",
            ocApply: "Yes",
            ocNumber: "OC008",
            enBalArea: "22",
            opBalArea: "5",
            wbArea: "175",
            taxArea: "202",
            yrRate: "15.5"
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
                    <h3 className="text-xs font-semibold text-gray-800">Commercial Details</h3>
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
                                    <th className="px-1.5 py-0.5 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[60px] text-[11px] leading-tight">
                                        New PropNo
                                    </th>
                                    <th className="px-1.5 py-0.5 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[60px] text-[11px] leading-tight">
                                        Old PropNo
                                    </th>
                                    <th className="px-1.5 py-0.5 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[50px] text-[11px] leading-tight">
                                        Wing
                                    </th>
                                    <th className="px-1.5 py-0.5 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[60px] text-[11px] leading-tight">
                                        Shop No
                                    </th>
                                    <th className="px-1.5 py-0.5 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[80px] text-[11px] leading-tight">
                                        Shop Name
                                    </th>
                                    <th className="px-1.5 py-0.5 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[60px] text-[11px] leading-tight">
                                        Owner Type
                                    </th>
                                    <th className="px-1.5 py-0.5 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[100px] text-[11px] leading-tight">
                                        PropHolder Name
                                    </th>
                                    <th className="px-1.5 py-0.5 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[80px] text-[11px] leading-tight">
                                        Occupier Name
                                    </th>
                                    <th className="px-1.5 py-0.5 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[50px] text-[11px] leading-tight">
                                        Rent
                                    </th>
                                    <th className="px-1.5 py-0.5 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[60px] text-[11px] leading-tight">
                                        Prop Desc
                                    </th>
                                    <th className="px-1.5 py-0.5 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[50px] text-[11px] leading-tight">
                                        Type
                                    </th>
                                    <th className="px-1.5 py-0.5 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[50px] text-[11px] leading-tight">
                                        Floor
                                    </th>
                                    <th className="px-1.5 py-0.5 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[40px] text-[11px] leading-tight">
                                        A.Y.
                                    </th>
                                    <th className="px-1.5 py-0.5 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[50px] text-[11px] leading-tight">
                                        A.C.Y
                                    </th>
                                    <th className="px-1.5 py-0.5 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[40px] text-[11px] leading-tight">
                                        C.T
                                    </th>
                                    <th className="px-1.5 py-0.5 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[40px] text-[11px] leading-tight">
                                        Use
                                    </th>
                                    <th className="px-1.5 py-0.5 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[50px] text-[11px] leading-tight">
                                        Rooms
                                    </th>
                                    <th className="px-1.5 py-0.5 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[40px] text-[11px] leading-tight">
                                        Toi
                                    </th>
                                    <th className="px-1.5 py-0.5 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[70px] text-[11px] leading-tight">
                                        C.Area(SqMtr)
                                    </th>
                                    <th className="px-1.5 py-0.5 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[80px] text-[11px] leading-tight">
                                        BuiltUp Area(SqMtr)
                                    </th>
                                    <th className="px-1.5 py-0.5 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[80px] text-[11px] leading-tight">
                                        Parking Area(SqMtr)
                                    </th>
                                    <th className="px-1.5 py-0.5 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[80px] text-[11px] leading-tight">
                                        Mobile No
                                    </th>
                                    <th className="px-1.5 py-0.5 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[120px] text-[11px] leading-tight">
                                        Email
                                    </th>
                                    <th className="px-1.5 py-0.5 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[70px] text-[11px] leading-tight">
                                        OC Date
                                    </th>
                                    <th className="px-1.5 py-0.5 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[60px] text-[11px] leading-tight">
                                        OC Apply
                                    </th>
                                    <th className="px-1.5 py-0.5 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[70px] text-[11px] leading-tight">
                                        OC Number
                                    </th>
                                    <th className="px-1.5 py-0.5 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[70px] text-[11px] leading-tight">
                                        EnBal Area
                                    </th>
                                    <th className="px-1.5 py-0.5 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[70px] text-[11px] leading-tight">
                                        OpBal Area
                                    </th>
                                    <th className="px-1.5 py-0.5 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[60px] text-[11px] leading-tight">
                                        W/B Area
                                    </th>
                                    <th className="px-1.5 py-0.5 text-left border-r border-gray-300 font-semibold text-gray-700 min-w-[60px] text-[11px] leading-tight">
                                        Tax Area
                                    </th>
                                    <th className="px-1.5 py-0.5 text-left font-semibold text-gray-700 min-w-[60px] text-[11px] leading-tight">
                                        Yr Rate
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayedData.length > 0 ? (
                                    displayedData.map((row, index) => (
                                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                                            <td className="px-1.5 py-1.5 border-r border-gray-200 text-gray-800">{row.newPropNo}</td>
                                            <td className="px-1.5 py-1.5 border-r border-gray-200 text-gray-800">{row.oldPropNo}</td>
                                            <td className="px-1.5 py-1.5 border-r border-gray-200 text-gray-800">{row.wing}</td>
                                            <td className="px-1.5 py-1.5 border-r border-gray-200 text-gray-800">{row.shopNo}</td>
                                            <td className="px-1.5 py-1.5 border-r border-gray-200 text-gray-800">{row.shopName}</td>
                                            <td className="px-1.5 py-1.5 border-r border-gray-200 text-gray-800">{row.ownerType}</td>
                                            <td className="px-1.5 py-1.5 border-r border-gray-200 text-gray-800">{row.propHolderName}</td>
                                            <td className="px-1.5 py-1.5 border-r border-gray-200 text-gray-800">{row.occupierName}</td>
                                            <td className="px-1.5 py-1.5 border-r border-gray-200 text-gray-800">{row.rent}</td>
                                            <td className="px-1.5 py-1.5 border-r border-gray-200 text-gray-800">{row.propDesc}</td>
                                            <td className="px-1.5 py-1.5 border-r border-gray-200 text-gray-800">{row.type}</td>
                                            <td className="px-1.5 py-1.5 border-r border-gray-200 text-gray-800">{row.floor}</td>
                                            <td className="px-1.5 py-1.5 border-r border-gray-200 text-gray-800">{row.ay}</td>
                                            <td className="px-1.5 py-1.5 border-r border-gray-200 text-gray-800">{row.acy}</td>
                                            <td className="px-1.5 py-1.5 border-r border-gray-200 text-gray-800">{row.ct}</td>
                                            <td className="px-1.5 py-1.5 border-r border-gray-200 text-gray-800">{row.use}</td>
                                            <td className="px-1.5 py-1.5 border-r border-gray-200 text-gray-800">{row.rooms}</td>
                                            <td className="px-1.5 py-1.5 border-r border-gray-200 text-gray-800">{row.toi}</td>
                                            <td className="px-1.5 py-1.5 border-r border-gray-200 text-gray-800 text-center">{row.cArea}</td>
                                            <td className="px-1.5 py-1.5 border-r border-gray-200 text-gray-800 text-center">{row.builtUpArea}</td>
                                            <td className="px-1.5 py-1.5 border-r border-gray-200 text-gray-800 text-center">{row.parkingArea}</td>
                                            <td className="px-1.5 py-1.5 border-r border-gray-200 text-gray-800">{row.mobileNo}</td>
                                            <td className="px-1.5 py-1.5 border-r border-gray-200 text-gray-800">{row.email}</td>
                                            <td className="px-1.5 py-1.5 border-r border-gray-200 text-gray-800">{row.ocDate}</td>
                                            <td className="px-1.5 py-1.5 border-r border-gray-200 text-gray-800">{row.ocApply}</td>
                                            <td className="px-1.5 py-1.5 border-r border-gray-200 text-gray-800">{row.ocNumber}</td>
                                            <td className="px-1.5 py-1.5 border-r border-gray-200 text-gray-800 text-center">{row.enBalArea}</td>
                                            <td className="px-1.5 py-1.5 border-r border-gray-200 text-gray-800 text-center">{row.opBalArea}</td>
                                            <td className="px-1.5 py-1.5 border-r border-gray-200 text-gray-800 text-center">{row.wbArea}</td>
                                            <td className="px-1.5 py-1.5 border-r border-gray-200 text-gray-800 text-center">{row.taxArea}</td>
                                            <td className="px-1.5 py-1.5 text-gray-800 text-center">{row.yrRate}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="30" className="px-4 py-8 text-center text-gray-500 text-sm">
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