
import React, { useMemo, useEffect } from "react";

const PROPERTIES = [
    {
        zone: "Kalwa",
        ward: "Kalwa1",
        propertyNo: "1001",
        upic: "UPIC-A-0001",
        before: { current: 3000, pending: 400 },
        after: { current: 3400, pending: 350 },
    },
    {
        zone: "Mumbra",
        ward: "Mumbra1",
        propertyNo: "1002",
        upic: "UPIC-A-0002",
        before: { current: 2550, pending: 450 },
        after: { current: 2500, pending: 350 },
    },
    {
        zone: "Diva",
        ward: "Diva1",
        propertyNo: "2001",
        upic: "UPIC-A-2001",
        before: { current: 2200, pending: 100 },
        after: { current: 2300, pending: 150 },
    },
];

function computeWithTotals(properties) {
    const rows = properties.map((p) => {
        const beforeTotal = p.before.current + p.before.pending;
        const afterTotal = p.after.current + p.after.pending;
        const delta = afterTotal - beforeTotal;
        const pct = beforeTotal > 0 ? (delta / beforeTotal) * 100 : 0;

        return {
            ...p,
            beforeTotal,
            afterTotal,
            delta,
            pct,
        };
    });

    const totals = rows.reduce(
        (acc, r) => {
            acc.before.current += r.before.current;
            acc.before.pending += r.before.pending;
            acc.before.total += r.beforeTotal;

            acc.after.current += r.after.current;
            acc.after.pending += r.after.pending;
            acc.after.total += r.afterTotal;

            acc.delta += r.delta;
            return acc;
        },
        {
            before: { current: 0, pending: 0, total: 0 },
            after: { current: 0, pending: 0, total: 0 },
            delta: 0,
        }
    );

    totals.pct =
        totals.before.total > 0 ? (totals.delta / totals.before.total) * 100 : 0;

    return { rows, totals };
}

export default function WadhghatPropertyTable({ filterForm, onDataChange }) {
    const { zone, ward, propertyNo, upicId } = filterForm || {};

    const filteredProperties = useMemo(() => {
        return PROPERTIES.filter((p) => {
            const zoneMatch = zone ? p.zone.toLowerCase() === zone.toLowerCase() : true;
            const propertyNoMatch = propertyNo ? p.propertyNo.toLowerCase() === propertyNo.toLowerCase() : true;
            const upicIdMatch = upicId ? p.upic.toLowerCase() === upicId.toLowerCase() : true;

            return zoneMatch && propertyNoMatch && upicIdMatch;
        });
    }, [zone, ward, propertyNo, upicId]);

    useEffect(() => {
        onDataChange?.(filteredProperties);
    }, [filteredProperties, onDataChange]);

    const { rows, totals } = useMemo(() => computeWithTotals(filteredProperties), [filteredProperties]);

    return (
        <section className="p-0 py-2">
            <div className="rounded-xl shadow-lg border overflow-x-auto">
                <table className="min-w-[800px] w-full text-sm border-collapse">
                    <thead>
                        <tr className="bg-gradient-to-br from-blue-50 via-sky-100 to-blue-200 text-xs font-semibold uppercase">
                            <th rowSpan={2} className="border px-2 py-2 bg-gradient-to-br from-blue-50 via-sky-100 to-blue-200">Zone</th>
                            <th colSpan={3} className="border px-2 py-2 bg-purple-50">Before Change</th>
                            <th colSpan={3} className="border px-2 py-2 bg-green-50">After Change</th>
                            <th colSpan={2} className="border px-2 py-2 bg-pink-50">Change in Total</th>
                        </tr>
                        <tr className="bg-gray-50 text-xs">
                            <th className="border px-2 py-1 bg-purple-50">Current</th>
                            <th className="border px-2 py-1 bg-purple-50">Pending</th>
                            <th className="border px-2 py-1 bg-purple-50">Total</th>
                            <th className="border px-2 py-1 bg-green-50">Current</th>
                            <th className="border px-2 py-1 bg-green-50">Pending</th>
                            <th className="border px-2 py-1 bg-green-50">Total</th>
                            <th className="border px-2 py-1 bg-pink-50">Δ (₹)</th>
                            <th className="border px-2 py-1 bg-pink-50">Δ (%)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((r, idx) => (
                            <tr key={idx} className="text-center bg-gray-50 hover:bg-aliceblue-50">
                                <td className="border px-2 py-1 font-bold">{r.zone}</td>
                                <td className="border px-2 py-1">₹ {r.before.current.toLocaleString()}</td>
                                <td className="border px-2 py-1">₹ {r.before.pending.toLocaleString()}</td>
                                <td className="border px-2 py-1 font-semibold">₹ {r.beforeTotal.toLocaleString()}</td>
                                <td className="border px-2 py-1">₹ {r.after.current.toLocaleString()}</td>
                                <td className="border px-2 py-1">₹ {r.after.pending.toLocaleString()}</td>
                                <td className="border px-2 py-1 font-semibold">₹ {r.afterTotal.toLocaleString()}</td>
                                <td
                                    className={`border px-2 py-1 font-semibold ${r.delta >= 0 ? "text-green-600" : "text-red-600"
                                        }`}
                                >
                                    {r.delta >= 0
                                        ? `+ ${r.delta.toLocaleString()}`
                                        : ` ${r.delta.toLocaleString()}`}
                                </td>
                                <td
                                    className={`border px-2 py-1 font-semibold ${r.pct >= 0 ? "text-green-600" : "text-red-600"
                                        }`}
                                >
                                    {r.pct.toFixed(2)}%
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr className="bg-gray-100 font-bold text-center">
                            <td className="border px-2 py-2 text-right">Grand Total:</td>
                            <td className="border px-2 py-2">₹ {totals.before.current.toLocaleString()}</td>
                            <td className="border px-2 py-2">₹ {totals.before.pending.toLocaleString()}</td>
                            <td className="border px-2 py-2">₹ {totals.before.total.toLocaleString()}</td>
                            <td className="border px-2 py-2">₹ {totals.after.current.toLocaleString()}</td>
                            <td className="border px-2 py-2">₹ {totals.after.pending.toLocaleString()}</td>
                            <td className="border px-2 py-2">₹ {totals.after.total.toLocaleString()}</td>
                            <td
                                className={`border px-2 py-2 ${totals.delta >= 0 ? "text-green-600" : "text-red-600"
                                    }`}
                            >
                                {totals.delta >= 0
                                    ? `+ ${totals.delta.toLocaleString()}`
                                    : `₹ ${totals.delta.toLocaleString()}`}
                            </td>
                            <td
                                className={`border px-2 py-2 ${totals.pct >= 0 ? "text-green-600" : "text-red-600"
                                    }`}
                            >
                                {totals.pct.toFixed(2)}%
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </section>
    );
}
