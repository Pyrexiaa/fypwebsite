import React, { useState, ChangeEvent } from 'react';
import ExpandIcon from '../assets/ExpandIcon.svg';
import { PastHistoryContentTable } from './PastHistoryContentTable';
import { Modal } from './Modal';
import { PastScans } from '../interfaces/PastScan';

interface PastHistoryContentProps {
    data: PastScans[] | null;
    height: number;
}

export function PastHistoryContent({ data, height }: PastHistoryContentProps) {
    const [isExpandModalOpen, setExpandModalOpen] = useState(false);
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    const [formData, setFormData] = useState({});
    const [isSaved, setIsSaved] = useState(false);

    const handleCreateNewRecord = () => setCreateModalOpen(true);
    const handleExpandTable = () => setExpandModalOpen(true);

    const handleCloseCreateModal = () => {
        if (Object.keys(formData).length > 0 && !isSaved) {
            const confirmExit = window.confirm(
                'This record will not be saved as it is not completed. Are you sure you want to close?',
            );
            if (!confirmExit) return;
        }
        setCreateModalOpen(false);
        setFormData({});
    };

    const handleFormChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFormSubmit = () => {
        // Placeholder for submit logic
        setIsSaved(true);
        setTimeout(() => {
            setCreateModalOpen(false);
            setFormData({});
            setIsSaved(false);
        }, 2000);
    };

    return (
        <div
            className="flex flex-col w-3/4 bg-white rounded-md shadow p-4"
            style={{ height }}
        >
            {/* Header Section */}
            <div className="flex justify-between items-center mb-4">
                {/* Title */}
                <h2 className="text-lg font-semibold">Patient Records</h2>

                {/* Button and Icons */}
                <div className="flex items-center space-x-2">
                    <button
                        className="bg-blue-500 text-white rounded-md px-4 py-2"
                        type="button"
                        onClick={handleCreateNewRecord}
                    >
                        Edit Record
                    </button>
                    <button
                        className="p-2"
                        type="button"
                        onClick={handleExpandTable}
                    >
                        <img
                            src={ExpandIcon}
                            alt="Expand Icon"
                            className="w-5 h-5"
                        />
                    </button>
                </div>
            </div>

            {/* Scrollable Table Section */}
            <div className="flex overflow-auto w-full h-full">
                <PastHistoryContentTable data={data} />
            </div>

            <div className="flex flex-row mt-2 items-left space-x-4">
                <div className="flex items-center space-x-2">
                    <div className="w-6 h-4 bg-green-500 rounded" />
                    <span className="text-gray-700">Appropriate Gestational Age (AGA)</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-6 h-4 bg-red-500 rounded" />
                    <span className="text-gray-700">Small Gestational Age (SGA)</span>
                </div>
            </div>

            {/* Modals */}
            <Modal
                isOpen={isExpandModalOpen}
                onClose={() => setExpandModalOpen(false)}
            >
                <div className="flex overflow-auto max-h-screen">
                    <PastHistoryContentTable data={data} />
                </div>
            </Modal>

            <Modal
                isOpen={isCreateModalOpen}
                onClose={handleCloseCreateModal}
            >
                <div className="p-4">
                    <h2 className="text-lg font-semibold mb-4">Create New Patient Record</h2>
                    <form className="space-y-4">
                        <input
                            type="text"
                            name="patientName"
                            placeholder="Patient Name"
                            onChange={handleFormChange}
                            className="border border-gray-300 rounded p-2 w-full"
                        />
                        <input
                            type="number"
                            name="age"
                            placeholder="Age"
                            onChange={handleFormChange}
                            className="border border-gray-300 rounded p-2 w-full"
                        />
                        {/* Additional form fields */}
                    </form>
                    <div className="flex justify-between mt-4">
                        <button
                            type="button"
                            className="bg-blue-500 text-white rounded px-4 py-2"
                            onClick={handleFormSubmit}
                        >
                            Submit
                        </button>
                        <button
                            type="button"
                            className="text-gray-700"
                            onClick={handleCloseCreateModal}
                        >
                            Cancel
                        </button>
                    </div>
                    {isSaved && <p className="mt-2 text-green-500">Record successfully saved!</p>}
                </div>
            </Modal>
        </div>
    );
}
