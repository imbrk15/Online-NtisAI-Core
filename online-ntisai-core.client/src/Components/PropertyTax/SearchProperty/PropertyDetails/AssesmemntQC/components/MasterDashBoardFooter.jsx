import React from "react";

function MasterDashBoardFooter() {
    return (
        <footer className="fixed right-0 bottom-0 z-40 transition-[left] duration-300"
            style={{
                left: "var(--sidebar-w, 50px)",
                width: "calc(100% - var(--sidebar-w, 50px))",
                position: "fixed",
                bottom: 0
            }}>
            <div className="h-10 md:h-12 flex items-center justify-center text-xs md:text-sm font-medium text-slate-800 border-t border-[#5e7e98]/40 shadow-[inset_0_1px_0_rgba(255,255,255,.6)] bg-[linear-gradient(180deg,#d7e9fb_0%,#c5dcf7_45%,#b0cef0_70%,#99bfe7_100%)]">
                © 2025 Thane Municipal Corporation. All rights reserved.
            </div>
        </footer>
    );
}

export default MasterDashBoardFooter;