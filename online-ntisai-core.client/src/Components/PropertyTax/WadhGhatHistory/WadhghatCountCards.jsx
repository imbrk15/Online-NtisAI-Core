import React from "react";
import { Building2, IndianRupee, TrendingUp } from "lucide-react";

const formatINR = (n) => `₹ ${n.toLocaleString("en-IN")}`;
const formatPct = (n) => `${n.toFixed(2)}%`;

function StatCard({ title, value, icon, sub, gradient }) {
    return (
        <article
            className={`rounded-2xl p-4 shadow-sm border border-slate-200 bg-gradient-to-br ${gradient}`}
        >
            <header className="flex items-start gap-3">
                <span className="p-2 rounded-xl bg-white/40 backdrop-blur-sm">
                    {icon}
                </span>
                <div className="flex-1">
                    <h2 className="text-sm text-slate-700 font-semibold tracking-wide">
                        {title}
                    </h2>
                    <p className="mt-1 text-xl font-bold tracking-tight text-slate-800">
                        {value}
                    </p>
                    {sub && <p className="text-xs mt-1 text-slate-600">{sub}</p>}
                </div>
            </header>
        </article>
    );
}

export default function WadhghatCountCards({ totals, overallDelta, overallPct }) {
    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Card 1 - Blue */}
            <StatCard
                title="PROPERTIES"
                value={6}
                icon={<Building2 className="w-5 h-5 text-blue-600" />}
                gradient="from-blue-50 via-sky-100 to-blue-200"
            />

            {/* Card 2 - Indigo/Purple */}
            <StatCard
                title="TOTAL BEFORE"
                value={formatINR(totals.before.total)}
                sub="Sum of Current + Pending"
                icon={<IndianRupee className="w-5 h-5 text-indigo-600" />}
                gradient="from-indigo-50 via-purple-50 to-indigo-100"
            />

            {/* Card 3 - Muted Green Gradient */}
            <StatCard
                title="TOTAL AFTER"
                value={formatINR(totals.after.total)}
                icon={<IndianRupee className="w-5 h-5 text-emerald-600" />}
                gradient="from-[#81e4f142] via-emerald-50 to-[#07d8f214]"
            />

            {/* Card 4 - Muted Rose/Purple Gradient */}
            <StatCard
                title="CHANGE (Δ)"
                value={
                    <span
                        className={overallDelta >= 0 ? "text-emerald-700" : "text-rose-700"}
                    >
                        {formatINR(overallDelta)} ({formatPct(overallPct)})
                    </span>
                }
                sub="↑ 3 . ↓ 3 . = 0"
                icon={<TrendingUp className="w-5 h-5 text-rose-600" />}
                gradient={
                    overallDelta >= 0
                        ? "from-[#f8c2c24f] via-purple-50 to-[#ff9b9d30]"
                        : "from-rose-50 via-pink-50 to-rose-100"
                }
            />

        </section>
    );
}
