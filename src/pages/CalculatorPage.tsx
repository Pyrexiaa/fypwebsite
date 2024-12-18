import React, { useState } from 'react';
import { BlueCard } from '../components/Card';
import InfoIcon from '../assets/InfoIcon.svg';
import { PieChart } from '../components/PieChart';
import '../App.css';
import { LineGraph } from '../components/LineGraph';
import { CentileData, loadCSVData } from '../components/LoadCSV';

// Function to compute centile
const computeCentile = (ga: number, efw: number, centileData: CentileData[]): number => {
    const row = centileData.find((data) => data.GA === Math.round(ga));
    if (!row) return 0;

    // Dynamically get centile keys, filter and sort them numerically
    const refCentile = Object.keys(row)
        .filter((key) => key.startsWith('P_'))
        .sort((a, b) => parseFloat(a.split('_')[1]) - parseFloat(b.split('_')[1]));

    const ranges = refCentile.map((key) => row[key as keyof CentileData]);
    console.log('ranges: ', ranges);

    for (let i = 0; i < ranges.length - 1; i += 1) {
        if (efw >= ranges[i] && efw <= ranges[i + 1]) {
            // Calculate linear interpolation between the two centiles
            const lowerCentile = parseFloat(refCentile[i].split('_')[1]);
            const upperCentile = parseFloat(refCentile[i + 1].split('_')[1]);
            const lowerRange = ranges[i];
            const upperRange = ranges[i + 1];
            console.log('Lower Centile: ', lowerCentile);
            console.log('Upper Centile: ', upperCentile);

            const proportion = (efw - lowerRange) / (upperRange - lowerRange);
            const interpolatedCentile = lowerCentile + proportion * (upperCentile - lowerCentile);

            return Number(`${interpolatedCentile.toFixed(2)}`);
        }
    }
    // If the value is outside the range, return the nearest category
    if (efw < ranges[0]) {
        return 0;
    }
    if (efw > ranges[ranges.length - 1]) {
        return 100;
    }

    return 0;
};

export function CalculatorPage() {
    const [gestationalWeek, setGestationalWeek] = useState('');
    const [gestationalDay, setGestationalDay] = useState('');
    const [EFW, setEFW] = useState('');
    const [isSuccessful, setIsSuccessful] = useState<boolean | null>(null);
    const handleGestationalWeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGestationalWeek(e.target.value);
    };
    const handleGestationalDay = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGestationalDay(e.target.value);
    };
    const handleEFW = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEFW(e.target.value);
    };

    // Compute EFW Centile
    const [WHOcentile, setWHOCentile] = useState<string | null>('0.00');
    const [I21centile, setI21Centile] = useState<string | null>('0.00');
    const [HLcentile, setHLCentile] = useState<string | null>('0.00');

    const handleCalculation = async (ga_weeks: number, ga_days: number, efw: number): Promise<void> => {
        const WHOCentileData = await loadCSVData('/centiles/WHO_EFW.csv');
        const I21CentileData = await loadCSVData('/centiles/I21_EFW.csv');
        const HLCentileData = await loadCSVData('/centiles/HL_EFW.csv');
        const gaWeeksTotal = ga_weeks + ga_days / 7;
        const gaDaysTotal = ga_weeks * 7 + ga_days;
        const WHOresult = computeCentile(gaWeeksTotal, efw, WHOCentileData);
        const I21result = computeCentile(gaWeeksTotal, efw, I21CentileData);
        const HLresult = computeCentile(gaWeeksTotal, efw, HLCentileData);
        setWHOCentile((Math.round(WHOresult * 100) / 100).toFixed(2));
        setI21Centile((Math.round(I21result * 100) / 100).toFixed(2));
        setHLCentile((Math.round(HLresult * 100) / 100).toFixed(2));
    };

    const clearInputs = () => {
        setGestationalWeek('');
        setGestationalDay('');
        setEFW('');
    };

    return (
        <div className="flex flex-col space-y-4 ">
            <div className="flex flex-row space-x-4">
                <div className="flex flex-col space-y-4 w-1/4">
                    <BlueCard>
                        <div className="flex items-center mb-4">
                            <h1 className="text-lg font-semibold mr-2">User Input</h1>
                            <img
                                src={InfoIcon}
                                alt="Info Icon"
                            />
                        </div>
                        <p className="my-2 text-black">Gestational Age (Weeks)</p>
                        <input
                            type="text"
                            placeholder="27"
                            value={gestationalWeek}
                            onChange={handleGestationalWeek}
                            className="border border-gray-300 rounded p-2 w-full"
                        />
                        <p className="my-2 text-black">Gestational Age (Days)</p>
                        <input
                            type="text"
                            placeholder="6"
                            value={gestationalDay}
                            onChange={handleGestationalDay}
                            className="border border-gray-300 rounded p-2 w-full"
                        />
                        <p className="my-2 text-black">Estimated Fetal Weight (Grams)</p>
                        <input
                            type="text"
                            placeholder="2567"
                            value={EFW}
                            onChange={handleEFW}
                            className="border border-gray-300 rounded p-2 w-full"
                        />
                        <div className="flex flex-row justify-between">
                            <button
                                onClick={clearInputs}
                                className="mt-4 mr-4 bg-gray-200 text-black rounded-2xl p-2 w-full border-2 border-solid border-black login-button"
                                type="button"
                            >
                                Clear All
                            </button>
                            <button
                                onClick={() =>
                                    handleCalculation(Number(gestationalWeek), Number(gestationalDay), Number(EFW))
                                }
                                className="mt-4 bg-blue-500 text-white rounded-2xl p-2 w-full border-2 border-solid border-black login-button"
                                type="button"
                            >
                                Confirm
                            </button>
                        </div>
                        {isSuccessful === true && <p className="mt-2 text-black">Calculation successful!</p>}
                        {isSuccessful === false && <p className="mt-2 text-red-500">Error: Please try again later</p>}
                    </BlueCard>
                </div>
                {/* Places for the pie chart to get the percentage */}
                <div className="flex flex-row w-3/4 items-center">
                    <div className="w-1/3">
                        <PieChart
                            percentage={WHOcentile}
                            name="World Health Organisation Estimated Fetal Weight"
                        />
                    </div>
                    <div className="w-1/3">
                        <PieChart
                            percentage={HLcentile}
                            name="Hadlock Estimated Fetal Weight"
                        />
                    </div>
                    <div className="w-1/3">
                        <PieChart
                            percentage={I21centile}
                            name="Intergrowth-21st Estimated Fetal Weight"
                        />
                    </div>
                </div>
            </div>

            {/* Bottom Section: Line Graphs */}
            <div className="grid grid-cols-3 gap-4">
                <LineGraph
                    csvPath="/centiles/WHO_EFW.csv"
                    title="WHO Estimated Fetal Weight"
                    efwValue={Number(EFW)}
                    gaWeeks={Number(gestationalWeek)}
                    centile={WHOcentile}
                />
                <LineGraph
                    csvPath="/centiles/HL_EFW.csv"
                    title="Hadlock Estimated Fetal Weight"
                    efwValue={Number(EFW)}
                    gaWeeks={Number(gestationalWeek)}
                    centile={HLcentile}
                />
                <LineGraph
                    csvPath="/centiles/I21_EFW.csv"
                    title="Intergrowth-21st Estimated Fetal Weight"
                    efwValue={Number(EFW)}
                    gaWeeks={Number(gestationalWeek)}
                    centile={I21centile}
                />
            </div>
        </div>
    );
}
