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
    Plus,
    Archive,
} from "lucide-react";

// OPTION 3: CARD-BASED LAYOUT
// New Property: White elevated card with green accent
// Old Property: Light gray card with blue accent

function PropertyFormOption3() {
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
    });

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

    const goNext = () => {
        if (activeTab === "property") setActiveTab("kyc");
        else if (activeTab === "kyc") setActiveTab("society");
    };

    return (
        <div className="w-full max-w-full">
            <div className="border border-gray-200 rounded-lg bg-white p-1 shadow-sm">
                {/* Tabs */}
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
                </div>

                {/* Property Tab */}
                {activeTab === "property" && (
                    <div className="bg-gray-50 p-1 rounded-b-md-1 mt-0.5 space-y-2">
                        {/* New Property Card - WHITE ELEVATED CARD WITH GREEN ACCENT */}
                        <div className="bg-white rounded-lg shadow-md border-t-4 border-t-green-500 p-3">
                            <div className="flex items-center gap-2 mb-1">
                                <div className="bg-green-100 p-1 rounded-full">
                                    <Plus size={12} className="text-green-600" />
                                </div>
                                <h4 className="text-xs font-semibold text-green-700">
                                    New Property Details
                                </h4>
                                <div className="flex-1 h-px bg-green-200"></div>
                            </div>
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

                        {/* Old Property Card - LIGHT GRAY CARD WITH BLUE ACCENT */}
                        <div className="bg-gray-100 rounded-lg shadow-sm border-t-4 border-t-blue-500 p-3">
                            <div className="flex items-center gap-2 mb-1">
                                <div className="bg-blue-100 p-1 rounded-full">
                                    <Archive size={12} className="text-blue-600" />
                                </div>
                                <h4 className="text-xs font-semibold text-blue-700">
                                    Old Property Details
                                </h4>
                                <div className="flex-1 h-px bg-blue-200"></div>
                            </div>
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
            </div>
        </div>
    );
}

export default PropertyFormOption3;