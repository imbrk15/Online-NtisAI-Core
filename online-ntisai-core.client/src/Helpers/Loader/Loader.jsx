// src/Components/Loader/Loader.jsx
import React from "react";

export default function Loader() {
    return (
        <div className="flex items-center justify-center h-screen bg-white z-50 fixed top-0 left-0 w-full">
            <div className="flex flex-col items-center space-y-4">
                {/* Logo */}
                <img src="/logo_loader.png" alt="Logo" className="w-30 h-30 animate-pulse" />

                {/* Tailwind spinner */}
                <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
        </div>
    );
}
