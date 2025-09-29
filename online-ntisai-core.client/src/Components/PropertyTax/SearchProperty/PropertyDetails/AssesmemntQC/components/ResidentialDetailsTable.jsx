import React, { useState } from 'react';
import { Eye, EyeOff, Search } from 'lucide-react';

const ResidentialDetailsTable = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // Sample data for Residential Details with all 31 columns
    const tableData = [
        {
            newPropNo: "R001",
            oldPropNo: "OLD-R001",
            wing: "A",
            shopNo: "फ्लैट 101",
            shopName: "2BHK Flat",
            ownerType: "श्री राम कुमार...",
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
            toi: "2",
            cArea: "850",
            builtUpArea: "950",
            parkingArea: "25",
            mobileNo: "9876543201",
            email: "ram.kumar@email.com",
            ocDate: "15/01/2023",
            ocApply: "Yes",
            ocNumber: "OC-R001",
            enBalArea: "875",
            opBalArea: "75",
            wbArea: "950",
            taxArea: "1025",
            yrRate: "18.5"
        },
        {
            newPropNo: "R002", 
            oldPropNo: "-",
            wing: "A",
            shopNo: "फ्लैट 102",
            shopName: "3BHK Flat",
            ownerType: "श्री सुनील शर्मा...",
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
            toi: "2",
            cArea: "1200",
            builtUpArea: "1350",
            parkingArea: "30",
            mobileNo: "9876543202",
            email: "sunil.sharma@email.com",
            ocDate: "20/01/2023",
            ocApply: "Yes",
            ocNumber: "OC-R002",
            enBalArea: "1230",
            opBalArea: "120",
            wbArea: "1380",
            taxArea: "1500",
            yrRate: "22.0"
        },
        {
            newPropNo: "R003",
            oldPropNo: "OLD-R003",
            wing: "A",
            shopNo: "फ्लैट 103",
            shopName: "1BHK Flat",
            ownerType: "श्री विकास अग्रवाल...",
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
            toi: "1",
            cArea: "600",
            builtUpArea: "700",
            parkingArea: "20",
            mobileNo: "9876543203",
            email: "vikas.agrawal@email.com",
            ocDate: "25/01/2023",
            ocApply: "Yes",
            ocNumber: "OC-R003",
            enBalArea: "620",
            opBalArea: "80",
            wbArea: "720",
            taxArea: "800",
            yrRate: "16.8"
        },
        {
            newPropNo: "R004",
            oldPropNo: "-",
            wing: "B",
            shopNo: "फ्लैट 201",
            shopName: "2BHK Flat",
            ownerType: "श्री अमित पटेल...",
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
            toi: "2",
            cArea: "875",
            builtUpArea: "980",
            parkingArea: "25",
            mobileNo: "9876543204",
            email: "amit.patel@email.com",
            ocDate: "30/01/2023",
            ocApply: "No",
            ocNumber: "-",
            enBalArea: "900",
            opBalArea: "80",
            wbArea: "1005",
            taxArea: "1085",
            yrRate: "19.2"
        },
        {
            newPropNo: "R005",
            oldPropNo: "OLD-R005",
            wing: "B",
            shopNo: "फ्लैट 202",
            shopName: "3BHK Flat",
            ownerType: "श्री राजेश गुप्ता...",
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
            toi: "3",
            cArea: "1150",
            builtUpArea: "1280",
            parkingArea: "35",
            mobileNo: "9876543205",
            email: "rajesh.gupta@email.com",
            ocDate: "05/02/2023",
            ocApply: "Yes",
            ocNumber: "OC-R005",
            enBalArea: "1185",
            opBalArea: "95",
            wbArea: "1315",
            taxArea: "1410",
            yrRate: "21.5"
        },
        {
            newPropNo: "R006",
            oldPropNo: "-",
            wing: "B",
            shopNo: "फ्लैट 203",
            shopName: "2BHK Flat",
            ownerType: "श्री प्रकाश जोशी...",
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
            toi: "2",
            cArea: "825",
            builtUpArea: "920",
            parkingArea: "20",
            mobileNo: "9876543206",
            email: "prakash.joshi@email.com",
            ocDate: "10/02/2023",
            ocApply: "Yes",
            ocNumber: "OC-R006",
            enBalArea: "845",
            opBalArea: "75",
            wbArea: "940",
            taxArea: "1015",
            yrRate: "18.8"
        },
        {
            newPropNo: "R007",
            oldPropNo: "OLD-R007",
            wing: "C",
            shopNo: "फ्लैट 301",
            shopName: "4BHK Flat",
            ownerType: "श्री सुरेश महाजन...",
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
            toi: "3",
            cArea: "1650",
            builtUpArea: "1850",
            parkingArea: "40",
            mobileNo: "9876543207",
            email: "suresh.mahajan@email.com",
            ocDate: "15/02/2023",
            ocApply: "Yes",
            ocNumber: "OC-R007",
            enBalArea: "1690",
            opBalArea: "160",
            wbArea: "1890",
            taxArea: "2050",
            yrRate: "25.2"
        },
        {
            newPropNo: "R008",
            oldPropNo: "-",
            wing: "C",
            shopNo: "फ्लैट 302",
            shopName: "1BHK Flat",
            ownerType: "श्री अनिल वर्मा...",
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
            toi: "1",
            cArea: "580",
            builtUpArea: "680",
            parkingArea: "15",
            mobileNo: "9876543208",
            email: "anil.verma@email.com",
            ocDate: "20/02/2023",
            ocApply: "No",
            ocNumber: "-",
            enBalArea: "595",
            opBalArea: "85",
            wbArea: "695",
            taxArea: "780",
            yrRate: "15.8"
        },
        {
            newPropNo: "R009",
            oldPropNo: "OLD-R009",
            wing: "C",
            shopNo: "फ्लैट 303",
            shopName: "3BHK Flat",
            ownerType: "श्री मोहन देसाई...",
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
            toi: "2",
            cArea: "1100",
            builtUpArea: "1250",
            parkingArea: "30",
            mobileNo: "9876543209",
            email: "mohan.desai@email.com",
            ocDate: "25/02/2023",
            ocApply: "Yes",
            ocNumber: "OC-R009",
            enBalArea: "1130",
            opBalArea: "120",
            wbArea: "1280",
            taxArea: "1410",
            yrRate: "20.8"
        },
        {
            newPropNo: "R010",
            oldPropNo: "-",
            wing: "D",
            shopNo: "फ्लैट 401",
            shopName: "2BHK Flat",
            ownerType: "श्री गणेश पाटील...",
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
            toi: "2",
            cArea: "890",
            builtUpArea: "995",
            parkingArea: "25",
            mobileNo: "9876543210",
            email: "ganesh.patil@email.com",
            ocDate: "02/03/2023",
            ocApply: "Yes",
            ocNumber: "OC-R010",
            enBalArea: "915",
            opBalArea: "80",
            wbArea: "1020",
            taxArea: "1100",
            yrRate: "19.5"
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

export default ResidentialDetailsTable;