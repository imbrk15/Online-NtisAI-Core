import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { propertyDistribution } from "../data/constant";
import { formatInt } from "../data/format";
import Card from "../TopCards/Card";

const TOTAL = 25000;

const COLOR_BY_NAME = {
  Assessed: "#0EA5A3",
  Unassessed: "#D97706",
  Underassessed: "#EF4444",
  Exempted: "#8B5CF6",
  Others: "#64748B",
};
const DEFAULTS = ["#0EA5A3", "#D97706", "#EF4444", "#8B5CF6", "#64748B"];

// Small, per-slice micro-tweaks so labels are close but don’t touch the line
const LABEL_TWEAK = {
  Assessed: { rAdd: 16, dy: -1 },
  Unassessed: { rAdd: 18, dy: -2 },
  Underassessed: { rAdd: 18, dy: 3 },
};
const BASE = { rAdd: 16, dy: 0 };

const renderOutsideLabel = ({
  cx,
  cy,
  midAngle,
  outerRadius,
  percent,
  name,
  fill,
}) => {
  const RAD = Math.PI / 180;
  const t = LABEL_TWEAK[name] || BASE;
  const r = outerRadius + t.rAdd;

  const x = cx + r * Math.cos(-midAngle * RAD);
  const y = cy + r * Math.sin(-midAngle * RAD) + t.dy;

  const anchor = x > cx ? "start" : "end";
  // tiny horizontal padding so text never sits on the leader line
  const pad = anchor === "start" ? 6 : -6;
  const tx = x + pad;

  return (
    <text
      x={tx}
      y={y}
      textAnchor={anchor}
      dominantBaseline="central"
      fontSize={12}
      fontWeight={600}
      fill={fill}
    >
      {`${name}: ${(percent * 100).toFixed(1)} %`}
    </text>
  );
};
function PropertyDistribution() {
  return (
    <Card title="Property Distribution" className="h-[360px] overflow-hidden">
      <div className="relative h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 20, right: 56, bottom: 20, left: 56 }}>
            <Pie
              data={propertyDistribution}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={78}
              startAngle={270}
              endAngle={-90}
              paddingAngle={2} // subtle gap between slices
              minAngle={2}
              label={renderOutsideLabel}
              labelLine={{ length: 14, stroke: "#cbd5e1", strokeWidth: 1 }}
              isAnimationActive={false}
            >
              {propertyDistribution.map((seg, i) => {
                const fill =
                  COLOR_BY_NAME[seg.name] ??
                  seg.color ??
                  DEFAULTS[i % DEFAULTS.length];
                return <Cell key={seg.name ?? i} fill={fill} />;
              })}
            </Pie>

            <Tooltip formatter={(v, n) => [`${v.toFixed(1)} %`, n]} />
          </PieChart>
        </ResponsiveContainer>

        {/* Center total */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center leading-tight">
            <div className="text-sm text-slate-500">Total:</div>
            <div className="text-2xl font-semibold">{formatInt(TOTAL)}</div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default PropertyDistribution;
