import React from "react";
import MasterDashboardHeader from "../../../../../MasterDashboard/MasterDashboardHeader";
//import MasterSidebar from "./MasterSidebar";
import MasterSidebar from "../../../../../MasterLayout/MasterSideBar";
import { SidebarNTISAI } from "./SidebarNTISAI";
import MasterDashBoardFooter from "./MasterDashBoardFooter";
import PropertyDetailsCombine from "./PropertyDetailsCombine";

export default function AssesmentQCMain() {
    return (
        <>
            <MasterDashboardHeader/>
            <div className="flex overflow-x-hidden w-full">
                <MasterSidebar
                    basePath="/propertySearch"
                    items={SidebarNTISAI("/ntisAI")}
                />
                {/* Middle + Right Section */}
                <main className="pt-16 h-[calc(100vh-64px)] overflow-y-auto  pb-14 md:pb-16 transition-[margin] duration-300"
                    style={{ marginLeft: "var(--sidebar-w, 210px)" }}>
                    <PropertyDetailsCombine/>
                    <MasterDashBoardFooter/>
                </main>
            </div>
        </>
    );
}