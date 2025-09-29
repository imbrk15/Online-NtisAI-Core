import React from "react";
import TabPills from "../PropertyTax/TopCards/TabPills";
function PropertyTaxBillingDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mt-3 md:mt-4">
        <div className="flex-1  mt-3 md:mt-4">
          <TabPills />
        </div>
      </div>

      <div className="card p-6">
        <h2 className="text-lg font-semibold">Bill Distribution</h2>
        <p className="text-slate-600 mt-2">
          Module content TBD. Graphs and Search Property are{" "}
          <strong>not</strong> shown here.
        </p>
      </div>
    </div>
  );
}

export default PropertyTaxBillingDashboard;
