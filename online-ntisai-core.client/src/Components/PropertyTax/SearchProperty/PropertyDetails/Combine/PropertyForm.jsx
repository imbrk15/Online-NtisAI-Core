import React, { useState, useRef } from "react";
import {
    MapPin,
    Home,
    Hash,
    QrCode,
    FileText,
    MapIcon,
    Phone,
    Mail,
    Building,
    Building2,
    User,
    Calendar,
    LayoutGrid,
    IdCard,
    Users,
    ArrowLeft,
    ArrowRight,
    Info,
    ClipboardCheck,
    Tag,
    Package,
    Layers,
    Ruler,
    Calculator,
    MessageSquare,
    Store,
    ShoppingBag,
    Archive,
    IndianRupee,
    Receipt,
} from "lucide-react";

// ✅ Memoized CompactField
const CompactField = React.memo(
    ({ name, label, icon: Icon, required = false, type = "text", value, onChange, onKeyDown, inputRefs }) => (
        <div className="mb-1">
            <div className="flex items-center gap-0.5 mb-0">
                <Icon size={14} className="text-gray-800" strokeWidth={2.2} />
                <label className="text-sm font-bold text-gray-800">
                    {label}
                    {required && <span className="text-red-500 ml-0.5">*</span>}
                </label>
            </div>
            <input
                ref={(el) => {
                    if (el) inputRefs.current[name] = el; // stable ref
                }}
                name={name}
                type={type}
                value={value || ""}
                onChange={onChange}
                onKeyDown={(e) => onKeyDown(e, name)}
                className="w-full h-7 px-1.5 py-0.5 text-sm text-gray-900 bg-white border border-gray-300 rounded-md 
          focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 hover:border-gray-400"
            />
        </div>
    )
);

