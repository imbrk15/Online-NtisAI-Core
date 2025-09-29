import {
    FaHistory,
    FaRobot,
    FaThumbsUp,
    FaClock,
    FaUserShield,
    FaChartPie,
    FaFileAlt,
    FaCheckCircle,
    FaArrowLeft
} from "react-icons/fa";
import {
    FaDroplet,
    FaScaleBalanced,
    FaChartLine,
    FaMoneyBillTransfer,
} from "react-icons/fa6";
import { FaFile } from "react-icons/fa6";
import { ImHammer2 } from "react-icons/im";
import { BiBorderAll } from 'react-icons/bi';

export const SidebarNTISAI = (basePath = "/propertyTax/PropertySearch/PropertyDetails") => [
    { to: `${basePath}`, label: "E-pass book", icon: BiBorderAll, end: true },
    { to: `${basePath}/AssessmentQC`, label: "Assesment QC", icon: FaHistory },
    { to: `${basePath}/WadghatHistory`, label: "Wadghat History", icon: FaHistory },
    { to: `${basePath}/FerfarHistory`, label: "Ferfar History", icon: FaMoneyBillTransfer },
    { to: `${basePath}/HearingDetails`, label: "Hearing Details", icon: ImHammer2 },
    { to: `${basePath}/Bajarparvana`, label: "Bajar parvana", icon: FaFileAlt },
    { to: `${basePath}/WaterIntegration`, label: "Water Integration", icon: FaDroplet },
    { to: `${basePath}/Allreport`, label: "All report", icon: FaFile },
    { to: `${basePath}/AutoQC`, label: "Auto QC", icon: FaCheckCircle },
    { to: `${basePath}/RV-CVComparison`, label: "RV/CV Comparison", icon: FaScaleBalanced },
    { to: `${basePath}/Chatbot`, label: "Chatbot", icon: FaRobot },
    { to: `${basePath}/E-approval`, label: "E-approval", icon: FaThumbsUp },
    { to: `${basePath}/RTS`, label: "RTS", icon: FaClock },
    { to: `${basePath}/AapleSarkar`, label: "Aaple Sarkar", icon: FaUserShield },
    { to: `${basePath}/PayTrend`, label: "Pay Trend", icon: FaChartLine },
    { to: `${basePath}/DataAnalysis`, label: "Data analysis", icon: FaChartPie },
];