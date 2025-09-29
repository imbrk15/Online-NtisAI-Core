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

// OPTION 1: COLOR-CODED BACKGROUNDS
// New Property: Green-tinted background with green heading
// Old Property: Orange-tinted background with orange heading

function PropertyFormOption1() {
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
                        {/* New Property Section - GREEN BACKGROUND */}
                        <div className="bg-green-50 border border-green-200 rounded-md p-2 mb-2">
                            <h4 className="text-xs font-semibold text-green-700 mb-0.5 flex items-center gap-1">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                New Property Details
                            </h4>
                            <div className="grid grid-cols-8 gap-1">
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
                        </div>

                        {/* Old Property Section - ORANGE BACKGROUND */}
                        <div className="bg-orange-50 border border-orange-200 rounded-md p-2 mb-2">
                            <h4 className="text-xs font-semibold text-orange-700 mb-0.5 flex items-center gap-1">
                                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
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

                {/* Other tabs remain the same... */}
            </div>
        </div>
    );
}

export default PropertyFormOption1;