function PropertyForm() {
    const [formData, setFormData] = useState({
        zone: "Z-03",
        subzone: "SZ-12",
        surveyNo: "45/2B",
        division: "Central",
        wardNo: "15",
        propertyNo: "2024/1234",
        partitionNo: "A1",
        plotNo: "Plot-156",
        category: "",
        upicId: "UPIC2024001234",
        propertyDescription: "Residential Apartment Complex",
        oldWardNo: "12",
        oldPropertyNo: "2015/0789",
        oldPartitionNo: "B2",
        oldPropertyId: "OLD-2015-789",
        oldRV: "125000",
        oldPropertyTax: "15000",
        oldTotalTax: "18500",
        plotArea: "1500",
        totalCarpetArea: "1200",
        buildupArea: "1350",
        landOwner: "Mumbai Development Authority",
        builderName: "ABC Constructions Pvt Ltd",
        propertyHolder: "Rajesh Kumar Sharma",
        occupier: "Priya Sharma",
        buildingSocietyName: "Sunrise Apartment Cooperative Society",
        secretaryName: "Amit Patel",
        secretaryMobile: "9123456789",
        secretaryEmail: "secretary@sunriseapts.com",
        wingNo: "B",
        flatNoShopNo: "304",
        ocNumber: "OC/2020/1234",
        shopNo: "12",
        shopName: "Kumar General Store",
        email: "rajesh.sharma@email.com",
        mobileNo: "9876543210",
        address: "304, Wing B, Sunrise Apartments, MG Road",
        landmark: "Near City Mall",
        pinCode: "400001",
        propertyCategory: "Residential",
        propertyType: "Apartment",
        partType: "Independent",
        length: "50",
        width: "30",
        propertySurveyRemark: "Property in good condition, all documents verified",
    });

    const [date, setDate] = useState("2020-06-15");
    const [activeTab, setActiveTab] = useState("property");
    const inputRefs = useRef({});

    const allFieldOrder = [
        "division", "wardNo", "propertyNo", "partitionNo", "upicId",
        "zone", "subzone", "surveyNo", "plotNo", "propertyDescription",
        "plotArea", "totalCarpetArea", "buildupArea",
        "oldWardNo", "oldPropertyNo", "oldPartitionNo", "oldPropertyId", "oldRV", "oldPropertyTax", "oldTotalTax",
        "propertyHolder", "occupier", "wingNo", "flatNoShopNo", "mobileNo",
        "shopNo", "shopName", "email", "address", "landmark", "pinCode",
        "buildingSocietyName", "builderName", "landOwner", "secretaryName",
        "secretaryMobile", "secretaryEmail", "ocDate", "ocNumber",
        "propertyCategory", "propertyType", "partType", "length", "width", "propertySurveyRemark"
    ];

    const getTabForField = (fieldName) => {
        // New property fields + area fields
        const propertyFields = ["division", "wardNo", "propertyNo", "partitionNo", "upicId",
            "zone", "subzone", "surveyNo", "plotNo", "propertyDescription",
            "plotArea", "totalCarpetArea", "buildupArea"];

        // Old property fields
        const oldTabFields = ["oldWardNo", "oldPropertyNo", "oldPartitionNo", "oldPropertyId",
            "oldRV", "oldPropertyTax", "oldTotalTax"];

        const kycFields = ["propertyHolder", "occupier", "wingNo", "flatNoShopNo", "mobileNo",
            "shopNo", "shopName", "email", "address", "landmark", "pinCode"];

        const societyFields = ["buildingSocietyName", "builderName", "landOwner",
            "secretaryName", "secretaryMobile", "secretaryEmail", "ocDate", "ocNumber"];

        const otherFields = ["propertyCategory", "propertyType", "partType", "length", "width", "propertySurveyRemark"];

        if (propertyFields.includes(fieldName)) return "property";
        if (oldTabFields.includes(fieldName)) return "oldtab";
        if (kycFields.includes(fieldName)) return "kyc";
        if (societyFields.includes(fieldName)) return "society";
        if (otherFields.includes(fieldName)) return "other";
        return "property";
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => {
            const newData = {
                ...prev,
                [name]: String(value), // always string
            };

            // Auto-calculate plot area when length or width changes
            if (name === "length" || name === "width") {
                const length = name === "length" ? parseFloat(value) || 0 : parseFloat(prev.length) || 0;
                const width = name === "width" ? parseFloat(value) || 0 : parseFloat(prev.width) || 0;

                if (length > 0 && width > 0) {
                    newData.plotArea = String(length * width);
                } else if (length === 0 || width === 0) {
                    newData.plotArea = "";
                }
            }

            return newData;
        });
    };

    const handleFormSubmission = () => {
        console.log("Final Save", { ...formData, ocDate: date });
        alert("Form submitted successfully!");
    };

    const handleKeyDown = (e, fieldName) => {
        const currentIndex = allFieldOrder.indexOf(fieldName);

        if (e.key === "Enter") {
            e.preventDefault();
            if (currentIndex < allFieldOrder.length - 1) {
                const nextField = allFieldOrder[currentIndex + 1];
                const nextTab = getTabForField(nextField);
                if (nextTab !== activeTab) {
                    setActiveTab(nextTab);
                    setTimeout(() => inputRefs.current[nextField]?.focus(), 10);
                } else {
                    inputRefs.current[nextField]?.focus();
                }
            } else {
                handleFormSubmission();
            }
        } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            if (currentIndex > 0) {
                const prevField = allFieldOrder[currentIndex - 1];
                const prevTab = getTabForField(prevField);
                if (prevTab !== activeTab) {
                    setActiveTab(prevTab);
                    setTimeout(() => inputRefs.current[prevField]?.focus(), 10);
                } else {
                    inputRefs.current[prevField]?.focus();
                }
            }
        }
    };

    const goBack = () => {
        if (activeTab === "oldtab") setActiveTab("property");
        else if (activeTab === "kyc") setActiveTab("oldtab");
        else if (activeTab === "society") setActiveTab("kyc");
        else if (activeTab === "other") setActiveTab("society");
        else if (activeTab === "building") setActiveTab("other");
    };

    const goNext = () => {
        if (activeTab === "property") setActiveTab("oldtab");
        else if (activeTab === "oldtab") setActiveTab("kyc");
        else if (activeTab === "kyc") setActiveTab("society");
        else if (activeTab === "society") setActiveTab("other");
        else if (activeTab === "other") setActiveTab("building");
    };

    return (
        <div className="w-full max-w-full">
            <div className="border border-gray-200 rounded-lg bg-white p-0 shadow-sm">
                {/* Tabs */}
                <div className="bg-[#40648a] rounded-t-md flex justify-center items-stretch">
                    <button
                        onClick={() => setActiveTab("property")}
                        className={`flex items-center gap-2 px-6 py-2 text-sm font-medium transition-all mt-2
              ${activeTab === "property"
                                ? "bg-white text-black rounded-t-lg h-[90%]"
                                : "text-white hover:bg-[#365577]"
                            }`}
                    >
                        <LayoutGrid size={16} />
                        Property Details
                    </button>
                    <span className="w-px h-full bg-[#365577] opacity-70" />
                    <button
                        onClick={() => setActiveTab("oldtab")}
                        className={`flex items-center gap-2 px-6 py-2 text-sm font-medium transition-all mt-2
              ${activeTab === "oldtab"
                                ? "bg-white text-black rounded-t-lg h-[90%]"
                                : "text-white hover:bg-[#365577]"
                            }`}
                    >
                        <Archive size={16} />
                        Old Tab Details
                    </button>
                    <span className="w-px h-full bg-[#365577] opacity-70" />
                    <button
                        onClick={() => setActiveTab("kyc")}
                        className={`flex items-center gap-2 px-6 py-2 text-sm font-medium transition-all mt-2
              ${activeTab === "kyc"
                                ? "bg-white text-black rounded-t-lg h-[90%]"
                                : "text-white hover:bg-[#365577]"
                            }`}
                    >
                        <IdCard size={16} />
                        KYC Details
                    </button>
                    <span className="w-px h-full bg-[#365577] opacity-70" />
                    <button
                        onClick={() => setActiveTab("society")}
                        className={`flex items-center gap-2 px-6 py-2 text-sm font-medium transition-all mt-2
              ${activeTab === "society"
                                ? "bg-white text-black rounded-t-lg h-[90%]"
                                : "text-white hover:bg-[#365577]"
                            }`}
                    >
                        <Users size={16} />
                        Society Details
                    </button>
                    <span className="w-px h-full bg-[#365577] opacity-70" />
                    <button
                        onClick={() => setActiveTab("other")}
                        className={`flex items-center gap-2 px-6 py-2 text-sm font-medium transition-all mt-2
              ${activeTab === "other"
                                ? "bg-white text-black rounded-t-lg h-[90%]"
                                : "text-white hover:bg-[#365577]"
                            }`}
                    >
                        <Info size={16} />
                        Other Details
                    </button>
                    <span className="w-px h-full bg-[#365577] opacity-70" />
                    <button
                        onClick={() => setActiveTab("building")}
                        className={`flex items-center gap-2 px-6 py-2 text-sm font-medium transition-all mt-2
              ${activeTab === "building"
                                ? "bg-white text-black rounded-t-lg h-[90%]"
                                : "text-white hover:bg-[#365577]"
                            }`}
                    >
                        <ClipboardCheck size={16} />
                        Building Permission
                    </button>
                </div>

                {/* Property Section */}
                {activeTab === "property" && (
                    <div className="bg-gray-50 p-1 rounded-b-md">
                        <h4 className="text-sm font-semibold text-blue-700 mb-1">New Property Details</h4>

                        {/* Row 1: Division, Ward No, Property No, Partition No, UPIC ID, Tax Zone No, Sub Zone No */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3 mb-2">
                            <CompactField name="division" label="Division" icon={LayoutGrid} required value={formData.division} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} />
                            <CompactField name="wardNo" label="Ward No" icon={Home} required value={formData.wardNo} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} />
                            <CompactField name="propertyNo" label="Property No" icon={QrCode} required value={formData.propertyNo} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} />
                            <CompactField name="partitionNo" label="Partition No" icon={Hash} value={formData.partitionNo} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} />
                            <CompactField name="upicId" label="UPIC ID" icon={IdCard} required value={formData.upicId} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} />
                            <CompactField name="zone" label="Tax Zone No" icon={MapPin} required value={formData.zone} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} />
                            <CompactField name="subzone" label="Sub Zone No" icon={MapIcon} value={formData.subzone} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} />
                        </div>

                        {/* Row 2: Survey No, Plot No, Property Description, Plot Area, Total Carpet Area, Buildup Area + Next Button */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 items-end">
                            <CompactField name="surveyNo" label="Survey No" icon={Hash} value={formData.surveyNo} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} />
                            <CompactField name="plotNo" label="Plot No" icon={MapPin} value={formData.plotNo} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} />
                            <div className="lg:col-span-2">
                                <CompactField name="propertyDescription" label="Property Description" icon={FileText} value={formData.propertyDescription} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} />
                            </div>
                            <CompactField name="plotArea" label="Plot Area" icon={Calculator} type="number" value={formData.plotArea} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} />
                            <CompactField name="totalCarpetArea" label="Total Carpet Area" icon={Ruler} type="number" value={formData.totalCarpetArea} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} />
                            <CompactField name="buildupArea" label="Buildup Area" icon={Building} type="number" value={formData.buildupArea} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} />
                            <div className="flex justify-end items-end mb-1">
                                <button onClick={goNext} className="bg-blue-600 hover:bg-blue-700 text-white p-1.5 rounded-md shadow-sm transition">
                                    <ArrowRight size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                )}


                {/* Old Tab Details Section */}
                {activeTab === "oldtab" && (
                    <div className="bg-gray-50 p-1.5 rounded-b-md">
                        <h4 className="text-sm font-semibold text-blue-700 mb-0.5">Old Property Details</h4>
                        <div className="grid grid-cols-7 gap-1.5 mb-1">
                            <CompactField name="oldWardNo" label="Ward No." icon={Home} value={formData.oldWardNo} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} />
                            <CompactField name="oldPropertyNo" label="Property No." icon={QrCode} value={formData.oldPropertyNo} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} />
                            <CompactField name="oldPartitionNo" label="Partition No." icon={Hash} value={formData.oldPartitionNo} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} />
                            <CompactField name="oldPropertyId" label="Property ID" icon={IdCard} value={formData.oldPropertyId} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} />
                            <CompactField name="oldRV" label="Old RV" icon={IndianRupee} type="number" value={formData.oldRV} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} />
                            <CompactField name="oldPropertyTax" label="Old Property Tax" icon={Receipt} type="number" value={formData.oldPropertyTax} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} />
                            <CompactField name="oldTotalTax" label="Old Total Tax" icon={Calculator} type="number" value={formData.oldTotalTax} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} />
                        </div>

                        <div className="flex justify-end gap-1.5 mt-1.5">
                            <button onClick={goBack} className="bg-gray-400 hover:bg-gray-500 text-white p-1.5 rounded-md shadow-sm transition">
                                <ArrowLeft size={14} />
                            </button>
                            <button onClick={goNext} className="bg-blue-600 hover:bg-blue-700 text-white p-1.5 rounded-md shadow-sm transition">
                                <ArrowRight size={14} />
                            </button>
                        </div>
                    </div>
                )}

                {/* KYC Section */}
                {activeTab === "kyc" && (
                    <div className="bg-gray-50 p-1.5 rounded-b-md">
                        {/* Row 1: Property Holder, Occupier, Wing No, Flat No, Mobile Number */}
                        <div className="grid grid-cols-7 gap-1.5 mb-1">
                            <div className="col-span-2"><CompactField name="propertyHolder" label="Property Holder Name" icon={User} value={formData.propertyHolder} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} /></div>
                            <div className="col-span-2"><CompactField name="occupier" label="Occupier Name" icon={Building2} value={formData.occupier} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} /></div>
                            <CompactField name="wingNo" label="Wing No" icon={Building} value={formData.wingNo} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} />
                            <CompactField name="flatNoShopNo" label="Flat No" icon={Home} value={formData.flatNoShopNo} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} />
                            <CompactField name="mobileNo" label="Mobile Number" icon={Phone} type="number" value={formData.mobileNo} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} />
                        </div>

                        {/* Row 2: Shop No, Shop Name, Email, Address (wider) */}
                        <div className="grid grid-cols-8 gap-1.5 mb-1">
                            <CompactField name="shopNo" label="Shop No." icon={ShoppingBag} value={formData.shopNo} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} />
                            <div className="col-span-2"><CompactField name="shopName" label="Shop Name" icon={Store} value={formData.shopName} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} /></div>
                            <div className="col-span-2"><CompactField name="email" label="Email" icon={Mail} value={formData.email} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} /></div>
                            <div className="col-span-3"><CompactField name="address" label="Address" icon={MapPin} value={formData.address} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} /></div>
                        </div>

                        {/* Row 3: Landmark, Pin Code, Navigation buttons */}
                        <div className="flex flex-wrap items-end gap-1.5">
                            <div className="w-64"><CompactField name="landmark" label="Landmark" icon={MapIcon} value={formData.landmark} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} /></div>
                            <div className="w-40"><CompactField name="pinCode" label="Pin Code" icon={Hash} type="number" value={formData.pinCode} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} /></div>
                            <div className="flex gap-1.5 ml-auto mb-1">
                                <button onClick={goBack} className="bg-gray-400 hover:bg-gray-500 text-white p-1.5 rounded-md shadow-sm transition">
                                    <ArrowLeft size={14} />
                                </button>
                                <button onClick={goNext} className="bg-blue-600 hover:bg-blue-700 text-white p-1.5 rounded-md shadow-sm transition">
                                    <ArrowRight size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Society Section */}
                {activeTab === "society" && (
                    <div className="bg-gray-50 p-1.5 rounded-b-md">
                        <div className="grid grid-cols-12 gap-1.5 mb-1">
                            <div className="col-span-4"><CompactField name="buildingSocietyName" label="Building/Society Name" icon={Building2} value={formData.buildingSocietyName} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} /></div>
                            <div className="col-span-3"><CompactField name="builderName" label="Builder Name" icon={Building} value={formData.builderName} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} /></div>
                            <div className="col-span-3"><CompactField name="landOwner" label="Land Owner" icon={User} required value={formData.landOwner} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} /></div>
                            <div className="col-span-2"><CompactField name="secretaryName" label="Secretary Name" icon={User} value={formData.secretaryName} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} /></div>
                        </div>

                        <div className="flex flex-wrap items-end gap-1.5">
                            <div className="w-48"><CompactField name="secretaryMobile" label="Secretary Mobile No." icon={Phone} type="number" value={formData.secretaryMobile} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} /></div>
                            <div className="w-64">
                                <div className="mb-1">
                                    <div className="flex items-center gap-0.5 mb-0">
                                        <Mail size={14} className="text-gray-800" strokeWidth={2.2} />
                                        <label className="text-sm font-bold text-gray-800">Society Email</label>
                                    </div>
                                    <input
                                        ref={(el) => (inputRefs.current["secretaryEmail"] = el)}
                                        name="secretaryEmail"
                                        type="text"
                                        value={formData.secretaryEmail || ""}
                                        onChange={handleChange}
                                        onKeyDown={(e) => handleKeyDown(e, "secretaryEmail")}
                                        className="w-full h-7 px-1.5 py-0.5 text-sm text-gray-900 bg-white border border-gray-300 rounded-md 
                      focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 hover:border-gray-400"
                                    />
                                </div>
                            </div>
                            <div className="w-40">
                                <div className="mb-1">
                                    <div className="flex items-center gap-0.5 mb-0">
                                        <Calendar size={14} className="text-gray-800" strokeWidth={2.2} />
                                        <label className="text-sm font-bold text-gray-800">OC Date</label>
                                    </div>
                                    <input
                                        ref={(el) => (inputRefs.current["ocDate"] = el)}
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(e, "ocDate")}
                                        className="w-full h-7 px-1.5 py-0.5 text-sm text-gray-900 bg-white border border-gray-300 rounded-md 
                      focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 hover:border-gray-400"
                                    />
                                </div>
                            </div>
                            <div className="w-40">
                                <div className="mb-1">
                                    <div className="flex items-center gap-0.5 mb-0">
                                        <FileText size={14} className="text-gray-800" strokeWidth={2.2} />
                                        <label className="text-sm font-bold text-gray-800">OC Number</label>
                                    </div>
                                    <input
                                        ref={(el) => (inputRefs.current["ocNumber"] = el)}
                                        name="ocNumber"
                                        type="text"
                                        value={formData.ocNumber || ""}
                                        onChange={handleChange}
                                        onKeyDown={(e) => handleKeyDown(e, "ocNumber")}
                                        className="w-full h-7 px-1.5 py-0.5 text-sm text-gray-900 bg-white border border-gray-300 rounded-md 
                      focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 hover:border-gray-400"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-1.5 ml-auto mb-1">
                                <button onClick={goBack} className="bg-gray-400 hover:bg-gray-500 text-white p-1.5 rounded-md shadow-sm transition">
                                    <ArrowLeft size={14} />
                                </button>
                                <button onClick={goNext} className="bg-blue-600 hover:bg-blue-700 text-white p-1.5 rounded-md shadow-sm transition">
                                    <ArrowRight size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Other Details Section */}
                {activeTab === "other" && (
                    <div className="bg-gray-50 p-1.5 rounded-b-md">

                        <div className="grid grid-cols-7 gap-1.5 mb-1">
                            <CompactField name="propertyCategory" label="Category" icon={Tag} value={formData.propertyCategory} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} />
                            <CompactField name="propertyType" label="Type" icon={Package} value={formData.propertyType} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} />
                            <CompactField name="partType" label="Part Type" icon={Layers} value={formData.partType} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} />
                            <CompactField name="length" label="Length" icon={Ruler} type="number" value={formData.length} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} />
                            <CompactField name="width" label="Width" icon={Ruler} type="number" value={formData.width} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} />
                            <div className="col-span-2"><CompactField name="propertySurveyRemark" label="Property Survey Remark" icon={MessageSquare} value={formData.propertySurveyRemark} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} /></div>
                        </div>

                        <div className="flex justify-end gap-1.5 mt-1.5">
                            <button onClick={goBack} className="bg-gray-400 hover:bg-gray-500 text-white p-1.5 rounded-md shadow-sm transition">
                                <ArrowLeft size={14} />
                            </button>
                            <button onClick={goNext} className="bg-blue-600 hover:bg-blue-700 text-white p-1.5 rounded-md shadow-sm transition">
                                <ArrowRight size={14} />
                            </button>
                        </div>
                    </div>
                )}

                {/* Building Permission Section */}
                {activeTab === "building" && (
                    <div className="bg-gray-50 p-1.5 rounded-b-md">
                        <h4 className="text-base font-semibold text-blue-700 mb-2">Building Permission</h4>
                        <div className="text-center py-8 text-gray-500">
                            <ClipboardCheck size={32} className="mx-auto mb-2 opacity-50" />
                            <p>Building permission section - Content to be added</p>
                        </div>

                        <div className="flex justify-end gap-1.5 mt-1.5">
                            <button onClick={goBack} className="bg-gray-400 hover:bg-gray-500 text-white p-1.5 rounded-md shadow-sm transition">
                                <ArrowLeft size={14} />
                            </button>
                            <button onClick={handleFormSubmission} className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-md shadow-sm transition text-sm">
                                Save
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PropertyForm;