import React, { useState } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Alert, AlertDescription } from "../ui/alert";
import { Lock, User, AlertCircle } from "lucide-react";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const result = login(username, password);

        if (result.success) {
            const from = location.state?.from?.pathname || "/home";
            navigate(from, { replace: true });
        } else {
            setError(result.message);
        }
    };

    // Inline styles for the animated background
    const backgroundStyles = {
        loginRoot: {
            background: '#fff',
            display: 'flex',
            width: '100%',
            minHeight: '100vh',
            overflow: 'hidden',
        },
        loginBackground: {
            minHeight: '692px',
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            top: 0,
            zIndex: 0,
            overflow: 'hidden',
        },
        backgroundGrid: {
            display: 'grid',
            gridTemplateColumns: '[start] 1fr [left-gutter] repeat(16,86.6px) [left-gutter] 1fr [end]',
            gridTemplateRows: '[top] 1fr [top-gutter] repeat(8,64px) [bottom-gutter] 1fr [bottom]',
            justifyContent: 'center',
            margin: '0 -2%',
            transform: 'rotate(-12deg) skew(-12deg)',
        },
        boxDivider: {
            boxShadow: 'inset 0 0 0 2px #e3e8ee',
        },
        boxBlue: {
            backgroundColor: '#5469d4',
        },
        boxBlue800: {
            backgroundColor: '#212d63',
        },
        boxGray: {
            backgroundColor: '#e3e8ee',
        },
        boxCyan: {
            backgroundColor: '#7fd3ed',
        },
        // Animations
        animationLeftRight: {
            animation: 'animationLeftRight 2s ease-in-out infinite',
        },
        animationRightLeft: {
            animation: 'animationRightLeft 2s ease-in-out infinite',
        },
        tans3s: {
            animation: 'animationLeftRight 3s ease-in-out infinite',
        },
        tans4s: {
            animation: 'animationLeftRight 4s ease-in-out infinite',
        },
    };

    // Form styles
    const formStyles = {
        formBg: {
            margin: '0px auto',
            width: '100%',
            maxWidth: '448px',
            background: 'white',
            borderRadius: '4px',
            boxShadow: 'rgba(60, 66, 87, 0.12) 0px 7px 14px 0px, rgba(0, 0, 0, 0.12) 0px 3px 6px 0px',
        },
        formBgInner: {
            padding: '48px',
        },
        customInput: {
            fontSize: '16px',
            lineHeight: '28px',
            padding: '12px 16px 12px 40px',
            width: '100%',
            minHeight: '44px',
            border: 'unset',
            borderRadius: '4px',
            outlineColor: 'rgb(84 105 212 / 0.5)',
            backgroundColor: 'rgb(255, 255, 255)',
            boxShadow: `rgba(0, 0, 0, 0) 0px 0px 0px 0px, 
                       rgba(0, 0, 0, 0) 0px 0px 0px 0px, 
                       rgba(0, 0, 0, 0) 0px 0px 0px 0px, 
                       rgba(60, 66, 87, 0.16) 0px 0px 0px 1px, 
                       rgba(0, 0, 0, 0) 0px 0px 0px 0px, 
                       rgba(0, 0, 0, 0) 0px 0px 0px 0px, 
                       rgba(0, 0, 0, 0) 0px 0px 0px 0px`,
        },
        customSubmitButton: {
            backgroundColor: 'rgb(84, 105, 212)',
            boxShadow: `rgba(0, 0, 0, 0) 0px 0px 0px 0px, 
                       rgba(0, 0, 0, 0) 0px 0px 0px 0px, 
                       rgba(0, 0, 0, 0.12) 0px 1px 1px 0px, 
                       rgb(84, 105, 212) 0px 0px 0px 1px, 
                       rgba(0, 0, 0, 0) 0px 0px 0px 0px, 
                       rgba(0, 0, 0, 0) 0px 0px 0px 0px, 
                       rgba(60, 66, 87, 0.08) 0px 2px 5px 0px`,
            color: '#fff',
            fontWeight: '600',
            cursor: 'pointer',
            border: 'none',
            minHeight: '44px',
            fontSize: '16px',
            width: '100%',
            borderRadius: '4px',
        },
    };

    return (
        <div style={backgroundStyles.loginRoot}>
            <div className="flex flex-col pt-20" style={{ minHeight: '100vh', flexGrow: 1 }}>
                {/* Animated Background */}
                <div style={backgroundStyles.loginBackground}>
                    <div style={backgroundStyles.backgroundGrid}>
                        <div className="flex" style={{ gridArea: 'top / start / 8 / end' }}>
                            <div style={{
                                backgroundImage: 'linear-gradient(white 0%, rgb(247, 250, 252) 33%)',
                                flexGrow: 1
                            }}></div>
                        </div>
                        <div className="flex" style={{ gridArea: '4 / 2 / auto / 5' }}>
                            <div style={{
                                ...backgroundStyles.boxDivider,
                                ...backgroundStyles.tans3s,
                                flexGrow: 1
                            }}></div>
                        </div>
                        <div className="flex" style={{ gridArea: '6 / start / auto / 2' }}>
                            <div style={{
                                ...backgroundStyles.boxBlue800,
                                flexGrow: 1
                            }}></div>
                        </div>
                        <div className="flex" style={{ gridArea: '7 / start / auto / 4' }}>
                            <div style={{
                                ...backgroundStyles.boxBlue,
                                ...backgroundStyles.animationLeftRight,
                                flexGrow: 1
                            }}></div>
                        </div>
                        <div className="flex" style={{ gridArea: '8 / 4 / auto / 6' }}>
                            <div style={{
                                ...backgroundStyles.boxGray,
                                ...backgroundStyles.tans3s,
                                flexGrow: 1
                            }}></div>
                        </div>
                        <div className="flex" style={{ gridArea: '2 / 15 / auto / end' }}>
                            <div style={{
                                ...backgroundStyles.boxCyan,
                                ...backgroundStyles.tans4s,
                                flexGrow: 1
                            }}></div>
                        </div>
                        <div className="flex" style={{ gridArea: '3 / 14 / auto / end' }}>
                            <div style={{
                                ...backgroundStyles.boxBlue,
                                ...backgroundStyles.animationRightLeft,
                                flexGrow: 1
                            }}></div>
                        </div>
                        <div className="flex" style={{ gridArea: '4 / 17 / auto / 20' }}>
                            <div style={{
                                ...backgroundStyles.boxGray,
                                ...backgroundStyles.tans4s,
                                flexGrow: 1
                            }}></div>
                        </div>
                        <div className="flex" style={{ gridArea: '5 / 14 / auto / 17' }}>
                            <div style={{
                                ...backgroundStyles.boxDivider,
                                ...backgroundStyles.tans3s,
                                flexGrow: 1
                            }}></div>
                        </div>
                    </div>
                </div>

                {/* Login Form */}
                <div className="flex flex-col" style={{ flexGrow: 1, zIndex: 9, paddingTop: '24px' }}>
                    <div className="mx-auto w-full max-w-md">
                        <div style={formStyles.formBg}>
                            <div style={formStyles.formBgInner}>
                                <span className="block text-xl font-semibold text-gray-900 pb-4">
                                    Sign in to your account
                                </span>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {error && (
                                        <Alert variant="destructive" className="mb-4">
                                            <AlertCircle className="h-4 w-4" />
                                            <AlertDescription>{error}</AlertDescription>
                                        </Alert>
                                    )}

                                    <div className="pb-6">
                                        <Label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                                            Username
                                        </Label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                            <input
                                                id="username"
                                                type="text"
                                                placeholder="Enter your username"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                style={formStyles.customInput}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="pb-6">
                                        <div className="flex justify-between items-center mb-2">
                                            <Label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                                                Password
                                            </Label>
                                        </div>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                            <input
                                                id="password"
                                                type="password"
                                                placeholder="Enter your password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                style={formStyles.customInput}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="pb-6">
                                        <button
                                            type="submit"
                                            style={formStyles.customSubmitButton}
                                            onMouseOver={(e) => {
                                                e.currentTarget.style.backgroundColor = 'rgb(72, 95, 199)';
                                            }}
                                            onMouseOut={(e) => {
                                                e.currentTarget.style.backgroundColor = 'rgb(84, 105, 212)';
                                            }}
                                        >
                                            Sign In
                                        </button>
                                    </div>

                                    <div className="text-sm text-center text-gray-600 mt-4 pt-4 border-t border-gray-200">
                                        <p>Default credentials: admin / 12345</p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add animation keyframes */}
            <style>
                {`
                @keyframes animationLeftRight {
                    0% {
                        transform: translateX(0px);
                    }
                    50% {
                        transform: translateX(1000px);
                    }
                    100% {
                        transform: translateX(0px);
                    }
                } 

                @keyframes animationRightLeft {
                    0% {
                        transform: translateX(0px);
                    }
                    50% {
                        transform: translateX(-1000px);
                    }
                    100% {
                        transform: translateX(0px);
                    }
                }
                `}
            </style>
        </div>
    );
}