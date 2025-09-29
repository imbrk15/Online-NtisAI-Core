import React from "react";
import MasterDashboardHeader from "../MasterDashboard/MasterDashboardHeader";
import MasterDashBoardFooter from "../MasterDashboard/MasterDashBoardFooter";
import { Outlet } from "react-router-dom";
import { FaIdBadge } from "react-icons/fa";
import MasterSidebar from "../MasterLayout/MasterSideBar";
import { sidebarMenu } from "../MasterLayout/SidebarMenu";
function PropertyTaxMain() {

    return (
        <div className="h-screen flex flex-col">
            <MasterDashboardHeader />
            <MasterSidebar
                basePath="/propertyTax"
                header="Menu"
                headerIcon={FaIdBadge}
                items={sidebarMenu("/propertyTax")}
            />

            {/* Always use the CSS var. Default fallback uses 64px so mobile won't be hidden. */}
            <main
                className="pt-16 h-[calc(100vh-64px)] overflow-y-auto pb-14 md:pb-16 transition-[margin] duration-300 flex flex-col"
                style={{
                    marginLeft: "var(--sidebar-w, 64px)",
                }}
            >
                <Outlet />
            </main>
            <MasterDashBoardFooter />
        </div>
    );
}

export default PropertyTaxMain;
