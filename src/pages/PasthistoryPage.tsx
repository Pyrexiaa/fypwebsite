import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { BlueCard } from '../components/Card';
import InfoIcon from '../assets/InfoIcon.svg';
import ExpandIcon from '../assets/ExpandIcon.svg';
import MaleUserIcon from '../assets/MaleUserIcon.svg';
import { Modal } from '../modals/Modal';
import { PastHistoryContent } from '../components/PastHistoryContent';
import { PastScans } from '../interfaces/PastScan';
import { getSingleMotherURL, getAllRelatedScansURL, postNewMotherURL, updateMotherURL } from '../constants';
import { CreatePatientModal } from '../components/CreateNewPatient';

export function PasthistoryPage() {
    const firstCardRef = useRef<HTMLDivElement | null>(null);
    const secondCardRef = useRef<HTMLDivElement | null>(null);
    const [combinedHeight, setCombinedHeight] = useState(0);

    const [patientId, setPatientId] = useState('');
    const [isSuccessful, setIsSuccessful] = useState<boolean | null>(null);

    const [patientName, setPatientName] = useState('');
    const [patientAge, setPatientAge] = useState('');
    const [patientHeight, setPatientHeight] = useState('');
    const [patientWeight, setPatientWeight] = useState('');
    const [patientHospital, setPatientHospital] = useState('');
    const [patientSmoking, setPatientSmoking] = useState(false);
    const [patientPregestationalLDM, setPatientPregestationalLDM] = useState(false);
    const [patientGestationalLDM, setPatientGestationalLDM] = useState(false);
    const [patientPregnancyInducedHypertension, setPatientPregnancyInducedHypertension] = useState(false);
    const [patientHighRiskPreeclampsia, setPatientHighRiskPreeclampsia] = useState(false);
    const [patientPreviouslyFailedPregnancy, setPatientPreviouslyFailedPregnancy] = useState(false);

    const [editedPatientName, setEditedPatientName] = useState('');
    const [editedPatientAge, setEditedPatientAge] = useState('');
    const [editedPatientHeight, setEditedPatientHeight] = useState('');
    const [editedPatientWeight, setEditedPatientWeight] = useState('');
    const [editedPatientHospital, setEditedPatientHospital] = useState('');
    const [editedPatientSmoking, setEditedPatientSmoking] = useState(false);
    const [editedPatientPregestationalLDM, setEditedPatientPregestationalLDM] = useState(false);
    const [editedPatientGestationalLDM, setEditedPatientGestationalLDM] = useState(false);
    const [editedPatientPregnancyInducedHypertension, setEditedPatientPregnancyInducedHypertension] = useState(false);
    const [editedPatientHighRiskPreeclampsia, setEditedPatientHighRiskPreeclampsia] = useState(false);
    const [editedPatientPreviouslyFailedPregnancy, setEditedPatientPreviouslyFailedPregnancy] = useState(false);

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
            setPatientName(response.data.name);
            setPatientAge(response.data.age);
            setPatientHeight(response.data.height);
            setPatientWeight(response.data.weight);
            setPatientHospital(response.data.hospital);
            setPatientSmoking(response.data.Smoking);
            setPatientPregestationalLDM(response.data.PregestationalLDM);
            setPatientGestationalLDM(response.data.GestationalLDM);
            setPatientPregnancyInducedHypertension(response.data.PregnancyInducedHypertension);
            setPatientHighRiskPreeclampsia(response.data.HighRiskPreeclampsia);
            setPatientPreviouslyFailedPregnancy(response.data.PreviouslyFailedPregnancy);
            // Save a copy for editing and comparison later
            setEditedPatientName(response.data.name);
            setEditedPatientAge(response.data.age);
            setEditedPatientHeight(response.data.height);
            setEditedPatientWeight(response.data.weight);
            setEditedPatientHospital(response.data.hospital);
            setEditedPatientSmoking(response.data.Smoking);
            setEditedPatientPregestationalLDM(response.data.PregestationalLDM);
            setEditedPatientGestationalLDM(response.data.GestationalLDM);
            setEditedPatientPregnancyInducedHypertension(response.data.PregnancyInducedHypertension);
            setEditedPatientHighRiskPreeclampsia(response.data.HighRiskPreeclampsia);
            setEditedPatientPreviouslyFailedPregnancy(response.data.PreviouslyFailedPregnancy);
            setIsSuccessful(true);
        } catch (error) {
            setIsSuccessful(false);
        }
    };

    const retrieveScansDetails = async (id: string) => {
        try {
            const response = await axios.get(`${getAllRelatedScansURL}/${id}`);
            setPatientPastScans(response.data);
            setIsRetrieveScanSuccessful(true);
        } catch (error) {
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

    const handleSaveNewPatient = async (patientData: Record<string, any>) => {
        // Save the new patient data (e.g., API call or update state)
        try {
            const newPatient = {
                name: patientData.name,
                age: Number(patientData.age),
                height: Number(patientData.height),
                weight: Number(patientData.weight),
                hospital: patientData.hospital,
                PreviouslyFailedPregnancy: patientData.failedPregnancyCount,
                HighRiskPreeclampsia: patientData.highRiskPreeclampsia,
                PregnancyInducedHypertension: patientData.pregnancyHypertension,
                PregestationalLDM: patientData.pregestationalLDM,
                GestationalLDM: patientData.gestationalLDM,
                Smoking: patientData.doesSmoke,
            };
            const response = await axios.post(postNewMotherURL, newPatient);
        } catch (error) {
            console.log(error);
        }
    };

    const [isCreateNewPatientModalOpen, setCreateNewPatientModalOpen] = useState(false);
    const openCreateNewPatientModal = () => setCreateNewPatientModalOpen(true);
    const closeCreateNewPatientModal = () => setCreateNewPatientModalOpen(false);

    const [isEditableModalOpen, setIsEditableModalOpen] = useState(false);
    const openEditableModal = () => setIsEditableModalOpen(true);
    const closeEditableModal = () => setIsEditableModalOpen(false);

    const updateMotherRecords = async () => {
        try {
            // Initialize an array to hold the update payloads
            const updatedRecords = [];

            if (patientName !== editedPatientName) {
                updatedRecords.push({
                    motherId: patientId,
                    columnName: 'name',
                    newValue: editedPatientName,
                });
            }

            if (Number(patientAge) !== Number(editedPatientAge)) {
                updatedRecords.push({
                    motherId: patientId,
                    columnName: 'age',
                    newValue: editedPatientAge,
                });
            }

            if (Number(patientHeight) !== Number(editedPatientHeight)) {
                updatedRecords.push({
                    motherId: patientId,
                    columnName: 'height',
                    newValue: editedPatientHeight,
                });
            }

            if (Number(patientWeight) !== Number(editedPatientWeight)) {
                updatedRecords.push({
                    motherId: patientId,
                    columnName: 'weight',
                    newValue: editedPatientWeight,
                });
            }

            if (patientHospital !== editedPatientHospital) {
                updatedRecords.push({
                    motherId: patientId,
                    columnName: 'hospital',
                    newValue: editedPatientWeight,
                });
            }

            if (Boolean(patientSmoking) !== Boolean(editedPatientSmoking)) {
                updatedRecords.push({
                    motherId: patientId,
                    columnName: 'Smoking',
                    newValue: editedPatientSmoking,
                });
            }

            if (Boolean(patientPregestationalLDM) !== Boolean(editedPatientPregestationalLDM)) {
                updatedRecords.push({
                    motherId: patientId,
                    columnName: 'PregestationalLDM',
                    newValue: editedPatientPregestationalLDM,
                });
            }

            if (Boolean(patientGestationalLDM) !== Boolean(editedPatientGestationalLDM)) {
                updatedRecords.push({
                    motherId: patientId,
                    columnName: 'GestationalLDM',
                    newValue: editedPatientGestationalLDM,
                });
            }

            if (Boolean(patientPregnancyInducedHypertension) !== Boolean(editedPatientPregnancyInducedHypertension)) {
                updatedRecords.push({
                    motherId: patientId,
                    columnName: 'PregnancyInducedHypertension',
                    newValue: editedPatientPregnancyInducedHypertension,
                });
            }

            if (Boolean(patientHighRiskPreeclampsia) !== Boolean(editedPatientHighRiskPreeclampsia)) {
                updatedRecords.push({
                    motherId: patientId,
                    columnName: 'HighRiskPreeclampsia',
                    newValue: editedPatientHighRiskPreeclampsia,
                });
            }

            if (Boolean(patientPreviouslyFailedPregnancy) !== Boolean(editedPatientPreviouslyFailedPregnancy)) {
                updatedRecords.push({
                    motherId: patientId,
                    columnName: 'PreviouslyFailedPregnancy',
                    newValue: editedPatientPreviouslyFailedPregnancy,
                });
            }

            // If there are any changes, send the update requests in parallel using Promise.all
            if (updatedRecords.length > 0) {
                const responses = await Promise.all(
                    updatedRecords.map((record) => axios.patch(updateMotherURL, record)),
                );
                // Log all responses
                // responses.forEach((response) => console.log(response));
            } else {
                console.log('No changes detected.');
            }
        } catch (error) {
            console.log(error);
        }
    };

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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button
                            onClick={openCreateNewPatientModal}
                            className="mt-4 bg-blue-500 text-white rounded p-2 w-full"
                            type="button"
                        >
                            Create
                        </button>
                        <button
                            onClick={handleRetrievePatientId}
                            className="mt-4 bg-blue-500 text-white rounded p-2 w-full"
                            type="button"
                        >
                            Retrieve
                        </button>
                        <CreatePatientModal
                            isOpen={isCreateNewPatientModalOpen}
                            onClose={closeCreateNewPatientModal}
                            onSave={handleSaveNewPatient}
                        />
                    </div>
                    {isSuccessful === true && (
                        <p className="mt-2 text-black">Patient ID retrieval successful: {patientId}</p>
                    )}
                    {isSuccessful === false && (
                        <div>
                            <p className="mt-2 text-red-500">Error: Patient ID not found.</p>
                            <button
                                onClick={openCreateNewPatientModal}
                                className="text-red-500 hover:underline"
                                type="button"
                            >
                                Create new patient?
                            </button>
                            <CreatePatientModal
                                isOpen={isCreateNewPatientModalOpen}
                                onClose={closeCreateNewPatientModal}
                                onSave={handleSaveNewPatient}
                            />
                        </div>
                    )}
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

                        <p className="text-center text-lg font-semibold mt-2">{patientName}</p>

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
                            <p className="flex text-gray-700 justify-between">
                                Hospital: <span className="font-semibold">{patientHospital}</span>
                            </p>
                        </div>
                        <button
                            className="mt-4 bg-blue-500 text-white rounded p-2 w-full"
                            type="button"
                            onClick={openEditableModal}
                        >
                            Edit Record
                        </button>
                        {/* Modal with editable fields */}
                        {isEditableModalOpen && (
                            <Modal
                                isOpen={isEditableModalOpen}
                                onClose={closeEditableModal}
                            >
                                <h2 className="text-xl font-semibold mb-4">Detailed Patient Information</h2>
                                <div>
                                    <div>
                                        <strong>Name: </strong>
                                        <input
                                            type="text"
                                            value={editedPatientName}
                                            onChange={(e) => setEditedPatientName(e.target.value)}
                                            className="border border-gray-300 rounded p-2 w-full"
                                        />
                                    </div>
                                    <div>
                                        <strong>Age: </strong>
                                        <input
                                            type="number"
                                            value={editedPatientAge}
                                            onChange={(e) => setEditedPatientAge(e.target.value)}
                                            className="border border-gray-300 rounded p-2 w-full"
                                        />
                                    </div>
                                    <div>
                                        <strong>Height (m): </strong>
                                        <input
                                            type="number"
                                            value={editedPatientHeight}
                                            onChange={(e) => setEditedPatientHeight(e.target.value)}
                                            className="border border-gray-300 rounded p-2 w-full"
                                        />
                                    </div>
                                    <div>
                                        <strong>Weight (kg): </strong>
                                        <input
                                            type="number"
                                            value={editedPatientWeight}
                                            onChange={(e) => setEditedPatientWeight(e.target.value)}
                                            className="border border-gray-300 rounded p-2 w-full"
                                        />
                                    </div>
                                    <div>
                                        <strong>Hospital: </strong>
                                        <input
                                            type="text"
                                            value={editedPatientHospital}
                                            onChange={(e) => setEditedPatientHospital(e.target.value)}
                                            className="border border-gray-300 rounded p-2 w-full"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                                        <div className="flex items-center space-x-4">
                                            <strong>Smoking: </strong>
                                            <input
                                                type="checkbox"
                                                checked={editedPatientSmoking}
                                                onChange={(e) => setEditedPatientSmoking(e.target.checked)}
                                                className="mt-1 align-middle"
                                            />
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <strong>Pregestational LDM: </strong>
                                            <input
                                                type="checkbox"
                                                checked={editedPatientPregestationalLDM}
                                                onChange={(e) => setEditedPatientPregestationalLDM(e.target.checked)}
                                                className="mt-1 align-middle"
                                            />
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <strong>Gestational LDM: </strong>
                                            <input
                                                type="checkbox"
                                                checked={editedPatientGestationalLDM}
                                                onChange={(e) => setEditedPatientGestationalLDM(e.target.checked)}
                                                className="mt-1 align-middle"
                                            />
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <strong>Pregnancy Induced Hypertension: </strong>
                                            <input
                                                type="checkbox"
                                                checked={editedPatientPregnancyInducedHypertension}
                                                onChange={(e) =>
                                                    setEditedPatientPregnancyInducedHypertension(e.target.checked)
                                                }
                                                className="mt-1 align-middle"
                                            />
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <strong>High Risk Preeclampsia: </strong>
                                            <input
                                                type="checkbox"
                                                checked={editedPatientHighRiskPreeclampsia}
                                                onChange={(e) => setEditedPatientHighRiskPreeclampsia(e.target.checked)}
                                                className="mt-1 align-middle"
                                            />
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <strong>Previously Failed Pregnancy: </strong>
                                            <input
                                                type="checkbox"
                                                checked={editedPatientPreviouslyFailedPregnancy}
                                                onChange={(e) =>
                                                    setEditedPatientPreviouslyFailedPregnancy(e.target.checked)
                                                }
                                                className="mt-1 align-middle"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        className="bg-green-500 text-white rounded-md px-4 py-2 mt-4"
                                        type="button"
                                        onClick={updateMotherRecords}
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </Modal>
                        )}

                        <Modal
                            isOpen={isModalOpen}
                            onClose={closeModal}
                        >
                            <h2 className="text-xl font-semibold mb-4">Detailed Patient Information</h2>
                            <p>
                                <strong>Name: </strong>
                                {patientName}
                            </p>
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
                                <strong>Hospital: </strong>
                                {patientHospital}
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
                            <p className="flex text-gray-700 justify-between">
                                Hospital: <span className="font-semibold">Unknown</span>
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
