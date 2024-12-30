import React, { useState, ChangeEvent } from 'react';
import { PastScans } from '../interfaces/PastScan';

interface PastHistoryContentTableProps {
    data: PastScans[] | null;
}

// Mapping for column titles
const columnTitleMap: { [key: string]: string } = {
    ac: 'Abdominal Circumference',
    af: 'Amniotic Fluid',
    afi: 'Amniotic Fluid Index',
    bpd: 'Biparietal Diameter',
    cpr: 'Cerebroplacental Ratio',
    efw: 'Estimated Fetal Weight',
    fl: 'Femur Length',
    ga: 'Gestational Age',
    gender: 'Gender',
    hc: 'Head Circumference',
    id: 'ID',
    motherId: 'Mother ID',
    placenta_site: 'Placenta Site',
    psv: 'Peak Systolic Velocity',
    umb_api: 'Umbilical Artery PI',
    ute_api: 'Uterine Artery PI',
    ute_ari: 'Uterine Artery RI',
    createdAt: 'Result Date',
    name: 'Name',
};

const afMapping: { [key: number]: string } = {
    0: 'Oligohydramnios',
    1: 'Normal',
    2: 'Polyhydramnios',
};

const placentaMapping: { [key: number]: string } = {
    0: 'Anterior Placenta',
    1: 'Fundal Placenta',
    2: 'Lateral Placenta',
    3: 'Placenta Previa',
    4: 'Posterior Placenta',
};

// Mapping for value transformations
const valueMapper = (key: string, value: any): string => {
    if (key === 'gender') {
        return value === 0 ? 'Male' : 'Female';
    }
    if (key === 'af') {
        return afMapping[value];
    }
    if (key === 'placenta_site') {
        return placentaMapping[value];
    }
    if (typeof value === 'number') {
        if (key === 'id' || key === 'motherId') {
            // Use lowercase for these keys to match object keys
            return Math.round(value).toString(); // Convert to string
        }
        return value.toFixed(2); // Format numbers to 4 decimal places
    }

    return String(value); // Ensure all other values are returned as strings
};

const preprocessData = (data: PastScans[] | null) => {
    if (!data) return null;

    const transformedData = data.map((item) => {
        const transformedItem: Record<string, string | number> = {};
        Object.entries(item).forEach(([key, value]) => {
            transformedItem[key] = valueMapper(key, value);
        });
        return transformedItem;
    });

    const columnTitles = Object.keys(data[0] || {}).map((key) => columnTitleMap[key] || key);

    return { transformedData, columnTitles };
};

const formatDate = (isoString: string | number) => {
    console.log('ISO String: ', isoString);
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });
};

export function PastHistoryContentTable({ data }: PastHistoryContentTableProps) {
    // Preprocess the data
    const preprocessed = preprocessData(data);

    if (!preprocessed || preprocessed.transformedData.length === 0) {
        return <div className="flex justify-center items-center h-full w-full text-xl">No data available</div>;
    }

    const { transformedData, columnTitles } = preprocessed;

    console.log(transformedData);

    return (
        <table className="w-full min-w-max table-auto">
            <thead>
                <tr>
                    {columnTitles
                        .filter((key) => key !== 'sga' && key !== 'Mother ID' && key !== 'Result Date')
                        .map((title, index) => (
                            <th
                                key={title}
                                className="text-left px-4 py-2 capitalize"
                            >
                                {title}
                            </th>
                        ))}
                    <th className="text-left px-4 py-2">Status</th>
                    <th className="text-left px-4 py-2">Result Date</th>
                </tr>
            </thead>
            <tbody>
                {transformedData.map((item, rowIndex) => (
                    <tr
                        key={item.id}
                        className="border-b"
                    >
                        {Object.entries(item)
                            .filter(([key]) => key !== 'sga' && key !== 'motherId' && key !== 'createdAt') // Skip 'sga'
                            .map(([key, value], colIndex) => (
                                <td
                                    key={`${item.id}-${item.motherId}`}
                                    className="px-4 py-2 align-top"
                                >
                                    {value}
                                </td>
                            ))}
                        <td className="px-4 py-2 align-top">
                            {item.sga === '0' ? (
                                <div className="bg-green-500 rounded-md text-center">AGA</div>
                            ) : (
                                <div className="bg-red-500 rounded-md text-center">SGA</div>
                            )}
                        </td>
                        <td className="px-4 py-2 align-top">{formatDate(item.createdAt)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
