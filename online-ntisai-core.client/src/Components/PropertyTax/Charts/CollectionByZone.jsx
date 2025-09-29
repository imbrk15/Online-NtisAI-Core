import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { collectionByZone } from "../data/constant";
import Card from "../TopCards/Card";

const COLORS = ["#60a5fa", "#8b5cf6", "#22d3ee", "#f59e0b", "#64748b"];
function CollectionByZone() {
  return (
    <Card title="Collection by Zone" className="h-[320px]">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={collectionByZone}
              cx="50%"
              cy="50%"
              outerRadius={96}
              dataKey="value"
              labelLine
              label={({ name }) => name}
              startAngle={90}
              endAngle={-270}
            >
              {collectionByZone.map((_, idx) => (
                <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export default CollectionByZone;
