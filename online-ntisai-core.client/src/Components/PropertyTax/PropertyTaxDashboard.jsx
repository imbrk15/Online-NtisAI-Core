import React from "react";
import TabPills from "./TopCards/TabPills";
function PropertyTaxDashboard() {
  return (
    <div className="space-y-6">
      {/* Tabs only (no Search Property on Master) */}
      <div className="flex items-center justify-between mt-3 md:mt-4">
        <div className="flex-1  mt-3 md:mt-4">
          <TabPills />
        </div>
      </div>

      {/* Optional placeholder content */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold">Master Dashboard</h2>
        <p className="text-slate-600 mt-2">
          Use the tiles above to open modules. Graphs and the Search Property
          button are available on the <strong>Survey Dashboard</strong> only.
        </p>
      </div>
    </div>
  );
}

export default PropertyTaxDashboard;
