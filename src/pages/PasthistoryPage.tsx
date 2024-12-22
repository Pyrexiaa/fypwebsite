import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { BlueCard } from '../components/Card';
import InfoIcon from '../assets/InfoIcon.svg';
import ExpandIcon from '../assets/ExpandIcon.svg';
import MaleUserIcon from '../assets/MaleUserIcon.svg';
import { Modal } from '../modals/Modal';
import { PastHistoryContent } from '../components/PastHistoryContent';
import { PastScans } from '../interfaces/PastScan';
import { getSingleMotherURL, getAllRelatedScansURL } from '../constants';

export function PasthistoryPage() {
    const firstCardRef = useRef<HTMLDivElement | null>(null);
    const secondCardRef = useRef<HTMLDivElement | null>(null);
    const [combinedHeight, setCombinedHeight] = useState(0);

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

    const [isRetrieveScanSuccessful, setIsRetrieveScanSuccessful] = useState<boolean | null>(null);
    const [patientPastScans, setPatientPastScans] = useState<PastScans[] | null>(null);

    useEffect(() => {
        // Calculate the combined height of both BlueCard elements
        const firstCardHeight = firstCardRef.current?.offsetHeight || 0;
        const secondCardHeight = secondCardRef.current?.offsetHeight || 0;
        // Since blue card has mb-2 in between, 14 pixels have to be added
        setCombinedHeight(firstCardHeight + secondCardHeight + 14);
    }, [isSuccessful]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPatientId(e.target.value);
    };

    const retrieveMotherDetails = async (id: string) => {
        try {
            const response = await axios.get(`${getSingleMotherURL}/${id}`);
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
            console.log('Response error: ', error);
            setIsSuccessful(false);
        }
    };

    const retrieveScansDetails = async (id: string) => {
        try {
            const response = await axios.get(`${getAllRelatedScansURL}/${id}`);
            setPatientPastScans(response.data);
            setIsRetrieveScanSuccessful(true);
        } catch (error) {
            console.log('Response error: ', error);
            setIsRetrieveScanSuccessful(false);
        }
    };

    const handleRetrievePatientId = async () => {
        retrieveMotherDetails(patientId);
        retrieveScansDetails(patientId);
    };

    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    return (
        <div className="flex space-x-4">
            <div className="flex flex-col space-y-4 w-1/4">
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
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded p-2 w-full"
                    />
                    <button
                        onClick={handleRetrievePatientId}
                        className="mt-4 bg-blue-500 text-white rounded p-2 w-full"
                        type="button"
                    >
                        Retrieve Patient ID
                    </button>
                    {isSuccessful === true && (
                        <p className="mt-2 text-black">Patient ID retrieval successful: {patientId}</p>
                    )}
                    {isSuccessful === false && <p className="mt-2 text-red-500">Error: Patient ID not found.</p>}
                </BlueCard>
                {isSuccessful ? (
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

                        <p className="text-center text-lg font-semibold mt-2">Patient Name</p>

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
            {isRetrieveScanSuccessful ? (
                <PastHistoryContent
                    data={patientPastScans}
                    height={combinedHeight}
                />
            ) : (
                <PastHistoryContent
                    data={null}
                    height={combinedHeight}
                />
            )}
        </div>
    );
}
