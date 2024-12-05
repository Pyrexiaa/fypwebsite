import React from 'react';
import SidePanelIcon from '../assets/SidePanelIcon.svg';

interface HeaderProps {
    toggleSidebar: () => void;
    title: string;
}

export function LoginHeader({ toggleSidebar, title }: HeaderProps) {
    return (
        <header className="flex items-center justify-between p-2 bg-gray-100 bg-opacity-50 text-white">
            <div className="flex items-center">
                <button
                    onClick={toggleSidebar}
                    className="mr-4 p-2 bg-white rounded focus:outline-none hover:bg-gray-200"
                    aria-label="Toggle Sidebar"
                    type="button"
                >
                    <img
                        src={SidePanelIcon}
                        alt="Toggle Sidebar"
                    />
                </button>
                <h1 className="text-xl font-medium text-black">{title}</h1>
            </div>
        </header>
    );
}
