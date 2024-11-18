import React, { useState, ChangeEvent } from 'react';
import ExpandIcon from '../assets/ExpandIcon.svg';
import { AIModelContentTable } from './AIModelContentTable';
import { Modal } from './Modal';

interface AIModelContentProps {
    setSubmitStatus: (bool: boolean) => void;
    height: number;
}

export function AIModelContent({ setSubmitStatus, height }: AIModelContentProps) {
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
        setSubmitStatus(true);
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
                <h2 className="text-lg font-semibold">Fetal Information</h2>

                {/* Button and Icons */}
                <div className="flex items-center space-x-2">
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
            <div className="overflow-auto w-full h-full">
                <AIModelContentTable />
            </div>
            <div className="flex flex-row mt-2 justify-end">
                <button
                    type="button"
                    className="bg-blue-500 text-white rounded-lg px-4 py-2 border-2 border-solid border-black"
                    onClick={handleFormSubmit}
                >
                    Submit
                </button>
                <button
                    type="button"
                    className="text-gray-700 rounded-lg px-4 py-2 border-2 border-solid border-black mx-2"
                    onClick={handleCloseCreateModal}
                >
                    Cancel
                </button>
            </div>

            {/* Modals */}
            <Modal
                isOpen={isExpandModalOpen}
                onClose={() => setExpandModalOpen(false)}
            >
                <div className="overflow-auto max-h-screen">
                    <AIModelContentTable />
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
