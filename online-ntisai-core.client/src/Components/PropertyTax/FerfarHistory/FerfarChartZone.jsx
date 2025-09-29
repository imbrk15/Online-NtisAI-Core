import React, { useState } from "react";

type DropdownMenuProps = {
    items: string[];
    selected: string;
    onSelect: (item: string) => void;
};

function DropdownMenu({ items, selected, onSelect }: DropdownMenuProps) {
    const [open, setOpen] = useState(false);

    const toggleDropdown = () => setOpen((prev) => !prev);
    const handleSelect = (item: string) => {
        onSelect(item);
        setOpen(false);
    };

    return (
        <div className="relative w-full sm:w-48">
            {/* Main Button */}
            <button
                onClick={toggleDropdown}
                className="flex w-full items-center justify-between px-4 py-2 rounded-lg border border-blue-300 bg-blue-50 text-blue-800 hover:bg-blue-100 transition"
            >
                <span className="truncate">{selected}</span>
                <svg
                    className={`w-4 h-4 ml-2 transform transition-transform ${open ? "rotate-180" : ""
                        }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                >
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                </svg>
            </button>

            {/* Dropdown List */}
            {open && (
                <div className="absolute mt-2 w-full sm:w-48 rounded-lg border border-blue-200 bg-white shadow-lg z-10">
                    <ul className="py-1">
                        {items.map((item) => (
                            <li key={item}>
                                <button
                                    onClick={() => handleSelect(item)}
                                    className="w-full px-3 py-2 text-left text-blue-700 hover:bg-blue-100"
                                >
                                    {item}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

type FerfarChartZoneProps = {
    selectedZone: string;
    onZoneChange: (zone: string) => void;
};

function FerfarChartZone({ selectedZone, onZoneChange }: FerfarChartZoneProps) {
    const zones = ["All Zones", "Kalwa", "Mumbra", "Diva", "Wagle"];

    return (
        <div className="relative mt-4 rounded-2xl border border-[#e6eef5] bg-white p-4 md:p-5 shadow-[0_20px_45px_rgba(28,55,90,.08),0_4px_12px_rgba(28,55,90,.06)]">
            <div className="pointer-events-none absolute left-0 right-0 top-0 h-16 rounded-t-2xl bg-gradient-to-b from-white/95 to-transparent" />

            {/* Responsive Flex */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <span className="text-lg font-medium text-black-800">
                    Charts Zone
                </span>

                <DropdownMenu
                    items={zones}
                    selected={selectedZone}
                    onSelect={onZoneChange}
                />

                <span className="text-sm text-black-800 ">
                    Charts respond to page filters and the selected zone here.
                </span>
            </div>
        </div>
    );
}

export default FerfarChartZone;
