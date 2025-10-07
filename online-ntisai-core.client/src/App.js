//import "./App.css";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { LoaderProvider, useLoader } from "./Helpers/Loader/LoaderContext";
import Loader from "./Helpers/Loader/Loader";
import { ToastProvider } from './Contexts/ToastContext';
import { AuthProvider, useAuth } from "./Contexts/AuthContext";
import { PermissionProvider, usePermission } from "./Contexts/PermissionContext"; // Add this import
import HomePage from "./Components/HomePage/Homepage";
import UserManagement from "./Components/UserManagement/UserManagement";
import PropertyTaxSurveyDashboard from "./Components/PropertyTax/PropertyTaxSurveyDashboard";
import PropertyTaxCollectionDashboard from "./Components/PropertyTax/PropertyTaxCollectionDashboard";
import PropertyTaxBillingDashboard from "./Components/PropertyTax/PropertyTaxBillingDashboard";
import PropertyTaxMain from "./Components/PropertyTax/PropertyTaxMain";
import SearchPropertyMain from "./Components/PropertyTax/SearchProperty/SearchPropertyMain";
import PropertyDetailsMain from "./Components/PropertyTax/SearchProperty/PropertyDetails/PropertyDetailsMain";
import WadhghatHistoryMain from "./Components/PropertyTax/WadhGhatHistory/WadhghatHistoryMain";
import FerfarHistoryMain from "./Components/PropertyTax/FerfarHistory/FerfarHistoryMain";
import MasterMain from "./Components/PropertyTax/Master/MasterMain";
import AssesmentQCPage from "./Components/PropertyTax/SearchProperty/PropertyDetails/AssesmemntQC/AssesmentQCPage";
import Login from "./Components/Auth/Login"

// Enhanced ProtectedRoute with permission checking
function ProtectedRoute({ children, requiredPermission, requiredLevel = "view" }) {
    const { user } = useAuth();
    const { hasPermission } = usePermission();
    const location = useLocation();

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // If specific permission is required, check it
    if (requiredPermission) {
        const hasAccess = hasPermission(location.pathname, requiredLevel);

        if (!hasAccess) {
            // Show toast message about insufficient permissions
            setTimeout(() => {
                const event = new CustomEvent('show-permission-error', {
                    detail: {
                        message: "You don't have permission to access this page",
                        from: location.pathname
                    }
                });
                window.dispatchEvent(event);
            }, 100);

            return (
                <Navigate
                    to="/home"
                    state={{
                        from: location,
                        error: "You don't have permission to access this page"
                    }}
                    replace
                />
            );
        }
    }

    return children;
}

function AppRoutes() {
    const location = useLocation();
    const { setLoading } = useLoader();
    const { user } = useAuth();
    const { isLoading } = usePermission();

    useEffect(() => {
        setLoading(true);
        const timeout = setTimeout(() => setLoading(false), 100);
        return () => clearTimeout(timeout);
    }, [location, setLoading]);
    // Listen for permission errors and show toast
    useEffect(() => {
        const handlePermissionError = (event) => {
            const { toast } = require("sonner");
            toast.error(event.detail.message, {
                description: `Access denied to: ${event.detail.from}`,
                duration: 4000,
            });
        };

        window.addEventListener('show-permission-error', handlePermissionError);
        return () => window.removeEventListener('show-permission-error', handlePermissionError);
    }, []);

    // Show toast for location state errors (from redirects)
    useEffect(() => {
        if (location.state?.error) {
            const { toast } = require("sonner");
            toast.error(location.state.error, {
                duration: 4000,
            });
            // Clear the error from state
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);
    if (isLoading) {
        return <Loader />;
    }

    return (
        <Routes>
            {/* Public routes */}
            <Route
                path="/login"
                element={
                    !user ? (
                        <Login />
                    ) : (
                        <Navigate to={location.state?.from?.pathname || "/home"} replace />
                    )
                }
            />

            {/* Default route */}
            <Route
                path="/"
                element={
                    !user ? (
                        <Navigate to="/login" replace />
                    ) : (
                        <Navigate to="/home" replace />
                    )
                }
            />

            {/* Protected routes with specific permissions */}
            <Route
                path="/home"
                element={
                    <ProtectedRoute requiredPermission="home_access">
                        <HomePage />
                    </ProtectedRoute>
                }
            />

            {/* Property Tax Routes */}
            <Route
                path="/propertyTax"
                element={
                    <ProtectedRoute requiredPermission="property_tax_access">
                        <PropertyTaxMain />
                    </ProtectedRoute>
                }
            >
                <Route index element={<PropertyTaxSurveyDashboard />} />
                <Route
                    path="collection"
                    element={
                        <ProtectedRoute requiredPermission="property_tax_collection">
                            <PropertyTaxCollectionDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="billing"
                    element={
                        <ProtectedRoute requiredPermission="property_tax_billing">
                            <PropertyTaxBillingDashboard />
                        </ProtectedRoute>
                    }
                />
            </Route>

            <Route
                path="/propertyTax/propertySearch"
                element={
                    <ProtectedRoute requiredPermission="property_search">
                        <SearchPropertyMain />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/propertyTax/propertySearch/propertyDetails"
                element={
                    <ProtectedRoute requiredPermission="property_details_view">
                        <PropertyDetailsMain />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/propertyTax/wadhghatHistory"
                element={
                    <ProtectedRoute requiredPermission="wadhghat_history">
                        <WadhghatHistoryMain />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/propertyTax/ferfarHistory"
                element={
                    <ProtectedRoute requiredPermission="ferfar_history">
                        <FerfarHistoryMain />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/propertyTax/master"
                element={
                    <ProtectedRoute requiredPermission="master_data_access">
                        <MasterMain />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/ntisAI/AssessmentQC"
                element={
                    <ProtectedRoute requiredPermission="assessment_qc">
                        <AssesmentQCPage />
                    </ProtectedRoute>
                }
            />

            {/* User Management - Only for Admins */}
            <Route
                path="/user-management"
                element={
                    <ProtectedRoute requiredPermission="user_management" requiredLevel="full">
                        <UserManagement />
                    </ProtectedRoute>
                }
            />

            {/* Catch all route - redirect to home for unknown routes */}
            <Route
                path="*"
                element={
                    <ProtectedRoute>
                        <Navigate to="/home" replace />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}

function App() {
    return (
        <ToastProvider>
            <LoaderProvider>
                <AuthProvider>
                    <PermissionProvider> {/* ADD THIS WRAPPER */}
                        <AppRoutes />
                    </PermissionProvider>
                </AuthProvider>
            </LoaderProvider>
        </ToastProvider>
    );
}

export default App;