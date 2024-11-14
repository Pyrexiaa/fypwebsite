import React, { useState, useEffect, useRef } from 'react';
import { BlueCard } from '../components/Card';
import InfoIcon from '../assets/InfoIcon.svg';
import ExpandIcon from '../assets/ExpandIcon.svg';
import MaleUserIcon from '../assets/MaleUserIcon.svg';
import { Modal } from '../components/Modal';
import { PastHistoryContent } from '../components/PastHistoryContent';

export function PasthistoryPage() {
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPatientId(e.target.value);
    };

    const handleRetrievePatientId = () => {
        if (patientId === '12345') {
            setIsSuccessful(true); // Assuming '12345' is a valid ID for testing
        } else {
            setIsSuccessful(false);
        }
    };

    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    return (
        <div className="flex space-x-4">
            <div className="flex flex-col space-y-4 w-1/4">
                <BlueCard ref={firstCardRef}>
                    <div className="flex items-center mb-4">
                        <h1 className="text-lg font-semibold mr-2">Patient ID</h1>
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
                            Age: <span className="font-semibold">30</span>
                        </p>
                        <p className="flex text-gray-700 justify-between">
                            Height (m): <span className="font-semibold">1.75</span>
                        </p>
                        <p className="flex text-gray-700 justify-between">
                            Weight (kg): <span className="font-semibold">70</span>
                        </p>
                    </div>

                    <Modal
                        isOpen={isModalOpen}
                        onClose={closeModal}
                    >
                        <h2 className="text-xl font-semibold mb-4">Detailed Patient Information</h2>
                        <p>
                            <strong>Full Name:</strong> John Doe
                        </p>
                        <p>
                            <strong>Medical History:</strong> Patient has a history of...
                        </p>
                        <p>
                            <strong>Contact Info:</strong> 123-456-7890
                        </p>
                    </Modal>
                </BlueCard>
            </div>
            <PastHistoryContent height={combinedHeight} />
        </div>
    );
}
