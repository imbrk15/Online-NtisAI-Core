import React from "react";
import { useAuth } from "../../Contexts/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
const links = [
    { to: "/home", label: "Home", access: "all" },
    { to: "/services", label: "Services", access: "all" },
    { to: "/about", label: "About", access: "all" },
    { to: "/contact", label: "Contact", access: "all" },
    { to: "/user-management", label: "User Management", access: "admin" },
];


function HomeNavbar() {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const handleSignOut = () => {
        logout();
        navigate("/");
    };

    // Filter links based on access rules
    const filteredLinks = links.filter(({ access }) => {
        if (!user) return false; // No user, no navbar
        if (access === "all") return true;
        if (access === "admin") return user.role === "Admin";
        return true;
    });

    // Don't show navbar if no user is logged in
    if (!user) return null;

    return (
        <nav className="bg-[#004c8c] text-white flex justify-between items-center px-4 py-3 shadow-md overflow-x-auto">
            {/* Spacer for left side - balances the right side content */}
            <div className="w-32"></div>

            {/* Centered navigation links */}
            <div className="flex gap-6 sm:gap-8 justify-center flex-1">
                {filteredLinks.map(({ to, label }) => (
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
                ))}
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
