import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

interface SidebarProps {
    isExpanded: boolean;
}

export function Sidebar({ isExpanded }: SidebarProps) {
    const location = useLocation(); // to get the current path
    const auth = getAuth();

    return (
        <aside
            className={`${
                isExpanded ? 'w-64' : 'w-0'
            } bg-sky-950 text-white min-h-screen transition-all duration-300 overflow-hidden flex-shrink-0 flex flex-col`}
        >
            <div className="flex flex-col h-screen justify-center items-center">
                {isExpanded && (
                    <div className="flex flex-col p-4 justify-center">
                        <h2 className="text-xl font-bold text-gray-100 text-center">Administrator</h2>
                        <h3 className="text-md font-semibold text-gray-300 text-center mt-2">
                            {auth.currentUser?.displayName}
                        </h3>
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
            </div>
        </aside>
    );
}
