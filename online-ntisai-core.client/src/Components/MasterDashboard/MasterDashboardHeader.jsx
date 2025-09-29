import React from "react";

function MasterDashboardHeader() {
    return (
        <header className="fixed top-0 inset-x-0 z-40 h-16">
            <div className="relative h-full max-w-full px-4 flex items-center border-t border-white/40 border-b border-[#5e7e98]/40 shadow-[inset_0_1px_0_rgba(255,255,255,.6)] bg-[linear-gradient(180deg,#d7e9fb_0%,#c5dcf7_45%,#b0cef0_70%,#99bfe7_100%)]">

                {/* Logo on Left */}
                <img
                    src="/logo_loader.png"
                    alt="TMC Logo"
                    className="h-14 w-20 object-contain"
                />

                {/* Moving Title */}
                <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl md:text-3xl font-bold text-slate-900 tracking-wide drop-shadow-sm animate-marquee">
                    Thane Municipal Corporation
                </h1>
            </div>
        </header>
    );
}

export default MasterDashboardHeader;
