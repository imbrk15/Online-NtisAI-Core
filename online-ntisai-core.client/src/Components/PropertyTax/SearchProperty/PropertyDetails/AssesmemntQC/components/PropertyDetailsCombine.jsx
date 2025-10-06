import React, { useState } from "react";
//import PropertyForm from "./PropertyForm";
import PropertyForm from "../../Combine/PropertyForm";
import AmenitiesTable from "./AmenitiesTable";
import CommercialDetailsTable from "./CommercialDetailsTable";
import ResidentialDetailsTable from "./ResidentialDetailsTable";
import AssessmentTaxDetailsTable from "./AssessmentTaxDetailsTable";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Building, Building2, Home, Calculator, Eye, X, Filter, ChevronDown } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription, DialogHeader } from "../../../../../ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../../ui/select";
import { Input } from "../../../../../ui/input";
interface PropertyDetailsCombineProps {
    isFixed?: boolean;
    setIsFixed?: (fixed: boolean) => void;
}

const PropertyDetailsCombine = ({ isFixed, setIsFixed }: PropertyDetailsCombineProps) => {
    const [activeTableTab, setActiveTableTab] = useState("amenities");
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [filterType, setFilterType] = useState("all");
    const [customLimit, setCustomLimit] = useState("");

    // Calculate filter limit based on selection
    const getFilterLimit = () => {
        switch (filterType) {
            case "top10":
                return 10;
            case "top30":
                return 30;
            case "top50":
                return 50;
            case "top100":
                return 100;
            case "custom":
                const limit = parseInt(customLimit);
                return !isNaN(limit) && limit > 0 ? limit : null;
            default:
                return null; // "all" - no limit
        }
    };

    const filterLimit = getFilterLimit();

    // Building images for the modal
    const buildingImages = [
        {
            src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBidWlsZGluZ3xlbnwxfHx8fDE3NTg4ODY0MjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            alt: "Main Building View"
        },
        {
            src: "https://images.unsplash.com/photo-1692133211836-52846376d66f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBidWlsZGluZyUyMGV4dGVyaW9yfGVufDF8fHx8MTc1ODk1MTc5NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            alt: "Office Building Exterior"
        },
        {
            src: "https://images.unsplash.com/photo-1703355685639-d558d1b0f63e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb21tZXJjaWFsJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzU4OTY5NjIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            alt: "Modern Commercial Building"
        },
        {
            src: "https://images.unsplash.com/photo-1611736362199-2f7e76ebeca4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBidWlsZGluZyUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NTg5NjgyMjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            alt: "Corporate Building Architecture"
        },
        {
            src: "https://images.unsplash.com/photo-1631718596154-a19f88c0c00c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGJ1aWxkaW5nJTIwZmFjYWRlfGVufDF8fHx8MTc1ODk2OTYyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            alt: "Business Building Facade"
        }
    ];

    return (
        <div className="flex bg-gray-100 w-full min-h-[calc(100vh-48px)] overflow-hidden">
            {/* Middle Section - Takes remaining space after 16vw right section */}
            <div className="flex flex-col p-1 pr-1 overflow-hidden" style={{ width: "calc(84vw - var(--sidebar-w, 190px))" }}>
                {/* Sticky form at top */}
                <div className="sticky top-0 z-20 bg-gray-100 pb-0.5">
                    <PropertyForm />
                </div>

                {/* Tables Section with Tabs */}
                <div className="flex-1 space-y-1 overflow-hidden">
                    {/* Tabbed Tables Container */}
                    <div className="border border-gray-200 rounded-lg bg-white shadow-sm">
                        {/* Tabs Header */}
                        <div className="bg-[#40648a] rounded-t-md flex justify-between items-stretch">
                            {/* Left side - Tab buttons */}
                            <div className="flex justify-center items-stretch flex-1">
                                <button
                                    onClick={() => setActiveTableTab("amenities")}
                                    className={`flex items-center gap-2 px-6 py-2 text-sm font-medium transition-all mt-2
                                        ${activeTableTab === "amenities"
                                            ? "bg-white text-black rounded-t-lg h-[90%]"
                                            : "text-white hover:bg-[#365577]"
                                        }`}
                                >
                                    <Building size={14} />
                                    Amenities
                                </button>

                                <span className="w-px h-full bg-[#365577] opacity-70" />

                                <button
                                    onClick={() => setActiveTableTab("commercial")}
                                    className={`flex items-center gap-2 px-6 py-2 text-sm font-medium transition-all mt-2
                                        ${activeTableTab === "commercial"
                                            ? "bg-white text-black rounded-t-lg h-[90%]"
                                            : "text-white hover:bg-[#365577]"
                                        }`}
                                >
                                    <Building2 size={14} />
                                    Commercial Details
                                </button>

                                <span className="w-px h-full bg-[#365577] opacity-70" />

                                <button
                                    onClick={() => setActiveTableTab("residential")}
                                    className={`flex items-center gap-2 px-6 py-2 text-sm font-medium transition-all mt-2
                                        ${activeTableTab === "residential"
                                            ? "bg-white text-black rounded-t-lg h-[90%]"
                                            : "text-white hover:bg-[#365577]"
                                        }`}
                                >
                                    <Home size={14} />
                                    Residential Details
                                </button>
                            </div>

                            {/* Right side - Filter */}
                            <div className="flex items-center gap-2 px-3 py-2">
                                <div className="flex items-center gap-2">
                                    <Filter size={30} className="text-white" />
                                    <Select value={filterType} onValueChange={setFilterType}>
                                        <SelectTrigger className="w-28 h-6 text-xs bg-white/95 border-0 text-black shadow-sm rounded-md flex justify-between items-center">
                                            <SelectValue placeholder="Filter" /> 
                                        </SelectTrigger>
                                        <SelectContent className="min-w-28 bg-white">
                                            <SelectItem value="all">All Rows</SelectItem>
                                            <SelectItem value="top10">Top 10</SelectItem>
                                            <SelectItem value="top30">Top 30</SelectItem>
                                            <SelectItem value="top50">Top 50</SelectItem>
                                            <SelectItem value="top100">Top 100</SelectItem>
                                            <SelectItem value="custom">Custom</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {filterType === "custom" && (
                                        <Input
                                            type="number"
                                            placeholder="Limit"
                                            value={customLimit}
                                            onChange={(e) => setCustomLimit(e.target.value)}
                                            className="w-24 h-4 text-xs bg-white/95 border-gray-200 rounded-md shadow-sm"
                                            min="1"
                                        />
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Tab Content */}
                        <div className="p-1 bg-gray-50 rounded-b-md">
                            {/* Amenities Tab */}
                            {activeTableTab === "amenities" && (
                                <div className="space-y-1">
                                    <AmenitiesTable filterLimit={filterLimit} />
                                </div>
                            )}

                            {/* Commercial Details Tab */}
                            {activeTableTab === "commercial" && (
                                <div className="space-y-1">
                                    <CommercialDetailsTable filterLimit={filterLimit} />
                                </div>
                            )}

                            {/* Residential Details Tab */}
                            {activeTableTab === "residential" && (
                                <div className="space-y-1">
                                    <ResidentialDetailsTable filterLimit={filterLimit} />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Fixed Assessment Tax Details Table at the end */}
                    <AssessmentTaxDetailsTable />
                </div>
            </div>

            {/* Right Section - Fixed 16% of viewport width - touches right edge */}
            <div className="w-[16vw] flex flex-col bg-gray-100 flex-shrink-0 overflow-hidden">
                <div className="flex flex-col flex-1 gap-1 p-1">

                    {/* Building Photo */}
                    <div className="flex-1 bg-white shadow rounded-2xl overflow-hidden cursor-pointer group">
                        <div className="relative w-full h-full">
                            <ImageWithFallback
                                src="/home.jpg"
                                alt="Building"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 z-10">
                                <div className="flex items-center justify-between bg-gray-500/80 text-white h-8 px-2">
                                    <p className="text-center text-sm flex-1">
                                        Building Photo
                                    </p>
                                    <Dialog open={isImageModalOpen} onOpenChange={setIsImageModalOpen}>
                                        <DialogTrigger asChild>
                                            <button
                                                className="flex items-center gap-1 text-xs hover:bg-white/20 px-2 py-1 rounded transition-colors"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <Eye size={12} />
                                                View More
                                            </button>
                                        </DialogTrigger>
                                    </Dialog>
                                </div>
                            </div>
                            {/* Hover overlay */}
                            <div className="fixed top-20 right-80 w-96 h-72 bg-white rounded-lg shadow-2xl border-2 border-gray-200 
                                z-[1000] opacity-0 invisible scale-0 
                                group-hover:opacity-100 group-hover:visible group-hover:scale-100 
                                transition-all duration-300 ease-in-out origin-bottom-right">
                                <div className="relative w-full h-full rounded-lg overflow-hidden">
                                    <ImageWithFallback
                                        src="/home.jpg"
                                        alt="Building"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-3 left-3 bg-gray-900/70 text-white px-3 py-1 rounded-md pointer-events-none">
                                        <p className="text-sm">Building Image</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Plan Drawing */}
                    <div className="flex-1 bg-white shadow rounded-2xl overflow-hidden flex flex-col cursor-pointer group">
                        <div className="flex-1 relative">
                            <ImageWithFallback
                                src="/plan.png"
                                alt="Plan"
                                className="w-full h-full object-cover"
                            />
                            <p className="absolute bottom-0 left-0 right-0 text-center text-sm h-8 flex items-center justify-center bg-gray-500/80 text-white z-10 pointer-events-none">
                                Plan Drawing
                            </p>
                            {/* Hover overlay */}
                            <div className="fixed top-60 right-80 w-96 h-72 bg-white rounded-lg shadow-2xl border-2 border-gray-200 
                                z-[1000] opacity-0 invisible scale-0 
                                group-hover:opacity-100 group-hover:visible group-hover:scale-100 
                                transition-all duration-300 ease-in-out origin-bottom-right">
                                <div className="relative w-full h-full rounded-lg overflow-hidden">
                                    <ImageWithFallback
                                        src="/plan.png"
                                        alt="Plan"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-3 left-3 bg-gray-900/70 text-white px-3 py-1 rounded-md pointer-events-none">
                                        <p className="text-sm">Plan Drawing</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Drone View */}
                    <div className="flex-1 bg-white shadow rounded-2xl overflow-hidden cursor-pointer group">
                        <div className="relative w-full h-full">
                            <ImageWithFallback
                                src="/gis.png"
                                alt="Drone"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
                                <p className="text-center text-sm h-8 flex items-center justify-center bg-gray-500/80 text-white">
                                    Drone View
                                </p>
                            </div>
                            {/* Hover overlay */}
                            <div className="fixed bottom-60 right-80 w-96 h-72 bg-white rounded-lg shadow-2xl border-2 border-gray-200 
                                z-[1000] opacity-0 invisible scale-0 
                                group-hover:opacity-100 group-hover:visible group-hover:scale-100 
                                transition-all duration-300 ease-in-out origin-bottom-right">
                                <div className="relative w-full h-full rounded-lg overflow-hidden">
                                    <ImageWithFallback
                                        src="/gis.png"
                                        alt="Drone"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-3 left-3 bg-gray-900/70 text-white px-3 py-1 rounded-md pointer-events-none">
                                        <p className="text-sm">Drone View</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* DMS */}
                    <div className="flex-1 bg-white shadow rounded-2xl overflow-hidden relative">
                        <div className="flex-1 bg-gray-200 h-full"></div>
                        <p className="absolute bottom-0 left-0 right-0 text-center text-sm h-8 flex items-center justify-center bg-gray-500/80 text-white">
                            DMS
                        </p>
                    </div>
                </div>
            </div>

            {/* Building Images Modal */}
            <Dialog open={isImageModalOpen} onOpenChange={setIsImageModalOpen}>
                <DialogContent className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="relative bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-4 border-b bg-[#40648a] text-white rounded-t-lg">
                            <h2 className="text-lg font-medium">Building Photo Gallery</h2>
                            <button
                                onClick={() => setIsImageModalOpen(false)}
                                className="p-1 hover:bg-white/20 rounded transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-4 overflow-auto max-h-[calc(90vh-80px)]">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {buildingImages.map((image, index) => (
                                    <div key={index} className="relative group">
                                        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden shadow-md">
                                            <ImageWithFallback
                                                src={image.src}
                                                alt={image.alt}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-lg">
                                            <p className="text-white text-sm font-medium">{image.alt}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default PropertyDetailsCombine;