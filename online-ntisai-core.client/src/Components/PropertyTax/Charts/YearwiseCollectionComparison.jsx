import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { yearwiseCollection } from "../data/constant";
import Card from "../TopCards/Card";
function YearwiseCollectionComparison() {
  return (
    <Card title="Year-wise Collection Comparison" className="h-[320px]">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={yearwiseCollection}
            margin={{ top: 8, right: 12, left: 4, bottom: 0 }}
            barCategoryGap="24%"
            barGap={6}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="year" tick={{ fontSize: 12, fill: "#64748b" }} />
            <YAxis
              label={{
                value: "Amount (₹ in Cr)",
                angle: -90,
                position: "insideLeft",
                offset: 10,
                style: { fill: "#64748b", fontSize: 12 },
              }}
              domain={[0, 600]}
              ticks={[0, 100, 200, 300, 400, 500, 600]}
              tick={{ fontSize: 12, fill: "#64748b" }}
            />
            <Tooltip />
            <Legend verticalAlign="bottom" height={28} />
            <Bar dataKey="Demand" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            <Bar dataKey="Collection" fill="#f472b6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export default YearwiseCollectionComparison;
