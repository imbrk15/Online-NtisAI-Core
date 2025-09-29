import {
    FaChartPie,
    FaSearch,
    FaRetweet,
    FaFileAlt,
    FaBalanceScale,
    FaUsers,
    FaThLarge,
    FaGlobeAsia,
    FaShareSquare,
    FaExchangeAlt,
    FaUserCog,
    FaDatabase,
} from "react-icons/fa";

export const sidebarMenu = (basePath = "/propertyTax") => [
    { to: `${basePath}`, label: "Data Analytics", icon: FaChartPie, end: true },
    { to: `${basePath}/propertySearch`, label: "Search Property", icon: FaSearch },
    { to: `${basePath}/wadhghatHistory`, label: "WadhGhat History", icon: FaRetweet },
    { to: `${basePath}/ferfarHistory`, label: "Ferfar History", icon: FaShareSquare },
    //{ to: `${basePath}/CVFactors`, label: "CV Factors", icon: FaCalculator },
    { to: `${basePath}/master`, label: "Master", icon: FaDatabase },
    { to: `${basePath}/reports`, label: "All Reports", icon: FaFileAlt },
    { to: `${basePath}/rti`, label: "RTI Services", icon: FaBalanceScale },
    { to: `${basePath}/aaple`, label: "Aaple Sarkar", icon: FaUsers },
    { to: `${basePath}/cms`, label: "CMS", icon: FaThLarge },
    { to: `${basePath}/gis`, label: "GIS", icon: FaGlobeAsia },
    { to: `${basePath}/txn`, label: "Transaction", icon: FaExchangeAlt },
    { to: `${basePath}/users`, label: "User Management", icon: FaUserCog },
    
];
