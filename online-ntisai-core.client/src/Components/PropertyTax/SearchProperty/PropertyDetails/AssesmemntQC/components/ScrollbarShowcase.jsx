import React from 'react';

const ScrollbarShowcase = () => {
    // Sample data for demonstration
    const sampleData = Array.from({ length: 15 }, (_, i) => ({
        id: i + 1,
        name: `Item ${i + 1}`,
        description: `Description for item ${i + 1}`,
        value: Math.floor(Math.random() * 1000),
    }));

    const scrollbarStyles = [
        {
            name: "Default Browser",
            className: "scrollbar-default",
            description: "Native browser scrollbar (current implementation)"
        },
        {
            name: "Thin Blue",
            className: "scrollbar-thin-blue",
            description: "Thin blue scrollbar with rounded corners"
        },
        {
            name: "Dark Modern",
            className: "scrollbar-dark-modern",
            description: "Dark theme with smooth hover effects"
        },
        {
            name: "Colorful Gradient",
            className: "scrollbar-gradient",
            description: "Gradient colored scrollbar with animations"
        },
        {
            name: "Minimal Gray",
            className: "scrollbar-minimal",
            description: "Minimal gray design for clean look"
        },
        {
            name: "Corporate Blue",
            className: "scrollbar-corporate",
            description: "Professional blue theme for business apps"
        },
        {
            name: "Green Eco",
            className: "scrollbar-eco",
            description: "Green themed scrollbar for environmental data"
        },
        {
            name: "Orange Accent",
            className: "scrollbar-orange",
            description: "Orange accent for commercial/financial data"
        },
        {
            name: "Purple Modern",
            className: "scrollbar-purple",
            description: "Modern purple design with glow effects"
        }
    ];

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Scrollbar Design Options</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Choose from different scrollbar styles for your tables. Each style can be applied to 
                        Amenities, Commercial Details, or Residential Details tables independently.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {scrollbarStyles.map((style, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="p-4 border-b border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-800">{style.name}</h3>
                                <p className="text-sm text-gray-600 mt-1">{style.description}</p>
                            </div>
                            
                            <div className="p-4">
                                <div className={`h-48 overflow-y-auto border border-gray-200 rounded ${style.className}`}>
                                    <table className="w-full text-sm">
                                        <thead className="sticky top-0 bg-white border-b">
                                            <tr>
                                                <th className="px-3 py-2 text-left font-semibold">#</th>
                                                <th className="px-3 py-2 text-left font-semibold">Name</th>
                                                <th className="px-3 py-2 text-left font-semibold">Value</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sampleData.map((item) => (
                                                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                                                    <td className="px-3 py-2">{item.id}</td>
                                                    <td className="px-3 py-2">{item.name}</td>
                                                    <td className="px-3 py-2">{item.value}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                
                                <div className="mt-3 text-center">
                                    <button className="text-sm bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                                        Apply to Amenities
                                    </button>
                                    <button className="text-sm bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors ml-2">
                                        Apply to Commercial
                                    </button>
                                    <button className="text-sm bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors ml-2">
                                        Apply to Residential
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">CSS Class Names for Implementation</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                        {scrollbarStyles.map((style, index) => (
                            <div key={index} className="bg-gray-50 p-3 rounded">
                                <div className="font-semibold text-gray-700">{style.name}</div>
                                <div className="text-blue-600 font-mono">.{style.className}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScrollbarShowcase;