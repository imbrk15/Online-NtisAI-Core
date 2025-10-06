import React from "react";
import { useAuth } from "../../Contexts/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
const links = [
    { to: "/home", label: "Home" },
    { to: "/services", label: "Services" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
    { to: "/user-management", label: "User Management" },
];


function HomeNavbar() {
    const { logout, user } = useAuth();
    const navigate = useNavigate();
    const handleSignOut = () => {
        logout();
        navigate("/");
    };

    return (
        <nav className="bg-[#004c8c] text-white flex justify-between items-center px-4 py-3 shadow-md overflow-x-auto">
            {/* Spacer for left side - balances the right side content */}
            <div className="w-32"></div>

            {/* Centered navigation links */}
            <div className="flex gap-6 sm:gap-8 justify-center flex-1">
                {links.map(({ to, label }) =>
                    !user || user.role === "Admin" ? (
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
                        >
                            {label}
                        </NavLink>
                    ) : null
                )}
            </div>

            {/* Right: Username + Sign Out */}
            <div className="flex items-center gap-4 w-32 justify-end">
                {user && (
                    <span className="font-medium text-white whitespace-nowrap">
                        {user.username}
                    </span>
                )}
                <button
                    onClick={handleSignOut}
                    className="font-medium hover:underline whitespace-nowrap"
                >
                    Sign Out
                </button>
            </div>
        </nav>
    );
}

export default HomeNavbar;
