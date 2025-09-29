import React from "react";
import PropertyFormOption1 from "./PropertyFormOption1";
import PropertyFormOption2 from "./PropertyFormOption2";
import PropertyFormOption3 from "./PropertyFormOption3";
import PropertyFormOption4 from "./PropertyFormOption4";

const PropertyFormDesignShowcase = () => {
    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Property Form Design Options
            </h1>
            
            <div className="space-y-8">
                {/* Option 1: Color-Coded Backgrounds */}
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">
                        Option 1: Color-Coded Backgrounds
                    </h2>
                    <div className="text-sm text-gray-600 mb-3">
                        ✅ New Property: Green background with green heading<br/>
                        ✅ Old Property: Orange background with orange heading
                    </div>
                    <PropertyFormOption1 />
                </div>

                {/* Option 2: Border Style Differentiation */}
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">
                        Option 2: Border Style Differentiation
                    </h2>
                    <div className="text-sm text-gray-600 mb-3">
                        ✅ New Property: Solid green left border<br/>
                        ✅ Old Property: Dashed orange left border
                    </div>
                    <PropertyFormOption2 />
                </div>

                {/* Option 3: Card-Based Layout */}
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">
                        Option 3: Card-Based Layout
                    </h2>
                    <div className="text-sm text-gray-600 mb-3">
                        ✅ New Property: White elevated card with green accent + Plus icon<br/>
                        ✅ Old Property: Light gray card with blue accent + Archive icon
                    </div>
                    <PropertyFormOption3 />
                </div>

                {/* Option 4: Gradient Backgrounds */}
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">
                        Option 4: Gradient Backgrounds
                    </h2>
                    <div className="text-sm text-gray-600 mb-3">
                        ✅ New Property: Subtle green gradient background<br/>
                        ✅ Old Property: Subtle blue gradient background
                    </div>
                    <PropertyFormOption4 />
                </div>

                {/* Additional Options Summary */}
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">
                        Additional Quick Options (Not Implemented)
                    </h2>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <h3 className="font-semibold text-green-600 mb-2">Option 5: Badge Style Headers</h3>
                            <p className="text-gray-600">Green badge for new, gray badge for old properties</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-blue-600 mb-2">Option 6: Split Layout with Shadows</h3>
                            <p className="text-gray-600">Different elevation shadows to create visual hierarchy</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-purple-600 mb-2">Option 7: Outlined Sections</h3>
                            <p className="text-gray-600">Green outlined container vs blue outlined container</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-amber-600 mb-2">Option 8: Typography Differentiation</h3>
                            <p className="text-gray-600">Different font weights and sizes for each section</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 text-center">
                <p className="text-gray-600 text-sm">
                    Choose your preferred option and I'll apply it to your PropertyForm component!
                </p>
            </div>
        </div>
    );
};

export default PropertyFormDesignShowcase;