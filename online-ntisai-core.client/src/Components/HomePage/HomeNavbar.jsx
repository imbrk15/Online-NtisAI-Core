import React from "react";
import { NavLink } from "react-router-dom";

const links = [
    { to: "/", label: "Home" },
    { to: "/services", label: "Services" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
];

function HomeNavbar() {
    return (
        <nav className="bg-[#004c8c] text-white flex justify-center items-center gap-6 sm:gap-8 py-3 shadow-md overflow-x-auto">
            {links.map(({ to, label }) => (
                <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) =>
                        [
                            "font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded-sm",
                            "hover:underline whitespace-nowrap",
                            isActive ? "underline underline-offset-4" : "",
                        ].join(" ")
                    }
                    end={to === "/"}
                >
                    {label}
                </NavLink>
            ))}
        </nav>
    );
}



export default HomeNavbar;
