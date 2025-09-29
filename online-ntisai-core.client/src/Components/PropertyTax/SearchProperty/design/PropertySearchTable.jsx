import React, { useEffect, useMemo } from "react";
import {
    Alert,
} from "@mui/material";
import { useNavigate } from 'react-router-dom'
import MasterCustomTable from "../../../../Helpers/ExtraProperties/MasterCustomTable";
/* Sample data */
const PROPERTIES = [
    {
        id: 1,
        upic: "1001",
        zone: "Kalwa",
        ward: "Kalwa1",
        propertyNo: "2001",
        oldPropertyNo: "150",
        citySurvey: "CS001",
        plot: "Plot12",
        wingFlat: "A-101",
        desc: "??????",
        mobile: "9876543210",
        address: "Main Road, Kalwa",
        occupier: "Rahul",
        renterName: "---",
        society: "Shivaji Society",
    },
    {
        id: 2,
        upic: "1002",
        zone: "Mumbra",
        ward: "Mumbra2",
        propertyNo: "2002",
        oldPropertyNo: "151",
        citySurvey: "CS002",
        plot: "Plot22",
        wingFlat: "B-202",
        desc: "???????",
        mobile: "9123456789",
        address: "Station Road, Mumbra",
        occupier: "Amit",
        renterName: "Rohit",
        society: "Gokul Society",
    },
    {
        id: 3,
        upic: "1003",
        zone: "Kalwa",
        ward: "Kalwa2",
        propertyNo: "2003",
        oldPropertyNo: "152",
        citySurvey: "CS003",
        plot: "Plot33",
        wingFlat: "C-303",
        desc: "??????",
        mobile: "9988776655",
        address: "Shivaji Chowk, Kalwa",
        occupier: "Sneha",
        renterName: "---",
        society: "Kalpataru Society",
    },
    {
        id: 4,
        upic: "1004",
        zone: "Kalwa",
        ward: "Kalwa2",
        propertyNo: "2003",
        oldPropertyNo: "152",
        citySurvey: "CS003",
        plot: "Plot33",
        wingFlat: "C-303",
        desc: "???????",
        mobile: "9988776655",
        address: "Shivaji Chowk, Kalwa",
        occupier: "Sneha",
        renterName: "---",
        society: "Kalpataru Society",
    },
];

// Define table columns
const COLUMNS = [
    { key: "upicId", header: "UPIC ID", isPrimary: true },
    { key: "zone", header: "Zone" },
    { key: "ward", header: "Ward" },
    { key: "propertyNo", header: "Property No" },
    { key: "oldPropertyNo", header: "Old Property No" },
    { key: "citySurveyNo", header: "City Survey No" },
    { key: "plotNo", header: "Plot No" },
    { key: "wingFlatNo", header: "Wing/Flat No" },
    { key: "propertyDescription", header: "Property Description" },
    { key: "mobile", header: "Mobile" },
    { key: "address", header: "Address" },
    { key: "occupierName", header: "Occupier Name" },
    { key: "renterName", header: "Renter Name" },
    { key: "societyName", header: "Society Name" },
];

const norm = (v) => (v == null ? "" : String(v).trim().toLowerCase());

const toTableRow = (p) => ({
    id: p.id,
    upicId: p.upic,
    zone: p.zone,
    ward: p.ward,
    propertyNo: p.propertyNo,
    oldPropertyNo: p.oldPropertyNo,
    citySurveyNo: p.citySurvey,
    plotNo: p.plot,
    wingFlatNo: p.wingFlat,
    propertyDescription: p.desc,
    mobile: p.mobile,
    address: p.address,
    occupierName: p.occupier,
    renterName: p.renterName,
    societyName: p.society,
});


function PropertySearchTable({ filters = {}, data, onRowsChange }) {
    const dataset = Array.isArray(data) ? data : PROPERTIES;
    const navigate = useNavigate();

    const rows = useMemo(() => {
        const f = filters;
        const query = {
            upic: norm(f.upicId),
            zone: norm(f.zone),
            ward: norm(f.ward),
            propNo: norm(f.propertyNo),
            oldPropNo: norm(f.oldPropertyNo),
            citySurvey: norm(f.citySurvey),
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
            const c4 = !query.oldPropNo || norm(p.oldPropertyNo).includes(query.oldPropNo);
            const c5 = !query.citySurvey || norm(p.citySurvey).includes(query.citySurvey);
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
            const c12 = !query.renterName || norm(p.renterName).includes(query.renterName);
            const c13 = !query.society || norm(p.society).includes(query.society);

            return c0 && c1 && c2 && c3 && c4 && c5 && c6 && c7 && c8 && c9 && c10 && c11 && c12 && c13;
        });

        return filtered.map(toTableRow);
    }, [filters, dataset]);

    // notify parent for export buttons
    useEffect(() => {
        onRowsChange?.(rows);
    }, [rows, onRowsChange]);

    const handleRowClick = (index, row) => {
        navigate(`/propertyTax/propertySearch/propertyDetails`);
    };
    return (
        <>
            <MasterCustomTable
                columns={COLUMNS}
                data={rows}
                onRowClick={handleRowClick}
                pagination={true}
                hoverEffect={true}
                stripedRows={true}
            />

            {rows.length === 0 && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    No records found.
                </Alert>
            )}
        </>
    );
}

export default PropertySearchTable;
