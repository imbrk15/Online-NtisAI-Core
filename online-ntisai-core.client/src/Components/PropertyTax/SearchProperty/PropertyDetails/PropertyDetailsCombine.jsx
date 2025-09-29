import React from "react";
import PropertyForm from "./Combine/PropertyForm";
import FloorDetails from "./Combine/FloorDetails";
import TaxDetails from "./Combine/TaxDetails";

const PropertyDetailsCombine = ({ isFixed, setIsFixed }) => {
    return (
        <div className="flex bg-gray-100 w-full min-h-[calc(100vh-48px)]">
            {/* Middle Section */}
            <div className="flex flex-col flex-1 p-3">
                {/* Sticky form at top */}
                <div className="sticky top-0 z-20 bg-gray-10 pb-2">
                    <PropertyForm />
                </div>

                {/* Content below form */}
                <div className="space-y-2">
                    <FloorDetails />
                    <TaxDetails />
                </div>
            </div>

            {/* Right Section */}
            <div className="w-[14%] flex flex-col bg-gray-100 pl-2 pt-2">
                <div className="flex flex-col flex-1 gap-3">

                    {/* Building Photo */}
                    <div className="flex-1 bg-white shadow rounded-2xl overflow-hidden cursor-pointer group">
                        <div className="relative w-full h-full">
                            <img
                                src="/home.jpg"
                                alt="Building"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
                                <p className="text-center text-sm h-8 flex items-center justify-center bg-gray-500/80 text-white">
                                    Building Photo
                                </p>
                            </div>
                            {/* Hover overlay */}
                            <div className="fixed top-20 right-80 w-96 h-72 bg-white rounded-lg shadow-2xl border-2 border-gray-200 
                                z-[1000] opacity-0 invisible scale-0 
                                group-hover:opacity-100 group-hover:visible group-hover:scale-100 
                                transition-all duration-300 ease-in-out origin-bottom-right">
                                <div className="relative w-full h-full rounded-lg overflow-hidden">
                                    <img
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
                            <img
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
                                    <img
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
                            <img
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
                                    <img
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
        </div>
    );
};

export default PropertyDetailsCombine;
