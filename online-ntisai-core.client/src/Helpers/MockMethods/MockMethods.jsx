// src/Helpers/MockMethods/PropertySearchTableData.js

export function PropertySearchTableData() {
    return [
        {
            upic: "1001",
            zone: "Kalwa",
            ward: "Kalwa1",
            propertyNo: "2001",
            oldPropertyNo: "150",
            citySurvey: "CS001",
            plot: "Plot12",
            wingFlat: "A-101",
            desc: "निवासी",
            mobile: "9876543210",
            address: "Main Road, Kalwa",
            occupier: "Rahul",
            renterName: "---",
            society: "Shivaji Society",
        },
        {
            upic: "1002",
            zone: "Mumbra",
            ward: "Mumbra2",
            propertyNo: "2002",
            oldPropertyNo: "151",
            citySurvey: "CS002",
            plot: "Plot22",
            wingFlat: "B-202",
            desc: "अनिवासी",
            mobile: "9123456789",
            address: "Station Road, Mumbra",
            occupier: "Amit",
            renterName: "Rohit",
            society: "Gokul Society",
        },
        {
            upic: "1003",
            zone: "Kalwa",
            ward: "Kalwa2",
            propertyNo: "2003",
            oldPropertyNo: "152",
            citySurvey: "CS003",
            plot: "Plot33",
            wingFlat: "C-303",
            desc: "निवासी",
            mobile: "9988776655",
            address: "Shivaji Chowk, Kalwa",
            occupier: "Sneha",
            renterName: "---",
            society: "Kalpataru Society",
        },
        {
            upic: "1004",
            zone: "Kalwa",
            ward: "Kalwa2",
            propertyNo: "2003",
            oldPropertyNo: "152",
            citySurvey: "CS003",
            plot: "Plot33",
            wingFlat: "C-303",
            desc: "निवासी",
            mobile: "9988776655",
            address: "Shivaji Chowk, Kalwa",
            occupier: "Sneha",
            renterName: "---",
            society: "Kalpataru Society",
        },
    ];
}

// src/Helpers/MockMethods/MockMethods.js
export const getWadhghatMockData = () => {
    const derivedRows = [
        {
            zone: "A",
            before: { current: 150000, pending: 20000, total: 170000 },
            after: { current: 180000, pending: 15000, total: 195000 },
            change: { delta: 25000, pct: 14.7 },
        },
        {
            zone: "B",
            before: { current: 120000, pending: 30000, total: 150000 },
            after: { current: 100000, pending: 25000, total: 125000 },
            change: { delta: -25000, pct: -16.7 },
        },
        {
            zone: "C",
            before: { current: 200000, pending: 40000, total: 240000 },
            after: { current: 220000, pending: 35000, total: 255000 },
            change: { delta: 15000, pct: 6.25 },
        },
    ];

    const totals = {
        before: {
            current: derivedRows.reduce((a, r) => a + r.before.current, 0),
            pending: derivedRows.reduce((a, r) => a + r.before.pending, 0),
            total: derivedRows.reduce((a, r) => a + r.before.total, 0),
        },
        after: {
            current: derivedRows.reduce((a, r) => a + r.after.current, 0),
            pending: derivedRows.reduce((a, r) => a + r.after.pending, 0),
            total: derivedRows.reduce((a, r) => a + r.after.total, 0),
        },
    };

    const overallDelta = totals.after.total - totals.before.total;
    const overallPct = (overallDelta / totals.before.total) * 100;

    return { derivedRows, totals, overallDelta, overallPct };
};

/// Zone dropdown options
export const ZoneOptions = [
    { label: "All Zones", value: "" },
    { label: "Zone 1", value: "1" },
    { label: "Zone 2", value: "2" },
    { label: "Zone 3", value: "3" },
];

// Ward dropdown options
export const WardOptions = [
    { label: "All Wards", value: "" },
    { label: "Ward A", value: "A" },
    { label: "Ward B", value: "B" },
    { label: "Ward C", value: "C" },
];

// Input field defaults
export const WadhghatTextFieldDefaults = {
    propertyNo: "1",
    upicIdPlaceholder: "e.g., TMC-0001-XY"
};