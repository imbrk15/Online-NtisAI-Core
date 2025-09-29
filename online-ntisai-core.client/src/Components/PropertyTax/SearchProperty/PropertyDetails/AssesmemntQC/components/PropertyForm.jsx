import React, { useState } from "react";
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
} from "lucide-react";

function PropertyForm() {
    const [formData, setFormData] = useState({
        zone: "Zone 1",
        subzone: "Sub Zone A",
        surveyNo: "Survey/123/2024",
        wardNo: "Ward A1",
        propertyNo: "PMC/2024/001234",
        partitionNo: "Partition/001",
        plotNo: "Plot/123",
        category: "Apartment",
        upicId: "UPIC123456789",
        propertyDescription: "Residential",
        oldWardNo: "Old Ward A1",
        oldPropertyNo: "PMC/2023/000789",
        oldPartitionNo: "Old Partition/001",
        oldUpicId: "UPIC987654321",
        oldZone: "Old Zone 1",
        oldSubzone: "Old Sub Zone A",
        oldSurveyNo: "Survey/456/2023",
        oldPlotNo: "Old Plot/456",
        landOwner: "Rajesh Kumar Sharma",
        builderName: "ABC Developers",
        propertyHolder: "Rajesh Kumar Sharma",
        occupier: "Rajesh Kumar Sharma",
        societyName: "Shree Ganesh Society",
        secretaryName: "Anil Patil",
        secretaryMobile: "+91 9123456789",
        secretaryEmail: "secretary@example.com",
        wingNo: "A",
        flatNoShopNo: "Flat No. 101",
        ocNumber: "OC/2023/1234",
        email: "rajesh@email.com",
        mobileNo: "+91 9876543210",
        address: "Building No. 15, Pune-Satara Road",
        landmark: "Near Municipal Office",
        pinCode: "411001",
    });

    const [date, setDate] = useState("");
    const [activeTab, setActiveTab] = useState("property");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const CompactField = ({ name, label, icon: Icon, required = false }) => (
        <div className="mb-1">
            <div className="flex items-center gap-1 mb-0.5">
                <Icon size={10} className="text-gray-800" strokeWidth={2.2} />
                <label className="text-[11px] font-bold text-gray-800">
                    {label}
                    {required && <span className="text-red-500 ml-0.5">*</span>}
                </label>
            </div>
            <input
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full h-6 px-1.5 py-0.5 text-[11px] text-gray-900 bg-white border border-gray-300 rounded-md 
                   focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 hover:border-gray-400"
            />
        </div>
    );

    // Navigation functions
    const goBack = () => {
        if (activeTab === "kyc") setActiveTab("property");
        else if (activeTab === "society") setActiveTab("kyc");
    };

    const goNext = () => {
        if (activeTab === "property") setActiveTab("kyc");
        else if (activeTab === "kyc") setActiveTab("society");
    };

    return (
        <div className="w-full max-w-full">
            <div className="border border-gray-200 rounded-lg bg-white p-1 shadow-sm">
                {/* Tabs with Icons */}
                <div className="bg-[#40648a] rounded-t-md flex justify-center items-stretch">
                    <button
                        onClick={() => setActiveTab("property")}
                        className={`flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium transition-all mt-1
              ${activeTab === "property"
                                ? "bg-white text-black rounded-t-lg h-[90%]"
                                : "text-white hover:bg-[#365577]"
                            }`}
                    >
                        <LayoutGrid size={14} />
                        Property Details
                    </button>

                    <span className="w-px h-full bg-[#365577] opacity-70" />

                    <button
                        onClick={() => setActiveTab("kyc")}
                        className={`flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium transition-all mt-1
              ${activeTab === "kyc"
                                ? "bg-white text-black rounded-t-lg h-[90%]"
                                : "text-white hover:bg-[#365577]"
                            }`}
                    >
                        <IdCard size={14} />
                        KYC Details
                    </button>

                    <span className="w-px h-full bg-[#365577] opacity-70" />

                    <button
                        onClick={() => setActiveTab("society")}
                        className={`flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium transition-all mt-1
              ${activeTab === "society"
                                ? "bg-white text-black rounded-t-lg h-[90%]"
                                : "text-white hover:bg-[#365577]"
                            }`}
                    >
                        <Users size={16} />
                        Society Details
                    </button>
                </div>

                {/* Property Tab */}
                {activeTab === "property" && (
                    <div className="bg-gray-50 p-1 rounded-b-md-1 mt-0.5">
                        {/* New Property Heading */}
                        <h4 className="text-xs font-semibold text-blue-700 mb-0.5">
                            New Property Details
                        </h4>
                        <div className="grid grid-cols-8 gap-1 mb-0.5">
                            <CompactField name="wardNo" label="Ward No" icon={Home} required />
                            <CompactField
                                name="propertyNo"
                                label="Property No"
                                icon={QrCode}
                                required
                            />
                            <CompactField name="partitionNo" label="Partition No" icon={Hash} />
                            <CompactField name="upicId" label="UPIC ID" icon={QrCode} required />
                            <CompactField name="zone" label="Zone No" icon={MapPin} required />
                            <CompactField name="subzone" label="Sub Zone No" icon={MapIcon} />
                            <CompactField name="surveyNo" label="Survey No" icon={Hash} />
                            <CompactField name="plotNo" label="Plot No" icon={MapPin} />
                        </div>

                        {/* Old Property Heading */}
                        <h4 className="text-xs font-semibold text-blue-700 mb-0.5 mt-0.5">
                            Old Property Details
                        </h4>
                        <div className="grid grid-cols-8 gap-1">
                            <CompactField name="oldWardNo" label="Ward No" icon={Home} />
                            <CompactField name="oldPropertyNo" label="Property No" icon={QrCode} />
                            <CompactField name="oldPartitionNo" label="Partition No" icon={Hash} />
                            <CompactField name="oldUpicId" label="UPIC ID" icon={QrCode} />
                            <CompactField name="oldZone" label="Zone No" icon={MapPin} />
                            <CompactField name="oldSubzone" label="Sub Zone No" icon={MapIcon} />
                            <CompactField name="oldSurveyNo" label="Survey No" icon={Hash} />
                            <CompactField name="oldPlotNo" label="Plot No" icon={MapPin} />
                        </div>

                        {/* Right-side arrows */}
                        <div className="flex justify-end gap-1 mt-1">
                            <button
                                onClick={goNext}
                                className="bg-blue-600 hover:bg-blue-700 text-white p-1 rounded-md shadow-sm transition"
                            >
                                <ArrowRight size={12} />
                            </button>
                        </div>
                    </div>
                )}

                {/* KYC Tab */}
                {activeTab === "kyc" && (
                    <div className="bg-gray-50 p-1 rounded-b-md mt-0.5">
                       
                        <div className="grid grid-cols-7 gap-1 mb-0.5 mt-0.5">
                            <div className="col-span-2">
                                <CompactField
                                    name="propertyHolder"
                                    label="Property Holder Name"
                                    icon={User}
                                />
                            </div>
                            <div className="col-span-2">
                                <CompactField name="occupier" label="Occupier Name" icon={Building2} />
                            </div>
                            <CompactField name="wingNo" label="Wing No" icon={Building} />
                            <CompactField name="flatNoShopNo" label="Flat No" icon={Home} />
                            <CompactField name="mobileNo" label="Mobile Number" icon={Phone} />
                        </div>

                        <div className="grid grid-cols-8 gap-1">
                            <div className="col-span-2">
                                <CompactField name="email" label="Email" icon={Mail} />
                            </div>
                            <div className="col-span-3">
                                <CompactField name="address" label="Address" icon={MapPin} />
                            </div>
                            <div className="col-span-2">
                                <CompactField name="landmark" label="Landmark" icon={MapIcon} />
                            </div>
                            <CompactField name="pinCode" label="Pin Code" icon={Hash} />
                        </div>

                        {/* Right-side arrows */}
                        <div className="flex justify-end gap-2 mt-2">
                            <button
                                onClick={goBack}
                                className="bg-gray-400 hover:bg-gray-500 text-white p-1.5 rounded-md shadow-sm transition"
                            >
                                <ArrowLeft size={14} />
                            </button>
                            <button
                                onClick={goNext}
                                className="bg-blue-600 hover:bg-blue-700 text-white p-1.5 rounded-md shadow-sm transition"
                            >
                                <ArrowRight size={14} />
                            </button>
                        </div>
                    </div>
                )}

                {/* Society Tab */}
                {activeTab === "society" && (
                    <div className="bg-gray-50 p-1 rounded-b-md mt-0.5">
                        <h4 className="text-xs font-semibold text-blue-700 mb-0.5">
                            Society Details
                        </h4>
                        <div className="grid grid-cols-12 gap-1 mb-0.5 mt-0.5">
                            <div className="col-span-4">
                                <CompactField name="societyName" label="Society Name" icon={Building} />
                            </div>
                            <div className="col-span-3">
                                <CompactField name="builderName" label="Builder Name" icon={Building} />
                            </div>
                            <div className="col-span-3">
                                <CompactField name="landOwner" label="Land Owner" icon={User} required />
                            </div>
                            <div className="col-span-2">
                                <CompactField name="secretaryName" label="Secretary Name" icon={User} />
                            </div>
                        </div>

                        <div className="grid grid-cols-12 gap-1">
                            <div className="col-span-3">
                                <CompactField
                                    name="secretaryMobile"
                                    label="Secretary Mobile No."
                                    icon={Phone}
                                />
                            </div>
                            <div className="col-span-3">
                                <CompactField name="secretaryEmail" label="Society Email" icon={Mail} />
                            </div>
                            <div className="col-span-2">
                                <div className="mb-2">
                                    <div className="flex items-center gap-1 mb-0.5">
                                        <Calendar size={12} className="text-gray-800" strokeWidth={2.2} />
                                        <label className="text-[12px] font-bold text-gray-800">OC Date</label>
                                    </div>
                                    <input
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        className="w-full h-7 px-2 py-1 text-[12px] text-gray-900 bg-white border border-gray-300 rounded-md 
                               focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 hover:border-gray-400"
                                    />
                                </div>
                            </div>
                            <div className="col-span-2">
                                <CompactField name="ocNumber" label="OC Number" icon={FileText} />
                            </div>
                        </div>

                        {/* Right-side arrows */}
                        <div className="flex justify-end gap-2 mt-2">
                            <button
                                onClick={goBack}
                                className="bg-gray-400 hover:bg-gray-500 text-white p-1.5 rounded-md shadow-sm transition"
                            >
                                <ArrowLeft size={14} />
                            </button>
                            <button
                                onClick={() => console.log("Final Save", formData)}
                                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md shadow-sm transition text-sm"
                            >
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