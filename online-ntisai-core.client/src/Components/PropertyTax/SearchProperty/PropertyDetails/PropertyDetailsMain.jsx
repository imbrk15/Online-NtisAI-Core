import React from "react";
import ProprtyDetailsCombine from "./PropertyDetailsCombine";
import { useState } from "react";
import MasterDashboardHeader from "../../../MasterDashboard/MasterDashboardHeader";
import MasterSidebar from "../../../MasterLayout/MasterSideBar";
import { FaRobot } from "react-icons/fa";
import MasterDashBoardFooter from "../../../MasterDashboard/MasterDashBoardFooter";
import { SidebarNTISAI } from "../../../MasterLayout/SidebarNTISAI";
function PropertyDetailsMain() {
    const [isFixed, setIsFixed] = useState(true);
    return (
        <>
            <MasterDashboardHeader />
            <div className="flex overflow-x-hidden w-full">
                <MasterSidebar
                    basePath="/propertySearch"
                    header="NTISAI"
                    headerIcon={FaRobot}
                    items={SidebarNTISAI("/ntisAI")}
                    backPath="/propertyTax/propertySearch"
                    backLabel="Back to Property Search"
                />
                {/* Middle + Right Section */}
                <main className="pt-16 h-[calc(100vh-64px)] overflow-y-auto  pb-14 md:pb-16 transition-[margin] duration-300"
                    style={{ marginLeft: "var(--sidebar-w, 210px)" }}>
                    {<ProprtyDetailsCombine />}
                    <MasterDashBoardFooter />
                </main>
            </div>
        </>
    );
}

export default PropertyDetailsMain;
