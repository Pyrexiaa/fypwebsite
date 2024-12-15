import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { BlueCard } from '../components/Card';
import { Modal } from '../components/Modal';
import { AIModelContent } from '../components/AIModelContent';
import { CreatePatientModal } from '../components/CreateNewPatient';
import InfoIcon from '../assets/InfoIcon.svg';
import ExpandIcon from '../assets/ExpandIcon.svg';
import MaleUserIcon from '../assets/MaleUserIcon.svg';

export function AimodelPage() {
    const firstCardRef = useRef<HTMLDivElement | null>(null);
    const secondCardRef = useRef<HTMLDivElement | null>(null);
    const [combinedHeight, setCombinedHeight] = useState(0);

    useEffect(() => {
        // Calculate the combined height of both BlueCard elements
        const firstCardHeight = firstCardRef.current?.offsetHeight || 0;
        const secondCardHeight = secondCardRef.current?.offsetHeight || 0;
        // Since blue card has mb-2 in between, 14 pixels have to be added
        setCombinedHeight(firstCardHeight + secondCardHeight + 14);
    }, []);

    const [patientId, setPatientId] = useState('');
    const [isSuccessful, setIsSuccessful] = useState<boolean | null>(null);
    const [patientAge, setPatientAge] = useState('');
    const [patientHeight, setPatientHeight] = useState('');
    const [patientWeight, setPatientWeight] = useState('');
    const [patientSmoking, setPatientSmoking] = useState(false);
    const [patientPregestationalLDM, setPatientPregestationalLDM] = useState(false);
    const [patientGestationalLDM, setPatientGestationalLDM] = useState(false);
    const [patientPregnancyInducedHypertension, setPatientPregnancyInducedHypertension] = useState(false);
    const [patientHighRiskPreeclampsia, setPatientHighRiskPreeclampsia] = useState(false);
    const [patientPreviouslyFailedPregnancy, setPatientPreviouslyFailedPregnancy] = useState(false);

    const handlePatientIDInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPatientId(e.target.value);
    };

    const handleRetrievePatientId = async (inputPatientID: string) => {
        try {
            const response = await axios.get(`http://localhost:3000/scans/mother/${inputPatientID}`);
            console.log('Response: ', response.data);
            setPatientAge(response.data.age);
            setPatientHeight(response.data.height);
            setPatientWeight(response.data.weight);
            setPatientSmoking(response.data.Smoking);
            setPatientPregestationalLDM(response.data.PregestationalLDM);
            setPatientGestationalLDM(response.data.GestationalLDM);
            setPatientPregnancyInducedHypertension(response.data.PregnancyInducedHypertension);
            setPatientHighRiskPreeclampsia(response.data.HighRiskPreeclampsia);
            setPatientPreviouslyFailedPregnancy(response.data.PreviouslyFailedPregnancy);
            setIsSuccessful(true);
        } catch (error) {
            setIsSuccessful(false);
            console.log(error);
        }
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const [gestationalWeek, setGestationalWeek] = useState('');
    const handleGestationalWeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGestationalWeek(e.target.value);
    };

    const [submitStatus, setSubmitStatus] = useState(false);
    const [isSGA, setIsSGA] = useState(true);

    const handleSaveNewPatient = async (patientData: Record<string, any>) => {
        console.log('New Patient Data:', patientData);
        // Save the new patient data (e.g., API call or update state)
        try {
            const newPatient = {
                age: Number(patientData.age),
                height: Number(patientData.height),
                weight: Number(patientData.weight),
                PreviouslyFailedPregnancy: patientData.failedPregnancyCount,
                HighRiskPreeclampsia: patientData.highRiskPreeclampsia,
                PregnancyInducedHypertension: patientData.pregnancyHypertension,
                PregestationalLDM: patientData.pregestationalLDM,
                GestationalLDM: patientData.gestationalLDM,
                Smoking: patientData.doesSmoke,
            };
            console.log(newPatient);
            const response = await axios.post('http://localhost:3000/scans/new-mother', newPatient);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex flex-col">
            <div className="flex flex-row w-full">
                <div className="flex flex-col space-y-4 w-1/4 mr-4">
                    <BlueCard ref={firstCardRef}>
                        <div className="flex items-center mb-4">
                            <h1 className="text-lg font-semibold mr-2">Patient ID (Mother)</h1>
                            <img
                                src={InfoIcon}
                                alt="Info Icon"
                            />
                        </div>
                        <input
                            type="text"
                            placeholder="Input Patient ID"
                            value={patientId}
                            onChange={handlePatientIDInputChange}
                            className="border border-gray-300 rounded p-2 w-full"
                        />
                        <button
                            onClick={() => handleRetrievePatientId(patientId)}
                            className="mt-4 bg-blue-500 text-white rounded p-2 w-full"
                            type="button"
                        >
                            Retrieve Patient ID
                        </button>
                        {isSuccessful === true && (
                            <p className="mt-2 text-black">Patient ID retrieval successful: {patientId}</p>
                        )}
                        {isSuccessful === false && (
                            <div>
                                <p className="mt-2 text-red-500">Error: Patient ID not found.</p>
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="text-red-500 hover:underline"
                                    type="button"
                                >
                                    Create new patient?
                                </button>
                                <CreatePatientModal
                                    isOpen={isModalOpen}
                                    onClose={() => setIsModalOpen(false)}
                                    onSave={handleSaveNewPatient}
                                />
                            </div>
                        )}
                    </BlueCard>
                    {isSuccessful === true ? (
                        <BlueCard ref={secondCardRef}>
                            <div className="flex justify-end">
                                <button
                                    onClick={openModal}
                                    aria-label="Expand details"
                                    className="p-1 focus:outline-none"
                                    type="button"
                                >
                                    <img
                                        src={ExpandIcon}
                                        alt="Expand Icon"
                                        className="w-6 h-6"
                                    />
                                </button>
                            </div>

                            <div className="flex justify-center my-4">
                                <img
                                    src={MaleUserIcon}
                                    alt="Patient"
                                    className="w-24 h-24 rounded-full object-cover"
                                />
                            </div>

                            <div className="text-left mt-2">
                                <p className="text-gray-600">Patient Details</p>
                            </div>

                            <hr className="my-2 border-gray-300" />

                            <div className="flex flex-col text-left">
                                <p className="flex text-gray-700 justify-between">
                                    Age: <span className="font-semibold">{patientAge}</span>
                                </p>
                                <p className="flex text-gray-700 justify-between">
                                    Height (m): <span className="font-semibold">{patientHeight}</span>
                                </p>
                                <p className="flex text-gray-700 justify-between">
                                    Weight (kg): <span className="font-semibold">{patientWeight}</span>
                                </p>
                            </div>

                            <Modal
                                isOpen={isModalOpen}
                                onClose={closeModal}
                            >
                                <h2 className="text-xl font-semibold mb-4">Detailed Patient Information</h2>
                                <p>
                                    <strong>Age: </strong>
                                    {patientAge}
                                </p>
                                <p>
                                    <strong>Height (m): </strong>
                                    {patientHeight}
                                </p>
                                <p>
                                    <strong>Weight (kg): </strong>
                                    {patientWeight}
                                </p>
                                <p>
                                    <strong>Smoking: </strong>
                                    {patientSmoking ? 'Yes' : 'No'}
                                </p>
                                <p>
                                    <strong>Pregestational LDM: </strong>
                                    {patientPregestationalLDM ? 'Yes' : 'No'}
                                </p>
                                <p>
                                    <strong>Gestational LDM: </strong>
                                    {patientGestationalLDM ? 'Yes' : 'No'}
                                </p>
                                <p>
                                    <strong>Pregnancy Induced Hypertension: </strong>
                                    {patientPregnancyInducedHypertension ? 'Yes' : 'No'}
                                </p>
                                <p>
                                    <strong>High Risk Preeclampsia: </strong>
                                    {patientHighRiskPreeclampsia ? 'Yes' : 'No'}
                                </p>
                                <p>
                                    <strong>Previously Failed Pregnancy: </strong>
                                    {patientPreviouslyFailedPregnancy ? 'Yes' : 'No'}
                                </p>
                            </Modal>
                        </BlueCard>
                    ) : (
                        <BlueCard ref={secondCardRef}>
                            <div className="flex justify-center my-4">
                                <img
                                    src={MaleUserIcon}
                                    alt="Patient"
                                    className="w-24 h-24 rounded-full object-cover"
                                />
                            </div>

                            <div className="text-left mt-2">
                                <p className="text-gray-600">Patient Details</p>
                            </div>

                            <hr className="my-2 border-gray-300" />

                            <div className="flex flex-col text-left">
                                <p className="flex text-gray-700 justify-between">
                                    Age: <span className="font-semibold">Unknown</span>
                                </p>
                                <p className="flex text-gray-700 justify-between">
                                    Height (m): <span className="font-semibold">Unknown</span>
                                </p>
                                <p className="flex text-gray-700 justify-between">
                                    Weight (kg): <span className="font-semibold">Unknown</span>
                                </p>
                            </div>
                        </BlueCard>
                    )}
                </div>
                <AIModelContent
                    setSubmitStatus={setSubmitStatus}
                    setIsSGA={setIsSGA}
                    height={combinedHeight}
                />
            </div>
            {submitStatus && (
                <div className="flex flex-col w-full mt-4 shadow-lg">
                    {isSGA ? (
                        <div className="flex items-center bg-red-500 px-4 rounded-t-lg">
                            <h1 className="text-white text-lg font-md m-2">
                                It is predicted to be a Small-for-Gestational Age (SGA) baby.
                            </h1>
                        </div>
                    ) : (
                        <div className="flex items-center bg-green-500 px-4 rounded-t-lg">
                            <h1 className="text-white text-lg font-md m-2">
                                It is predicted to be a Appropriate-for-Gestational Age (AGA) baby.
                            </h1>
                        </div>
                    )}

                    {/* <div className="flex flex-col items-left bg-white px-4 rounded-t-lg my-4">
                        <p className="my-2 text-black">Please Select a UA Doppler Result.</p>
                        <input
                            type="text"
                            placeholder="27"
                            value={gestationalWeek}
                            onChange={handleGestationalWeek}
                            className="border border-gray-300 rounded p-2 w-1/3"
                        />
                    </div> */}
                    <div className="flex flex-col items-left bg-white px-4 rounded-t-lg mb-4">
                        <p className="my-2 text-black">Guidelines from ROCG</p>
                        <p className="underline">Guideline 1 mentioning...</p>
                    </div>
                </div>
            )}
        </div>
    );
}
