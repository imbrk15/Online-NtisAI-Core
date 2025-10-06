import React, { useState } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Alert, AlertDescription } from "../ui/alert";
import { Lock, User, Shield, AlertCircle } from "lucide-react";

function Login() {
    const { login } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(""); // Clear error when user types
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!formData.username || !formData.password) {
            setError("Please fill in all fields");
            return;
        }

        setIsLoading(true);

        // Simulate async login
        setTimeout(() => {
            const result = login(formData.username, formData.password);

            if (!result.success) {
                setError(result.message);
                setIsLoading(false);
            } else {
                // Redirect to the page they were trying to access, or home
                const from = location.state?.from?.pathname || "/home";
                navigate(from, { replace: true });
            }
            // If successful, the user state will update and redirect automatically
        }, 500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50 p-4">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
            </div>

            <Card className="w-full max-w-md relative shadow-2xl border-2">
                {/* Header with icon */}
                <CardHeader className="space-y-4 pb-6">
                    <div className="flex justify-center">
                        <div className="p-4 rounded-full bg-gradient-to-br from-[#004c8c] to-[#0066b3] shadow-lg">
                            <Shield className="w-12 h-12 text-white" />
                        </div>
                    </div>
                    <div className="text-center space-y-2">
                        <CardTitle className="text-3xl">Welcome Back</CardTitle>
                        <CardDescription className="text-base">
                            Sign in to your account to continue
                        </CardDescription>
                    </div>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Error Alert */}
                        {error && (
                            <Alert variant="destructive" className="animate-in fade-in slide-in-from-top-2">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        {/* Username Field */}
                        <div className="space-y-2">
                            <Label htmlFor="username" className="flex items-center gap-2">
                                <User className="w-4 h-4 text-muted-foreground" />
                                Username
                            </Label>
                            <div className="relative">
                                <Input
                                    id="username"
                                    name="username"
                                    type="text"
                                    placeholder="Enter your username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="pl-10 h-12 border-2 focus:border-[#004c8c] transition-colors"
                                    disabled={isLoading}
                                />
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <Label htmlFor="password" className="flex items-center gap-2">
                                <Lock className="w-4 h-4 text-muted-foreground" />
                                Password
                            </Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="pl-10 h-12 border-2 focus:border-[#004c8c] transition-colors"
                                    disabled={isLoading}
                                />
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full h-12 bg-gradient-to-r from-[#004c8c] to-[#0066b3] hover:from-[#003d6e] hover:to-[#004c8c] shadow-lg hover:shadow-xl transition-all duration-200"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Signing in...
                                </div>
                            ) : (
                                "Sign In"
                            )}
                        </Button>

                        {/* Info Text */}
                        <div className="text-center pt-4">
                            <p className="text-sm text-muted-foreground">
                                Only registered users can access the system
                            </p>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* Footer */}
            <div className="absolute bottom-4 left-0 right-0 text-center">
                <p className="text-sm text-muted-foreground">
                    Secure User Management System
                </p>
            </div>
        </div>
    );
}

export default Login;