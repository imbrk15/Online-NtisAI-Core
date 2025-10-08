import React from "react";
import HomeNavbar from "./HomeNavbar";
//import HomeNavbar from "../UserManagement/HomePage/HomeNavbar";
import HomeWelcomeText from "./HomeWelcomeText";
import HomeFooter from "./HomeFooter";
import HomeBanner from "./HomeBanner";
import HomeServices from "./HomeServices";
import  PermissionDebugger  from "../UserManagement/PermissionDebugger";
import { useAuth } from "../../Contexts/AuthContext";
function Homepage() {
    const { user } = useAuth();
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            {/* Banner */}
            <HomeBanner className="h-[20vh]" />

            {/* Navbar */}
            <HomeNavbar className="h-[2vh]" />

            {/* Welcome Text */}
            <HomeWelcomeText className="h-[5vh]" />

            {/* Permission Debugger - Only for admins */}
            {user?.role === 'Admin' && <PermissionDebugger />}

            {/* Main content should flex-grow */}
            <main className="flex-grow h-[36vh] overflow-auto">
                <HomeServices />
            </main>

            {/* Footer stays at bottom */}
            <HomeFooter className="h-[7vh]" />
        </div>
    );
}


export default Homepage;
