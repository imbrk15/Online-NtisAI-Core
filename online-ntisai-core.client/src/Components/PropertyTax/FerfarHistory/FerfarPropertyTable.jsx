import React, { useEffect, useMemo } from "react";

const PROPERTIES = [
    { zone: "Kalwa", ward: "Kalwa1", propertyNo: "1001", upic: "UPIC-A-0001", before: "Ramesh Kumar", after: "Suresh Kumar" },
    { zone: "Mumbra", ward: "Mumbra1", propertyNo: "1002", upic: "UPIC-A-0002", before: "Anita Sharma", after: "Anita Sharma" },
    { zone: "Kalwa", ward: "Kalwa2", propertyNo: "2001", upic: "UPIC-A-2001", before: "Vikas Gupta", after: "Vikas Patel" },
    { zone: "Mumbra", ward: "Mumbra2", propertyNo: "3001", upic: "UPIC-B-3001", before: "Farhan Shaikh", after: "Farhan Shaikh" },
    { zone: "Mumbra", ward: "Mumbra1", propertyNo: "4001", upic: "UPIC-B-4001", before: "Meena Joshi", after: "Meena Kulkarni" },
    { zone: "Kalwa", ward: "Kalwa1", propertyNo: "5001", upic: "UPIC-C-5001", before: "Pooja Verma", after: "Pooja Verma" },
    { zone: "Kalwa", ward: "Kalwa2", propertyNo: "5002", upic: "UPIC-C-5002", before: "Rahul Jain", after: "Rahul Mehta" },
    { zone: "Kalwa", ward: "Kalwa1", propertyNo: "6001", upic: "UPIC-D-6001", before: "Kiran Desai", after: "Kiran Desai" },
];

const norm = (v) => (v == null ? "" : String(v).trim().toLowerCase());

const toTableRow = (p) => ({
    upic: p.upic,
    zone: p.zone,
    ward: p.ward,
    propertyNo: p.propertyNo,
    before: p.before,
    after: p.after,
    plotNo: p.plot,
    wingFlatNo: p.wingFlat,
    propertyDescription: p.desc,
    mobile: p.mobile,
    address: p.address,
    occupierName: p.occupier,
    renterName: p.renterName,
    societyName: p.society,
});

function FerfarPropertyTable({ filters = {}, data, onRowsChange }) {
    const dataset = Array.isArray(data) ? data : PROPERTIES;
    const rows = useMemo(() => {
        const f = filters;
        const query = {
            upic: norm(f.upic),
            zone: norm(f.zone),
            ward: norm(f.ward),
            propNo: norm(f.propertyNo),
            before: norm(f.before),
            after: norm(f.after),
            plot: norm(f.plotNo),
            wingFlat: norm(f.wingFlat),
            desc: norm(f.description),
            propertyType: norm(f.propertyType),
            typeFilter: norm(f.typeFilter),
            mobile: norm(f.mobile),
            address: norm(f.address),
            occupier: norm(f.occupierName),
            renterName: norm(f.renterName),
            society: norm(f.societyName),
        };

        const filtered = dataset.filter((p) => {
            const c0 = !query.upic || norm(p.upic).includes(query.upic);
            const c1 = !query.zone || norm(p.zone).includes(query.zone);
            const c2 = !query.ward || norm(p.ward).includes(query.ward);
            const c3 = !query.propNo || norm(p.propertyNo).includes(query.propNo);
            const c4 =
                !query.oldPropNo || norm(p.oldPropertyNo).includes(query.oldPropNo);
            const c5 =
                !query.citySurvey || norm(p.citySurvey).includes(query.citySurvey);
            const c6 = !query.plot || norm(p.plot).includes(query.plot);
            const c7 = !query.wingFlat || norm(p.wingFlat).includes(query.wingFlat);

            // description cell matches description/type/typeFilter
            const descCell = norm(p.desc);
            const c8 =
                (!query.desc || descCell.includes(query.desc)) &&
                (!query.propertyType || descCell.includes(query.propertyType)) &&
                (!query.typeFilter || descCell.includes(query.typeFilter));

            const c9 = !query.mobile || norm(p.mobile).includes(query.mobile);
            const c10 = !query.address || norm(p.address).includes(query.address);
            const c11 = !query.occupier || norm(p.occupier).includes(query.occupier);
            const c12 =
                !query.renterName || norm(p.renterName).includes(query.renterName);
            const c13 = !query.society || norm(p.society).includes(query.society);

            return (
                c0 &&
                c1 &&
                c2 &&
                c3 &&
                c4 &&
                c5 &&
                c6 &&
                c7 &&
                c8 &&
                c9 &&
                c10 &&
                c11 &&
                c12 &&
                c13
            );
        });

        return filtered.map(toTableRow);
    }, [filters, dataset]);

    // notify parent for export buttons
    useEffect(() => {
        onRowsChange?.(rows);
    }, [rows, onRowsChange]);

    return (
        <div className="relative mt-2 rounded-2xl border border-[#e6eef5] bg-white shadow-[0_20px_45px_rgba(28,55,90,.08),0_4px_12px_rgba(28,55,90,.06)]">
            <div className="overflow-x-auto rounded-2xl ">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-cyan-200 text-black font-bold rounded-xl h-14">
                            <th className="px-3 py-2 text-left">Zone</th>
                            <th className="px-3 py-2 text-left">Ward No</th>
                            <th className="px-3 py-2 text-left">Property No</th>
                            <th className="px-3 py-2 text-left">UPIC ID</th>
                            <th className="px-3 py-2 text-left">Before Owner Name</th>
                            <th className="px-3 py-2 text-left">After Owner Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, i) => (
                            <tr key={i} className="border-b last:border-0 hover:bg-gray-50">
                                <td className="px-3 py-2">
                                    {row.zone}
                                </td>
                                <td className="px-3 py-2">{row.ward}</td>
                                <td className="px-3 py-2">{row.propertyNo}</td>
                                <td className="px-3 py-2">{row.upic}</td>
                                <td className="px-3 py-2 font-medium text-gray-700">{row.before}</td>
                                <td className="px-3 py-2 font-medium text-gray-700">{row.after}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default FerfarPropertyTable;