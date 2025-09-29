import "./App.css";
import HomePage from "./Components/HomePage/Homepage";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "./Helpers/Loader/Loader"
import { LoaderProvider, useLoader } from "./Helpers/Loader/LoaderContext"
//import PropertyTaxDashboard from "./Components/PropertyTax/PropertyTaxDashboard";
import PropertyTaxSurveyDashboard from "./Components/PropertyTax/PropertyTaxSurveyDashboard";
import PropertyTaxCollectionDashboard from "./Components/PropertyTax/PropertyTaxCollectionDashboard";
import PropertyTaxBillingDashboard from "./Components/PropertyTax/PropertyTaxBillingDashboard";
import PropertyTaxMain from "./Components/PropertyTax/PropertyTaxMain";
import SearchPropertyMain from "./Components/PropertyTax/SearchProperty/SearchPropertyMain";
import PropertyDetailsMain from "./Components/PropertyTax/SearchProperty/PropertyDetails/PropertyDetailsMain";
import WadhghatHistoryMain from "./Components/PropertyTax/WadhGhatHistory/WadhghatHistoryMain";
//import CVFactorMain from "./Components/PropertyTax/CVFactors/CVFactorsMain";
import FerfarHistoryMain from "./Components/PropertyTax/FerfarHistory/FerfarHistoryMain";
import MasterMain from "./Components/PropertyTax/Master/MasterMain";
import { ToastProvider } from './Contexts/ToastContext';
import AssesmentQCPage from "./Components/PropertyTax/SearchProperty/PropertyDetails/AssesmemntQC/AssesmentQCPage";


function AppRoutes() {
    const location = useLocation();
    const { setLoading } = useLoader(); // 👈 use global loader

    useEffect(() => {
        setLoading(true);
        const timeout = setTimeout(() => setLoading(false), 100);
        return () => clearTimeout(timeout);
    }, [location, setLoading]);
    return (
        <>

            <Routes>
                {/* homepage */}
                <Route path="/" element={<HomePage />} />
                {/* property-tax page default data-analytics selected in sidebar*/}
                <Route path="/propertyTax" element={<PropertyTaxMain />}>

                    <Route index element={<PropertyTaxSurveyDashboard />} />
                    <Route path="collection" element={<PropertyTaxCollectionDashboard />} />
                    <Route path="billing" element={<PropertyTaxBillingDashboard />} />

                </Route>

                <Route path="/propertyTax/propertySearch" element={<SearchPropertyMain />} />

                <Route path="/propertyTax/propertySearch/propertyDetails" element={<PropertyDetailsMain />} />

                <Route path="/propertyTax/wadhghatHistory" element={<WadhghatHistoryMain />} />

                {/*<Route path="/propertyTax/cvFactors" element={<CVFactorMain />} />*/}

                <Route path="/propertyTax/ferfarHistory" element={<FerfarHistoryMain />} />

                <Route path="/propertyTax/master" element={<MasterMain />} />
                {/* New Route for CV Master */}
                {/*<Route path="/propertyTax/cvMaster" element={<CVFactorMain />} />*/}
                <Route path="/ntisAI/AssessmentQC" element={<AssesmentQCPage/>} />
            </Routes>
        </>
    );
}
function App() {
    return (
        <ToastProvider>
            <LoaderProvider>
                <AppRoutes />
            </LoaderProvider>
        </ToastProvider>
    );
}

export default App;
