import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const getInitialUser = () => {
    try {
        return JSON.parse(localStorage.getItem("appUser")) || null;
    } catch {
        return null;
    }
};

const getInitialUsers = () => {
    try {
        return JSON.parse(localStorage.getItem("appUsers")) || [
            { username: "admin", password: "12345", role: "Admin", permissions: ["*"] },
            { username: "demo", password: "demo123", role: "User", permissions: [] },
        ];
    } catch {
        return [
            { username: "admin", password: "12345", role: "Admin", permissions: ["*"] },
            { username: "demo", password: "demo123", role: "User", permissions: [] },
        ];
    }
};

export const AuthProvider = ({ children }) => {
    const [users, setUsers] = useState(getInitialUsers);
    const [user, setUser] = useState(getInitialUser());
    const isAuthenticated = !!user;

    useEffect(() => {
        localStorage.setItem("appUsers", JSON.stringify(users));
    }, [users]);

    useEffect(() => {
        if (user) localStorage.setItem("appUser", JSON.stringify(user));
        else localStorage.removeItem("appUser");
    }, [user]);

    const login = (username, password) => {
        const foundUser = users.find(
            (u) => u.username === username && u.password === password
        );
        if (foundUser) {
            setUser(foundUser);
            return { ok: true, user: foundUser };
        }
        return { ok: false, error: "Invalid username or password" };
    };

    const logout = () => setUser(null);

    const createUser = (newUser) => {
        const exists = users.some((u) => u.username === newUser.username);
        if (exists) return { ok: false, error: "Username already exists" };
        setUsers((prev) => [...prev, { ...newUser, permissions: [] }]);
        return { ok: true };
    };

    const assignPermissions = (username, permissions) => {
        setUsers((prev) =>
            prev.map((u) => (u.username === username ? { ...u, permissions } : u))
        );
        if (user?.username === username) {
            setUser((prev) => ({ ...prev, permissions }));
        }
    };

    return (
        <AuthContext.Provider
            value={{ user, users, isAuthenticated, login, logout, createUser, assignPermissions }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
