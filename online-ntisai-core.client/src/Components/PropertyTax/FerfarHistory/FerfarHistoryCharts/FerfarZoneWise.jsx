import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

type FerfarZoneWiseProps = {
    selectedZone: string;
};

function FerfarZoneWise({ selectedZone }: FerfarZoneWiseProps) {

    const allZonesData = [3, 1, 1, 4];
    const zones = ["Kalwa", "Mumbra", "Diva", "Wagle"];

    // Example zone-wise data (replace with real values later)
    const zoneData: Record<string, number[]> = {
        Kalwa: [5, 3, 2, 4],
        Mumbra: [1, 4, 2, 3],
        Diva: [2, 2, 2, 2],
        Wagle: [0, 1, 0, 2],
    };

    // Pick dataset based on dropdown selection
    const chart1Data =
        selectedZone === "All Zones" ? allZonesData : zoneData[selectedZone];


    //const options1 = {
    //    chart: { type: "column" },
    //    title: { text: `Owner Name Changes per Zone - ${selectedZone}` },
    //    xAxis: {
    //        categories:
    //            selectedZone === "All Zones" ? zones : ["Ward 01", "Ward 02", "Ward 03", "Ward 04"],
    //        title: { text: selectedZone },
    //    },
    //    yAxis: {
    //        min: 0,
    //        title: { text: "Owner Name Changes  (in thousands)" },
    //    },
    //    series: [
    //        {
    //            name: "Zones Data",
    //            data: chart1Data,
    //            color: "#3D74B6",
    //        },
    //    ],
    //    credits: { enabled: false },
    //};


    const options1 = {
        chart: { type: "column" },
        title: { text: "Owner Name Changes per Zone " },
        xAxis: {
            categories: ["Kalwa", "Mumbra", "Diva", "Wagle"],
            title: { text: "All Zones" },
        },
        yAxis: {
            min: 0,
            title: { text: "Owner Name Changes (in thousands)" },
        },
        series: [
            {
                name: "Zones Data",
                data: [3, 1, 2, 4],
                color: "#3D74B6",
            },
        ],
        credits: { enabled: false },
    };
    const options2 = {
        chart: { type: "column" },
        title: { text: "Changes per Ward (Selected Zone)" },
        xAxis: {
            categories: ["Kalwa1", "Mumbra1", "Diva1", "Wagle1"],
            title: { text: "Ward (All Zones)" },
        },
        yAxis: {
            min: 0,
            title: { text: "Changes per Ward (in thousands)" },
        },
        series: [
            {
                name: "Wards Data",
                data: [1, 1, 1, 1],
                color: "#3D74B6",
            },
        ],
        credits: { enabled: false },
    };

    return (
        <div className="bg-white rounded-2xl grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Chart 1 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_20px_45px_rgba(28,55,90,.08),0_4px_12px_rgba(28,55,90,.06)] overflow-x-auto">
                <div className="min-w-[500px]">   {/* chart width to force scrolling */}
                    <HighchartsReact highcharts={Highcharts} options={options1} />
                </div>
            </div>

            {/* Chart 2 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_20px_45px_rgba(28,55,90,.08),0_4px_12px_rgba(28,55,90,.06)] overflow-x-auto">
                <div className="min-w-[500px]">
                    <HighchartsReact highcharts={Highcharts} options={options2} />
                </div>
            </div>
        </div>
    );

}

export default FerfarZoneWise;