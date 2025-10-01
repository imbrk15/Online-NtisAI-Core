import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { LoaderProvider, useLoader } from "./Helpers/Loader/LoaderContext";
import Loader from "./Helpers/Loader/Loader";
import { ToastProvider } from './Contexts/ToastContext';
import { AuthProvider } from "./Contexts/AuthContext";

import HomePage from "./Components/HomePage/Homepage";
import LoginWrapper from "./Components/Auth/LoginWrapper";
import RequireAuth from "./Components/Auth/RequireAuth";
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

function AppRoutes() {
    const location = useLocation();
    const { setLoading } = useLoader();

    useEffect(() => {
        setLoading(true);
        const timeout = setTimeout(() => setLoading(false), 100);
        return () => clearTimeout(timeout);
    }, [location, setLoading]);

    return (
        <Routes>
            {/* Login */}
            <Route path="/" element={<LoginWrapper />} />

            {/* Home */}
            <Route path="/home" element={<RequireAuth requiredPath="home"><HomePage /></RequireAuth>} />

            {/* Property Tax */}
            <Route path="/propertyTax" element={<PropertyTaxMain />}>
                <Route index element={<RequireAuth requiredPath="propertyTaxSurvey"><PropertyTaxSurveyDashboard /></RequireAuth>} />
                <Route path="collection" element={<RequireAuth requiredPath="propertyTaxCollection"><PropertyTaxCollectionDashboard /></RequireAuth>} />
                <Route path="billing" element={<RequireAuth requiredPath="propertyTaxBilling"><PropertyTaxBillingDashboard /></RequireAuth>} />
            </Route>

            <Route path="/propertyTax/propertySearch" element={<RequireAuth requiredPath="propertySearch"><SearchPropertyMain /></RequireAuth>} />
            <Route path="/propertyTax/propertySearch/propertyDetails" element={<RequireAuth requiredPath="propertySearchDetails"><PropertyDetailsMain /></RequireAuth>} />
            <Route path="/propertyTax/wadhghatHistory" element={<RequireAuth requiredPath="wadhghatHistory"><WadhghatHistoryMain /></RequireAuth>} />
            <Route path="/propertyTax/ferfarHistory" element={<RequireAuth requiredPath="ferfarHistory"><FerfarHistoryMain /></RequireAuth>} />
            <Route path="/propertyTax/master" element={<RequireAuth requiredPath="master"><MasterMain /></RequireAuth>} />
            <Route path="/ntisAI/AssessmentQC" element={<RequireAuth requiredPath="assessmentQC"><AssesmentQCPage /></RequireAuth>} />

            {/* User Management */}
            <Route path="/user-management" element={<RequireAuth requiredPath="user-management"><UserManagement /></RequireAuth>} />
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
