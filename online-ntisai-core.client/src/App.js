//import "./App.css";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { LoaderProvider, useLoader } from "./Helpers/Loader/LoaderContext";
import Loader from "./Helpers/Loader/Loader";
import { ToastProvider } from './Contexts/ToastContext';
import { AuthProvider, useAuth } from "./Contexts/AuthContext";
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

function ProtectedRoute({ children }) {
    const { user } = useAuth();
    const location = useLocation();

    if (!user) {
        // Redirect to login but save the current location they were trying to go to
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}
function AppRoutes() {
    const location = useLocation();
    const { setLoading } = useLoader();
    const { user } = useAuth();
   

    useEffect(() => {
        setLoading(true);
        const timeout = setTimeout(() => setLoading(false), 100);
        return () => clearTimeout(timeout);
    }, [location, setLoading]);
   
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

            {/* Protected routes - each route is individually protected */}
            <Route
                path="/home"
                element={
                    <ProtectedRoute>
                        <HomePage />
                    </ProtectedRoute>
                }
            />

            {/* Property Tax Routes */}
            <Route
                path="/propertyTax"
                element={
                    <ProtectedRoute>
                        <PropertyTaxMain />
                    </ProtectedRoute>
                }
            >
                <Route index element={<PropertyTaxSurveyDashboard />} />
                <Route path="collection" element={<PropertyTaxCollectionDashboard />} />
                <Route path="billing" element={<PropertyTaxBillingDashboard />} />
            </Route>

            <Route
                path="/propertyTax/propertySearch"
                element={
                    <ProtectedRoute>
                        <SearchPropertyMain />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/propertyTax/propertySearch/propertyDetails"
                element={
                    <ProtectedRoute>
                        <PropertyDetailsMain />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/propertyTax/wadhghatHistory"
                element={
                    <ProtectedRoute>
                        <WadhghatHistoryMain />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/propertyTax/ferfarHistory"
                element={
                    <ProtectedRoute>
                        <FerfarHistoryMain />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/propertyTax/master"
                element={
                    <ProtectedRoute>
                        <MasterMain />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/ntisAI/AssessmentQC"
                element={
                    <ProtectedRoute>
                        <AssesmentQCPage />
                    </ProtectedRoute>
                }
            />

            {/* User Management */}
            <Route
                path="/user-management"
                element={
                    <ProtectedRoute>
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
                    <AppRoutes />
                </AuthProvider>
            </LoaderProvider>
        </ToastProvider>
    );
}

export default App;
