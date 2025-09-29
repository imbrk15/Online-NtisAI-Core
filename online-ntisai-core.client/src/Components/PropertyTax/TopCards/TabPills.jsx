import React from "react";
import { NavLink } from "react-router-dom";
import {
    FaFolderOpen,
    FaChartLine,
    FaCoins,
    FaFileInvoice,
} from "react-icons/fa";

// Reusable TileButton
const TileButton = ({ to, label, icon: Icon, bgClass, gradientBar }) => (
    <NavLink
        to={to}
        className={({ isActive }) =>
            [
                "relative flex items-center h-full rounded-[5px_15px_5px_15px] overflow-hidden shadow-md transition-all duration-300",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400",
                "pl-2.5"
,                isActive ? "active-card" : "hover:-translate-y-1 hover:shadow-lg",
            ].join(" ")
        }
    >
        {/* Left gradient accent bar */}
        <span
            aria-hidden
            className={`absolute inset-y-0 left-0 w-6 md:w-6 ${gradientBar}`}
        />

        {/* Card Content */}
        <div
            className={`relative z-[1] flex flex-col items-center justify-center gap-2 py-6 px-4 w-full rounded-[5px_15px_5px_15px] ${bgClass}`}
        >
            <Icon className="text-xl md:text-2xl group-hover:scale-110 transition-transform duration-300" />
            <span className="text-sm md:text-base font-semibold">{label}</span>
        </div>
    </NavLink>
);

function TabPills() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <TileButton
                to="/propertyTax"
                label="Master Dashboard"
                icon={FaFolderOpen}
                bgClass="bg-gradient-to-br from-[#f2f7ff] via-[#bcd3ff] to-[#e6f0ff] text-slate-800"
                gradientBar="bg-gradient-to-b from-[#3b5998] via-[#6a89cc] to-[#9fa8da]"
            />
            <TileButton
                to="/propertyTax"
                label="Survey Dashboard"
                icon={FaChartLine}
                bgClass="bg-gradient-to-br from-[#ededfa] via-[#d4d5f7] to-[#f7f7ff] text-[#4a3f1d]"
                gradientBar="bg-gradient-to-b from-[#565793] via-[#bcbdf1] to-[#b8b8e5]"
            />
            <TileButton
                to="/propertyTax/collection"
                label="Collection Dashboard"
                icon={FaCoins}
                bgClass="bg-gradient-to-br from-[#ebfdff] via-[#bdecf3] to-[#f0fcff] text-black"
                gradientBar="bg-gradient-to-b from-[#1b7b85] via-[#7ed6df] to-[#a5ede7]"
            />
            <TileButton
                to="/propertyTax/billing"
                label="Bill Distribution"
                icon={FaFileInvoice}
                bgClass="bg-gradient-to-br from-[#f8e8e8] via-[#f8c2c2] to-[#fff0f0] text-[#4a1f1f]"
                gradientBar="bg-gradient-to-b from-[#D25D5D] via-[#f4aaaa] to-[#f2b4b4]"
            />
        </div>
    );
}

export default TabPills;
