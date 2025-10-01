import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";

export default function RequireAuth({ children, requiredPath }) {
    const { isAuthenticated, user } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    if (
        user.role !== "Admin" &&
        requiredPath &&
        !user.permissions.includes("*") &&
        !user.permissions.includes(requiredPath)
    ) {
        return (
            <div className="p-6 text-red-600 font-semibold">
                🚫 You do not have permission to access this page.
            </div>
        );
    }

    return children;
}
