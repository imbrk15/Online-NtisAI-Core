// src/Components/Auth/Login.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";

export default function Login() {
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/home";

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (isAuthenticated) {
            // if already logged in, go to home (or to `from`)
            navigate(from, { replace: true });
        }
    }, [isAuthenticated, navigate, from]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        const result = login(username.trim(), password);
        if (result.ok) {
            navigate(from, { replace: true });
        } else {
            setError(result.error);
        }
    };

    return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
            background: "#f7f7fb"
        }}>
            <form onSubmit={handleSubmit} style={{
                width: 360,
                padding: "1.6rem",
                borderRadius: 8,
                boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
                background: "#fff"
            }}>
                <h2 style={{ marginBottom: 8 }}>Sign in</h2>
                <p style={{ marginTop: 0, fontSize: 13, color: "#555" }}>
                    Demo credentials: <strong>admin</strong> / <strong>12345</strong>
                </p>

                {error && (
                    <div style={{ color: "#b91c1c", marginTop: 8, marginBottom: 8 }}>{error}</div>
                )}

                <div style={{ marginTop: 8 }}>
                    <label style={{ fontSize: 13, display: "block", marginBottom: 6 }}>Username</label>
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="admin"
                        style={{ width: "100%", padding: "8px 10px", borderRadius: 6, border: "1px solid #ddd" }}
                        autoFocus
                    />
                </div>

                <div style={{ marginTop: 12 }}>
                    <label style={{ fontSize: 13, display: "block", marginBottom: 6 }}>Password</label>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="12345"
                        style={{ width: "100%", padding: "8px 10px", borderRadius: 6, border: "1px solid #ddd" }}
                    />
                </div>

                <button
                    type="submit"
                    style={{
                        marginTop: 16,
                        width: "100%",
                        padding: "10px 12px",
                        borderRadius: 6,
                        background: "#2563eb",
                        color: "#fff",
                        border: "none",
                        cursor: "pointer"
                    }}
                >
                    Login
                </button>
            </form>
        </div>
    );
}
