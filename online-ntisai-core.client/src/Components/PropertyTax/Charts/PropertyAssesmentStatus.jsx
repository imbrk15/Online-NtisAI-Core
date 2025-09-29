import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  Cell,
} from "recharts";
import { propertyAssessment } from "../data/constant";
import { formatInt } from "../data/format";
import Card from "../TopCards/Card";

function SmartLabel(props) {
  const { x, y, width, height, value, viewBox } = props;
  const txt = formatInt(value);

  // Chart right edge (from viewBox)
  const chartRight = viewBox.x + viewBox.width;

  // Approximate label width
  const approxTextW = txt.length * 7; // ~7px per character

  // If label would exceed chartRight, draw inside the bar
  const willOverflow = x + width + approxTextW > chartRight - 8;

  if (willOverflow) {
    return (
      <text
        x={x + width - 6} // shift inside the bar
        y={y + height / 2}
        textAnchor="end"
        dominantBaseline="middle"
        fontSize={12}
        fontWeight={700}
        fill="#fff"
      >
        {txt}
      </text>
    );
  }

  // Normal: render just outside to the right
  return (
    <text
      x={x + width + 6}
      y={y + height / 2}
      textAnchor="start"
      dominantBaseline="middle"
      fontSize={12}
      fontWeight={700}
      fill="#111"
    >
      {txt}
    </text>
  );
}
function PropertyAssesmentStatus() {
  const COLORS = ["#34A853", "#1E88E5", "#F6C000", "#E53935"];

  // X-axis ticks: nice rounded upper bound at 5k steps
  const STEP = 5000;
  const maxVal = Math.max(...propertyAssessment.map((d) => d.value));
  const upper = Math.ceil(maxVal / STEP) * STEP; // e.g., 25000, 30000
  const ticks = Array.from({ length: upper / STEP + 1 }, (_, i) => i * STEP);
  return (
    <Card title="Property Assessment Status" className="h-[360px]">
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={propertyAssessment}
            layout="vertical"
            margin={{ top: 10, right: 34, left: 16, bottom: 28 }} // extra bottom for the axis label
            barSize={22}
          >
            {/* Vertical grid lines only, aligned with ticks */}
            <CartesianGrid strokeDasharray="3 3" horizontal={false} vertical />

            <XAxis
              type="number"
              domain={[0, upper]}
              ticks={ticks}
              tick={{ fontSize: 12, fill: "#64748b" }}
              tickFormatter={(v) => (v === 0 ? "0" : `${v / 1000}k`)}
              label={{
                value: "Count",
                position: "insideBottomRight", // below ticks, right aligned
                dy: 20, // push down to avoid overlap
                style: { fill: "#64748b", fontSize: 12, fontWeight: 600 },
              }}
            />

            <YAxis
              type="category"
              dataKey="name"
              width={130}
              tick={{ fontSize: 13, fill: "#475569" }}
            />

            <Tooltip formatter={(v) => formatInt(v)} />

            <Bar dataKey="value" radius={[0, 12, 12, 0]}>
              {propertyAssessment.map((d, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
              <LabelList dataKey="value" content={<SmartLabel />} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export default PropertyAssesmentStatus;
