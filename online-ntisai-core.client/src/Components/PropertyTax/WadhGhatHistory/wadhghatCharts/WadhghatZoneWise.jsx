
import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function WadhghatZoneWise({ derivedRows }) {
    const beforeTotals = derivedRows.map((r) => r.before.total);
    const afterTotals = derivedRows.map((r) => r.after.total);
    const changePct = derivedRows.map((r) => Number(r.change.pct.toFixed(2)));
    const zones = derivedRows.map((r) => r.zone);

    const maxAmount = Math.max(...beforeTotals, ...afterTotals);
    const roundedMaxAmount = 4000;

    const amountTickPositions = [];
    for (let i = 0; i <= roundedMaxAmount; i += 500) {
        amountTickPositions.push(i);
    }

    const roundedMinPct = -6;
    const roundedMaxPct = 12;

    const pctTickPositions = [];
    for (let i = roundedMinPct; i <= roundedMaxPct; i += 2) {
        pctTickPositions.push(i);
    }

    const options = {
        chart: {
            zoomType: "xy",
            backgroundColor: "transparent"
        },
        title: {
            text: "Zone-wise Total",
            align: "left",
            y: 20 // ✅ Shifted down
        },
        subtitle: {
            text: "Bars: Totals • Dotted line: Δ %",
            align: "right",
            verticalAlign: "top",
            y: 20, // ✅ Shifted down
            style: {
                fontSize: "11px",
                color: "gray"
            }
        },
        xAxis: [{
            categories: zones,
            crosshair: true
        }],
        yAxis: [
            {
                title: { text: "Amount (₹)" },
                labels: {
                    formatter() {
                        return `₹ ${this.value}`;
                    }
                },
                min: 0,
                max: roundedMaxAmount,
                tickPositions: amountTickPositions,
                allowDecimals: false,
                gridLineWidth: 1
            },
            {
                title: { text: "Change in Total (Δ%)" },
                labels: {
                    formatter() {
                        return `${this.value}%`;
                    }
                },
                tickPositions: pctTickPositions,
                opposite: true,
                gridLineWidth: 0
            }
        ],
        series: [
            {
                type: "column",
                name: "Before Total",
                data: beforeTotals
            },
            {
                type: "column",
                name: "After Total",
                data: afterTotals
            },
            {
                type: "line",
                name: "Δ %",
                data: changePct,
                yAxis: 1,
                dashStyle: "Dot",
                tooltip: {
                    valueSuffix: "%"
                },
                marker: {
                    enabled: true
                }
            }
        ],
        credits: { enabled: false }
    };

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_20px_45px_rgba(28,55,90,.08),0_4px_12px_rgba(28,55,90,.06)] overflow-x-auto">
            <div className="min-w-[500px]">   {/* chart width to force scrolling */}
                <HighchartsReact highcharts={Highcharts} options={options} />
            </div>
        </div>
    );
}
