import React from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";
import { monthlyCollection2022_23 } from "../data/constant";
import Card from "../TopCards/Card";

function YearDropdown() {
    return (
        <select className="border rounded-md px-2 py-1 text-sm">
            <option>2025-26</option>
            <option>2024-25</option>
            <option>2023-24</option>
            <option>2022-23</option>
        </select>
    );
}

function MonthlyCollectionTrend() {
    return (
        <Card
            subtitle="Monthly Collection Trend"
            title="Monthly Collection Trend (2022-23)"
            right={<YearDropdown />}
            className="h-[320px]"
        >
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={monthlyCollection2022_23}
                        margin={{ top: 8, right: 14, left: 6, bottom: 0 }}
                    >
                        <defs>
                            {/* light → transparent like screenshot */}
                            <linearGradient id="mc-blue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#60a5fa" stopOpacity={0.45} />
                                <stop offset="95%" stopColor="#60a5fa" stopOpacity={0.05} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#64748b" }} />
                        <YAxis
                            domain={[40, 65]}
                            ticks={[40, 45, 50, 55, 60, 65]}
                            tick={{ fontSize: 12, fill: "#64748b" }}
                        />
                        <Tooltip />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#3b82f6"
                            strokeWidth={2.5}
                            fill="url(#mc-blue)"
                            dot={{ r: 3 }}
                            activeDot={{ r: 5 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
}

export default MonthlyCollectionTrend;
