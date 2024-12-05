import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { LoginSidebar } from './LoginSidebar';
import { LoginHeader } from './LoginHeader';
import LoginBackground from '../assets/LoginBackground.jpg';

export function LoginLayout() {
    const [isExpanded, setIsExpanded] = useState(true);
    const location = useLocation();

    const toggleSidebar = () => {
        setIsExpanded((prev) => !prev);
    };

    // Define titles for each route
    const pageTitles: Record<string, string> = {
        '/': 'Main Page',
        '/homepage': 'Home Page',
        '/aimodel': 'AI Model: Trimester-Based Fetal Health Prediction & Assessment',
        '/pasthistory': 'Past History Retrieval',
        '/calculator': 'Fetal Growth Calculator',
        '/settings': 'Settings',
        '/login': 'Login',
    };

    const currentTitle = pageTitles[location.pathname] ?? 'Unknown Page';

    return (
        <div className="flex min-h-screen">
            <LoginSidebar isExpanded={isExpanded} />
            <div className="flex flex-col flex-1 overflow-auto">
                <img
                    src={LoginBackground}
                    alt="Login Background"
                    className="absolute inset-0 w-full h-full object-cover -z-10"
                />

                <LoginHeader
                    toggleSidebar={toggleSidebar}
                    title={currentTitle}
                />
                <main className="flex-1 p-4 overflow-y-auto bg-gray-100 bg-opacity-50 flex justify-between items-center">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
