import React, { useState } from 'react';
import { BlueCard } from '../components/Card';
import InfoIcon from '../assets/InfoIcon.svg';
import { PieChart } from '../components/PieChart';
import '../App.css';

export function CalculatorPage() {
    const [gestationalWeek, setGestationalWeek] = useState('');
    const [gestationalDay, setGestationalDay] = useState('');
    const [EFW, setEFW] = useState('');
    const [isSuccessful, setIsSuccessful] = useState<boolean | null>(null);
    const handleGestationalWeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGestationalWeek(e.target.value);
    };
    const handleGestationalDay = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGestationalWeek(e.target.value);
    };
    const handleEFW = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGestationalWeek(e.target.value);
    };
    const handleCalculation = () => {
        if (gestationalDay === '12345') {
            setIsSuccessful(true); // Assuming '12345' is a valid ID for testing
        } else {
            setIsSuccessful(false);
        }
    };
    return (
        <div className="flex space-x-4">
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
                            onClick={handleCalculation}
                            className="mt-4 mr-4 bg-gray-200 text-black rounded-2xl p-2 w-full border-2 border-solid border-black login-button"
                            type="button"
                        >
                            Clear All
                        </button>
                        <button
                            onClick={handleCalculation}
                            className="mt-4 bg-blue-500 text-white rounded-2xl p-2 w-full border-2 border-solid border-black login-button"
                            type="button"
                        >
                            Confirm
                        </button>
                        <div className="login-button">
                            <a href="/login">
                                <span>Click to Log In</span>
                                <div className="wave" />
                            </a>
                        </div>
                    </div>
                    {isSuccessful === true && <p className="mt-2 text-black">Calculation successful!</p>}
                    {isSuccessful === false && <p className="mt-2 text-red-500">Error: Please try again later</p>}
                </BlueCard>
            </div>
            {/* Places for the pie chart to get the percentage */}
            <div className="flex flex-row w-3/4 items-center">
                <div className="w-1/4">
                    <PieChart
                        percentage="89.00"
                        name="World Health Organisation Estimated Fetal Weight"
                    />
                </div>
                <div className="w-1/4">
                    <PieChart
                        percentage="89.00"
                        name="Hadlock Estimated Fetal Weight"
                    />
                </div>
                <div className="w-1/4">
                    <PieChart
                        percentage="89.00"
                        name="Intergrowth-21st Estimated Fetal Weight"
                    />
                </div>
                <div className="w-1/4">
                    <PieChart
                        percentage="89.00"
                        name="LMS Estimated Fetal Weight"
                    />
                </div>
            </div>
        </div>
    );
}
