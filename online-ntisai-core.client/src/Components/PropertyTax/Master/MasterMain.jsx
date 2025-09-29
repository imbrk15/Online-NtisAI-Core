// src/pages/MasterMain.jsx
import React, { useState } from "react";
import MasterdashboardHeader from "../../MasterDashboard/MasterDashboardHeader";
import MasterDashBoardFooter from "../../MasterDashboard/MasterDashBoardFooter";
import MasterDashboardHeader from "../../MasterDashboard/MasterDashboardHeader";
import MasterSidebar from "../../MasterLayout/MasterSideBar";
import { sidebarMenu } from "../../MasterLayout/SidebarMenu";
import MasterCards from "./MasterCards";

function MasterMain() {

    return (
        <div className="h-screen flex flex-col">
            {/* Header + Sidebar */}
            <MasterDashboardHeader />
            <MasterSidebar
                title="Menu"
                basePath="/propertyTax"
                items={sidebarMenu("/propertyTax")}
                backPath="/"
                backLabel="Back to Home"
            />

            {/* Main Content */}
            <main
                className="pt-16 h-[calc(100vh-64px)] overflow-y-auto pb-14 md:pb-16 transition-[margin] duration-300 flex flex-col"
                style={{
                    marginLeft: "var(--sidebar-w, 50px)",
                }}
            >
                <div className="flex flex-col min-h-screen">
                    <MasterdashboardHeader />
                    <main className="flex-1 p-2">
                        <MasterCards />
                    </main>
                </div>
            </main>
            <MasterDashBoardFooter />
        </div>
    );
}

export default MasterMain;
