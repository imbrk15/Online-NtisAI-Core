import React, { useState, useEffect } from "react";
import { FaIdBadge, FaArrowLeft, FaBars } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

interface SidebarItem {
    to: string;
    label: string;
    icon?: React.ComponentType<{ className?: string }>;
    end?: boolean;
}

interface MasterSidebarProps {
    basePath?: string;
    items?: SidebarItem[];
}

function MasterSidebar({ basePath = "", items = [] }: MasterSidebarProps) {
    const navigate = useNavigate();
    // detect lg screen (≥1024px)
    const initialIsLgUp =
        typeof window !== "undefined"
            ? window.matchMedia("(min-width: 1024px)").matches
            : true;

    const [isLgUp, setIsLgUp] = useState(initialIsLgUp);

    // ✅ large screen → expanded, others → collapsed
    const [collapsed, setCollapsed] = useState(!initialIsLgUp);

    // update sidebar width css var
    useEffect(() => {
        const widthPx = collapsed ? 50 : 190;
        document.documentElement.style.setProperty("--sidebar-w", `${widthPx}px`);
    }, [collapsed]);

    // listen for screen size changes
    useEffect(() => {
        if (typeof window === "undefined") return;
        const mql = window.matchMedia("(min-width: 1024px)");
        const onChange = (e: MediaQueryListEvent) => {
            setIsLgUp(e.matches);
            setCollapsed(!e.matches); // collapse if < lg, expand if ≥ lg
        };

        if (mql.addEventListener) mql.addEventListener("change", onChange);
        else mql.addListener(onChange);

        return () => {
            if (mql.removeEventListener) mql.removeEventListener("change", onChange);
            else mql.removeListener(onChange);
        };
    }, []);

    const handleBackClick = () => navigate("/");
    const showLabel = collapsed ? "hidden" : "inline";
    const [activeIndex, setActiveIndex] = useState(null);
    return (
        <aside
            className={[
                "fixed left-0 top-16 bottom-0 z-50 flex flex-col text-white",
                "bg-gradient-to-b from-[#4A6C8E] to-[#4A6C8E] rounded-r-3xl shadow-[0_8px_24px_rgba(0,0,0,.18)]",
                "transition-all duration-300 ease-in-out overflow-hidden",
                collapsed ? "w-[50px]" : "w-[190px]",
            ].join(" ")}
            role="navigation"
            aria-label="Main sidebar"
        >
            {/* Header */}
            <div className="relative h-[52px] w-full -mt-px rounded-tr-3xl bg-gradient-to-b from-[#4A6C8E] to-[#4A6C8E] px-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {!collapsed && (
                        <FaIdBadge className="text-white/95 text-[18px]" />
                    )}
                    <span
                        className={[
                            "font-semibold transition-all duration-300",
                            showLabel === "hidden" ? "opacity-0 w-0 overflow-hidden" : "opacity-100",
                        ].join(" ")}
                    >
                        Menu
                    </span>
                </div>

                {/* Toggle button */}
                <button
                    type="button"
                    onClick={() => setCollapsed((c) => !c)}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-white/10 focus:outline-none flex-shrink-0"
                    aria-label="Toggle menu"
                    title="Toggle menu"
                >
                    <FaBars className="text-[16px]" />
                </button>
            </div>

            {/* Menu */}
            <div
                className={[
                    "flex-1 rounded-tl-3xl rounded-bl-3xl bg-[#0F2E47] shadow-[0_8px_24px_rgba(0,0,0,.18)] overflow-y-auto",
                    collapsed ? "px-2" : "px-0",
                ].join(" ")}
            >
                <nav className="py-0">
                    {items.map(({ to, label, icon: Icon }, idx) => (
                        <div
                            key={label}
                            onClick={() => {
                                setActiveIndex(idx);
                                navigate(to);
                            }}
                            className={[
                                "group relative h-10 my-1 flex items-center transition rounded-full cursor-pointer",
                                collapsed ? "justify-center px-0" : "justify-start px-4 gap-3",
                                activeIndex === idx
                                    ? "bg-white text-[#0f2540] shadow-[0_6px_18px_rgba(0,0,0,.14)]"
                                    : "text-[#DCE7F4] hover:bg-white/5",
                            ].join(" ")}
                            title={collapsed ? label : undefined}
                        >
                            {Icon && (
                                <Icon
                                    className={[
                                        "text-[18px] flex-shrink-0",
                                        activeIndex === idx ? "text-[#0f2540]" : "text-[#DCE7F4]",
                                    ].join(" ")}
                                />
                            )}
                            <span
                                className={[
                                    "whitespace-nowrap text-sm transition-all duration-300",
                                    collapsed ? "hidden" : "block",
                                    activeIndex === idx ? "font-medium text-[#0f2540]" : "text-[#DCE7F4]",
                                ].join(" ")}
                            >
                                {label}
                            </span>
                        </div>
                    ))}
                </nav>
            </div>

            {/* Back button */}
            <div className="w-full mt-auto px-3 pb-3">
                <button
                    type="button"
                    onClick={handleBackClick}
                    className="w-full h-9 flex items-center justify-center gap-2 text-sm font-medium text-[#EDF3F9] bg-gradient-to-b from-[#495B72] to-[#3E5067] ring-1 ring-white/70 rounded-lg shadow-[inset_0_1px_0_rgba(255,255,255,.22),0_4px_12px_rgba(0,0,0,.18)] hover:brightness-[1.06] focus:outline-none"
                    title="Back to Home"
                >
                    <FaArrowLeft className="text-[14px]" />
                    <span className={collapsed ? "hidden" : "inline"}>Back to Home</span>
                </button>
            </div>
        </aside>
    );
}

export default MasterSidebar;