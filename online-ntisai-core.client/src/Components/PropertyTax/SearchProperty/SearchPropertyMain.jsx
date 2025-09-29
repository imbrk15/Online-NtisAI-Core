import React from "react";
import MasterdashboardHeader from "../../MasterDashboard/MasterDashboardHeader";
import MasterDashBoardFooter from "../../MasterDashboard/MasterDashBoardFooter";
import PropertySearch from "./PropertySearch";
import MasterSideBar from "../../MasterLayout/MasterSideBar";
import { sidebarMenu } from "../../MasterLayout/SidebarMenu";
function SearchPropertyMain() {
    return (
        <div className="h-screen flex flex-col">
            <MasterdashboardHeader />
            <MasterSideBar
                title="Menu"
                basePath="/propertyTax"
                items={sidebarMenu("/propertyTax")}
                backPath="/"
                backLabel="Back to Home"
            />
            <main className="pt-16 h-[calc(100vh-64px)] overflow-y-auto pb-14 md:pb-16 transition-[margin] duration-300 flex flex-col"
                style={{
                    marginLeft: "var(--sidebar-w, 50px)",
                }}>
                <PropertySearch />
            </main>
            <MasterDashBoardFooter />
        </div>
    );
}

export default SearchPropertyMain;
