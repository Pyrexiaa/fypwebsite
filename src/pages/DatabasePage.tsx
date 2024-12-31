import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAllMothersURL } from '../constants';

interface MotherDTO {
    id: number;
    name: string;
    age: number;
    height: number;
    weight: number;
    hospital: string;
    PreviouslyFailedPregnancy: boolean;
    HighRiskPreeclampsia: boolean;
    PregnancyInducedHypertension: boolean;
    PregestationalLDM: boolean;
    GestationalLDM: boolean;
    Smoking: boolean;
}

const formatValue = (value: any) => {
    if (typeof value === 'boolean') {
        return value ? 'Yes' : 'No';
    }
    return value;
};

export function DatabasePage() {
    const [mothers, setMothers] = useState<MotherDTO[] | null>([]);

    const retrieveAllMothers = async () => {
        try {
            const response = await axios.get(getAllMothersURL);
            const sortedMothers = response.data.sort((a: MotherDTO, b: MotherDTO) => a.id - b.id);
            setMothers(sortedMothers);
        } catch (error) {
            console.log('Error in database retrieval: ', error);
        }
    };

    const columnTitles: { key: keyof MotherDTO; title: string }[] = [
        { key: 'id', title: 'ID' },
        { key: 'name', title: 'Name' },
        { key: 'age', title: 'Age' },
        { key: 'height', title: 'Height (m)' },
        { key: 'weight', title: 'Weight (kg)' },
        { key: 'hospital', title: 'Hospital' },
        { key: 'Smoking', title: 'Smoking' },
        { key: 'PreviouslyFailedPregnancy', title: 'Previously Failed Pregnancy' },
        { key: 'HighRiskPreeclampsia', title: 'High Risk Preeclampsia' },
        { key: 'PregnancyInducedHypertension', title: 'Pregnancy-Induced Hypertension' },
        { key: 'PregestationalLDM', title: 'Pregestational LDM' },
        { key: 'GestationalLDM', title: 'Gestational LDM' },
    ];

    useEffect(() => {
        retrieveAllMothers();
    }, []);

    return (
        <div>
            <div className="flex space-x-4">
                <div className="w-full overflow-x-auto">
                    {mothers && mothers.length > 0 ? (
                        <table className="w-full min-w-max table-auto border-collapse border border-gray-300">
                            <thead>
                                <tr>
                                    {columnTitles.map((col) => (
                                        <th
                                            key={col.key}
                                            className="text-left px-4 py-2 capitalize border border-gray-300 bg-gray-100"
                                        >
                                            {col.title}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {mothers.map((mother) => (
                                    <tr
                                        key={mother.id}
                                        className="border-b border-gray-300"
                                    >
                                        {columnTitles.map((col) => (
                                            <td
                                                key={`${mother.id}-${col.key}`}
                                                className="px-4 py-2 border border-gray-300"
                                            >
                                                {formatValue(mother[col.key])}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No mother records available</p>
                    )}
                </div>
            </div>
        </div>
    );
}
