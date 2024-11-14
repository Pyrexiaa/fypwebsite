import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
    isExpanded: boolean;
}

export function Sidebar({ isExpanded }: SidebarProps) {
    const location = useLocation(); // to get the current path

    return (
        <aside
            className={`${
                isExpanded ? 'w-64' : 'w-0'
            } bg-sky-950 text-white h-screen transition-width duration-300 overflow-hidden flex flex-col justify-center items-center`}
        >
            {isExpanded && (
                <div className="p-4">
                    <h2 className="text-lg font-semibold">Dr. Bla Bla</h2>
                    <p className="text-sm text-gray-400">Administrator</p>
                </div>
            )}
            <nav className="flex flex-col space-y-2 mt-4">
                <Link
                    to="/homepage"
                    className={`p-2 ${location.pathname === '/homepage' ? 'bg-blue-500' : 'hover:bg-gray-600'} rounded text-center`}
                >
                    Home Page
                </Link>
                <Link
                    to="/calculator"
                    className={`p-2 ${location.pathname === '/calculator' ? 'bg-blue-500' : 'hover:bg-gray-600'} rounded text-center`}
                >
                    Fetal Growth Calculator
                </Link>
                <Link
                    to="/aimodel"
                    className={`p-2 ${location.pathname === '/aimodel' ? 'bg-blue-500' : 'hover:bg-gray-600'} rounded text-center`}
                >
                    AI Model
                </Link>
                <Link
                    to="/pasthistory"
                    className={`p-2 ${
                        location.pathname === '/pasthistory' ? 'bg-blue-500' : 'hover:bg-gray-600'
                    } rounded text-center`}
                >
                    Past History Retrieval
                </Link>
            </nav>
        </aside>
    );
}
