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
        zone: "",
        subzone: "",
        surveyNo: "",
        wardNo: "",
        propertyNo: "",
        partitionNo: "",
        plotNo: "",
        category: "",
        upicId: "",
        propertyDescription: "",
        oldWardNo: "",
        oldPropertyNo: "",
        oldPartitionNo: "",
        oldUpicId: "",
        oldZone: "",
        oldSubzone: "",
        oldSurveyNo: "",
        oldPlotNo: "",
        landOwner: "",
        builderName: "",
        propertyHolder: "",
        occupier: "",
        societyName: "",
        secretaryName: "",
        secretaryMobile: "",
        secretaryEmail: "",
        wingNo: "",
        flatNoShopNo: "",
        ocNumber: "",
        email: "",
        mobileNo: "",
        address: "",
        landmark: "",
        pinCode: "",
    });

    const [date, setDate] = useState("");
    const [activeTab, setActiveTab] = useState("property");
    const inputRefs = useRef({});

    const allFieldOrder = [
        "wardNo", "propertyNo", "partitionNo", "upicId",
        "zone", "subzone", "surveyNo", "plotNo",
        "oldWardNo", "oldPropertyNo", "oldPartitionNo", "oldUpicId",
        "oldZone", "oldSubzone", "oldSurveyNo", "oldPlotNo",
        "propertyHolder", "occupier", "wingNo", "flatNoShopNo", "mobileNo",
        "email", "address", "landmark", "pinCode",
        "societyName", "builderName", "landOwner", "secretaryName",
        "secretaryMobile", "secretaryEmail", "ocDate", "ocNumber"
    ];

    const getTabForField = (fieldName) => {
        const propertyFields = allFieldOrder.slice(0, 16);
        const kycFields = allFieldOrder.slice(16, 25);
        const societyFields = allFieldOrder.slice(25, 33);

        if (propertyFields.includes(fieldName)) return "property";
        if (kycFields.includes(fieldName)) return "kyc";
        if (societyFields.includes(fieldName)) return "society";
        return "property";
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: String(value), // always string
        }));
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
        if (activeTab === "kyc") setActiveTab("property");
        else if (activeTab === "society") setActiveTab("kyc");
    };

    const goNext = () => {
        if (activeTab === "property") setActiveTab("kyc");
        else if (activeTab === "kyc") setActiveTab("society");
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
                </div>

                {/* Property Section */}
                {activeTab === "property" && (
                    <div className="bg-gray-50 p-1.5 rounded-b-md">
                        <h4 className="text-base font-semibold text-blue-700 mb-0.5">New Property Details</h4>
                        <div className="grid grid-cols-8 gap-1.5 mb-1">
                            <CompactField name="wardNo" label="Ward No" icon={Home} required value={formData.wardNo} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} />
                            <CompactField name="propertyNo" label="Property No" icon={QrCode} required value={formData.propertyNo} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} />
                            <CompactField name="partitionNo" label="Partition No" icon={Hash} value={formData.partitionNo} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} />
                            <CompactField name="upicId" label="UPIC ID" icon={QrCode} required value={formData.upicId} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} />
                            <CompactField name="zone" label="Zone No" icon={MapPin} required value={formData.zone} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} />
                            <CompactField name="subzone" label="Sub Zone No" icon={MapIcon} value={formData.subzone} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} />
                            <CompactField name="surveyNo" label="Survey No" icon={Hash} value={formData.surveyNo} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} />
                            <CompactField name="plotNo" label="Plot No" icon={MapPin} value={formData.plotNo} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} />
                        </div>

                        <h4 className="text-base font-semibold text-blue-700 mb-0.5 mt-1">Old Property Details</h4>
                        <div className="grid grid-cols-8 gap-1.5">
                            <CompactField name="oldWardNo" label="Ward No" icon={Home} value={formData.oldWardNo} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} />
                            <CompactField name="oldPropertyNo" label="Property No" icon={QrCode} value={formData.oldPropertyNo} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} />
                            <CompactField name="oldPartitionNo" label="Partition No" icon={Hash} value={formData.oldPartitionNo} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} />
                            <CompactField name="oldUpicId" label="UPIC ID" icon={QrCode} value={formData.oldUpicId} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} />
                            <CompactField name="oldZone" label="Zone No" icon={MapPin} value={formData.oldZone} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} />
                            <CompactField name="oldSubzone" label="Sub Zone No" icon={MapIcon} value={formData.oldSubzone} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} />
                            <CompactField name="oldSurveyNo" label="Survey No" icon={Hash} value={formData.oldSurveyNo} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} />
                            <CompactField name="oldPlotNo" label="Plot No" icon={MapPin} value={formData.oldPlotNo} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} />
                        </div>

                        <div className="flex justify-end gap-1.5 mt-1.5">
                            <button onClick={goNext} className="bg-blue-600 hover:bg-blue-700 text-white p-1.5 rounded-md shadow-sm transition">
                                <ArrowRight size={14} />
                            </button>
                        </div>
                    </div>
                )}

                {/* KYC Section */}
                {activeTab === "kyc" && (
                    <div className="bg-gray-50 p-1.5 rounded-b-md">
                        <div className="grid grid-cols-7 gap-1.5 mb-1">
                            <div className="col-span-2"><CompactField name="propertyHolder" label="Property Holder Name" icon={User} value={formData.propertyHolder} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} /></div>
                            <div className="col-span-2"><CompactField name="occupier" label="Occupier Name" icon={Building2} value={formData.occupier} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} /></div>
                            <CompactField name="wingNo" label="Wing No" icon={Building} value={formData.wingNo} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} />
                            <CompactField name="flatNoShopNo" label="Flat No" icon={Home} value={formData.flatNoShopNo} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} />
                            <CompactField name="mobileNo" label="Mobile Number" icon={Phone} type="number" value={formData.mobileNo} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} />
                        </div>

                        <div className="grid grid-cols-8 gap-1.5">
                            <div className="col-span-2"><CompactField name="email" label="Email" icon={Mail} value={formData.email} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} /></div>
                            <div className="col-span-3"><CompactField name="address" label="Address" icon={MapPin} value={formData.address} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} /></div>
                            <div className="col-span-2"><CompactField name="landmark" label="Landmark" icon={MapIcon} value={formData.landmark} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} /></div>
                            <CompactField name="pinCode" label="Pin Code" icon={Hash} type="number" value={formData.pinCode} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} />
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

                {/* Society Section */}
                {activeTab === "society" && (
                    <div className="bg-gray-50 p-1.5 rounded-b-md">
                        <div className="grid grid-cols-12 gap-1.5 mb-1">
                            <div className="col-span-4"><CompactField name="societyName" label="Society Name" icon={Building} value={formData.societyName} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} /></div>
                            <div className="col-span-3"><CompactField name="builderName" label="Builder Name" icon={Building} value={formData.builderName} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} /></div>
                            <div className="col-span-3"><CompactField name="landOwner" label="Land Owner" icon={User} required value={formData.landOwner} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} /></div>
                            <div className="col-span-2"><CompactField name="secretaryName" label="Secretary Name" icon={User} value={formData.secretaryName} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} /></div>
                        </div>

                        <div className="grid grid-cols-12 gap-1.5">
                            <div className="col-span-3"><CompactField name="secretaryMobile" label="Secretary Mobile No." icon={Phone} type="number" value={formData.secretaryMobile} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} /></div>
                            <div className="col-span-3"><CompactField name="secretaryEmail" label="Society Email" icon={Mail} value={formData.secretaryEmail} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} /></div>
                            <div className="col-span-2">
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
                            <div className="col-span-2"><CompactField name="ocNumber" label="OC Number" icon={FileText} value={formData.ocNumber} onChange={handleChange} onKeyDown={handleKeyDown} inputRefs={inputRefs} /></div>
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
