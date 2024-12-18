import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import 'chart.js/auto'; // Auto-register chart.js components
import { CentileData, loadCSVData } from './LoadCSV';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

interface LineGraphProps {
    csvPath: string;
    title: string;
    efwValue: number;
    gaWeeks: number;
    centile: string | null;
}

export function LineGraph({ csvPath, title, efwValue, gaWeeks, centile }: LineGraphProps) {
    const [centileData, setCentileData] = useState<CentileData[]>([]);
    const [below10, setBelow10] = useState(true);

    useEffect(() => {
        setBelow10(Number(centile) <= 10);
    }, [centile]); // Only update when centile changes

    useEffect(() => {
        // Load centile data from the given CSV path
        loadCSVData(csvPath)
            .then((data) => {
                // Map data keys to match the interface format
                const mappedData = data.map((row: any) => ({
                    GA: row.GA,
                    '2.5': row['P_2.5'],
                    '5': row['P_5'],
                    '10': row['P_10'],
                    '25': row['P_25'],
                    '50': row['P_50'],
                    '75': row['P_75'],
                    '90': row['P_90'],
                    '95': row['P_95'],
                    '97.5': row['P_97.5'],
                }));

                setCentileData(mappedData);
            })
            .catch(console.error);
    }, [csvPath]);

    if (centileData.length === 0) {
        return <p>Loading {title} data...</p>;
    }

    // Extract the 10th centile values and corresponding GA weeks
    const gaLabels = centileData.map((currentRow) => currentRow.GA); // GA weeks
    const tenthCentile = centileData.map((currentRow) => currentRow['10']);

    // Prepare dataset for the line graph
    const data = {
        labels: gaLabels,
        datasets: [
            {
                label: '10th Centile',
                data: tenthCentile,
                borderColor: 'rgba(0, 123, 255, 0.4)',
                backgroundColor: 'rgba(0, 123, 255, 0.4)',
                fill: true,
                borderWidth: 2,
            },
            {
                label: `EFW: ${efwValue}g at ${gaWeeks} weeks`,
                data: gaLabels.map((label) => (Math.round(label) === Math.round(gaWeeks) ? efwValue : null)),
                backgroundColor: below10 ? 'red' : 'green', // Color based on above/below 10th centile
                borderColor: below10 ? 'red' : 'green',
                pointStyle: 'circle',
                pointRadius: 5,
                pointBackgroundColor: below10 ? 'red' : 'green',
                fill: false,
            },
        ],
    };

    const options = {
        plugins: {
            legend: { display: true },
            tooltip: { enabled: true },
        },
        scales: {
            x: {
                title: { display: true, text: 'Gestational Age (Weeks)' },
            },
            y: {
                title: { display: true, text: 'EFW (Grams)' },
            },
        },
        elements: {
            line: {
                tension: 0.8, // Smooth the lines
            },
        },
        layout: {
            padding: 10,
        },
    };

    return (
        <div className="w-full mt-4">
            <h2 className="text-lg font-semibold text-center">{title}</h2>
            <Line
                data={data}
                options={options}
            />
            {efwValue !== 0 && (
                <p
                    className={`mt-4 p-4 rounded-lg ${
                        below10 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                    }`}
                >
                    {below10
                        ? 'This baby is Small for Gestational Age (SGA) as the EFW is below the 10th centile for this gestational age.'
                        : 'This baby is Appropriate for Gestational Age (AGA) as the EFW is above the 10th centile for this gestational age.'}
                </p>
            )}
        </div>
    );
}
