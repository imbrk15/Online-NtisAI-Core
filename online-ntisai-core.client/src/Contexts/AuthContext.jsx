import React, { createContext, useContext, useState, useEffect } from "react";

// Helper function to create proper ScreenPermission objects
const createScreenPermission = (screenPath, permission = 'full') => {
    return { screenPath, permission };
};

// Default form permissions
const defaultFormPermissions = [
    { screenName: "Add Taxes", none: false, view: true, modify: false, fullControl: false },
    { screenName: "Add User To Layer", none: false, view: true, modify: false, fullControl: false },
    { screenName: "Admin Reports", none: false, view: true, modify: false, fullControl: false },
    { screenName: "Advance Payment", none: false, view: true, modify: false, fullControl: false },
    { screenName: "AMC Calculations", none: true, view: false, modify: false, fullControl: false },
    { screenName: "AMC Report", none: true, view: false, modify: false, fullControl: false },
    { screenName: "AMC Set Remark For Invoice", none: true, view: false, modify: false, fullControl: false },
    { screenName: "Appeal", none: true, view: false, modify: false, fullControl: false },
    { screenName: "Apply Tax Master", none: true, view: false, modify: false, fullControl: false },
    { screenName: "Assessment Master", none: true, view: false, modify: false, fullControl: false },
    { screenName: "Assessment Rules Master", none: true, view: false, modify: false, fullControl: false },
    { screenName: "Auto Appeal", none: true, view: false, modify: false, fullControl: false },
    { screenName: "Auto Hearing", none: true, view: false, modify: false, fullControl: false },
    { screenName: "Auto QC", none: true, view: false, modify: false, fullControl: false },
    { screenName: "Auto Ward Entry", none: true, view: false, modify: false, fullControl: false },
    { screenName: "Base Value Master", none: true, view: false, modify: false, fullControl: false },
    { screenName: "Base Value Parameter Master", none: true, view: false, modify: false, fullControl: false },
    { screenName: "Bill Book Entry", none: true, view: false, modify: false, fullControl: false },
    { screenName: "Bill Method Master", none: true, view: false, modify: false, fullControl: false },
    { screenName: "BuildingRateMasterForCV", none: true, view: false, modify: false, fullControl: false },
    { screenName: "CapitalValueMaster", none: true, view: false, modify: false, fullControl: false },
    { screenName: "Construction Type Master", none: true, view: false, modify: false, fullControl: false },
    { screenName: "Council Master", none: true, view: false, modify: false, fullControl: false },
    { screenName: "Create Zoning", none: true, view: false, modify: false, fullControl: false },
    { screenName: "CustomTaxesMast", none: true, view: false, modify: false, fullControl: false },
    { screenName: "CV Total Valuation", none: true, view: false, modify: false, fullControl: false },
    { screenName: "Data Entry", none: true, view: false, modify: false, fullControl: false },
    { screenName: "DeleteExcessPropertiesFromDatabase", none: true, view: false, modify: false, fullControl: false },
    { screenName: "Demand Analysis", none: true, view: false, modify: false, fullControl: false },
    { screenName: "Depreciation Master", none: false, view: true, modify: false, fullControl: false },
    { screenName: "DepreciationMasterForCV", none: false, view: true, modify: false, fullControl: false },
    { screenName: "Document Type Master", none: false, view: true, modify: false, fullControl: false },
    { screenName: "Employee Master", none: false, view: true, modify: false, fullControl: false },
    { screenName: "Floor Master", none: false, view: true, modify: false, fullControl: false },
    { screenName: "Generate Scripts", none: false, view: true, modify: false, fullControl: false },
    { screenName: "LockProperties", none: false, view: true, modify: false, fullControl: false },
    { screenName: "LockProperty", none: false, view: true, modify: false, fullControl: false },
    { screenName: "LockWiseProperty", none: false, view: true, modify: false, fullControl: false },
    { screenName: "Maintenance Master", none: false, view: true, modify: false, fullControl: false },
    { screenName: "Manage Security Layer", none: false, view: true, modify: false, fullControl: false },
    { screenName: "Mutation", none: false, view: true, modify: false, fullControl: false },
    { screenName: "Name Same As", none: false, view: true, modify: false, fullControl: false },
    { screenName: "New Tax Valuation", none: false, view: false, modify: false, fullControl: true },
    { screenName: "Open Plot Rate Master", none: false, view: true, modify: false, fullControl: false },
    { screenName: "OpenPlotRateMasterForCV", none: false, view: true, modify: false, fullControl: false },
    { screenName: "Panvel Assessment Details", none: false, view: false, modify: false, fullControl: true },
    { screenName: "parking ApplyAL For Department", none: false, view: false, modify: false, fullControl: true },
    { screenName: "Prime ApplyTaxes Master", none: false, view: true, modify: false, fullControl: false },
    { screenName: "Property and Plan Upload", none: false, view: true, modify: false, fullControl: false },
    { screenName: "Property In Hearing Appeal Committee", none: false, view: true, modify: false, fullControl: false },
    { screenName: "Property Type Master", none: false, view: true, modify: false, fullControl: false },
    { screenName: "PropertyDescriptionAndTypeOfUseV...", none: false, view: true, modify: false, fullControl: false },
    { screenName: "Quality Control", none: false, view: true, modify: false, fullControl: false },
    { screenName: "Rate Master", none: false, view: true, modify: false, fullControl: false },
    { screenName: "Report Engine", none: false, view: false, modify: false, fullControl: true },
    { screenName: "Rpt Master", none: false, view: true, modify: false, fullControl: false },
    { screenName: "Report Security Panel", none: false, view: true, modify: false, fullControl: false },
    { screenName: "Retantion Factor Master", none: false, view: true, modify: false, fullControl: false },
    { screenName: "Retention Policy FactorWise Master", none: false, view: true, modify: false, fullControl: false },
    { screenName: "Retention Policy YearWise Master", none: false, view: true, modify: false, fullControl: false },
    { screenName: "Roles", none: false, view: true, modify: false, fullControl: false },
    { screenName: "Screen Master", none: false, view: true, modify: false, fullControl: false },
    { screenName: "Search Form", none: false, view: true, modify: false, fullControl: false },
    { screenName: "Security Layer Creation", none: false, view: true, modify: false, fullControl: false },
    { screenName: "Set Custom Taxes", none: false, view: true, modify: false, fullControl: false },
    { screenName: "Set Flat System Remark", none: false, view: false, modify: false, fullControl: true },
    { screenName: "Set Remark For Invoice", none: false, view: true, modify: false, fullControl: false },
    { screenName: "setflatsystemremark", none: false, view: true, modify: false, fullControl: false },
    { screenName: "Social details sequence master", none: false, view: true, modify: false, fullControl: false },
    { screenName: "Submission Same As", none: false, view: false, modify: false, fullControl: true },
    { screenName: "SubTypeofUseMaster", none: false, view: true, modify: false, fullControl: false },
    { screenName: "Tap Condition Master", none: false, view: true, modify: false, fullControl: false },
    { screenName: "Tap Dimension Master", none: false, view: true, modify: false, fullControl: false },
    { screenName: "Tap Type Master", none: false, view: true, modify: false, fullControl: false },
    { screenName: "Tax Master", none: false, view: true, modify: false, fullControl: false },
    { screenName: "Tax Name Master", none: false, view: true, modify: false, fullControl: false },
    { screenName: "Tax Payment", none: false, view: true, modify: false, fullControl: false },
    { screenName: "Total Valuation", none: false, view: false, modify: false, fullControl: true },
    { screenName: "Type Of Use Master", none: false, view: true, modify: false, fullControl: false },
    { screenName: "Type Of Use Prime Master", none: false, view: true, modify: false, fullControl: false },
    { screenName: "Update Property Address", none: false, view: false, modify: false, fullControl: true },
    { screenName: "Upload Document", none: false, view: true, modify: false, fullControl: false },
    { screenName: "Usage Category WeightAge Master", none: false, view: true, modify: false, fullControl: false },
    { screenName: "User Access Master", none: false, view: true, modify: false, fullControl: false },
    { screenName: "User Authentication", none: false, view: true, modify: false, fullControl: false },
    { screenName: "User Logins", none: false, view: true, modify: false, fullControl: false },
    { screenName: "Water Connection", none: false, view: true, modify: false, fullControl: false },
    { screenName: "Water Rate Master", none: false, view: true, modify: false, fullControl: false },
    { screenName: "Zone Master", none: false, view: true, modify: false, fullControl: false },
    { screenName: "Zone Section Wise Open Plot Rate Ma...", none: false, view: true, modify: false, fullControl: false },
    { screenName: "ZoneSectionMaster", none: false, view: true, modify: false, fullControl: false }
];

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);// Check for stored user data on component mount


    // Available services with their categories and nested menu structure
    const availableServices = {
        "Property Tax": {
            "CFC": [
                {
                    id: "1", name: "Assessment", type: "menu", children: [
                        {
                            id: "1.1", name: "New Assessment", type: "menu", children: [
                                { id: "1.1.1", name: "Residential", type: "screen" },
                                { id: "1.1.2", name: "Commercial", type: "screen" },
                                { id: "1.1.3", name: "Industrial", type: "screen" }
                            ]
                        },
                        { id: "1.2", name: "Reassessment", type: "screen" },
                        { id: "1.3", name: "Assessment Reports", type: "screen" }
                    ]
                },
                {
                    id: "2", name: "Billing", type: "menu", children: [
                        { id: "2.1", name: "Generate Bill", type: "screen" },
                        { id: "2.2", name: "Bill History", type: "screen" },
                        { id: "2.3", name: "Pending Bills", type: "screen" }
                    ]
                },
                { id: "3", name: "Collection", type: "screen" },
                {
                    id: "4", name: "Reports", type: "menu", children: [
                        { id: "4.1", name: "Daily Reports", type: "screen" },
                        { id: "4.2", name: "Monthly Reports", type: "screen" }
                    ]
                }
            ],
            "Approval": [
                {
                    id: "1", name: "Citizen Services", type: "menu", children: [
                        { id: "1.1", name: "View Bill", type: "screen" },
                        { id: "1.2", name: "Pay Online", type: "screen" },
                        { id: "1.3", name: "Complaint", type: "screen" }
                    ]
                },
                { id: "2", name: "Notifications", type: "screen" }
            ],
            "TAB": [
                {
                    id: "1", name: "Field Survey", type: "menu", children: [
                        { id: "1.1", name: "New Survey", type: "screen" },
                        { id: "1.2", name: "Update Survey", type: "screen" }
                    ]
                },
                { id: "2", name: "Dashboard", type: "screen" }
            ],
            "NTIS": [
                { id: "1", name: "Analytics", type: "screen" },
                {
                    id: "2", name: "Reports", type: "menu", children: [
                        { id: "2.1", name: "Collection Report", type: "screen" },
                        { id: "2.2", name: "Defaulters Report", type: "screen" }
                    ]
                }
            ]
        },
        "Water Tax": {
            "CFC": [
                {
                    id: "1", name: "Connection Management", type: "menu", children: [
                        {
                            id: "1.1", name: "New Connection", type: "menu", children: [
                                { id: "1.1.1", name: "Residential", type: "screen" },
                                { id: "1.1.2", name: "Commercial", type: "screen" }
                            ]
                        },
                        { id: "1.2", name: "Disconnection", type: "screen" },
                        { id: "1.3", name: "Reconnection", type: "screen" }
                    ]
                },
                { id: "2", name: "Meter Reading", type: "screen" },
                {
                    id: "3", name: "Billing", type: "menu", children: [
                        { id: "3.1", name: "Generate Bill", type: "screen" },
                        { id: "3.2", name: "Bill Adjustment", type: "screen" }
                    ]
                },
                { id: "4", name: "Payment", type: "screen" }
            ],
            "Approval": [
                { id: "1", name: "View Bill", type: "screen" },
                { id: "2", name: "Pay Bill", type: "screen" },
                { id: "3", name: "Complaint", type: "screen" }
            ],
            "TAB": [
                { id: "1", name: "Meter Reading Entry", type: "screen" },
                { id: "2", name: "Field Reports", type: "screen" }
            ],
            "NTIS": [
                { id: "1", name: "Water Analytics", type: "screen" },
                { id: "2", name: "Consumption Reports", type: "screen" }
            ]
        },
        "RTS": {
            "CFC": [
                { id: "1", name: "Application", type: "screen" },
                {
                    id: "2", name: "Approval Workflow", type: "menu", children: [
                        { id: "2.1", name: "Pending Approvals", type: "screen" },
                        { id: "2.2", name: "Approved", type: "screen" },
                        { id: "2.3", name: "Rejected", type: "screen" }
                    ]
                },
                { id: "3", name: "Payment", type: "screen" }
            ],
            "Approval": [
                { id: "1", name: "Submit Application", type: "screen" },
                { id: "2", name: "Track Status", type: "screen" }
            ],
            "TAB": [
                { id: "1", name: "Field Verification", type: "screen" }
            ],
            "NTIS": [
                { id: "1", name: "RTS Reports", type: "screen" }
            ]
        },
        "Trade License": {
            "CFC": [
                {
                    id: "1", name: "License Management", type: "menu", children: [
                        { id: "1.1", name: "New License", type: "screen" },
                        { id: "1.2", name: "Renewal", type: "screen" },
                        { id: "1.3", name: "Cancellation", type: "screen" }
                    ]
                },
                { id: "2", name: "Verification", type: "screen" }
            ],
            "Approval": [
                { id: "1", name: "Apply License", type: "screen" },
                { id: "2", name: "View Status", type: "screen" }
            ],
            "TAB": [
                { id: "1", name: "Field Inspection", type: "screen" }
            ],
            "NTIS": [
                { id: "1", name: "Trade Reports", type: "screen" }
            ]
        },
        "Building Permission": {
            "CFC": [
                { id: "1", name: "Plan Submission", type: "screen" },
                {
                    id: "2", name: "Scrutiny", type: "menu", children: [
                        { id: "2.1", name: "Architectural", type: "screen" },
                        { id: "2.2", name: "Structural", type: "screen" },
                        { id: "2.3", name: "Fire Safety", type: "screen" }
                    ]
                },
                { id: "3", name: "Approval", type: "screen" },
                { id: "4", name: "Inspection", type: "screen" }
            ],
            "Approval": [
                { id: "1", name: "Submit Plan", type: "screen" },
                { id: "2", name: "Track Status", type: "screen" }
            ],
            "TAB": [
                { id: "1", name: "Site Inspection", type: "screen" }
            ],
            "NTIS": [
                { id: "1", name: "Building Analytics", type: "screen" }
            ]
        },
        "Birth & Death": {
            "CFC": [
                { id: "1", name: "Birth Registration", type: "screen" },
                { id: "2", name: "Death Registration", type: "screen" },
                {
                    id: "3", name: "Certificate Generation", type: "menu", children: [
                        { id: "3.1", name: "Birth Certificate", type: "screen" },
                        { id: "3.2", name: "Death Certificate", type: "screen" }
                    ]
                }
            ],
            "Approval": [
                { id: "1", name: "Request Certificate", type: "screen" }
            ],
            "TAB": [
                { id: "1", name: "Registration Entry", type: "screen" }
            ],
            "NTIS": [
                { id: "1", name: "Demographics", type: "screen" }
            ]
        },
        "Marriage Registration": {
            "CFC": [
                { id: "1", name: "Application", type: "screen" },
                { id: "2", name: "Certificate", type: "screen" },
                { id: "3", name: "Verification", type: "screen" }
            ],
            "Approval": [
                { id: "1", name: "Marriage Form", type: "screen" }
            ],
            "TAB": [
                { id: "1", name: "Dashboard", type: "screen" }
            ],
            "NTIS": [
                { id: "1", name: "Statistics", type: "screen" }
            ]
        },
        "Fire NOC": {
            "CFC": [
                { id: "1", name: "NOC Application", type: "screen" },
                {
                    id: "2", name: "Inspection", type: "menu", children: [
                        { id: "2.1", name: "Schedule Inspection", type: "screen" },
                        { id: "2.2", name: "Inspection Report", type: "screen" }
                    ]
                },
                { id: "3", name: "Approval", type: "screen" }
            ],
            "Approval": [
                { id: "1", name: "NOC Status", type: "screen" }
            ],
            "TAB": [
                { id: "1", name: "Fire Dashboard", type: "screen" }
            ],
            "NTIS": [
                { id: "1", name: "Fire Reports", type: "screen" }
            ]
        }
    };

    // Store user credentials (in a real app, this would be in a secure backend)
    const [userCredentials, setUserCredentials] = useState([
        {
            username: "admin",
            password: "12345",
            role: "Admin",
            additionalPermissions: [
                {
                    service: "Property Tax",
                    categories: {
                        "CFC": [
                            createScreenPermission("Assessment > New Assessment > Residential"),
                            createScreenPermission("Assessment > New Assessment > Commercial")
                        ],
                        "Approval": [
                            createScreenPermission("Citizen Services > View Bill")
                        ]
                    }
                },
                {
                    service: "Water Tax",
                    categories: {
                        "CFC": [
                            createScreenPermission("Connection Management > New Connection > Residential"),
                            createScreenPermission("Connection Management > New Connection > Commercial")
                        ]
                    }
                }
            ]
        },
        {
            username: "john_doe",
            password: "john123",
            role: "User",
            additionalPermissions: [
                {
                    service: "Property Tax",
                    categories: {
                        "CFC": [
                            createScreenPermission("Assessment > New Assessment > Residential", "view")
                        ]
                    }
                }
            ]
        },
        {
            username: "jane_smith",
            password: "jane123",
            role: "User",
            additionalPermissions: [
                {
                    service: "Water Tax",
                    categories: {
                        "CFC": [
                            createScreenPermission("Connection Management > New Connection > Residential", "modify")
                        ],
                        "Approval": [
                            createScreenPermission("View Bill", "view")
                        ]
                    }
                }
            ]
        },
        {
            username: "mike_wilson",
            password: "mike123",
            role: "Admin",
            additionalPermissions: [
                {
                    service: "Property Tax",
                    categories: {
                        "CFC": [
                            createScreenPermission("Assessment > New Assessment > Residential"),
                            createScreenPermission("Assessment > New Assessment > Commercial"),
                            createScreenPermission("Assessment > New Assessment > Industrial")
                        ]
                    }
                },
                {
                    service: "Trade License",
                    categories: {
                        "CFC": [
                            createScreenPermission("License Management > New License")
                        ]
                    }
                }
            ]
        },
    ]);

    // Users list for display (without passwords)
    const [users, setUsers] = useState([
        {
            username: "admin",
            role: "Admin",
            additionalPermissions: [
                {
                    service: "Property Tax",
                    categories: {
                        "CFC": [
                            createScreenPermission("Assessment > New Assessment > Residential"),
                            createScreenPermission("Assessment > New Assessment > Commercial")
                        ],
                        "Approval": [
                            createScreenPermission("Citizen Services > View Bill")
                        ]
                    }
                },
                {
                    service: "Water Tax",
                    categories: {
                        "CFC": [
                            createScreenPermission("Connection Management > New Connection > Residential"),
                            createScreenPermission("Connection Management > New Connection > Commercial")
                        ]
                    }
                }
            ]
        },
        {
            username: "john_doe",
            role: "User",
            additionalPermissions: [
                {
                    service: "Property Tax",
                    categories: {
                        "CFC": [
                            createScreenPermission("Assessment > New Assessment > Residential", "view")
                        ]
                    }
                }
            ]
        },
        {
            username: "jane_smith",
            role: "User",
            additionalPermissions: [
                {
                    service: "Water Tax",
                    categories: {
                        "CFC": [
                            createScreenPermission("Connection Management > New Connection > Residential", "modify")
                        ],
                        "Approval": [
                            createScreenPermission("View Bill", "view")
                        ]
                    }
                }
            ]
        },
        {
            username: "mike_wilson",
            role: "Admin",
            additionalPermissions: [
                {
                    service: "Property Tax",
                    categories: {
                        "CFC": [
                            createScreenPermission("Assessment > New Assessment > Residential"),
                            createScreenPermission("Assessment > New Assessment > Commercial"),
                            createScreenPermission("Assessment > New Assessment > Industrial")
                        ]
                    }
                },
                {
                    service: "Trade License",
                    categories: {
                        "CFC": [
                            createScreenPermission("License Management > New License")
                        ]
                    }
                }
            ]
        },
    ]);

    // Security layers management
    const [securityLayers, setSecurityLayers] = useState([
        {
            id: "1",
            name: "L1",
            description: "Basic level access with read-only permissions for standard users and general system resources",
            createdBy: "admin",
            createdAt: "2025-01-15",
            status: "Active"
        },
        {
            id: "2",
            name: "L2",
            description: "Intermediate level access with read and write permissions for departmental resources",
            createdBy: "admin",
            createdAt: "2025-01-20",
            status: "Active"
        },
        {
            id: "3",
            name: "L3",
            description: "Advanced level access with full CRUD permissions and ability to manage team resources",
            createdBy: "admin",
            createdAt: "2025-02-01",
            status: "Active"
        },
        {
            id: "4",
            name: "Admin",
            description: "Full administrative access with complete system control, user management, and configuration rights",
            createdBy: "admin",
            createdAt: "2025-01-10",
            status: "Active"
        }
    ]);

    // Layer permissions state
    const [layerPermissions, setLayerPermissions] = useState({
        "1": JSON.parse(JSON.stringify(defaultFormPermissions)),
        "2": JSON.parse(JSON.stringify(defaultFormPermissions)),
        "3": JSON.parse(JSON.stringify(defaultFormPermissions)),
        "4": JSON.parse(JSON.stringify(defaultFormPermissions))
    });

    // User-Layer assignments state
    const [userLayerAssignments, setUserLayerAssignments] = useState({
        "admin": ["4"],
        "john_doe": ["1"],
        "jane_smith": ["2"],
        "mike_wilson": ["3", "4"]
    });

    // Check for stored user data on component mount
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error('Error parsing stored user data:', error);
                localStorage.removeItem('user');
            }
        }
    }, []);

    // Update localStorage whenever user changes
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    const login = (username, password) => {
        // Find user with matching credentials
        const foundUser = userCredentials.find(
            u => u.username === username && u.password === password
        );

        if (!foundUser) {
            // Check if username exists but password is wrong
            const usernameExists = userCredentials.some(u => u.username === username);

            if (usernameExists) {
                return {
                    success: false,
                    message: "Incorrect password. Please try again."
                };
            } else {
                return {
                    success: false,
                    message: "User not found. Please check your username or contact an administrator."
                };
            }
        }

        // Login successful
        const userData = {
            username: foundUser.username,
            role: foundUser.role,
            additionalPermissions: foundUser.additionalPermissions
        };
        setUser(userData);
        return {
            success: true,
            message: "Login successful"
        };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const createUser = (userData) => {
        const newUser = {
            username: userData.username,
            role: "User", // Default role
            additionalPermissions: userData.additionalPermissions || [],
            customLayerPermissions: userData.customLayerPermissions || undefined,
        };

        const newUserCredentials = {
            username: userData.username,
            password: userData.password,
            role: "User",
            additionalPermissions: userData.additionalPermissions || [],
            customLayerPermissions: userData.customLayerPermissions || undefined,
        };

        setUsers([...users, newUser]);
        setUserCredentials([...userCredentials, newUserCredentials]);

        // Automatically assign to layer (default to L1 if not specified)
        const assignedLayer = userData.permissionLayer || "1";
        setUserLayerAssignments(prev => ({
            ...prev,
            [userData.username]: [assignedLayer]
        }));
    };

    const getAvailableServices = () => {
        return availableServices;
    };

    const updateUser = (username, userData) => {
        // Update user in users array
        setUsers(users.map(u => {
            if (u.username === username) {
                return {
                    ...u,
                    additionalPermissions: userData.additionalPermissions !== undefined ? userData.additionalPermissions : u.additionalPermissions,
                    customLayerPermissions: userData.customLayerPermissions !== undefined ? userData.customLayerPermissions : u.customLayerPermissions,
                };
            }
            return u;
        }));

        // Update user credentials as well
        setUserCredentials(userCredentials.map(u => {
            if (u.username === username) {
                return {
                    ...u,
                    additionalPermissions: userData.additionalPermissions !== undefined ? userData.additionalPermissions : u.additionalPermissions,
                    customLayerPermissions: userData.customLayerPermissions !== undefined ? userData.customLayerPermissions : u.customLayerPermissions,
                };
            }
            return u;
        }));

        // Update layer assignment if provided
        if (userData.permissionLayer) {
            setUserLayerAssignments(prev => ({
                ...prev,
                [username]: [userData.permissionLayer]
            }));
        }
    };

    const deleteUser = (username) => {
        setUsers(users.filter(u => u.username !== username));
        setUserCredentials(userCredentials.filter(u => u.username !== username));

        // Remove user from all layer assignments
        setUserLayerAssignments(prev => {
            const newAssignments = { ...prev };
            delete newAssignments[username];
            return newAssignments;
        });
    };

    const createSecurityLayer = (layerData) => {
        const newLayerId = Date.now().toString();
        const newLayer = {
            id: newLayerId,
            name: layerData.name,
            description: layerData.description,
            createdBy: user?.username || "Unknown",
            createdAt: new Date().toISOString().split('T')[0],
            status: "Active"
        };
        setSecurityLayers([...securityLayers, newLayer]);

        // Initialize permissions for the new layer with default values
        setLayerPermissions({
            ...layerPermissions,
            [newLayerId]: JSON.parse(JSON.stringify(defaultFormPermissions))
        });
    };

    const deleteSecurityLayer = (id) => {
        setSecurityLayers(securityLayers.filter(layer => layer.id !== id));
        // Also remove permissions for this layer
        const newPermissions = { ...layerPermissions };
        delete newPermissions[id];
        setLayerPermissions(newPermissions);

        // Remove this layer from all user assignments
        setUserLayerAssignments(prev => {
            const newAssignments = { ...prev };
            Object.keys(newAssignments).forEach(username => {
                newAssignments[username] = newAssignments[username].filter(layerId => layerId !== id);
            });
            return newAssignments;
        });
    };

    const toggleLayerStatus = (id) => {
        setSecurityLayers(securityLayers.map(layer => {
            if (layer.id === id) {
                return {
                    ...layer,
                    status: layer.status === "Active" ? "Inactive" : "Active"
                };
            }
            return layer;
        }));
    };

    const updateLayerPermissions = (layerId, permissions) => {
        setLayerPermissions({
            ...layerPermissions,
            [layerId]: permissions
        });
    };

    const getLayerPermissions = (layerId) => {
        return layerPermissions[layerId] || JSON.parse(JSON.stringify(defaultFormPermissions));
    };

    const addUserToLayer = (username, layerId) => {
        setUserLayerAssignments(prev => {
            const userLayers = prev[username] || [];
            if (userLayers.includes(layerId)) {
                return prev; // Already assigned
            }
            return {
                ...prev,
                [username]: [...userLayers, layerId]
            };
        });
    };

    const removeUserFromLayer = (username, layerId) => {
        setUserLayerAssignments(prev => {
            const userLayers = prev[username] || [];
            return {
                ...prev,
                [username]: userLayers.filter(id => id !== layerId)
            };
        });
    };

    const getUsersInLayer = (layerId) => {
        return users.filter(user => {
            const userLayers = userLayerAssignments[user.username] || [];
            return userLayers.includes(layerId);
        });
    };

    const updateUserLayerAssignment = (username, layerId) => {
        setUserLayerAssignments(prev => ({
            ...prev,
            [username]: [layerId]
        }));
    };

    return (
        <AuthContext.Provider value={{
            user,
            users,
            securityLayers,
            layerPermissions,
            userLayerAssignments,
            login,
            logout,
            createUser,
            deleteUser,
            createSecurityLayer,
            deleteSecurityLayer,
            toggleLayerStatus,
            updateLayerPermissions,
            getLayerPermissions,
            addUserToLayer,
            removeUserFromLayer,
            getUsersInLayer,
            updateUserLayerAssignment,
            updateUser,
            getAvailableServices
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}