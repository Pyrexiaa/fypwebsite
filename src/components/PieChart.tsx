// PieChart.tsx
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
    percentage: string; // Percentage to display on the pie chart
    name: string; // Name to display below the chart
}

export function PieChart({ percentage, name }: PieChartProps) {
    // Data for the pie chart, where we dynamically set one slice to the percentage and the other to 100 - percentage
    const dataBackground = {
        labels: [name, 'Remaining'],
        datasets: [
            {
                data: [100, 0],
                backgroundColor: ['#e0e0e0', 'transparent'],
                borderWidth: 1,
            },
        ],
    };

    // Data for the top chart (with border radius applied)
    const dataForeground = {
        labels: [name, 'Remaining'],
        datasets: [
            {
                data: [Number(percentage), 100 - Number(percentage)],
                backgroundColor: ['#327AB7', '#C9C9C9'],
                borderWidth: 1,
                borderRadius: 50, // Applying border radius for the foreground
            },
        ],
    };

    // Options for the pie chart
    const options = {
        responsive: true,
        plugins: {
            tooltip: {
                enabled: false, // Disable default tooltips
            },
            legend: {
                display: false, // Disable legend
            },
        },
        cutout: '70%',
    };

    return (
        <div className="flex flex-col items-center w-full p-6">
            {/* Pie Chart Container */}
            <div className="relative w-full">
                <Pie
                    data={dataForeground}
                    options={options}
                />

                {/* Percentage Display in the Center */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl font-semibold">
                    {percentage}%
                </div>
            </div>

            {/* Name below the chart */}
            <div className="mt-4 text-sm text-gray-700 text-center">{name}</div>
        </div>
    );
}
