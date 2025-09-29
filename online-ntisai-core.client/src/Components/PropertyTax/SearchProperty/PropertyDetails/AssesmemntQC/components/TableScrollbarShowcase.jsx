import React from 'react';

const TableScrollbarShowcase = () => {
    // Sample data for demonstration
    const sampleTableData = Array.from({ length: 8 }, (_, i) => ({
        id: i + 1,
        propNo: `P${1000 + i}`,
        owner: `श्री राम कुमार ${i + 1}`,
        type: i % 2 === 0 ? 'Commercial' : 'Residential',
        area: `${800 + i * 50}`,
        tax: `${1200 + i * 150}`,
        status: i % 3 === 0 ? 'Paid' : 'Pending',
        date: `${15 + i}/01/2024`
    }));

    const scrollbarOptions = [
        {
            name: "Corporate Blue",
            className: "scrollbar-corporate",
            description: "Professional blue theme - Currently used for Commercial Details",
            theme: "Business & Commercial",
            color: "Blue",
            usage: "Commercial Details Table"
        },
        {
            name: "Green Eco",
            className: "scrollbar-eco",
            description: "Green environmental theme - Currently used for Residential Details",
            theme: "Residential & Housing",
            color: "Green",
            usage: "Residential Details Table"
        },
        {
            name: "Orange Accent",
            className: "scrollbar-orange",
            description: "Orange financial theme - Currently used for Assessment Tax Details",
            theme: "Financial & Tax",
            color: "Orange",
            usage: "Assessment Tax Details Table"
        },
        {
            name: "Thin Blue",
            className: "scrollbar-thin-blue",
            description: "Thin blue design with subtle styling",
            theme: "Clean & Minimal",
            color: "Light Blue",
            usage: "Alternative option"
        },
        {
            name: "Dark Modern",
            className: "scrollbar-dark-modern",
            description: "Dark theme with gradient effects",
            theme: "Modern & Sleek",
            color: "Dark Gray",
            usage: "Alternative option"
        },
        {
            name: "Purple Modern",
            className: "scrollbar-purple",
            description: "Modern purple with glow effects",
            theme: "Creative & Modern",
            color: "Purple",
            usage: "Alternative option"
        },
        {
            name: "Colorful Gradient",
            className: "scrollbar-gradient",
            description: "Animated gradient colors (attention-grabbing)",
            theme: "Dynamic & Animated",
            color: "Multi-color",
            usage: "Special highlights"
        },
        {
            name: "Minimal Gray",
            className: "scrollbar-minimal",
            description: "Ultra-minimal gray design",
            theme: "Subtle & Clean",
            color: "Light Gray",
            usage: "Previous default"
        }
    ];

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Municipal Dashboard - Table Scrollbar Styles</h1>
                    <p className="text-gray-600 max-w-4xl">
                        Compare different scrollbar designs for your property assessment tables. Each style has been 
                        chosen to match the thematic context of different data types in the municipal corporation dashboard.
                    </p>
                </div>

                {/* Current Implementation Status */}
                <div className="mb-8 bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Current Implementation Status</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                            <h3 className="font-semibold text-blue-800">Commercial Details Table</h3>
                            <p className="text-blue-600 text-sm">Using: <span className="font-mono">scrollbar-corporate</span></p>
                            <p className="text-blue-600 text-sm">Theme: Professional Blue</p>
                        </div>
                        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                            <h3 className="font-semibold text-green-800">Residential Details Table</h3>
                            <p className="text-green-600 text-sm">Using: <span className="font-mono">scrollbar-eco</span></p>
                            <p className="text-green-600 text-sm">Theme: Green Environmental</p>
                        </div>
                        <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded">
                            <h3 className="font-semibold text-orange-800">Assessment Tax Details Table</h3>
                            <p className="text-orange-600 text-sm">Using: <span className="font-mono">scrollbar-orange</span></p>
                            <p className="text-orange-600 text-sm">Theme: Financial Orange</p>
                        </div>
                    </div>
                </div>

                {/* Scrollbar Options Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {scrollbarOptions.map((option, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="p-4 border-b border-gray-200">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-semibold text-gray-800">{option.name}</h3>
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                                        option.usage.includes('Currently') 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-gray-100 text-gray-600'
                                    }`}>
                                        {option.usage.includes('Currently') ? 'Active' : 'Available'}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">{option.description}</p>
                                <div className="flex gap-4 text-xs text-gray-500">
                                    <span><strong>Theme:</strong> {option.theme}</span>
                                    <span><strong>Color:</strong> {option.color}</span>
                                </div>
                            </div>
                            
                            <div className="p-4">
                                {/* Horizontal Scroll Demo */}
                                <div className="mb-4">
                                    <h4 className="text-sm font-medium text-gray-700 mb-2">Horizontal Scroll Preview:</h4>
                                    <div className={`h-32 overflow-auto border border-gray-200 rounded ${option.className}`}>
                                        <table className="w-full text-xs min-w-[800px]">
                                            <thead className="sticky top-0 bg-white border-b">
                                                <tr className="bg-[#F5F9FF]">
                                                    <th className="px-2 py-1 text-left font-semibold border-r border-gray-300 min-w-[60px]">PropNo</th>
                                                    <th className="px-2 py-1 text-left font-semibold border-r border-gray-300 min-w-[120px]">Owner Name</th>
                                                    <th className="px-2 py-1 text-left font-semibold border-r border-gray-300 min-w-[80px]">Type</th>
                                                    <th className="px-2 py-1 text-left font-semibold border-r border-gray-300 min-w-[70px]">Area (SqMtr)</th>
                                                    <th className="px-2 py-1 text-left font-semibold border-r border-gray-300 min-w-[70px]">Tax Amount</th>
                                                    <th className="px-2 py-1 text-left font-semibold border-r border-gray-300 min-w-[70px]">Status</th>
                                                    <th className="px-2 py-1 text-left font-semibold border-r border-gray-300 min-w-[80px]">Date</th>
                                                    <th className="px-2 py-1 text-left font-semibold min-w-[100px]">Additional Info</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {sampleTableData.map((row) => (
                                                    <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50">
                                                        <td className="px-2 py-1 border-r border-gray-200">{row.propNo}</td>
                                                        <td className="px-2 py-1 border-r border-gray-200">{row.owner}</td>
                                                        <td className="px-2 py-1 border-r border-gray-200">{row.type}</td>
                                                        <td className="px-2 py-1 border-r border-gray-200 text-center">{row.area}</td>
                                                        <td className="px-2 py-1 border-r border-gray-200 text-center">{row.tax}</td>
                                                        <td className="px-2 py-1 border-r border-gray-200">
                                                            <span className={`px-1 py-0.5 rounded text-xs ${
                                                                row.status === 'Paid' 
                                                                    ? 'bg-green-100 text-green-800' 
                                                                    : 'bg-yellow-100 text-yellow-800'
                                                            }`}>
                                                                {row.status}
                                                            </span>
                                                        </td>
                                                        <td className="px-2 py-1 border-r border-gray-200">{row.date}</td>
                                                        <td className="px-2 py-1">Municipal Data</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center text-xs text-gray-500">
                                    <span className="font-mono">.{option.className}</span>
                                    <span>{option.usage}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Implementation Guide */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Implementation Guide</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-lg font-medium text-gray-700 mb-3">How to Change Scrollbar Styles</h3>
                            <div className="bg-gray-50 p-4 rounded text-sm">
                                <p className="mb-2">To apply a different scrollbar style to any table:</p>
                                <ol className="list-decimal list-inside space-y-1 text-gray-600">
                                    <li>Locate the table's <code className="bg-gray-200 px-1 rounded">overflow-x-auto</code> div</li>
                                    <li>Replace the current scrollbar class</li>
                                    <li>For vertical scroll areas, also update the inner div</li>
                                </ol>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium text-gray-700 mb-3">Code Example</h3>
                            <div className="bg-gray-900 text-green-400 p-4 rounded text-sm font-mono">
                                <div className="text-gray-400">// Before</div>
                                <div><div className="overflow-x-auto scrollbar-minimal"></div>
                                <div className="text-gray-400 mt-2">// After</div>
                                <div><div className="overflow-x-auto scrollbar-corporate"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Theme Recommendations */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Theme Recommendations by Context</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="p-4 border border-blue-200 rounded-lg">
                            <h4 className="font-semibold text-blue-800 mb-2">Business/Commercial</h4>
                            <ul className="text-sm text-blue-600 space-y-1">
                                <li>• scrollbar-corporate</li>
                                <li>• scrollbar-thin-blue</li>
                                <li>• scrollbar-dark-modern</li>
                            </ul>
                        </div>
                        <div className="p-4 border border-green-200 rounded-lg">
                            <h4 className="font-semibold text-green-800 mb-2">Residential/Housing</h4>
                            <ul className="text-sm text-green-600 space-y-1">
                                <li>• scrollbar-eco</li>
                                <li>• scrollbar-minimal</li>
                                <li>• scrollbar-thin-blue</li>
                            </ul>
                        </div>
                        <div className="p-4 border border-orange-200 rounded-lg">
                            <h4 className="font-semibold text-orange-800 mb-2">Financial/Tax</h4>
                            <ul className="text-sm text-orange-600 space-y-1">
                                <li>• scrollbar-orange</li>
                                <li>• scrollbar-corporate</li>
                                <li>• scrollbar-dark-modern</li>
                            </ul>
                        </div>
                        <div className="p-4 border border-purple-200 rounded-lg">
                            <h4 className="font-semibold text-purple-800 mb-2">Special/Highlight</h4>
                            <ul className="text-sm text-purple-600 space-y-1">
                                <li>• scrollbar-gradient</li>
                                <li>• scrollbar-purple</li>
                                <li>• scrollbar-dark-modern</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TableScrollbarShowcase;