import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../auth/firebaseConfig';
import SettingsProfileIcon from '../assets/SettingsProfileIcon.svg';
import SettingsGeneralIcon from '../assets/SettingsGeneralIcon.svg';
import SettingsSupportIcon from '../assets/SettingsSupportIcon.svg';
import SettingsReferenceIcon from '../assets/SettingsReferenceIcon.svg';
import SettingsDisclaimerIcon from '../assets/SettingsDisclaimerIcon.svg';
import SettingsSignOutIcon from '../assets/SettingsSignOutIcon.svg';
import { Modal } from '../modals/Modal';
import { ProfileSettingsContent } from '../components/ProfileSettingsContent';
import { GeneralSettingsContent } from '../components/GeneralSettingsContent';
import { SupportSettingsContent } from '../components/SupportSettingsContent';
import { ReferenceSettingsContent } from '../components/ReferenceSettingsContent';
import { DisclaimerSettingsContent } from '../components/DisclaimerSettingsContent';

const components = {
    profile: ProfileSettingsContent,
    general: GeneralSettingsContent,
    support: SupportSettingsContent,
    reference: ReferenceSettingsContent,
    disclaimer: DisclaimerSettingsContent,
};

export function SettingsPage() {
    const navigate = useNavigate();
    const [selected, setSelected] = useState<string | null>('profile');
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                // Sign-out successful.
                navigate('/');
                console.log('Signed out successfully');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const renderContent = () => {
        const SelectedComponent = components[selected as keyof typeof components];
        return SelectedComponent ? <SelectedComponent /> : null;
    };

    const options = [
        { id: 'profile', label: 'Profile', icon: SettingsProfileIcon },
        { id: 'general', label: 'General', icon: SettingsGeneralIcon },
        { id: 'support', label: 'Support', icon: SettingsSupportIcon },
        { id: 'reference', label: 'Reference', icon: SettingsReferenceIcon },
        { id: 'disclaimer', label: 'Disclaimer', icon: SettingsDisclaimerIcon },
    ];

    return (
        <div className="flex flex-row">
            <div className="flex flex-col bg-white rounded-md shadow p-4 w-1/4 justify-between">
                <div className="flex flex-col">
                    {options.map((option) => (
                        <button
                            key={option.id}
                            onClick={() => setSelected(option.id)}
                            className={`flex flex-row items-center m-2 px-4 py-2 cursor-pointer rounded-md transition-colors 
                            ${selected === option.id ? 'bg-blue-100 font-bold' : 'hover:bg-gray-100 hover:font-bold'}`}
                            type="button"
                        >
                            <img
                                src={option.icon}
                                alt={`${option.label} Icon`}
                                className="mr-2"
                            />
                            <p>{option.label}</p>
                        </button>
                    ))}
                </div>
                <div className="flex flex-col">
                    <hr className="my-2 border-gray-300" />
                    <button
                        onClick={() => setIsModalVisible(true)}
                        className="flex flex-row items-center m-2 px-4 py-2 cursor-pointer rounded-md transition-colors hover:bg-gray-100 hover:text-blue-500"
                        type="button"
                    >
                        <img
                            src={SettingsSignOutIcon}
                            alt="Sign Out Icon"
                            className="mr-2"
                        />
                        <p className="text-left">Logout</p>
                    </button>
                </div>
            </div>

            <Modal
                isOpen={isModalVisible}
                onClose={() => setIsModalVisible(false)}
            >
                <div className="flex flex-col bg-white rounded-lg shadow-lg p-6 items-center">
                    <h2 className="text-xl font-semibold mb-4">Confirm Logout</h2>
                    <p className="text-gray-600 mb-6">Are you sure you want to log out?</p>
                    <div className="flex space-x-4">
                        <button
                            onClick={() => setIsModalVisible(false)} // Close modal
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                            type="button"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleLogout} // Trigger logout
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            type="button"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Content Area */}
            <div className="flex-1 bg-gray-50 rounded-md p-6 mx-4 w-3/4">{renderContent()}</div>
        </div>
    );
}
