import React from "react";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance"; // Zone
import EditIcon from '@mui/icons-material/Edit';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import HistoryIcon from '@mui/icons-material/History';

const formatINR = (n) => `? ${n.toLocaleString("en-IN")}`;
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
                    <h2 className="text-lg text-slate-700 font-bold tracking-wide">
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
export default function FerfarCountCards({ totals, overallDelta, overallPct }) {
    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Card 1 - Blue */}
            <StatCard
                title="Records"
                value={8}
                sub="Filtered Properties"
                icon={<HistoryIcon className="w-5 h-5 text-orange-600" />}
                gradient="from-amber-50 via-orange-100 to-yellow-100"
            />

            {/* Card 2 - Indigo/Purple */}
            <StatCard
                title="Name Changed"
                value={4}
                sub="Before &ne; After"
                icon={<EditIcon className="w-5 h-5 text-blue-600" />}
                gradient="from-blue-50 via-sky-100 to-indigo-100"
            />

            {/* Card 3 - Muted Green Gradient */}
            <StatCard
                title="Minor Correction"
                value={4}
                sub="Before = After"
                icon={<VerifiedUserIcon className="w-5 h-5 text-emerald-600" />}
                gradient="from-green-50 via-emerald-50 to-teal-100"
            />

            {/* Card 4 - Muted Rose/Purple Gradient */}
            <StatCard
                title="Zones"
                value={
                    <span
                        className={overallDelta >= 0 ? "text-emerald-700" : "text-rose-700"}
                    >
                        {4}
                    </span>
                }
                sub="In current view"
                icon={<AccountBalanceIcon className="w-5 h-5 text-purple-600" />}
                gradient={
                    overallDelta >= 0
                        ? "from-purple-50 via-violet-100 to-fuchsia-100"
                        : "from-rose-50 via-pink-50 to-rose-100"
                }
            />

        </section>
    )
}